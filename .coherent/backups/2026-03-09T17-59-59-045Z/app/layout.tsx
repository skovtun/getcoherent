import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { Footer } from '@/components/shared/footer'
import { Header } from '@/components/shared/header'
import { AppNav } from './AppNav'


export const metadata: Metadata = {
  title: {
    default: 'My App',
    template: '%s | My App',
  },
  description: 'Built with Coherent Design Method',
  icons: { icon: '/favicon.svg' },
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    siteName: 'My App',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <style dangerouslySetInnerHTML={{ __html: ":root {\n  --background: #FFFFFF;\n  --foreground: #111827;\n  --primary: #3B82F6;\n  --primary-foreground: #fafafa;\n  --secondary: #8B5CF6;\n  --secondary-foreground: #fafafa;\n  --muted: #F3F4F6;\n  --muted-foreground: #7c8088;\n  --destructive: #EF4444;\n  --destructive-foreground: #fafafa;\n  --border: #E5E7EB;\n  --input: #E5E7EB;\n  --ring: #3B82F6;\n  --card: #FFFFFF;\n  --card-foreground: #111827;\n  --popover: #FFFFFF;\n  --popover-foreground: #111827;\n  --success: #10B981;\n  --warning: #F59E0B;\n  --error: #EF4444;\n  --info: #3B82F6;\n  --accent: #F59E0B;\n  --accent-foreground: #111827;\n}\n.dark {\n  --background: #111827;\n  --foreground: #F9FAFB;\n  --primary: #60A5FA;\n  --primary-foreground: #09090b;\n  --secondary: #A78BFA;\n  --secondary-foreground: #09090b;\n  --muted: #1F2937;\n  --muted-foreground: #91949c;\n  --destructive: #F87171;\n  --destructive-foreground: #09090b;\n  --border: #374151;\n  --input: #374151;\n  --ring: #60A5FA;\n  --card: #111827;\n  --card-foreground: #F9FAFB;\n  --popover: #111827;\n  --popover-foreground: #F9FAFB;\n  --success: #34D399;\n  --warning: #FBBF24;\n  --error: #F87171;\n  --info: #60A5FA;\n  --accent: #FBBF24;\n  --accent-foreground: #F9FAFB;\n}\n" }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <Header />
        <AppNav />
        <div className="flex-1 flex flex-col">{children}</div>
              <Footer />
      </body>
    </html>
  )
}
