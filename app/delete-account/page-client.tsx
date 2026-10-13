"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteContent, Language } from "@/lib/site-content"
import { Mail } from "lucide-react"
import Link from "next/link"

// Google Play exige un enlace web donde pedir que se borre la cuenta, que diga
// que datos se borran y cuales se conservan y cuanto tiempo. Lo que dice esta
// pagina es lo que hace `AuthService.deleteAccount` del backend (12 oct 2026):
// si eso cambia, esta pagina tambien.
type Seccion = { title: string; body: string; id?: string }
type Textos = {
  title: string
  intro: string
  sections: Seccion[]
  help: string
  helpBody: string
  support: string
  email: string
}

const copy: Record<Language, Textos> = {
  es: {
    title: "Eliminar tu cuenta de Menudo",
    intro:
      "Puedes eliminar tu cuenta de Menudo (Menudo - Control de Gastos, de Miguel Cruz) y tus datos cuando quieras: desde la app o escribiéndonos.",
    sections: [
      {
        title: "Desde la app (al momento)",
        body: "1. Abre Menudo y toca Ajustes (el engranaje, arriba a la derecha).\n2. Baja hasta el final y toca «Eliminar cuenta».\n3. Confirma.\n\nLa cuenta y los datos se borran en ese momento.",
      },
      {
        title: "Sin la app",
        body: "Escríbenos a soporte@menudoapp.com desde el correo con el que entras a Menudo (el de tu cuenta de Google o de Apple), con el asunto «Eliminar mi cuenta». La eliminamos en un máximo de 30 días y te confirmamos por correo.",
      },
      {
        id: "borrar-datos",
        title: "Borrar solo algunos datos, sin borrar tu cuenta",
        body: "• Desde la app puedes eliminar cuando quieras tus gastos e ingresos, tus categorías, tus carteras y tus listas.\n• Banking: en Ajustes › Conectar banco puedes desconectar tu correo; dejamos de leerlo y, si era Gmail, retiramos el permiso en tu cuenta de Google.\n• Cualquier otro dato: escríbenos a soporte@menudoapp.com desde el correo de tu cuenta diciendo qué quieres borrar. Lo borramos en un máximo de 30 días y te confirmamos por correo.",
      },
      {
        title: "Qué se borra",
        body: "• Tus gastos e ingresos y tus gastos recurrentes.\n• Tus listas que no compartes con nadie, con sus categorías y presupuestos.\n• Tus carteras.\n• La conexión de Banking con tu correo. Si era Gmail, retiramos también el permiso en tu cuenta de Google.\n• Tu perfil, tu registro de suscripción y tu acceso (ya no podrás entrar con esa cuenta).",
      },
      {
        title: "Qué se conserva y cuánto tiempo",
        body: "• Listas compartidas: si compartes una lista con otras personas, la lista sigue para ellas y pasa al miembro más antiguo. Tus gastos dentro de esa lista sí se borran.\n• Copias de seguridad automáticas de la base de datos: hasta 7 días; después se borran solas.\n• Un aviso técnico por cada gasto borrado, sin montos ni descripciones, para que también desaparezca de los teléfonos de tu lista compartida.\n• Estadísticas de uso de la app y reportes de errores: se conservan según los plazos de nuestros proveedores de analítica.\n• El historial de compras lo guardan Apple o Google, como exige el cobro de las suscripciones.",
      },
      {
        title: "Tu suscripción no se cancela sola",
        body: "Eliminar la cuenta no cancela la suscripción: la cobra Apple o Google, no Menudo. Cancélala antes: en el iPhone, Ajustes › tu nombre › Suscripciones; en Android, Google Play › tu foto › Pagos y suscripciones › Suscripciones.",
      },
    ],
    help: "¿Necesitas ayuda?",
    helpBody: "Si tienes dudas sobre qué se borra o no puedes entrar a la app, escríbenos.",
    support: "Ir a Soporte",
    email: "Escribir correo",
  },
  en: {
    title: "Delete your Menudo account",
    intro:
      "You can delete your Menudo account (Menudo - Control de Gastos, by Miguel Cruz) and your data at any time: from the app or by writing to us.",
    sections: [
      {
        title: "From the app (immediately)",
        body: "1. Open Menudo and tap Settings (the gear, top right).\n2. Scroll to the bottom and tap “Delete account”.\n3. Confirm.\n\nYour account and data are deleted right away.",
      },
      {
        title: "Without the app",
        body: "Email soporte@menudoapp.com from the address you sign in to Menudo with (your Google or Apple account), with the subject “Delete my account”. We delete it within 30 days and confirm by email.",
      },
      {
        id: "borrar-datos",
        title: "Delete only some data, without deleting your account",
        body: "• In the app you can delete your expenses and income, your categories, your wallets and your lists at any time.\n• Banking: in Settings › Connect bank you can disconnect your email; we stop reading it and, if it was Gmail, we also revoke the permission in your Google account.\n• Any other data: email soporte@menudoapp.com from your account's address saying what you want deleted. We delete it within 30 days and confirm by email.",
      },
      {
        title: "What gets deleted",
        body: "• Your expenses and income, and your recurring transactions.\n• Your lists that you don't share with anyone, with their categories and budgets.\n• Your wallets.\n• The Banking connection to your email. If it was Gmail, we also revoke the permission in your Google account.\n• Your profile, your subscription record and your sign-in (you won't be able to sign in with that account again).",
      },
      {
        title: "What is kept, and for how long",
        body: "• Shared lists: if you share a list with other people, it stays for them and passes to the oldest member. Your own transactions in that list are deleted.\n• Automatic database backups: up to 7 days; then they are deleted automatically.\n• A technical notice for each deleted transaction, with no amounts or descriptions, so it also disappears from the phones of your shared list.\n• App usage statistics and error reports: kept according to our analytics providers' retention periods.\n• Purchase history is kept by Apple or Google, as required to bill subscriptions.",
      },
      {
        title: "Your subscription is not cancelled automatically",
        body: "Deleting your account does not cancel your subscription: Apple or Google bills it, not Menudo. Cancel it first: on iPhone, Settings › your name › Subscriptions; on Android, Google Play › your profile picture › Payments & subscriptions › Subscriptions.",
      },
    ],
    help: "Need help?",
    helpBody: "If you have questions about what gets deleted or can't open the app, write to us.",
    support: "Go to Support",
    email: "Write email",
  },
}

