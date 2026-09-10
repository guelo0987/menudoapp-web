import type { Metadata } from 'next'
import BancoPageClient from './page-client'

export const metadata: Metadata = {
  title: 'Conecta tu banco a Menudo — cómo funciona',
  description:
    'Menudo lee los avisos que tu banco ya te manda por correo y te propone los gastos. Tú decides cuáles entran. Popular, BHD y Banreservas.',
  // Solo existe en español: los usuarios de banking son dominicanos. Sin
  // `languages`, que apuntaría a un /en/banco que no existe.
  alternates: { canonical: '/banco' },
  openGraph: {
    title: 'Conecta tu banco a Menudo',
    description:
      'Menudo lee los avisos que tu banco ya te manda y te propone los gastos. Tú decides cuáles entran.',
    url: '/banco',
  },
}

export default function BancoPage() {
  return <BancoPageClient />
}
