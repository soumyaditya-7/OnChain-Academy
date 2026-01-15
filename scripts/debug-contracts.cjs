const { ethers } = require('hardhat');

async function main() {
    const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
    const certAddress = process.env.NEXT_PUBLIC_CERTIFICATE_NFT_ADDRESS;

    console.log('=== Contract Debug Info ===\n');
    console.log('Marketplace:', marketplaceAddress);
    console.log('CertificateNFT:', certAddress);

    const marketplace = await ethers.getContractAt('CourseMarketplace', marketplaceAddress);
    const cert = await ethers.getContractAt('CertificateNFT', certAddress);

    const marketOwner = await marketplace.owner();
    const certOwner = await cert.owner();
    const treasury = await marketplace.treasury();
    const isMarketplaceIssuer = await cert.issuers(marketplaceAddress);

    console.log('\n=== Ownership & Permissions ===\n');
    console.log('Marketplace Owner:', marketOwner);
    console.log('CertificateNFT Owner:', certOwner);
    console.log('Treasury:', treasury);
    console.log('Marketplace is Certificate Issuer:', isMarketplaceIssuer);

    // Get deployer address
    const [deployer] = await ethers.getSigners();
    console.log('\n=== Current Signer ===\n');
    console.log('Deployer/Signer Address:', deployer.address);
    console.log('Signer matches Marketplace Owner:', deployer.address.toLowerCase() === marketOwner.toLowerCase());

    console.log('\n=== Important Note ===');
    console.log('If your MetaMask wallet address is DIFFERENT from the contract owner,');
    console.log('you cannot purchase courses with the current setup.');
    console.log('Make sure you are using the same wallet that deployed the contracts!');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
