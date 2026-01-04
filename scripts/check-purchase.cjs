const { ethers } = require('hardhat');

async function main() {
    const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
    console.log('Marketplace Address:', marketplaceAddress);

    // User's wallet address (from the screenshot - this is the deployer account)
    const userAddress = '0xFE13B060897b5daBbC866C312A6839C007d181fB';

    const marketplace = await ethers.getContractAt('CourseMarketplace', marketplaceAddress);

    console.log('\n=== Checking Purchase Status for Course 3 (DeFi Protocols) ===\n');

    const courseId = 3;
    const course = await marketplace.courses(courseId);
    const hasPurchased = await marketplace.purchased(userAddress, courseId);

    console.log('Course Details:');
    console.log('  ID:', course.id.toString());
    console.log('  Price:', ethers.formatEther(course.price), 'ETH');
    console.log('  Active:', course.active);
    console.log('  Creator:', course.creator);
    console.log('');
    console.log('User Address:', userAddress);
    console.log('Already Purchased:', hasPurchased);

    if (hasPurchased) {
        console.log('\n⚠️  USER HAS ALREADY PURCHASED THIS COURSE!');
        console.log('   This is why the transaction is failing.');
    } else {
        console.log('\n✓ User has NOT yet purchased this course.');
        console.log('  If transaction fails, check wallet balance.');
    }

    // Also check treasury
    const treasury = await marketplace.treasury();
    console.log('\nTreasury Address:', treasury);

    // Check all courses purchase status
    console.log('\n=== All Courses Purchase Status ===\n');
    for (let i = 1; i <= 7; i++) {
        const purchased = await marketplace.purchased(userAddress, i);
        console.log(`Course ${i}: ${purchased ? 'PURCHASED' : 'Not purchased'}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
