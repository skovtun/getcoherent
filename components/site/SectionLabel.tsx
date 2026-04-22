import { ReactNode } from 'react'

export function SectionLabel({
  index,
  children,
}: {
  index?: string
  children: ReactNode
}) {
  return (
    <div className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
      {index && <span className="text-[var(--accent)]">[{index}]</span>}
      <span>{children}</span>
      <span className="h-px flex-1 bg-[var(--border)]" />
    </div>
  )
}
