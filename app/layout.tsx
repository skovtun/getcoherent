import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AppNav } from './AppNav'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// Use www subdomain to match Vercel's canonical redirect target.
// Bare-domain → 307 → www breaks og:image / twitter:image fetches because
// many social scrapers (X, LinkedIn) don't follow redirects on image URLs.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.getcoherent.design'

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
  },
  twitter: {
    card: 'summary_large_image',
    site: '@uxui_dev',
    creator: '@uxui_dev',
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
    { media: '(prefers-color-scheme: light)', color: '#17a862' },
    { media: '(prefers-color-scheme: dark)', color: '#3ecf8e' },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Coherent Design Method',
      url: siteUrl,
      logo: `${siteUrl}/coherent-logo.svg`,
      founder: {
        '@type': 'Person',
        name: 'Sergei Kovtun',
        url: 'https://www.linkedin.com/in/sergeikovtun/',
      },
      sameAs: [
        'https://github.com/skovtun/coherent-design-method',
        'https://www.npmjs.com/package/@getcoherent/cli',
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'Coherent Design Method',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux, Windows',
      description:
        'CLI that generates multi-page UI prototypes where every page shares the same components, design tokens, and layout. Prevents AI-generated design drift across pages.',
      url: siteUrl,
      downloadUrl: 'https://www.npmjs.com/package/@getcoherent/cli',
      softwareHelp: `${siteUrl}/design-system/docs`,
      license: 'https://opensource.org/licenses/MIT',
      author: { '@id': `${siteUrl}/#organization` },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Coherent Design Method',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: 'en-US',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="481512f2-c9c8-4768-95c7-9951ad9d1b14"
          strategy="afterInteractive"
        />
        <style dangerouslySetInnerHTML={{ __html: ":root {\n  --background: #fafaf7;\n  --foreground: #0a0a0a;\n  --primary: #17a862;\n  --primary-foreground: #ffffff;\n  --secondary: #4a5568;\n  --secondary-foreground: #ffffff;\n  --muted: #f4f3ef;\n  --muted-foreground: #4a4a47;\n  --destructive: #d1383d;\n  --destructive-foreground: #ffffff;\n  --border: #e7e6e0;\n  --input: #e7e6e0;\n  --ring: #17a862;\n  --card: #ffffff;\n  --card-foreground: #0a0a0a;\n  --popover: #ffffff;\n  --popover-foreground: #0a0a0a;\n  --success: #17a862;\n  --warning: #b47a10;\n  --error: #d1383d;\n  --info: #4a5568;\n  --accent: #17a862;\n  --accent-foreground: #ffffff;\n  --surface: #ffffff;\n  --surface-2: #f4f3ef;\n  --elevated: #ffffff;\n  --border-strong: #d4d2cb;\n  --fg-muted: #4a4a47;\n  --fg-dim: #8a8883;\n  --accent-dim: #0f7f48;\n  --accent-glow: rgba(23, 168, 98, 0.18);\n  --glass-bg: rgba(250, 250, 247, 0.78);\n}\n.dark {\n  --background: #0a0a0a;\n  --foreground: #ededed;\n  --primary: #3ecf8e;\n  --primary-foreground: #052b17;\n  --secondary: #a1a1a1;\n  --secondary-foreground: #0a0a0a;\n  --muted: #161616;\n  --muted-foreground: #a1a1a1;\n  --destructive: #ff5c5c;\n  --destructive-foreground: #ffffff;\n  --border: #1f1f1f;\n  --input: #1f1f1f;\n  --ring: #3ecf8e;\n  --card: #111111;\n  --card-foreground: #ededed;\n  --popover: #1a1a1a;\n  --popover-foreground: #ededed;\n  --success: #3ecf8e;\n  --warning: #f5a623;\n  --error: #ff5c5c;\n  --info: #61afef;\n  --accent: #3ecf8e;\n  --accent-foreground: #052b17;\n  --surface: #111111;\n  --surface-2: #161616;\n  --elevated: #1a1a1a;\n  --border-strong: #2a2a2a;\n  --fg-muted: #a1a1a1;\n  --fg-dim: #6b6b6b;\n  --accent-dim: #2fa872;\n  --accent-glow: rgba(62, 207, 142, 0.18);\n  --glass-bg: rgba(10, 10, 10, 0.72);\n}\n" }} />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        <AppNav />
        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  )
}
