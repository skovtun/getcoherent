'use client'
import { useEffect, useState } from 'react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
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
      .then((data) => {
        setTokens(data.tokens ?? null)
        setLoading(false)
      })
      .catch(() => {
        setTokens(null)
        setLoading(false)
      })
  }, [])

  const spacing = tokens?.spacing ?? {}
  const radius = tokens?.radius ?? {}

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Spacing & Radius
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Scale and border radius tokens — used across every component.
        </p>
      </div>

      {loading ? (
        <p className="mono text-[11.5px] text-[var(--fg-dim)]">loading…</p>
      ) : (
        <>
          <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <SectionLabel>spacing · scale</SectionLabel>
            </div>
            <div className="p-4">
              {Object.keys(spacing).length === 0 ? (
                <p className="mono text-[11.5px] text-[var(--fg-dim)]">no spacing tokens</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {Object.entries(spacing).map(([name, value]) => (
                    <div
                      key={name}
                      className="mono grid grid-cols-[56px_96px_1fr] items-center gap-3 text-[12px]"
                    >
                      <div className="text-right font-medium text-[var(--foreground)]">
                        {name}
                      </div>
                      <div className="text-[10.5px] text-[var(--fg-dim)] tabular-nums">
                        {value as string}
                      </div>
                      <div
                        className="h-5 rounded-sm bg-[var(--accent)]/70"
                        style={{ width: value as string }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <SectionLabel>border radius</SectionLabel>
            </div>
            <div className="p-4">
              {Object.keys(radius).length === 0 ? (
                <p className="mono text-[11.5px] text-[var(--fg-dim)]">no radius tokens</p>
              ) : (
                <div className="flex flex-wrap gap-5">
                  {Object.entries(radius).map(([name, value]) => (
                    <div key={name} className="flex flex-col items-center gap-1.5">
                      <div
                        className="h-14 w-14 border-2 border-[var(--accent)]/70 bg-[var(--accent)]/10"
                        style={{ borderRadius: value as string }}
                      />
                      <div className="mono text-[11px] font-medium text-[var(--foreground)]">
                        {name}
                      </div>
                      <div className="mono text-[10px] text-[var(--fg-dim)] tabular-nums">
                        {value as string}
                      </div>
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
