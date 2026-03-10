'use client'

import { useState } from 'react'
import { Menu, X, Github } from 'lucide-react'

const GITHUB_URL = 'https://github.com/skovtun/coherent-design-method'

const NAV_LINKS = [
  { href: '#problem', label: 'Problem it solves' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#two-ways', label: 'Two ways to build' },
  { href: '#different', label: 'Features' },
  { href: '#getting-started', label: 'Getting started' },
  { href: '#faq', label: 'FAQ' },
]

function NavLinks({ className = '', onLinkClick }: { className?: string; onLinkClick?: () => void }) {
  return (
    <nav className={`flex items-center gap-1 ${className}`}>
      {NAV_LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          onClick={onLinkClick}
          className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-white/5 whitespace-nowrap"
        >
          {label}
        </a>
      ))}
    </nav>
  )
}

function LogoIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_logo)">
        <path
          d="M10 4C10.5523 4 11 4.44772 11 5V13H19C19.5523 13 20 13.4477 20 14V20.4287C19.9999 22.401 18.401 23.9999 16.4287 24H3.57129C1.59895 23.9999 7.5245e-05 22.401 0 20.4287V7.57129C7.53742e-05 5.59895 1.59895 4.00008 3.57129 4H10ZM2 20.4287C2.00008 21.2965 2.70352 21.9999 3.57129 22H9V15H2V20.4287ZM11 22H16.4287C17.2965 21.9999 17.9999 21.2965 18 20.4287V15H11V22ZM3.57129 6C2.70352 6.00008 2.00008 6.70352 2 7.57129V13H9V6H3.57129ZM20.5 0C22.433 0 24 1.567 24 3.5V9.90039C23.9998 10.5076 23.5076 10.9998 22.9004 11H14.0996C13.4924 10.9998 13.0002 10.5076 13 9.90039V1.09961C13.0002 0.492409 13.4924 0.000211011 14.0996 0H20.5ZM15 9H22V3.5C22 2.67157 21.3284 2 20.5 2H15V9Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_logo">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export function LandingNav() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-border/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-14 md:h-16 gap-4">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-3 shrink-0 text-foreground no-underline w-min"
          >
            <span className="text-primary shrink-0">
              <LogoIcon />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-sm tracking-tight">Coherent</span>
              <span className="text-[10px] font-medium text-muted-foreground tracking-wide uppercase whitespace-nowrap">DESIGN METHOD</span>
            </span>
          </a>

          {/* Desktop nav — centered */}
          <div className="hidden md:flex justify-center">
            <NavLinks />
          </div>

          {/* Right: Get Started + menu (mobile) */}
          <div className="flex items-center justify-end gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="h-4 w-4 hidden sm:block" />
              <span className="hidden sm:inline">Get Started</span>
              <Github className="h-3.5 w-3.5 sm:hidden" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel — content aligned right (standard pattern) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-border/10 bg-background/95 backdrop-blur-md px-4 py-6">
          <div className="flex flex-col items-center gap-3">
            <nav className="flex flex-col items-center gap-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  className="px-4 py-3 text-base font-medium text-foreground/90 hover:text-foreground transition-colors rounded-lg hover:bg-white/5 whitespace-nowrap"
                >
                  {label}
                </a>
              ))}
            </nav>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-3.5 text-base font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="h-4 w-4" />
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
