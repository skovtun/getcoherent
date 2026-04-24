import type { MetadataRoute } from 'next'
import { ERROR_CODES } from '@/lib/error-codes'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getcoherent.design'

const routes: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/design-system', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/design-system/docs', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/design-system/recommendations', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/design-system/sitemap', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/design-system/logos-lab', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/design-system/shared', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/design-system/components', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/design-system/tokens', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/design-system/tokens/colors', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/design-system/tokens/spacing', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/design-system/tokens/typography', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/errors', priority: 0.4, changeFrequency: 'monthly' },
  // Per-code error pages generated from the ERROR_CODES registry so new
  // codes ship to the sitemap automatically as the data file grows.
  ...ERROR_CODES.map(e => ({
    path: `/errors/${e.slug}`,
    priority: 0.3,
    changeFrequency: 'monthly' as MetadataRoute.Sitemap[number]['changeFrequency'],
  })),
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
