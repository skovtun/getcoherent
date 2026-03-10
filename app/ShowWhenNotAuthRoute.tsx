'use client'

import { usePathname } from 'next/navigation'

const HIDDEN_PATHS = ['/login', '/signin', '/sign-up', '/signup', '/register', '/forgot-password', '/reset-password]

export default function ShowWhenNotAuthRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  if (pathname && HIDDEN_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return null
  }
  return <>{children}</>
}
