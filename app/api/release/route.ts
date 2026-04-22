import { NextResponse } from 'next/server'

const OWNER = 'skovtun'
const REPO = 'coherent-design-method'

const FALLBACK = {
  version: 'v0.7.24',
  date: 'april 2026',
  name: 'atmosphere engine',
}

/**
 * Extract the latest release subtitle from CHANGELOG.md. The canonical format
 * in this repo is:
 *   ## [0.7.22] — 2026-04-20
 *
 *   ### `coherent wiki audit` — extended checks (PR 2 from v0.7.x wiki refactor)
 *
 * We pull the `###` line, strip backticks and trailing parentheticals, and
 * keep the first clause before an em-dash or colon. Result: "coherent wiki
 * audit" — short, honest, release-themed.
 */
function extractReleaseName(changelog: string): string | null {
  const match = changelog.match(
    /^##\s*\[[\d.]+\][^\n]*\n+###\s+([^\n]+)/m,
  )
  if (!match) return null
  const raw = match[1].trim()
  const noBackticks = raw.replace(/`/g, '')
  // Split on em dash, en dash, hyphen-surrounded-by-spaces, colon, or opening paren
  const short = noBackticks.split(/\s+[—–]\s+|\s+-\s+|\s*:\s*|\s*\(/)[0].trim()
  if (!short) return null
  // Truncate if still too long
  const limited = short.length > 42 ? short.slice(0, 39).trim() + '…' : short
  return limited.toLowerCase()
}

export async function GET() {
  try {
    const [pkgRes, commitRes, changelogRes] = await Promise.all([
      fetch(
        `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/packages/cli/package.json`,
        { next: { revalidate: 3600 } },
      ),
      fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/commits/main`,
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          next: { revalidate: 3600 },
        },
      ),
      fetch(
        `https://raw.githubusercontent.com/${OWNER}/${REPO}/main/docs/CHANGELOG.md`,
        { next: { revalidate: 3600 } },
      ),
    ])

    if (!pkgRes.ok) {
      return NextResponse.json(FALLBACK, { status: 200 })
    }

    const pkg = await pkgRes.json()
    const versionRaw = String(pkg.version || '0.7.24')
    const version = versionRaw.startsWith('v') ? versionRaw : `v${versionRaw}`

    let date = FALLBACK.date
    if (commitRes.ok) {
      const commit = await commitRes.json()
      const iso = commit?.commit?.author?.date || commit?.commit?.committer?.date
      if (iso) {
        const d = new Date(iso)
        date = `${d
          .toLocaleString('en-US', { month: 'long' })
          .toLowerCase()} ${d.getFullYear()}`
      }
    }

    let name = FALLBACK.name
    if (changelogRes.ok) {
      const md = await changelogRes.text()
      const extracted = extractReleaseName(md)
      if (extracted) name = extracted
    }

    return NextResponse.json(
      { version, date, name },
      {
        headers: {
          'Cache-Control':
            'public, s-maxage=3600, stale-while-revalidate=86400',
        },
      },
    )
  } catch {
    return NextResponse.json(FALLBACK, { status: 200 })
  }
}
