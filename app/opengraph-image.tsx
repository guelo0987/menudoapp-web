import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Menudo — Finanzas Claras. Sin Esfuerzo.'

/**
 * Imagen que se muestra al compartir el enlace en WhatsApp, IG, X, Slack, etc.
 * Se genera en el build; no hace falta mantener un PNG a mano.
 * Colores muestreados del logo real de la marca.
 *
 * Ojo: el renderizador (Satori) exige `display: flex` explícito en todo div con
 * más de un hijo, y no soporta <br />. De ahí que cada línea sea su propio div.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#F8FBF7',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: 8,
            color: '#2BB673',
            marginBottom: 28,
          }}
        >
          MENUDO
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              color: '#14231C',
            }}
          >
            Finanzas claras.
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -3,
              color: '#14231C',
            }}
          >
            Sin esfuerzo.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 32,
            fontSize: 34,
            color: '#4A5A52',
          }}
        >
          Háblale y anota tus gastos. Funciona sin internet.
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 44,
          }}
        >
          <div
            style={{
              display: 'flex',
              background: '#2D5C49',
              color: '#F8FBF7',
              fontSize: 28,
              fontWeight: 700,
              padding: '14px 32px',
              borderRadius: 999,
            }}
          >
            Gratis en la App Store
          </div>
          <div style={{ display: 'flex', marginLeft: 20, fontSize: 26, color: '#8A968F' }}>
            menudoapp.com
          </div>
        </div>
      </div>
    ),
    size,
  )
}
