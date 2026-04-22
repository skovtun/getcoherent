'use client'

import Link from 'next/link'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Copy,
  Menu,
  Moon,
  Package,
  ShieldCheck,
  Sun,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Container } from '@/components/site/Container'
import { VerticalStripes } from '@/components/site/VerticalStripes'
import { AmbientOrbs } from '@/components/site/AmbientOrbs'
import { HeroShader } from '@/components/site/HeroShader'
import { Reveal, Stagger, StaggerItem } from '@/components/site/Reveal'
import { CountUp } from '@/components/site/CountUp'
import { SectionLabel } from '@/components/site/SectionLabel'
import { SiteBadge } from '@/components/site/Badge'
import { Logo, CoherentMark } from '@/components/site/Logo'
import { DesignSystemCard } from '@/components/site/DesignSystemCard'
import { HeroPreview } from '@/components/site/HeroPreview'
import { VersionBadge } from '@/components/site/VersionBadge'

const INSTALL = 'npm i -g @getcoherent/cli'

function ThemeToggle() {
  const [dark, setDark] = useState(true)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="press inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)]"
    >
      {dark ? <Sun size={13} strokeWidth={2} /> : <Moon size={13} strokeWidth={2} />}
    </button>
  )
}

function CopyChip({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }
  return (
    <button
      onClick={copy}
      className="press mono inline-flex items-center gap-1.5 rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-2 py-1 text-[11px] text-[var(--fg-muted)] outline-none hover:border-[var(--fg-dim)] hover:text-[var(--foreground)]"
      aria-label="copy"
    >
      {copied ? (
        <>
          <Check size={11} strokeWidth={2.25} className="text-[var(--accent)]" />
          copied
        </>
      ) : (
        <>
          <Copy size={11} strokeWidth={2} />
          copy
        </>
      )}
    </button>
  )
}

const MOBILE_NAV_LINKS = [
  { href: '#what', label: 'What it is' },
  { href: '#design-system', label: 'Design System' },
  { href: '#control', label: 'Full control' },
  { href: '#atmospheres', label: 'Atmospheres' },
  { href: '#faq', label: 'FAQ' },
  { href: '#pricing', label: 'Pricing' },
]

