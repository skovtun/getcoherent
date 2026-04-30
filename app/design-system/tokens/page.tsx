import Link from 'next/link'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

export default function TokensPage() {
  const cards = [
    {
      href: '/design-system/tokens/colors',
      label: 'Colors',
      hint: 'light and dark palettes',
      preview: (
        <div className="flex gap-1">
          <div className="size-4 rounded-sm bg-primary" />
          <div className="size-4 rounded-sm border border-border bg-muted-foreground" />
          <div className="size-4 rounded-sm bg-destructive" />
        </div>
      ),
    },
    {
      href: '/design-system/tokens/typography',
      label: 'Typography',
      hint: 'font families, sizes, weights',
      preview: (
        <span className="font-mono text-[22px] font-medium leading-none tracking-tight text-foreground">Aa</span>
      ),
    },
    {
      href: '/design-system/tokens/spacing',
      label: 'Spacing & Radius',
      hint: 'scale and border radius',
      preview: (
        <div className="flex items-end gap-1.5">
          <div className="w-2 rounded-sm bg-primary/70" style={{ height: 6 }} />
          <div className="w-2 rounded-sm bg-primary/70" style={{ height: 12 }} />
          <div className="w-2 rounded-sm bg-primary/70" style={{ height: 18 }} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Design Tokens
        </h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Color, typography, spacing, and radius that define your design system.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group flex flex-col gap-3 rounded-md border border-border bg-card p-5 outline-none transition-colors hover:border-primary/50 hover:bg-muted"
          >
            <div className="flex h-8 items-center">{c.preview}</div>
            <div>
              <div className="text-[14px] font-medium text-foreground">{c.label}</div>
              <div className="mt-1 flex items-center justify-between font-mono text-[10.5px] text-muted-foreground/70">
                <span>{c.hint}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-primary"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
