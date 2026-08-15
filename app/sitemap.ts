import type { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { SITE_URL, parsePostDate } from '@/lib/seo'
import { altPath } from '@/lib/i18n'

/**
 * Sitemap dinámico. Sustituye a public/sitemap.xml, que tenía las fechas
 * congeladas en 2024 y había que actualizar a mano al publicar.
 *
 * Cada entrada declara sus `alternates.languages` para que el buscador entienda
 * que /blog/x y /en/blog/x son el mismo contenido en dos idiomas y no
 * duplicados compitiendo entre sí.
 */
function withAlternates(esPath: string, lastModified: Date, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly') {
  const enPath = altPath(esPath, 'en')
  const abs = (p: string) => (p === '/' ? SITE_URL : `${SITE_URL}${p}`)

  return [
    {
      url: abs(esPath),
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { es: abs(esPath), en: abs(enPath) } },
    },
    {
      url: abs(enPath),
      lastModified,
      changeFrequency,
      priority: Math.max(priority - 0.1, 0.1),
      alternates: { languages: { es: abs(esPath), en: abs(enPath) } },
    },
  ]
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    ...withAlternates('/', now, 1, 'weekly'),
    ...withAlternates('/blog', now, 0.8, 'weekly'),
    ...withAlternates('/support', now, 0.7, 'monthly'),
    ...withAlternates('/privacy-policy', now, 0.3, 'yearly'),
    ...withAlternates('/terms', now, 0.3, 'yearly'),
  ]

  const seen = new Set<string>()
  const postRoutes: MetadataRoute.Sitemap = []

  for (const post of [...blogPosts.es, ...blogPosts.en]) {
    if (seen.has(post.slug)) continue
    seen.add(post.slug)
    postRoutes.push(
      ...withAlternates(`/blog/${post.slug}`, parsePostDate(post.date), 0.7, 'monthly'),
    )
  }

  return [...staticRoutes, ...postRoutes]
}
