"use client"

import { useState } from "react"
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
        
        // Automatically reset back to idle after 4 seconds
        setTimeout(() => {
          setStatus("idle")
        }, 4000)
      } else {
        setStatus("error")
        setErrorMsg(result.error || (isEs ? "Ocurrió un error. Intente de nuevo." : "An error occurred. Please try again."))
        
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
    <section className="mx-auto max-w-4xl px-5 py-12 md:py-16 animate-in fade-in duration-700">
      {/* Clean, pure white card with subtle border and soft shadow to match the brand design */}
      <div className="relative overflow-hidden rounded-[2rem] bg-white text-zinc-900 p-8 md:p-12 shadow-xs border border-zinc-200/80">
        
        <div className="relative z-10 max-w-xl mx-auto text-center flex flex-col items-center">
          <div className="w-full transition-all duration-500 ease-in-out">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-500">
                <div className="rounded-full bg-emerald-50 border border-emerald-200/50 p-4 mb-4 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8 animate-pulse" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-emerald-600">
                  {isEs ? "¡Registro Exitoso!" : "Successfully Registered!"}
                </h3>
                <p className="mt-3 text-zinc-500 text-sm max-w-sm leading-relaxed">
                  {isEs 
                    ? "Gracias por registrarte. Te avisaremos tan pronto como tengamos novedades o lancemos en Play Store."
                    : "Thank you for joining. We will notify you as soon as we have major updates or launch on the Play Store."}
                </p>
                <p className="mt-6 text-[9px] font-bold text-zinc-400 uppercase tracking-widest animate-pulse">
                  {isEs ? "Restableciendo formulario..." : "Resetting form..."}
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300">
                <span className="inline-block text-[10px] font-bold tracking-widest text-brand bg-brand-soft border border-brand/10 px-3 py-1 rounded-full uppercase mb-4 shadow-2xs select-none">
                  {isEs ? "Lista de Espera" : "Waitlist"}
                </span>
                
                <h2 className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
                  {content.newsletterTitle}
                </h2>
                
                <p className="mt-3 text-zinc-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                  {isEs
                    ? "Suscríbete para recibir notificaciones exclusivas sobre el lanzamiento en Play Store y próximas novedades."
                    : "Subscribe to receive exclusive notifications about the Play Store release and upcoming features."}
                </p>

                <form onSubmit={handleSubscribe} className="mt-8 w-full max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row items-stretch gap-3 rounded-2xl sm:rounded-full bg-zinc-50 border border-zinc-200/80 p-1.5 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/10 transition-all">
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      disabled={status === "loading"}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.newsletterPlaceholder}
                      className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-400 text-zinc-900 rounded-xl sm:rounded-l-full focus:bg-zinc-100/20 sm:focus:bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl sm:rounded-full bg-brand text-brand-foreground px-6 py-3 sm:py-2.5 text-sm font-bold shadow-xs hover:opacity-90 hover:scale-[1.02] active:scale-98 transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
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
                    <p className="mt-3 text-xs text-red-500 font-semibold px-4 animate-in fade-in slide-in-from-top-2">
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
