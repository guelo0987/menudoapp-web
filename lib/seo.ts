import { blogPosts } from './blog-data'
import { siteContent } from './site-content'

export const SITE_URL = 'https://menudoapp.com'
export const SITE_NAME = 'Menudo'
export const APP_STORE_ID = '6773500340'
export const APP_STORE_URL = `https://apps.apple.com/do/app/menudo-budget-expense/id${APP_STORE_ID}`
export const SUPPORT_EMAIL = 'soporte@menudoapp.com'

/**
 * Las fechas de los posts vienen escritas en español ("Junio 20, 2026").
 * Para `lastmod` del sitemap y `datePublished` de JSON-LD hacen falta en ISO.
 */
const MESES: Record<string, number> = {
  enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
  julio: 6, agosto: 7, septiembre: 8, setiembre: 8, octubre: 9,
  noviembre: 10, diciembre: 11,
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

export function parsePostDate(raw: string): Date {
  const m = raw.trim().match(/^([\p{L}]+)\s+(\d{1,2}),?\s+(\d{4})$/u)
  if (m) {
    const mes = MESES[m[1].toLowerCase()]
    if (mes !== undefined) return new Date(Date.UTC(+m[3], mes, +m[2]))
  }
  const fallback = new Date(raw)
  return isNaN(fallback.getTime()) ? new Date() : fallback
}

export function isoDate(raw: string): string {
  return parsePostDate(raw).toISOString().split('T')[0]
}

/* ------------------------------------------------------------------ */
/* JSON-LD                                                             */
/* ------------------------------------------------------------------ */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon-512.png`,
  email: SUPPORT_EMAIL,
  founder: { '@type': 'Person', name: 'Miguel Cruz' },
  address: { '@type': 'PostalAddress', addressCountry: 'DO' },
  sameAs: ['https://www.instagram.com/menudofinance'],
}

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#app`,
  name: 'Menudo',
  alternateName: 'Menudo — Budget & Expense',
  applicationCategory: 'FinanceApplication',
  applicationSubCategory: 'Personal Budgeting',
  operatingSystem: 'iOS 14.0 or later',
  url: SITE_URL,
  installUrl: APP_STORE_URL,
  downloadUrl: APP_STORE_URL,
  inLanguage: ['es', 'en'],
  description:
    'App de finanzas personales y presupuestos compartidos. Registra tus gastos hablando o escribiendo en lenguaje natural, funciona sin conexión y sincroniza automáticamente.',
  featureList: [
    'Registro de gastos por voz y lenguaje natural',
    'Categorización automática con IA',
    'Funciona sin conexión a internet (offline-first)',
    'Listas y presupuestos compartidos con hasta 4 miembros',
    'Notificaciones en tiempo real de gastos compartidos',
    'Alertas de límite de presupuesto por categoría',
    'Gastos recurrentes diarios, semanales, quincenales, mensuales y anuales',
    'Múltiples carteras y cálculo de patrimonio',
    'Soporte de varias monedas con tasa de cambio (DOP, USD, EUR)',
    'Atajos de Siri y Live Activities en la Isla Dinámica',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Descarga gratis con prueba incluida. Suscripción mensual, anual o de por vida.',
  },
  publisher: { '@id': `${SITE_URL}/#organization` },
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: 'es',
  publisher: { '@id': `${SITE_URL}/#organization` },
}

/** FAQPage generado desde el mismo contenido que se muestra en la página. */
export function faqSchema(lang: 'es' | 'en' = 'es') {
  const questions = siteContent[lang]?.faqs?.questions ?? []
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: questions.map((item: { q: string; a: string }) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function blogPostingSchema(slug: string, lang: 'es' | 'en' = 'es') {
  const post =
    blogPosts[lang].find((p) => p.slug === slug) ??
    blogPosts.es.find((p) => p.slug === slug)
  if (!post) return null

  const published = parsePostDate(post.date).toISOString()

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${slug}#article`,
    headline: post.title,
    description: post.snippet,
    articleBody: post.content.join('\n\n'),
    wordCount: post.content.join(' ').split(/\s+/).length,
    inLanguage: lang,
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
    author: { '@type': 'Person', name: 'Miguel Cruz' },
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#app` },
  }
}

/** Helper para inyectar JSON-LD en un componente de servidor. */
export function jsonLd(schema: unknown) {
  return {
    __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
  }
}

/** BreadcrumbList para los artículos: Inicio > Blog > Artículo. */
export function breadcrumbSchema(slug: string, title: string, lang: 'es' | 'en' = 'es') {
  const base = lang === 'en' ? `${SITE_URL}/en` : SITE_URL
  const home = lang === 'en' ? 'Home' : 'Inicio'
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: home, item: base },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${base}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: `${base}/blog/${slug}` },
    ],
  }
}
