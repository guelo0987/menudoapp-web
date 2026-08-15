import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * Sustituye a public/robots.txt.
 *
 * Además de los buscadores, aquí se permiten EXPLÍCITAMENTE los rastreadores de
 * los motores de IA. Sin esto, aparecer citado en ChatGPT, Gemini, Claude o
 * Perplexity depende del criterio por defecto de cada uno — y algunos asumen
 * que no tienen permiso si no se les nombra.
 */
const AI_CRAWLERS = [
  'GPTBot', // OpenAI — entrenamiento
  'OAI-SearchBot', // OpenAI — búsqueda de ChatGPT
  'ChatGPT-User', // OpenAI — navegación en vivo
  'ClaudeBot', // Anthropic
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended', // grounding de Gemini
  'Applebot-Extended', // Apple Intelligence
  'meta-externalagent', // Meta AI
  'Bytespider', // TikTok / Doubao
  'cohere-ai',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/invitations/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
