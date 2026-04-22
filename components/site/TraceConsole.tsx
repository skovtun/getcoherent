'use client'

import {
  Activity,
  AlertCircle,
  Bell,
  BarChart3,
  ChevronDown,
  Command,
  FileText,
  Filter,
  Gauge,
  LayoutGrid,
  Pause,
  Plug,
  Plus,
  Radio,
  Search,
  Settings,
  Share2,
  SlidersHorizontal,
  Target,
  TriangleAlert,
  X,
} from 'lucide-react'

type TraceRow = {
  id: string
  service: string
  method: 'GET' | 'POST' | 'DELETE'
  route: string
  duration: number
  spans: number
  status: 'ok' | 'warn' | 'err'
  at: string
}

const TRACES: TraceRow[] = [
  { id: '9f2a1c', service: 'checkout', method: 'POST', route: '/api/pay', duration: 2104, spans: 42, status: 'err', at: '12s ago' },
  { id: '8c01fd', service: 'checkout', method: 'POST', route: '/api/pay', duration: 1840, spans: 38, status: 'warn', at: '38s ago' },
  { id: '7b4e09', service: 'checkout', method: 'GET', route: '/api/cart', duration: 42, spans: 8, status: 'ok', at: '41s ago' },
  { id: '6e991a', service: 'search', method: 'GET', route: '/api/search', duration: 64, spans: 11, status: 'ok', at: '1m ago' },
  { id: '5a72e0', service: 'billing', method: 'POST', route: '/api/invoice', duration: 311, spans: 19, status: 'ok', at: '2m ago' },
  { id: '3d91ac', service: 'checkout', method: 'DELETE', route: '/api/cart/:id', duration: 28, spans: 4, status: 'ok', at: '3m ago' },
]

const LATENCY = [
  84, 92, 88, 75, 71, 80, 95, 102, 89, 76, 70, 84, 90, 88, 77, 72,
  85, 108, 132, 118, 94, 80, 77, 72, 85, 128, 210, 340, 2104, 1840,
  780, 420, 210, 140, 112, 96, 88, 84, 79, 77, 80, 85, 90, 94, 88,
  77, 72, 68, 74, 82, 88, 85, 79, 74, 72, 76, 81, 85, 88, 84,
]

const ERR_BUCKETS = new Set([28, 29])

const TAIL_LOG = [
  { t: '00:12.044', tag: 'TRACE', msg: 'checkout POST /api/cart 28ms ok', tone: 'dim' as const },
  { t: '00:12.117', tag: 'TRACE', msg: 'auth GET /api/me 19ms ok', tone: 'dim' as const },
  { t: '00:12.203', tag: 'WARN ', msg: 'checkout POST /api/pay 1840ms slow', tone: 'warn' as const },
  { t: '00:12.298', tag: 'TRACE', msg: 'search GET /api/search 64ms ok', tone: 'dim' as const },
  { t: '00:12.351', tag: 'TRACE', msg: 'billing POST /api/invoice 311ms ok', tone: 'dim' as const },
  { t: '00:12.442', tag: 'ERROR', msg: 'checkout POST /api/pay 2104ms 5xx', tone: 'err' as const },
  { t: '00:12.512', tag: 'TRACE', msg: 'notify POST /api/email 89ms ok', tone: 'dim' as const },
  { t: '00:12.601', tag: 'TRACE', msg: 'checkout DELETE /api/cart/:id 28ms ok', tone: 'dim' as const },
]

const NAV_SECTIONS = [
  {
    label: 'observe',
    items: [
      { icon: Activity, label: 'Traces', active: true },
      { icon: Gauge, label: 'Services' },
      { icon: BarChart3, label: 'Metrics' },
      { icon: FileText, label: 'Logs' },
    ],
  },
  {
    label: 'signal',
    items: [
      { icon: Bell, label: 'Alerts', badge: '3' },
      { icon: TriangleAlert, label: 'Incidents' },
      { icon: Target, label: 'SLOs' },
    ],
  },
  {
    label: 'build',
    items: [
      { icon: LayoutGrid, label: 'Dashboards' },
      { icon: Plug, label: 'Integrations' },
      { icon: Settings, label: 'Settings' },
    ],
  },
]

