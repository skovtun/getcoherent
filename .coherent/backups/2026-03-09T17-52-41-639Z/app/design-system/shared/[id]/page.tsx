'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Entry {
  id: string
  name: string
  type: string
  file: string
  usedIn: string[]
  description?: string
}

export default function SharedComponentDetailPage() {
  const params = useParams()
  const id = typeof params?.id === 'string' ? params.id : ''
  const [entry, setEntry] = useState<Entry | null>(null)
  const [code, setCode] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    fetch(`/api/design-system/shared-components/${encodeURIComponent(id)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setEntry(data.entry)
        setCode(data.code ?? '')
      })
      .catch(() => {
        setEntry(null)
        setCode('')
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="text-sm text-muted-foreground">Loading...</p>
  if (!entry) return <p className="text-sm text-muted-foreground">Component not found.</p>

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
          <Link href="/design-system/shared" className="hover:text-foreground">Shared Components</Link>
          <span>/</span>
          <span className="text-foreground font-medium">{entry.name}</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{entry.name}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          <span className="font-mono text-xs">{entry.id}</span> · {entry.type} · {entry.file}
        </p>
        {entry.description && <p className="text-sm text-muted-foreground mt-2">{entry.description}</p>}
      </div>

      {entry.usedIn.length > 0 && (
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-medium mb-2">Used in</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            {entry.usedIn.map((f) => (
              <li key={f} className="font-mono text-xs">{f}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border">
        <h2 className="text-sm font-medium px-4 py-2 border-b bg-muted/30">Source</h2>
        <pre className="p-4 text-xs overflow-auto max-h-[60vh] bg-muted/20">
          <code>{code || '(no content)'}</code>
        </pre>
      </div>
    </div>
  )
}
