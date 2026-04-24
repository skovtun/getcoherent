import type { Metadata } from 'next'
import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { Container } from '@/components/site/Container'
import { ERROR_CODES } from '@/lib/error-codes'

export const metadata: Metadata = {
  title: 'Error codes',
  description:
    'Reference for every `COHERENT_E0NN` code the Coherent CLI prints. When you see `Docs: https://getcoherent.design/errors/E0NN` in your terminal, land here.',
  alternates: { canonical: '/errors' },
  openGraph: {
    title: 'Coherent error codes',
    description: 'Reference for every COHERENT_E0NN the CLI prints. Code, one-line problem, why, fix.',
    url: '/errors',
    type: 'website',
  },
}

export default function ErrorsIndex() {
  return (
    <main className="min-h-[100dvh] bg-background pb-24 pt-12">
      <Container>
        <header className="mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-1 font-mono text-xs font-medium text-muted-foreground">
            <Terminal className="size-3" />
            Error reference
          </div>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Error codes</h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every user-facing error the Coherent CLI throws carries a stable <span className="font-mono">COHERENT_E0NN</span>{' '}
            code. The code never changes across releases once allocated. Each entry below shows when you see the error, why
            it fires, and how to fix it.
          </p>
        </header>

        <ul className="space-y-3">
          {ERROR_CODES.map(entry => (
            <li key={entry.slug}>
              <Link
                href={`/errors/${entry.slug}`}
                className="group block rounded-xl border border-border/40 bg-muted/20 p-5 transition-colors hover:border-border/70 hover:bg-muted/40"
              >
                <div className="mb-1 flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">{entry.code}</span>
                </div>
                <h2 className="text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                  {entry.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{entry.description}</p>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-16 rounded-xl border border-border/30 bg-muted/10 p-5 text-xs text-muted-foreground">
          <p>
            These pages mirror <span className="font-mono">docs/error-codes.md</span> in the CLI repo. Codes are
            append-only — a retired code leaves a tombstone rather than being re-assigned, so stale links keep resolving.
          </p>
        </footer>
      </Container>
    </main>
  )
}
