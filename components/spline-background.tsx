'use client'

import Spline from '@splinetool/react-spline'
import { useEffect, useRef } from 'react'

export function SplineBackground() {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Attempt to hide watermark via CSS injection
        const style = document.createElement('style')
        style.innerHTML = `
      #spline-container canvas + div {
        display: none !important;
      }
      #spline-container a {
        display: none !important;
      }
    `
        document.head.appendChild(style)
        return () => {
            document.head.removeChild(style)
        }
    }, [])

    return (
        <div id="spline-container" ref={containerRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60">
            <div className="w-full h-full transform scale-125">
                {/* Using a tech/crypto themed scene */}
                <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
            </div>
        </div>
    )
}
