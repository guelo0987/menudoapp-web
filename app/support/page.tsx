"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { siteContent, Language } from "@/lib/site-content"
import { sendSupportMessage } from "@/app/actions/resend"
import { CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const [lang, setLang] = useState<Language>("es")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

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

  const copy = lang === "es" ? {
    eyebrow: "Soporte Técnico",
    title: "¿Cómo podemos ayudarte?",
    subtitle: "Envíanos un mensaje o utiliza nuestros canales oficiales de contacto.",
    nameLabel: "Nombre",
    emailLabel: "Correo electrónico",
    messageLabel: "Mensaje",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "correo@ejemplo.com",
    messagePlaceholder: "¿En qué te podemos ayudar?",
    submitBtn: "Enviar mensaje",
    submitBtnSending: "Enviando...",
    submitBtnSuccess: "¡Mensaje enviado!",
    successTitle: "¡Mensaje enviado con éxito!",
    successBody: "Gracias por ponerte en contacto con nosotros. Te responderemos al correo proporcionado lo antes posible.",
    errorBody: "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.",
    backHome: "Volver al inicio",
    downloadTitle: "Lleva Menudo contigo",
    downloadSubtitle: "Controla tus gastos diarios y compartidos de forma sencilla y sin conexión.",
    qrLabel: "Escanea para descargar",
  } : {
    eyebrow: "Technical Support",
    title: "How can we help you?",
    subtitle: "Send us a message or reach out through our official contact channels.",
    nameLabel: "Name",
    emailLabel: "Email address",
    messageLabel: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "email@example.com",
    messagePlaceholder: "How can we help you?",
    submitBtn: "Send message",
    submitBtnSending: "Sending...",
    submitBtnSuccess: "Message sent!",
    successTitle: "Message sent successfully!",
    successBody: "Thank you for reaching out. We will get back to you at the email address provided as soon as possible.",
    errorBody: "There was an error sending your message. Please try again.",
    backHome: "Back to home",
    downloadTitle: "Take Menudo with you",
    downloadSubtitle: "Track your daily and shared expenses easily, even offline.",
    qrLabel: "Scan to download",
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    setStatus("sending")
    const result = await sendSupportMessage({ name, email, message })
    if (result.success) {
      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
      
      // Clear success notification after 4 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 4000)
    } else {
      setStatus("error")
      
      // Clear error notification after 4 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 4000)
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} setLang={handleSetLang} />
      
      <main className="mx-auto max-w-6xl px-5 py-12 md:py-20">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold tracking-widest text-brand uppercase">{copy.eyebrow}</span>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
            {copy.title}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-foreground/60 text-pretty">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr] items-start">
          {/* Contact Form Card */}
          <div className="rounded-[2rem] border border-border bg-card p-6 md:p-10 shadow-sm">
            {/* Smoothly animated success/error alerts */}
            <div className="relative overflow-hidden transition-all duration-300">
              {status === "success" && (
                <div className="mb-6 flex items-start gap-3 rounded-2xl bg-emerald-50 border border-emerald-200/50 p-4 text-emerald-800 animate-in fade-in slide-in-from-top-4 duration-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold">{copy.successTitle}</p>
                    <p className="text-emerald-700/90 text-xs mt-0.5 leading-relaxed">{copy.successBody}</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-center gap-3 rounded-2xl bg-red-50 border border-red-200/50 p-4 text-red-800 animate-in fade-in slide-in-from-top-4 duration-300">
                  <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  <p className="text-sm font-semibold">{copy.errorBody}</p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-semibold text-zinc-800">{copy.nameLabel}</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={copy.namePlaceholder}
                  disabled={status === "sending"}
                  className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-foreground/30 focus:border-brand focus:ring-2 focus:ring-brand/10 text-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-zinc-800">{copy.emailLabel}</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={copy.emailPlaceholder}
                  disabled={status === "sending"}
                  className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-foreground/30 focus:border-brand focus:ring-2 focus:ring-brand/10 text-zinc-900"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-zinc-800">{copy.messageLabel}</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={copy.messagePlaceholder}
                  disabled={status === "sending"}
                  className="rounded-xl border border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-foreground/30 focus:border-brand focus:ring-2 focus:ring-brand/10 text-zinc-900 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground shadow-sm transition-opacity hover:opacity-90 cursor-pointer disabled:opacity-50"
              >
                {status === "sending" ? copy.submitBtnSending : copy.submitBtn}
              </button>
            </form>
          </div>


          {/* Info Card */}
          <div className="flex flex-col gap-6">
            {/* Email Support Card */}
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm flex flex-col gap-3">
              <h3 className="text-2xl font-bold text-zinc-900">
                {lang === "es" ? "Soporte Directo" : "Direct Support"}
              </h3>
              <p className="text-foreground/60 leading-relaxed text-sm">
                {lang === "es" 
                  ? "¿Prefieres escribirnos directamente desde tu aplicación de correo? Haz clic en nuestra dirección:" 
                  : "Prefer to write to us directly from your email client? Click our address below:"}
              </p>
              <a 
                href="mailto:soporte@menudoapp.com" 
                className="text-base font-bold text-brand hover:underline self-start transition-all"
              >
                soporte@menudoapp.com
              </a>
            </div>

            {/* Download Card */}
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-zinc-900 mb-3">{copy.downloadTitle}</h3>
              <p className="text-foreground/60 leading-relaxed mb-6">{copy.downloadSubtitle}</p>
              
              <div className="flex flex-wrap items-center gap-5">
                <div className="rounded-2xl bg-zinc-50 border border-border p-2.5 flex items-center justify-center">
                  <img src="/placeholders/qr-mock.svg" alt="QR Code" className="h-20 w-20" />
                </div>
                <div className="flex flex-col gap-2.5">
                  <span className="text-xs font-semibold text-foreground/50">{copy.qrLabel}</span>
                  <div className="flex gap-2">
                    <a href="#" className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95">App Store</a>
                    <a href="#" className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95">Play Store</a>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4" /> {copy.backHome}
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  )
}
