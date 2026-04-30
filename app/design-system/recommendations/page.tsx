import { readFileSync, existsSync, statSync } from 'fs'
import { join } from 'path'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
      <span className="h-1.5 w-1.5 rounded-[2px] bg-primary" />
      {children}
    </div>
  )
}

// Better markdown renderer: handles headings, bullets, inline code,
// code blocks (```), and groups consecutive bullets into <ul>.
function Markdown({ children }: { children: string }) {
  const lines = children.split('\n')
  const out: React.ReactNode[] = []
  let bullets: string[] = []
  let codeLines: string[] = []
  let inCode = false

  const flushBullets = () => {
    if (bullets.length === 0) return
    out.push(
      <ul key={`ul-${out.length}`} className="my-3 ml-4 space-y-1.5 list-disc text-[13.5px] leading-[1.55] text-foreground marker:text-muted-foreground/60">
        {bullets.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(b) }} />)}
      </ul>
    )
    bullets = []
  }

  const flushCode = () => {
    if (codeLines.length === 0) return
    out.push(
      <pre key={`pre-${out.length}`} className="my-3 overflow-x-auto rounded-md border border-border bg-muted/40 p-3 font-mono text-[12px] leading-[1.6] text-foreground">
        <code>{codeLines.join('\n')}</code>
      </pre>
    )
    codeLines = []
  }

  // Convert `inline code` and **bold** to HTML.
  function renderInline(text: string): string {
    return text
      .replace(/`([^`]+)`/g, '<code class="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
  }

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCode) { flushCode(); inCode = false } else { flushBullets(); inCode = true }
      return
    }
    if (inCode) { codeLines.push(line); return }
    if (line.startsWith('### ')) { flushBullets(); out.push(<h3 key={i} className="mt-6 mb-2 text-[15px] font-semibold tracking-tight text-foreground">{line.slice(4)}</h3>) }
    else if (line.startsWith('## ')) { flushBullets(); out.push(<h2 key={i} className="mt-7 mb-2 text-[18px] font-semibold tracking-tight text-foreground">{line.slice(3)}</h2>) }
    else if (line.startsWith('# ')) { flushBullets(); out.push(<h1 key={i} className="mt-2 mb-3 text-[22px] font-semibold tracking-tight text-foreground">{line.slice(2)}</h1>) }
    else if (line.startsWith('- ')) { bullets.push(line.slice(2)) }
    else if (line.trim()) { flushBullets(); out.push(<p key={i} className="my-2 text-[13.5px] leading-[1.6] text-muted-foreground" dangerouslySetInnerHTML={{ __html: renderInline(line) }} />) }
  })
  flushBullets()
  flushCode()
  return <>{out}</>
}

const SAMPLE = `## Accessibility · button labels
- Buttons "OK" and "Cancel" lack aria-label context. Suggest "Confirm changes" / "Cancel and discard".
- Icon-only buttons missing aria-label. Add descriptive labels for screen readers.

## Layout · pricing page
- Three-tier card grid wraps to single column on iPhone SE (320px). Consider a 2-tier mobile layout.
- "Most popular" badge collides with card border on hover. Add 4px padding.

## Copy · empty states
- Dashboard empty state reads "No data". Replace with action-oriented copy: "Connect a source to see analytics here."`

const CATEGORIES = [
  { label: 'Accessibility', hint: 'Missing aria-labels, low contrast, focus traps, keyboard navigation' },
  { label: 'Layout', hint: 'Mobile breakpoints, overflow, alignment drift, density at scale' },
  { label: 'Consistency', hint: 'Off-spec spacing, raw colors, ad-hoc components, pattern divergence' },
  { label: 'Copy', hint: 'CTA clarity, empty-state guidance, error message tone, banned-word violations' },
]

export default function RecommendationsPage() {
  const path = join(process.cwd(), 'recommendations.md')
  const exists = existsSync(path)
  const raw = exists ? readFileSync(path, 'utf-8') : ''
  // Strip placeholder header lines so we only render real content.
  const body = raw
    .replace(/^# UX\/UI Recommendations[\s\S]*?(?=^##|^[^#\n].+\n+##|\$)/m, '')
    .trim()
  const isPlaceholder = !body || body.length < 50
  const lastUpdated = exists ? new Date(statSync(path).mtimeMs).toISOString().slice(0, 10) : null
  // Rough count of recommendation items (## sections + - bullets)
  const recCount = isPlaceholder ? 0 : (body.match(/^- /gm)?.length ?? 0) + (body.match(/^## /gm)?.length ?? 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-foreground">
            Recommendations
          </h1>
          {!isPlaceholder && (
            <span className="font-mono text-[12px] text-muted-foreground tabular-nums">
              {recCount} item{recCount === 1 ? '' : 's'}
              {lastUpdated && <> · updated <span className="text-foreground/80">{lastUpdated}</span></>}
            </span>
          )}
        </div>
        <p className="mt-1 max-w-[68ch] text-[13.5px] leading-[1.55] text-muted-foreground">
          AI-generated suggestions to improve this project — accessibility, layout, copy, consistency. Populated by <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">coherent check</code> and during <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">coherent chat</code> when the AI spots issues. Source lives at <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">recommendations.md</code> in the project root.
        </p>
      </div>

      {isPlaceholder ? (
        <div className="space-y-6">
          {/* What gets recommended */}
          <section className="rounded-md border border-border bg-card">
            <div className="rounded-t-md border-b border-border bg-muted px-4 py-3">
              <SectionLabel>what gets recommended</SectionLabel>
            </div>
            <div className="grid gap-px md:grid-cols-2">
              {CATEGORIES.map((cat) => (
                <div key={cat.label} className="border-b border-border bg-card px-4 py-3 last:border-0 md:[&:nth-last-child(-n+2)]:border-b-0">
                  <div className="text-[13.5px] font-medium text-foreground">{cat.label}</div>
                  <p className="mt-1 text-[12.5px] leading-[1.5] text-muted-foreground">{cat.hint}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How they appear */}
          <section className="rounded-md border border-border bg-card p-5">
            <h2 className="text-[15px] font-semibold tracking-tight text-foreground">How recommendations appear</h2>
            <ol className="mt-3 space-y-2.5 text-[13px] leading-[1.55] text-muted-foreground">
              <li className="flex items-start gap-2.5"><span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] tabular-nums text-primary">1</span><span>Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">coherent check</code> — validators flag issues across pages and components.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] tabular-nums text-primary">2</span><span>Or run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">coherent chat</code> — the AI flags concerns mid-modification.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] tabular-nums text-primary">3</span><span>Findings append to <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">recommendations.md</code>, grouped by category.</span></li>
              <li className="flex items-start gap-2.5"><span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] tabular-nums text-primary">4</span><span>This page renders them. Address them in your code, then re-run <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11.5px]">coherent check</code> — resolved items disappear from the file.</span></li>
            </ol>
          </section>

          {/* Sample */}
          <section className="rounded-md border border-dashed border-border bg-muted/30 p-5">
            <div className="flex items-center justify-between gap-3">
              <SectionLabel>sample · what real output looks like</SectionLabel>
              <span className="font-mono text-[10.5px] text-muted-foreground/70">illustrative only</span>
            </div>
            <div className="mt-4 rounded-md border border-border bg-card p-4">
              <Markdown>{SAMPLE}</Markdown>
            </div>
          </section>
        </div>
      ) : (
        <div className="rounded-md border border-border bg-card p-5">
          <Markdown>{body}</Markdown>
        </div>
      )}
    </div>
  )
}
