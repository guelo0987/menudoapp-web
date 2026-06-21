import type { Metadata } from 'next'
import BlogListPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo Blog — Finanzas Personales, Control de Gastos y Automatizaciones',
  description: 'Aprende hábitos financieros inteligentes, consejos de ahorro en pareja, automatización de presupuestos con Apple Shortcuts y más.',
  alternates: {
    canonical: 'https://menudoapp.com/blog',
  }
}

export default function BlogListPage() {
  return <BlogListPageClient />
}
