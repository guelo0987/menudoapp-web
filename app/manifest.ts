import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Menudo — Finanzas Claras. Sin Esfuerzo.',
    short_name: SITE_NAME,
    description:
      'App de finanzas personales y presupuestos compartidos. Registra tus gastos hablando, funciona sin conexión y sincroniza solo.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F8FBF7',
    theme_color: '#2BB673',
    lang: 'es',
    categories: ['finance', 'productivity'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
