const { ethers } = require('hardhat');

async function main() {
    const marketplaceAddress = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS;
    console.log('Marketplace Address:', marketplaceAddress);

    if (!marketplaceAddress) {
        throw new Error('NEXT_PUBLIC_MARKETPLACE_ADDRESS not set');
    }

    const marketplace = await ethers.getContractAt('CourseMarketplace', marketplaceAddress);

    // Check Course 2
    const courseId = 2;
    console.log(`Checking Course ${courseId}...`);

    const course = await marketplace.courses(courseId);
    console.log('Course Details:');
    console.log('  ID:', course.id.toString());
    console.log('  Price (Wei):', course.price.toString());
    console.log('  Price (ETH):', ethers.formatEther(course.price));
    console.log('  Active:', course.active);
    console.log('  Creator:', course.creator);

    if (course.creator === ethers.ZeroAddress) {
        console.log('ERROR: Course creator is 0x0. Course does not exist!');
    } else if (!course.active) {
        console.log('ERROR: Course is not active!');
    } else {
        console.log('SUCCESS: Course exists and is active.');
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
