"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Language } from "@/lib/site-content"

/**
 * Pagina de "como funciona conectar tu banco".
 *
 * Existe porque **Gmail borra toda etiqueta <img> del cuerpo de un correo**
 * (comprobado con URL remota y con adjunto cid). Las capturas no caben en el
 * correo, asi que el correo enlaza aqui. De paso sirve para la bio de
 * Instagram, los DM y las respuestas a comentarios, que es donde la gente
 * tambien pregunta como funciona.
 *
 * Todo lo que se afirma aqui esta comprobado contra el backend:
 *   - solo lectura        -> `gmail.readonly` y `Mail.Read`
 *   - 3 bancos por lista  -> `CUPO_POR_LISTA = 3` en banking/vinculaciones.ts
 *   - se borra a los 30 d -> `DIAS_QUE_SE_GUARDA_EL_CORREO = 30` en banking.job.ts
 *   - nada se anota solo  -> cada movimiento llega como propuesta
 */

const CORREO =
  "mailto:soporte@menudoapp.com?subject=Mi%20banco&body=Mi%20banco%20es%3A%20"

const PASOS = [
  {
    n: 1,
    titulo: "Eliges tu banco",
    texto:
      "Popular, BHD o Banreservas. Scotiabank viene en camino. Si el tuyo no está, dínoslo igual.",
    img: "/banco/elegir-banco.webp",
    alt: "Pantalla de Menudo para elegir el banco: Banco BHD seleccionado, Banco Popular, Banreservas y Scotiabank marcado como Pronto.",
  },
  {
    n: 2,
    titulo: "Menudo lee el aviso y tú decides",
    texto:
      "Cada movimiento te llega como propuesta, con el correo original del banco a la vista y la categoría ya puesta. Le das a Agregar, o lo descartas.",
    img: "/banco/movimiento.webp",
    alt: "Un movimiento pendiente de revisar en Menudo: BRAVO OZAMA por RD$638.00 del Banco BHD, categorizado como Comida y Bebida, con los botones de descartar y Agregar.",
  },
]

const GARANTIAS = [
  {
    titulo: "Solo lectura",
    texto:
      "Menudo lee los correos que tu banco ya te manda. No entra a tu banco, no ve tus claves y no puede mover dinero.",
  },
  {
    titulo: "Nada se anota solo",
    texto:
      "Todo movimiento llega como propuesta. Si no le das a Agregar, no entra a tus cuentas.",
  },
  {
    titulo: "Se borra a los 30 días",
    texto:
      "El texto del correo del banco se elimina automáticamente al mes. Solo queda el gasto que tú aceptaste.",
  },
  {
    titulo: "Lo desconectas cuando quieras",
    texto:
      "Desde Ajustes, en un toque. Puedes tener hasta 3 bancos conectados por lista.",
  },
]

export default function BancoPageClient() {
  const [lang, setLang] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem("menudo-lang") as Language
    if (saved === "es" || saved === "en") setLang(saved)
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("menudo-lang", l)
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-14 sm:pt-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#ED7F28]">
          Nuevo en Menudo
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-[#14231C] sm:text-5xl">
          Tu banco te escribe.
          <br />
          Menudo lo lee por ti.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#4A574F]">
          Menudo lee los avisos que tu banco ya te manda por correo, saca el
          movimiento y te lo propone.{" "}
          <strong className="font-semibold text-[#14231C]">
            Tú decides cuáles entran.
          </strong>
        </p>

        <a
          href={CORREO}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-[#ED7F28] px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
        >
          Escríbeme con el nombre de tu banco
        </a>

        <div className="mt-16 space-y-16">
          {PASOS.map((paso) => (
            <section key={paso.n}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#ED7F28] text-base font-bold text-white">
                  {paso.n}
                </span>
                <h2 className="text-xl font-bold text-[#14231C] sm:text-2xl">
                  {paso.titulo}
                </h2>
              </div>
              <p className="mt-3 max-w-xl leading-relaxed text-[#4A574F]">
                {paso.texto}
              </p>
              <img
                src={paso.img}
                alt={paso.alt}
                width={822}
                height={paso.n === 1 ? 737 : 670}
                loading="lazy"
                className="mt-6 w-full rounded-2xl border border-black/5 bg-[#F1F3F4]"
              />
            </section>
          ))}
        </div>

        <section className="mt-20 rounded-3xl bg-[#2D5C49] p-7 sm:p-10">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Lo que Menudo no hace
          </h2>
          <dl className="mt-7 grid gap-7 sm:grid-cols-2">
            {GARANTIAS.map((g) => (
              <div key={g.titulo}>
                <dt className="font-bold text-white">{g.titulo}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-white/75">
                  {g.texto}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-[#14231C]">
            ¿Lo quieres probar?
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-[#4A574F]">
            Vamos abriendo por tandas. Escríbeme con el nombre de tu banco y te
            activo el acceso.
          </p>
          <a
            href={CORREO}
            className="mt-7 inline-flex items-center justify-center rounded-full bg-[#ED7F28] px-8 py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
          >
            Responde con tu banco
          </a>
          <p className="mt-4 text-sm text-[#6B7A72]">soporte@menudoapp.com</p>
        </section>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
