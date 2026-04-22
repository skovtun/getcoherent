'use client'

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DesignSystemCard } from './DesignSystemCard'
import { TraceConsole } from './TraceConsole'

type SlideId = 'ui' | 'ds'

const SLIDES: { id: SlideId; label: string; caption: string }[] = [
  {
    id: 'ui',
    label: 'Generated UI',
    caption: 'This interface was generated from one prompt.',
  },
  {
    id: 'ds',
    label: 'Design System',
    caption: 'Every token and component — yours to edit.',
  },
]

const AUTO_ADVANCE_MS = 7000

export function HeroPreview() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    setReducedMotion(!!reduce)
  }, [reduce])

  const current = SLIDES[index]

  const advance = () => setIndex((i) => (i + 1) % SLIDES.length)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="w-full"
    >
      {/* TABS — centered */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-1 shadow-[0_4px_14px_-8px_rgba(0,0,0,0.4)]">
          {SLIDES.map((s, i) => {
            const active = i === index
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={`press mono relative h-8 rounded-[5px] px-3.5 text-[12px] font-medium outline-none transition-all duration-[150ms] ${
                  active
                    ? 'bg-[var(--bg)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_var(--border-strong),0_1px_0_rgba(255,255,255,0.02)]'
                    : 'text-[var(--fg-muted)] hover:text-[var(--foreground)]'
                }`}
                aria-pressed={active}
              >
                <span className="mr-1.5 text-[var(--accent)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* PREVIEW CONTAINER — runner border traces perimeter as ambient timer */}
      <div
        className="relative mt-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        >
          <rect
            key={index}
            x="0.5"
            y="0.5"
            width="calc(100% - 1px)"
            height="calc(100% - 1px)"
            rx="15.5"
            ry="15.5"
            fill="none"
            stroke="var(--runner-stroke)"
            strokeWidth="1.25"
            strokeLinecap="round"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{
              opacity: 0.9,
              filter: 'drop-shadow(0 0 2px var(--runner-glow))',
              animationName: reducedMotion
                ? 'none'
                : 'runner-trace, runner-pulse',
              animationDuration: `${AUTO_ADVANCE_MS}ms, 1.4s`,
              animationTimingFunction: 'linear, ease-in-out',
              animationIterationCount: 'infinite, infinite',
              animationDelay: '0.45s, 0s',
              animationPlayState: paused
                ? 'paused, running'
                : 'running, paused',
            }}
            onAnimationIteration={(e) => {
              if (
                !paused &&
                (e as unknown as { animationName: string }).animationName ===
                  'runner-trace'
              ) {
                advance()
              }
            }}
          />
        </svg>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            {current.id === 'ui' ? <GeneratedUISlide /> : <DesignSystemSlide />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CAPTION */}
      <div className="mono mt-5 flex flex-wrap items-center justify-between gap-3 text-[12px] text-[var(--fg-dim)]">
        <span>{current.caption}</span>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--fg-dim)]">
          {paused ? (
            <Pause
              size={10}
              strokeWidth={2.2}
              className="text-[var(--fg-dim)]"
              aria-hidden
            />
          ) : (
            <Play
              size={10}
              strokeWidth={2.2}
              className="text-[var(--accent)]"
              aria-hidden
            />
          )}
          {paused ? 'paused' : 'auto-advancing'} · hover to pause
        </span>
      </div>

      <style jsx global>{`
        :root {
          --runner-stroke: #0f7f48;
          --runner-glow: rgba(15, 127, 72, 0.45);
        }
        .dark {
          --runner-stroke: #3ecf8e;
          --runner-glow: rgba(62, 207, 142, 0.28);
        }
        @keyframes runner-trace {
          from {
            stroke-dashoffset: 100;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes runner-pulse {
          0%,
          100% {
            opacity: 0.95;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </motion.div>
  )
}

function GeneratedUISlide() {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
        </div>
        <div className="mono flex h-6 items-center gap-2 rounded border border-[var(--border)] bg-[var(--bg)] px-3 text-[11px] text-[var(--fg-dim)]">
          <span className="text-[var(--accent)]">●</span>
          <span>trace.dev/acme/prod/traces</span>
        </div>
        <span className="mono text-[11px] text-[var(--fg-dim)]">live</span>
      </div>
      <div className="relative w-full bg-[var(--background)]">
        <TraceConsole />
      </div>
      <div className="mono flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-[11px] text-[var(--fg-dim)]">
        <span>5 pages · 9 shared components · 12 tokens · 23 rules passed</span>
        <span className="inline-flex items-center gap-1.5 text-[var(--accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          generated in under 60s
        </span>
      </div>
    </div>
  )
}

function DesignSystemSlide() {
  return <DesignSystemCard />
}
