import type { Metadata } from 'next'
import SupportPageClient from '@/app/support/page-client'
import { alternatesFor } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Support',
  description: 'Need help with Menudo? Contact support and we will get back to you.',
  alternates: alternatesFor('/support').en,
  openGraph: { title: 'Support | Menudo', url: '/en/support', locale: 'en_US' },
}

export default function EnglishSupportPage() {
  return <SupportPageClient lang="en" />
}
