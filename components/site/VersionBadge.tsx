'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ExternalLink, Radio } from 'lucide-react'
import { FALLBACK_RELEASE } from '@/lib/version'

type Release = {
  version: string
  date: string
  name?: string
}

const FALLBACK: Release = FALLBACK_RELEASE

const RELEASES_URL =
  'https://github.com/skovtun/coherent-design-method/releases'

export function VersionBadge() {
  const [release, setRelease] = useState<Release>(FALLBACK)

  useEffect(() => {
    let cancelled = false
    fetch('/api/release', { cache: 'force-cache' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Release | null) => {
        if (!cancelled && data && data.version) setRelease(data)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Link
      href={RELEASES_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View releases — current version ${release.version}`}
      className="group press inline-flex items-center gap-2 rounded-md outline-none"
    >
      <span className="mono inline-flex h-5 items-center gap-1 rounded-[4px] border border-[rgba(62,207,142,0.28)] bg-[rgba(62,207,142,0.08)] px-1.5 text-[10.5px] uppercase tracking-[0.08em] text-[var(--accent)] transition-colors duration-[150ms] group-hover:border-[var(--accent)] group-hover:bg-[rgba(62,207,142,0.14)]">
        <Radio size={10} strokeWidth={2.5} className="mr-0.5" />
        {release.version}
      </span>
      <span className="mono inline-flex items-center gap-1 text-[11.5px] text-[var(--fg-dim)] transition-colors duration-[150ms] group-hover:text-[var(--fg-muted)]">
        <span>· {release.date}</span>
        <ExternalLink
          size={10}
          strokeWidth={2}
          className="opacity-0 transition-opacity duration-[150ms] group-hover:opacity-100"
        />
      </span>
    </Link>
  )
}
