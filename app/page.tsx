import type { Metadata } from 'next'
import PageClient from './page-client'

export const metadata: Metadata = {
  title: 'Menudo — La mejor app de finanzas personales y presupuesto | Best Budgeting App',
  description:
    'Controla tus gastos diarios y presupuesto compartido de forma rápida y sin esfuerzo con comandos de voz, lenguaje natural y atajos automáticos. La mejor app de finanzas personales offline-first. Try the best budgeting app today!',
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
    'menudo app'
  ],
  alternates: {
    canonical: 'https://menudoapp.com',
  }
}

export default function Page() {
  return <PageClient />
}
