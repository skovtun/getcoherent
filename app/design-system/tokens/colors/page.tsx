'use client'
import { useEffect, useState } from 'react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

function ColorRow({
  name,
  value,
  cssVar,
}: {
  name: string
  value: string
  cssVar?: string
}) {
  return (
    <div className="mono flex items-center gap-4 border-b border-[var(--border)] px-3 py-2 last:border-0">
      <div
        className="h-9 w-9 shrink-0 rounded-md border border-[var(--border-strong)]"
        style={{ backgroundColor: value }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[12.5px] text-[var(--foreground)]">{name}</div>
        <div className="mt-0.5 text-[10.5px] text-[var(--fg-dim)] tabular-nums">
          {value}
          {cssVar && (
            <>
              {' · '}
              <span className="text-[var(--accent)]">var({cssVar})</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ColorsPage() {
  const [tokens, setTokens] = useState<{
    colors?: { light?: Record<string, string>; dark?: Record<string, string> }
  } | null>(null)
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

  const light = tokens?.colors?.light ?? {}
  const dark = tokens?.colors?.dark ?? {}
  const keys = Array.from(new Set([...Object.keys(light), ...Object.keys(dark)]))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Color Tokens
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Design system color variables — light and dark themes.
        </p>
      </div>

      {loading ? (
        <p className="mono text-[11.5px] text-[var(--fg-dim)]">loading…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <SectionLabel>light · palette</SectionLabel>
            </div>
            {keys.length === 0 ? (
              <p className="mono px-4 py-6 text-[11.5px] text-[var(--fg-dim)]">
                no color tokens
              </p>
            ) : (
              <div className="p-2">
                {keys.map((key) => {
                  const value = light[key]
                  if (!value) return null
                  return (
                    <ColorRow
                      key={`light-${key}`}
                      name={key}
                      value={value}
                      cssVar={`--${key}`}
                    />
                  )
                })}
              </div>
            )}
          </div>
          <div className="dark overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <SectionLabel>dark · palette</SectionLabel>
            </div>
            {keys.length === 0 ? (
              <p className="mono px-4 py-6 text-[11.5px] text-[var(--fg-dim)]">
                no color tokens
              </p>
            ) : (
              <div className="p-2">
                {keys.map((key) => {
                  const value = dark[key]
                  if (!value) return null
                  return <ColorRow key={`dark-${key}`} name={key} value={value} />
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
