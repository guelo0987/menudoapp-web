"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Language } from "@/lib/site-content"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const [lang, setLang] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem("menudo-lang") as Language
    if (saved === "es" || saved === "en") {
      setLang(saved)
    }
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("menudo-lang", l)
  }

  const copy =
    lang === "es"
      ? {
          eyebrow: "Error 404",
          title: "Página no encontrada",
          body: "Lo sentimos, la página que estás buscando no existe, ha sido eliminada o cambió de dirección.",
          cta: "Volver al inicio",
        }
      : {
          eyebrow: "Error 404",
          title: "Page Not Found",
          body: "Sorry, the page you are looking for does not exist, has been removed, or has changed its address.",
          cta: "Back to home",
        }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative overflow-hidden">
      {/* Premium avocado radial gradient glow in background */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] -z-10 bg-[radial-gradient(ellipse_at_bottom_center,rgba(74,222,128,0.2)_0%,rgba(163,230,53,0.08)_30%,rgba(255,255,255,0)_70%)]" />

      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="flex-grow flex items-center justify-center px-5 py-16 md:py-24 z-10 relative">
        {/* Giant decorative 404 backdrop text */}
        <div className="font-heading text-[12rem] md:text-[18rem] font-extrabold tracking-tighter text-zinc-900/[0.03] select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          404
        </div>

        <div className="w-full max-w-[460px] rounded-[2.5rem] border border-border bg-card p-8 md:p-10 shadow-md text-center animate-in fade-in zoom-in duration-500 relative z-10">
          {/* Error Badge */}
          <span className="inline-block text-[10px] font-bold tracking-widest text-red-500 bg-red-50 border border-red-200/50 px-3.5 py-1.5 rounded-full uppercase mb-6 shadow-xs select-none">
            {copy.eyebrow}
          </span>

          {/* Title */}
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-zinc-900 mb-4 text-balance">
            {copy.title}
          </h1>

          {/* Description */}
          <p className="text-foreground/60 leading-relaxed text-sm md:text-base mb-8 max-w-sm mx-auto">
            {copy.body}
          </p>

          {/* Action Button */}
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-base font-bold text-brand-foreground shadow-md transition-all hover:scale-[1.02] hover:opacity-95 active:scale-98 cursor-pointer hover:shadow-lg"
          >
            <ArrowLeft className="h-5 w-5" /> {copy.cta}
          </Link>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
