import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
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
          <div className="size-4 rounded-sm bg-[var(--accent)]" />
          <div className="size-4 rounded-sm border border-[var(--border-strong)] bg-[var(--fg-muted)]" />
          <div className="size-4 rounded-sm bg-[var(--error)]" />
        </div>
      ),
    },
    {
      href: '/design-system/tokens/typography',
      label: 'Typography',
      hint: 'font families, sizes, weights',
      preview: (
        <span className="mono text-[22px] font-medium leading-none tracking-tight text-[var(--foreground)]">
          Aa
        </span>
      ),
    },
    {
      href: '/design-system/tokens/spacing',
      label: 'Spacing & Radius',
      hint: 'scale and border radius',
      preview: (
        <div className="flex items-end gap-1.5">
          <div className="w-2 rounded-sm bg-[var(--accent)]/70" style={{ height: 6 }} />
          <div className="w-2 rounded-sm bg-[var(--accent)]/70" style={{ height: 12 }} />
          <div className="w-2 rounded-sm bg-[var(--accent)]/70" style={{ height: 18 }} />
        </div>
      ),
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Design Tokens
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Color, typography, spacing, and radius that define your design system.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="press group flex flex-col gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-5 outline-none transition-colors hover:border-[var(--accent-dim)] hover:bg-[var(--surface-2)]"
          >
            <div className="flex h-8 items-center">{c.preview}</div>
            <div>
              <div className="text-[14px] font-medium text-[var(--foreground)]">{c.label}</div>
              <div className="mono mt-1 flex items-center justify-between text-[10.5px] text-[var(--fg-dim)]">
                <span>{c.hint}</span>
                <ArrowRight
                  size={11}
                  strokeWidth={2}
                  className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
