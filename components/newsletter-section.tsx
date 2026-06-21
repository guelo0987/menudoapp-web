"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { siteContent, Language } from "@/lib/site-content"
import { subscribeNewsletter } from "@/app/actions/resend"

type NewsletterSectionProps = {
  lang: Language
}

export function NewsletterSection({ lang }: NewsletterSectionProps) {
  const isEs = lang === "es"
  const content = siteContent[lang].footer

  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    setErrorMsg(null)

    try {
      const result = await subscribeNewsletter(email)
      if (result.success) {
        setStatus("success")
        setEmail("")
        
        // Automatically reset back to idle after 4 seconds so the user can enter another email if needed
        setTimeout(() => {
          setStatus("idle")
        }, 4000)
      } else {
        setStatus("error")
        setErrorMsg(result.error || (isEs ? "Ocurrió un error. Intente de nuevo." : "An error occurred. Please try again."))
        
        // Reset error message back to idle after 4 seconds
        setTimeout(() => {
          setStatus("idle")
          setErrorMsg(null)
        }, 4000)
      }
    } catch (err) {
      setStatus("error")
      setErrorMsg(isEs ? "Error de conexión. Intente de nuevo." : "Connection error. Please try again.")
      
      setTimeout(() => {
        setStatus("idle")
        setErrorMsg(null)
      }, 4000)
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 md:py-16 animate-in fade-in duration-700">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 text-white p-8 md:p-12 shadow-xl border border-zinc-800">
        {/* Avocado gradient radial glow behind the card content */}
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.15)_0%,rgba(255,255,255,0)_70%)]" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(163,230,53,0.1)_0%,rgba(255,255,255,0)_70%)]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
          {/* Animated Transition container */}
          <div className="w-full transition-all duration-500 ease-in-out">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 p-4 mb-4 text-emerald-400">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-emerald-400 sm:text-3xl">
                  {isEs ? "¡Registro Exitoso!" : "Successfully Registered!"}
                </h3>
                <p className="mt-3 text-zinc-400 text-sm max-w-md leading-relaxed">
                  {isEs 
                    ? "Gracias por registrarte. Te avisaremos tan pronto como tengamos novedades importantes o lancemos en Play Store."
                    : "Thank you for joining. We will notify you as soon as we have major updates or launch on the Play Store."}
                </p>
                <p className="mt-6 text-[10px] text-zinc-500 uppercase tracking-widest animate-pulse">
                  {isEs ? "El formulario se restablecerá en breve..." : "Form will reset shortly..."}
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <span className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                  {isEs ? "Lista de Espera" : "Waitlist"}
                </span>
                <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {content.newsletterTitle}
                </h2>
                <p className="mt-3 text-zinc-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                  {isEs
                    ? "Suscríbete para recibir notificaciones exclusivas sobre el lanzamiento en Play Store y próximas novedades."
                    : "Subscribe to receive exclusive notifications about the Play Store release and upcoming features."}
                </p>

                <form onSubmit={handleSubscribe} className="mt-8 w-full max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 rounded-2xl sm:rounded-full bg-zinc-800/80 border border-zinc-700/50 p-2 ring-1 ring-white/5 focus-within:border-emerald-500/50 focus-within:ring-emerald-500/20 transition-all">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      disabled={status === "loading"}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.newsletterPlaceholder}
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-500 text-white rounded-xl sm:rounded-l-full focus:bg-zinc-700/20 sm:focus:bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-6 py-3 sm:py-2.5 text-sm font-bold transition-all hover:scale-[1.02] active:scale-98 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {status === "loading" ? (
                        isEs ? "Registrando..." : "Registering..."
                      ) : (
                        <>
                          {content.newsletterButton}
                          <ArrowRight className="h-4 w-4 shrink-0" />
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Error Notification */}
                  {status === "error" && errorMsg && (
                    <p className="mt-3 text-xs text-red-400 font-semibold px-4 animate-in fade-in slide-in-from-top-2">
                      {errorMsg}
                    </p>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
