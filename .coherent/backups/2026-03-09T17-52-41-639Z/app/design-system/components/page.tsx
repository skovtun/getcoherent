'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ComponentsIndexPage() {
  const [components, setComponents] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => setComponents(data.components ?? []))
      .catch(() => setComponents([]))
  }, [])

  const grouped = components.reduce((acc: Record<string, any[]>, c) => {
    const cat = c.category || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(c)
    return acc
  }, {})

  const variantSizeLabel = (comp: any) => {
    const v = comp.variants?.length ?? 0
    const s = comp.sizes?.length ?? 0
    if (v === 0 && s === 0) return 'Default'
    const parts = []
    if (v > 0) parts.push(`${v} variant${v !== 1 ? 's' : ''}`)
    if (s > 0) parts.push(`${s} size${s !== 1 ? 's' : ''}`)
    return parts.join(' · ')
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Components</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {components.length} component{components.length !== 1 ? 's' : ''}. Click a card to view variants, sizes, and code.
        </p>
      </div>
      {Object.entries(grouped).map(([category, comps]) => (
        <section key={category} className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {category.replace(/-/g, ' ')}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(comps as any[]).map((comp) => (
              <Link
                key={comp.id}
                href={`/design-system/components/${comp.id}`}
                className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 hover:border-primary/50 hover:bg-muted/30 transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground truncate">{comp.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {variantSizeLabel(comp)}
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0 ml-2">→</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
