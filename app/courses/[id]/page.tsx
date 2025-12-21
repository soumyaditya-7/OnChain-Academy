"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { courses } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, Sparkles, ChevronLeft, PlayCircle, CheckCircle2, Lock, Award, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { useAccount, useConnect } from 'wagmi' // Use wagmi hooks

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  // Wagmi hooks
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()

  // Find course from shared data
  const foundCourse = courses.find(c => c.id === courseId)

  // Default mock course if not found (or to provide lessons structure)
  const defaultCourse = {
    id: "solidity-fundamentals",
    title: "Solidity Fundamentals",
    description: "Master the fundamentals of Solidity programming language...",
    level: "Beginner",
    duration: "4 hours",
    students: "1.2K",
    reward: "10 XP",
    thumbnail: "/solidity-coding-blockchain.jpg", // Placeholder
    lessons: [
      { id: 1, title: "Introduction", duration: "10 min", type: "video" },
      { id: 2, title: "Setup", duration: "15 min", type: "video" },
      { id: 3, title: "Basics", duration: "20 min", type: "video" },
    ]
  }

  const course = {
    ...defaultCourse,
    ...foundCourse,
    // If foundCourse has data, it overrides default.
    // We need to ensure properties match or we map them correctly.
    // generated data from lib/data has: id, title, description, level, duration, students.
    // It is missing: reward, thumbnail, lessons.
    // So we keep default lessons/reward/thumbnail for now.
    price: foundCourse?.price || "Free", // Ensure price is present
    students: foundCourse ? parseInt(foundCourse.students.replace('K', '000').replace('.', '')) : 1240, // rough parse
  }

  // Ensure lessons exist if we switched to a course that isn't the default one
  // Realistically we should have full data in lib/data but for now we mix them.

  const [completedLessons, setCompletedLessons] = useState<number[]>([]) // Reset for demo logic
  // Assume "blockchain-fundamentals" is the only free/started one for demo, others need buying
  const isCourseOwned = course.price === "Free" || completedLessons.length > 0;

  const totalLessons = course.lessons.length
  const progress = isCourseOwned ? (completedLessons.length / totalLessons) * 100 : 0
  const nextLesson = course.lessons.find((lesson) => !completedLessons.includes(lesson.id))
  const isQuizUnlocked = completedLessons.length >= totalLessons - 1

  const handleConnect = () => {
    // Simple connect trigger
    const metamask = connectors.find((c) => c.name === 'MetaMask')
    if (metamask) connect({ connector: metamask })
    else connect({ connector: connectors[0] })
  }

  const handleBuy = () => {
    // Mock buy logic
    alert(`Buying course: ${course.title} for ${course.price}`)
    // In a real app, this would trigger a transaction
    setCompletedLessons([1]) // Simulate purchase success by unlocking first lesson or adding to state
  }

  const handleLessonClick = (lessonId: number) => {
    if (!isCourseOwned) return;

    if (lessonId === 9 && isQuizUnlocked) {
      router.push(`/courses/${courseId}/quiz`)
    } else if (!completedLessons.includes(lessonId)) {
      // Simulate completing lesson
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

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
                ArbiLearn
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            </nav>

            {isConnected && (
              <Button variant="outline" className="border-primary/50 text-foreground bg-transparent">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 -ml-4">
          <Link href="/courses">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <Badge
                    className={`mb-4 ${course.level === "Beginner"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-[#60a5fa]/20 text-[#60a5fa] border-[#60a5fa]/30"
                      }`}
                  >
                    {course.level}
                  </Badge>
                  <h1 className="text-4xl font-bold mb-3 text-white">{course.title}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.students} students
                    </div>
                    <div className="flex items-center gap-1 text-[#a78bfa]">
                      <Sparkles className="h-4 w-4" />
                      {course.reward} + NFT
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-muted-foreground leading-relaxed">{course.description}</p>
              </Card>

              {/* Lessons List */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Course Content</h2>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => {
                    const isCompleted = completedLessons.includes(lesson.id)
                    const isLocked = lesson.type === "quiz" && !isQuizUnlocked
                    const isCurrent = nextLesson?.id === lesson.id

                    return (
                      <motion.div
                        key={lesson.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card
                          className={`p-4 cursor-pointer transition-all duration-300 ${isCompleted
                            ? "bg-green-500/10 border-green-500/30"
                            : isCurrent
                              ? "bg-primary/10 border-primary/50"
                              : isLocked
                                ? "bg-card/30 border-primary/10 opacity-60 cursor-not-allowed"
                                : "bg-card/50 border-primary/20 hover:border-primary/50"
                            }`}
                          onClick={() => !isLocked && handleLessonClick(lesson.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isCompleted
                                ? "bg-green-500/20"
                                : isCurrent
                                  ? "bg-primary/20"
                                  : isLocked
                                    ? "bg-muted/20"
                                    : "bg-muted/50"
                                }`}
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-green-400" />
                              ) : isLocked ? (
                                <Lock className="h-5 w-5 text-muted-foreground" />
                              ) : lesson.type === "quiz" ? (
                                <Award className="h-5 w-5 text-primary" />
                              ) : (
                                <PlayCircle className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold mb-1">
                                {index + 1}. {lesson.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{lesson.duration}</p>
                            </div>
                            {isCurrent && !isCompleted && (
                              <Badge className="bg-primary/20 text-primary border-primary/30">Continue</Badge>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="text-xl font-bold mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-semibold">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                  <div className="pt-4 border-t border-primary/20">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Lessons completed</span>
                      <span className="font-semibold">
                        {completedLessons.length} / {totalLessons}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Course Action Card */}
              <Card className="p-6 bg-gradient-to-br from-[#60a5fa]/10 to-[#a78bfa]/10 border-primary/30">
                {!isCourseOwned ? (
                  <>
                    <h3 className="font-bold mb-2 text-xl">Unlock Full Access</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get lifetime access to all lessons, quizzes, and earn your NFT certificate.
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-muted-foreground">Price</span>
                      <span className="text-xl font-bold text-foreground">{course.price}</span>
                    </div>
                    {!isConnected ? (
                      <Button
                        onClick={handleConnect}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        Connect Wallet to Buy
                      </Button>
                    ) : (
                      <Button
                        onClick={handleBuy}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                      >
                        Buy Now
                      </Button>
                    )}
                  </>
                ) : nextLesson ? (
                  <>
                    <h3 className="font-bold mb-2">Up Next</h3>
                    <p className="text-sm text-muted-foreground mb-4">{nextLesson.title}</p>
                    <Button
                      onClick={() => handleLessonClick(nextLesson.id)}
                      className="w-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0"
                    >
                      {nextLesson.type === "quiz" ? "Start Quiz" : "Continue Learning"}
                    </Button>
                  </>
                ) : (
                  <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <h3 className="font-bold mb-2">Course Completed!</h3>
                    <p className="text-sm text-muted-foreground">You have earned your certificate.</p>
                  </div>
                )}
              </Card>

              {/* Reward Info */}
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="text-xl font-bold mb-4">Course Rewards</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#a78bfa]/20">
                      <Sparkles className="h-5 w-5 text-[#a78bfa]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">XP Tokens</h4>
                      <p className="text-sm text-muted-foreground">Earn {course.reward} upon completion</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#60a5fa]/20">
                      <Award className="h-5 w-5 text-[#60a5fa]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">NFT Certificate</h4>
                      <p className="text-sm text-muted-foreground">Verifiable on-chain credential</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
