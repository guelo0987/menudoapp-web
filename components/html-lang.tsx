"use client"

import { useEffect } from "react"

/**
 * Corrige el atributo `lang` del <html> en las rutas en inglés.
 *
 * El layout raíz de App Router es único y no puede leer la ruta, así que el
 * HTML inicial sale con lang="es". Google declara que ignora este atributo para
 * detectar idioma (usa el contenido y los hreflang, que sí están correctos),
 * pero Bing, los lectores de pantalla y los traductores del navegador sí lo
 * usan — por eso se ajusta al hidratar.
 */
export function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  return null
}
