const { ethers } = require('hardhat');

// Course data matching lib/data.ts
const courses = [
    { id: 1, price: '0', name: 'Blockchain Fundamentals' },           // Free
    { id: 2, price: '0.05', name: 'Smart Contract Development' },     // 0.05 ETH
    { id: 3, price: '0.08', name: 'DeFi Protocols' },                 // 0.08 ETH
    { id: 4, price: '0.04', name: 'NFT Smart Contracts' },            // 0.04 ETH
    { id: 5, price: '0.03', name: 'Web3 Frontend Integration' },      // 0.03 ETH
    { id: 6, price: '0.06', name: 'Tokenomics & DAO Governance' },    // 0.06 ETH
    { id: 7, price: '0.05', name: 'Layer 2 Scaling Solutions' },      // 0.05 ETH
];

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Adding courses with account:', deployer.address);

    // Get the deployed marketplace contract
    const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
    if (!marketplaceAddress) {
        throw new Error('NEXT_PUBLIC_MARKETPLACE_ADDRESS not set in .env');
    }

    console.log('Marketplace address:', marketplaceAddress);

    const marketplace = await ethers.getContractAt('CourseMarketplace', marketplaceAddress);

    // Add each course
    for (const course of courses) {
        const priceWei = ethers.parseEther(course.price);
        console.log(`Adding course ${course.id}: ${course.name} (${course.price} ETH)...`);

        try {
            const tx = await marketplace.addCourse(course.id, priceWei, deployer.address);
            await tx.wait();
            console.log(`  ✓ Course ${course.id} added successfully`);
        } catch (error) {
            if (error.message.includes('already')) {
                console.log(`  ⚠ Course ${course.id} already exists, skipping`);
            } else {
                console.log(`  ✗ Error adding course ${course.id}:`, error.message);
            }
        }
    }

    console.log('\n=== All courses added! ===');
    console.log('Users can now purchase courses on the frontend.');
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