export default function LandingPage() {
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const fade = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.25, 1, 0.5, 1] as const },
  })

  return (
    <>
      <VerticalStripes />

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo size={26} />

          <nav className="hidden items-center gap-6 text-[13px] text-[var(--fg-muted)] md:flex">
            <Link
              href="#what"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              What it is
            </Link>
            <Link
              href="#design-system"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Design System
            </Link>
            <Link
              href="#control"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Full control
            </Link>
            <Link
              href="#atmospheres"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Atmospheres
            </Link>
            <Link
              href="#faq"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              FAQ
            </Link>
            <Link
              href="#pricing"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="https://github.com/skovtun/coherent-design-method"
              className="press mono hidden h-8 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-3 text-[12px] text-[var(--foreground)] outline-none hover:border-[var(--accent-dim)] hover:text-[var(--accent)] md:inline-flex"
            >
              <Package size={12} strokeWidth={2} />
              GitHub
            </Link>
            <Link
              href="#install"
              className="btn-primary-site mono inline-flex h-8 items-center gap-2 rounded-md px-3 text-[12px]"
            >
              Get Started
              <ArrowRight size={12} strokeWidth={2} />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="press inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)] md:hidden"
            >
              {menuOpen ? <X size={14} strokeWidth={2} /> : <Menu size={14} strokeWidth={2} />}
            </button>
          </div>
        </Container>

        {/* MOBILE MENU */}
        <div
          className={`overflow-hidden border-t border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md transition-[max-height,opacity] duration-[220ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:hidden ${
            menuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!menuOpen}
        >
          <Container className="flex flex-col gap-1 py-3">
            {MOBILE_NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="mono flex items-center justify-between rounded-md px-3 py-2.5 text-[13px] text-[var(--fg-muted)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]"
              >
                {l.label}
                <ArrowRight size={12} strokeWidth={2} className="text-[var(--fg-dim)]" />
              </Link>
            ))}
            <Link
              href="https://github.com/skovtun/coherent-design-method"
              onClick={() => setMenuOpen(false)}
              className="mono mt-1 flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-3 py-2.5 text-[13px] text-[var(--foreground)] hover:border-[var(--accent-dim)] hover:text-[var(--accent)]"
            >
              <Package size={13} strokeWidth={2} />
              GitHub
            </Link>
          </Container>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-[1] overflow-hidden border-b border-[var(--border)]">
        <HeroShader />
        <AmbientOrbs />
        <div className="noise" aria-hidden />

        <Container className="relative pt-20 pb-16 lg:pt-24 lg:pb-20">
          {/* TEXT — centered, stacked, wider */}
          <div className="mx-auto max-w-5xl text-center">
            <motion.div {...fade(0)} className="flex items-center justify-center gap-2">
              <VersionBadge />
            </motion.div>

            <motion.h1
              {...fade(1)}
              className="mono mt-6 text-[38px] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--foreground)] md:text-[52px] lg:text-[60px]"
            >
              Design Interactive UI that&apos;s
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] via-[color-mix(in_oklab,var(--accent),white_25%)] to-[#61afef] bg-clip-text text-transparent">
                Consistent Everywhere.
              </span>
            </motion.h1>

            <motion.p
              {...fade(2)}
              className="mx-auto mt-6 max-w-[620px] text-[15.5px] leading-[1.6] text-[var(--fg-muted)]"
            >
              Design interactive multi-page UI instead of static mockups. The
              Design System comes with it — typography, colors, components,
              everything editable. Change one thing, updates cascade across
              every page.
            </motion.p>

            <motion.div
              {...fade(3)}
              className="mt-7 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="#install"
                className="btn-primary-site mono inline-flex h-11 items-center gap-2 rounded-md px-5 text-[13.5px]"
              >
                Start Designing
                <ArrowRight size={14} strokeWidth={2} />
              </Link>
              <Link
                href="/design-system"
                className="press mono inline-flex h-11 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-5 text-[13.5px] text-[var(--foreground)] outline-none hover:border-[var(--fg-dim)]"
              >
                <BookOpen size={14} strokeWidth={2} />
                See the Design System
              </Link>
            </motion.div>

            <motion.div
              {...fade(4)}
              className="mono mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] text-[var(--fg-dim)]"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                MIT · open source
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={11} strokeWidth={1.75} />
                23 design principles baked in
              </span>
              <span>·</span>
              <span>Next.js 15 output</span>
              <span>·</span>
              <span>bring your own Claude / GPT key</span>
            </motion.div>
          </div>

          {/* PREVIEW — full container width, below text */}
          <div className="mt-12 lg:mt-14">
            <HeroPreview />
          </div>
        </Container>
      </section>

      {/* LOGOS MARQUEE */}
      <section className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-12">
          <div className="mono mb-6 text-center text-[11px] uppercase tracking-[0.2em] text-[var(--fg-dim)]">
            Built for teams shipping with AI editors
          </div>
          <div className="marquee-mask overflow-hidden">
            <div className="marquee">
              {[
                ...['Cursor', 'Claude Code', 'Windsurf', 'Zed', 'v0.dev', 'Lovable'],
                ...['Cursor', 'Claude Code', 'Windsurf', 'Zed', 'v0.dev', 'Lovable'],
              ].map((name, i) => (
                <div
                  key={i}
                  className="mono flex min-w-[180px] items-center justify-center gap-2 px-6 text-[14px] tracking-tight text-[var(--fg-muted)] opacity-70 transition-opacity hover:text-[var(--foreground)] hover:opacity-100"
                >
                  <span className="text-[var(--accent)]">◆</span>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* WHAT IS COHERENT */}
      <section id="what" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-24">
          <Reveal>
            <SectionLabel index="01">What is Coherent</SectionLabel>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal delay={0.05}>
              <h2 className="mono text-[32px] font-medium leading-[1.12] tracking-[-0.02em] lg:text-[42px]">
                One plan.
                <br />
                Many pages.
                <br />
                One Design System.
              </h2>
              <p className="mt-6 max-w-md text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Coherent is an AI design tool for interactive multi-page UI.
                You describe what you want. It plans the pages, generates them
                interconnected, and — this is the part no one else does —
                builds your Design System alongside.
              </p>
              <p className="mt-4 max-w-md text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Output is a clean Next.js + Tailwind + shadcn/ui project. Show
                it to stakeholders. Hand it to devs. Or ship it as your real
                frontend and wire a backend later. Your code, your design
                system, your atmosphere, no lock-in.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-5">
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    Static mockups / single-page AI tools
                  </div>
                  <ul className="mono mt-3 space-y-2.5 text-[13px] text-[var(--fg-muted)]">
                    <li className="flex items-start gap-2">
                      <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                      <span>every page drawn from scratch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                      <span>header differs between pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                      <span>no shared tokens, no cascade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                      <span>Figma prototype with fake interactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                      <span>hand off to dev = start over in code</span>
                    </li>
                  </ul>
                </div>
                <div className="card-lift rounded-lg border border-[var(--accent-dim)] bg-[color-mix(in_oklab,var(--surface),var(--accent)_4%)] p-5">
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
                    Coherent
                  </div>
                  <ul className="mono mt-3 space-y-2.5 text-[13px] text-[var(--fg-muted)]">
                    <li className="flex items-start gap-2">
                      <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                      <span>one plan, many interconnected pages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                      <span>shared components with stable IDs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                      <span>Design System grows alongside the UI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                      <span>real React — router, state, animations work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                      <span>hand off to dev = they get the DS too</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DESIGN SYSTEM PARALLEL */}
      <section id="design-system" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="02">Design System, parallel</SectionLabel>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal delay={0.05}>
              <h2 className="mono text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
                As you describe
                <br />
                the UI, a Design System
                <br />
                <span className="text-[var(--accent)]">builds itself.</span>
              </h2>
              <p className="mt-6 max-w-md text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Every component you use gets registered with a stable ID. Every
                token you touch — a color, a font, a spacing step — lands in
                <span className="mono text-[var(--foreground)]"> design-system.config.ts</span>.
                By the time the third page is generated, you have a living DS
                you can open, audit, and edit.
              </p>
              <p className="mt-4 max-w-md text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                This is the thing no one else does. v0 gives you a page. Figma
                gives you a mockup. Coherent gives you a page and a Design
                System.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-5">
                  <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    pages generated
                  </div>
                  <ul className="mono mt-3 space-y-1.5 text-[12.5px]">
                    {[
                      '/ · landing',
                      '/pricing',
                      '/dashboard',
                      '/dashboard/[id]',
                      '/settings',
                    ].map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-[var(--foreground)]"
                      >
                        <Check size={11} strokeWidth={2.25} className="text-[var(--accent)]" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-5">
                  <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    components · stable IDs
                  </div>
                  <ul className="mono mt-3 space-y-1.5 text-[12.5px]">
                    {[
                      { id: 'CID-001', name: 'SiteNav', uses: 5 },
                      { id: 'CID-002', name: 'Button', uses: 12 },
                      { id: 'CID-003', name: 'StatCard', uses: 4 },
                      { id: 'CID-004', name: 'FilterBar', uses: 3 },
                      { id: 'CID-005', name: 'EmptyState', uses: 2 },
                    ].map((c) => (
                      <li key={c.id} className="flex items-center gap-2">
                        <span className="text-[var(--accent)]">{c.id}</span>
                        <span className="text-[var(--foreground)]">
                          {c.name}
                        </span>
                        <span className="text-[var(--fg-dim)]">
                          · used in {c.uses}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-5">
                  <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    tokens · design-system.config.ts
                  </div>
                  <div className="mono mt-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[12px] md:grid-cols-3">
                    {[
                      ['--accent', '#3ecf8e'],
                      ['--bg', '#0a0a0a'],
                      ['--fg', '#ededed'],
                      ['--radius-md', '6px'],
                      ['--radius-lg', '8px'],
                      ['--font-body', 'Geist Sans'],
                      ['--font-mono', 'Geist Mono'],
                      ['--space-base', '4px'],
                      ['--ease-out', 'cubic-bezier(.25,1,.5,1)'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between gap-2">
                        <span className="text-[var(--accent)]">{k}</span>
                        <span className="truncate text-[var(--foreground)]">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FULL CONTROL / CASCADE */}
      <section id="control" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="03">Full control</SectionLabel>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal delay={0.05}>
              <h2 className="mono text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
                Change one thing.
                <br />
                <span className="text-[var(--accent)]">It updates everywhere.</span>
              </h2>
              <p className="mt-6 max-w-md text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Edit a token in plain English —{' '}
                <span className="mono text-[var(--foreground)]">
                  &quot;make the accent softer, more teal&quot;
                </span>
                . Or open{' '}
                <span className="mono text-[var(--foreground)]">
                  design-system.config.ts
                </span>{' '}
                and change the hex. Either way, every page that uses that
                token updates. Same for components: edit{' '}
                <span className="mono text-[var(--foreground)]">Button</span>{' '}
                once, every instance on every page follows.
              </p>
              <ul className="mono mt-6 space-y-2.5 text-[13px] text-[var(--fg-muted)]">
                <li className="flex items-start gap-2.5">
                  <ArrowRight size={13} strokeWidth={2} className="mt-[3px] shrink-0 text-[var(--accent)]" />
                  Typography, colors, spacing, radius, motion — all tokens
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight size={13} strokeWidth={2} className="mt-[3px] shrink-0 text-[var(--accent)]" />
                  Components edited once, cascade across every page
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight size={13} strokeWidth={2} className="mt-[3px] shrink-0 text-[var(--accent)]" />
                  Describe the change in English, or write the code — your call
                </li>
                <li className="flex items-start gap-2.5">
                  <ArrowRight size={13} strokeWidth={2} className="mt-[3px] shrink-0 text-[var(--accent)]" />
                  The DS is a file, not a black box — you own it
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-3 py-2">
                  <span className="mono text-[12px] text-[var(--fg-muted)]">
                    cascade · one edit
                  </span>
                  <span className="mono text-[10.5px] text-[var(--accent)]">
                    5 files updated
                  </span>
                </div>
                <div className="p-5">
                  <div className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    you
                  </div>
                  <div className="mono mt-1 rounded border border-[var(--border)] bg-[var(--elevated)] px-3 py-2 text-[13px] text-[var(--foreground)]">
                    <span className="text-[var(--accent)]">edit</span>{' '}
                    --radius-md: <span className="text-[var(--destructive)] line-through">6px</span>{' '}
                    → <span className="text-[var(--accent)]">12px</span>
                  </div>

                  <div className="mono mt-5 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    coherent, automatically
                  </div>
                  <div className="mono mt-2 space-y-1 text-[12.5px]">
                    {[
                      'components/ui/Button.tsx',
                      'components/ui/Card.tsx',
                      'components/ui/Input.tsx',
                      'components/shared/StatCard.tsx',
                      'components/shared/FilterBar.tsx',
                    ].map((f, i) => (
                      <div
                        key={f}
                        className="flex items-center gap-2 text-[var(--fg-muted)]"
                        style={{
                          animation: 'fade-up 0.4s cubic-bezier(0.25,1,0.5,1) both',
                          animationDelay: `${200 + i * 80}ms`,
                        }}
                      >
                        <Check size={11} strokeWidth={2.25} className="text-[var(--accent)]" />
                        <span className="truncate">{f}</span>
                        <span className="ml-auto text-[var(--fg-dim)]">updated</span>
                      </div>
                    ))}
                  </div>

                  <div className="mono mt-5 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    result
                  </div>
                  <div className="mono mt-2 rounded border border-[var(--accent-dim)] bg-[color-mix(in_oklab,var(--surface),var(--accent)_6%)] px-3 py-2 text-[12.5px] text-[var(--foreground)]">
                    every rounded-md surface on all 5 pages · 12px radius ·{' '}
                    <span className="text-[var(--accent)]">0 hand edits</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ATMOSPHERES */}
      <section id="atmospheres" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="04">Atmospheres (optional)</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
              Start from a vibe.
              <br />
              <span className="text-[var(--fg-dim)]">Customize everything. Or build your own.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
              Atmospheres are starter kits — typography, color, spacing, motion,
              layout, mood bundled together — so you don&apos;t start from a
              blank canvas. Pick one, see the first page, like the direction?
              Customize from there. Don&apos;t like the direction? Drop it and
              build your own Design System from scratch. Atmospheres are the
              head start, not the ceiling.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {ATMOSPHERES.map((a) => (
              <StaggerItem key={a.name}>
                <div className="card-lift flex h-full flex-col gap-4 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-5">
                  <div
                    className="h-28 rounded-md border border-[var(--border)]"
                    style={{ background: a.preview }}
                  />
                  <div>
                    <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                      atmosphere
                    </div>
                    <div className="mono mt-1 text-[16px] font-medium text-[var(--foreground)]">
                      {a.name}
                    </div>
                  </div>
                  <p className="text-[13px] leading-[1.55] text-[var(--fg-muted)]">
                    {a.mood}
                  </p>
                  <div className="mono text-[11px] text-[var(--fg-dim)]">
                    <span className="text-[var(--foreground)]">Fit:</span> {a.fit}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <div className="mono mt-10 rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-5 text-[12.5px] leading-[1.7] text-[var(--fg-muted)]">
              <span className="text-[var(--foreground)]">Your own vibe?</span>{' '}
              Skip the starter kits. Define your atmosphere in{' '}
              <span className="text-[var(--accent)]">design-system.config.ts</span>{' '}
              — your fonts, your palette, your rhythm. Coherent generates
              every page against yours. Save it, share it, it becomes the 4th atmosphere.
            </div>
          </Reveal>
        </Container>
      </section>

      {/* NUMBERS */}
      <section className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-24">
          <Reveal>
            <SectionLabel index="05">Numbers</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 grid grid-cols-2 divide-x divide-[var(--border)] border border-[var(--border-strong)] bg-[var(--surface)] md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="px-5 py-5">
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    {s.label}
                  </div>
                  <div className="mono mt-1.5 text-[26px] font-medium tabular-nums text-[var(--foreground)]">
                    <CountUp
                      value={s.value}
                      suffix={s.suffix}
                      format={s.format}
                    />
                  </div>
                  <div className="mono mt-1 text-[11.5px] text-[var(--fg-dim)]">
                    {s.note}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* WORKFLOW */}
      <section className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="06">Under the hood</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-[14px] leading-[1.65] text-[var(--fg-muted)]">
              Working with design is done in plain English. But if you want to
              see the engine — CLI commands, config file shape — here it is.
              You never need to type any of this to use Coherent.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
            <Reveal delay={0.08}>
              <h2 className="mono text-[30px] font-medium leading-[1.12] tracking-[-0.02em]">
                CLI-first for devs.
                <br />
                English-first for designers.
              </h2>
              <ul className="mono mt-8 space-y-3 text-[13px] text-[var(--fg-muted)]">
                {WORKFLOW.map((w) => (
                  <li key={w.cmd} className="flex items-start gap-3">
                    <span className="text-[var(--accent)]">
                      {w.step.padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="text-[var(--foreground)]">{w.cmd}</span>
                      <span className="text-[var(--fg-dim)]"> — </span>
                      <span>{w.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-md text-[13.5px] leading-[1.65] text-[var(--fg-muted)]">
                Output is a clean Next.js project. Standard React you can deploy
                to Vercel, Netlify, Fly, self-host.{' '}
                <span className="text-[var(--foreground)]">No lock-in.</span>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-3 py-2">
                  <span className="mono text-[12px] text-[var(--fg-muted)]">
                    design-system.config.ts
                  </span>
                  <span className="mono text-[11px] text-[var(--fg-dim)]">
                    ts
                  </span>
                </div>
                <div className="mono overflow-x-auto px-4 py-4 text-[13px] leading-[1.7]">
                  <div className="text-[var(--fg-dim)]">
                    // picked once · applied everywhere
                  </div>
                  <div>
                    <span className="text-[#c678dd]">export default</span>{' '}
                    defineAtmosphere({'{'}
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">id</span>:{' '}
                    <span className="text-[#98c379]">&apos;console&apos;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">typography</span>:{' '}
                    {'{'}
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;heading:{' '}
                    <span className="text-[#98c379]">&apos;Geist Mono&apos;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;body:{' '}
                    <span className="text-[#98c379]">&apos;Geist Sans&apos;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;&nbsp;scale: <span className="text-[#e5c07b]">1.2</span>,
                  </div>
                  <div>&nbsp;&nbsp;{'}'},</div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">colors</span>:{' '}
                    {'{'} accent:{' '}
                    <span className="text-[var(--accent)]">
                      &apos;#3ecf8e&apos;
                    </span>
                    , bg: <span className="text-[#98c379]">&apos;dark&apos;</span>{' '}
                    {'}'},
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">spacing</span>:{' '}
                    <span className="text-[#98c379]">&apos;tight&apos;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">motion</span>:{' '}
                    <span className="text-[#98c379]">&apos;ease-out-quart&apos;</span>,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">layout</span>:{' '}
                    <span className="text-[#98c379]">
                      &apos;grid-dense&apos;
                    </span>
                    ,
                  </div>
                  <div>
                    &nbsp;&nbsp;<span className="text-[#61afef]">mood</span>:{' '}
                    <span className="text-[#98c379]">
                      &apos;tools for people who read docs&apos;
                    </span>
                    ,
                  </div>
                  <div>{'}'})</div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="07">Questions</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[32px] font-medium leading-[1.12] tracking-[-0.02em] lg:text-[42px]">
              Honest answers.
              <br />
              <span className="text-[var(--fg-dim)]">No sales brochure.</span>
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-[var(--border)] border-y border-[var(--border-strong)]">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group py-5 transition-colors duration-[150ms] hover:bg-[var(--surface)]/50"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-1">
                  <h3 className="mono text-[15px] font-medium text-[var(--foreground)]">
                    {item.q}
                  </h3>
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="mt-1 shrink-0 text-[var(--fg-dim)] transition-transform duration-[200ms] group-open:rotate-180"
                  />
                </summary>
                <div className="mt-4 max-w-3xl px-1 text-[14px] leading-[1.7] text-[var(--fg-muted)]">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mono mt-10 flex flex-col items-start justify-between gap-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-5 text-[13px] text-[var(--fg-muted)] md:flex-row md:items-center">
              <span>
                Question not here? Open an issue on GitHub — response usually within 24h.
              </span>
              <Link
                href="https://github.com/skovtun/coherent-design-method/issues"
                className="press inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-3 py-1.5 text-[12px] text-[var(--foreground)] outline-none hover:border-[var(--fg-dim)]"
              >
                <Package size={12} strokeWidth={2} />
                Open issue
                <ArrowRight size={12} strokeWidth={2} />
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="08">Pricing</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
              Free. Open. MIT.
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
              Coherent is open source. No paid tier, no gated atmospheres, no
              usage limits. You bring your own Claude or GPT API key. Typical
              page generation cost:{' '}
              <span className="mono text-[var(--foreground)]">$0.01–$0.03</span>.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 md:grid-cols-2" gap={0.08}>
            {PRICING.map((p) => (
              <StaggerItem key={p.name}>
                <div
                  className={`card-lift relative flex h-full flex-col gap-6 rounded-lg border p-6 ${
                    p.featured
                      ? 'border-[var(--accent-dim)] bg-[color-mix(in_oklab,var(--surface),var(--accent)_4%)]'
                      : 'border-[var(--border-strong)] bg-[var(--surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="mono text-[13px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                      {p.name}
                    </span>
                    {p.featured && (
                      <SiteBadge tone="accent">recommended</SiteBadge>
                    )}
                  </div>
                  <div>
                    <div className="mono flex items-baseline gap-1 text-[var(--foreground)]">
                      <span className="text-[36px] font-medium tabular-nums">
                        {p.price}
                      </span>
                      <span className="text-[13px] text-[var(--fg-dim)]">
                        {p.period}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-[1.5] text-[var(--fg-muted)]">
                      {p.tagline}
                    </p>
                  </div>
                  <ul className="mono space-y-2.5 text-[13px] text-[var(--fg-muted)]">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <ArrowRight
                          size={12}
                          strokeWidth={2}
                          className="mt-[4px] shrink-0 text-[var(--accent)]"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.href}
                    className={
                      p.featured
                        ? 'btn-primary-site mono inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-[13px]'
                        : 'press mono inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[13px] text-[var(--foreground)] outline-none hover:border-[var(--fg-dim)] hover:bg-[var(--surface-2)]'
                    }
                  >
                    {p.cta}
                    <ArrowRight size={13} strokeWidth={2} />
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section id="install" className="relative z-[1] overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
        <AmbientOrbs />
        <Container className="relative py-28 text-center">
          <Reveal>
            <h2 className="mono mx-auto max-w-3xl text-[38px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[52px]">
              One command. One atmosphere.
              <br />
              <span className="text-[var(--fg-dim)]">Whole app in hours.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mono mx-auto mt-10 inline-flex items-center gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-3 text-[13px] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.6)]">
              <span className="text-[var(--accent)]">$</span>
              <span className="text-[var(--foreground)]">{INSTALL}</span>
              <CopyChip text={INSTALL} />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mono mt-6 text-[11.5px] text-[var(--fg-dim)]">
              or install per-project ·{' '}
              <span className="text-[var(--fg-muted)]">
                npm i -D @getcoherent/cli
              </span>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="relative z-[1] border-t border-[var(--border)] bg-[var(--background)]">
        <Container className="py-14">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            <div>
              <Logo size={26} />
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-[var(--fg-muted)]">
                Once designed. Consistent UI everywhere.
                <br />
                AI design tool for interactive multi-page UI. The Design System
                comes with it.
              </p>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="mono mb-3 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  {col.title}
                </div>
                <ul className="space-y-2 text-[13px]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="link-sweep text-[var(--fg-muted)] transition-colors hover:text-[var(--foreground)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mono mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--border)] pt-6 text-[11.5px] text-[var(--fg-dim)] md:flex-row md:items-center">
            <div>© 2026 Coherent Design Method · MIT · v0.7.24</div>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                <span>atmosphere engine shipping</span>
              </span>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}

