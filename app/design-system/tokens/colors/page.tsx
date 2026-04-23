'use client'
import { useEffect, useState } from 'react'

type Palette = Record<string, string>

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

function readPaletteFromStylesheets(selector: string): Palette {
  if (typeof document === 'undefined') return {}
  const result: Palette = {}
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue
    }
    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSStyleRule)) continue
      if (rule.selectorText !== selector) continue
      for (let i = 0; i < rule.style.length; i++) {
        const prop = rule.style.item(i)
        if (!prop.startsWith('--')) continue
        const value = rule.style.getPropertyValue(prop).trim()
        if (value) result[prop.slice(2)] = value
      }
    }
  }
  return result
}

// Keys we treat as the canonical palette in the DS tokens page.
// If a key exists in CSS but not here, it's shown after these in insertion order.
const PRIORITY_KEYS = [
  'background',
  'foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'muted',
  'muted-foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'destructive',
  'destructive-foreground',
  'success',
  'warning',
  'error',
  'info',
  'border',
  'border-strong',
  'input',
  'ring',
  'surface',
  'surface-2',
  'elevated',
  'fg-muted',
  'fg-dim',
]

function orderKeys(keys: string[]): string[] {
  const known = PRIORITY_KEYS.filter((k) => keys.includes(k))
  const rest = keys.filter((k) => !PRIORITY_KEYS.includes(k)).sort()
  return [...known, ...rest]
}

export default function ColorsPage() {
  const [light, setLight] = useState<Palette>({})
  const [dark, setDark] = useState<Palette>({})
  const [source, setSource] = useState<'css' | 'config' | 'loading'>('loading')

  useEffect(() => {
    const liveLight = readPaletteFromStylesheets(':root')
    const liveDark = readPaletteFromStylesheets('.dark')
    if (Object.keys(liveLight).length > 0 || Object.keys(liveDark).length > 0) {
      setLight(liveLight)
      setDark(liveDark)
      setSource('css')
      return
    }
    // Fallback: config snapshot.
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => {
        setLight(data?.tokens?.colors?.light ?? {})
        setDark(data?.tokens?.colors?.dark ?? {})
        setSource('config')
      })
      .catch(() => setSource('config'))
  }, [])

  const allKeys = orderKeys(Array.from(new Set([...Object.keys(light), ...Object.keys(dark)])))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Color Tokens
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Design system color variables — light and dark themes.{' '}
          <span className="mono text-[11px] text-[var(--fg-dim)]">
            source:{' '}
            {source === 'loading'
              ? 'loading…'
              : source === 'css'
                ? 'live stylesheet'
                : 'config snapshot (fallback)'}
          </span>
        </p>
      </div>

      {source === 'loading' ? (
        <p className="mono text-[11.5px] text-[var(--fg-dim)]">loading…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-3">
              <SectionLabel>light · palette</SectionLabel>
            </div>
            {allKeys.length === 0 ? (
              <p className="mono px-4 py-6 text-[11.5px] text-[var(--fg-dim)]">
                no color tokens
              </p>
            ) : (
              <div className="p-2">
                {allKeys.map((key) => {
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
            {allKeys.length === 0 ? (
              <p className="mono px-4 py-6 text-[11.5px] text-[var(--fg-dim)]">
                no color tokens
              </p>
            ) : (
              <div className="p-2">
                {allKeys.map((key) => {
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
