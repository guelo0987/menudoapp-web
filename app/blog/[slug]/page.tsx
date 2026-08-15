import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { blogPostingSchema, breadcrumbSchema, isoDate, jsonLd } from '@/lib/seo'
import { alternatesFor } from '@/lib/i18n'
import BlogDetailPageClient from './page-client'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = new Set<string>()
  for (const post of [...blogPosts.es, ...blogPosts.en]) slugs.add(post.slug)
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post =
    blogPosts.es.find((p) => p.slug === slug) || blogPosts.en.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado',
      robots: { index: false, follow: false },
    }
  }

  const published = isoDate(post.date)

  return {
    title: post.title,
    description: post.snippet,
    alternates: alternatesFor(`/blog/${slug}`).es,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.snippet,
      url: `/blog/${slug}`,
      publishedTime: published,
      modifiedTime: published,
      authors: ['Miguel Cruz'],
    },
    twitter: {
      title: post.title,
      description: post.snippet,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const schema = blogPostingSchema(slug, 'es')
  const post = blogPosts.es.find((p) => p.slug === slug)
  const crumbs = post ? breadcrumbSchema(slug, post.title, 'es') : null

  return (
    <>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      )}
      {crumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />
      )}
      <BlogDetailPageClient />
    </>
  )
}
