import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import {
  SITE_NAME,
  SITE_URL,
  jsonLd,
  organizationSchema,
  softwareApplicationSchema,
  websiteSchema,
} from '@/lib/seo'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Menudo — Finanzas Claras. Sin Esfuerzo.',
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Escribe o habla: Menudo organiza tus finanzas de manera inteligente al instante, sincronizando de forma segura incluso cuando no tienes conexión.',
  applicationName: SITE_NAME,
  authors: [{ name: 'Miguel Cruz' }],
  creator: 'Miguel Cruz',
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'es_DO',
    alternateLocale: ['en_US'],
    url: SITE_URL,
    title: 'Menudo — Finanzas Claras. Sin Esfuerzo.',
    description:
      'App de finanzas personales y presupuestos compartidos. Registra tus gastos hablando, funciona sin conexión y sincroniza solo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menudo — Finanzas Claras. Sin Esfuerzo.',
    description:
      'App de finanzas personales y presupuestos compartidos. Registra tus gastos hablando, funciona sin conexión y sincroniza solo.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${poppins.variable} bg-background`} suppressHydrationWarning>
      <head>
        {/* Datos estructurados de sitio: los buscadores y los motores de IA los
            leen para saber qué es Menudo, quién lo hace y qué features tiene. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([
            organizationSchema,
            websiteSchema,
            softwareApplicationSchema,
          ])}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
