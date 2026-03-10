import Link from 'next/link'

export default function TokensPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Design Tokens</h1>
        <p className="text-sm text-muted-foreground">
          Color, typography, spacing, and radius values that define your design system.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/design-system/tokens/colors" className="rounded-lg border p-6 hover:border-primary transition-colors">
          <div className="flex gap-2 mb-3">
            <div className="size-4 rounded bg-primary" />
            <div className="size-4 rounded bg-secondary border" />
            <div className="size-4 rounded bg-destructive" />
          </div>
          <div className="text-sm font-medium">Colors</div>
          <div className="text-xs text-muted-foreground mt-1">Light and dark theme palettes</div>
        </Link>
        <Link href="/design-system/tokens/typography" className="rounded-lg border p-6 hover:border-primary transition-colors">
          <div className="mb-3 text-sm font-bold">Aa</div>
          <div className="text-sm font-medium">Typography</div>
          <div className="text-xs text-muted-foreground mt-1">Font families, sizes, and weights</div>
        </Link>
        <Link href="/design-system/tokens/spacing" className="rounded-lg border p-6 hover:border-primary transition-colors">
          <div className="flex gap-1.5 mb-3 items-end">
            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
            <div className="w-2.5 h-4 rounded-sm bg-primary" />
            <div className="w-2.5 h-6 rounded-sm bg-primary" />
          </div>
          <div className="text-sm font-medium">Spacing &amp; Radius</div>
          <div className="text-xs text-muted-foreground mt-1">Spacing scale and border radius</div>
        </Link>
      </div>
    </div>
  )
}
