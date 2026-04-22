import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

function SimpleMarkdown({ children }: { children: string }) {
  const lines = children.split('\n')
  const elements: React.ReactNode[] = []
  lines.forEach((line, i) => {
    if (line.startsWith('### '))
      elements.push(
        <h3
          key={i}
          className="mt-5 mb-2 text-[15px] font-medium tracking-tight text-[var(--foreground)]"
        >
          {line.slice(4)}
        </h3>,
      )
    else if (line.startsWith('## '))
      elements.push(
        <h2
          key={i}
          className="mt-7 mb-3 text-[18px] font-medium tracking-tight text-[var(--foreground)]"
        >
          {line.slice(3)}
        </h2>,
      )
    else if (line.startsWith('# '))
      elements.push(
        <h1
          key={i}
          className="mt-7 mb-3 text-[22px] font-medium tracking-tight text-[var(--foreground)]"
        >
          {line.slice(2)}
        </h1>,
      )
    else if (line.startsWith('- '))
      elements.push(
        <li key={i} className="ml-4 list-disc text-[13px] text-[var(--fg-muted)]">
          {line.slice(2)}
        </li>,
      )
    else if (line.trim())
      elements.push(
        <p key={i} className="my-1 text-[13px] text-[var(--fg-muted)]">
          {line}
        </p>,
      )
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
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          UX/UI Recommendations
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          Generated as you build · the AI adds suggestions for accessibility, layout, and
          consistency.
        </p>
      </div>

      {!body ? (
        <div className="mono rounded-md border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-6 text-[11.5px] text-[var(--fg-dim)]">
          no recommendations yet · use{' '}
          <code className="rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-0.5 text-[var(--foreground)]">
            coherent chat
          </code>{' '}
          to modify the interface — the AI will add UX suggestions here.
        </div>
      ) : (
        <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-6">
          <SimpleMarkdown>{body}</SimpleMarkdown>
        </div>
      )}
    </div>
  )
}
