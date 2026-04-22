'use client'

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono mb-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

/* ============================================================
   6 LOGO MARK VARIANTS — all 24×24 viewBox, currentColor
   ============================================================ */

function MarkA({ size = 22 }: { size?: number }) {
  // CURRENT: 3 concentric rounded rects, stroke-2, solid center
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="10.25" y="10.25" width="3.5" height="3.5" rx="0.75" fill="currentColor" />
    </svg>
  )
}

function MarkB({ size = 22 }: { size?: number }) {
  // ALL-STROKE: center also stroked, lighter / more technical
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="10" width="4" height="4" rx="0.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function MarkC({ size = 22 }: { size?: number }) {
  // DOT CENTER: center replaced with a solid circle (reads as "node")
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="2.25" fill="currentColor" />
    </svg>
  )
}

function MarkD({ size = 22 }: { size?: number }) {
  // DIAMOND: same 3 rects rotated 45° around center — prism / stacked-layer feel
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <g transform="rotate(45 12 12)">
        <rect x="3.5" y="3.5" width="17" height="17" rx="2" stroke="currentColor" strokeWidth="2" />
        <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="2" />
        <rect x="10.25" y="10.25" width="3.5" height="3.5" rx="0.5" fill="currentColor" />
      </g>
    </svg>
  )
}

function MarkE({ size = 22 }: { size?: number }) {
  // MINIMAL: single square + centered dot — reads "one source of truth"
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" />
    </svg>
  )
}

function MarkF({ size = 22 }: { size?: number }) {
  // MONOGRAM C: outer rounded rect frame + stylized "C" glyph carved from middle
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 8.5a4.5 4.5 0 1 0 0 7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MarkG({ size = 22 }: { size?: number }) {
  // HASH / GRID: 4 small rounded rects in a 2x2 grid inside outer frame — "design tokens"
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="7" width="4" height="4" rx="0.75" fill="currentColor" />
      <rect x="13" y="7" width="4" height="4" rx="0.75" fill="currentColor" opacity="0.45" />
      <rect x="7" y="13" width="4" height="4" rx="0.75" fill="currentColor" opacity="0.45" />
      <rect x="13" y="13" width="4" height="4" rx="0.75" fill="currentColor" />
    </svg>
  )
}

function MarkH({ size = 22 }: { size?: number }) {
  // LAYERED: staggered stacked rects — reads as "cascade" / "layers"
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="2" />
      <rect
        x="6.5"
        y="9"
        width="13"
        height="13"
        rx="1.5"
        fill="currentColor"
        opacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

const VARIANTS = [
  { id: 'A', name: 'Current — concentric', Component: MarkA, note: 'baseline · 3 rings + solid node' },
  { id: 'B', name: 'All-stroke', Component: MarkB, note: 'no fill · cleaner at 14px' },
  { id: 'C', name: 'Dot center', Component: MarkC, note: 'circle node · feels like "socket"' },
  { id: 'D', name: 'Diamond', Component: MarkD, note: '45° rotation · prism · stacked layers' },
  { id: 'E', name: 'Minimal', Component: MarkE, note: 'single frame + dot · quietest' },
  { id: 'F', name: 'Monogram C', Component: MarkF, note: 'frame + glyph · literal brand letter' },
  { id: 'G', name: 'Token grid', Component: MarkG, note: '2×2 grid · reads as "design tokens"' },
  { id: 'H', name: 'Layered', Component: MarkH, note: 'stacked rects · cascade metaphor' },
]

function Lockup({
  Mark,
  markSize = 22,
  showTagline = true,
}: {
  Mark: React.ComponentType<{ size?: number }>
  markSize?: number
  showTagline?: boolean
}) {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="text-[var(--accent)]">
        <Mark size={markSize} />
      </span>
      <div className="flex flex-col leading-[0.8]">
        <span className="text-[15px] font-bold tracking-[-0.03em] text-[var(--foreground)]">
          coherent
        </span>
        {showTagline && (
          <span
            className="mono mt-[3px] text-[8.5px] uppercase tracking-[0.125em] text-[var(--fg-dim)]"
            style={{ fontFamily: 'var(--font-geist-mono), ui-monospace, monospace' }}
          >
            Design Method
          </span>
        )}
      </div>
    </div>
  )
}

export default function LogoVariantsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-[28px] font-medium leading-tight tracking-[-0.02em] text-[var(--foreground)]">
          Logo Lab
        </h1>
        <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
          8 mark variants · lockup comparison · 3 sizes · dark + light context.
        </p>
      </div>

      {/* GRID: all variants side-by-side */}
      <section className="flex flex-col gap-3">
        <SectionLabel>variants · dark</SectionLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {VARIANTS.map((v) => {
            const Mark = v.Component
            return (
              <div
                key={v.id}
                className="flex flex-col gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                    {v.id} · {v.name}
                  </span>
                </div>
                <div className="flex items-center justify-center rounded-md border border-[var(--border)] bg-[var(--elevated)] py-5">
                  <span className="text-[var(--accent)]">
                    <Mark size={44} />
                  </span>
                </div>
                <div className="mono text-[10.5px] text-[var(--fg-dim)]">{v.note}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* SIZES */}
      <section className="flex flex-col gap-3">
        <SectionLabel>sizes · 14 / 22 / 40</SectionLabel>
        <div className="grid gap-3 md:grid-cols-2">
          {VARIANTS.map((v) => {
            const Mark = v.Component
            return (
              <div
                key={v.id}
                className="flex items-center justify-between gap-4 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3"
              >
                <span className="mono text-[10.5px] text-[var(--fg-dim)]">{v.id}</span>
                <div className="flex items-center gap-6 text-[var(--accent)]">
                  <Mark size={14} />
                  <Mark size={22} />
                  <Mark size={40} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* LOCKUP (with wordmark) */}
      <section className="flex flex-col gap-3">
        <SectionLabel>lockup · header context</SectionLabel>
        <div className="grid gap-3 md:grid-cols-2">
          {VARIANTS.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between gap-4 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-4"
            >
              <span className="mono text-[10.5px] text-[var(--fg-dim)]">{v.id}</span>
              <Lockup Mark={v.Component} markSize={22} />
              <span className="mono text-[10.5px] text-[var(--fg-dim)]">22px</span>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHT THEME PREVIEW */}
      <section className="flex flex-col gap-3">
        <SectionLabel>variants · light</SectionLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {VARIANTS.map((v) => {
            const Mark = v.Component
            return (
              <div
                key={v.id}
                className="flex flex-col gap-3 rounded-md border border-[#d4d2cb] bg-[#ffffff] p-4"
                style={{ colorScheme: 'light' }}
              >
                <div className="mono text-[10px] uppercase tracking-[0.16em] text-[#8a8883]">
                  {v.id} · {v.name}
                </div>
                <div className="flex items-center justify-center rounded-md border border-[#e7e6e0] bg-[#fafaf7] py-5">
                  <span className="text-[#17a862]">
                    <Mark size={44} />
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <p className="mono text-[11px] text-[var(--fg-dim)]">
        to apply a variant · name it (e.g. «C») and I'll swap{' '}
        <code className="rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-0.5 text-[var(--foreground)]">
          CoherentMark
        </code>{' '}
        in{' '}
        <code className="rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-0.5 text-[var(--foreground)]">
          components/site/Logo.tsx
        </code>{' '}
        everywhere (header · DS · floating · favicon).
      </p>
    </div>
  )
}
