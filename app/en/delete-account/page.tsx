import type { Metadata } from 'next'
import DeleteAccountPageClient from '@/app/delete-account/page-client'
import { alternatesFor } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Delete your account',
  description: 'How to delete your Menudo account and data, what gets deleted and what is kept.',
  alternates: alternatesFor('/delete-account').en,
  openGraph: { title: 'Delete your account | Menudo', url: '/en/delete-account', locale: 'en_US' },
}

export default function EnglishDeleteAccountPage() {
  return <DeleteAccountPageClient lang="en" />
}
