'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

// ─── Particle Dot Grid ─────────────────────────────────────────────

interface Dot {
  x: number
  y: number
  baseRadius: number
  baseAlpha: number
  pulse: boolean
  pulsePhase: number
  pulseDuration: number
}

const MOUSE_RADIUS = 200
const GLOW_RADIUS_MAX = 2
const GLOW_ALPHA_MAX = 0.3

export function ParticleDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dotsRef = useRef<Dot[]>([])
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = []
    const spacing = 50
    const cols = Math.ceil(width / spacing) + 1
    const rows = Math.ceil(height / spacing) + 1
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * spacing,
          y: row * spacing,
          baseRadius: 0.5 + Math.random() * 0.3,
          baseAlpha: 0.03 + Math.random() * 0.02,
          pulse: Math.random() < 0.1,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseDuration: 3 + Math.random() * 2,
        })
      }
    }
    dotsRef.current = dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    startTimeRef.current = performance.now()
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
      initDots(rect.width, rect.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    const draw = () => {
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio
      ctx.clearRect(0, 0, w, h)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const rSq = MOUSE_RADIUS * MOUSE_RADIUS
      const t = (performance.now() - startTimeRef.current) / 1000

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx
        const dy = dot.y - my
        const dSq = dx * dx + dy * dy
        let r = dot.baseRadius
        let a = dot.baseAlpha

        if (dSq < rSq) {
          const dist = Math.sqrt(dSq)
          const tMouse = 1 - dist / MOUSE_RADIUS
          const ease = tMouse * tMouse * (3 - 2 * tMouse)
          r += ease * (GLOW_RADIUS_MAX - dot.baseRadius)
          a += ease * (GLOW_ALPHA_MAX - dot.baseAlpha)
        }

        if (dot.pulse) {
          const cycle = (t / dot.pulseDuration) * Math.PI * 2 + dot.pulsePhase
          const pulseAmount = (Math.sin(cycle) + 1) / 2
          a = 0.02 + pulseAmount * 0.06
        }

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(148,163,184,${a})`
        ctx.fill()
      }
      animFrameRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', checkMobile)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [initDots])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: isMobile ? 'none' : 'auto' }}
      aria-hidden="true"
    />
  )
}

// ─── Floating Code Snippets ─────────────────────────────────────────

const SNIPPETS = [
  { code: 'import { Header } from\n  "@/shared/header"', className: 'top-[8%] left-[2%] text-xs opacity-[0.5]', dur: '14s', del: '0s', ty: 60, tx: 25 },
  { code: '<Button variant="primary">\n  Get Started\n</Button>', className: 'top-[18%] right-[2%] text-xs opacity-[0.52]', dur: '12s', del: '-6s', ty: 50, tx: 30 },
  { code: 'CID-001 → Header → 5 pages', className: 'bottom-[32%] left-[3%] text-xs opacity-[0.45]', dur: '16s', del: '-10s', ty: 70, tx: 20 },
  { code: '--primary: 221 83% 53%\n--radius: 0.5rem', className: 'top-[12%] right-[6%] text-xs opacity-[0.5]', dur: '13s', del: '-4s', ty: 45, tx: 35 },
  { code: 'coherent validate\n✔ 0 errors  ✔ 12 pages', className: 'bottom-[22%] right-[3%] text-xs opacity-[0.55]', dur: '15s', del: '-14s', ty: 55, tx: 15 },
  { code: 'export → production-ready', className: 'bottom-[38%] left-[5%] text-xs opacity-[0.4]', dur: '11s', del: '-8s', ty: 40, tx: 20 },
]

export function FloatingSnippets() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden hidden md:block">
      {SNIPPETS.map((s, i) => (
        <div
          key={i}
          className={`absolute font-mono whitespace-pre leading-relaxed rounded-lg px-3 py-2 bg-zinc-900/60 backdrop-blur-md border border-zinc-700/30 shadow-lg shadow-black/20 ${s.className}`}
          style={{ animation: `float${i} ${s.dur} ease-in-out infinite`, animationDelay: s.del }}
        >
          <span className="text-emerald-400">{s.code}</span>
        </div>
      ))}
      <style>{SNIPPETS.map((s, i) => `
        @keyframes float${i} {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(${s.tx * 0.6}px, -${s.ty * 0.5}px); }
          50% { transform: translate(-${s.tx * 0.3}px, ${s.ty * 0.5}px); }
          75% { transform: translate(-${s.tx}px, -${s.ty * 0.7}px); }
        }`).join('')}</style>
    </div>
  )
}
