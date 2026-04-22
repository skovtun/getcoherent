'use client'

import { MeshGradient } from '@paper-design/shaders-react'
import { useEffect, useState } from 'react'

export function HeroShader() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  const colors = isDark
    ? ['#0a0a0a', '#0f2b1f', '#123b2a', '#1e4a6e', '#2b1a45']
    : ['#fafaf7', '#e0f3e6', '#cfe8d6', '#d7e4f5', '#e8dcf0']

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[720px] overflow-hidden"
      style={{
        maskImage:
          'linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, #000 0%, #000 60%, transparent 100%)',
        opacity: isDark ? 1 : 0.85,
      }}
    >
      <MeshGradient
        colors={colors}
        speed={0.28}
        distortion={0.75}
        swirl={0.22}
        grainMixer={0.5}
        grainOverlay={0.15}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
