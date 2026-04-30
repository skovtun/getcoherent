'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Change {
  type: string
  description: string
  timestamp: string
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  const hrs = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hrs < 24) return `${hrs}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

const TYPE_LABELS: Record<string, string> = {
  'add-page': 'PAGE',
  'modify-page': 'PAGE',
  'add-component': 'COMP',
  'modify-component': 'COMP',
  'modify-tokens': 'TOKEN',
  'modify-config': 'CONFIG',
  init: 'INIT',
}

const TYPE_TONE: Record<string, string> = {
  'add-page': 'text-primary',
  'modify-page': 'text-muted-foreground',
  'add-component': 'text-primary',
  'modify-component': 'text-muted-foreground',
  'modify-tokens': 'text-muted-foreground',
  'modify-config': 'text-muted-foreground',
  init: 'text-primary',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

function ArrowIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
    </svg>
  )
}

function activityLevel(changes: Change[]): { total: number; days: Map<string, number> } {
  const days = new Map<string, number>()
  for (const c of changes) {
    const d = c.timestamp.slice(0, 10)
    days.set(d, (days.get(d) ?? 0) + 1)
  }
  return { total: changes.length, days }
}

export default function DesignSystemPage() {
  const [components, setComponents] = useState<any[]>([])
  const [tokens, setTokens] = useState<any>(null)
  const [pages, setPages] = useState<any[]>([])
  const [changes, setChanges] = useState<Change[]>([])
  const [sharedCount, setSharedCount] = useState(0)

  useEffect(() => {
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => {
        setComponents(data.components ?? [])
        setTokens(data.tokens ?? null)
        setPages(data.pages ?? [])
      })
      .catch(() => {})
    fetch('/api/design-system/changes')
      .then((res) => res.json())
      .then((data) => setChanges(Array.isArray(data) ? data : []))
      .catch(() => {})
    fetch('/api/design-system/shared-components')
      .then((res) => res.json())
      .then((data) => setSharedCount((data.shared ?? []).length))
      .catch(() => {})
  }, [])

  const colorCount = tokens?.colors?.light ? Object.keys(tokens.colors.light).length : 0
  const spacingCount = tokens?.spacing ? Object.keys(tokens.spacing).length : 0
  const radiusCount = tokens?.radius ? Object.keys(tokens.radius).length : 0
  const tokenTotal = colorCount + spacingCount + radiusCount
  const { days: actDays } = activityLevel(changes)

  const totalDays = 364
  const last364 = Array.from({ length: totalDays }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (totalDays - 1 - i))
    return d.toISOString().slice(0, 10)
  })
  const countToLevel = (count: number) => (count === 0 ? 0 : Math.min(4, Math.ceil(count / 3)))
  const weeks = 52
  const rows = 7
  const monthLabel = (col: number) => {
    const idx = col * rows
    const day = last364[idx]
    if (!day) return ''
    const d = new Date(day + 'T12:00:00')
    if (d.getDate() > 7) return ''
    return d.toLocaleDateString(undefined, { month: 'short' })
  }

  const summary = [
    { href: '/design-system/tokens', label: 'foundations', value: tokenTotal, hint: 'tokens · colors · type' },
    { href: '/design-system/components', label: 'base', value: components.length, hint: 'shadcn primitives' },
    { href: '/design-system/shared', label: 'shared', value: sharedCount, hint: 'header · footer · etc' },
    { href: '/design-system/sitemap', label: 'pages', value: pages.length, hint: 'sitemap & analysis' },
  ]

  const quickLinks = [
    { href: '/design-system/tokens/colors', label: 'Colors', meta: String(colorCount), swatches: true },
    { href: '/design-system/tokens/typography', label: 'Typography', meta: '' },
    { href: '/design-system/tokens/spacing', label: 'Spacing & Radius', meta: String(spacingCount + radiusCount) },
    { href: '/design-system/voice', label: 'Voice', meta: '' },
    { href: '/design-system/components', label: 'Base Components', meta: String(components.length) },
    { href: '/design-system/shared', label: 'Shared Components', meta: String(sharedCount) },
    { href: '/design-system/sitemap', label: 'Sitemap', meta: String(pages.length) },
    { href: '/design-system/docs', label: 'Documentation', meta: '' },
    { href: '/design-system/recommendations', label: 'Recommendations', meta: '' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Design System
        </h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Components, tokens, and recent activity — for this project.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group rounded-md border border-border bg-card p-4 outline-none transition-colors hover:border-primary/50 hover:bg-muted"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
              {s.label}
            </div>
            <div className="mt-1.5 font-mono text-[28px] font-medium leading-none tracking-tight tabular-nums text-foreground">
              {s.value}
            </div>
            <div className="mt-2 flex items-center justify-between font-mono text-[10.5px] text-muted-foreground/70">
              <span>{s.hint}</span>
              <ArrowIcon className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>

      {/* ACTIVITY HEATMAP */}
      <div className="rounded-md border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <SectionLabel>activity · last year</SectionLabel>
          <span className="font-mono text-[10.5px] tabular-nums text-muted-foreground/70">
            {changes.length} events
          </span>
        </div>
        <div className="w-full overflow-x-auto pb-1">
          <div className="mb-1 flex min-w-0 gap-0.5 font-mono text-[9px] text-muted-foreground/70 sm:gap-1">
            {Array.from({ length: weeks }, (_, col) => (
              <span key={col} className="w-2.5 min-w-2.5 shrink-0 sm:w-3 sm:min-w-3">{monthLabel(col).toLowerCase()}</span>
            ))}
          </div>
          <div className="flex min-w-0 items-start gap-0.5 touch-pan-x sm:gap-1">
          {Array.from({ length: weeks }, (_, col) => (
            <div key={col} className="flex shrink-0 flex-col gap-0.5">
              {Array.from({ length: rows }, (_, row) => {
                const idx = col * rows + row
                const day = last364[idx]
                if (!day) return null
                const count = actDays.get(day) ?? 0
                const level = countToLevel(count)
                return (
                  <div
                    key={day}
                    className="size-2.5 min-w-2.5 rounded-[2px] transition-colors sm:size-3 sm:min-w-3 sm:rounded-sm"
                    style={{
                      backgroundColor:
                        level === 0
                          ? 'var(--border)'
                          : level === 1
                            ? 'color-mix(in srgb, var(--primary) 25%, var(--border))'
                            : level === 2
                              ? 'color-mix(in srgb, var(--primary) 50%, var(--border))'
                              : level === 3
                                ? 'color-mix(in srgb, var(--primary) 75%, var(--border))'
                                : 'var(--primary)',
                    }}
                    title={`${day}: ${count} change${count === 1 ? '' : 's'}`}
                  />
                )
              })}
            </div>
          ))}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-muted-foreground/70">
          <span>less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-2.5 shrink-0 rounded-[2px] sm:size-3 sm:rounded-sm"
                style={{
                  backgroundColor:
                    i === 0
                      ? 'var(--border)'
                      : `color-mix(in srgb, var(--primary) ${i * 25}%, var(--border))`,
                }}
              />
            ))}
          </div>
          <span>more</span>
        </div>
        {changes.length === 0 && (
          <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
            no activity yet · run <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-foreground">coherent chat</code> to start
          </p>
        )}
      </div>

      {/* TWO-COL — QUICK LINKS + RECENT CHANGES */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <SectionLabel>quick links</SectionLabel>
          </div>
          <div className="flex flex-col p-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center justify-between rounded-md px-3 py-2 font-mono text-[12.5px] text-foreground outline-none transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-2.5">
                  <span>{l.label}</span>
                  {l.swatches && (
                    <div className="flex gap-0.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                      <span className="h-2.5 w-2.5 rounded-sm border border-border bg-muted-foreground" />
                      <span className="h-2.5 w-2.5 rounded-sm bg-destructive" />
                    </div>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] tabular-nums text-muted-foreground/70">
                  {l.meta}
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <SectionLabel>recent changes</SectionLabel>
          </div>
          <div className="p-2">
            {changes.length === 0 ? (
              <p className="px-2 py-3 font-mono text-[11.5px] text-muted-foreground/70">
                no changes recorded yet
              </p>
            ) : (
              <div className="flex flex-col">
                {changes.slice(0, 10).map((change, i) => (
                  <div key={i} className="flex items-start gap-3 border-b border-border px-3 py-2 font-mono text-[11.5px] last:border-0">
                    <span className={`mt-0.5 shrink-0 rounded-[3px] border border-border bg-muted px-1.5 text-[9px] uppercase tracking-[0.08em] ${TYPE_TONE[change.type] || 'text-muted-foreground'}`}>
                      {TYPE_LABELS[change.type] || 'EVENT'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-foreground">{change.description}</div>
                      <div className="mt-0.5 text-[10.5px] text-muted-foreground/70">{timeAgo(change.timestamp)}</div>
                    </div>
                  </div>
                ))}
                {changes.length > 10 && (
                  <p className="pt-2 text-center font-mono text-[10.5px] text-muted-foreground/70">
                    + {changes.length - 10} more changes
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
