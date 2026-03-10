'use client'

import Link from 'next/link'

interface PageLink { name: string; route: string }

const PAGES: PageLink[] = [
  { name: "Home", route: "/" }
]

export default function SitemapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sitemap</h1>
        <p className="text-muted-foreground mt-1">All pages and their internal links</p>
      </div>
      <div className="space-y-4">
        {PAGES.map((page) => (
          <div key={page.route} className="rounded-xl border p-4 space-y-2">
            <div className="flex items-center gap-3">
              <Link href={page.route} className="font-semibold text-sm hover:text-primary transition-colors">
                {page.name}
              </Link>
              <span className="text-xs text-muted-foreground font-mono">{page.route}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}