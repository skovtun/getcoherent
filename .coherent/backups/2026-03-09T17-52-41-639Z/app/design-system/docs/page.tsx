import { config } from '../../../design-system.config'
import Link from 'next/link'

export default function DocumentationPage() {
  const components = Array.isArray(config.components) ? config.components : []
  const tokens = config.tokens ?? {}
  const colors = tokens.colors ?? { light: {}, dark: {} }
  const spacing = tokens.spacing ?? {}
  const typography = tokens.typography ?? { fontFamily: {}, fontSize: {}, fontWeight: {}, lineHeight: {} }
  const radius = tokens.radius ?? {}
  const light = colors.light ?? {}
  const dark = colors.dark ?? {}

  return (
    <div className="flex flex-col gap-8 max-w-none print:max-w-none">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Documentation</h1>
        <p className="text-sm text-muted-foreground">
          Complete project reference: components, tokens, structure. Print or Save as PDF to download.
        </p>
      </div>

      {/* How to work */}
      <section>
        <h2 className="text-sm font-semibold mb-3">How to work</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium mb-1">IDE + AI</div>
            <p className="text-sm text-muted-foreground">
              Edit code and <code className="rounded bg-muted px-1 text-xs">design-system.config.ts</code> directly. Changes appear via hot reload.
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm font-medium mb-1">CLI chat</div>
            <p className="text-sm text-muted-foreground">
              Use <code className="rounded bg-muted px-1 text-xs">coherent chat &quot;add pricing page&quot;</code> for quick generation, then refine in the IDE.
            </p>
          </div>
        </div>
      </section>

      {/* Project structure */}
      <section>
        <h2 className="text-sm font-semibold mb-3">Project structure</h2>
        <div className="rounded-lg border overflow-hidden text-sm">
          {[
            ['design-system.config.ts', 'Single source of truth'],
            ['app/', 'Next.js pages and layouts'],
            ['components/', 'Reusable UI components'],
            ['/design-system', 'Design System viewer'],
          ].map(([path, desc], i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-0">
              <code className="text-xs font-mono text-muted-foreground w-48">{path}</code>
              <span className="text-sm text-muted-foreground">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <h2 className="text-sm font-semibold mb-3">Components ({components.length})</h2>
        {components.length === 0 ? (
          <p className="text-sm text-muted-foreground">No components registered yet.</p>
        ) : (
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-3 text-xs font-medium text-muted-foreground">Source</th>
                </tr>
              </thead>
              <tbody>
                {components.map((c: { id: string; name?: string; category?: string; source?: string }) => (
                  <tr key={c.id} className="border-t">
                    <td className="p-3 text-sm font-medium">
                      <Link href={`/design-system/components/${c.id}`} className="hover:text-primary hover:underline">{c.name ?? c.id}</Link>
                    </td>
                    <td className="p-3 font-mono text-xs text-muted-foreground">{c.id}</td>
                    <td className="p-3 text-sm text-muted-foreground">{String(c.category ?? '—')}</td>
                    <td className="p-3 text-sm text-muted-foreground">{String(c.source ?? '—')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Tokens: Colors */}
      <section>
        <h2 className="text-sm font-semibold mb-3">Color tokens</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2">Light</h3>
            <div className="space-y-1.5">
              {Object.entries(light).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <div className="size-4 rounded border shrink-0" style={{ backgroundColor: typeof value === 'string' ? value : undefined }} />
                  <span className="font-mono text-xs w-24">{key}</span>
                  <span className="text-xs text-muted-foreground">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium text-muted-foreground mb-2">Dark</h3>
            <div className="space-y-1.5">
              {Object.entries(dark).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2 text-sm">
                  <div className="size-4 rounded border shrink-0" style={{ backgroundColor: typeof value === 'string' ? value : undefined }} />
                  <span className="font-mono text-xs w-24">{key}</span>
                  <span className="text-xs text-muted-foreground">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tokens: Typography */}
      <section>
        <h2 className="text-sm font-semibold mb-3">Typography tokens</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {typeof typography === 'object' && typography !== null && !Array.isArray(typography) && Object.entries(typography).map(([group, values]) => (
            <div key={group}>
              <h3 className="text-xs font-medium text-muted-foreground mb-2">{group}</h3>
              <div className="space-y-1 text-sm">
                {typeof values === 'object' && values !== null && !Array.isArray(values)
                  ? Object.entries(values).map(([k, v]) => (
                      <div key={k} className="flex gap-2"><span className="font-mono text-xs">{k}</span><span className="text-xs text-muted-foreground">{String(v)}</span></div>
                    ))
                  : <div className="text-xs text-muted-foreground">{String(values)}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tokens: Spacing & Radius */}
      <section className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold mb-3">Spacing tokens</h2>
          <div className="space-y-1.5">
            {Object.entries(spacing).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="font-mono text-xs w-12">{key}</span>
                <span className="text-xs text-muted-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-3">Radius tokens</h2>
          <div className="space-y-1.5">
            {Object.entries(radius).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <span className="font-mono text-xs w-12">{key}</span>
                <span className="text-xs text-muted-foreground">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
