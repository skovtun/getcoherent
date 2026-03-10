'use client'

import Link from 'next/link'

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
  { name: "Home", route: "/", sections: ["Hero","The Problem","Two Ways to Build","What Makes It Different","Getting Started","Footer"], componentUsage: {}, iconCount: 12, layoutPattern: "unknown", hasForm: false }
]

export default function SitemapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sitemap</h1>
        <p className="text-muted-foreground mt-1">All pages, sections, and component usage</p>
      </div>
      <div className="space-y-4">
        {PAGES.map((page) => (
          <div key={page.route} className="rounded-xl border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Link href={page.route} className="font-semibold text-sm hover:text-primary transition-colors">
                {page.name}
              </Link>
              <span className="text-xs text-muted-foreground font-mono">{page.route}</span>
              {page.layoutPattern && <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{page.layoutPattern}</span>}
              {page.hasForm && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">form</span>}
            </div>
            {page.sections.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {page.sections.map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-full border text-muted-foreground">{s}</span>
                ))}
              </div>
            )}
            {Object.keys(page.componentUsage).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(page.componentUsage).filter(([,c]) => c > 0).map(([name, count]) => (
                  <span key={name} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {name}<span className="text-[10px] text-muted-foreground/60 ml-0.5">×{count as number}</span>
                  </span>
                ))}
                {page.iconCount > 0 && <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Icons ×{page.iconCount}</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}