const ATMOSPHERES = [
  {
    name: 'Console',
    mood: 'Dev-tool dark. Mono as accent. Electric green. Tight spacing. For tools people will read the docs of.',
    fit: 'Linear, Modal, Supabase, Resend, Neon, Railway',
    preview:
      'radial-gradient(90% 70% at 30% 0%, rgba(62,207,142,0.4), transparent 60%), radial-gradient(60% 40% at 80% 20%, rgba(97,175,239,0.25), transparent 70%), #0a0a0a',
  },
  {
    name: 'Warm',
    mood: 'Cream backgrounds, humanist sans, rounded corners, slow motion. For friendly software that treats users like people.',
    fit: 'Mercury, Basecamp, Hey, Arc',
    preview:
      'radial-gradient(80% 60% at 20% 0%, rgba(245,166,35,0.35), transparent 65%), radial-gradient(60% 40% at 80% 30%, rgba(200,90,90,0.25), transparent 70%), #fdfaf4',
  },
  {
    name: 'Editorial',
    mood: 'Magazine-like. Serif headlines. Narrow measures. Generous whitespace. For content-first products that want to be read.',
    fit: 'Stripe Press, Every, Are.na, Pudding',
    preview:
      'radial-gradient(60% 50% at 50% 0%, rgba(139,58,43,0.14), transparent 60%), radial-gradient(40% 30% at 80% 50%, rgba(139,58,43,0.08), transparent 70%), #fdfbf7',
  },
]

