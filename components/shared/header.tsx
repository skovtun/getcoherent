'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header className="border-b border-border/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Coherent Design Method</div>
            <nav>
              <Link href="/" className="text-sm text-foreground font-medium">Home</Link>
            </nav>
          </div>
        </div>
      </header>
  )
}
