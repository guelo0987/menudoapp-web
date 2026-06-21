"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { MenudoLogo } from "@/components/menudo-logo"
import { cn } from "@/lib/utils"
import { siteContent, Language } from "@/lib/site-content"
import Link from "next/link"

type SiteHeaderProps = {
  lang: Language
  setLang: (lang: Language) => void
}

export function SiteHeader({ lang, setLang }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const content = siteContent[lang].header

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
        <Link href="/" aria-label="Menudo home" className="shrink-0">
          <MenudoLogo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
          {content.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-[15px] font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground/85 transition-colors hover:bg-muted"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <Link
            href="/support"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-opacity hover:opacity-90 md:inline-flex"
          >
            {content.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background md:hidden",
          open ? "max-h-80" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
          {content.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-lg px-2 py-3 text-base font-medium text-foreground/80 hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/support"
            className="mt-2 rounded-full bg-brand px-5 py-3 text-center text-sm font-semibold text-brand-foreground"
            onClick={() => setOpen(false)}
          >
            {content.cta}
          </Link>
        </nav>
      </div>
    </header>
  )
}
