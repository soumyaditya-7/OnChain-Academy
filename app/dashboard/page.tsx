"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Wallet,
  Award,
  Sparkles,
  TrendingUp,
  BookOpen,
  ExternalLink,
  Share2,
  Trophy,
  Copy,
  Check,
  LogOut,
} from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [walletAddress] = useState("0x742d35Ef8b7Bc3a9F")
  const [copiedAddress, setCopiedAddress] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const disconnectWallet = () => {
    router.push("/")
  }

  const userStats = {
    xpEarned: 127,
    coursesCompleted: 3,
    certificatesMinted: 3,
    currentStreak: 7,
    rank: 42,
  }

  const certificates = [
    {
      id: 1,
      courseName: "Solidity Fundamentals",
      mintDate: "2025-01-15",
      tokenId: "#2847",
      image: "/certificate-blockchain-achievement.jpg",
      xpEarned: 10,
    },
    {
      id: 2,
      courseName: "Smart Contract Security",
      mintDate: "2025-01-10",
      tokenId: "#2658",
      image: "/blockchain-certificate-award.jpg",
      xpEarned: 15,
    },
    {
      id: 3,
      courseName: "DeFi Development",
      mintDate: "2025-01-05",
      tokenId: "#2421",
      image: "/certificate-blockchain-achievement.jpg",
      xpEarned: 25,
    },
  ]

  const inProgressCourses = [
    {
      id: 4,
      title: "NFT Smart Contracts",
      progress: 65,
      thumbnail: "/nft-digital-art-blockchain.jpg",
    },
    {
      id: 5,
      title: "Web3 Frontend Integration",
      progress: 30,
      thumbnail: "/web3-network-architecture.jpg",
    },
  ]

  const leaderboard = [
    { rank: 1, name: "CryptoMaster", xp: 2840, isCurrentUser: false },
    { rank: 2, name: "BlockchainPro", xp: 2650, isCurrentUser: false },
    { rank: 42, name: "You", xp: 127, isCurrentUser: true },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(96, 165, 250, 0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "50px 50px"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#60a5fa] to-[#a78bfa] flex items-center justify-center font-bold text-xl text-white">
                  C
                </div>
                <Badge className="absolute -top-2 -right-2 text-[8px] px-1 py-0 bg-secondary text-white border-0">
                  OCA
                </Badge>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
                OnChain Academy
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <Link href="/dashboard" className="text-sm text-foreground font-medium">
                Dashboard
              </Link>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-primary/50 text-foreground bg-transparent">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-sm border-primary/30">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Connected Wallet</p>
                  <p className="text-xs text-muted-foreground font-mono">{walletAddress}</p>
                </div>
                <DropdownMenuSeparator className="bg-primary/20" />
                <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Address
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <a href={`https://arbiscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Arbiscan
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary/20" />
                <DropdownMenuItem onClick={disconnectWallet} className="cursor-pointer text-red-400 focus:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Dashboard</h1>
          <p className="text-xl text-muted-foreground">Track your progress and achievements on the blockchain.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Wallet Info Card */}
            <Card className="p-6 bg-gradient-to-br from-[#60a5fa]/10 to-[#a78bfa]/10 border-primary/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-2">Connected Wallet</h3>
                  <div className="flex items-center gap-2">
                    <code className="text-lg font-mono">{walletAddress}</code>
                    <Button size="sm" variant="ghost" onClick={copyAddress} className="h-8 w-8 p-0 hover:bg-primary/20">
                      {copiedAddress ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Wallet className="mr-1 h-3 w-3" />
                  Arbitrum
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary/50 hover:bg-primary/10 bg-transparent"
                asChild
              >
                <a href={`https://arbiscan.io/address/${walletAddress}`} target="_blank" rel="noopener noreferrer">
                  View on Arbiscan
                  <ExternalLink className="ml-2 h-3 w-3" />
                </a>
              </Button>
            </Card>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#a78bfa]/20">
                    <Sparkles className="h-5 w-5 text-[#a78bfa]" />
                  </div>
                  <div className="text-sm text-muted-foreground">XP Earned</div>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
                  {userStats.xpEarned}
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-[#60a5fa]/20">
                    <BookOpen className="h-5 w-5 text-[#60a5fa]" />
                  </div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-3xl font-bold">{userStats.coursesCompleted}</div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Award className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="text-sm text-muted-foreground">NFTs</div>
                </div>
                <div className="text-3xl font-bold">{userStats.certificatesMinted}</div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-orange-500/20">
                    <TrendingUp className="h-5 w-5 text-orange-400" />
                  </div>
                  <div className="text-sm text-muted-foreground">Streak</div>
                </div>
                <div className="text-3xl font-bold">{userStats.currentStreak} days</div>
              </Card>
            </div>

            {/* Tabs: Certificates & In Progress */}
            <Tabs defaultValue="certificates" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-primary/20">
                <TabsTrigger value="certificates" className="data-[state=active]:bg-primary/20">
                  NFT Certificates
                </TabsTrigger>
                <TabsTrigger value="progress" className="data-[state=active]:bg-primary/20">
                  In Progress
                </TabsTrigger>
              </TabsList>

              <TabsContent value="certificates" className="mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                    >
                      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300">
                        <div className="relative">
                          <img
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.courseName}
                            className="w-full h-48 object-cover"
                          />
                          <Badge className="absolute top-3 right-3 bg-[#60a5fa]/90 text-white border-0">
                            {cert.tokenId}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold mb-2">{cert.courseName}</h3>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <span>Minted {cert.mintDate}</span>
                            <div className="flex items-center gap-1 text-[#a78bfa]">
                              <Sparkles className="h-3 w-3" />+{cert.xpEarned} XP
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-primary/50 hover:bg-primary/10 bg-transparent"
                            >
                              <Share2 className="mr-2 h-3 w-3" />
                              Share
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 border-primary/50 hover:bg-primary/10 bg-transparent"
                              asChild
                            >
                              <a
                                href={`https://arbiscan.io/nft/${cert.tokenId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-3 w-3" />
                                View NFT
                              </a>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="progress" className="mt-6">
                <div className="space-y-4">
                  {inProgressCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <img
                            src={course.thumbnail || "/placeholder.svg"}
                            alt={course.title}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3">{course.title}</h3>
                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="border-primary/50 hover:bg-primary/10 bg-transparent"
                            >
                              <Link href={`/courses/${course.id}`}>Continue Learning</Link>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Leaderboard Card */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-2 mb-6">
                  <Trophy className="h-5 w-5 text-[#a78bfa]" />
                  <h3 className="text-xl font-bold">Leaderboard</h3>
                </div>
                <div className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        user.isCurrentUser
                          ? "bg-primary/20 border border-primary/50"
                          : "bg-card/30 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            user.rank === 1
                              ? "bg-yellow-500/20 text-yellow-400"
                              : user.rank === 2
                                ? "bg-gray-400/20 text-gray-300"
                                : user.isCurrentUser
                                  ? "bg-primary/30 text-primary"
                                  : "bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          #{user.rank}
                        </div>
                        <span className={user.isCurrentUser ? "font-semibold" : ""}>{user.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[#a78bfa]">
                        <Sparkles className="h-3 w-3" />
                        {user.xp}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-4 border-primary/50 hover:bg-primary/10 bg-transparent"
                >
                  <Link href="/leaderboard">View Full Leaderboard</Link>
                </Button>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0"
                  >
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-primary/50 hover:bg-primary/10 bg-transparent"
                    asChild
                  >
                    <a href="https://bridge.arbitrum.io" target="_blank" rel="noopener noreferrer">
                      Bridge to Arbitrum
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
