'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

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
    if (v === 0 && s === 0) return 'default'
    const parts = []
    if (v > 0) parts.push(`${v} variant${v !== 1 ? 's' : ''}`)
    if (s > 0) parts.push(`${s} size${s !== 1 ? 's' : ''}`)
    return parts.join(' · ')
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Components
        </h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          {components.length} component{components.length !== 1 ? 's' : ''} · click a card for variants, sizes, and code.
        </p>
      </div>
      {Object.entries(grouped).map(([category, comps]) => (
        <section key={category} className="flex flex-col gap-3">
          <SectionLabel>{category.replace(/-/g, ' ')}</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(comps as any[]).map((comp) => (
              <Link
                key={comp.id}
                href={`/design-system/components/${comp.id}`}
                className="group flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 outline-none transition-colors hover:border-primary/50 hover:bg-muted"
              >
                <div className="min-w-0">
                  <div className="truncate text-[13.5px] font-medium text-foreground">{comp.name}</div>
                  <div className="mt-0.5 font-mono text-[10.5px] text-muted-foreground/70">
                    {variantSizeLabel(comp)}
                  </div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ml-2 shrink-0 text-muted-foreground/60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
