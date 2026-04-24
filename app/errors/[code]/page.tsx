import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, Terminal } from 'lucide-react'
import { Container } from '@/components/site/Container'
import { ERROR_CODES, findErrorCode } from '@/lib/error-codes'

interface Params {
  code: string
}

export function generateStaticParams(): Array<Params> {
  return ERROR_CODES.map(e => ({ code: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { code } = await params
  const entry = findErrorCode(code)
  if (!entry) return { title: 'Unknown error code' }
  return {
    title: `${entry.code} — ${entry.title}`,
    description: entry.description,
    alternates: { canonical: `/errors/${entry.slug}` },
    openGraph: {
      title: `${entry.code} — ${entry.title}`,
      description: entry.description,
      url: `/errors/${entry.slug}`,
      type: 'article',
    },
  }
}

export default async function ErrorCodePage({ params }: { params: Promise<Params> }) {
  const { code } = await params
  const entry = findErrorCode(code)
  if (!entry) notFound()

  return (
    <main className="min-h-[100dvh] bg-background pb-24 pt-12">
      <Container>
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/errors" className="hover:text-foreground transition-colors inline-flex items-center gap-1.5">
            <ArrowLeft className="size-3.5" />
            All error codes
          </Link>
        </nav>

        <header className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
            <Terminal className="size-3" />
            {entry.code}
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{entry.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{entry.description}</p>
        </header>

        <section className="mb-10 rounded-xl border border-border/40 bg-muted/20 p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">When you see it</h2>
          <p className="text-sm leading-relaxed text-foreground/90">{entry.whenYouSeeIt}</p>
        </section>

        <section className="mb-10 rounded-xl border border-border/40 bg-muted/20 p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Why</h2>
          <p className="text-sm leading-relaxed text-foreground/90">{entry.why}</p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Fix options</h2>
          <ol className="space-y-5">
            {entry.fixes.map((fix, i) => (
              <li key={i} className="rounded-xl border border-border/40 bg-background p-6">
                <div className="mb-2 flex items-center gap-3">
                  <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  <h3 className="text-sm font-semibold">{fix.label}</h3>
                </div>
                <p className="mb-3 pl-9 text-sm leading-relaxed text-muted-foreground">{fix.body}</p>
                {fix.command ? (
                  <pre className="ml-9 overflow-x-auto rounded-md bg-zinc-950 px-4 py-3 font-mono text-sm text-emerald-400">
                    <code>
                      <span className="text-muted-foreground">$ </span>
                      {fix.command}
                    </code>
                  </pre>
                ) : null}
              </li>
            ))}
          </ol>
        </section>

        {entry.related.length > 0 ? (
          <section className="mb-10">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Related</h2>
            <ul className="space-y-2 text-sm">
              {entry.related.map(rel => (
                <li key={rel.href}>
                  <Link href={rel.href} className="text-primary hover:underline">
                    {rel.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="mt-16 rounded-xl border border-border/30 bg-muted/10 p-5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <BookOpen className="size-4 shrink-0" />
            <span>
              These error pages mirror{' '}
              <Link
                href="https://github.com/skovtun/coherent-design-method/blob/main/docs/error-codes.md"
                className="text-primary hover:underline"
              >
                docs/error-codes.md
              </Link>{' '}
              in the CLI repo. Every error the CLI prints links back here via <span className="font-mono">docsUrl</span>.
            </span>
          </div>
        </footer>
      </Container>
    </main>
  )
}
