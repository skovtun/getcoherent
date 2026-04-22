import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import './globals.css'
import { AppNav } from './AppNav'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getcoherent.design'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Coherent Design Method — Once designed. Consistent UI everywhere.',
    template: '%s | Coherent Design Method',
  },
  description: 'Generate multi-page UI prototypes where every page shares the same components, colors, and layout. CLI tool for consistent design systems. Describe what you need — get interconnected pages and auto-generated docs.',
  keywords: [
    'coherent design method',
    'UI prototype',
    'design system',
    'CLI',
    'multi-page app',
    'consistent UI',
    'Next.js',
    'component library',
    'design tokens',
  ],
  authors: [{ name: 'Sergei Kovtun', url: 'https://www.linkedin.com/in/sergeikovtun/' }],
  creator: 'Sergei Kovtun',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Coherent Design Method',
    title: 'Coherent Design Method — Once designed. Consistent UI everywhere.',
    description: 'Generate multi-page UI prototypes where every page shares the same components, colors, and layout. CLI for consistent design systems.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Coherent Design Method',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coherent Design Method — Once designed. Consistent UI everywhere.',
    description: 'Generate multi-page UI prototypes where every page shares the same components and layout. CLI for consistent design systems.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
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
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="481512f2-c9c8-4768-95c7-9951ad9d1b14"
          strategy="afterInteractive"
        />
        <style dangerouslySetInnerHTML={{ __html: ":root {\n  --background: #FFFFFF;\n  --foreground: #111827;\n  --primary: #3B82F6;\n  --primary-foreground: #fafafa;\n  --secondary: #8B5CF6;\n  --secondary-foreground: #fafafa;\n  --muted: #F3F4F6;\n  --muted-foreground: #7c8088;\n  --destructive: #EF4444;\n  --destructive-foreground: #fafafa;\n  --border: #E5E7EB;\n  --input: #E5E7EB;\n  --ring: #3B82F6;\n  --card: #FFFFFF;\n  --card-foreground: #111827;\n  --popover: #FFFFFF;\n  --popover-foreground: #111827;\n  --success: #10B981;\n  --warning: #F59E0B;\n  --error: #EF4444;\n  --info: #3B82F6;\n  --accent: #F59E0B;\n  --accent-foreground: #111827;\n}\n.dark {\n  --background: #111827;\n  --foreground: #F9FAFB;\n  --primary: #60A5FA;\n  --primary-foreground: #09090b;\n  --secondary: #A78BFA;\n  --secondary-foreground: #09090b;\n  --muted: #1F2937;\n  --muted-foreground: #91949c;\n  --destructive: #F87171;\n  --destructive-foreground: #09090b;\n  --border: #374151;\n  --input: #374151;\n  --ring: #60A5FA;\n  --card: #111827;\n  --card-foreground: #F9FAFB;\n  --popover: #111827;\n  --popover-foreground: #F9FAFB;\n  --success: #34D399;\n  --warning: #FBBF24;\n  --error: #F87171;\n  --info: #60A5FA;\n  --accent: #FBBF24;\n  --accent-foreground: #F9FAFB;\n}\n" }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <AppNav />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  )
}
