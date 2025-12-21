import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OnChain Academy|Where Knowledge Becomes On-Chain Proof",
  description: "A decentralized learning platform where users learn Web3 skills and earn on-chain NFT certificates and XP powered by Arbitrum.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "logo2.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "logo2.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "logo2.png",
        type: "logo2.png",
      },
    ],
    apple: "logo2.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
