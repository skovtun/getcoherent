import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://getcoherent.design'

const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
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
