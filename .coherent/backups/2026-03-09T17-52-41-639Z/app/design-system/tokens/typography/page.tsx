'use client'
import { useEffect, useState } from 'react'

export default function TypographyPage() {
  const [tokens, setTokens] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => { setTokens(data.tokens ?? null); setLoading(false) })
      .catch(() => { setTokens(null); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Typography</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

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
    <div className="space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">Typography</h1>
      <p className="text-muted-foreground">Font families, sizes, weights, and line heights.</p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Families</h2>
        <div className="rounded-lg border p-6 space-y-6">
          {Object.entries(fontFamily).map(([name, value]) => (
            <div key={name} className="space-y-2">
              <div className="text-sm font-medium capitalize">{name}</div>
              <div className="text-xs text-muted-foreground font-mono">{value as string}</div>
              <div className="text-lg" style={{ fontFamily: value as string }}>The quick brown fox jumps over the lazy dog</div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Sizes</h2>
        <div className="rounded-lg border p-6 space-y-6">
          {Object.entries(fontSize).map(([name, value]) => (
            <div key={name} className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground font-mono">{value as string} ({remToPx(value as string)})</span>
              </div>
              <div style={{ fontSize: value as string }}>The quick brown fox jumps over the lazy dog</div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Font Weights</h2>
        <div className="rounded-lg border p-6">
          <div className="flex flex-wrap gap-8">
            {Object.entries(fontWeight).map(([name, value]) => (
              <div key={name} className="space-y-1 text-center">
                <div className="text-2xl" style={{ fontWeight: value as number }}>Aa</div>
                <div className="text-xs font-medium">{name}</div>
                <div className="text-xs text-muted-foreground">{String(value)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Line Heights</h2>
        <div className="rounded-lg border p-6 space-y-6">
          {Object.entries(lineHeight).map(([name, value]) => (
            <div key={name} className="space-y-1">
              <div className="text-sm font-medium">{name} ({String(value)})</div>
              <div className="text-sm bg-muted/50 p-3 rounded max-w-md" style={{ lineHeight: value as number }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}