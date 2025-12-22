const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with account:', deployer.address);
  console.log('Account balance:', (await ethers.provider.getBalance(deployer.address)).toString());

  // Deploy CertificateNFT
  const Certificate = await ethers.getContractFactory('CertificateNFT');
  const certificate = await Certificate.deploy('ArbiLearn Certificate', 'ALC');
  await certificate.waitForDeployment();
  const certAddress = await certificate.getAddress();
  console.log('Certificate deployed to:', certAddress);

  // Deploy CourseMarketplace
  const Marketplace = await ethers.getContractFactory('CourseMarketplace');
  const marketplace = await Marketplace.deploy(certAddress, deployer.address);
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log('Marketplace deployed to:', marketplaceAddress);

  // Grant marketplace permission to mint
  console.log('Setting marketplace as certificate issuer...');
  const tx = await certificate.setIssuer(marketplaceAddress, true);
  await tx.wait();
  console.log('Marketplace set as issuer');

  console.log('');
  console.log('=== Deployment Summary ===');
  console.log(`NEXT_PUBLIC_CERTIFICATE_NFT_ADDRESS=${certAddress}`);
  console.log(`NEXT_PUBLIC_MARKETPLACE_ADDRESS=${marketplaceAddress}`);
  console.log('');
  console.log('Add these to your .env file for frontend integration');
  console.log('Done!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});