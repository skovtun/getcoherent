'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Entry {
  id: string
  name: string
  type: string
  file: string
  usedIn: string[]
  description?: string
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

export default function SharedComponentDetailPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : ''
  const [entry, setEntry] = useState<Entry | null>(null)
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/design-system/shared-components/${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setEntry(data.entry)
        setCode(data.code ?? '')
      })
      .catch(() => {
        setEntry(null)
        setCode('')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="font-mono text-[11.5px] text-muted-foreground/70">loading…</p>
  if (!entry) return <p className="font-mono text-[11.5px] text-muted-foreground/70">component not found.</p>

  // Pick a usable page-route to preview the component IN CONTEXT.
  // Layout components (Header/Footer) appear on every page — pick the first
  // non-layout entry that points to an app route. Widgets/data-display appear
  // on a specific page — use the first entry directly.
  const previewRoute = (() => {
    const fileToRoute = (f: string): string | null => {
      // app/layout.tsx → layout (skip, no specific route)
      if (f === 'app/layout.tsx') return null
      // app/(group)/path/page.tsx → /path
      const match = f.match(/^app(?:\/\([^)]+\))?(.*?)\/page\.tsx$/)
      if (!match) return null
      const route = match[1] || '/'
      // Skip dynamic [id] routes — we don't know what id to pass.
      if (route.includes('[')) return null
      return route
    }
    for (const f of entry.usedIn) {
      const route = fileToRoute(f)
      if (route) return route
    }
    return null
  })()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          {entry.name}
        </h1>
        <p className="mt-1 font-mono text-[11.5px] text-muted-foreground/70">
          <span className="text-primary">{entry.id}</span> · {entry.type} · {entry.file}
        </p>
        {entry.description && (
          <p className="mt-2 text-[13px] text-muted-foreground">{entry.description}</p>
        )}
      </div>

      {/* See it live — explicit link to the page where this component
          renders, NOT an inline iframe. Iframes mislead when multiple
          shared components live on the same host page (all previews
          look identical). Source code below is the truthful representation;
          this card directs users to the live render. */}
      {previewRoute && (
        <div className="rounded-md border border-border bg-card p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <SectionLabel>see it live</SectionLabel>
              <p className="mt-2 max-w-[58ch] text-[13px] leading-[1.6] text-muted-foreground">
                <span className="font-medium text-foreground">{entry.name}</span> renders on the live page below. Open it in a new tab to see the component in real context — same data, same layout, surrounded by the components it actually ships with.
              </p>
            </div>
            <a
              href={previewRoute}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-[12.5px] font-medium text-foreground outline-none transition-colors hover:bg-muted"
            >
              <span className="font-mono text-[11.5px] text-muted-foreground">{previewRoute}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          </div>
          {entry.type === 'layout' && (
            <p className="mt-3 max-w-[58ch] text-[12px] leading-[1.55] text-muted-foreground/80">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/60">layout</span> · this component appears on every page that uses the parent layout, so any route is a valid preview surface.
            </p>
          )}
        </div>
      )}

      {entry.usedIn.length > 0 && (
        <div className="rounded-md border border-border bg-card">
          <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
            <SectionLabel>used in · {entry.usedIn.length} page{entry.usedIn.length === 1 ? '' : 's'}</SectionLabel>
          </div>
          <ul className="flex flex-col gap-1 p-4 font-mono text-[11.5px] text-muted-foreground">
            {entry.usedIn.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-md border border-border bg-card">
        <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
          <SectionLabel>source · {entry.file}</SectionLabel>
        </div>
        <pre className="max-h-[60vh] overflow-auto rounded-b-md bg-muted/40 p-4 font-mono text-[11px] leading-[1.6] text-foreground">
          <code>{code || '(no content)'}</code>
        </pre>
      </div>
    </div>
  )
}
