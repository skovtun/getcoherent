'use client'
import Link from 'next/link'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

interface PageInfo {
  name: string
  route: string
  sections: string[]
  componentUsage: Record<string, number>
  iconCount: number
  layoutPattern: string | null
  hasForm: boolean
}

const PAGES: PageInfo[] = [
  {
    name: 'Home',
    route: '/',
    sections: [
      'Hero',
      'The Problem',
      'Two Ways to Build',
      'What Makes It Different',
      'Getting Started',
      'Footer',
    ],
    componentUsage: {},
    iconCount: 12,
    layoutPattern: 'unknown',
    hasForm: false,
  },
]

export default function SitemapPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Sitemap
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          All pages · sections · component usage.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PAGES.map((page) => (
          <div
            key={page.route}
            className="flex flex-col gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={page.route}
                className="text-[14px] font-medium text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
              >
                {page.name}
              </Link>
              <span className="mono text-[11px] text-[var(--fg-dim)]">{page.route}</span>
              {page.layoutPattern && (
                <span className="mono inline-flex items-center rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-[1px] text-[10px] uppercase tracking-[0.08em] text-[var(--fg-muted)]">
                  {page.layoutPattern}
                </span>
              )}
              {page.hasForm && (
                <span className="mono inline-flex items-center rounded border border-[var(--accent)]/35 bg-[var(--accent)]/10 px-1.5 py-[1px] text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">
                  form
                </span>
              )}
            </div>

            {page.sections.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {page.sections.map((s) => (
                  <span
                    key={s}
                    className="mono inline-flex items-center rounded-full border border-[var(--border-strong)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {Object.keys(page.componentUsage).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(page.componentUsage)
                  .filter(([, c]) => c > 0)
                  .map(([name, count]) => (
                    <span
                      key={name}
                      className="mono inline-flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--elevated)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]"
                    >
                      {name}
                      <span className="text-[var(--fg-dim)]">×{count as number}</span>
                    </span>
                  ))}
                {page.iconCount > 0 && (
                  <span className="mono inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--elevated)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]">
                    Icons ×{page.iconCount}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
