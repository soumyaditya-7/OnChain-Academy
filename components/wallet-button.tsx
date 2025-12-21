'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/button'

export function WalletButton() {
    const { address, isConnected } = useAccount()
    const { connect, connectors } = useConnect()
    const { disconnect } = useDisconnect()

    if (isConnected) {
        return (
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <Button variant="outline" onClick={() => disconnect()}>
                    Disconnect
                </Button>
            </div>
        )
    }

    const metamaskConnector = connectors.find((c) => c.name === 'MetaMask')

    return (
        <Button
            onClick={() => connect({ connector: metamaskConnector || connectors[0] })}
            disabled={!metamaskConnector && connectors.length === 0}
        >
            Connect Wallet
        </Button>
    )
}
