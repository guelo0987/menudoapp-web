import type { Metadata } from 'next'
import BlogDetailPageClient from '@/app/blog/[slug]/page-client'
import { blogPosts } from '@/lib/blog-data'
import { alternatesFor } from '@/lib/i18n'
import { blogPostingSchema, breadcrumbSchema, isoDate, jsonLd } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return blogPosts.en.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.en.find((p) => p.slug === slug)

  if (!post) {
    return { title: 'Article not found', robots: { index: false, follow: false } }
  }

  const published = isoDate(post.date)

  return {
    title: post.title,
    description: post.snippet,
    alternates: alternatesFor(`/blog/${slug}`).en,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.snippet,
      url: `/en/blog/${slug}`,
      locale: 'en_US',
      publishedTime: published,
      modifiedTime: published,
      authors: ['Miguel Cruz'],
    },
    twitter: { title: post.title, description: post.snippet },
  }
}

export default async function EnglishBlogDetailPage({ params }: Props) {
  const { slug } = await params
  const schema = blogPostingSchema(slug, 'en')
  const post = blogPosts.en.find((p) => p.slug === slug)
  const crumbs = post ? breadcrumbSchema(slug, post.title, 'en') : null

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />}
      {crumbs && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />}
      <BlogDetailPageClient lang="en" />
    </>
  )
}
