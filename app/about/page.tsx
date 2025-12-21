import { CheckCircle, Users, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Button variant="ghost" asChild className="pl-0 hover:bg-transparent hover:text-primary">
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        About OnChain Academy
                    </h1>

                    <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                        <div>
                            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                                We are bridging the gap between traditional education and the Web3 revolution.
                                Our mission is to empower the next generation of blockchain developers and enthusiasts
                                with verifiable, on-chain proof of their knowledge.
                            </p>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-6 h-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2">Decentralized Verification</h4>
                                        <p className="text-muted-foreground">
                                            Certificates are minted as NFTs on Arbitrum, ensuring they are tamper-proof,
                                            permanently accessible, and fully owned by you.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold mb-2">Community Driven</h4>
                                        <p className="text-muted-foreground">
                                            Join a vibrant community of learners, mentors, and builders. Collaborate on projects,
                                            get feedback, and grow your network in the crypto space.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[500px] rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-blue-900/10 to-purple-900/10 flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500/5 blur-3xl" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <Sparkles className="w-24 h-24 text-blue-400/50" />
                                <span className="text-sm font-mono text-blue-400/50">EST. 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
