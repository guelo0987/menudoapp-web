import type { Language } from './site-content'
import { SITE_URL } from './seo'

export const DEFAULT_LANG: Language = 'es'
export const EN_PREFIX = '/en'

/**
 * El español vive en la raíz (`/blog`) y el inglés bajo `/en` (`/en/blog`).
 *
 * Se dejó el español en la raíz a propósito: es el mercado principal y mover
 * esas URLs habría tirado a la basura el posicionamiento que ya tienen.
 */
const LOCALIZED_PATHS = ['/', '/blog', '/support', '/privacy-policy', '/terms']

/** ¿Esta ruta tiene gemela en el otro idioma? */
export function isLocalizedPath(pathname: string): boolean {
  const p = stripEn(pathname).replace(/\/$/, '') || '/'
  return LOCALIZED_PATHS.includes(p) || p.startsWith('/blog/')
}

function stripEn(pathname: string): string {
  if (pathname === EN_PREFIX) return '/'
  if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length)
  return pathname
}

export function langFromPathname(pathname: string): Language {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? 'en' : 'es'
}

/** Ruta equivalente en el otro idioma. */
export function altPath(pathname: string, target: Language): string {
  const base = stripEn(pathname) || '/'
  if (target === 'es') return base
  return base === '/' ? EN_PREFIX : `${EN_PREFIX}${base}`
}

/**
 * Bloque `alternates` para el metadata de Next.
 * `canonical` apunta a la versión del idioma actual y `languages` declara el
 * hreflang de las dos, más `x-default` al español.
 */
export function alternatesFor(esPath: string) {
  const es = esPath === '/' ? '/' : esPath
  const en = altPath(es, 'en')
  return {
    es: { canonical: es, languages: { es, en, 'x-default': es } },
    en: { canonical: en, languages: { es, en, 'x-default': es } },
  }
}

export function absolute(path: string): string {
  return path === '/' ? SITE_URL : `${SITE_URL}${path}`
}
