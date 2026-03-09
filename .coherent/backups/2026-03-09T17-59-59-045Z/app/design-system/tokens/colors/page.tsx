'use client'
import { useEffect, useState } from 'react'

export default function ColorsPage() {
  const [tokens, setTokens] = useState<{ colors?: { light?: Record<string, string>; dark?: Record<string, string> } } | null>(null)
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
        <h1 className="text-4xl font-bold tracking-tight">Color Tokens</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const light = tokens?.colors?.light ?? {}
  const dark = tokens?.colors?.dark ?? {}
  const keys = Array.from(new Set([...Object.keys(light), ...Object.keys(dark)]))
  const toCssVar = (key: string) => `--${key}`

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold tracking-tight">Color Tokens</h1>
      <p className="text-muted-foreground">Design system color variables (light and dark themes).</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Light Theme</h2>
          <div className="rounded-lg border p-4 space-y-3">
            {keys.length === 0 ? (
              <p className="text-sm text-muted-foreground">No color tokens</p>
            ) : (
              keys.map((key) => {
                const value = light[key]
                if (!value) return null
                return (
                  <div key={`light-${key}`} className="flex items-center gap-4">
                    <div
                      className="h-10 w-10 shrink-0 rounded-md border"
                      style={{ backgroundColor: value }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium capitalize">{key}</div>
                      <div className="text-xs text-muted-foreground font-mono">{value} · var({toCssVar(key)})</div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Dark Theme</h2>
          <div className="dark rounded-lg border border-border p-4 space-y-3 bg-background">
            {keys.length === 0 ? (
              <p className="text-sm text-muted-foreground">No color tokens</p>
            ) : (
              keys.map((key) => {
                const value = dark[key]
                if (!value) return null
                return (
                  <div key={`dark-${key}`} className="flex items-center gap-4">
                    <div
                      className="h-10 w-10 shrink-0 rounded-md border border-border"
                      style={{ backgroundColor: value }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="font-medium capitalize text-foreground">{key}</div>
                      <div className="text-xs text-muted-foreground font-mono">{value}</div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}