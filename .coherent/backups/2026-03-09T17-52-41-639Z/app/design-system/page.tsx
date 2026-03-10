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

const typeIcons: Record<string, string> = {
  'add-page': '📄',
  'modify-page': '✏️',
  'add-component': '🧩',
  'modify-component': '🔧',
  'modify-tokens': '🎨',
  'modify-config': '⚙️',
  init: '🚀',
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Design System</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your project's components, tokens, and recent activity.
        </p>
      </div>

      {/* Summary cards: Components, Shared, Tokens, Documentation (no separate Pages/Changes) */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Link href="/design-system/components" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <div className="text-2xl font-bold">{components.length}</div>
          <div className="text-sm text-muted-foreground">Components</div>
          <div className="text-xs text-muted-foreground mt-1">View all →</div>
        </Link>
        <Link href="/design-system/shared" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <div className="text-2xl font-bold">{sharedCount}</div>
          <div className="text-sm text-muted-foreground">Shared Components</div>
          <div className="text-xs text-muted-foreground mt-1">Header, Footer, etc. →</div>
        </Link>
        <Link href="/design-system/tokens" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <div className="text-2xl font-bold">{tokenTotal}</div>
          <div className="text-sm text-muted-foreground">Tokens</div>
          <div className="text-xs text-muted-foreground mt-1">Colors · Spacing · Radius</div>
        </Link>
        <Link href="/design-system/docs" className="rounded-lg border p-4 hover:border-primary transition-colors">
          <div className="text-2xl font-bold">{pages.length}</div>
          <div className="text-sm text-muted-foreground">Documentation</div>
          <div className="text-xs text-muted-foreground mt-1">Docs →</div>
        </Link>
      </div>

      {/* Activity heatmap (last year) — GitHub-style grid, contained so it never overflows screen */}
      <div className="rounded-lg border p-3 sm:p-4 w-full max-w-full overflow-hidden">
        <h2 className="text-sm font-medium mb-2 sm:mb-3">Activity (last year)</h2>
        <div className="w-full max-w-full overflow-x-auto overflow-y-hidden pb-1">
          <div className="flex gap-0.5 sm:gap-1 text-[10px] text-muted-foreground mb-1 min-w-0">
            {Array.from({ length: weeks }, (_, col) => (
              <span key={col} className="shrink-0 w-2.5 min-w-2.5 sm:w-3 sm:min-w-3">{monthLabel(col)}</span>
            ))}
          </div>
          <div className="flex items-start gap-0.5 sm:gap-1 min-w-0 touch-pan-x">
          {Array.from({ length: weeks }, (_, col) => (
            <div key={col} className="flex flex-col gap-0.5 shrink-0">
              {Array.from({ length: rows }, (_, row) => {
                const idx = col * rows + row
                const day = last364[idx]
                if (!day) return null
                const count = actDays.get(day) ?? 0
                const level = countToLevel(count)
                return (
                  <div
                    key={day}
                    className="size-2.5 min-w-2.5 sm:size-3 sm:min-w-3 rounded-[2px] sm:rounded-sm transition-colors"
                    style={{
                      backgroundColor:
                        level === 0
                          ? 'var(--muted)'
                          : level === 1
                            ? 'color-mix(in srgb, var(--primary) 25%, var(--muted))'
                            : level === 2
                              ? 'color-mix(in srgb, var(--primary) 50%, var(--muted))'
                              : level === 3
                                ? 'color-mix(in srgb, var(--primary) 75%, var(--muted))'
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
        <div className="flex items-center gap-2 mt-2 flex-shrink-0">
          <span className="text-xs text-muted-foreground">Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="size-2.5 sm:size-3 rounded-[2px] sm:rounded-sm shrink-0"
                style={{
                  backgroundColor:
                    i === 0
                      ? 'var(--muted)'
                      : `color-mix(in srgb, var(--primary) ${i * 25}%, var(--muted))`,
                }}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">More</span>
        </div>
        {changes.length === 0 && (
          <p className="text-xs text-muted-foreground mt-2">No activity yet. Run <code className="rounded bg-muted px-1">coherent chat</code> to start building.</p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick links */}
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium mb-3">Quick links</h2>
          <div className="space-y-2">
            <Link href="/design-system/components" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <span>Components ({components.length})</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
            <Link href="/design-system/shared" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <span>Shared Components ({sharedCount})</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
            <Link href="/design-system/tokens/colors" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <div className="flex items-center gap-2">
                <span>Colors</span>
                <div className="flex gap-0.5">
                  <div className="size-3 rounded-sm bg-primary" />
                  <div className="size-3 rounded-sm bg-secondary border" />
                  <div className="size-3 rounded-sm bg-destructive" />
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{colorCount} →</span>
            </Link>
            <Link href="/design-system/tokens/typography" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <span>Typography</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
            <Link href="/design-system/tokens/spacing" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <span>Spacing & Radius</span>
              <span className="text-xs text-muted-foreground">{spacingCount + radiusCount} →</span>
            </Link>
            <Link href="/design-system/docs" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <span>Documentation</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
            <Link href="/design-system/recommendations" className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted transition-colors">
              <span>Recommendations</span>
              <span className="text-xs text-muted-foreground">→</span>
            </Link>
          </div>
        </div>

        {/* Recent changes log */}
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium mb-3">Recent changes</h2>
          {changes.length === 0 ? (
            <p className="text-sm text-muted-foreground">No changes recorded yet.</p>
          ) : (
            <div className="space-y-0">
              {changes.slice(0, 10).map((change, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                  <span className="text-sm shrink-0 mt-0.5" title={change.type}>
                    {typeIcons[change.type] || '📝'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate">{change.description}</div>
                    <div className="text-xs text-muted-foreground">{timeAgo(change.timestamp)}</div>
                  </div>
                </div>
              ))}
              {changes.length > 10 && (
                <p className="text-xs text-muted-foreground pt-2 text-center">
                  + {changes.length - 10} more changes
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
