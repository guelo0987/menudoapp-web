import type { Metadata } from 'next'
import PrivacyPolicyPageClient from '@/app/privacy-policy/page-client'
import { alternatesFor } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Menudo collects, uses and protects your personal and financial data.',
  alternates: alternatesFor('/privacy-policy').en,
  openGraph: { title: 'Privacy Policy | Menudo', url: '/en/privacy-policy', locale: 'en_US' },
}

export default function EnglishPrivacyPage() {
  return <PrivacyPolicyPageClient lang="en" />
}