export default function DeleteAccountPageClient({ lang: langProp }: { lang?: Language } = {}) {
  const [lang, setLang] = useState<Language>(langProp ?? "es")

  useEffect(() => {
    // Si la URL define el idioma, manda ella y no la preferencia guardada.
    if (langProp) return
    const saved = localStorage.getItem("menudo-lang") as Language
    if (saved === "es" || saved === "en") {
      setLang(saved)
    }
  }, [langProp])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("menudo-lang", l)
  }

  const t = copy[lang]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="mx-auto max-w-4xl px-5 py-12 md:py-20">
        <div className="mb-12">
          <span className="text-sm font-semibold tracking-widest text-brand uppercase">Menudo App</span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/60 leading-relaxed text-pretty">
            {t.intro}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {t.sections.map((section, idx) => (
            <article key={idx} id={section.id} className="scroll-mt-24 rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">{section.title}</h2>
              <p className="text-foreground/75 leading-relaxed text-pretty whitespace-pre-line text-[15px]">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[2.5rem] bg-zinc-950 p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-white mb-3">{t.help}</h2>
            <p className="text-zinc-400 text-sm leading-relaxed">{t.helpBody}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href={lang === "en" ? "/en/support" : "/support"}
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              {t.support}
            </Link>
            <a
              href={`mailto:${siteContent.brand.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Mail className="h-4 w-4" />
              {t.email}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
