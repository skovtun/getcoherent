'use client'
import { useEffect, useState } from 'react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

function Card({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
        <SectionLabel>{title}</SectionLabel>
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export default function TypographyPage() {
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

  const typography = tokens?.typography ?? {}
  const fontFamily = typography.fontFamily ?? {}
  const fontSize = typography.fontSize ?? {}
  const fontWeight = typography.fontWeight ?? {}
  const lineHeight = typography.lineHeight ?? {}

  const remToPx = (rem: string) => {
    const val = parseFloat(rem)
    return isNaN(val) ? rem : `${val * 16}px`
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Typography
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Font families, sizes, weights, and line heights.
        </p>
      </div>

      {loading ? (
        <p className="mono text-[11.5px] text-[var(--fg-dim)]">loading…</p>
      ) : (
        <>
          <Card title="font families">
            <div className="flex flex-col gap-5">
              {Object.entries(fontFamily).map(([name, value]) => (
                <div key={name} className="flex flex-col gap-1">
                  <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    {name}
                  </div>
                  <div className="mono text-[10.5px] text-[var(--fg-dim)]">{value as string}</div>
                  <div
                    className="text-[18px] text-[var(--foreground)]"
                    style={{ fontFamily: value as string }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="font sizes">
            <div className="flex flex-col gap-5">
              {Object.entries(fontSize).map(([name, value]) => (
                <div key={name} className="flex flex-col gap-1">
                  <div className="mono flex items-baseline gap-2 text-[10.5px]">
                    <span className="uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                      {name}
                    </span>
                    <span className="text-[var(--fg-dim)] tabular-nums">
                      {value as string} · {remToPx(value as string)}
                    </span>
                  </div>
                  <div
                    className="text-[var(--foreground)]"
                    style={{ fontSize: value as string, lineHeight: 1.2 }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="font weights">
            <div className="flex flex-wrap gap-6">
              {Object.entries(fontWeight).map(([name, value]) => (
                <div key={name} className="flex flex-col items-center gap-1">
                  <div
                    className="text-[28px] leading-none text-[var(--foreground)]"
                    style={{ fontWeight: value as number }}
                  >
                    Aa
                  </div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    {name}
                  </div>
                  <div className="mono text-[10px] text-[var(--fg-dim)] tabular-nums">
                    {String(value)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="line heights">
            <div className="flex flex-col gap-4">
              {Object.entries(lineHeight).map(([name, value]) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div className="mono text-[10.5px] text-[var(--fg-dim)] tabular-nums">
                    <span className="uppercase tracking-[0.14em]">{name}</span>
                    {' · '}
                    <span>{String(value)}</span>
                  </div>
                  <div
                    className="max-w-md rounded-md border border-[var(--border)] bg-[var(--elevated)] p-3 text-[13px] text-[var(--foreground)]"
                    style={{ lineHeight: value as number }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam.
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
