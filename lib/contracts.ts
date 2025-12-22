// Contract addresses - update these after deployment
export const CONTRACT_ADDRESSES = {
    certificateNFT: process.env.NEXT_PUBLIC_CERTIFICATE_NFT_ADDRESS || '0x0000000000000000000000000000000000000000',
    courseMarketplace: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS || '0x0000000000000000000000000000000000000000',
} as const

// CertificateNFT ABI (relevant functions only)
export const certificateNftAbi = [
    {
        inputs: [{ name: 'owner', type: 'address' }, { name: 'courseId', type: 'uint256' }],
        name: 'ownerCourseToken',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'ownerOf',
        outputs: [{ name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenURI',
        outputs: [{ name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'tokenId', type: 'uint256' }],
        name: 'tokenCourse',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
] as const

// CourseMarketplace ABI (relevant functions only)
export const courseMarketplaceAbi = [
    {
        inputs: [{ name: 'courseId', type: 'uint256' }],
        name: 'courses',
        outputs: [
            { name: 'id', type: 'uint256' },
            { name: 'price', type: 'uint256' },
            { name: 'active', type: 'bool' },
            { name: 'creator', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'user', type: 'address' }, { name: 'courseId', type: 'uint256' }],
        name: 'purchased',
        outputs: [{ name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ name: 'courseId', type: 'uint256' }],
        name: 'purchaseCourse',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, name: 'buyer', type: 'address' },
            { indexed: true, name: 'courseId', type: 'uint256' },
            { indexed: false, name: 'amount', type: 'uint256' },
        ],
        name: 'CoursePurchased',
        type: 'event',
    },
] as const

// Helper to parse ETH price strings like "0.05 ETH" to wei
export function parseEthPrice(priceString: string): bigint {
    if (priceString === 'Free') return BigInt(0)
    const match = priceString.match(/^([\d.]+)\s*ETH$/i)
    if (!match) return BigInt(0)
    const ethValue = parseFloat(match[1])
    return BigInt(Math.floor(ethValue * 1e18))
}

// Course ID mapping (string ID to on-chain number)
export const COURSE_ID_MAP: Record<string, number> = {
    'blockchain-fundamentals': 1,
    'smart-contract-development': 2,
    'defi-protocols': 3,
    'nft-smart-contracts': 4,
    'web3-frontend-integration': 5,
    'tokenomics-dao-governance': 6,
    'layer-2-scaling': 7,
}
