"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Wallet,
  Search,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  BookOpen,
  LogOut,
  ExternalLink,
  Copy,
  ShoppingCart,
  Loader2
} from "lucide-react"
import { motion } from "framer-motion"
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useReadContracts } from 'wagmi'
import { useToast } from "@/hooks/use-toast"

import { courses } from "@/lib/data"
import { CONTRACT_ADDRESSES, courseMarketplaceAbi, parseEthPrice, COURSE_ID_MAP } from "@/lib/contracts"

export default function CoursesPage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const [searchQuery, setSearchQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [buyingCourseId, setBuyingCourseId] = useState<string | null>(null)

  // Write contract hook for purchasing
  const { data: txHash, writeContract, isPending, error: writeError } = useWriteContract()

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  // Check ownership of all courses
  const { data: ownershipData, refetch: refetchOwnership } = useReadContracts({
    contracts: courses.map((course) => ({
      address: CONTRACT_ADDRESSES.courseMarketplace as `0x${string}`,
      abi: courseMarketplaceAbi,
      functionName: 'purchased',
      args: [address || '0x0000000000000000000000000000000000000000', BigInt(COURSE_ID_MAP[course.id] || 0)],
    })),
    query: {
      enabled: !!address,
    }
  })

  // Refresh ownership after successful purchase
  useEffect(() => {
    if (isConfirmed) {
      refetchOwnership()
    }
  }, [isConfirmed, refetchOwnership])

  const isOwned = (courseId: string) => {
    const index = courses.findIndex(c => c.id === courseId)
    if (index === -1 || !ownershipData || !ownershipData[index]) return false
    return !!ownershipData[index].result
  }

  // Handle transaction status changes
  useEffect(() => {
    if (isConfirmed && buyingCourseId) {
      toast({
        title: "Purchase Successful!",
        description: "You now have access to this course. Start learning!",
      })
      setBuyingCourseId(null)
    }
  }, [isConfirmed, buyingCourseId, toast])

  useEffect(() => {
    if (writeError) {
      toast({
        title: "Transaction Failed",
        description: writeError.message.slice(0, 100),
        variant: "destructive",
      })
      setBuyingCourseId(null)
    }
  }, [writeError, toast])

  const handleConnect = () => {
    const metamask = connectors.find((c) => c.name === 'MetaMask')
    if (metamask) connect({ connector: metamask })
    else connect({ connector: connectors[0] })
  }

  const copyAddress = () => {
    if (address) navigator.clipboard.writeText(address)
  }

  const handleBuy = (courseId: string, price: string) => {
    const onChainCourseId = COURSE_ID_MAP[courseId]
    if (!onChainCourseId) {
      toast({
        title: "Course Not Available",
        description: "This course is not yet available for purchase on-chain.",
        variant: "destructive",
      })
      return
    }

    const priceWei = parseEthPrice(price)
    setBuyingCourseId(courseId)

    writeContract({
      address: CONTRACT_ADDRESSES.courseMarketplace as `0x${string}`,
      abi: courseMarketplaceAbi,
      functionName: 'purchaseCourse',
      args: [BigInt(onChainCourseId)],
      value: priceWei,
    })
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === "all" || course.level.toLowerCase() === levelFilter
    return matchesSearch && matchesLevel
  })

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
                  A
                </div>
                <Badge className="absolute -top-2 -right-2 text-[8px] px-1 py-0 bg-secondary text-white border-0">
                  ARB
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
              <Link href="/courses" className="text-sm text-foreground font-medium">
                Courses
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </nav>

            <div>
              {!isConnected ? (
                <Button
                  onClick={handleConnect}
                  className="relative overflow-hidden bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect MetaMask
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-primary/50 text-foreground bg-transparent">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-sm border-primary/30">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">Connected Wallet</p>
                      <p className="text-xs text-muted-foreground font-mono">{address}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <a
                        href={`https://arbiscan.io/address/${address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Arbiscan
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem
                      onClick={() => disconnect()}
                      className="cursor-pointer text-red-400 focus:text-red-400"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Courses</h1>
          <p className="text-xl text-muted-foreground">Master blockchain development from basics to advanced topics.</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-primary/20 focus:border-primary/50"
              />
            </div>

            {/* Filter by Level */}
            <Tabs value={levelFilter} onValueChange={setLevelFilter} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-primary/20">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary/20">
                  All
                </TabsTrigger>
                <TabsTrigger value="beginner" className="data-[state=active]:bg-primary/20">
                  Beginner
                </TabsTrigger>
                <TabsTrigger value="intermediate" className="data-[state=active]:bg-primary/20">
                  Intermediate
                </TabsTrigger>
                <TabsTrigger value="advanced" className="data-[state=active]:bg-primary/20">
                  Advanced
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Showing {filteredCourses.length} of {courses.length} courses
            </span>
            {isConnected && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2" />
                Wallet Connected
              </Badge>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge
                      className={`${course.level === "Beginner"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : course.level === "Intermediate"
                          ? "bg-[#60a5fa]/20 text-[#60a5fa] border-[#60a5fa]/30"
                          : "bg-[#a78bfa]/20 text-[#a78bfa] border-[#a78bfa]/30"
                        }`}
                    >
                      {course.level}
                    </Badge>
                    {course.price !== "Free" && (
                      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 font-bold">
                        {course.price}
                      </Badge>
                    )}
                    {course.price === "Free" && (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-bold">
                        Free
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{course.description}</p>

                  {/* Meta Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#a78bfa] font-medium text-sm">
                      <Sparkles className="h-4 w-4" />
                      Earn {course.reward}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex gap-2 mt-auto">
                    {course.price === "Free" ? (
                      <Button
                        asChild
                        variant="default"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                      >
                        <Link href={`/courses/${course.id}`}>
                          Start Learning
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1 border-primary/50 hover:bg-primary/10 bg-transparent"
                          asChild
                        >
                          <Link href={`/courses/${course.id}`}>
                            Info
                          </Link>
                        </Button>
                        {!isConnected ? (
                          <Button
                            onClick={handleConnect}
                            className="flex-[2] bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0"
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            Buy
                          </Button>
                        ) : isOwned(course.id) ? (
                          <Button
                            variant="secondary"
                            disabled
                            className="flex-[2] bg-green-500/20 text-green-500 border-green-500/50"
                          >
                            <Sparkles className="w-4 h-4 mr-2" />
                            Owned
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleBuy(course.id, course.price)}
                            disabled={isPending || isConfirming || buyingCourseId === course.id}
                            className="flex-[2] bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
                          >
                            {(isPending || isConfirming) && buyingCourseId === course.id ? (
                              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Processing...</>
                            ) : (
                              <><ShoppingCart className="w-4 h-4 mr-2" />Buy Now</>
                            )}
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-2xl font-bold mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setLevelFilter("all")
              }}
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 bg-transparent"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
