"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Language } from "@/lib/site-content"
import { blogPosts } from "@/lib/blog-data"
import { altPath } from "@/lib/i18n"
import Link from "next/link"
import { BookOpen, Calendar, ArrowRight } from "lucide-react"

export default function BlogListPageClient({ lang: langProp }: { lang?: Language } = {}) {
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

  const posts = blogPosts[lang]

  // Los enlaces se quedan dentro del idioma actual.
  const localized = (href: string) => (lang === "en" ? altPath(href, "en") : href)

  const copy = lang === "es" ? {
    eyebrow: "Menudo Blog",
    title: "Hábitos financieros inteligentes",
    subtitle: "Consejos para el control de gastos, automatizaciones y actualizaciones de la aplicación.",
    readMore: "Leer artículo completo",
    searchPlaceholder: "Buscar artículos...",
    noResults: "No se encontraron artículos.",
  } : {
    eyebrow: "Menudo Blog",
    title: "Smart money habits",
    subtitle: "Expense tracking tips, automations, and product updates.",
    readMore: "Read full article",
    searchPlaceholder: "Search articles...",
    noResults: "No articles found.",
  }

  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="flex-grow mx-auto max-w-4xl w-full px-5 py-12 md:py-20">
        {/* Header Block exactly matching the clean style */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold tracking-widest text-brand uppercase">{copy.eyebrow}</span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60 text-pretty">
            {copy.subtitle}
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-12 max-w-md mx-auto">
          <input
            type="text"
            placeholder={copy.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-border bg-card px-5 py-3 text-sm outline-none placeholder:text-foreground/30 focus:border-brand focus:ring-2 focus:ring-brand/10 text-zinc-900 shadow-xs"
          />
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article 
                key={post.slug} 
                className="group relative rounded-[2rem] border border-border bg-card p-6 md:p-8 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-[2px]"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-foreground/40">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-zinc-900 group-hover:text-brand transition-colors">
                    <Link href={localized(`/blog/${post.slug}`)} className="focus:outline-none">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-foreground/75 leading-relaxed text-sm md:text-base text-pretty">
                    {post.snippet}
                  </p>

                  <div className="pt-2">
                    <Link 
                      href={localized(`/blog/${post.slug}`)} 
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:opacity-90 transition-opacity"
                    >
                      {copy.readMore} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 text-foreground/40 text-sm">
              {copy.noResults}
            </div>
          )}
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
