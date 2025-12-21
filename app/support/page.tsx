import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
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
                </div>
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Need Support?
                    </h1>
                    <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
                        Have questions or need assistance with your learning journey? Our support team is here to help you navigate the decentralized web.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <Card className="bg-card/50 border-border hover:border-blue-500/50 transition-colors">
                            <CardContent className="p-8 flex flex-col items-center text-center h-full justify-between">
                                <div>
                                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                        <span className="text-3xl">📧</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">Email Us</h3>
                                    <p className="text-muted-foreground mb-6">Get in touch for partnership opportunities, media inquiries, or general questions.</p>
                                </div>
                                <Button variant="outline" className="w-full bg-transparent" asChild>
                                    <a href="mailto:support@onchainacademy.com">support@onchainacademy.com</a>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/50 border-border hover:border-purple-500/50 transition-colors">
                            <CardContent className="p-8 flex flex-col items-center text-center h-full justify-between">
                                <div>
                                    <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                                        <span className="text-3xl">💬</span>
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3">Join Discord</h3>
                                    <p className="text-muted-foreground mb-6">Get real-time help from our community, connect with mentors, and find study groups.</p>
                                </div>
                                <Button variant="outline" className="w-full bg-transparent" asChild>
                                    <a href="#">Join Server</a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
