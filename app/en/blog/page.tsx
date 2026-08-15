import type { Metadata } from 'next'
import BlogListPageClient from '@/app/blog/page-client'
import { alternatesFor } from '@/lib/i18n'
import { blogPosts } from '@/lib/blog-data'
import { SITE_URL, isoDate, jsonLd } from '@/lib/seo'

const title = 'Blog — Personal Finance, Expense Tracking and Automations'
const description =
  'Smart money habits, shared budgeting tips, Apple Shortcuts automations and product updates from Menudo.'

export const metadata: Metadata = {
  title,
  description,
  alternates: alternatesFor('/blog').en,
  openGraph: { type: 'website', title, description, url: '/en/blog', locale: 'en_US' },
  twitter: { title, description },
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/en/blog#blog`,
  name: 'Menudo Blog',
  description,
  url: `${SITE_URL}/en/blog`,
  inLanguage: 'en',
  publisher: { '@id': `${SITE_URL}/#organization` },
  blogPost: blogPosts.en.map((post) => ({
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/en/blog/${post.slug}#article`,
    headline: post.title,
    description: post.snippet,
    datePublished: isoDate(post.date),
    url: `${SITE_URL}/en/blog/${post.slug}`,
  })),
}

export default function EnglishBlogListPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogSchema)} />
      <BlogListPageClient lang="en" />
    </>
  )
}
