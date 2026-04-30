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

// Semantic groups — gives the page structure beyond a flat alphabetical list.
// Each role explains WHEN to use the token, not just what it is.
const ROLE_GROUPS: { id: string; label: string; tokens: string[]; hint: string }[] = [
  { id: 'brand', label: 'Brand', hint: 'Primary brand identity. Use sparingly — main CTAs, active states.', tokens: ['primary', 'primary-foreground', 'secondary', 'secondary-foreground'] },
  { id: 'surface', label: 'Surface', hint: 'Backgrounds and content layers. The neutral foundation.', tokens: ['background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground', 'muted', 'muted-foreground'] },
  { id: 'accent', label: 'Accent & UI', hint: 'Borders, focus rings, hover backgrounds.', tokens: ['accent', 'accent-foreground', 'border', 'input', 'ring'] },
  { id: 'status', label: 'Status', hint: 'Convey state: success, warning, error, info. Used in alerts, badges, validation.', tokens: ['success', 'success-foreground', 'warning', 'warning-foreground', 'error', 'error-foreground', 'info', 'info-foreground', 'destructive', 'destructive-foreground'] },
]

function copyToClipboard(text: string, setCopied: (s: string | null) => void) {
  navigator.clipboard.writeText(text).then(() => {
    setCopied(text)
    setTimeout(() => setCopied(null), 1200)
  })
}

function ColorRow({
  name,
  light,
  dark,
  copied,
  setCopied,
}: {
  name: string
  light: string
  dark: string
  copied: string | null
  setCopied: (s: string | null) => void
}) {
  const cssVar = `--${name}`
  const varCall = `var(${cssVar})`
  return (
    <div className="grid grid-cols-[160px_1fr_1fr] items-center gap-4 border-b border-border px-4 py-3 last:border-0">
      <div className="min-w-0">
        <div className="font-mono text-[12.5px] text-foreground">{name}</div>
        <button
          type="button"
          onClick={() => copyToClipboard(varCall, setCopied)}
          className="mt-0.5 inline-flex items-center font-mono text-[10.5px] text-primary outline-none transition-colors hover:text-primary/80"
          title="Copy CSS variable"
        >
          {copied === varCall ? 'copied!' : varCall}
        </button>
      </div>
      <button
        type="button"
        onClick={() => light && copyToClipboard(light, setCopied)}
        disabled={!light}
        className="flex items-center gap-3 rounded-md px-2 py-1.5 outline-none transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {light ? (
          <>
            <span className="h-7 w-7 shrink-0 rounded border border-border shadow-sm" style={{ backgroundColor: light }} />
            <span className="font-mono text-[11.5px] tabular-nums text-foreground">
              {copied === light ? 'copied!' : light.toUpperCase()}
            </span>
          </>
        ) : (
          <span className="font-mono text-[11px] text-muted-foreground/60">—</span>
        )}
      </button>
      {/* Dark column — wrapped in .dark scope so the row reads as
          the dark theme: dark bg, dark border, dark text. */}
      <button
        type="button"
        onClick={() => dark && copyToClipboard(dark, setCopied)}
        disabled={!dark}
        className="dark flex items-center gap-3 rounded-md border border-border/50 bg-background px-2 py-1.5 outline-none transition-colors hover:border-border hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {dark ? (
          <>
            <span className="h-7 w-7 shrink-0 rounded border border-border shadow-sm" style={{ backgroundColor: dark }} />
            <span className="font-mono text-[11.5px] tabular-nums text-foreground">
              {copied === dark ? 'copied!' : dark.toUpperCase()}
            </span>
          </>
        ) : (
          <span className="font-mono text-[11px] text-muted-foreground/60">—</span>
        )}
      </button>
    </div>
  )
}

export default function ColorsPage() {
  const [tokens, setTokens] = useState<{ colors?: { light?: Record<string, string>; dark?: Record<string, string> } } | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => { setTokens(data.tokens ?? null); setLoading(false) })
      .catch(() => { setTokens(null); setLoading(false) })
  }, [])

  const light = tokens?.colors?.light ?? {}
  const dark = tokens?.colors?.dark ?? {}
  const allKeys = Array.from(new Set([...Object.keys(light), ...Object.keys(dark)]))

  // Tokens not matched to any role group fall into 'Other'.
  const claimed = new Set(ROLE_GROUPS.flatMap(g => g.tokens))
  const otherKeys = allKeys.filter(k => !claimed.has(k))
  const groups = [
    ...ROLE_GROUPS.map(g => ({ id: g.id, label: g.label, hint: g.hint, presentTokens: g.tokens.filter(t => allKeys.includes(t)) })),
    ...(otherKeys.length > 0 ? [{ id: 'other', label: 'Other', hint: 'Custom tokens defined in your config.', presentTokens: otherKeys }] : []),
  ].filter(g => g.presentTokens.length > 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Color Tokens
        </h1>
        <p className="mt-1 max-w-[68ch] text-[13.5px] leading-[1.55] text-muted-foreground">
          Semantic color variables for light and dark themes. Click a swatch to copy the hex; click a variable name to copy the CSS reference. Use semantic tokens — not raw hex — so themes cascade correctly.
        </p>
      </div>

      {loading ? (
        <p className="font-mono text-[11.5px] text-muted-foreground/70">loading…</p>
      ) : groups.length === 0 ? (
        <p className="font-mono text-[11.5px] text-muted-foreground/70">no color tokens</p>
      ) : (
        <div className="space-y-4">
          {groups.map(g => (
            <section key={g.id} className="rounded-md border border-border bg-card">
              <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <SectionLabel>{g.label.toLowerCase()} · {g.presentTokens.length} token{g.presentTokens.length === 1 ? '' : 's'}</SectionLabel>
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70 md:inline">
                    light  ·  dark
                  </span>
                </div>
                <p className="mt-1.5 max-w-[68ch] text-[12px] leading-[1.5] text-muted-foreground">{g.hint}</p>
              </div>
              <div>
                {g.presentTokens.map(name => (
                  <ColorRow
                    key={name}
                    name={name}
                    light={light[name] ?? ''}
                    dark={dark[name] ?? ''}
                    copied={copied}
                    setCopied={setCopied}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
