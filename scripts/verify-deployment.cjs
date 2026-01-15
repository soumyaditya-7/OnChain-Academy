const { ethers } = require('hardhat');

async function main() {
    const certAddress = process.env.NEXT_PUBLIC_CERTIFICATE_NFT_ADDRESS;
    const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;

    console.log('=== Checking Deployed Contracts ===\n');
    console.log('CertificateNFT Address:', certAddress);
    console.log('CourseMarketplace Address:', marketplaceAddress);

    if (!certAddress || certAddress === '0x0000000000000000000000000000000000000000') {
        console.log('\n❌ CertificateNFT address not set in .env');
        return;
    }

    // Check if contract exists by getting code at address
    const certCode = await ethers.provider.getCode(certAddress);
    const marketCode = await ethers.provider.getCode(marketplaceAddress);

    console.log('\n=== Contract Verification ===\n');

    if (certCode !== '0x') {
        console.log('✓ CertificateNFT is DEPLOYED');

        // Try to get contract info
        const cert = await ethers.getContractAt('CertificateNFT', certAddress);
        const name = await cert.name();
        const symbol = await cert.symbol();
        const owner = await cert.owner();

        console.log('  Name:', name);
        console.log('  Symbol:', symbol);
        console.log('  Owner:', owner);

        // Check if marketplace is set as issuer
        const isMarketplaceIssuer = await cert.issuers(marketplaceAddress);
        console.log('  Marketplace is issuer:', isMarketplaceIssuer);
    } else {
        console.log('❌ CertificateNFT is NOT DEPLOYED at this address');
    }

    console.log('');

    if (marketCode !== '0x') {
        console.log('✓ CourseMarketplace is DEPLOYED');

        const marketplace = await ethers.getContractAt('CourseMarketplace', marketplaceAddress);
        const certContractAddr = await marketplace.certContract();
        const treasury = await marketplace.treasury();

        console.log('  Linked Certificate Contract:', certContractAddr);
        console.log('  Treasury:', treasury);
    } else {
        console.log('❌ CourseMarketplace is NOT DEPLOYED at this address');
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
