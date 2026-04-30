'use client'
import { useEffect, useState } from 'react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

export default function SpacingPage() {
  const [tokens, setTokens] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => { setTokens(data.tokens ?? null); setLoading(false) })
      .catch(() => { setTokens(null); setLoading(false) })
  }, [])

  const spacing = tokens?.spacing ?? {}
  const radius = tokens?.radius ?? {}

  const toPx = (v: string): number => {
    const m = String(v).trim().match(/^([\d.]+)(rem|px|em)?$/)
    if (!m) return 0
    const n = parseFloat(m[1])
    if (m[2] === 'px') return n
    return n * 16
  }
  const spacingPx = Object.entries(spacing).map(([n, v]) => ({ name: n, value: v as string, px: toPx(v as string) }))
  const maxPx = spacingPx.reduce((m, s) => Math.max(m, s.px), 0) || 1

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Spacing & Radius
        </h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Scale and border radius tokens — used across every component.
        </p>
      </div>

      {loading ? (
        <p className="font-mono text-[11.5px] text-muted-foreground/70">loading…</p>
      ) : (
        <>
          <div className="overflow-hidden rounded-md border border-border bg-card">
            <div className="border-b border-border bg-muted px-4 py-3">
              <SectionLabel>spacing · scale</SectionLabel>
            </div>
            <div className="p-5">
              {spacingPx.length === 0 ? (
                <p className="font-mono text-[11.5px] text-muted-foreground/70">no spacing tokens</p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {spacingPx.map(({ name, value, px }) => (
                    <div key={name} className="grid grid-cols-[44px_72px_56px_1fr] items-center gap-3 font-mono text-[12px]">
                      <div className="text-right font-medium text-foreground">{name}</div>
                      <div className="tabular-nums text-muted-foreground">{value}</div>
                      <div className="text-[10.5px] tabular-nums text-muted-foreground/60">{px}px</div>
                      <div className="relative h-6 w-full">
                        <div className="absolute inset-y-0 left-0 rounded-[3px] bg-primary" style={{ width: `${(px / maxPx) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-border bg-card">
            <div className="border-b border-border bg-muted px-4 py-3">
              <SectionLabel>border radius</SectionLabel>
            </div>
            <div className="p-4">
              {Object.keys(radius).length === 0 ? (
                <p className="font-mono text-[11.5px] text-muted-foreground/70">no radius tokens</p>
              ) : (
                <div className="flex flex-wrap gap-5">
                  {Object.entries(radius).map(([name, value]) => (
                    <div key={name} className="flex flex-col items-center gap-1.5">
                      <div className="h-14 w-14 border-2 border-primary/70 bg-primary/10" style={{ borderRadius: value as string }} />
                      <div className="font-mono text-[11px] font-medium text-foreground">{name}</div>
                      <div className="font-mono text-[10px] tabular-nums text-muted-foreground/70">{value as string}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
