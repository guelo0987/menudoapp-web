"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { BorrowSection } from "@/components/borrow-section"
import { BuildSection } from "@/components/build-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { FaqSection } from "@/components/faq-section"
import { SiteFooter } from "@/components/site-footer"
import { Language } from "@/lib/site-content"

export default function Page() {
  const [lang, setLang] = useState<Language>('es')

  useEffect(() => {
    const saved = localStorage.getItem('menudo-lang') as Language
    if (saved === 'es' || saved === 'en') {
      setLang(saved)
    }
  }, [])

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem('menudo-lang', l)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} setLang={handleSetLang} />
      <main>
        <Hero lang={lang} />
        <BorrowSection lang={lang} />
        <BuildSection lang={lang} />
        <NewsletterSection lang={lang} />
        <FaqSection lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}

