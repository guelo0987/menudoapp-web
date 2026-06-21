"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { siteContent, Language } from "@/lib/site-content"

type FaqSectionProps = {
  lang: Language
}

export function FaqSection({ lang }: FaqSectionProps) {
  const content = siteContent[lang].faqs
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="px-5 py-20 md:py-28 bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_2fr]">
        <h2 className="font-heading text-4xl font-semibold tracking-tight md:text-5xl text-zinc-900">{content.title}</h2>

        <div>
          <ul>
            {content.questions.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-lg font-medium text-foreground">{f.q}</span>
                    <span className="shrink-0 text-brand">
                      {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] leading-relaxed text-foreground/60">{f.a}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <a
            href="/support"
            className="mt-8 inline-flex rounded-full bg-muted px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10 cursor-pointer"
          >
            {content.primaryCta}
          </a>
        </div>
      </div>
    </section>
  )
}
