/**
 * Single source of truth for CLI version + release metadata displayed on the
 * landing page. Live values are fetched at runtime from:
 *   - npm registry (CLI version)
 *   - /api/release (version + date + name, backed by GitHub + CHANGELOG)
 *
 * The constants here are the SSR / pre-fetch fallback. Update
 * FALLBACK_CLI_VERSION on each CLI release so snapshots never look old.
 */

export const FALLBACK_CLI_VERSION = '0.11.0'
export const FALLBACK_RELEASE_DATE = 'april 2026'
export const FALLBACK_RELEASE_NAME = 'rail parity'

export function formatVersion(v: string): string {
  return v.startsWith('v') ? v : `v${v}`
}

export const FALLBACK_RELEASE = {
  version: formatVersion(FALLBACK_CLI_VERSION),
  date: FALLBACK_RELEASE_DATE,
  name: FALLBACK_RELEASE_NAME,
}
