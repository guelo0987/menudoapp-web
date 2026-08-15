import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import { blogPosts } from '@/lib/blog-data'
import { SITE_URL, isoDate, jsonLd } from '@/lib/seo'
import BlogListPageClient from './page-client'

const title = 'Blog — Finanzas Personales, Control de Gastos y Automatizaciones'
const description =
  'Aprende hábitos financieros inteligentes, consejos de ahorro en pareja, automatización de presupuestos con Apple Shortcuts y más.'

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor('/blog').es,
  openGraph: {
    type: 'website',
    title,
    description,
    url: '/blog',
  },
  twitter: { title, description },
}

/** Blog + ItemList: le dice al buscador qué artículos existen y en qué orden. */
const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog#blog`,
  name: 'Menudo Blog',
  description,
  url: `${SITE_URL}/blog`,
  inLanguage: 'es',
  publisher: { '@id': `${SITE_URL}/#organization` },
  blogPost: blogPosts.es.map((post) => ({
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.snippet,
    datePublished: isoDate(post.date),
    url: `${SITE_URL}/blog/${post.slug}`,
  })),
}

export default function BlogListPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogSchema)} />
      <BlogListPageClient />
    </>
  )
}
