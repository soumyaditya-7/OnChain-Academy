"use client"

import { useState, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Trophy,
  BookOpen,
  Award,
  Zap,
  CheckCircle,
  Users,
  Wallet,
  Sparkles,
  ExternalLink,
  Copy,
  LogOut,
} from "lucide-react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react" // Added import for ArrowRight
import { SplineBackground } from "@/components/spline-background"
import { SearchBar } from "@/components/search-bar"
import { courses } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  // const [isConnected, setIsConnected] = useState(false) // Removed mock state
  // const [walletAddress, setWalletAddress] = useState("") // Removed mock state
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const coursesRef = useRef(null)
  const howItWorksRef = useRef(null)
  const ctaRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        })
        .fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        })
        .fromTo(".stat-item", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, stagger: 0.2 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        })
        .fromTo(".feature-card", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.2 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: coursesRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        })
        .fromTo(".course-card", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, stagger: 0.15 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        })
        .fromTo(".how-it-works-step", { opacity: 0, x: -50 }, { opacity: 1, x: 0, stagger: 0.2 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            end: "bottom 30%",
            scrub: 1,
          },
        })
        .fromTo(ctaRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
    })

    return () => ctx.revert()
  }, [])

  const connectWallet = () => {
    const metamask = connectors.find((c) => c.name === 'MetaMask')
    if (metamask) {
      connect({ connector: metamask })
    } else {
      // Fallback or alert if MetaMask is not found
      // For now, try connecting to the first available connector or Injected
      connect({ connector: connectors[0] })
    }
  }

  const disconnectWallet = () => {
    disconnect()
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address || "")
  }

  return (
    <div className="min-h-screen text-foreground relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background/0 to-background/0" />
        <SplineBackground />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">

        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">OnChain Academy</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                Home
              </Link>
              <Link
                href="/courses"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Courses
              </Link>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {!isConnected ? (
                <Button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Wallet className="w-4 h-4" />
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={copyAddress}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href={`https://arbiscan.io/address/${address}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View on Arbiscan
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={disconnectWallet} className="text-red-500 focus:text-red-500">
                      <LogOut className="w-4 h-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </header>

        <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
              >
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">Built on Arbitrum</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <SearchBar />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-balance"
              >
                Turn Knowledge into On-Chain Proof.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground mb-12 text-balance"
              >
                A decentralized learning platform where users learn Web3 skills and earn on-chain NFT certificates and XP powered by Arbitrum.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg h-12 px-8"
                  asChild
                >
                  <Link href="/courses">
                    Start Learning <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-12 px-8 bg-transparent" asChild>
                  <Link href="#how-it-works">How It Works</Link>
                </Button>
              </motion.div>

              <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto"
              >
                <div className="stat-item">
                  <div className="text-3xl md:text-4xl font-bold text-blue-400">12+</div>
                  <div className="text-sm text-muted-foreground mt-1">Courses</div>
                </div>
                <div className="stat-item">
                  <div className="text-3xl md:text-4xl font-bold text-purple-400">5.2K+</div>
                  <div className="text-sm text-muted-foreground mt-1">Students</div>
                </div>
                <div className="stat-item">
                  <div className="text-3xl md:text-4xl font-bold text-cyan-400">8.4K+</div>
                  <div className="text-sm text-muted-foreground mt-1">NFTs Minted</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose OnChain Academy?</h2>
              <p className="text-muted-foreground text-lg">The future of blockchain education is here</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="feature-card group relative p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border hover:border-blue-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
                <p className="text-muted-foreground">
                  Hands-on courses with real smart contract examples and live coding environments
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="feature-card group relative p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border hover:border-purple-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Award className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">NFT Certificates</h3>
                <p className="text-muted-foreground">
                  Earn verifiable on-chain credentials that prove your blockchain expertise
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="feature-card group relative p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border hover:border-cyan-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <Trophy className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Arbitrum Powered</h3>
                <p className="text-muted-foreground">
                  Low gas fees and fast transactions on the leading L2 scaling solution
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section ref={coursesRef} className="py-20 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Courses</h2>
              <p className="text-muted-foreground text-lg">Start your Web3 journey today</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="course-card group"
                >
                  <Link href={`/courses/${course.id}`} className="block h-full">
                    <Card className="relative h-full rounded-2xl bg-card border border-border overflow-hidden hover:border-blue-500/50 transition-all">
                      <CardContent className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-muted-foreground/30" />
                      </CardContent>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            className={`text-xs px-2 py-1 rounded-full bg-${course.color}-500/10 text-${course.color}-400 border border-${course.color}-500/20`}
                          >
                            {course.level}
                          </Badge>
                          <span className="font-bold text-sm text-foreground">{course.price}</span>
                        </div>
                        <CardTitle className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground text-sm mb-4">
                          {course.description}
                        </CardDescription>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{course.duration}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="group bg-transparent" asChild>
                <Link href="/courses">
                  View All Courses
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section ref={howItWorksRef} id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">Your journey to Web3 mastery in 4 simple steps</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  number: "01",
                  title: "Connect Your Wallet",
                  description: "Link your Web3 wallet to access courses and track your progress on-chain",
                  icon: Wallet,
                },
                {
                  number: "02",
                  title: "Choose Your Course",
                  description: "Browse our curated collection and select courses that match your skill level",
                  icon: BookOpen,
                },
                {
                  number: "03",
                  title: "Complete & Pass Quiz",
                  description: "Learn through interactive lessons and prove your knowledge with quizzes",
                  icon: CheckCircle,
                },
                {
                  number: "04",
                  title: "Mint Your NFT Certificate",
                  description: "Earn verifiable credentials stored permanently on Arbitrum blockchain",
                  icon: Award,
                },
              ].map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="how-it-works-step flex gap-6 p-6 rounded-2xl bg-card/50 border border-border hover:border-blue-500/50 transition-all"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/20">
                      <step.icon className="w-8 h-8 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-mono text-blue-400 mb-2">{step.number}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section ref={ctaRef} className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl bg-card/10 backdrop-blur-sm border border-white/10 p-8 md:p-10 text-center max-w-4xl mx-auto"
            >
              <div className="relative z-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground text-balance">
                  Ready to Start Your Web3 Journey?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto text-balance">
                  Join thousands of learners building the future of the internet
                </p>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-10 px-6" asChild>
                  <Link href="/courses">
                    Get Started Free <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
              <div className="absolute inset-0 bg-blue-500/5 opacity-50" />
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">OnChain Academy</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Docs
                </Link>
                <Link href="/support" className="hover:text-foreground transition-colors">
                  Support
                </Link>
              </div>
              <div className="text-sm text-muted-foreground">© 2025 OnChain Academy. Built on Arbitrum.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
