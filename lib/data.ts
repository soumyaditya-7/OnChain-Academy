import { BookOpen, Code, Trophy, ArrowRight, Wallet, CheckCircle, Award, LucideIcon, Sparkles, Users } from "lucide-react"

export interface Course {
    id: string
    title: string
    description: string
    level: string
    duration: string
    students: string
    color: string
    price: string
    icon: LucideIcon
    thumbnail?: string
    reward?: string
}

export const courses: Course[] = [
    {
        id: "blockchain-fundamentals",
        title: "Blockchain Fundamentals",
        description: "Master the core concepts of blockchain technology and decentralization",
        level: "Beginner",
        duration: "4 weeks",
        students: "2.3K",
        color: "blue",
        price: "Free",
        icon: BookOpen,
        thumbnail: "/solidity-coding-blockchain.jpg",
        reward: "10 XP"
    },
    {
        id: "smart-contract-development",
        title: "Smart Contract Development",
        description: "Learn Solidity and build secure smart contracts from scratch",
        level: "Intermediate",
        duration: "6 weeks",
        students: "1.8K",
        color: "purple",
        price: "0.05 ETH",
        icon: Code,
        thumbnail: "/blockchain-security-shield.jpg",
        reward: "15 XP"
    },
    {
        id: "defi-protocols",
        title: "DeFi Protocols",
        description: "Understand and build decentralized finance applications",
        level: "Advanced",
        duration: "8 weeks",
        students: "1.1K",
        color: "cyan",
        price: "0.08 ETH",
        icon: Trophy,
        thumbnail: "/defi-finance-cryptocurrency.jpg",
        reward: "25 XP"
    },
    {
        id: "nft-smart-contracts",
        title: "NFT Smart Contracts",
        description: "Create, deploy, and manage NFT collections using ERC-721 and ERC-1155.",
        level: "Intermediate",
        duration: "5 hours",
        students: "942",
        color: "pink",
        price: "0.04 ETH",
        icon: Sparkles,
        thumbnail: "/nft-digital-art-blockchain.jpg",
        reward: "12 XP"
    },
    {
        id: "web3-frontend-integration",
        title: "Web3 Frontend Integration",
        description: "Connect React apps to blockchain using ethers.js and wagmi.",
        level: "Intermediate",
        duration: "7 hours",
        students: "1.1K",
        color: "indigo",
        price: "0.03 ETH",
        icon: Code,
        thumbnail: "/web3-network-architecture.jpg",
        reward: "18 XP"
    },
    {
        id: "tokenomics-dao-governance",
        title: "Tokenomics & DAO Governance",
        description: "Design token economies and build decentralized autonomous organizations.",
        level: "Advanced",
        duration: "6 hours",
        students: "528",
        color: "orange",
        price: "0.06 ETH",
        icon: Users,
        thumbnail: "/tokenomics-cryptocurrency-economy.jpg",
        reward: "20 XP"
    },
    {
        id: "layer-2-scaling",
        title: "Layer 2 Scaling Solutions",
        description: "Understand Arbitrum, Optimism, and other L2 scaling technologies.",
        level: "Advanced",
        duration: "5 hours",
        students: "445",
        color: "red",
        price: "0.05 ETH",
        icon: Trophy,
        thumbnail: "/blockchain-security-shield.jpg",
        reward: "22 XP"
    }
]

export interface Topic {
    id: string
    title: string
    icon: LucideIcon
}

export const topics: Topic[] = [
    {
        id: "nft-development",
        title: "NFT Development",
        icon: ArrowRight
    },
    {
        id: "smart-contract-security",
        title: "Smart Contract Security",
        icon: ArrowRight
    },
    {
        id: "zero-knowledge-proofs",
        title: "Zero Knowledge Proofs",
        icon: ArrowRight
    }
]
