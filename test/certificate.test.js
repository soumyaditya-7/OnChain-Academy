const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Certificate + Marketplace integration', function () {
  let Certificate, certificate, Marketplace, marketplace, owner, buyer, other;
  let certAddress, marketplaceAddress;

  beforeEach(async function () {
    [owner, buyer, other] = await ethers.getSigners();

    Certificate = await ethers.getContractFactory('CertificateNFT');
    certificate = await Certificate.connect(owner).deploy('ArbiLearn Certificate', 'ALC');
    await certificate.waitForDeployment();
    certAddress = await certificate.getAddress();

    Marketplace = await ethers.getContractFactory('CourseMarketplace');
    marketplace = await Marketplace.connect(owner).deploy(certAddress, owner.address);
    await marketplace.waitForDeployment();
    marketplaceAddress = await marketplace.getAddress();

    // allow marketplace to mint certificates
    await certificate.connect(owner).setIssuer(marketplaceAddress, true);
  });

  it('allows purchase and issues certificate', async function () {
    const courseId = 1;
    const price = ethers.parseEther('0.01');

    // add course
    await marketplace.connect(owner).addCourse(courseId, price, owner.address);

    // buy course
    await expect(
      marketplace.connect(buyer).purchaseCourse(courseId, { value: price })
    ).to.emit(marketplace, 'CoursePurchased').withArgs(buyer.address, courseId, price);

    const purchased = await marketplace.purchased(buyer.address, courseId);
    expect(purchased).to.equal(true);

    // issue certificate
    const uri = 'ipfs://QmCertMetadataCID';
    await expect(
      marketplace.connect(owner).issueCertificate(buyer.address, courseId, uri)
    ).to.emit(marketplace, 'CertificateIssued');

    // tokenId 1 should be owned by buyer
    expect(await certificate.ownerOf(1)).to.equal(buyer.address);
    expect(await certificate.tokenURI(1)).to.equal(uri);
    expect(await certificate.tokenCourse(1)).to.equal(courseId);
  });

  it('prevents unauthorized minting', async function () {
    const uri = 'ipfs://unauthorized';
    await expect(certificate.connect(other).mintCertificate(other.address, uri, 99)).to.be.revertedWith(
      'Not authorized to mint'
    );
  });

  it('prevents certificate transfer (soulbound)', async function () {
    const courseId = 2;
    const price = ethers.parseEther('0.01');

    await marketplace.connect(owner).addCourse(courseId, price, owner.address);
    await marketplace.connect(buyer).purchaseCourse(courseId, { value: price });
    await marketplace.connect(owner).issueCertificate(buyer.address, courseId, 'ipfs://test');

    // Attempt transfer should revert
    await expect(
      certificate.connect(buyer).transferFrom(buyer.address, other.address, 1)
    ).to.be.revertedWith('Certificates are soulbound');
  });
});