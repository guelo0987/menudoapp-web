"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Language } from "@/lib/site-content"
import { blogPosts } from "@/lib/blog-data"
import { altPath } from "@/lib/i18n"
import Link from "next/link"
import { ArrowLeft, Calendar } from "lucide-react"

export default function BlogDetailPageClient({ lang: langProp }: { lang?: Language } = {}) {
  const params = useParams()
  const slug = params.slug as string

  const [lang, setLang] = useState<Language>(langProp ?? "es")

  useEffect(() => {
    // Si la URL define el idioma, manda ella y no la preferencia guardada.
    if (langProp) return
    const saved = localStorage.getItem("menudo-lang") as Language
    if (saved === "es" || saved === "en") {
      setLang(saved)
    }
  }, [langProp])

  const localized = (href: string) => (lang === "en" ? altPath(href, "en") : href)

  const handleSetLang = (l: Language) => {
    setLang(l)
    localStorage.setItem("menudo-lang", l)
  }

  // Find the post in the selected language
  const post = blogPosts[lang].find((p) => p.slug === slug)

  const copy = lang === "es" ? {
    home: "Inicio",
    blog: "Blog",
    backToList: "Volver a la lista de artículos",
    notFound: "Artículo no encontrado",
  } : {
    home: "Home",
    blog: "Blog",
    backToList: "Back to articles",
    notFound: "Article not found",
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <SiteHeader lang={lang} setLang={handleSetLang} />
        <main className="flex-grow flex flex-col items-center justify-center p-5 text-center">
          <h1 className="font-heading text-2xl font-bold text-zinc-900 mb-4">{copy.notFound}</h1>
          <Link href={localized("/blog")} className="inline-flex items-center gap-2 text-brand font-bold text-sm">
            <ArrowLeft className="h-4 w-4" /> {copy.backToList}
          </Link>
        </main>
        <SiteFooter lang={lang} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <SiteHeader lang={lang} setLang={handleSetLang} />

      <main className="flex-grow mx-auto max-w-3xl w-full px-5 py-12 md:py-20">
        {/* Breadcrumbs matching the MonAi styling */}
        <nav className="flex items-center gap-1.5 text-xs text-foreground/45 mb-8 font-medium">
          <Link href={localized("/")} className="hover:text-foreground/80 transition-colors">
            {copy.home}
          </Link>
          <span>/</span>
          <Link href={localized("/blog")} className="hover:text-foreground/80 transition-colors">
            {copy.blog}
          </Link>
          <span>/</span>
          <span className="text-foreground/80 truncate max-w-[200px] sm:max-w-none">
            {post.title}
          </span>
        </nav>

        {/* Article Header */}
        <header className="mb-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl leading-tight text-balance">
            {post.title}
          </h1>
          
          <div className="mt-6 flex items-center gap-2 text-sm text-foreground/40 font-semibold border-b border-border pb-6">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-zinc max-w-none">
          <div className="space-y-6 text-foreground/80 text-base md:text-lg leading-relaxed text-pretty">
            {post.content.map((paragraph, index) => (
              <p key={index} className="first-letter:font-semibold first-letter:text-zinc-900">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-border">
          <Link 
            href={localized("/blog")} 
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" /> {copy.backToList}
          </Link>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
