import { Language } from "@/lib/site-content"
import Link from "next/link"
import { MenudoLogo } from "@/components/menudo-logo"

type SiteFooterProps = {
  lang: Language
}

// Minimal Apple Logo SVG
function AppleIcon() {
  return (
    <svg className="h-5 w-5 fill-current text-zinc-900" viewBox="0 0 24 24">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-1.01 2.96 1.07.08 2.18-.54 2.84-1.35Z" />
    </svg>
  )
}

// Minimal Play Store Icon SVG
function PlayStoreIcon() {
  return (
    <svg className="h-5 w-5 fill-current text-zinc-900" viewBox="0 0 24 24">
      <path d="M5 3.00005C4.65 3.00005 4.3 3.10005 4 3.30005L13.65 12.95L18.35 8.25005L5 3.00005ZM3.3 4.25005C3.1 4.50005 3 4.85005 3 5.25005V18.75C3 19.15 3.1 19.5 3.3 19.75L12.25 11.55L3.3 4.25005ZM13.65 14.35L4 23.95C4.3 24.15 4.65 24.25 5 24.25C6 24.25 7.15 23.8 8.25 23.35L18.35 18.95L13.65 14.35ZM19.85 9.75005L14.95 12.95L19.85 16.15C20.65 15.65 21 14.85 21 13.95V11.95C21 11.05 20.65 10.25 19.85 9.75005Z" />
    </svg>
  )
}

export function SiteFooter({ lang }: SiteFooterProps) {
  const isEs = lang === "es"

  const copy = isEs ? {
    tagline: "El gestor de gastos que no se interpone en tu camino.",
    contactTitle: "CONTACTO",
    legalTitle: "LEGAL",
    downloadTitle: "DESCARGAR",
    email: "soporte@menudoapp.com",
    blog: "Blog",
    faq: "FAQ",
    privacy: "Política de Privacidad",
    terms: "Términos de Servicio",
  } : {
    tagline: "The expense tracker that gets out of your way.",
    contactTitle: "CONTACT",
    legalTitle: "LEGAL",
    downloadTitle: "DOWNLOAD",
    email: "support@menudoapp.com",
    blog: "Blog",
    faq: "FAQ",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  }

  return (
    <footer className="w-full bg-zinc-50 border-t border-zinc-200/60 py-16 px-5 mt-16 text-zinc-600">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Left Block: Brand + Description */}
          <div className="flex flex-col gap-4">
            <MenudoLogo className="text-zinc-900" />
            <p className="text-sm text-foreground/50 max-w-sm font-medium leading-relaxed">
              {copy.tagline}
            </p>
          </div>

          {/* Right Block: 3-column Links layout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Contact Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase select-none">
                {copy.contactTitle}
              </h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-zinc-900/60">
                <li>
                  <Link href="/blog" className="hover:text-zinc-900 transition-colors">
                    {copy.blog}
                  </Link>
                </li>
                <li>
                  <Link href="#faq-section" className="hover:text-zinc-900 transition-colors">
                    {copy.faq}
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${copy.email}`} className="hover:text-zinc-900 transition-colors break-all">
                    {copy.email}
                  </a>
                </li>
                <li>
                  <a href="https://x.com/menudoapp" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
                    Twitter/X
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/menudoapp" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase select-none">
                {copy.legalTitle}
              </h4>
              <ul className="flex flex-col gap-3 text-sm font-semibold text-zinc-900/60">
                <li>
                  <Link href="/privacy-policy" className="hover:text-zinc-900 transition-colors">
                    {copy.privacy}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-zinc-900 transition-colors">
                    {copy.terms}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Download Column */}
            <div className="flex flex-col gap-4 col-span-1">
              <h4 className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase select-none">
                {copy.downloadTitle}
              </h4>
              <div className="flex sm:flex-col gap-3">
                <a
                  href="/support"
                  className="h-11 w-11 flex items-center justify-center bg-white border border-zinc-200/80 rounded-xl shadow-xs hover:bg-zinc-100 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                  aria-label="Download on App Store"
                >
                  <AppleIcon />
                </a>
                <div
                  className="h-11 w-11 flex items-center justify-center bg-white border border-zinc-200/80 rounded-xl shadow-xs opacity-50 grayscale cursor-not-allowed select-none"
                  aria-label="Download on Play Store (Coming Soon)"
                >
                  <PlayStoreIcon />
                </div>

              </div>
            </div>

          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200/40 text-center sm:text-left">
          <p className="text-[10px] font-semibold text-zinc-400 tracking-wider">
            &copy; {new Date().getFullYear()} Menudo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
