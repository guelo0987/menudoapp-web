import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import SupportPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — Centro de Soporte y Ayuda | Help Center',
  description: '¿Tienes dudas sobre Menudo App? Envíanos un mensaje o ponte en contacto con nuestro equipo de soporte directamente.',
  alternates: alternatesFor('/support').es
}

export default function SupportPage() {
  return <SupportPageClient />
}
