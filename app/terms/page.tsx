import type { Metadata } from 'next'
import TermsOfServicePageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — Términos y Condiciones | Terms of Service',
  description: 'Términos de servicio oficiales que regulan el uso, la sincronización de datos y los planes de suscripción en Menudo App.',
  alternates: {
    canonical: 'https://menudoapp.com/terms',
  }
}

export default function TermsOfServicePage() {
  return <TermsOfServicePageClient />
}
