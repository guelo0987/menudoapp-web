"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteContent, Language } from "@/lib/site-content"
import { Sparkles, ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePageClient() {
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

  const copy = siteContent[lang].terms
  const isEs = lang === "es"

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="mx-auto max-w-4xl px-5 py-12 md:py-20">
        <div className="mb-12">
          <span className="text-sm font-semibold tracking-widest text-brand uppercase">Menudo App</span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-4 text-lg text-foreground/60 leading-relaxed text-pretty">
            {copy.intro}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {copy.sections.map((section, idx) => (
            <article key={idx} className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900 mb-4">{section.title}</h2>
              <p className="text-foreground/75 leading-relaxed text-pretty whitespace-pre-line text-[15px]">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        {/* Legal CTA Banner */}
        <div className="mt-16 rounded-[2.5rem] bg-zinc-950 p-8 md:p-12 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-white mb-3">
              {isEs ? "¿Preguntas sobre los términos?" : "Questions about the terms?"}
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {isEs 
                ? "Si necesitas aclaración sobre las condiciones de sincronización offline o cobros, ponte en contacto con nosotros."
                : "If you need clarification about offline sync rules or subscription billing, please reach out."
              }
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/support"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
            >
              {isEs ? "Ir a Soporte" : "Go to Support"}
            </Link>
            <a
              href={`mailto:${siteContent.brand.supportEmail}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              <Mail className="h-4 w-4" />
              {isEs ? "Escribir Correo" : "Write Email"}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