const STATS: {
  label: string
  value: number
  suffix: string
  format: 'commas' | 'int' | 'decimal2'
  note: string
}[] = [
  {
    label: 'enforced rules',
    value: 23,
    suffix: '',
    format: 'int',
    note: 'F11 + F12 landed v0.7.24',
  },
  {
    label: 'tests passing',
    value: 1068,
    suffix: '',
    format: 'commas',
    note: 'green every ship',
  },
  {
    label: 'wiki entries indexed',
    value: 64,
    suffix: '',
    format: 'int',
    note: 'retrieval precision@1 100%',
  },
  {
    label: 'version',
    value: 724,
    suffix: '',
    format: 'int',
    note: 'v0.7.24 · MIT',
  },
]

const WORKFLOW = [
  {
    step: '1',
    cmd: 'coherent init',
    body: 'pick atmosphere + scaffold Next.js project with design-system.config.ts',
  },
  {
    step: '2',
    cmd: 'coherent chat',
    body: 'describe what you want — plan, generate, validate, auto-fix',
  },
  {
    step: '3',
    cmd: 'coherent check',
    body: 'cross-page consistency, a11y, anti-patterns, empty-states',
  },
  {
    step: '4',
    cmd: 'coherent wiki reflect',
    body: 'platform memory loop — decisions, patterns, rules persist across sessions',
  },
  {
    step: '5',
    cmd: 'next dev',
    body: 'standard Next.js. standard Tailwind. standard shadcn/ui. Your code.',
  },
]

