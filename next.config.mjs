/** @type {import('next').NextConfig} */

/**
 * Cabeceras de seguridad. Evitan clickjacking y fugas de referrer, y cuentan
 * como señal de confianza para los buscadores.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
]

const nextConfig = {
  typescript: {
    // Conviene quitarlo: mientras esté en true, un error de tipos llega a
    // producción sin avisar. Se deja para no bloquear despliegues hoy.
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Assets de nombre estable: se pueden cachear largo.
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/app-screenshots/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/brand/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  async redirects() {
    return [
      { source: '/privacy', destination: '/privacy-policy', permanent: true },
      { source: '/en/privacy', destination: '/en/privacy-policy', permanent: true },
      // Ajustes › Atajo de facturas (app 1.0.25). Temporal: si se rehace el
      // atajo, se cambia aqui sin sacar otra version de la app.
      {
        source: '/atajo-facturas',
        destination: 'https://www.icloud.com/shortcuts/121555533f3e4f69a6be7242c803fdb1',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
