'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

function CoherentLogo({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#cl)">
        <path d="M10 4C10.5523 4 11 4.44772 11 5V13H19C19.5523 13 20 13.4477 20 14V20.4287C19.9999 22.401 18.401 23.9999 16.4287 24H3.57129C1.59895 23.9999 7.5245e-05 22.401 0 20.4287V7.57129C7.53742e-05 5.59895 1.59895 4.00008 3.57129 4H10ZM2 20.4287C2.00008 21.2965 2.70352 21.9999 3.57129 22H9V15H2V20.4287ZM11 22H16.4287C17.2965 21.9999 17.9999 21.2965 18 20.4287V15H11V22ZM3.57129 6C2.70352 6.00008 2.00008 6.70352 2 7.57129V13H9V6H3.57129ZM20.5 0C22.433 0 24 1.567 24 3.5V9.90039C23.9998 10.5076 23.5076 10.9998 22.9004 11H14.0996C13.4924 10.9998 13.0002 10.5076 13 9.90039V1.09961C13.0002 0.492409 13.4924 0.000211011 14.0996 0H20.5ZM15 9H22V3.5C22 2.67157 21.3284 2 20.5 2H15V9Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="cl">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

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
    <Fragment>
      {!hasSharedHeader && (
      <nav className="sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold text-foreground hover:text-foreground/90 transition-colors shrink-0">
            <CoherentLogo size={20} className="text-primary" />
            <span>Coherent Design Method</span>
          </Link>
          
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/design-system"
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <CoherentLogo size={16} />
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
        <CoherentLogo size={14} />
        Design System
      </Link>
    </Fragment>
  )
}
