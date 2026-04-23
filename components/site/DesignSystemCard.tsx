'use client'

import { ArrowRight, Check, Search } from 'lucide-react'

const CID_REGISTRY = [
  { cid: 'CID-0012', name: 'Button', used: 47 },
  { cid: 'CID-0018', name: 'Input', used: 23 },
  { cid: 'CID-0021', name: 'Badge', used: 34 },
  { cid: 'CID-0027', name: 'Card', used: 19 },
]

const PAGES_MANIFEST = [
  { route: '/', file: 'app/page.tsx', cids: 7 },
  { route: '/pricing', file: 'app/pricing/page.tsx', cids: 5 },
  { route: '/dashboard', file: 'app/dashboard/page.tsx', cids: 8 },
  { route: '/settings', file: 'app/settings/page.tsx', cids: 6 },
]

export function DesignSystemCard() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]"
    >
      {/* frame header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--border-strong)]" />
          </div>
          <span className="mono ml-3 text-[12px] text-[var(--fg-muted)]">
            design-system.config.ts
          </span>
        </div>
        <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
          atmosphere · console
        </span>
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-5 p-5">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        {/* LEFT COLUMN — TOKENS */}
        <div className="space-y-5">
          {/* TYPOGRAPHY SCALE */}
          <section>
            <SectionLabel>typography · scale</SectionLabel>
            <div className="mt-2 space-y-2 rounded-md border border-[var(--border)] bg-[var(--elevated)] p-4">
              <TypeRow
                label="H1"
                meta="32 / 700 · -0.02em"
                size={26}
                weight={700}
                tracking={-0.02}
                sample="Design Systems"
              />
              <TypeRow
                label="H2"
                meta="22 / 600 · -0.01em"
                size={20}
                weight={600}
                tracking={-0.01}
                sample="Shared components"
              />
              <TypeRow
                label="Body"
                meta="14 / 400 · 0"
                size={14}
                weight={400}
                tracking={0}
                sample="Every token propagates everywhere."
              />
              <TypeRow
                label="Caption"
                meta="mono · 11 / 500 · 0.14em"
                size={11}
                weight={500}
                tracking={0.14}
                mono
                uppercase
                sample="SECTION LABEL"
              />
            </div>
          </section>

          {/* PALETTE */}
          <section>
            <SectionLabel>palette · semantic</SectionLabel>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {[
                { name: 'bg', val: 'var(--background)' },
                { name: 'surface', val: 'var(--surface)' },
                { name: 'elevated', val: 'var(--elevated)' },
                { name: 'border', val: 'var(--border-strong)' },
                { name: 'fg', val: 'var(--foreground)' },
                { name: 'muted', val: 'var(--fg-muted)' },
                { name: 'accent', val: 'var(--accent)' },
                { name: 'danger', val: 'var(--error)' },
              ].map((c) => (
                <div key={c.name} className="flex flex-col gap-1">
                  <div
                    className="h-9 rounded border border-[var(--border)]"
                    style={{ background: c.val }}
                    title={c.name}
                  />
                  <span className="mono truncate text-[9.5px] text-[var(--fg-dim)]">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* SPACING + RADIUS */}
          <section className="grid grid-cols-2 items-start gap-3">
            <div>
              <SectionLabel>spacing · 4pt</SectionLabel>
              <div className="mt-2 flex h-[56px] items-end justify-between gap-1 rounded-md border border-[var(--border)] bg-[var(--elevated)] px-2.5 pb-1 pt-1.5">
                {[4, 8, 12, 16, 20, 24, 32].map((v) => (
                  <div key={v} className="flex flex-col items-center gap-1">
                    <div
                      className="rounded-[1.5px] bg-gradient-to-t from-[var(--accent)]/50 to-[var(--accent)]"
                      style={{ width: `${v}px`, height: `${v}px` }}
                    />
                    <span className="mono text-[9px] tabular-nums text-[var(--fg-dim)]">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionLabel>radius</SectionLabel>
              <div className="mt-2 grid h-[56px] grid-cols-4 items-center gap-1.5 rounded-md border border-[var(--border)] bg-[var(--elevated)] p-1.5">
                {[
                  { label: 'sm', px: 2 },
                  { label: 'md', px: 6 },
                  { label: 'lg', px: 10 },
                  { label: 'xl', px: 14 },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="mono flex h-full items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)] text-[9px]"
                    style={{ borderRadius: `${r.px}px` }}
                  >
                    <span className="text-[var(--accent)]">{r.label}</span>
                    <span className="ml-1 text-[var(--fg-dim)]">{r.px}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN — COMPONENTS */}
        <div className="space-y-5">
          <section>
            <SectionLabel>components · live</SectionLabel>
            <div className="mt-2 space-y-3 rounded-md border border-[var(--border)] bg-[var(--elevated)] p-4">
              {/* BUTTONS */}
              <SubLabel>button · variants</SubLabel>
              <div className="flex flex-wrap items-center gap-2">
                <button className="press mono inline-flex h-8 items-center gap-1.5 rounded-md bg-[var(--accent)] px-3 text-[12px] font-medium text-[var(--accent-foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_24px_-10px_var(--accent-glow)]">
                  Primary
                  <ArrowRight size={11} strokeWidth={2.4} />
                </button>
                <button className="press mono inline-flex h-8 items-center rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-[12px] text-[var(--foreground)] hover:border-[var(--fg-dim)]">
                  Secondary
                </button>
                <button className="press mono inline-flex h-8 items-center rounded-md px-3 text-[12px] text-[var(--fg-muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]">
                  Ghost
                </button>
              </div>

              {/* INPUT */}
              <SubLabel className="mt-3">input · focus ring</SubLabel>
              <label className="input-ring mono flex h-9 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-[12.5px]">
                <Search size={12} strokeWidth={2} className="text-[var(--fg-dim)]" />
                <input
                  type="text"
                  placeholder="Search tokens…"
                  className="mono w-full bg-transparent outline-none placeholder:text-[var(--fg-dim)]"
                />
              </label>

              {/* BADGES */}
              <SubLabel className="mt-3">badge · tone</SubLabel>
              <div className="flex flex-wrap gap-1.5">
                <MiniBadge tone="accent">success</MiniBadge>
                <MiniBadge tone="warn">slow</MiniBadge>
                <MiniBadge tone="err">error</MiniBadge>
                <MiniBadge tone="dim">default</MiniBadge>
              </div>

              {/* CARD */}
              <SubLabel className="mt-3">card · composition</SubLabel>
              <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] p-3">
                <div className="mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  API latency · p99
                </div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="mono text-[22px] font-medium leading-none tracking-tight tabular-nums text-[var(--foreground)]">
                    124ms
                  </span>
                  <span className="mono text-[10.5px] tabular-nums text-[var(--accent)]">
                    −8ms
                  </span>
                </div>
                <div className="mt-2 flex items-end gap-0.5">
                  {[4, 6, 5, 8, 7, 9, 6, 10, 8, 12, 9, 11].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-[1px] bg-[var(--accent)]/70"
                      style={{ height: `${h * 2}px` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* USAGE · full-width bottom */}
      <section>
        <SectionLabel>usage · cascade edit</SectionLabel>
        <div className="mono mt-2 grid gap-0 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--elevated)] lg:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-2 border-b border-[var(--border)] px-3 py-2 text-[10px] text-[var(--fg-dim)] lg:border-b-0 lg:border-r lg:py-3">
            <Check size={10} strokeWidth={2.2} className="text-[var(--accent)]" />
            <span>change <span className="text-[var(--accent)]">--accent</span></span>
            <span className="text-[var(--fg-dim)]">·</span>
            <span>47 components updated</span>
          </div>
          <pre className="mono overflow-x-auto px-3 py-2 text-[11px] leading-[1.7] text-[var(--fg-muted)]">
            <code>{`tokens.accent  = "#3ecf8e"   tokens.radius = { sm: 2, md: 6, lg: 8 }
<Button variant="primary">Save query</Button>   <Badge tone="warn">slow</Badge>`}</code>
          </pre>
        </div>
      </section>

      {/* REGISTRY + PAGES · full-width bottom */}
      <section className="grid gap-5 lg:grid-cols-2">
        <div>
          <SectionLabel>registry · cid-addressed</SectionLabel>
          <div className="mt-2 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--elevated)]">
            <div className="mono grid grid-cols-[1fr_1fr_auto] gap-3 border-b border-[var(--border)] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
              <span>id</span>
              <span>component</span>
              <span className="text-right">used in</span>
            </div>
            {CID_REGISTRY.map((c, i) => (
              <div
                key={c.cid}
                className={`mono grid grid-cols-[1fr_1fr_auto] gap-3 px-3 py-1.5 text-[11px] ${
                  i !== CID_REGISTRY.length - 1
                    ? 'border-b border-[var(--border)]'
                    : ''
                }`}
              >
                <span className="text-[var(--accent)]">{c.cid}</span>
                <span className="text-[var(--foreground)]">{c.name}</span>
                <span className="text-right tabular-nums text-[var(--fg-dim)]">
                  {c.used} pages
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionLabel>pages · manifest</SectionLabel>
          <div className="mt-2 overflow-hidden rounded-md border border-[var(--border)] bg-[var(--elevated)]">
            <div className="mono grid grid-cols-[auto_1fr_auto] gap-3 border-b border-[var(--border)] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
              <span>route</span>
              <span>file</span>
              <span className="text-right">cids</span>
            </div>
            {PAGES_MANIFEST.map((p, i) => (
              <div
                key={p.route}
                className={`mono grid grid-cols-[auto_1fr_auto] gap-3 px-3 py-1.5 text-[11px] ${
                  i !== PAGES_MANIFEST.length - 1
                    ? 'border-b border-[var(--border)]'
                    : ''
                }`}
              >
                <span className="text-[var(--accent)]">{p.route}</span>
                <span className="truncate text-[var(--fg-muted)]">{p.file}</span>
                <span className="text-right tabular-nums text-[var(--fg-dim)]">
                  {p.cids}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      </div>

      {/* footer */}
      <div className="mono flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-[10.5px] text-[var(--fg-dim)]">
        <span>12 tokens · 9 components · 5 pages</span>
        <span className="inline-flex items-center gap-1 text-[var(--accent)]">
          <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          every value editable
        </span>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
      {children}
    </div>
  )
}

function SubLabel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)] ${className}`}
    >
      {children}
    </div>
  )
}

function TypeRow({
  label,
  meta,
  size,
  weight,
  tracking,
  sample,
  mono = false,
  uppercase = false,
}: {
  label: string
  meta: string
  size: number
  weight: number
  tracking: number
  sample: string
  mono?: boolean
  uppercase?: boolean
}) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-baseline gap-8">
      <span className="mono w-10 text-[9px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
        {label}
      </span>
      <span
        className={`${mono ? 'mono' : ''} truncate text-[var(--foreground)] ${
          uppercase ? 'uppercase' : ''
        }`}
        style={{
          fontSize: `${size}px`,
          fontWeight: weight,
          letterSpacing: `${tracking}em`,
          lineHeight: 1.1,
        }}
      >
        {sample}
      </span>
      <span className="mono text-[9px] text-[var(--fg-dim)]">{meta}</span>
    </div>
  )
}

function MiniBadge({
  tone,
  children,
}: {
  tone: 'accent' | 'warn' | 'err' | 'dim'
  children: React.ReactNode
}) {
  const cls =
    tone === 'accent'
      ? 'border-[var(--accent)]/35 bg-[var(--accent)]/12 text-[var(--accent)]'
      : tone === 'warn'
        ? 'border-[var(--warning)]/35 bg-[var(--warning)]/12 text-[var(--warning)]'
        : tone === 'err'
          ? 'border-[var(--error)]/35 bg-[var(--error)]/12 text-[var(--error)]'
          : 'border-[var(--border-strong)] bg-[var(--surface)] text-[var(--fg-muted)]'
  return (
    <span
      className={`mono inline-flex h-5 items-center rounded-[3px] border px-1.5 text-[10px] uppercase tracking-[0.1em] ${cls}`}
    >
      {children}
    </span>
  )
}
