"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { siteContent, Language } from "@/lib/site-content"

type BuildSectionProps = {
  lang: Language
}

// 1. Avocado Animation Component (Replaces IsometricTiles)
function AvocadoAnimation() {
  return (
    <div className="relative mx-auto flex h-[380px] w-full max-w-lg items-center justify-center overflow-visible select-none my-4 z-10">
      {/* Looping video simulating a GIF of a walking avocado */}
      <video
        src="/videos/animation4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-96 h-96 object-contain select-none pointer-events-none relative z-10"
      />
    </div>
  )
}

// 2. Card 1: Subscriptions & Recurring (Using Apple Emojis, Clean Layout)
function SubscriptionsCard({ lang }: { lang: Language }) {
  const isEs = lang === "es"
  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-50/50 p-6 border border-zinc-100 hover:border-brand/40 shadow-xs transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl select-none">📅</span>
          <div>
            <h4 className="font-semibold text-zinc-900 text-base leading-snug">
              {isEs ? "Suscripciones y Recurrentes" : "Subscriptions & Recurring"}
            </h4>
            <p className="text-[9px] text-zinc-400 font-bold tracking-wider uppercase">
              {isEs ? "Cobros Automáticos" : "Automatic Billing"}
            </p>
          </div>
        </div>
        
        {/* Subscriptions List using Apple Emojis */}
        <div className="space-y-2 bg-white p-3 rounded-2xl border border-zinc-100/80 shadow-2xs relative min-h-[175px] flex flex-col justify-center">
          {/* Netflix */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50/50">
            <div className="flex items-center gap-3">
              <span className="text-xl select-none shrink-0">🎬</span>
              <div>
                <p className="text-[11px] font-bold text-zinc-800">Netflix</p>
                <p className="text-[8.5px] text-zinc-400">RD$899 / mes</p>
              </div>
            </div>
            <span className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full select-none shrink-0">
              {isEs ? "Cobrado" : "Paid"}
            </span>
          </div>

          {/* Spotify */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50/50 relative overflow-hidden">
            <div className="flex items-center gap-3">
              <span className="text-xl select-none shrink-0">🎵</span>
              <div>
                <p className="text-[11px] font-bold text-zinc-800">Spotify</p>
                <p className="text-[8.5px] text-zinc-400">RD$299 / mes</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
              </span>
              <span className="text-[8.5px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full select-none animate-pulse">
                {isEs ? "Mañana" : "Tomorrow"}
              </span>
            </div>
          </div>

          {/* Gym */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50/50">
            <div className="flex items-center gap-3">
              <span className="text-xl select-none shrink-0">🏋️</span>
              <div>
                <p className="text-[11px] font-bold text-zinc-800">{isEs ? "Gimnasio" : "Gym"}</p>
                <p className="text-[8.5px] text-zinc-400">RD$1,500 / mes</p>
              </div>
            </div>
            <span className="text-[8.5px] font-bold text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-full select-none shrink-0">
              {isEs ? "Día 25" : "Day 25"}
            </span>
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        {isEs 
          ? "Controla tus gastos fijos. Menudo procesa tus cobros recurrentes de forma automática y te notifica antes de cada cargo."
          : "Take control of fixed costs. Menudo automatically logs your recurring payments and notifies you before each charge."
        }
      </p>
    </div>
  )
}

// 3. Card 2: Auto Categorization (Form UI Replicated from the user's 3rd photo)
function AutoCategorizationCard({ lang }: { lang: Language }) {
  const isEs = lang === "es"
  
  const concepts = [
    { text: "Gasolina", amount: "RD$3,500", emoji: "🚗", cat: isEs ? "Transporte" : "Transport" },
    { text: "Starbucks", amount: "RD$350", emoji: "🍔", cat: isEs ? "Comida" : "Food" }
  ]

  const [index, setIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCategory, setShowCategory] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    const current = concepts[index]
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1))
      }, 50)
    } else {
      timer = setTimeout(() => {
        setDisplayText(current.text.slice(0, displayText.length + 1))
      }, 90)
    }

    if (!isDeleting && displayText === current.text) {
      setShowCategory(true)
      timer = setTimeout(() => {
        setIsDeleting(true)
      }, 2500)
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false)
      setShowCategory(false)
      setIndex(prev => (prev + 1) % concepts.length)
    } else {
      setShowCategory(false)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, index])

  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-50/50 p-6 border border-zinc-100 hover:border-brand/40 shadow-xs transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl select-none">✍️</span>
          <div>
            <h4 className="font-semibold text-zinc-900 text-base leading-snug">
              {isEs ? "Categorización Automática" : "Auto-Categorization"}
            </h4>
            <p className="text-[9px] text-zinc-400 font-bold tracking-wider uppercase">
              {isEs ? "Sugerencia en Vivo" : "Live Suggestion"}
            </p>
          </div>
        </div>

        {/* Simplified Form representation from the 3rd user photo */}
        <div className="bg-zinc-100/50 p-4 rounded-2xl border border-zinc-200/30 shadow-2xs relative flex flex-col gap-3 min-h-[175px]">
          
          {/* Top Options Row */}
          <div className="flex flex-wrap gap-1.5 select-none pointer-events-none">
            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 rounded-full text-[8.5px] font-semibold text-zinc-500">
              {isEs ? "Sin wallet" : "No wallet"}
            </span>
            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 rounded-full text-[8.5px] font-semibold text-zinc-500">
              {isEs ? "Una vez" : "Once"}
            </span>
            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 rounded-full text-[8.5px] font-semibold text-zinc-500">
              {isEs ? "Hoy" : "Today"}
            </span>
            <span className="px-2 py-0.5 bg-white border border-zinc-200/50 rounded-full text-[8.5px] font-semibold text-zinc-500">
              My list
            </span>
          </div>

          {/* Typing Concept Name (large, bold) */}
          <div className="text-xl font-bold text-zinc-900 font-sans tracking-tight min-h-[28px] mt-1 select-none">
            {displayText}
            <span className="animate-[blink_1s_infinite] font-light text-brand">|</span>
          </div>

          {/* Amount Display with +/- Toggle */}
          <div className="flex items-center gap-3">
            {/* Minus/Plus box */}
            <div className="flex items-center bg-white rounded-lg border border-zinc-200/60 p-0.5 shadow-2xs select-none">
              <span className="px-2.5 py-0.5 bg-[#ef6a6a] text-white text-[11px] font-extrabold rounded-md">-</span>
              <span className="px-2.5 py-0.5 text-zinc-400 text-[11px] font-semibold">+</span>
            </div>
            {/* Amount text */}
            <span className="text-base font-bold text-[#ef6a6a] font-mono">
              {concepts[index].amount}
            </span>
          </div>

          {/* Suggested Category Pill */}
          <div className={cn(
            "flex items-center justify-between bg-white border border-zinc-200/60 rounded-xl px-3 py-2 shadow-2xs transition-all duration-500 ease-out transform",
            showCategory ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"
          )}>
            <div className="flex items-center gap-2">
              <span className="text-base select-none">{concepts[index].emoji}</span>
              <span className="text-xs font-bold text-zinc-800">{concepts[index].cat}</span>
            </div>
            <span className="text-[10px] font-bold text-zinc-400">&gt;</span>
          </div>

          {/* Created by row */}
          <div className="flex items-center gap-1 mt-1 text-[9px] text-zinc-400 font-semibold select-none">
            <span>👤</span>
            <span>{isEs ? "Creado por Tú" : "Created by You"}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        {isEs 
          ? "Escribe de forma natural. La app clasifica el concepto al instante y le asigna el emoji de Apple perfecto de forma inteligente."
          : "Type naturally. The app instantly categorizes your entry and suggests the perfect Apple emoji intelligently."
        }
      </p>
    </div>
  )
}

