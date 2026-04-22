'use client'

import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

export function CountUp({
  value,
  suffix = '',
  prefix = '',
  format = 'commas',
  duration = 1.4,
  className = '',
}: {
  value: number
  suffix?: string
  prefix?: string
  format?: 'commas' | 'int' | 'decimal2'
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()

  const mv = useMotionValue(reduce ? value : 0)
  const spring = useSpring(mv, {
    damping: 28,
    stiffness: 120,
    mass: 0.7,
    duration: duration * 1000,
  })

  const fmt =
    format === 'int'
      ? (n: number) => String(Math.round(n))
      : format === 'decimal2'
        ? (n: number) => n.toFixed(2)
        : (n: number) => Math.round(n).toLocaleString('en-US')

  const display = useTransform(spring, (latest) => `${prefix}${fmt(latest)}${suffix}`)

  useEffect(() => {
    if (reduce) {
      mv.set(value)
      return
    }
    if (inView) mv.set(value)
  }, [inView, value, reduce, mv])

  useEffect(() => {
    const unsub = display.on('change', (v) => {
      if (ref.current) ref.current.textContent = v
    })
    return () => unsub()
  }, [display])

  return (
    <span ref={ref} className={className}>
      {reduce ? `${prefix}${fmt(value)}${suffix}` : `${prefix}${fmt(0)}${suffix}`}
    </span>
  )
}
