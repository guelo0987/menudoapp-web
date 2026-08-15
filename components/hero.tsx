"use client"

import { useState, useEffect, useRef } from "react"
import { PhoneMockup } from "@/components/phone-mockup"
import { siteContent, Language } from "@/lib/site-content"
import { cn } from "@/lib/utils"

type HeroProps = {
  lang: Language
}

export function Hero({ lang }: HeroProps) {
  const content = siteContent[lang].hero
  const [mounted, setMounted] = useState(false)
  const [frontIndex, setFrontIndex] = useState(1) // 0: Left, 1: Center, 2: Right

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFrontIndex((prev) => (prev + 1) % 3)
    }, 2000)
    return () => clearInterval(interval)
  }, [frontIndex])

  const renderTitle = () => {
    const title = content.title
    const esPhrase = "Sin esfuerzo."
    const enPhrase = "Effortlessly."
    
    if (lang === "es") {
      const idx = title.indexOf(esPhrase)
      if (idx !== -1) {
        return (
          <>
            {title.slice(0, idx)}
            <span className="bg-gradient-to-r from-brand to-emerald-600 bg-clip-text text-transparent">
              {esPhrase}
            </span>
          </>
        )
      }
    } else {
      const idx = title.indexOf(enPhrase)
      if (idx !== -1) {
        return (
          <>
            {title.slice(0, idx)}
            <span className="bg-gradient-to-r from-brand to-emerald-600 bg-clip-text text-transparent">
              {enPhrase}
            </span>
          </>
        )
      }
    }
    return title
  }

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Premium avocado radial gradient glow behind the phones at the bottom, matching Aave's design */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[600px] -z-10 bg-[radial-gradient(ellipse_at_bottom_center,rgba(74,222,128,0.25)_0%,rgba(163,230,53,0.12)_30%,rgba(255,255,255,0)_70%)]" />

      <div className="mx-auto max-w-6xl px-5 pt-16 text-center md:pt-24">
        {/* Hero Title */}
        <h1 className="font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-[5.5rem] text-zinc-900">
          {renderTitle()}
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/60 text-pretty md:text-xl">
          {content.body}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/do/app/menudo-budget-expense/id6773500340?l=en-GB"
            className="transition-transform active:scale-95 hover:scale-[1.03] duration-200"
          >
            <img
              src="/apple-badge.svg"
              alt="Download on the App Store"
              className="h-[44px] w-auto select-none"
            />
          </a>
          <div className="relative cursor-not-allowed select-none transition-transform hover:scale-[1.01] duration-200">
            <img
              src="/google-badge.svg"
              alt="Get it on Play Store (Coming Soon)"
              className="h-[44px] w-auto opacity-45 select-none grayscale"
            />

            <span className="absolute -top-2.5 -right-2 bg-emerald-500 text-white font-heading text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-emerald-400 select-none animate-pulse">
              {lang === "es" ? "Próximamente" : "Coming Soon"}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 hidden md:flex max-w-4xl h-[620px] items-end justify-center px-5 md:mt-16 pb-12 group/stack overflow-visible">
        {/* Card 0 - Budgets */}
        <img
          src="/app-screenshots/427shots_so.webp"
          alt="Menudo App Screen Left"
          className={cn(
            "w-[280px] h-auto shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-none absolute bottom-12 left-1/2 origin-bottom",
            (0 - frontIndex + 3) % 3 === 0
              ? "-translate-x-1/2 scale-105 translate-y-0 rotate-0 z-20 opacity-100"
              : (0 - frontIndex + 3) % 3 === 1
              ? "-translate-x-[calc(50%-100px)] scale-90 translate-y-6 rotate-[6deg] z-10 opacity-70"
              : "-translate-x-[calc(50%+100px)] scale-90 translate-y-6 -rotate-[6deg] z-10 opacity-70"
          )}
        />
        {/* Card 1 - Overview */}
        <img 
          src="/app-screenshots/809shots_so.webp"
          alt="Menudo App Screen Center"
          className={cn(
            "w-[280px] h-auto shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-none absolute bottom-12 left-1/2 origin-bottom",
            (1 - frontIndex + 3) % 3 === 0
              ? "-translate-x-1/2 scale-105 translate-y-0 rotate-0 z-20 opacity-100"
              : (1 - frontIndex + 3) % 3 === 1
              ? "-translate-x-[calc(50%-100px)] scale-90 translate-y-6 rotate-[6deg] z-10 opacity-70"
              : "-translate-x-[calc(50%+100px)] scale-90 translate-y-6 -rotate-[6deg] z-10 opacity-70"
          )}
        />
        {/* Card 2 - Analytics */}
        <img
          src="/app-screenshots/CUARTA.webp"
          alt="Menudo App Screen Right"
          className={cn(
            "w-[280px] h-auto shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] select-none pointer-events-none absolute bottom-12 left-1/2 origin-bottom",
            (2 - frontIndex + 3) % 3 === 0
              ? "-translate-x-1/2 scale-105 translate-y-0 rotate-0 z-20 opacity-100"
              : (2 - frontIndex + 3) % 3 === 1
              ? "-translate-x-[calc(50%-100px)] scale-90 translate-y-6 rotate-[6deg] z-10 opacity-70"
              : "-translate-x-[calc(50%+100px)] scale-90 translate-y-6 -rotate-[6deg] z-10 opacity-70"
          )}
        />
      </div>

      {/* Dynamic 3D Card Stack (Mobile only, replaces carousel) */}
      <div className="relative mx-auto mt-12 flex md:hidden flex-col items-center w-full px-5 pb-12 overflow-visible">
        <div 
          onClick={() => setFrontIndex((prev) => (prev + 1) % 3)}
          className="relative w-full max-w-[340px] h-[450px] flex items-end justify-center cursor-pointer select-none overflow-visible"
        >
          {/* Card 0 - Budgets */}
          <img
            src="/app-screenshots/427shots_so.webp"
            alt="Menudo App Screen Left"
            className={cn(
              "w-[210px] h-auto shrink-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] absolute bottom-8 left-1/2 select-none pointer-events-none origin-bottom",
              (0 - frontIndex + 3) % 3 === 0
                ? "-translate-x-1/2 scale-105 translate-y-0 rotate-0 z-20 opacity-100"
                : (0 - frontIndex + 3) % 3 === 1
                ? "-translate-x-[calc(50%-70px)] scale-90 translate-y-4 rotate-[6deg] z-10 opacity-70"
                : "-translate-x-[calc(50%+70px)] scale-90 translate-y-4 -rotate-[6deg] z-10 opacity-70"
            )}
          />
          {/* Card 1 - Overview */}
          <img 
            src="/app-screenshots/809shots_so.webp"
            alt="Menudo App Screen Center"
            className={cn(
              "w-[210px] h-auto shrink-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] absolute bottom-8 left-1/2 select-none pointer-events-none origin-bottom",
              (1 - frontIndex + 3) % 3 === 0
                ? "-translate-x-1/2 scale-105 translate-y-0 rotate-0 z-20 opacity-100"
                : (1 - frontIndex + 3) % 3 === 1
                ? "-translate-x-[calc(50%-70px)] scale-90 translate-y-4 rotate-[6deg] z-10 opacity-70"
                : "-translate-x-[calc(50%+70px)] scale-90 translate-y-4 -rotate-[6deg] z-10 opacity-70"
            )}
          />
          {/* Card 2 - Analytics */}
          <img
            src="/app-screenshots/CUARTA.webp"
            alt="Menudo App Screen Right"
            className={cn(
              "w-[210px] h-auto shrink-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] absolute bottom-8 left-1/2 select-none pointer-events-none origin-bottom",
              (2 - frontIndex + 3) % 3 === 0
                ? "-translate-x-1/2 scale-105 translate-y-0 rotate-0 z-20 opacity-100"
                : (2 - frontIndex + 3) % 3 === 1
                ? "-translate-x-[calc(50%-70px)] scale-90 translate-y-4 rotate-[6deg] z-10 opacity-70"
                : "-translate-x-[calc(50%+70px)] scale-90 translate-y-4 -rotate-[6deg] z-10 opacity-70"
            )}
          />
        </div>
        <p className="mt-6 text-xs font-semibold text-zinc-400 select-none animate-pulse">
          {lang === "es" ? "Toca para girar las pantallas" : "Tap to rotate screens"}
        </p>
      </div>
    </section>
  )
}
