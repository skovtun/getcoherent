import { ReactNode } from 'react'

type Tone = 'default' | 'accent' | 'dim'

const tones: Record<Tone, string> = {
  default:
    'bg-[var(--elevated)] text-[var(--fg-muted)] border-[var(--border-strong)]',
  accent:
    'bg-[rgba(62,207,142,0.08)] text-[var(--accent)] border-[rgba(62,207,142,0.28)]',
  dim: 'bg-transparent text-[var(--fg-dim)] border-[var(--border)]',
}

export function SiteBadge({
  children,
  tone = 'default',
  className = '',
}: {
  children: ReactNode
  tone?: Tone
  className?: string
}) {
  return (
    <span
      className={`mono inline-flex h-5 items-center gap-1 rounded-[4px] border px-1.5 text-[10.5px] uppercase tracking-[0.08em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
