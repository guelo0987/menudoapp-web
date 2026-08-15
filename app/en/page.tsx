import type { Metadata } from 'next'
import PageClient from '@/app/page-client'
import { alternatesFor } from '@/lib/i18n'
import { faqSchema, jsonLd } from '@/lib/seo'

const title = 'Menudo — The effortless budgeting and expense tracking app'
const description =
  'Track your daily spending and shared budgets in seconds using voice, plain language, and automated shortcuts. Offline-first personal finance for iOS.'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'best budgeting app',
    'expense tracker app',
    'personal finance app',
    'budgeting app for couples',
    'shared budget app',
    'siri shortcuts budgeting',
    'offline first personal finance',
    'voice expense tracker',
    'menudo app',
  ],
  alternates: alternatesFor('/').en,
  openGraph: {
    title,
    description,
    url: '/en',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_DO'],
  },
  twitter: { title, description },
}

export default function EnglishHomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema('en'))} />
      <PageClient lang="en" />
    </>
  )
}
