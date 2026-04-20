# Menudo Web

Web pública de Menudo creada con React + Vite.

## Qué incluye

- Landing simple y moderna alineada con los colores del app
- Páginas de `Privacy Policy`, `Terms`, `Support` y `Privacy & Account Choices`
- Estructura limpia con copy centralizado en `src/content/site.ts`
- Placeholders de logo y screenshots en `public/placeholders`
- `vercel.json` para servir rutas internas como SPA en Vercel

## Estructura

- `src/content/site.ts`: branding, textos, links, soporte y legal
- `src/components/`: bloques reutilizables
- `src/pages/`: páginas principales
- `src/styles/`: tokens visuales y layout
- `public/placeholders/`: assets de reemplazo

## Variables

Copia `.env.example` a `.env` y define lo que aplique:

- `VITE_SITE_URL`
- `VITE_SUPPORT_EMAIL`
- `VITE_SUPPORT_PHONE`
- `VITE_SUPPORT_ADDRESS`
- `VITE_APP_STORE_URL`
- `VITE_PLAY_STORE_URL`
- `VITE_INSTAGRAM_URL`
- `VITE_TIKTOK_URL`

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Lo que falta para dejarlo final

1. Logo real de Menudo en SVG o PNG
2. Screenshots/mockups reales del app
3. Copy legal final revisado
4. Dirección legal, teléfono y correo final de soporte
5. Links reales de App Store / Play Store / redes

## Dónde cambiar el contenido

No necesitas editar componentes para cambiar textos o links.

Todo vive en:

```ts
src/content/site.ts
```
