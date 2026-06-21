import type { Metadata } from 'next'
import PrivacyPolicyPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — Política de Privacidad | Privacy Policy',
  description: 'Conoce cómo recopilamos, procesamos y protegemos tus datos financieros y personales en Menudo App de forma segura y transparente.',
  alternates: {
    canonical: 'https://menudoapp.com/privacy-policy',
  }
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageClient />
}
