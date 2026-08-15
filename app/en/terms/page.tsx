import type { Metadata } from 'next'
import TermsOfServicePageClient from '@/app/terms/page-client'
import { alternatesFor } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using the Menudo app and website.',
  alternates: alternatesFor('/terms').en,
  openGraph: { title: 'Terms of Service | Menudo', url: '/en/terms', locale: 'en_US' },
}

export default function EnglishTermsPage() {
  return <TermsOfServicePageClient lang="en" />
}
