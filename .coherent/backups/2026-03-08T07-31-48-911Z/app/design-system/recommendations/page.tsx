import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

function SimpleMarkdown({ children }: { children: string }) {
  const lines = children.split('\n')
  const elements: React.ReactNode[] = []
  lines.forEach((line, i) => {
    if (line.startsWith('### ')) elements.push(<h3 key={i} className="text-lg font-medium mt-4 mb-2">{line.slice(4)}</h3>)
    else if (line.startsWith('## ')) elements.push(<h2 key={i} className="text-xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>)
    else if (line.startsWith('# ')) elements.push(<h1 key={i} className="text-2xl font-bold mt-6 mb-3">{line.slice(2)}</h1>)
    else if (line.startsWith('- ')) elements.push(<li key={i} className="ml-4 list-disc text-sm">{line.slice(2)}</li>)
    else if (line.trim()) elements.push(<p key={i} className="text-sm text-muted-foreground my-1">{line}</p>)
  })
  return <>{elements}</>
}

export default function RecommendationsPage() {
  const path = join(process.cwd(), 'recommendations.md')
  const raw = existsSync(path) ? readFileSync(path, 'utf-8') : ''
  const body = raw
    .replace(/^#[^\n]*\n?/, '')
    .replace(/^[^#\n-][^\n]*\n?/, '')
    .replace(/^---\n?/, '')
    .trim()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">UX/UI Recommendations</h1>
        <p className="text-sm text-muted-foreground">
          Generated as you build. The AI adds suggestions for accessibility, layout, and consistency.
        </p>
      </div>
      {!body ? (
        <p className="text-sm text-muted-foreground">
          No recommendations yet. Use <code className="rounded bg-muted px-1.5 py-0.5 text-xs">coherent chat</code> to modify the interface — the AI will add UX suggestions here.
        </p>
      ) : (
        <div className="max-w-none">
          <SimpleMarkdown>{body}</SimpleMarkdown>
        </div>
      )}
    </div>
  )
}
