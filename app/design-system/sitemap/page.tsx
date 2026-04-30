import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

function loadPages() {
  try {
    const raw = readFileSync(join(process.cwd(), 'design-system.config.ts'), 'utf-8')
    const jsonMatch = raw.match(/export\s+const\s+config\s*=\s*/)
    const jsonStart = jsonMatch ? raw.indexOf('{', raw.indexOf(jsonMatch[0])) : -1
    if (jsonStart === -1) return []
    let jsonStr = raw.slice(jsonStart)
    jsonStr = jsonStr.replace(/\}\s*(as\s+const|satisfies\s+\w+)\s*;?\s*$/, '}')
    jsonStr = jsonStr.replace(/,\s*([\]\}])/g, '$1')
    const json = JSON.parse(jsonStr)
    return (json.pages || [])
      .filter((p: any) => {
        const route = p.route || '/' + p.id
        return !route.includes('[') && !route.includes(']')
      })
      .map((p: any) => ({
        name: p.name || p.id,
        route: p.route || '/' + p.id,
        sections: p.pageAnalysis?.sections?.map((s: any) => s.name) || [],
        componentUsage: p.pageAnalysis?.componentUsage || {},
        iconCount: p.pageAnalysis?.iconCount ?? 0,
        layoutPattern: p.pageAnalysis?.layoutPattern || null,
        hasForm: p.pageAnalysis?.hasForm ?? false,
      }))
  } catch {
    return []
  }
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

export default function SitemapPage() {
  const pages = loadPages()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Sitemap
        </h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          All pages · sections · component usage.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {pages.map((page: any) => (
          <div key={page.route} className="flex flex-col gap-3 rounded-md border border-border bg-card p-4">
            <div className="flex flex-wrap items-center gap-2">
              <Link href={page.route} className="text-[14px] font-medium text-foreground transition-colors hover:text-primary">
                {page.name}
              </Link>
              <span className="font-mono text-[11px] text-muted-foreground/70">{page.route}</span>
              {page.layoutPattern && (
                <span className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  {page.layoutPattern}
                </span>
              )}
              {page.hasForm && (
                <span className="inline-flex items-center rounded border border-primary/35 bg-primary/10 px-1.5 py-[1px] font-mono text-[10px] uppercase tracking-[0.08em] text-primary">
                  form
                </span>
              )}
            </div>
            {page.sections.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {page.sections.map((s: string) => (
                  <span key={s} className="inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{s}</span>
                ))}
              </div>
            )}
            {Object.keys(page.componentUsage).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(page.componentUsage).filter(([,c]) => (c as number) > 0).map(([name, count]) => (
                  <span key={name} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {name}<span className="text-muted-foreground/60">{String.fromCharCode(215)}{count as number}</span>
                  </span>
                ))}
                {page.iconCount > 0 && (
                  <span className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    Icons {String.fromCharCode(215)}{page.iconCount}
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
