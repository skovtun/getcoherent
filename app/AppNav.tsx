'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }
  return (
    <Button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
      )}
    </Button>
  )
}

export function AppNav() {
  const pathname = usePathname()
  const [hasSharedHeader, setHasSharedHeader] = useState(false)

  useEffect(() => {
    fetch('/api/design-system/shared-components')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.shared?.some((c: { type: string; name: string }) => c.type === 'layout' && /header|nav/i.test(c.name))) {
          setHasSharedHeader(true)
        }
      })
      .catch(() => {})
  }, [])

  const isHidden =
    pathname?.startsWith('/design-system') ||
    pathname?.startsWith('/docs') ||
    pathname === '/login' || pathname === '/signin' || pathname === '/sign-in' || pathname === '/signup' || pathname === '/sign-up' || pathname === '/register' || pathname === '/forgot-password' || pathname === '/reset-password'

  if (isHidden) return null

  return (
    <>
      {!hasSharedHeader && (
      <nav className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold text-foreground hover:text-foreground/90 transition-colors shrink-0">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
            </span>
            <span>Coherent Design Method</span>
          </Link>
          
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/design-system"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
            Design System
          </Link>
        </div>
      </nav>
      )}
      <Link
        href="/design-system"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-white px-4 py-2 text-xs shadow-sm hover:bg-black/80 transition-all"
        title="Design System"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
        Design System
      </Link>
    </>
  )
}
