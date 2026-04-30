'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SharedEntry {
  id: string
  name: string
  type: string
  file: string
  usedIn: string[]
  description?: string
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

export default function SharedComponentsPage() {
  const [shared, setShared] = useState<SharedEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/design-system/shared-components')
      .then((res) => res.json())
      .then((data) => setShared(data.shared ?? []))
      .catch(() => setShared([]))
      .finally(() => setLoading(false))
  }, [])

  const order = { layout: 0, section: 1, widget: 2 }
  const sorted = [...shared].sort(
    (a, b) => (order[a.type as keyof typeof order] ?? 3) - (order[b.type as keyof typeof order] ?? 3) || a.name.localeCompare(b.name)
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
          Shared Components
        </h1>
        <p className="mt-1 text-[13.5px] text-muted-foreground">
          Reusable layout and section components with unique IDs · edit via{' '}
          <code className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">coherent chat</code>{' '}
          by ID or name.
        </p>
      </div>

      {loading ? (
        <p className="font-mono text-[11.5px] text-muted-foreground/70">loading…</p>
      ) : sorted.length === 0 ? (
        <div className="rounded-md border border-dashed border-border bg-card p-8 text-center font-mono text-[12px] text-muted-foreground/70">
          no shared components yet · run{' '}
          <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-foreground">coherent components shared add Header --type layout</code>{' '}
          or ask chat "add a page with header and footer".
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                  <th className="px-4 py-2 text-left font-normal">name</th>
                  <th className="px-4 py-2 text-left font-normal">id</th>
                  <th className="px-4 py-2 text-left font-normal">type</th>
                  <th className="px-4 py-2 text-left font-normal">used in</th>
                  <th className="px-4 py-2 text-left font-normal">description</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry) => (
                  <tr key={entry.id} className="border-b border-border font-mono text-[12px] transition-colors last:border-0 hover:bg-muted">
                    {/* Name primary — colored link, the actual click target */}
                    <td className="px-4 py-2.5">
                      <Link href={`/design-system/shared/${encodeURIComponent(entry.id)}`} className="font-medium text-primary outline-none transition-colors hover:text-primary/80">
                        {entry.name}
                      </Link>
                    </td>
                    {/* ID secondary — quiet mono identifier */}
                    <td className="px-4 py-2.5 text-[11px] text-muted-foreground/70">{entry.id}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{entry.type}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {entry.usedIn.length === 0
                        ? '—'
                        : entry.usedIn.length === 1 && entry.usedIn[0] === 'app/layout.tsx'
                          ? 'layout (all pages)'
                          : entry.usedIn.join(', ')}
                    </td>
                    {/* Description shown in full — was truncated before */}
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {entry.description ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
