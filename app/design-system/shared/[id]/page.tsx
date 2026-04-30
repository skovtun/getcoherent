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

interface SourceMeta {
  linesOfCode: number
  isClient: boolean
  exports: { name: string; kind: 'default' | 'named' }[]
  imports: { ui: string[]; internal: string[]; third: string[] }
  hooks: string[]
  propsInterface: { name: string; body: string } | null
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
  const [meta, setMeta] = useState<SourceMeta | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/design-system/shared-components/${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setEntry(data.entry)
        setCode(data.code ?? '')
        setMeta(data.meta ?? null)
      })
      .catch(() => {
        setEntry(null)
        setCode('')
        setMeta(null)
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
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
              {entry.name}
            </h1>
            <p className="mt-1 font-mono text-[11.5px] text-muted-foreground/70">
              <span className="text-primary">{entry.id}</span> · {entry.type} · {entry.file}
            </p>
          </div>
          {previewRoute && (
            <a
              href={previewRoute}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground outline-none transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <span>view on {previewRoute}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
            </a>
          )}
        </div>
        {entry.description && (
          <p className="mt-2 text-[13px] text-muted-foreground">{entry.description}</p>
        )}
      </div>

      {/* At a glance — extracted from source. Per-component truthful info:
          LoC, render mode, exports, hooks used, dependencies. Replaces
          the generic "see it live" card from v0.17.15. Live link moves
          to a small inline pill in the header (see entry.id row). */}
      {meta && (
        <div className="rounded-md border border-border bg-card">
          <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
            <SectionLabel>at a glance</SectionLabel>
          </div>
          <dl className="grid grid-cols-2 gap-px md:grid-cols-4">
            <div className="bg-card px-4 py-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">lines</dt>
              <dd className="mt-1 font-mono text-[16px] tabular-nums text-foreground">{meta.linesOfCode}</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">render</dt>
              <dd className={`mt-1 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[11px] ${
                meta.isClient
                  ? 'border-warning/30 bg-warning/10 text-warning'
                  : 'border-success/30 bg-success/10 text-success'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${meta.isClient ? 'bg-warning' : 'bg-success'}`} aria-hidden />
                {meta.isClient ? 'client' : 'server'}
              </dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">exports</dt>
              <dd className="mt-1 font-mono text-[16px] tabular-nums text-foreground">{meta.exports.length}</dd>
            </div>
            <div className="bg-card px-4 py-3">
              <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">deps</dt>
              <dd className="mt-1 font-mono text-[16px] tabular-nums text-foreground">{meta.imports.ui.length + meta.imports.internal.length + meta.imports.third.length}</dd>
            </div>
          </dl>

          {/* Exports list */}
          {meta.exports.length > 0 && (
            <div className="border-t border-border px-4 py-3">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/70">exports</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {meta.exports.map(ex => (
                  <span key={ex.name} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2 py-1 font-mono text-[11.5px] text-foreground">
                    {ex.kind === 'default' && <span className="text-muted-foreground">default</span>}
                    {ex.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hooks (only if any) */}
          {meta.hooks.length > 0 && (
            <div className="border-t border-border px-4 py-3">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/70">hooks</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {meta.hooks.map(h => (
                  <span key={h} className="inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dependencies — grouped */}
          {(meta.imports.ui.length > 0 || meta.imports.internal.length > 0 || meta.imports.third.length > 0) && (
            <div className="border-t border-border px-4 py-3">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground/70">dependencies</div>
              <div className="mt-2 space-y-2">
                {meta.imports.ui.length > 0 && (
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">ui</span>
                    <div className="flex flex-wrap gap-1.5">
                      {meta.imports.ui.map(d => <code key={d} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">{d}</code>)}
                    </div>
                  </div>
                )}
                {meta.imports.internal.length > 0 && (
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">internal</span>
                    <div className="flex flex-wrap gap-1.5">
                      {meta.imports.internal.map(d => <code key={d} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">{d}</code>)}
                    </div>
                  </div>
                )}
                {meta.imports.third.length > 0 && (
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="w-16 shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">npm</span>
                    <div className="flex flex-wrap gap-1.5">
                      {meta.imports.third.map(d => <code key={d} className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">{d}</code>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Props interface — only when source declared a *Props type/interface */}
      {meta?.propsInterface && (
        <div className="rounded-md border border-border bg-card">
          <div className="flex items-center justify-between rounded-t-md border-b border-border bg-muted px-4 py-3">
            <SectionLabel>props · {meta.propsInterface.name}</SectionLabel>
            <span className="font-mono text-[10.5px] text-muted-foreground/70">extracted from source</span>
          </div>
          <pre className="overflow-x-auto rounded-b-md p-4 font-mono text-[12px] leading-[1.65] text-foreground">
            <code>{`${meta.propsInterface.name} = {
${meta.propsInterface.body.split('\n').map(l => '  ' + l.trim()).join('\n')}
}`}</code>
          </pre>
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
