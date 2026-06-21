import type { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import BlogDetailPageClient from './page-client'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const esSlugs = blogPosts.es.map((p) => ({ slug: p.slug }))
  const enSlugs = blogPosts.en.map((p) => ({ slug: p.slug }))
  return [...esSlugs, ...enSlugs]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.es.find((p) => p.slug === slug) || blogPosts.en.find((p) => p.slug === slug)
  
  if (!post) {
    return {
      title: 'Artículo no encontrado | Menudo Blog',
    }
  }

  return {
    title: `${post.title} | Menudo Blog`,
    description: post.snippet,
    alternates: {
      canonical: `https://menudoapp.com/blog/${slug}`,
    }
  }
}

export default function BlogDetailPage() {
  return <BlogDetailPageClient />
}
