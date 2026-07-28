"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Language } from "@/lib/site-content"
import { MenudoMark } from "@/components/menudo-logo"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Apple SVG Icon
function AppleIcon() {
  return (
    <svg className="h-5 w-5 fill-current text-zinc-900" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-1.01 2.96 1.07.08 2.18-.54 2.84-1.35Z" />
    </svg>
  )
}

// Play Store SVG Icon
function PlayStoreIcon() {
  return (
    <svg className="h-5 w-5 fill-current text-zinc-900" viewBox="0 0 24 24">
      <path d="M5 3.00005C4.65 3.00005 4.3 3.10005 4 3.30005L13.65 12.95L18.35 8.25005L5 3.00005ZM3.3 4.25005C3.1 4.50005 3 4.85005 3 5.25005V18.75C3 19.15 3.1 19.5 3.3 19.75L12.25 11.55L3.3 4.25005ZM13.65 14.35L4 23.95C4.3 24.15 4.65 24.25 5 24.25C6 24.25 7.15 23.8 8.25 23.35L18.35 18.95L13.65 14.35ZM19.85 9.75005L14.95 12.95L19.85 16.15C20.65 15.65 21 14.85 21 13.95V11.95C21 11.05 20.65 10.25 19.85 9.75005Z" />
    </svg>
  )
}

export default function InvitationJoinPageClient() {
  const [lang, setLang] = useState<Language>("es")
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("menudo-lang") as Language
    if (saved === "es" || saved === "en") {
      setLang(saved)
    }

    const params = new URLSearchParams(window.location.search)
    const t = params.get("token")
    setToken(t)

    if (t) {
      // Attempt automatic deep link redirect
      window.location.href = `menudo://invitations/join?token=${t}`
    }
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("menudo-lang", l)
  }

  const handleOpenApp = () => {
    if (token) {
      window.location.href = `menudo://invitations/join?token=${token}`
    } else {
      window.location.href = "menudo://invitations/join"
    }
  }

  const appStoreUrl = "https://apps.apple.com/do/app/menudo-budget-expense/id6773500340?l=en-GB"

  const copy =
    lang === "es"
      ? {
          eyebrow: "Lista compartida",
          title: "Te han invitado a una lista",
          copy: "Únete a una lista de gastos compartida en Menudo. Registra gastos en común y mantén tu presupuesto familiar o de pareja bajo control.",
          cta: "Abrir en Menudo",
          noApp: "¿No tienes la app instalada?",
          appStore: "App Store",
          playStore: "Play Store",
          back: "Volver al inicio",
        }
      : {
          eyebrow: "Shared List",
          title: "You've been invited",
          copy: "Join a shared expense list in Menudo. Track shared expenses and keep your family or couple budget under control.",
          cta: "Open in Menudo",
          noApp: "Don't have the app installed?",
          appStore: "App Store",
          playStore: "Play Store",
          back: "Back to home",
        }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative overflow-hidden">
      {/* Premium avocado radial gradient glow in background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] -z-10 bg-[radial-gradient(ellipse_at_bottom_center,rgba(74,222,128,0.2)_0%,rgba(163,230,53,0.08)_30%,rgba(255,255,255,0)_70%)]" />

      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="flex-grow flex items-center justify-center px-5 py-12 md:py-20 z-10">
        <div className="w-full max-w-[460px] rounded-[2.5rem] border border-border bg-card p-8 md:p-10 shadow-md text-center animate-in fade-in zoom-in duration-500">
          
          {/* Brand Pill Badge */}
          <span className="inline-block text-[10px] font-bold tracking-widest text-brand bg-brand-soft border border-brand/10 px-3.5 py-1.5 rounded-full uppercase mb-6 shadow-xs select-none">
            {copy.eyebrow}
          </span>

          {/* Menudo Logo Mark inside a premium container */}
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs transition-transform hover:scale-105 duration-300">
              <MenudoMark className="h-12 w-12" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 mb-4 text-balance">
            {copy.title}
          </h1>

          {/* Description */}
          <p className="text-foreground/60 leading-relaxed text-sm md:text-base mb-8 max-w-sm mx-auto">
            {copy.copy}
          </p>

          <div className="flex flex-col gap-5 w-full">
            {/* Primary deep link action */}
            <button
              onClick={handleOpenApp}
              className="w-full inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-base font-bold text-brand-foreground shadow-md transition-all hover:scale-[1.02] hover:opacity-95 active:scale-98 cursor-pointer hover:shadow-lg"
            >
              {copy.cta}
            </button>

            {/* Download app section */}
            <div className="mt-4 border-t border-zinc-200/60 pt-6 w-full">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4 select-none">
                {copy.noApp}
              </p>
              
              <div className="flex gap-3 justify-center items-center">
                {/* Active Apple App Store Download Button */}
                <a
                  href={appStoreUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-xs hover:bg-zinc-100 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer"
                >
                  <AppleIcon />
                  {copy.appStore}
                </a>

                {/* Inactive Google Play Store Download Button */}
                <div className="relative inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 opacity-45 grayscale select-none cursor-not-allowed">
                  <PlayStoreIcon />
                  {copy.playStore}
                  <span className="absolute -top-2 -right-2.5 bg-emerald-500 text-white font-heading text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-emerald-400 select-none animate-pulse">
                    {lang === "es" ? "Próximamente" : "Soon"}
                  </span>
                </div>
              </div>
            </div>

            {/* Back Home Link */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-800 transition-colors mt-4 self-center"
            >
              <ArrowLeft className="h-4 w-4" /> {copy.back}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