const FAQ = [
  {
    q: 'Do I need to know code?',
    a: 'No. You describe what you want in plain English — pages, atmosphere, tweaks — and Coherent writes the code. Everything you get (components, tokens, pages) is editable by describing the change you want. That said, the output is standard code, so if you or your dev wants to open a file and edit it directly, everything is transparent and readable. English-first, code-always-available.',
  },
  {
    q: 'Is it a replacement for Figma?',
    a: 'Not exactly. Figma is a design tool; Coherent is a design-to-UI tool. If you design systems and mockups, Figma still wins. If you need a clickable multi-page demo that behaves like real software — nav works, states toggle, forms accept input, animations land — Coherent gives you that. Many designers use both: Figma for exploration, Coherent for the interactive version they ship.',
  },
  {
    q: 'What is an atmosphere and do I have to use one?',
    a: 'Atmospheres are starter kits — a complete visual vocabulary (typography, color, spacing, motion, layout, mood) bundled together so you don\'t start from a blank canvas. You can pick Console, Warm, Editorial — or skip them entirely and define your own design-system.config.ts. Atmospheres are convenience, never a ceiling. Your own fonts, your own palette, your own rhythm — all supported from day one.',
  },
  {
    q: 'Can I edit a single component across every page?',
    a: 'Yes — this is the core differentiator. Every shared component has a stable ID (CID-XXX). Edit it once, every page that uses it updates automatically. Same for tokens: change --accent from emerald to coral, every button, card, and link using the accent follows. The cascade is not magic — it\'s how React imports work — but Coherent\'s component registry makes the "where is this used" question explicit.',
  },
  {
    q: 'What about my brand — my fonts, colors, spacing?',
    a: 'Full control. design-system.config.ts is a plain file you can edit: typography pair, color palette, radius scale, spacing base, motion easing — all yours to change. Coherent uses whatever you set. If you have a Figma team library, feed Coherent your tokens and it generates against them. If you have a Brand Book PDF, describe the rules in plain English and Coherent translates.',
  },
  {
    q: 'What does the output actually look like? What do I ship?',
    a: 'A clean Next.js 15 project with Tailwind CSS and shadcn/ui components. Standard React, standard TypeScript, no Coherent runtime dependency. You can: (1) show it to stakeholders as a clickable demo, (2) hand it to a developer for backend integration, or (3) plug a backend in yourself and ship it as real production frontend. Deploy to Vercel, Netlify, Fly, Cloudflare, or self-host. Your code, your choice.',
  },
  {
    q: 'How is this different from v0, Lovable, or Bolt?',
    a: 'Those tools nail a single page. Ask for a second page and you get a different header, different buttons, different spacing. Coherent targets the step after: multi-page consistency plus a Design System that grows alongside. You still use v0 or Lovable for quick single-page explorations. You use Coherent when you need a coherent multi-page product (and a DS you own).',
  },
  {
    q: 'What LLM does it use? How much does it cost?',
    a: 'Works with Anthropic Claude (recommended — best results, especially with prompt caching) or OpenAI GPT-4. You bring your own API key — prompted once at setup. Typical cost: $0.01–0.03 per page. A 5-page app scaffold costs roughly $0.10. No subscription, no middleman, no platform fee.',
  },
  {
    q: 'Is it production-ready?',
    a: 'v0.7.24 today is stable for prototypes, internal tools, stakeholder demos, and dev handoff. 1,068 tests passing, 23 design principles enforced, MIT licensed. For bet-the-company public product UI, treat the output as a strong starting point and do a human polish pass. For fast internal dashboards and handoffs, ship today.',
  },
]

