import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import DeleteAccountPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — Eliminar tu cuenta | Delete your account',
  description: 'Cómo eliminar tu cuenta de Menudo y tus datos, qué se borra y qué se conserva.',
  alternates: alternatesFor('/delete-account').es
}

export default function DeleteAccountPage() {
  return <DeleteAccountPageClient />
}
