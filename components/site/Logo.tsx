import Link from 'next/link'

/**
 * Coherent mark — 3 concentric rounded rects with minimal corner radius
 * and a solid accent center. Reads as "app > page > component" nesting
 * hierarchy at any size.
 */
export function CoherentMark({
  size = 22,
  className = '',
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* outer frame */}
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      {/* 2×2 token grid — top-left + bottom-right full, top-right + bottom-left dim */}
      <rect x="7" y="7" width="4" height="4" rx="0.75" fill="currentColor" />
      <rect
        x="13"
        y="7"
        width="4"
        height="4"
        rx="0.75"
        fill="currentColor"
        opacity="0.45"
      />
      <rect
        x="7"
        y="13"
        width="4"
        height="4"
        rx="0.75"
        fill="currentColor"
        opacity="0.45"
      />
      <rect x="13" y="13" width="4" height="4" rx="0.75" fill="currentColor" />
    </svg>
  )
}

export function Logo({
  href = '/',
  size = 32,
  showTagline = true,
  className = '',
}: {
  href?: string
  size?: number
  showTagline?: boolean
  className?: string
}) {
  return (
    <Link
      href={href}
      aria-label="Coherent — Design Method"
      className={`press inline-flex items-center gap-2.5 rounded-md outline-none ${className}`}
    >
      <CoherentMark size={size} className="text-[var(--accent)]" />
      <div className="flex flex-col leading-[0.8]">
        <span className="text-[20px] font-bold tracking-[-0.03em] text-[var(--foreground)]">
          coherent
        </span>
        {showTagline && (
          <span
            className="mt-[4px] text-[9px] uppercase tracking-[0.125em] text-[var(--fg-dim)]"
            style={{ fontFamily: 'var(--font-geist-mono), ui-monospace, monospace' }}
          >
            Design Method
          </span>
        )}
      </div>
    </Link>
  )
}