const PRICING = [
  {
    name: 'Open source',
    price: '$0',
    period: '/ MIT',
    tagline:
      'Full CLI, all atmospheres, all validators. No gated features. You bring your LLM key.',
    features: [
      'Unlimited projects',
      'All 3 flagship atmospheres',
      '23 enforced rules + auto-fix',
      'Shared components registry',
      'Wiki memory loop',
      'Bring your own Claude / GPT key',
    ],
    cta: 'Install now',
    href: '#install',
    featured: false,
  },
  {
    name: 'Sponsor',
    price: '$—',
    period: '· your call',
    tagline:
      'Fund the atmosphere engine. Get your logo on the landing, priority on atmosphere requests, name in commit log.',
    features: [
      'Everything in OSS',
      'Priority atmosphere requests',
      'Logo on getcoherent.design',
      'Direct line to the maintainer',
      'Early access to 4th atmosphere',
      'GitHub Sponsors + OpenCollective',
    ],
    cta: 'Sponsor on GitHub',
    href: 'https://github.com/skovtun/coherent-design-method',
    featured: true,
  },
]

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [
      { label: 'Atmospheres', href: '#atmospheres' },
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: 'https://github.com/skovtun/coherent-design-method/blob/main/docs/CHANGELOG.md' },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Quickstart', href: 'https://github.com/skovtun/coherent-design-method#quickstart' },
      { label: 'Design system', href: '/design-system' },
      { label: 'GitHub', href: 'https://github.com/skovtun/coherent-design-method' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'RULES_MAP', href: 'https://github.com/skovtun/coherent-design-method/blob/main/docs/wiki/RULES_MAP.md' },
      { label: 'IDEAS_BACKLOG', href: 'https://github.com/skovtun/coherent-design-method/blob/main/docs/wiki/IDEAS_BACKLOG.md' },
      { label: 'ADRs', href: 'https://github.com/skovtun/coherent-design-method/tree/main/docs/wiki/ADR' },
    ],
  },
]
