'use client'
import { useEffect, useState } from 'react'

export default function SpacingPage() {
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
        <h1 className="text-4xl font-bold tracking-tight">Spacing & Radius</h1>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const spacing = tokens?.spacing ?? {}
  const radius = tokens?.radius ?? {}

  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-bold tracking-tight">Spacing & Radius</h1>
      <p className="text-muted-foreground">Spacing scale and border radius tokens.</p>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Spacing Scale</h2>
        <div className="rounded-lg border p-6 space-y-4">
          {Object.keys(spacing).length === 0 ? (
            <p className="text-sm text-muted-foreground">No spacing tokens</p>
          ) : (
            Object.entries(spacing).map(([name, value]) => (
              <div key={name} className="flex items-center gap-4">
                <div className="w-12 text-sm font-mono font-medium text-right">{name}</div>
                <div className="w-24 text-xs text-muted-foreground font-mono">{value as string}</div>
                <div
                  className="h-6 rounded bg-primary/70"
                  style={{ width: value as string }}
                />
              </div>
            ))
          )}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Border Radius</h2>
        <div className="rounded-lg border p-6">
          {Object.keys(radius).length === 0 ? (
            <p className="text-sm text-muted-foreground">No radius tokens</p>
          ) : (
            <div className="flex flex-wrap gap-6">
              {Object.entries(radius).map(([name, value]) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div
                    className="h-16 w-16 border-2 border-primary/70 bg-primary/10"
                    style={{ borderRadius: value as string }}
                  />
                  <div className="text-xs font-medium">{name}</div>
                  <div className="text-xs text-muted-foreground font-mono">{value as string}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}