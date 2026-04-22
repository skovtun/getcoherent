'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

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
  'add-page': 'text-[var(--accent)]',
  'modify-page': 'text-[var(--fg-muted)]',
  'add-component': 'text-[var(--accent)]',
  'modify-component': 'text-[var(--fg-muted)]',
  'modify-tokens': 'text-[#e5c07b]',
  'modify-config': 'text-[var(--fg-muted)]',
  init: 'text-[var(--accent)]',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
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
  const countToLevel = (count: number) =>
    count === 0 ? 0 : Math.min(4, Math.ceil(count / 3))
  const weeks = 52
  const rows = 7
  const monthLabel = (col: number) => {
    const idx = col * rows
    const day = last364[idx]
    if (!day) return ''
    const d = new Date(day + 'T12:00:00')
    if (d.getDate() > 7) return ''
    return d.toLocaleDateString(undefined, { month: 'short' }).toLowerCase()
  }

  const summary = [
    {
      href: '/design-system/components',
      label: 'components',
      value: components.length,
      hint: 'view all',
    },
    {
      href: '/design-system/shared',
      label: 'shared',
      value: sharedCount,
      hint: 'header · footer · etc',
    },
    {
      href: '/design-system/tokens',
      label: 'tokens',
      value: tokenTotal,
      hint: 'colors · spacing · radius',
    },
    {
      href: '/design-system/sitemap',
      label: 'pages',
      value: pages.length,
      hint: 'sitemap & analysis',
    },
  ]

  const quickLinks = [
    {
      href: '/design-system/components',
      label: 'Components',
      meta: String(components.length),
    },
    {
      href: '/design-system/shared',
      label: 'Shared Components',
      meta: String(sharedCount),
    },
    {
      href: '/design-system/tokens/colors',
      label: 'Colors',
      meta: `${colorCount}`,
      swatches: true,
    },
    { href: '/design-system/tokens/typography', label: 'Typography', meta: '' },
    {
      href: '/design-system/tokens/spacing',
      label: 'Spacing & Radius',
      meta: `${spacingCount + radiusCount}`,
    },
    { href: '/design-system/docs', label: 'Documentation', meta: '' },
    { href: '/design-system/recommendations', label: 'Recommendations', meta: '' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER */}
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Design System
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Components, tokens, and recent activity — for this project.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {summary.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="press group rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-4 outline-none transition-colors hover:border-[var(--accent-dim)] hover:bg-[var(--surface-2)]"
          >
            <div className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
              {s.label}
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="mono text-[28px] font-medium leading-none tracking-tight tabular-nums text-[var(--foreground)]">
                {s.value}
              </span>
            </div>
            <div className="mono mt-2 flex items-center justify-between text-[10.5px] text-[var(--fg-dim)]">
              <span>{s.hint}</span>
              <ArrowRight
                size={11}
                strokeWidth={2}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* ACTIVITY HEATMAP */}
      <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-4">
        <div className="mb-3 flex items-center justify-between">
          <SectionLabel>activity · last year</SectionLabel>
          <span className="mono text-[10.5px] text-[var(--fg-dim)] tabular-nums">
            {changes.length} events
          </span>
        </div>
        <div className="w-full overflow-x-auto pb-1">
          <div className="mono mb-1 flex min-w-0 gap-0.5 text-[9px] text-[var(--fg-dim)] sm:gap-1">
            {Array.from({ length: weeks }, (_, col) => (
              <span key={col} className="w-2.5 min-w-2.5 shrink-0 sm:w-3 sm:min-w-3">
                {monthLabel(col)}
              </span>
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
                              ? 'color-mix(in srgb, var(--accent) 25%, var(--border))'
                              : level === 2
                                ? 'color-mix(in srgb, var(--accent) 50%, var(--border))'
                                : level === 3
                                  ? 'color-mix(in srgb, var(--accent) 75%, var(--border))'
                                  : 'var(--accent)',
                      }}
                      title={`${day}: ${count} change${count === 1 ? '' : 's'}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="mono mt-3 flex items-center gap-2 text-[10px] text-[var(--fg-dim)]">
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
                      : `color-mix(in srgb, var(--accent) ${i * 25}%, var(--border))`,
                }}
              />
            ))}
          </div>
          <span>more</span>
        </div>
        {changes.length === 0 && (
          <p className="mono mt-3 text-[11px] text-[var(--fg-dim)]">
            no activity yet · run{' '}
            <code className="rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-0.5 text-[var(--foreground)]">
              coherent chat
            </code>{' '}
            to start
          </p>
        )}
      </div>

      {/* TWO-COL — QUICK LINKS + RECENT CHANGES */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-4 py-3">
            <SectionLabel>quick links</SectionLabel>
          </div>
          <div className="flex flex-col p-2">
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="press mono flex items-center justify-between rounded-md px-3 py-2 text-[12.5px] text-[var(--foreground)] outline-none transition-colors hover:bg-[var(--elevated)]"
              >
                <div className="flex items-center gap-2.5">
                  <span>{l.label}</span>
                  {l.swatches && (
                    <div className="flex gap-0.5">
                      <span className="h-2.5 w-2.5 rounded-sm bg-[var(--accent)]" />
                      <span className="h-2.5 w-2.5 rounded-sm border border-[var(--border-strong)] bg-[var(--fg-muted)]" />
                      <span className="h-2.5 w-2.5 rounded-sm bg-[var(--error)]" />
                    </div>
                  )}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] text-[var(--fg-dim)] tabular-nums">
                  {l.meta}
                  <ArrowRight size={10} strokeWidth={2} />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
          <div className="border-b border-[var(--border)] px-4 py-3">
            <SectionLabel>recent changes</SectionLabel>
          </div>
          <div className="p-2">
            {changes.length === 0 ? (
              <p className="mono px-2 py-3 text-[11.5px] text-[var(--fg-dim)]">
                no changes recorded yet
              </p>
            ) : (
              <div className="flex flex-col">
                {changes.slice(0, 10).map((change, i) => (
                  <div
                    key={i}
                    className="mono flex items-start gap-3 border-b border-[var(--border)] px-3 py-2 text-[11.5px] last:border-0"
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded-[3px] border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 text-[9px] uppercase tracking-[0.08em] ${
                        TYPE_TONE[change.type] || 'text-[var(--fg-muted)]'
                      }`}
                    >
                      {TYPE_LABELS[change.type] || 'EVENT'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[var(--foreground)]">
                        {change.description}
                      </div>
                      <div className="mt-0.5 text-[10.5px] text-[var(--fg-dim)]">
                        {timeAgo(change.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
                {changes.length > 10 && (
                  <p className="mono pt-2 text-center text-[10.5px] text-[var(--fg-dim)]">
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
