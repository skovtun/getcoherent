'use client'

import { useState } from 'react'
import { Blocks, Layers, MessageSquare, BookOpen, LayoutDashboard, ShoppingBag, Settings, Lock, Terminal, MonitorSmartphone, Palette, FileText, ArrowDownRight } from 'lucide-react'

export default function HomePage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null)

  const copy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-b from-muted/40 via-background to-background">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-20 lg:py-28 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            <Blocks className="size-3" />
            Coherent Design Method
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl max-w-3xl">
            Design once.{' '}
            <span className="text-primary">Stay consistent everywhere.</span>
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base leading-relaxed">
            Generate multi-page UI prototypes where every page stays consistent.
            Describe what you need — get interconnected pages, a design system,
            and documentation that all evolve together.
          </p>
          <div className="flex gap-3">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-5 py-2.5 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* Why Coherent Design Method */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Why Coherent Design Method</p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">One config. Every page. Always in sync.</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'Layers', title: 'System-level consistency', desc: 'Change a token in the config — every page updates automatically. No search-and-replace, no drift.' },
              { icon: 'LayoutDashboard', title: 'Working prototypes', desc: 'Not wireframes or mockups. Real Next.js code with real components, ready for production.' },
              { icon: 'MessageSquare', title: 'Natural language', desc: 'Say "add a pricing page" or "make primary green". The AI generates code that follows your design system.' },
              { icon: 'BookOpen', title: 'Auto documentation', desc: 'Component showcase, token reference, and UX recommendations — generated and always up to date.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  {item.icon === 'Layers' && <Layers className="size-5 text-primary" />}
                  {item.icon === 'LayoutDashboard' && <LayoutDashboard className="size-5 text-primary" />}
                  {item.icon === 'MessageSquare' && <MessageSquare className="size-5 text-primary" />}
                  {item.icon === 'BookOpen' && <BookOpen className="size-5 text-primary" />}
                </div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t bg-muted/30 scroll-mt-14">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">How it works</p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">Two ways to build</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <Terminal className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">CLI</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Run commands in your terminal</p>
              <div className="space-y-2">
                {['coherent init', 'coherent chat "add a dashboard"', 'coherent preview'].map((cmd, i) => (
                  <div key={i} className="rounded-lg bg-muted px-3 py-2">
                    <code className="text-xs">{cmd}</code>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                  <MonitorSmartphone className="size-4 text-primary" />
                </div>
                <h3 className="text-sm font-semibold">Chat in editor</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Use Cursor or any AI editor to describe changes</p>
              <div className="space-y-2">
                <div className="rounded-lg bg-muted px-3 py-2">
                  <code className="text-xs">&quot;Add a dashboard with stats and recent activity&quot;</code>
                </div>
                <div className="rounded-lg bg-muted px-3 py-2">
                  <code className="text-xs">&quot;Change primary color to green&quot;</code>
                </div>
                <div className="rounded-lg bg-muted px-3 py-2">
                  <code className="text-xs">&quot;Add a settings page with profile form&quot;</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What you can build */}
      <section className="border-t">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">What you can build</p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">From dashboard to auth — in one command</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { icon: 'LayoutDashboard', title: 'Dashboard', desc: 'KPI cards, charts, tables, and activity feeds — all following your design tokens.', cmd: 'coherent chat "add dashboard with stats"' },
              { icon: 'ShoppingBag', title: 'Services & Listings', desc: 'Product grids, service cards, filtering — responsive layouts out of the box.', cmd: 'coherent chat "add services page"' },
              { icon: 'Settings', title: 'Settings', desc: 'Profile forms, toggles, notification preferences — consistent form patterns.', cmd: 'coherent chat "add settings page"' },
              { icon: 'Lock', title: 'Authentication', desc: 'Login, signup, password reset — centered card layouts with form validation.', cmd: 'coherent chat "add login page"' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border p-6">
                <div className="flex items-center gap-3 mb-3">
                  {item.icon === 'LayoutDashboard' && <LayoutDashboard className="size-5 text-muted-foreground" />}
                  {item.icon === 'ShoppingBag' && <ShoppingBag className="size-5 text-muted-foreground" />}
                  {item.icon === 'Settings' && <Settings className="size-5 text-muted-foreground" />}
                  {item.icon === 'Lock' && <Lock className="size-5 text-muted-foreground" />}
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                <div className="rounded-lg bg-muted px-3 py-2">
                  <code className="text-xs">{item.cmd}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design System grows with you */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">Your design system grows with you</p>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Built automatically as you add pages</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
            As you build pages, Coherent Design Method assembles a design system in the background — components, tokens, and documentation that stay in sync with your UI.
          </p>
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {[
              { icon: 'Palette', title: 'Component library', desc: 'Every component used in your pages is documented with variants, sizes, and code snippets.' },
              { icon: 'Layers', title: 'Design tokens', desc: 'Colors, typography, spacing, and radius — all in one place. Change a token, update everywhere.' },
              { icon: 'FileText', title: 'Docs & recommendations', desc: 'Best practices, accessibility notes, and UX suggestions are generated as you build.' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border bg-background p-6">
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  {item.icon === 'Palette' && <Palette className="size-4 text-primary" />}
                  {item.icon === 'Layers' && <Layers className="size-4 text-primary" />}
                  {item.icon === 'FileText' && <FileText className="size-4 text-primary" />}
                </div>
                <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
            <ArrowDownRight className="size-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Access it anytime via the <span className="font-medium text-foreground">Design System</span> button in the bottom-right corner.
              It lives outside your app — always available during development, never included in your export.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <p className="text-xs font-medium uppercase tracking-widest text-primary mb-3">FAQ</p>
          <h2 className="text-2xl font-bold tracking-tight mb-8">Frequently asked questions</h2>
          <div className="rounded-lg border bg-background divide-y">
            {[
              { q: 'What is Coherent Design Method?', a: 'Coherent Design Method generates multi-page UI prototypes from a single design system config. Every page automatically follows your tokens, components, and design rules — pages, design system, and documentation all evolve together.' },
              { q: 'How is it different from other UI builders?', a: 'Most builders generate one-off pages. Coherent Design Method maintains a living design system — change a color token and every generated page updates. It is system-level consistency, not page-level generation.' },
              { q: 'Do I need to know how to code?', a: 'Basic familiarity with Next.js and Tailwind helps, but generation is done via natural language. You describe what you want, the AI builds it to your design spec.' },
              { q: 'What is the tech stack?', a: 'Next.js 15 (App Router), Tailwind CSS, and a built-in component library. TypeScript throughout. Works with OpenAI or Anthropic for generation.' },
              { q: 'Can I customize the generated code?', a: 'Yes. All generated code is standard Next.js — edit files directly in your IDE. Changes to design-system.config.ts propagate to all pages on regeneration.' },
              { q: 'Is it free?', a: 'Coherent Design Method is open source. You need your own API key (OpenAI or Anthropic) for the AI generation features.' },
            ].map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-sm font-medium hover:bg-muted/50 transition-colors">
                  {item.q}
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-4 text-sm text-muted-foreground">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ready to build */}
      <section id="get-started" className="border-t bg-muted/30 scroll-mt-14">
        <div className="mx-auto max-w-4xl px-4 py-16 lg:py-20">
          <h2 className="text-2xl font-bold tracking-tight mb-3 text-center">Ready to build?</h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-lg mx-auto text-center">
            Return to your editor and start creating. Use CLI commands in your terminal or chat prompts in Cursor — both work. This welcome page will be replaced with your first real page.
          </p>
          <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
            <div className="rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Terminal</span>
                <button onClick={() => copy('coherent chat "add a dashboard"', 0)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copiedIdx === 0 ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="rounded-lg bg-muted px-3 py-2">
                <code className="text-xs">coherent chat &quot;add a dashboard&quot;</code>
              </div>
            </div>
            <div className="rounded-lg border bg-background p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">Cursor chat</span>
                <button onClick={() => copy('Add a dashboard with stats and activity', 1)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {copiedIdx === 1 ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="rounded-lg bg-muted px-3 py-2">
                <code className="text-xs">Add a dashboard with stats and activity</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 mt-auto">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            Coherent Design Method &middot; by{' '}
            <a href="https://www.linkedin.com/in/sergeikovtun/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
              Sergei Kovtun
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