// 4. Card 3: Shared Notifications (Frosted Glass iOS Notification Replicated from the 2nd user photo)
function SharedNotificationsCard({ lang }: { lang: Language }) {
  const isEs = lang === "es"
  const [showNotification, setShowNotification] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false)
      setTimeout(() => {
        setShowNotification(true)
      }, 500)
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-50/50 p-6 border border-zinc-100 hover:border-brand/40 shadow-xs transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl select-none">🔔</span>
          <div>
            <h4 className="font-semibold text-zinc-900 text-base leading-snug">
              {isEs ? "Listas Compartidas" : "Shared Lists & Alerts"}
            </h4>
            <p className="text-[9px] text-zinc-400 font-bold tracking-wider uppercase">
              {isEs ? "Notificaciones Push" : "Push Notifications"}
            </p>
          </div>
        </div>

        {/* iPhone Style Notification Container */}
        <div className="bg-zinc-100/30 p-2 rounded-2xl border border-zinc-200/20 shadow-2xs h-[175px] flex flex-col justify-start relative overflow-visible pt-10">
          
          {/* iOS Notification Banner (exactly matching the user photo with the real app logo) */}
          <div className={cn(
            "absolute inset-x-2 top-4 bg-black/75 backdrop-blur-lg text-white p-3 rounded-[1.2rem] shadow-xl border border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20 flex items-start gap-2.5",
            showNotification ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          )}>
            {/* Real Menudo Logo Image */}
            <img 
              src="/brand/menudo-logo.webp" 
              alt="Menudo Logo" 
              className="w-8 h-8 rounded-[8px] shrink-0 object-contain select-none pointer-events-none border border-white/5" 
            />
            
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/95 flex items-center gap-1">
                  <span className="text-xs">🛍️</span>
                  <span>Expense in compartida</span>
                </span>
                <span className="text-[8px] text-white/40 font-semibold select-none">3h ago</span>
              </div>
              <p className="text-[10px] leading-tight text-white/85 mt-1 select-none font-medium text-left">
                Analisduran25 added "Coffee" of DOP 950
              </p>
            </div>
          </div>

          {/* List Status below notification */}
          <div className="flex items-center justify-between mt-auto pt-2 px-2 border-t border-zinc-200/50">
            <div>
              <p className="text-[11px] font-bold text-zinc-800">{isEs ? "Lista Compartida" : "Shared List"}</p>
              <p className="text-[8.5px] text-zinc-400 font-bold">DOP 950 {isEs ? "añadido" : "added"}</p>
            </div>
            
            {/* Avatars */}
            <div className="flex -space-x-1.5 select-none pointer-events-none shrink-0">
              <div className="w-5.5 h-5.5 rounded-full bg-brand-soft border border-white flex items-center justify-center text-[7.5px] font-black text-brand">A</div>
              <div className="w-5.5 h-5.5 rounded-full bg-violet-100 border border-white flex items-center justify-center text-[7.5px] font-black text-violet-600">C</div>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-zinc-500">
        {isEs 
          ? "Sincronización en tiempo real. Recibe notificaciones push en tu pantalla cuando tu pareja registre nuevos gastos."
          : "Real-time synchronization. Receive push notifications on your screen when your partner logs new expenses."
        }
      </p>
    </div>
  )
}

// 5. Redesigned BuildSection Component
export function BuildSection({ lang }: BuildSectionProps) {
  const content = siteContent[lang].engine

  return (
    <section className="relative overflow-hidden bg-background px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Title Block without technical buttons */}
        <div className="mb-14 flex flex-col items-center gap-3">
          <span className="text-sm font-semibold tracking-widest text-brand uppercase">{content.eyebrow}</span>
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl max-w-2xl mt-2 text-balance">
            {content.title}
          </h2>
          <p className="text-center text-sm md:text-base text-foreground/60 max-w-lg mt-3 text-pretty">
            {content.body}
          </p>
        </div>

        {/* Walking Avocado Animation (GIF-like Loop) */}
        <AvocadoAnimation />

        {/* Dynamic features grid showcase */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <SubscriptionsCard lang={lang} />
          <AutoCategorizationCard lang={lang} />
          <SharedNotificationsCard lang={lang} />
        </div>
      </div>
    </section>
  )
}
