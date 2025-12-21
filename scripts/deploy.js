async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with account:', deployer.address);

  const Certificate = await ethers.getContractFactory('CertificateNFT');
  const certificate = await Certificate.deploy('ArbiLearn Certificate', 'ALC');
  await certificate.deployed();
  console.log('Certificate deployed to:', certificate.address);

  const Marketplace = await ethers.getContractFactory('CourseMarketplace');
  const marketplace = await Marketplace.deploy(certificate.address, deployer.address);
  await marketplace.deployed();
  console.log('Marketplace deployed to:', marketplace.address);

  // grant marketplace permission to mint
  const tx = await certificate.setIssuer(marketplace.address, true);
  await tx.wait();
  console.log('Marketplace set as issuer');

  console.log('Done');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});