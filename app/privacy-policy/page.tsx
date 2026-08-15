import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import PrivacyPolicyPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — Política de Privacidad | Privacy Policy',
  description: 'Conoce cómo recopilamos, procesamos y protegemos tus datos financieros y personales en Menudo App de forma segura y transparente.',
  alternates: alternatesFor('/privacy-policy').es
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />
}
