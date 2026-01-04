const { ethers } = require('hardhat');

async function main() {
    const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
    console.log('Marketplace Address:', marketplaceAddress);

    if (!marketplaceAddress) {
        throw new Error('NEXT_PUBLIC_MARKETPLACE_ADDRESS not set');
    }

    const marketplace = await ethers.getContractAt('CourseMarketplace', marketplaceAddress);

    // Check all courses
    console.log('\n=== Checking All Courses ===\n');

    for (let courseId = 1; courseId <= 7; courseId++) {
        const course = await marketplace.courses(courseId);
        const exists = course.creator !== ethers.ZeroAddress;

        console.log(`Course ${courseId}:`);
        console.log(`  Price: ${ethers.formatEther(course.price)} ETH (${course.price.toString()} wei)`);
        console.log(`  Active: ${course.active}`);
        console.log(`  Creator: ${course.creator}`);
        console.log(`  Status: ${exists && course.active ? '✓ OK' : '✗ PROBLEM'}`);
        console.log('');
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
