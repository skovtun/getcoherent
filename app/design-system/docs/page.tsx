'use client'
import { config } from '../../../design-system.config'
import Link from 'next/link'

const PROJECT_NAME = "My App"
const PROJECT_VERSION = "1.0.0"
const GENERATED_AT = "2026-04-30"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

export default function DocumentationPage() {
  const components = Array.isArray(config.components) ? config.components : []
  const tokens: any = config.tokens ?? {}
  const colors = tokens.colors ?? { light: {}, dark: {} }
  const spacing = tokens.spacing ?? {}
  const typography = tokens.typography ?? { fontFamily: {}, fontSize: {}, fontWeight: {}, lineHeight: {} }
  const radius = tokens.radius ?? {}
  const light = colors.light ?? {}
  const dark = colors.dark ?? {}
  const colorCount = Object.keys(light).length
  const spacingCount = Object.keys(spacing).length
  const radiusCount = Object.keys(radius).length

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print()
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header — purpose explicit + Print button */}
      <div className="flex flex-col gap-4 print:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
              Documentation
            </h1>
            <p className="mt-1 max-w-[68ch] text-[13.5px] leading-[1.55] text-muted-foreground">
              A print-ready snapshot of every component and token in this design system. Use to hand off to a designer, attach to a PR, or archive a release. Click <strong>Print</strong> below or press <kbd className="font-mono text-[11px] text-muted-foreground/80">⌘P</kbd> and choose <em>Save as PDF</em>.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-[13px] font-medium text-foreground outline-none transition-colors hover:bg-muted"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
            Print / save as PDF
          </button>
        </div>
      </div>

      {/* Print-only header (no button) */}
      <div className="hidden print:block">
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">{PROJECT_NAME} — Design System</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">Generated {GENERATED_AT} · v{PROJECT_VERSION}</p>
      </div>

      {/* Project meta — at-a-glance */}
      <section className="rounded-md border border-border bg-card">
        <div className="rounded-t-md border-b border-border bg-muted px-4 py-3 print:hidden">
          <SectionLabel>project · meta</SectionLabel>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md md:grid-cols-4">
          <div className="bg-card px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">project</dt>
            <dd className="mt-1 truncate text-[14px] font-medium text-foreground">{PROJECT_NAME}</dd>
          </div>
          <div className="bg-card px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">version</dt>
            <dd className="mt-1 font-mono text-[14px] tabular-nums text-foreground">{PROJECT_VERSION}</dd>
          </div>
          <div className="bg-card px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">components</dt>
            <dd className="mt-1 font-mono text-[14px] tabular-nums text-foreground">{components.length}</dd>
          </div>
          <div className="bg-card px-4 py-3">
            <dt className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">tokens</dt>
            <dd className="mt-1 font-mono text-[14px] tabular-nums text-foreground">{colorCount + spacingCount + radiusCount}</dd>
          </div>
        </dl>
      </section>

      {/* Components */}
      <section className="rounded-md border border-border bg-card">
        <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
          <SectionLabel>components · {components.length}</SectionLabel>
        </div>
        {components.length === 0 ? (
          <p className="px-4 py-6 font-mono text-[11.5px] text-muted-foreground/70">No components registered yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                <th className="px-4 py-2 text-left font-normal">Name</th>
                <th className="px-4 py-2 text-left font-normal">ID</th>
                <th className="px-4 py-2 text-left font-normal">Category</th>
                <th className="px-4 py-2 text-left font-normal">Source</th>
              </tr>
            </thead>
            <tbody>
              {components.map((c: { id: string; name?: string; category?: string; source?: string }) => (
                <tr key={c.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2.5 text-[13px] font-medium text-foreground">
                    <Link href={`/design-system/components/${c.id}`} className="transition-colors hover:text-primary">{c.name ?? c.id}</Link>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-[11.5px] text-muted-foreground">{c.id}</td>
                  <td className="px-4 py-2.5 text-[12.5px] text-muted-foreground">{String(c.category ?? '—')}</td>
                  <td className="px-4 py-2.5 font-mono text-[11.5px] text-muted-foreground">{String(c.source ?? '—')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Color tokens */}
      <section className="rounded-md border border-border bg-card">
        <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
          <SectionLabel>color · {colorCount} tokens</SectionLabel>
        </div>
        <div className="grid gap-6 p-4 md:grid-cols-2">
          <div>
            <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">light</div>
            <div className="space-y-1.5">
              {Object.entries(light).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2.5 text-[12.5px]">
                  <div className="size-4 shrink-0 rounded border border-border" style={{ backgroundColor: typeof value === 'string' ? value : undefined }} />
                  <span className="w-28 font-mono text-[11.5px] text-foreground">{key}</span>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dark rounded-md bg-background px-3 py-2">
            <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">dark</div>
            <div className="space-y-1.5">
              {Object.entries(dark).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2.5 text-[12.5px]">
                  <div className="size-4 shrink-0 rounded border border-border" style={{ backgroundColor: typeof value === 'string' ? value : undefined }} />
                  <span className="w-28 font-mono text-[11.5px] text-foreground">{key}</span>
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="rounded-md border border-border bg-card">
        <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
          <SectionLabel>typography</SectionLabel>
        </div>
        <div className="grid gap-6 p-4 md:grid-cols-2">
          {typeof typography === 'object' && typography !== null && !Array.isArray(typography) && Object.entries(typography).map(([group, values]) => (
            <div key={group}>
              <div className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">{group}</div>
              <div className="space-y-1">
                {typeof values === 'object' && values !== null && !Array.isArray(values)
                  ? Object.entries(values).map(([k, v]) => (
                      <div key={k} className="flex items-baseline gap-3 text-[12.5px]">
                        <span className="w-20 font-mono text-[11.5px] text-foreground">{k}</span>
                        <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(v)}</span>
                      </div>
                    ))
                  : <div className="font-mono text-[11px] text-muted-foreground">{String(values)}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing + Radius */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md border border-border bg-card">
          <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
            <SectionLabel>spacing · {spacingCount} tokens</SectionLabel>
          </div>
          <div className="space-y-1.5 p-4">
            {Object.entries(spacing).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2.5 text-[12.5px]">
                <span className="w-12 font-mono text-[11.5px] text-foreground">{key}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-md border border-border bg-card">
          <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
            <SectionLabel>radius · {radiusCount} tokens</SectionLabel>
          </div>
          <div className="space-y-1.5 p-4">
            {Object.entries(radius).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2.5 text-[12.5px]">
                <span className="w-12 font-mono text-[11.5px] text-foreground">{key}</span>
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer — print-only stamp + cross-links */}
      <section className="border-t border-border pt-6 print:hidden">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-muted-foreground">
          <span className="font-mono text-[11px]">generated <span className="tabular-nums text-foreground/80">{GENERATED_AT}</span></span>
          <Link href="/design-system" className="transition-colors hover:text-foreground">→ Live viewer</Link>
          <Link href="/design-system/sitemap" className="transition-colors hover:text-foreground">→ Sitemap</Link>
        </div>
      </section>
    </div>
  )
}
