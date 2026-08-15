import type { Metadata } from 'next'
import { alternatesFor } from '@/lib/i18n'
import PageClient from './page-client'
import { faqSchema, jsonLd } from '@/lib/seo'

const title = 'Menudo — La mejor app de finanzas personales y presupuesto | Best Budgeting App'
const description =
  'Controla tus gastos diarios y presupuesto compartido de forma rápida y sin esfuerzo con comandos de voz, lenguaje natural y atajos automáticos. La mejor app de finanzas personales offline-first. Try the best budgeting app today!'

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'best budgeting app',
    'mejores app de finanzas personales',
    'mejor app de presupuestos',
    'app de control de gastos',
    'personal finance app',
    'app para presupuestos compartidos',
    'budgeting app for couples',
    'siri shortcuts budgeting',
    'offline first personal finance',
    'app de finanzas republica dominicana',
    'app para controlar gastos quincena',
    'menudo app',
  ],
  alternates: alternatesFor('/').es,
  openGraph: {
    title,
    description,
    url: '/',
    type: 'website',
  },
  twitter: {
    title,
    description,
  },
}

export default function Page() {
  return (
    <>
      {/* El FAQ se genera desde lib/site-content para que nunca se desincronice
          de lo que el usuario ve en pantalla. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema('es'))} />
      <PageClient />
    </>
  )
}