export function TraceConsole() {
  const max = Math.max(...LATENCY)
  const chartH = 100

  return (
    <div className="relative flex min-h-[620px] text-[var(--foreground)]">
      {/* SIDEBAR */}
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-[var(--border)] bg-[var(--surface)] px-3 py-4 md:flex">
        {/* product + org switch */}
        <div className="flex items-center gap-2 px-2 pb-3">
          <span className="mono text-[13px] font-medium tracking-tight">
            <span className="text-[var(--accent)]">›_</span>
            <span className="ml-1.5 text-[var(--foreground)]">trace</span>
          </span>
          <span className="mono ml-auto inline-flex items-center gap-1 rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 py-[1px] text-[10.5px] text-[var(--fg-muted)]">
            acme
            <ChevronDown size={9} strokeWidth={2} />
          </span>
        </div>

        {/* command */}
        <label className="input-ring mono mx-1 mb-4 flex h-8 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-2.5 text-[12px]">
          <Search size={11} strokeWidth={2} className="shrink-0 text-[var(--fg-dim)]" />
          <input
            type="text"
            placeholder="Jump to…"
            className="mono w-full bg-transparent outline-none placeholder:text-[var(--fg-dim)]"
            defaultValue=""
          />
          <span className="mono inline-flex shrink-0 items-center gap-0.5 rounded border border-[var(--border-strong)] bg-[var(--surface)] px-1 py-[1px] text-[9.5px] text-[var(--fg-muted)]">
            <Command size={8} strokeWidth={2.5} />K
          </span>
        </label>

        {/* nav sections */}
        <nav className="flex flex-1 flex-col gap-4">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className="mono px-2 pb-1.5 text-[9.5px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                {section.label}
              </div>
              <ul className="flex flex-col gap-[2px]">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const active = 'active' in item && item.active
                  const badge = 'badge' in item ? item.badge : undefined
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        className={`press mono flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[12.5px] outline-none ${
                          active
                            ? 'bg-[var(--elevated)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_var(--border-strong)]'
                            : 'text-[var(--fg-muted)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]'
                        }`}
                      >
                        <Icon
                          size={13}
                          strokeWidth={1.8}
                          className={active ? 'text-[var(--accent)]' : 'text-[var(--fg-dim)]'}
                        />
                        <span className="flex-1">{item.label}</span>
                        {badge && (
                          <span className="mono inline-flex h-4 min-w-4 items-center justify-center rounded-[3px] bg-[var(--error)]/18 px-1 text-[9.5px] font-medium text-[var(--error)]">
                            {badge}
                          </span>
                        )}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* user footer */}
        <div className="mono mt-3 flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--elevated)] px-2 py-1.5 text-[11.5px]">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[var(--accent)]/16 text-[10px] font-semibold text-[var(--accent)]">
            SK
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[12px] text-[var(--foreground)]">Sergei K.</div>
            <div className="mono truncate text-[9.5px] text-[var(--fg-dim)]">
              <span className="text-[var(--accent)]">●</span> acme / prod
            </div>
          </div>
          <ChevronDown size={11} strokeWidth={2} className="text-[var(--fg-dim)]" />
        </div>
      </aside>

      {/* MAIN */}
      <main className="min-w-0 flex-1">
        {/* action bar */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-2.5">
          <div className="mono flex min-w-0 items-center gap-1.5 text-[11.5px] text-[var(--fg-dim)]">
            <span className="truncate">acme</span>
            <span>/</span>
            <span className="truncate">prod</span>
            <span>/</span>
            <span className="text-[var(--foreground)]">traces</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <IconBtn><AlertCircle size={12} strokeWidth={2} /></IconBtn>
            <IconBtn>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            </IconBtn>
            <button className="press mono inline-flex h-7 items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-2.5 text-[11px] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)]">
              <Radio size={10} strokeWidth={2} className="text-[var(--fg-dim)]" />
              last 15m
              <ChevronDown size={10} strokeWidth={2} className="text-[var(--fg-dim)]" />
            </button>
            <button className="press mono inline-flex h-7 items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-2.5 text-[11px] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)]">
              <Share2 size={10} strokeWidth={2} />
              Share
            </button>
            <button className="press mono inline-flex h-7 items-center gap-1.5 rounded-md bg-[var(--accent)]/14 px-2.5 text-[11px] font-medium text-[var(--accent)] outline-none hover:bg-[var(--accent)]/22">
              <Plus size={10} strokeWidth={2.4} />
              Save query
            </button>
          </div>
        </div>

        <div className="px-4 py-4">
          {/* SEARCH */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <label className="input-ring mono flex h-9 flex-1 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 text-[12.5px]">
              <Search size={12} strokeWidth={2} className="shrink-0 text-[var(--fg-dim)]" />
              <input
                type="text"
                placeholder="Search traces, spans, attributes…"
                className="mono w-full bg-transparent outline-none placeholder:text-[var(--fg-dim)]"
                defaultValue=""
              />
              <span className="mono inline-flex shrink-0 items-center gap-0.5 rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-1 py-[1px] text-[10px] text-[var(--fg-muted)]">
                <Command size={8} strokeWidth={2.5} />K
              </span>
            </label>
            <button className="press mono inline-flex h-9 items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-2.5 text-[11.5px] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)]">
              <SlidersHorizontal size={11} strokeWidth={2} />
              sort: recent
              <ChevronDown size={10} strokeWidth={2} className="text-[var(--fg-dim)]" />
            </button>
          </div>

          {/* FILTER CHIPS */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="mono inline-flex items-center gap-1.5 text-[10.5px] text-[var(--fg-dim)]">
              <Filter size={10} strokeWidth={2} />
              active filters
            </div>
            {[
              { k: 'service', v: 'checkout' },
              { k: 'status', v: 'error' },
              { k: 'duration', v: '>1000' },
            ].map((c) => (
              <span
                key={c.k}
                className="mono inline-flex items-center gap-1.5 rounded border border-[var(--border-strong)] bg-[var(--surface)] py-[2px] pl-1.5 pr-1 text-[11px]"
              >
                <span className="text-[var(--accent)]">{c.k}</span>
                <span className="text-[var(--fg-dim)]">:</span>
                <span className="text-[var(--foreground)]">{c.v}</span>
                <button className="press ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded text-[var(--fg-dim)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]">
                  <X size={9} strokeWidth={2} />
                </button>
              </span>
            ))}
            <button className="press mono inline-flex items-center gap-1 rounded border border-dashed border-[var(--border-strong)] py-[2px] pl-1.5 pr-2 text-[11px] text-[var(--fg-dim)] hover:border-[var(--fg-dim)] hover:text-[var(--foreground)]">
              <Plus size={10} strokeWidth={2} />
              add filter
            </button>
            <button className="mono ml-auto text-[10.5px] text-[var(--fg-dim)] hover:text-[var(--foreground)]">
              clear all
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: 'throughput', value: '14.2k', delta: '+2.1k', tone: 'accent' as const },
              { label: 'p50', value: '84ms', delta: '-4ms', tone: 'accent' as const },
              { label: 'p99', value: '2.10s', delta: '+1.3s', tone: 'err' as const },
              { label: 'error rate', value: '0.42%', delta: '+0.18%', tone: 'err' as const },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-2.5"
              >
                <div className="mono text-[9.5px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                  {s.label}
                </div>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="mono text-[22px] font-medium leading-none tracking-tight tabular-nums text-[var(--foreground)]">
                    {s.value}
                  </span>
                  <span
                    className={`mono text-[10.5px] tabular-nums ${
                      s.tone === 'err' ? 'text-[var(--error)]' : 'text-[var(--accent)]'
                    }`}
                  >
                    {s.delta}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CHART */}
          <div className="mt-4 rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                  Latency distribution
                </span>
                <span className="mono inline-flex h-4 items-center rounded-[3px] border border-[var(--border-strong)] bg-[var(--elevated)] px-1.5 text-[9.5px] text-[var(--fg-muted)]">
                  60 buckets · 15s each
                </span>
              </div>
              <div className="mono hidden items-center gap-3 text-[10px] text-[var(--fg-dim)] sm:flex">
                <Legend color="var(--accent)" label="ok" />
                <Legend color="var(--warning)" label="slow" />
                <Legend color="var(--error)" label="error" />
              </div>
            </div>
            <div className="relative px-4 py-4">
              <div
                className="mono pointer-events-none absolute left-3 top-4 flex flex-col justify-between text-[9px] text-[var(--fg-dim)]"
                style={{ height: chartH }}
              >
                <span>2.1s</span>
                <span>1.0s</span>
                <span>500ms</span>
                <span>0</span>
              </div>
              <div
                className="ml-10 flex items-end gap-[2px]"
                style={{ height: chartH }}
              >
                {LATENCY.map((v, i) => {
                  const h = Math.max(2, (v / max) * chartH)
                  const isErr = ERR_BUCKETS.has(i)
                  const isWarn = v > 500 && !isErr
                  const color = isErr
                    ? 'bg-[var(--error)]'
                    : isWarn
                      ? 'bg-[var(--warning)]'
                      : 'bg-[var(--accent)]'
                  const baseOp = isErr ? 0.95 : 0.7
                  return (
                    <div
                      key={i}
                      className={`flex-1 origin-bottom rounded-[2px] transition-opacity duration-150 hover:opacity-100 ${color}`}
                      style={
                        {
                          height: h,
                          animation: `bar-in-y 0.7s cubic-bezier(0.25,1,0.5,1) both`,
                          animationDelay: `${i * 12}ms`,
                          ['--bar-opacity' as string]: baseOp,
                          opacity: baseOp,
                        } as React.CSSProperties
                      }
                      title={`bucket ${i} · ${v}ms`}
                    />
                  )
                })}
              </div>
              <div className="mono ml-10 mt-2 flex justify-between text-[9px] text-[var(--fg-dim)]">
                <span>15m ago</span>
                <span>10m</span>
                <span>5m</span>
                <span>now</span>
              </div>
            </div>
          </div>

          {/* TABLE + LIVE TAIL */}
          <div className="mt-4 grid gap-3 lg:grid-cols-[1.55fr_1fr]">
            <div className="overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
              <div className="border-b border-[var(--border)] px-4 py-2.5">
                <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                  Recent traces
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="mono border-b border-[var(--border)] text-[9.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                      <th className="px-4 py-1.5 text-left font-normal">trace</th>
                      <th className="px-2 py-1.5 text-left font-normal">route</th>
                      <th className="px-2 py-1.5 text-right font-normal">dur</th>
                      <th className="px-2 py-1.5 text-right font-normal">spans</th>
                      <th className="px-2 py-1.5 text-left font-normal">status</th>
                      <th className="px-4 py-1.5 text-right font-normal">at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRACES.map((t) => (
                      <tr
                        key={t.id}
                        className="mono whitespace-nowrap border-b border-[var(--border)] text-[11.5px] transition-colors duration-150 last:border-0 hover:bg-[var(--surface-2)]"
                      >
                        <td className="px-4 py-1">
                          <span className="flex items-center gap-1.5 text-[var(--foreground)]">
                            <span className="text-[var(--fg-dim)]">◆</span>
                            {t.id}
                          </span>
                        </td>
                        <td className="px-2 py-1">
                          <span className="text-[var(--fg-muted)]">{t.service}</span>
                          <span className="text-[var(--fg-dim)]"> · </span>
                          <span
                            className={
                              t.method === 'GET'
                                ? 'text-[var(--accent)]'
                                : t.method === 'POST'
                                  ? 'text-[#e5c07b]'
                                  : 'text-[var(--error)]'
                            }
                          >
                            {t.method}
                          </span>{' '}
                          <span className="text-[var(--fg-muted)]">{t.route}</span>
                        </td>
                        <td className="px-2 py-1 text-right tabular-nums">
                          <span
                            className={
                              t.duration > 1000
                                ? 'text-[var(--error)]'
                                : t.duration > 300
                                  ? 'text-[var(--warning)]'
                                  : 'text-[var(--fg-muted)]'
                            }
                          >
                            {t.duration < 1000
                              ? `${t.duration}ms`
                              : `${(t.duration / 1000).toFixed(2)}s`}
                          </span>
                        </td>
                        <td className="px-2 py-1 text-right tabular-nums text-[var(--fg-dim)]">
                          {t.spans}
                        </td>
                        <td className="px-2 py-1">
                          {t.status === 'err' ? (
                            <StatusPill tone="err">error</StatusPill>
                          ) : t.status === 'warn' ? (
                            <StatusPill tone="warn">slow</StatusPill>
                          ) : (
                            <StatusPill tone="ok">ok</StatusPill>
                          )}
                        </td>
                        <td className="px-4 py-1 text-right text-[var(--fg-dim)]">
                          {t.at}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mono flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[10.5px] text-[var(--fg-dim)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  streaming · 6 of 1,284
                </span>
                <span>page 1 / 214</span>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--surface)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  </span>
                  <span className="mono text-[10.5px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                    Live tail
                  </span>
                </div>
                <button className="mono text-[10.5px] text-[var(--fg-dim)] hover:text-[var(--foreground)]">
                  pause
                </button>
              </div>
              <div className="mono flex-1 overflow-y-auto px-4 py-2.5 text-[10.5px] leading-[1.7]">
                {TAIL_LOG.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-2"
                    style={{
                      animation: `fade-up 0.45s cubic-bezier(0.25,1,0.5,1) both`,
                      animationDelay: `${i * 50}ms`,
                    }}
                  >
                    <span className="text-[var(--fg-dim)]">{line.t}</span>
                    <span
                      className={
                        line.tone === 'err'
                          ? 'text-[var(--error)]'
                          : line.tone === 'warn'
                            ? 'text-[var(--warning)]'
                            : 'text-[var(--fg-dim)]'
                      }
                    >
                      {line.tag}
                    </span>
                    <span className="truncate text-[var(--fg-muted)]">{line.msg}</span>
                  </div>
                ))}
              </div>
              <div className="mono flex items-center justify-between border-t border-[var(--border)] px-4 py-2 text-[10.5px] text-[var(--fg-dim)]">
                <button className="press mono inline-flex items-center gap-1 hover:text-[var(--foreground)]">
                  <Pause size={10} strokeWidth={2} />
                  pause stream
                </button>
                <span>812 ev/sec</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="press inline-flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)]">
      {children}
    </button>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="h-1.5 w-1.5 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  )
}

function StatusPill({
  tone,
  children,
}: {
  tone: 'ok' | 'warn' | 'err'
  children: React.ReactNode
}) {
  const cls =
    tone === 'err'
      ? 'border-[var(--error)]/35 bg-[var(--error)]/10 text-[var(--error)]'
      : tone === 'warn'
        ? 'border-[var(--warning)]/35 bg-[var(--warning)]/10 text-[var(--warning)]'
        : 'border-[var(--border-strong)] bg-[var(--elevated)] text-[var(--fg-muted)]'
  return (
    <span
      className={`mono inline-flex h-4 items-center rounded-[3px] border px-1.5 text-[9.5px] uppercase tracking-[0.08em] ${cls}`}
    >
      {children}
    </span>
  )
}
