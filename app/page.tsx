'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Layers, Zap, Monitor, Rocket, Terminal, MessageSquare,
  Check, Github, Linkedin, Copy, Sparkles, BookOpen
} from 'lucide-react'
import Image from 'next/image'
import { ParticleDotGrid, FloatingSnippets } from '@/components/hero-effects'
import { CopyableInline, CopyableBlock } from '@/components/copyable-terminal'

// ─── Scroll animation ──────────────────────────────────────────────

function useScrollAnimation(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true)
      },
      { threshold, rootMargin: '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function AnimateOnScroll({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, visible } = useScrollAnimation(0.1)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

// ─── Copyable code block component ────────────────────────────────

function CodeBlock({ command, className = '' }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex items-center gap-3 rounded-full border border-border/30 bg-zinc-950 px-4 py-3 font-mono text-sm ${className}`}>
      <span className="text-zinc-500 select-none shrink-0">$</span>
      <span className="text-emerald-400 flex-1 text-left truncate">{command}</span>
      <button
        type="button"
        onClick={handleCopy}
        className="shrink-0 p-1.5 rounded-md text-zinc-500 hover:text-zinc-300 transition-colors"
        aria-label="Copy"
      >
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

function CodeBlockMultiple({ commands, className = '' }: { commands: string[]; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {commands.map((c, i) => (
        <CodeBlock key={i} command={c} />
      ))}
    </div>
  )
}

// ─── Data ───────────────────────────────────────────────────────────

const WITHOUT_PARAGRAPH =
  'Generate a page — looks great. Generate another — different header. Third page — different buttons. Fourth — spacing is off. You spend more time fixing inconsistencies than building.'

const WITH_ITEMS = [
  'Every page shares the same header component. Edit it once — all pages update instantly.',
  'Change the primary color — all 12 pages update.',
  'Add a component once — reuse it everywhere by ID.',
]

const STORY_STEPS = [
  {
    num: 1,
    intro: "Alex opens terminal and runs:",
    cmd: "coherent init my-saas",
    result: "30 seconds later: a Next.js project with a design system, component library, and documentation — ready to customize.",
  },
  {
    num: 2,
    intro: "She describes what she needs:",
    cmd: 'coherent chat "add a dashboard with revenue stats, user growth chart, and recent activity feed"',
    result: "Coherent generates a complete dashboard page. Real components. Real data. Not a wireframe.",
  },
  {
    num: 3,
    intro: "She adds more pages:",
    cmd: [
      'coherent chat "add a settings page with profile form and notification preferences"',
      'coherent chat "add a pricing page with three tiers"',
    ],
    result: "Every new page automatically reuses the same Header, Footer, and design tokens from the dashboard. No copy-paste. No drift.",
  },
  {
    num: 4,
    intro: "She opens it in the browser:",
    cmd: "coherent preview",
    result: "Hot reload. She can also open the project in Cursor and describe changes there — changes appear instantly either way.",
  },
  {
    num: 5,
    intro: "She tweaks the design:",
    cmd: 'coherent chat "make the primary color green"',
    result: "One command. All pages update. The design system viewer at /design-system shows every component, token, and recommendation.",
  },
  {
    num: 6,
    intro: "She ships it:",
    cmd: "coherent export --output ./my-saas-app",
    result: "Clean Next.js project. No platform code. Deploy to Vercel in one click.",
  },
]

const TWO_WAYS_CLI_CMDS = [
  "coherent init",
  'coherent chat "create my app"',
  "coherent preview",
]

const TWO_WAYS_PROMPTS = [
  "Make the hero headline larger and bolder",
  "Add hover shadow to the feature cards",
  "Change the footer layout to two columns",
]

const DIFFERENT_CARDS = [
  { icon: Layers, title: "Components have IDs", desc: "CID-001 is your Header. It lives in one file, used on every page. Edit it once — every page updates. No more 'which header is the right one?'" },
  { icon: Monitor, title: "Design system builds itself", desc: "As you add pages, Coherent assembles a component library, token reference, and UX recommendations. Visit /design-system to see it live." },
  { icon: Zap, title: "AI follows your rules", desc: "97 design constraints. Typography hierarchy, spacing rhythm, accessibility, color tokens — all enforced automatically. No manual review needed." },
  { icon: Rocket, title: "Export and own your code", desc: "coherent export gives you a clean Next.js project. No lock-in. No platform dependencies. It's your code." },
  { icon: Monitor, title: "Works with your tools", desc: "Cursor, Claude Code, Windsurf — Coherent provides context to any AI editor via .cursorrules and CLAUDE.md. Your AI knows about every shared component and design token." },
]

const GETTING_STARTED_CMDS = [
  "npm install -g @coherent/cli",
  "coherent init my-app",
  "cd my-app",
  'coherent chat "create a SaaS app with dashboard, settings, and pricing pages"',
  "coherent preview",
]

// ─── Page ───────────────────────────────────────────────────────────

export default function LandingPage() {
  const [copiedValidate, setCopiedValidate] = useState(false)

  const copyValidate = () => {
    navigator.clipboard.writeText('coherent validate')
    setCopiedValidate(true)
    setTimeout(() => setCopiedValidate(false), 2000)
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-hidden relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Full-page vertical grid lines */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="mx-auto h-full max-w-6xl relative">
          <div className="absolute left-[5%] top-0 bottom-0 w-px bg-white/[0.03]" />
          <div className="absolute left-[35%] top-0 bottom-0 w-px bg-white/[0.03]" />
          <div className="absolute left-[65%] top-0 bottom-0 w-px bg-white/[0.03]" />
          <div className="absolute left-[95%] top-0 bottom-0 w-px bg-white/[0.03]" />
        </div>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-6">
        <ParticleDotGrid />
        <FloatingSnippets />
        {/* Radial glow behind headline */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center gap-8 py-24">
          <span className="inline-flex items-center rounded-full border border-border/30 bg-card/60 backdrop-blur-sm px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground">
            Coherent Design Method
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            One command.{' '}
            <span className="bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Consistent UI everywhere.
            </span>
          </h1>

          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Describe what you need. Get a multi-page prototype where every page shares the same components, colors, and layout — automatically.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <CopyableInline command="npm install -g @coherent/cli" />
            <a
              href="https://github.com/coherent-design/coherent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/30 px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:border-border/60"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── The Problem ──────────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <AnimateOnScroll delay={0}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3">
              The problem
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 tracking-tight">
              You&apos;ve seen this before
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            <AnimateOnScroll delay={100}>
              <div className="rounded-xl border border-border/10 bg-card p-6 md:p-8 transition-all duration-300 hover:border-border/20 hover:shadow-sm hover:shadow-primary/5 hover:-translate-y-0.5">
                <h3 className="text-xs font-semibold text-primary/80 tracking-[0.2em] uppercase mb-6">
                  Every AI tool today
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {WITHOUT_PARAGRAPH}
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="rounded-xl border border-primary/20 bg-card p-6 md:p-8 transition-all duration-300 hover:border-border/20 hover:shadow-sm hover:shadow-primary/5 hover:-translate-y-0.5">
                <h3 className="text-xs font-semibold text-primary/80 tracking-[0.2em] uppercase mb-6">
                  With Coherent
                </h3>
                <div className="flex flex-col gap-3.5">
                  {WITH_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll delay={300}>
            <div className="mt-8 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 max-w-3xl mx-auto shadow-lg shadow-primary/5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                    The killer feature
                  </p>
                  <p className="text-sm md:text-base text-foreground/95 leading-relaxed">
                    As you add pages, Coherent builds your design system in the background — component library, design tokens, accessibility recommendations. Visit <span className="font-mono font-medium text-primary">/design-system</span> to see it live.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── How It Works (Alex story) ─────────────────────────────── */}
      <section className="relative z-10 bg-muted/5">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <AnimateOnScroll delay={0}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight">
              See it in action
            </h2>
            <p className="text-center text-muted-foreground text-sm mb-16 flex items-center justify-center gap-3">
              <span className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&h=96&fit=crop&crop=face"
                  alt="Alex"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </span>
              <span>Meet Alex. She&apos;s building a SaaS prototype for her startup.</span>
            </p>
          </AnimateOnScroll>

          <div className="space-y-12">
            {STORY_STEPS.map((step, i) => (
              <AnimateOnScroll key={step.num} delay={100 * (i + 1)}>
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border border-border/30 text-sm font-medium text-muted-foreground shrink-0">
                    {step.num}
                  </div>
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                    {step.intro}
                  </p>
                  {Array.isArray(step.cmd) ? (
                    <CodeBlockMultiple commands={step.cmd} className="w-full" />
                  ) : (
                    <CodeBlock command={step.cmd} className="w-full" />
                  )}
                  <p className="text-sm text-foreground/90 leading-relaxed max-w-xl">
                    {step.result}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Ways to Build ─────────────────────────────────────── */}
      <section className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <AnimateOnScroll delay={0}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3">
              Two ways to build
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 tracking-tight">
              Use the terminal. Or your editor. Or both.
            </h2>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <AnimateOnScroll delay={100}>
              <div className="rounded-xl border border-border/10 bg-card p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:border-border/20 hover:shadow-sm hover:shadow-primary/5 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal className="h-5 w-5 text-primary" />
                  <h3 className="text-xs font-semibold text-primary/80 tracking-[0.2em] uppercase">CLI</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  Run commands in your terminal. Each command goes through the full pipeline: AI generation → component reuse → validation → auto-fix.
                </p>
                <CodeBlockMultiple commands={TWO_WAYS_CLI_CMDS} />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="rounded-xl border border-border/10 bg-card p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:border-border/20 hover:shadow-sm hover:shadow-primary/5 hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h3 className="text-xs font-semibold text-primary/80 tracking-[0.2em] uppercase">Cursor / Claude Code / Any AI Editor</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  Describe changes in your editor&apos;s chat. Coherent provides context via .cursorrules and CLAUDE.md — your AI knows about shared components, design tokens, and quality rules.
                </p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Example prompts</p>
                <div className="space-y-2">
                  {TWO_WAYS_PROMPTS.map((prompt, i) => (
                    <div key={i} className="rounded-lg border border-border/10 bg-background/50 px-3 py-2 font-mono text-sm text-primary">
                      &quot;{prompt}&quot;
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll delay={300}>
            <p className="text-center text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Different tools, shared foundation. CLI runs the full pipeline — generation, component reuse, validation, auto-fix. Editor chat gives you speed with AI-powered design system context. Use{' '}
              <button
                type="button"
                onClick={copyValidate}
                className="font-mono text-primary hover:text-primary/90 hover:underline cursor-pointer align-baseline"
                title="Copy command"
              >
                {copiedValidate ? 'Copied!' : 'coherent validate'}
              </button>
              {' '}anytime to check consistency.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── What Makes It Different ───────────────────────────────── */}
      <section className="relative z-10 bg-muted/5">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32">
          <AnimateOnScroll delay={0}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3">
              What makes it different
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 tracking-tight">
              Not another page generator
            </h2>
            <p className="text-center text-muted-foreground text-sm max-w-xl mx-auto mb-16">
              Built for consistency. Not one-off screens.
            </p>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-5">
            {DIFFERENT_CARDS.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={100 * (i + 1)}>
                <div className="group rounded-xl border border-border/10 bg-card p-6 transition-all duration-300 hover:border-border/20 hover:shadow-sm hover:shadow-primary/5 hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                      <f.icon className="h-4 w-4" />
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">{f.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-12">
                    {f.title === 'Design system builds itself' ? (
                      <>As you add pages, Coherent assembles a component library, token reference, and UX recommendations. Visit <span className="font-mono font-medium text-primary">/design-system</span> to see it live.</>
                    ) : (
                      f.desc
                    )}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ── Getting Started ──────────────────────────────────────── */}
      <section className="relative z-10 bg-muted/5">
        <div className="max-w-xl mx-auto px-6 py-24 md:py-32">
          <AnimateOnScroll delay={0}>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-primary/80 mb-3">
              Getting started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center tracking-tight">
              Try it in 60 seconds
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={100}>
            <div className="w-full text-left">
              <CopyableBlock commands={GETTING_STARTED_CMDS} />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <p className="text-sm text-muted-foreground mt-8 text-center">
              That&apos;s it. Five commands. A complete multi-page prototype with shared components and a design system.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border/20 bg-white/[0.03]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <span>
              Coherent Design Method · by{' '}
              <a
                href="https://www.linkedin.com/in/sergeikovtun/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline underline-offset-2"
              >
                Sergei Kovtun
              </a>
            </span>
            <div className="flex items-center gap-5">
              <a
                href="https://www.linkedin.com/in/sergeikovtun/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/coherent-design/coherent"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/30 bg-card/50 px-4 py-2 text-xs font-medium text-muted-foreground/90 tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-primary/70" />
              Built with Coherent Design Method
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}