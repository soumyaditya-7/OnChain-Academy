"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, Shield, Award, Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string

  const [walletAddress] = useState("0x742d...3a9F")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [showMintModal, setShowMintModal] = useState(false)
  const [mintSuccess, setMintSuccess] = useState(false)

  const questions = [
    {
      id: 1,
      question: "What is Solidity?",
      options: [
        "A cryptocurrency",
        "A programming language for smart contracts",
        "A blockchain network",
        "A wallet application",
      ],
      correctAnswer: "A programming language for smart contracts",
    },
    {
      id: 2,
      question: "Which keyword is used to declare a state variable in Solidity?",
      options: ["var", "let", "const", "uint"],
      correctAnswer: "uint",
    },
    {
      id: 3,
      question: "What does 'payable' mean in a Solidity function?",
      options: [
        "The function costs gas",
        "The function can receive Ether",
        "The function is expensive",
        "The function requires payment",
      ],
      correctAnswer: "The function can receive Ether",
    },
    {
      id: 4,
      question: "What is the purpose of the 'view' keyword?",
      options: [
        "To modify state",
        "To read state without modifying it",
        "To hide the function",
        "To make the function visible",
      ],
      correctAnswer: "To read state without modifying it",
    },
    {
      id: 5,
      question: "Which of these is NOT a valid Solidity data type?",
      options: ["address", "string", "float", "bool"],
      correctAnswer: "float",
    },
  ]

  const totalQuestions = questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100
  const correctAnswersCount = Object.entries(selectedAnswers).filter(
    ([questionId, answer]) => questions[Number.parseInt(questionId)].correctAnswer === answer,
  ).length
  const score = (correctAnswersCount / totalQuestions) * 100
  const isPassed = score >= 80

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answer,
    })
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
      if (isPassed) {
        setTimeout(() => {
          setShowMintModal(true)
        }, 1000)
      }
    }
  }

  const handleMintNFT = async () => {
    setIsMinting(true)
    // Simulate minting transaction
    setTimeout(() => {
      setIsMinting(false)
      setMintSuccess(true)
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#60a5fa", "#a78bfa", "#34d399"],
      })
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)
    }, 3000)
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

            <Button variant="outline" className="border-primary/50 text-foreground bg-transparent">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              {walletAddress}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button asChild variant="ghost" className="mb-6 -ml-4">
          <Link href={`/courses/${courseId}`}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto">
          {!showResults ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Wallet Verification Notice */}
              <Card className="p-4 mb-6 bg-[#60a5fa]/10 border-[#60a5fa]/30">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#60a5fa] flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1 text-[#60a5fa]">Wallet-Based Verification</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your quiz results will be verified through your connected wallet. Upon passing, you'll be able to
                      mint an NFT certificate on Arbitrum.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Question Progress</span>
                  <span className="font-semibold">
                    {currentQuestion + 1} / {totalQuestions}
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20 mb-6">
                    <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">
                      Question {currentQuestion + 1}
                    </Badge>
                    <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>

                    <RadioGroup
                      value={selectedAnswers[currentQuestion] || ""}
                      onValueChange={handleAnswerSelect}
                      className="space-y-3"
                    >
                      {questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                            selectedAnswers[currentQuestion] === option
                              ? "border-primary bg-primary/10"
                              : "border-primary/20 hover:border-primary/40 bg-card/30"
                          }`}
                          onClick={() => handleAnswerSelect(option)}
                        >
                          <RadioGroupItem value={option} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </Card>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                      disabled={currentQuestion === 0}
                      className="border-primary/50 hover:bg-primary/10 bg-transparent"
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!selectedAnswers[currentQuestion]}
                      className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0"
                    >
                      {currentQuestion === totalQuestions - 1 ? "Submit Quiz" : "Next Question"}
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              {/* Results */}
              <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-primary/20">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="mb-6"
                >
                  {isPassed ? (
                    <div className="w-24 h-24 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-green-400" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
                      <XCircle className="h-12 w-12 text-red-400" />
                    </div>
                  )}
                </motion.div>

                <h2 className="text-3xl font-bold mb-2">{isPassed ? "Congratulations!" : "Keep Learning"}</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  {isPassed
                    ? "You passed the quiz! You can now mint your NFT certificate."
                    : "You need 80% to pass. Review the course and try again."}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <Card className="p-4 bg-card/30 border-primary/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
                      {Math.round(score)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Your Score</div>
                  </Card>
                  <Card className="p-4 bg-card/30 border-primary/20">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] bg-clip-text text-transparent">
                      {correctAnswersCount}/{totalQuestions}
                    </div>
                    <div className="text-sm text-muted-foreground">Correct Answers</div>
                  </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {isPassed ? (
                    <Button
                      size="lg"
                      onClick={() => setShowMintModal(true)}
                      className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0"
                    >
                      <Award className="mr-2 h-5 w-5" />
                      Mint NFT Certificate
                    </Button>
                  ) : (
                    <>
                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-primary/50 hover:bg-primary/10 bg-transparent"
                      >
                        <Link href={`/courses/${courseId}`}>Review Course</Link>
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => {
                          setShowResults(false)
                          setCurrentQuestion(0)
                          setSelectedAnswers({})
                        }}
                        className="bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0"
                      >
                        Retake Quiz
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      {/* Mint NFT Modal */}
      <Dialog open={showMintModal} onOpenChange={setShowMintModal}>
        <DialogContent className="bg-card border-primary/30">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {mintSuccess ? "NFT Certificate Minted!" : "Mint Your NFT Certificate"}
            </DialogTitle>
            <DialogDescription>
              {mintSuccess
                ? "Your achievement has been recorded on the Arbitrum blockchain."
                : "This will create a verifiable on-chain credential that proves your completion."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            {!mintSuccess ? (
              <>
                <Card className="p-6 mb-6 bg-card/50 border-primary/20">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network</span>
                      <span className="font-medium">Arbitrum One</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Gas Fee</span>
                      <span className="font-medium text-green-400">~$0.02</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">XP Reward</span>
                      <span className="font-medium text-[#a78bfa]">+10 XP</span>
                    </div>
                  </div>
                </Card>

                <Button
                  onClick={handleMintNFT}
                  disabled={isMinting}
                  className="w-full bg-gradient-to-r from-[#60a5fa] to-[#a78bfa] hover:from-[#3b82f6] hover:to-[#8b5cf6] text-white border-0 h-12"
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Minting on Arbitrum...
                    </>
                  ) : (
                    <>
                      <Award className="mr-2 h-5 w-5" />
                      Confirm Mint
                    </>
                  )}
                </Button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="mb-6"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="h-10 w-10 text-green-400" />
                  </div>
                </motion.div>
                <h3 className="text-xl font-bold mb-2">Success!</h3>
                <p className="text-muted-foreground mb-4">Your NFT certificate has been minted successfully.</p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-[#a78bfa]" />
                  <span className="text-muted-foreground">Redirecting to dashboard...</span>
                </div>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
