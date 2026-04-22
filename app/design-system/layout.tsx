'use client'
import Link from 'next/link'
import { Fragment, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight, Menu, Moon, Sun, X } from 'lucide-react'

type Component = {
  id: string
  name?: string
  category?: string
}

const CATEGORY_NAMES: Record<string, string> = {
  form: 'Form',
  layout: 'Layout',
  navigation: 'Navigation',
  'data-display': 'Data Display',
  overlay: 'Overlay',
  feedback: 'Feedback',
  other: 'Other',
}

const KNOWN_NAMES: Record<string, string> = {
  button: 'Button',
  input: 'Input',
  label: 'Label',
  select: 'Select',
  switch: 'Switch',
  checkbox: 'Checkbox',
  card: 'Card',
  badge: 'Badge',
  table: 'Table',
  textarea: 'Textarea',
  dialog: 'Dialog',
  'alert-dialog': 'AlertDialog',
  separator: 'Separator',
  progress: 'Progress',
  avatar: 'Avatar',
  tabs: 'Tabs',
  accordion: 'Accordion',
  skeleton: 'Skeleton',
  tooltip: 'Tooltip',
  'radio-group': 'RadioGroup',
  slider: 'Slider',
}

const NAV_LINKS = [
  { href: '/design-system', label: 'Overview' },
  { href: '/design-system/components', label: 'Components' },
  { href: '/design-system/shared', label: 'Shared' },
  { href: '/design-system/tokens', label: 'Tokens' },
  { href: '/design-system/sitemap', label: 'Sitemap' },
  { href: '/design-system/docs', label: 'Docs' },
  { href: '/design-system/recommendations', label: 'Recs' },
]

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

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [components, setComponents] = useState<Component[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isComponentsPage = pathname?.startsWith('/design-system/components')

  useEffect(() => {
    fetch('/api/design-system/config')
      .then((res) => res.json())
      .then((data) => setComponents(data.components || []))
      .catch(() => [])
  }, [])

  const groupedComponents = components.reduce((acc, comp) => {
    const category = comp.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(comp)
    return acc
  }, {} as Record<string, Component[]>)

  const compName = (c: Component) => KNOWN_NAMES[c.id] || c.name || c.id

  const getBreadcrumbs = () => {
    if (!pathname) return []
    const parts = pathname.replace('/design-system', '').split('/').filter(Boolean)
    const crumbs: { label: string; href: string }[] = [
      { label: 'design-system', href: '/design-system' },
    ]
    if (parts[0] === 'components') {
      crumbs.push({ label: 'components', href: '/design-system/components' })
      if (parts[1]) {
        crumbs.push({
          label: KNOWN_NAMES[parts[1]] || parts[1].replace(/-/g, ' '),
          href: pathname,
        })
      }
    }
    if (parts[0] === 'shared') {
      crumbs.push({ label: 'shared', href: '/design-system/shared' })
      if (parts[1]) crumbs.push({ label: decodeURIComponent(parts[1]), href: pathname })
    }
    if (parts[0] === 'tokens') {
      crumbs.push({ label: 'tokens', href: '/design-system/tokens' })
      if (parts[1]) crumbs.push({ label: parts[1], href: pathname })
    }
    if (parts[0] === 'sitemap') crumbs.push({ label: 'sitemap', href: '/design-system/sitemap' })
    if (parts[0] === 'docs') {
      crumbs.push({ label: 'docs', href: '/design-system/docs' })
      if (parts[1]) {
        const label = parts[1] === 'for-designers' ? 'for designers' : parts[1]
        crumbs.push({ label, href: pathname })
      }
    }
    if (parts[0] === 'recommendations') {
      crumbs.push({ label: 'recommendations', href: '/design-system/recommendations' })
    }
    return crumbs
  }

  const breadcrumbs = getBreadcrumbs()

  const isActive = (href: string) =>
    pathname === href || (href !== '/design-system' && pathname?.startsWith(href))

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center gap-4 px-4 lg:px-6">
          {/* section title */}
          <Link
            href="/design-system"
            className="mono inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--foreground)] outline-none transition-colors hover:text-[var(--accent)]"
          >
            <span className="h-1.5 w-1.5 rounded-[2px] bg-[var(--accent)]" />
            design system
          </Link>

          {/* nav */}
          <nav
            aria-label="Design System navigation"
            className="mono hidden flex-1 items-center justify-center gap-1 md:flex"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`press inline-flex h-8 items-center rounded-md px-3 text-[12.5px] outline-none transition-colors ${
                    active
                      ? 'bg-[var(--elevated)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_var(--border-strong)]'
                      : 'text-[var(--fg-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 md:ml-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="press inline-flex h-8 w-8 items-center justify-center rounded-md border border-[var(--border-strong)] bg-[var(--elevated)] text-[var(--fg-muted)] outline-none hover:text-[var(--foreground)] md:hidden"
            >
              {mobileMenuOpen ? <X size={14} strokeWidth={2} /> : <Menu size={14} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div
          className={`overflow-hidden border-t border-[var(--border)] bg-[var(--glass-bg)] backdrop-blur-md transition-[max-height,opacity] duration-[220ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:hidden ${
            mobileMenuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-1 px-4 py-3 lg:px-6">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mono flex items-center justify-between rounded-md px-3 py-2.5 text-[13px] ${
                    active
                      ? 'bg-[var(--elevated)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_var(--border-strong)]'
                      : 'text-[var(--fg-muted)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {link.label}
                  <ChevronRight size={12} strokeWidth={2} className="text-[var(--fg-dim)]" />
                </Link>
              )
            })}
          </div>
        </div>
      </header>

      {/* BREADCRUMB (show for nested pages) */}
      {breadcrumbs.length > 1 && (
        <div className="border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-2 lg:px-6">
            <div className="mono flex flex-wrap items-center gap-1.5 text-[11px] text-[var(--fg-dim)]">
              {breadcrumbs.map((crumb, i) => (
                <Fragment key={`${crumb.href}-${i}`}>
                  {i > 0 && <span aria-hidden>/</span>}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-[var(--accent)]">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-[var(--foreground)]"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto flex w-full min-h-0 max-w-[1200px] flex-1 px-4 lg:px-6">
          {isComponentsPage && (
            <aside className="hidden w-[220px] shrink-0 flex-col border-r border-[var(--border)] md:flex">
              <nav className="sticky top-14 h-[calc(100vh-3.5rem)] space-y-5 overflow-y-auto py-6 pr-4">
                {Object.entries(groupedComponents).map(([category, comps]) => (
                  <div key={category}>
                    <div className="mono mb-1.5 px-2 text-[10px] uppercase tracking-[0.16em] text-[var(--fg-dim)]">
                      {CATEGORY_NAMES[category] || category}
                    </div>
                    <div className="flex flex-col gap-[2px]">
                      {comps.map((comp) => {
                        const active = pathname === `/design-system/components/${comp.id}`
                        return (
                          <Link
                            key={comp.id}
                            href={`/design-system/components/${comp.id}`}
                            className={`press mono rounded-md px-2 py-1.5 text-[12.5px] outline-none transition-colors ${
                              active
                                ? 'bg-[var(--elevated)] text-[var(--foreground)] shadow-[inset_0_0_0_1px_var(--border-strong)]'
                                : 'text-[var(--fg-muted)] hover:bg-[var(--elevated)] hover:text-[var(--foreground)]'
                            }`}
                          >
                            {compName(comp)}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </aside>
          )}

          <main className={`min-w-0 flex-1 py-8 ${isComponentsPage ? 'md:pl-8' : ''}`}>
            {children}
          </main>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto w-full max-w-[1200px] px-4 py-4 lg:px-6">
            <div className="mono flex flex-col items-start justify-between gap-2 text-[11px] text-[var(--fg-dim)] sm:flex-row sm:items-center">
              <span>
                coherent design method · by{' '}
                <a
                  href="https://www.linkedin.com/in/sergeikovtun/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep text-[var(--foreground)] hover:text-[var(--accent)]"
                >
                  Sergei Kovtun
                </a>
              </span>
              <a
                href="https://github.com/skovtun/coherent-design-method"
                target="_blank"
                rel="noopener noreferrer"
                className="press inline-flex items-center gap-1.5 rounded border border-[var(--border-strong)] bg-[var(--elevated)] px-2 py-1 text-[10.5px] text-[var(--fg-muted)] hover:text-[var(--foreground)]"
              >
                <span className="h-1.5 w-1.5 rounded-[2px] bg-[var(--accent)]" />
                github · coherent-design-method
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
