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
  Plus,
  Sun,
  X,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Container } from '@/components/site/Container'
import { AmbientOrbs } from '@/components/site/AmbientOrbs'
import { HeroShader } from '@/components/site/HeroShader'
import { Reveal, Stagger, StaggerItem } from '@/components/site/Reveal'
import { SectionLabel } from '@/components/site/SectionLabel'
import { SiteBadge } from '@/components/site/Badge'
import { Logo } from '@/components/site/Logo'
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
  { href: '#problem', label: 'Problem' },
  { href: '#what', label: 'What is Coherent' },
  { href: '#how', label: 'How it works' },
  { href: '#atmospheres', label: 'Atmospheres' },
  { href: '#start', label: 'Getting started' },
  { href: '#faq', label: 'FAQ' },
]

export default function LandingPage() {
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const [cliVersion, setCliVersion] = useState('0.7.27')
  const currentYear = new Date().getFullYear()
  useEffect(() => {
    let active = true
    fetch('https://registry.npmjs.org/@getcoherent/cli/latest')
      .then((r) => r.json())
      .then((d: { version?: string }) => {
        if (active && d?.version) setCliVersion(d.version)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [])
  const fade = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.08 * i, ease: [0.25, 1, 0.5, 1] as const },
  })

  return (
    <>
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Logo size={26} />

          <nav className="hidden items-center gap-5 text-[13px] text-[var(--fg-muted)] md:flex">
            <Link
              href="#problem"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Problem
            </Link>
            <Link
              href="#what"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              What is Coherent
            </Link>
            <Link
              href="#how"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              How it works
            </Link>
            <Link
              href="#atmospheres"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Atmospheres
            </Link>
            <Link
              href="#start"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              Getting started
            </Link>
            <Link
              href="#faq"
              className="link-sweep transition-colors hover:text-[var(--foreground)]"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="https://github.com/skovtun/coherent-design-method"
              target="_blank"
              rel="noopener noreferrer"
              className="press mono hidden h-8 items-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] px-3 text-[12px] text-[var(--foreground)] outline-none hover:border-[var(--accent-dim)] hover:text-[var(--accent)] md:inline-flex"
            >
              <Package size={12} strokeWidth={2} />
              GitHub
            </Link>
            <Link
              href="#start"
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
              target="_blank"
              rel="noopener noreferrer"
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
                href="#start"
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
              className="mono mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[12px] text-[var(--fg-dim)]"
            >
              <span className="inline-flex items-baseline gap-1.5">
                <span className="text-[17px] font-medium tabular-nums text-[var(--foreground)]">
                  23
                </span>
                enforced rules
              </span>
              <span className="text-[var(--border-strong)]">/</span>
              <span className="inline-flex items-baseline gap-1.5">
                <span className="text-[17px] font-medium tabular-nums text-[var(--foreground)]">
                  1,068
                </span>
                tests passing
              </span>
              <span className="text-[var(--border-strong)]">/</span>
              <span className="inline-flex items-baseline gap-1.5">
                <span className="text-[17px] font-medium tabular-nums text-[var(--foreground)]">
                  5
                </span>
                atmospheres
              </span>
              <span className="text-[var(--border-strong)]">/</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                MIT · open source
              </span>
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
              {(() => {
                const editors = [
                  { name: 'VS Code', logo: '/editors/vscode.svg' },
                  { name: 'Cursor', logo: '/editors/cursor.svg' },
                  { name: 'Claude Code', logo: '/editors/claude-code.svg' },
                  { name: 'Windsurf', logo: '/editors/windsurf.svg' },
                  { name: 'Zed', logo: '/editors/zed.svg' },
                  { name: 'JetBrains', logo: '/editors/jetbrains.svg' },
                ]
                return [...editors, ...editors].map((editor, i) => (
                  <div
                    key={i}
                    className="mono flex min-w-[180px] items-center justify-center gap-2.5 px-6 text-[14px] tracking-tight text-[var(--fg-muted)] opacity-70 transition-opacity hover:text-[var(--foreground)] hover:opacity-100"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-4 w-4 shrink-0 bg-current"
                      style={{
                        WebkitMaskImage: `url(${editor.logo})`,
                        maskImage: `url(${editor.logo})`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                      }}
                    />
                    <span>{editor.name}</span>
                  </div>
                ))
              })()}
            </div>
          </div>
        </Container>
      </section>

      {/* [01] PROBLEM */}
      <section id="problem" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-24">
          <Reveal>
            <SectionLabel index="01">The problem</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
              You&apos;ve seen this before.
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
              You prompt a multi-page UI and the first page is great. The
              second has a different header. The third has different buttons.
              By page four you&apos;re spending more time fixing
              inconsistencies than shipping. The AI doesn&apos;t know what
              it built yesterday.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Reveal delay={0.1}>
              <div className="h-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-6">
                <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--destructive)]" />
                  Every AI tool today
                </div>
                <ul className="mono mt-4 space-y-2.5 text-[13px] text-[var(--fg-muted)]">
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                    <span>every page drawn from scratch</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                    <span>components drift between generations — no shared foundation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                    <span>change a color? edit every page by hand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                    <span>no Design System — ever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[3px] text-[var(--destructive)]">✕</span>
                    <span>hand off = a pile of pages, not a codebase</span>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="card-lift h-full rounded-lg border border-[var(--accent-dim)] bg-[color-mix(in_oklab,var(--surface),var(--accent)_4%)] p-6">
                <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  With Coherent
                </div>
                <ul className="mono mt-4 space-y-2.5 text-[13px] text-[var(--fg-muted)]">
                  <li className="flex items-start gap-2">
                    <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                    <span>pages built from shared components, not redrawn each time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                    <span>edit a component once → every page using it updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                    <span>change a style or token → cascades through every component using it</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                    <span>Design System grows alongside the UI — no manual DS work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check size={12} strokeWidth={2.5} className="mt-[4px] shrink-0 text-[var(--accent)]" />
                    <span>hand off = product + Design System, shipped together</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* [02] WHAT IS COHERENT */}
      <section id="what" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-24">
          <Reveal>
            <SectionLabel index="02">What is Coherent</SectionLabel>
          </Reveal>
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.05}>
              <h2 className="mono text-[32px] font-medium leading-[1.12] tracking-[-0.02em] lg:text-[42px]">
                One brief.
                <br />
                Many pages.
                <br />
                One Design System.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Coherent is an AI design method for multi-page products. You
                write a brief. Coherent turns it into a plan, then generates
                every page — interconnected, with shared components and a
                Design System that grows as pages land.
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Output is a clean Next.js + Tailwind + shadcn/ui project. Show
                it to stakeholders. Hand it to devs. Or ship it as your real
                frontend and wire a backend later.{' '}
                <span className="text-[var(--foreground)]">Your code. Your design system. No lock-in.</span>
              </p>
            </Reveal>
          </div>

          {/* DS PARALLEL — absorbed from old §04 */}
          <div id="design-system" className="mt-36 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal delay={0.05}>
              <DSTokensPanel />
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mono text-[32px] font-medium leading-[1.12] tracking-[-0.02em] lg:text-[42px]">
                As you describe
                <br />
                the UI, a Design System
                <br />
                <span className="text-[var(--accent)]">builds itself.</span>
              </h3>
              <p className="mt-6 text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                Every component gets a stable ID. Every token you touch — a
                color, a font, a spacing step — lands in
                <span className="mono text-[var(--foreground)]"> design-system.config.ts</span>.
                By page three, you have a living DS you can open, audit, and edit.
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
                v0 gives you a page. Figma gives you a mockup. Coherent gives
                you a page <span className="text-[var(--foreground)]">and</span> a Design System.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* [03] HOW IT WORKS */}
      <section id="how" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="03">How it works</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
              See it in action.
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
              Five commands from empty folder to a deployable multi-page UI.
              No templates to clone, no design system to bootstrap.
            </p>
          </Reveal>
          <div className="mt-12 space-y-6">
            {HOW_STEPS.map((s, i) => (
              <Reveal key={s.step} delay={0.05 + i * 0.04}>
                <div className="grid gap-4 md:grid-cols-[60px_1fr_1.2fr] md:gap-6">
                  <div className="mono flex items-start pt-1 text-[20px] font-medium text-[var(--accent)] md:pt-6">
                    {s.step}
                  </div>
                  <div>
                    <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                      {s.label}
                    </div>
                    <div className="mono mt-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-[13px]">
                      <span className="text-[var(--accent)]">$</span>{' '}
                      <span className="text-[var(--foreground)]">{s.cmd}</span>
                    </div>
                  </div>
                  <p className="pt-1 text-[13.5px] leading-[1.65] text-[var(--fg-muted)] md:pt-6">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* [04] TWO WAYS TO BUILD */}
      <section id="two-ways" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="04">Two ways to build</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
              Use the terminal.
              <br />
              <span className="text-[var(--fg-dim)]">Or your editor. Or both.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="flex h-full flex-col gap-4 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-6">
                <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  CLI
                </div>
                <p className="text-[13.5px] leading-[1.6] text-[var(--fg-muted)]">
                  Run commands in your terminal. Each goes through the full
                  pipeline: AI generation → component reuse → validation →
                  auto-fix.
                </p>
                <div className="mono mt-auto space-y-2 text-[13px]">
                  {['coherent init my-app', 'coherent chat "add a dashboard"', 'coherent preview'].map((c) => (
                    <div key={c} className="rounded-md border border-[var(--border)] bg-[var(--elevated)] px-3 py-2">
                      <span className="text-[var(--accent)]">$</span>{' '}
                      <span className="text-[var(--foreground)]">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col gap-4 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-6">
                <div className="mono flex items-center gap-2 text-[10.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Cursor / Claude Code / any AI editor
                </div>
                <p className="text-[13.5px] leading-[1.6] text-[var(--fg-muted)]">
                  Describe changes in your editor&apos;s chat. Coherent provides
                  context via{' '}
                  <span className="mono text-[var(--foreground)]">.cursorrules</span>{' '}
                  and{' '}
                  <span className="mono text-[var(--foreground)]">CLAUDE.md</span>{' '}
                  — your AI knows about shared components, design tokens, and
                  quality rules.
                </p>
                <div className="mono mt-auto space-y-2 text-[12.5px]">
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    Example prompts
                  </div>
                  {[
                    '"make the hero headline larger"',
                    '"add hover shadow to the feature cards"',
                    '"change the footer layout to two columns"',
                  ].map((p) => (
                    <div key={p} className="rounded-md border border-[var(--border)] bg-[var(--elevated)] px-3 py-2 text-[var(--foreground)]">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mono mt-8 max-w-3xl text-[12.5px] leading-[1.7] text-[var(--fg-muted)]">
              Different tools, shared foundation. CLI runs the full pipeline —
              generation, reuse, validation, auto-fix. Editor chat gives you
              speed with AI-powered design-system context. Run{' '}
              <span className="text-[var(--accent)]">coherent check</span>{' '}
              anytime to scan quality, shared components, and internal links.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* [07] ATMOSPHERES */}
      <section id="atmospheres" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="05">Atmospheres (optional)</SectionLabel>
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
                  <AtmospherePreview name={a.name} />
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
            <StaggerItem>
              <div className="card-lift flex h-full flex-col gap-4 rounded-lg border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-5">
                <div
                  className="flex h-36 flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed border-[var(--border)] bg-[var(--elevated)]"
                >
                  <Plus size={22} strokeWidth={1.5} className="text-[var(--accent)]" />
                  <span className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    define your own
                  </span>
                </div>
                <div>
                  <div className="mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                    atmosphere
                  </div>
                  <div className="mono mt-1 text-[16px] font-medium text-[var(--foreground)]">
                    Your own vibe
                  </div>
                </div>
                <p className="text-[13px] leading-[1.55] text-[var(--fg-muted)]">
                  Skip the starter kits. Define fonts, palette, rhythm in
                  <span className="mono text-[var(--foreground)]"> design-system.config.ts</span>.
                  Save it — it becomes your 6th atmosphere.
                </p>
                <div className="mono text-[11px] text-[var(--fg-dim)]">
                  <span className="text-[var(--foreground)]">Fit:</span> anything you want it to be
                </div>
              </div>
            </StaggerItem>
          </Stagger>
        </Container>
      </section>

      {/* [08] GETTING STARTED */}
      <section id="start" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="06">Getting started</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[38px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[48px]">
              Try it in 60 seconds.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 overflow-hidden rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5">
                <span className="mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  terminal
                </span>
                <CopyChip
                  text={
                    'npm install -g @getcoherent/cli\ncoherent init my-app\ncd my-app\ncoherent chat "create a SaaS app with dashboard, settings, and pricing pages"\ncoherent preview'
                  }
                />
              </div>
              <div className="mono space-y-3 px-5 py-5 text-[13.5px] leading-[1.6]">
                <div>
                  <span className="text-[var(--accent)]">$</span>{' '}
                  <span className="text-[var(--foreground)]">
                    npm install -g @getcoherent/cli
                  </span>
                </div>
                <div>
                  <span className="text-[var(--accent)]">$</span>{' '}
                  <span className="text-[var(--foreground)]">coherent init my-app</span>
                </div>
                <div>
                  <span className="text-[var(--accent)]">$</span>{' '}
                  <span className="text-[var(--foreground)]">cd my-app</span>
                </div>
                <div>
                  <span className="text-[var(--accent)]">$</span>{' '}
                  <span className="text-[var(--foreground)]">
                    coherent chat &quot;create a SaaS app with dashboard, settings,
                    and pricing pages&quot;
                  </span>
                </div>
                <div>
                  <span className="text-[var(--accent)]">$</span>{' '}
                  <span className="text-[var(--foreground)]">coherent preview</span>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-[13.5px] leading-[1.65] text-[var(--fg-muted)]">
              That&apos;s it. Five commands. A complete multi-page prototype
              with shared components and a Design System. Bring your own
              Claude or GPT key — typical cost per page:{' '}
              <span className="mono text-[var(--foreground)]">$0.01–$0.03</span>.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* [09] SPONSOR */}
      <section id="sponsor" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="07">Open source</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-8 max-w-3xl text-[34px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[44px]">
              Free. Forever. MIT.
            </h2>
            <p className="mt-5 max-w-2xl text-[14.5px] leading-[1.65] text-[var(--fg-muted)]">
              Everything&apos;s in the open source tier. No paid gates, no
              usage limits. Sponsoring is optional — fuel for shipping the
              atmosphere engine faster.
            </p>
          </Reveal>

          <Stagger className="mt-12 grid gap-4 lg:grid-cols-2" gap={0.08}>
            {PRICING.map((p) => (
              <StaggerItem key={p.name}>
                <div
                  className={`card-lift relative flex h-full flex-col gap-6 rounded-lg border p-6 ${
                    p.featured
                      ? 'border-[var(--border-strong)] bg-[var(--surface)]'
                      : 'border-[var(--accent-dim)] bg-[color-mix(in_oklab,var(--surface),var(--accent)_6%)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="mono text-[13px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                      {p.name}
                    </span>
                    {!p.featured && (
                      <SiteBadge tone="accent">everything unlocked</SiteBadge>
                    )}
                  </div>
                  <div>
                    <div className="mono flex items-baseline gap-1 text-[var(--foreground)]">
                      <span className="text-[40px] font-medium leading-none tabular-nums">
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
                        <Check
                          size={12}
                          strokeWidth={2.5}
                          className="mt-[4px] shrink-0 text-[var(--accent)]"
                        />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.href}
                    {...(/^https?:\/\//.test(p.href)
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={
                      !p.featured
                        ? 'btn-primary-site mono mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-md px-4 text-[13px]'
                        : 'press mono mt-auto inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--surface)] px-4 text-[13px] text-[var(--foreground)] outline-none hover:border-[var(--fg-dim)] hover:bg-[var(--surface-2)]'
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

      {/* [10] FAQ */}
      <section id="faq" className="relative z-[1] border-b border-[var(--border)] bg-[var(--background)]">
        <Container className="py-28">
          <Reveal>
            <SectionLabel index="08">Questions</SectionLabel>
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
                target="_blank"
                rel="noopener noreferrer"
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

      {/* FINAL CTA */}
      <section id="install" className="relative z-[1] overflow-hidden border-b border-[var(--border)] bg-[var(--background)]">
        <AmbientOrbs />
        <Container className="relative py-28 text-center">
          <Reveal>
            <h2 className="mono mx-auto max-w-3xl text-[38px] font-medium leading-[1.08] tracking-[-0.02em] lg:text-[52px]">
              One brief.
              <br />
              <span className="text-[var(--fg-dim)]">Whole UI in hours.</span>
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
              MIT · open source · bring your own Claude / GPT key
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
              <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-[var(--fg-dim)]">
                AI design method for multi-page UIs. DS included.
              </p>
            </div>
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <div className="mono mb-3 text-[11px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
                  {col.title}
                </div>
                <ul className="space-y-2 text-[13px]">
                  {col.links.map((l) => {
                    const external = /^https?:\/\//.test(l.href)
                    return (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                          className="link-sweep text-[var(--fg-muted)] transition-colors hover:text-[var(--foreground)]"
                        >
                          {l.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="mono mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--border)] pt-6 text-[11.5px] text-[var(--fg-dim)] md:flex-row md:items-center">
            <div>© {currentYear} Coherent Design Method · MIT · v{cliVersion}</div>
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

function DSTokensPanel() {
  const colors = [
    { name: '--accent', hex: '#3ecf8e', role: 'accent' },
    { name: '--background', hex: '#0a0a0a', role: 'background' },
    { name: '--surface', hex: '#141414', role: 'surface' },
    { name: '--foreground', hex: '#ededed', role: 'foreground' },
  ]
  const radii = [
    { name: 'sm', px: 2 },
    { name: 'md', px: 6 },
    { name: 'lg', px: 10 },
    { name: 'xl', px: 14 },
  ]
  const spacing = [4, 8, 12, 16, 24, 32]

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      {/* header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-2)] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="mono text-[11px] font-medium text-[var(--foreground)]">
            design-system.config.ts
          </span>
        </div>
        <span className="mono text-[9.5px] uppercase tracking-[0.14em] text-[var(--accent)]">
          auto-generated
        </span>
      </div>

      <div className="grid gap-3 p-3.5 md:grid-cols-2">
        {/* COLOR */}
        <section>
          <DSLabel>color · 4 tokens</DSLabel>
          <div className="mt-1.5 grid grid-cols-4 gap-1.5">
            {colors.map((c) => (
              <div key={c.name} className="flex flex-col gap-0.5">
                <div
                  className="h-8 rounded border border-[var(--border)]"
                  style={{ background: c.hex }}
                />
                <span className="mono truncate text-[9px] text-[var(--fg-dim)]">
                  {c.hex}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* TYPOGRAPHY */}
        <section>
          <DSLabel>typography · 2</DSLabel>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <div className="flex items-center justify-between gap-2 rounded border border-[var(--border)] bg-[var(--elevated)] px-2.5 py-1.5">
              <span
                className="text-[var(--foreground)]"
                style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                Aa
              </span>
              <span className="mono text-[9px] text-[var(--fg-dim)]">Geist Sans</span>
            </div>
            <div className="flex items-center justify-between gap-2 rounded border border-[var(--border)] bg-[var(--elevated)] px-2.5 py-1.5">
              <span
                className="mono text-[var(--foreground)]"
                style={{ fontSize: '18px', fontWeight: 500, lineHeight: 1 }}
              >
                aa
              </span>
              <span className="mono text-[9px] text-[var(--fg-dim)]">Geist Mono</span>
            </div>
          </div>
        </section>

        {/* RADIUS */}
        <section>
          <DSLabel>radius · 4</DSLabel>
          <div className="mt-1.5 grid grid-cols-4 gap-1.5">
            {radii.map((r) => (
              <div
                key={r.name}
                className="mono flex h-9 items-center justify-center border border-[var(--border-strong)] bg-[var(--elevated)] text-[10px]"
                style={{ borderRadius: `${r.px}px` }}
              >
                <span className="text-[var(--accent)]">{r.name}</span>
                <span className="ml-1 text-[var(--fg-dim)]">{r.px}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SPACING */}
        <section>
          <DSLabel>spacing · 4pt</DSLabel>
          <div className="mt-1.5 flex h-[56px] items-center justify-between gap-1 rounded border border-[var(--border)] bg-[var(--elevated)] px-2.5">
            {spacing.map((v) => (
              <div key={v} className="flex flex-col items-center gap-1">
                <div
                  className="rounded-[1.5px] bg-[var(--accent)]"
                  style={{ width: `${v}px`, height: `${v}px` }}
                />
                <span className="mono text-[8.5px] tabular-nums text-[var(--fg-dim)]">
                  {v}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* COMPONENTS — full width, 2 rows */}
        <section className="md:col-span-2">
          <DSLabel>components · live · 9 registered</DSLabel>
          <div className="mt-1.5 flex flex-col gap-1.5 rounded border border-[var(--border)] bg-[var(--elevated)] px-2.5 py-2">
            {/* row 1 — buttons + badges */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button className="mono inline-flex h-6 items-center rounded bg-[var(--accent)] px-2 text-[10.5px] font-medium text-[var(--accent-foreground)]">
                Primary
              </button>
              <button className="mono inline-flex h-6 items-center rounded border border-[var(--border-strong)] bg-[var(--surface)] px-2 text-[10.5px] text-[var(--foreground)]">
                Secondary
              </button>
              <span className="mono inline-flex h-5 items-center rounded-[2px] border border-[var(--accent)]/35 bg-[var(--accent)]/12 px-1.5 text-[9px] uppercase tracking-[0.1em] text-[var(--accent)]">
                success
              </span>
              <span className="mono inline-flex h-5 items-center rounded-[2px] border border-[var(--error)]/35 bg-[var(--error)]/12 px-1.5 text-[9px] uppercase tracking-[0.1em] text-[var(--error)]">
                error
              </span>
              <span className="mono ml-auto text-[9.5px] text-[var(--accent)]">
                CID-001…005
              </span>
            </div>
            {/* row 2 — toggle + checkbox + radio */}
            <div className="flex flex-wrap items-center gap-3 border-t border-[var(--border)] pt-2">
              {/* toggle (on) */}
              <span className="inline-flex items-center gap-1.5">
                <span className="relative inline-flex h-[14px] w-[24px] items-center rounded-full bg-[var(--accent)] px-[2px]">
                  <span className="h-[10px] w-[10px] translate-x-[10px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
                </span>
                <span className="mono text-[9.5px] text-[var(--fg-muted)]">toggle</span>
              </span>
              {/* checkbox (checked) */}
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-[3px] bg-[var(--accent)] text-[var(--accent-foreground)]">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6.5L5 9l4.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="mono text-[9.5px] text-[var(--fg-muted)]">checkbox</span>
              </span>
              {/* radio (selected) */}
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-flex h-[14px] w-[14px] items-center justify-center rounded-full border border-[var(--accent)]">
                  <span className="h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />
                </span>
                <span className="mono text-[9.5px] text-[var(--fg-muted)]">radio</span>
              </span>
              {/* slider */}
              <span className="inline-flex items-center gap-1.5">
                <span className="relative inline-flex h-[4px] w-[40px] items-center rounded-full bg-[var(--border-strong)]">
                  <span className="absolute left-0 h-full w-[60%] rounded-full bg-[var(--accent)]" />
                  <span className="absolute left-[60%] top-1/2 h-[10px] w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--accent)] bg-[var(--surface)]" />
                </span>
                <span className="mono text-[9.5px] text-[var(--fg-muted)]">slider</span>
              </span>
              <span className="mono ml-auto text-[9.5px] text-[var(--accent)]">
                CID-006…009
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* footer */}
      <div className="mono flex items-center justify-between border-t border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-[9.5px] text-[var(--fg-dim)]">
        <span>12 tokens · 9 components · 5 pages</span>
        <span className="inline-flex items-center gap-1 text-[var(--accent)]">
          <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
          every value editable
        </span>
      </div>
    </div>
  )
}

function DSLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mono flex items-center gap-1.5 text-[9px] uppercase tracking-[0.14em] text-[var(--fg-dim)]">
      <span className="inline-block h-1 w-1 rounded-full bg-[var(--accent)]" />
      {children}
    </div>
  )
}

function AtmospherePreview({ name }: { name: string }) {
  if (name === 'Console') {
    return (
      <div
        className="flex h-36 flex-col justify-between overflow-hidden rounded-md border border-[var(--border)] p-3"
        style={{
          background: '#0a0a0a',
          fontFamily: 'var(--font-geist-mono, ui-monospace, monospace)',
        }}
      >
        <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.14em]" style={{ color: '#6b7a6f' }}>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full" style={{ background: '#3ecf8e' }} />
            traces · prod
          </span>
          <span>live</span>
        </div>
        <div>
          <div className="text-[9px] uppercase tracking-[0.14em]" style={{ color: '#6b7a6f' }}>
            p99 latency
          </div>
          <div className="mt-0.5 flex items-baseline gap-1.5">
            <span className="text-[22px] font-medium leading-none tabular-nums" style={{ color: '#ededed' }}>
              124
            </span>
            <span className="text-[10px]" style={{ color: '#6b7a6f' }}>
              ms
            </span>
            <span className="text-[10px] tabular-nums" style={{ color: '#3ecf8e' }}>
              −8ms
            </span>
          </div>
          <div className="mt-1.5 flex h-4 items-end gap-[1.5px]">
            {[6, 8, 5, 10, 7, 9, 12, 8, 11, 14, 10, 13, 9, 11, 8].map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-[1px]"
                style={{ height: `${h}px`, background: '#3ecf8e', opacity: 0.6 + (i % 3) * 0.12 }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex h-5 items-center rounded-[3px] px-2 text-[10px] font-medium"
            style={{ background: '#3ecf8e', color: '#0a0a0a' }}
          >
            Save query
          </span>
          <span
            className="inline-flex h-5 items-center rounded-[3px] border px-2 text-[10px]"
            style={{ borderColor: '#2a2a2a', color: '#a0a0a0' }}
          >
            cancel
          </span>
        </div>
      </div>
    )
  }

  if (name === 'Warm') {
    return (
      <div
        className="flex h-36 flex-col justify-between overflow-hidden rounded-[14px] border p-3.5"
        style={{
          background: '#fdfaf4',
          borderColor: 'rgba(139,58,43,0.12)',
          fontFamily: 'var(--font-geist-sans, ui-sans-serif, system-ui)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold" style={{ background: 'rgba(200,90,70,0.14)', color: '#c85a46' }}>
            S
          </span>
          <span className="text-[10px]" style={{ color: 'rgba(60,45,35,0.55)' }}>
            Good morning, Sergei
          </span>
        </div>
        <div>
          <div className="text-[17px] font-semibold leading-[1.2] tracking-tight" style={{ color: '#2b1e14' }}>
            Ready when you are.
          </div>
          <div className="mt-1 text-[11px] leading-[1.45]" style={{ color: 'rgba(60,45,35,0.65)' }}>
            3 drafts · 1 scheduled for tomorrow.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-flex h-7 items-center rounded-full px-3 text-[11px] font-medium"
            style={{ background: '#c85a46', color: '#fdfaf4' }}
          >
            Continue →
          </span>
          <span
            className="inline-flex h-7 items-center rounded-full border px-3 text-[11px]"
            style={{ borderColor: 'rgba(139,58,43,0.2)', color: '#8a5340' }}
          >
            Later
          </span>
        </div>
      </div>
    )
  }

  if (name === 'Minimal') {
    return (
      <div
        className="flex h-36 flex-col justify-between overflow-hidden rounded-md border p-3.5"
        style={{
          background: '#fafafa',
          borderColor: 'rgba(0,0,0,0.08)',
          fontFamily: 'var(--font-geist-sans, ui-sans-serif, system-ui)',
        }}
      >
        <div
          className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em]"
          style={{ color: 'rgba(0,0,0,0.45)' }}
        >
          <span>acme · overview</span>
          <span>v2.1</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { l: 'MRR', v: '$42.1k', d: '+12%' },
            { l: 'Users', v: '3,204', d: '+8%' },
            { l: 'Churn', v: '2.1%', d: '−0.4' },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-0.5">
              <span className="text-[8.5px] uppercase tracking-[0.12em]" style={{ color: 'rgba(0,0,0,0.5)' }}>
                {s.l}
              </span>
              <span className="text-[13px] font-semibold leading-none tabular-nums" style={{ color: '#111' }}>
                {s.v}
              </span>
              <span className="text-[9px] tabular-nums" style={{ color: 'rgba(0,0,0,0.45)' }}>
                {s.d}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="inline-flex h-6 items-center rounded-[5px] px-2.5 text-[10.5px] font-medium"
            style={{ background: '#111', color: '#fafafa' }}
          >
            View report
          </span>
          <span
            className="inline-flex h-6 items-center rounded-[5px] border px-2.5 text-[10.5px]"
            style={{ borderColor: 'rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.7)' }}
          >
            Export
          </span>
        </div>
      </div>
    )
  }

  if (name === 'Bold') {
    return (
      <div
        className="flex h-36 flex-col justify-between overflow-hidden border p-3.5"
        style={{
          background: '#000000',
          borderColor: '#ffffff',
          fontFamily: 'var(--font-geist-sans, ui-sans-serif, system-ui)',
        }}
      >
        <div className="flex items-center justify-between">
          <span
            className="inline-flex h-5 items-center px-1.5 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{ background: '#ff3d00', color: '#000' }}
          >
            new
          </span>
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: '#fff' }}>
            2026 / drop 04
          </span>
        </div>
        <div
          className="text-[26px] font-black leading-[0.92] tracking-[-0.03em]"
          style={{ color: '#fff' }}
        >
          MAKE IT
          <br />
          <span style={{ color: '#ff3d00' }}>LOUD.</span>
        </div>
        <div className="flex items-stretch gap-0">
          <span
            className="inline-flex h-7 flex-1 items-center justify-center text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ background: '#fff', color: '#000' }}
          >
            Get it →
          </span>
          <span
            className="inline-flex h-7 items-center justify-center border px-3 text-[10.5px] font-bold uppercase tracking-[0.14em]"
            style={{ borderColor: '#fff', color: '#fff' }}
          >
            Info
          </span>
        </div>
      </div>
    )
  }

  // Editorial
  return (
    <div
      className="flex h-36 flex-col justify-between overflow-hidden rounded-[2px] border p-3.5"
      style={{
        background: '#fdfbf7',
        borderColor: 'rgba(40,25,15,0.15)',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      <div
        className="text-[9px] uppercase tracking-[0.2em]"
        style={{ color: 'rgba(40,25,15,0.55)', fontFamily: 'ui-monospace, monospace' }}
      >
        № 12 · essay
      </div>
      <div>
        <div
          className="text-[18px] font-semibold leading-[1.15]"
          style={{ color: '#1a120a', letterSpacing: '-0.01em' }}
        >
          On the art of naming.
        </div>
        <div
          className="mt-1.5 max-w-[22ch] text-[11px] italic leading-[1.45]"
          style={{ color: 'rgba(40,25,15,0.65)' }}
        >
          Naming is invention. It is also constraint.
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className="text-[10px]"
          style={{ color: 'rgba(40,25,15,0.55)', fontFamily: 'ui-monospace, monospace' }}
        >
          by Sergei K.
        </span>
        <span
          className="text-[11px] font-medium underline decoration-[1px] underline-offset-[3px]"
          style={{ color: '#8b3a2b' }}
        >
          Read →
        </span>
      </div>
    </div>
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
  {
    name: 'Minimal',
    mood: 'Monochrome. Clean sans. No accent flair. Grid-driven. For pro-neutral products where the product is the story, not the decor.',
    fit: 'Vercel, Linear, Raycast, Plausible',
    preview: '#fafafa',
  },
  {
    name: 'Bold',
    mood: 'Raw contrast. Huge type. Hard edges. Black-and-white with one loud color. For statement brands that want to be remembered.',
    fit: 'Awwwards portfolios, Gumroad, Pitch, Figma community',
    preview: '#000000',
  },
]

const HOW_STEPS = [
  {
    step: '01',
    label: 'Scaffold the project',
    cmd: 'coherent init my-app && cd my-app',
    body: '30 seconds: a Next.js project with a design-system.config.ts, component folder, and docs — ready to customize.',
  },
  {
    step: '02',
    label: 'Describe what you need',
    cmd: 'coherent chat "add a dashboard with revenue stats and user growth chart"',
    body: 'Coherent generates a complete dashboard. Real components. Real data. Not a wireframe.',
  },
  {
    step: '03',
    label: 'Add more pages',
    cmd: 'coherent chat "add a settings page and pricing page with three tiers"',
    body: 'Every new page automatically reuses the same Header, Footer, and design tokens from the dashboard. No copy-paste. No drift.',
  },
  {
    step: '04',
    label: 'Preview and iterate',
    cmd: 'coherent preview',
    body: 'Hot reload. Open the project in Cursor or Claude Code and describe changes in chat — edits cascade through the DS.',
  },
  {
    step: '05',
    label: 'Ship it',
    cmd: 'coherent export --output ./my-app',
    body: 'Clean Next.js project. No platform code. Deploy to Vercel in one click, or hand off to your team.',
  },
]


const FAQ = [
  {
    q: 'What is Coherent Design Method?',
    a: 'A CLI that generates multi-page UI prototypes where every page shares the same components, colors, and layout. Unlike single-page generators, Coherent builds a Design System as you go — component library, tokens, docs — so the UI stays consistent across your whole app. Change one thing, everywhere it updates.',
  },
  {
    q: 'Who is it for?',
    a: 'Founders building multi-page prototypes, designers who ship code, product teams that need clickable demos that behave like real software, and devs who want a clean Next.js starting point with a Design System already in place. If your work is one-off single pages, v0/Lovable cover you. If you need interconnected pages plus a DS that grows, that\'s Coherent.',
  },
  {
    q: 'Do I need to know how to code?',
    a: 'No. You describe what you want in plain English — pages, atmosphere, tweaks — and Coherent writes the code. Everything (components, tokens, pages) is editable by describing the change you want. The output is standard code, so if you or your dev wants to open a file directly, everything is transparent and readable. English-first, code-always-available.',
  },
  {
    q: 'How is this different from v0, Lovable, or Bolt?',
    a: 'Those tools nail a single page. Ask for a second page and you get a different header, different buttons, different spacing. Coherent targets the step after: multi-page consistency plus a Design System that grows alongside. You still use v0 or Lovable for quick single-page explorations. You use Coherent when you need a coherent multi-page product (and a DS you own).',
  },
  {
    q: 'Can I use it with Cursor, Claude Code, or other AI editors?',
    a: 'Yes. Coherent provides context to any AI editor via .cursorrules and CLAUDE.md files. Your AI editor knows about every shared component, every design token, and every quality rule. Start in the terminal with `coherent chat`, continue in Cursor with natural language, switch back for a validation run — same project, shared foundation.',
  },
  {
    q: 'What do I get after export?',
    a: 'A clean Next.js 15 project with Tailwind CSS and shadcn/ui. Standard React, standard TypeScript, no Coherent runtime dependency. Use it as (1) a clickable stakeholder demo, (2) a handoff artifact for a developer, or (3) production frontend with your own backend wired in. Deploy to Vercel, Netlify, Fly, Cloudflare, or self-host. Your code, your choice.',
  },
  {
    q: 'What AI model does it use?',
    a: 'Works with Anthropic Claude (recommended — best results, especially with prompt caching) or OpenAI GPT-4. You bring your own API key — prompted once at setup. Typical cost: $0.01–0.03 per page. A 5-page app scaffold costs roughly $0.10. No subscription, no middleman, no platform fee.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. MIT licensed. Everything — CLI, all atmospheres, all validators, all features — is in the open source tier. No gated features, no usage limits. You bring your own LLM key. Sponsoring is optional — it funds faster atmosphere engine development.',
  },
  {
    q: 'What is an atmosphere?',
    a: 'Atmospheres are starter kits — a complete visual vocabulary (typography, color, spacing, motion, layout, mood) bundled together so you don\'t start from a blank canvas. Pick Console, Warm, Editorial — or skip them entirely and define your own design-system.config.ts. Atmospheres are convenience, never a ceiling.',
  },
  {
    q: 'Is it production-ready?',
    a: 'v0.7.27 today is stable for prototypes, internal tools, stakeholder demos, and dev handoff. 1,068 tests passing, 23 design principles enforced, MIT licensed. For bet-the-company public product UI, treat the output as a strong starting point and do a human polish pass. For fast internal dashboards and handoffs, ship today.',
  },
  {
    q: 'Where do I get help?',
    a: 'GitHub issues for bugs and feature requests — response usually within 24h. GitHub Discussions for questions. The full RULES_MAP and IDEAS_BACKLOG are open on the repo — you can see exactly what\'s shipped, what\'s planned, and why.',
  },
]

const PRICING = [
  {
    name: 'Open source',
    price: '$0',
    period: '· MIT · forever',
    tagline:
      'Everything. No paid tier, no gated features, no usage limits. You bring your own LLM key.',
    features: [
      'Unlimited projects',
      'All 5 atmospheres (Console, Warm, Editorial, Minimal, Bold + your own)',
      '23 enforced rules + auto-fix',
      'Shared components registry',
      'Wiki memory loop',
      'Works with Cursor, Claude Code, any AI editor',
    ],
    cta: 'Install now',
    href: '#start',
    featured: false,
  },
  {
    name: 'Sponsor',
    price: 'Optional',
    period: '· your call',
    tagline:
      'Support the project. Faster atmosphere engine shipping, priority on requests, your logo on the site.',
    features: [
      'Everything in Open source',
      'Priority atmosphere requests',
      'Logo on getcoherent.design',
      'Direct line to the maintainer',
      'GitHub Sponsors + OpenCollective',
    ],
    cta: 'Sponsor on GitHub',
    href: 'https://github.com/sponsors/skovtun',
    featured: true,
  },
]

const FOOTER_COLS = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'Design System', href: '#design-system' },
      { label: 'Atmospheres', href: '#atmospheres' },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Quickstart', href: '#start' },
      { label: 'Changelog', href: 'https://github.com/skovtun/coherent-design-method/blob/main/docs/CHANGELOG.md' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: 'https://github.com/skovtun/coherent-design-method' },
      { label: 'RULES_MAP', href: 'https://github.com/skovtun/coherent-design-method/blob/main/docs/wiki/RULES_MAP.md' },
      { label: 'Sponsor', href: '#sponsor' },
    ],
  },
]
