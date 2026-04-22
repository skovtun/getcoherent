'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

interface SharedEntry {
  id: string
  name: string
  type: string
  file: string
  usedIn: string[]
  description?: string
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
    (a, b) =>
      (order[a.type as keyof typeof order] ?? 3) -
        (order[b.type as keyof typeof order] ?? 3) || a.name.localeCompare(b.name),
  )

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Shared Components
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Reusable layout and section components with unique IDs · edit via{' '}
          <code className="mono rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-0.5 text-[11px] text-[var(--foreground)]">
            coherent chat
          </code>{' '}
          by ID or name.
        </p>
      </div>

      {loading ? (
        <p className="mono text-[11.5px] text-[var(--fg-dim)]">loading…</p>
      ) : sorted.length === 0 ? (
        <div className="mono rounded-md border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-8 text-center text-[12px] text-[var(--fg-dim)]">
          no shared components yet · run{' '}
          <code className="rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-0.5 text-[var(--foreground)]">
            coherent components shared add Header --type layout
          </code>{' '}
          or ask chat “add a page with header and footer”.
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="mono border-b border-[var(--border)] bg-[var(--surface-2)] text-[10px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  <th className="px-4 py-2 text-left font-normal">id</th>
                  <th className="px-4 py-2 text-left font-normal">name</th>
                  <th className="px-4 py-2 text-left font-normal">type</th>
                  <th className="px-4 py-2 text-left font-normal">used in</th>
                  <th className="px-4 py-2 text-left font-normal">description</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((entry) => (
                  <tr
                    key={entry.id}
                    className="mono border-b border-[var(--border)] text-[12px] transition-colors last:border-0 hover:bg-[var(--surface-2)]"
                  >
                    <td className="px-4 py-2 text-[11px] text-[var(--accent)]">{entry.id}</td>
                    <td className="px-4 py-2">
                      <Link
                        href={`/design-system/shared/${encodeURIComponent(entry.id)}`}
                        className="text-[var(--foreground)] hover:text-[var(--accent)]"
                      >
                        {entry.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-[var(--fg-muted)]">{entry.type}</td>
                    <td className="px-4 py-2 text-[var(--fg-muted)]">
                      {entry.usedIn.length === 0
                        ? '—'
                        : entry.usedIn.length === 1 && entry.usedIn[0] === 'app/layout.tsx'
                          ? 'layout (all pages)'
                          : entry.usedIn.join(', ')}
                    </td>
                    <td className="max-w-xs truncate px-4 py-2 text-[var(--fg-muted)]">
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
