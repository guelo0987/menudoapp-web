import { cn } from "@/lib/utils"
import { siteContent, Language } from "@/lib/site-content"

type BorrowSectionProps = {
  lang: Language
}

// 1. Ultra-Realistic Silver/Titanium iPhone Mockup
function RealisticIPhone({
  children,
  className,
  width = 215,
  height = 465,
}: {
  children: React.ReactNode
  className?: string
  width?: number
  height?: number
}) {
  return (
    <div 
      style={{ width: `${width}px`, height: `${height}px` }}
      className={cn("relative select-none shrink-0 group z-10", className)}
    >
      {/* Left Buttons (Action + Volume Up/Down) */}
      <div className="absolute top-[80px] -left-[2px] w-[2px] h-[12px] bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-l-[1px] shadow-sm z-0" />
      <div className="absolute top-[105px] -left-[2px] w-[2px] h-[22px] bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-l-[1px] shadow-sm z-0" />
      <div className="absolute top-[138px] -left-[2px] w-[2px] h-[22px] bg-gradient-to-r from-zinc-200 to-zinc-400 rounded-l-[1px] shadow-sm z-0" />
      
      {/* Right Button (Power) */}
      <div className="absolute top-[120px] -right-[2px] w-[2px] h-[34px] bg-gradient-to-l from-zinc-200 to-zinc-400 rounded-r-[1px] shadow-sm z-0" />

      {/* Main iPhone Body Container with Silver/Titanium Gradient Border */}
      <div className="relative w-full h-full rounded-[2.8rem] bg-gradient-to-b from-zinc-100 via-zinc-300 to-zinc-400 p-[1.5px] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)]">
        
        {/* Inner Screen Bezel - Thin Black Ring */}
        <div className="w-full h-full rounded-[2.75rem] border-[3.5px] border-zinc-950 bg-zinc-950 overflow-hidden flex flex-col relative">
          
          {/* Active Screen Area */}
          <div className="relative w-full h-full bg-white overflow-hidden rounded-[2.5rem]">
            
            {/* iOS Status Bar Overlay */}
            <div className="absolute top-0 inset-x-0 h-7 z-30 flex items-center justify-between px-5 text-[8.5px] font-bold tracking-tight text-zinc-900 pointer-events-none select-none">
              <span className="flex items-center gap-[2px]">
              </span>
              
              <span className="flex items-center gap-1">
                {/* 5G Signal bars */}
                <span className="flex items-end gap-[0.8px] h-[6px]">
                </span>
                <span className="text-[8px] font-bold"></span>
                
                {/* Battery Icon with Fill */}
                
              </span>
            </div>

            {/* Floating Dynamic Island Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 h-[12px] w-[46px] rounded-full bg-black z-40 pointer-events-none select-none flex items-center justify-center">
              {/* Inner lenses reflex details */}
              <div className="absolute left-2 w-[4px] h-[4px] rounded-full bg-zinc-900/40" />
              <div className="absolute right-3.5 w-[3px] h-[3px] rounded-full bg-zinc-800/30" />
            </div>

            {/* Screen Content Slot */}
            <div className="w-full h-full relative z-10 bg-zinc-50">
              {children}
            </div>

            {/* Glass Screen Glare Reflection overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/10 z-20" />

            {/* Home Indicator */}
            <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 h-[3px] w-[65px] rounded-full bg-zinc-900/25 z-30 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function BorrowSection({ lang }: BorrowSectionProps) {
  const content = siteContent[lang].pro
  const isEs = lang === "es"

  return (
    <section id="pro-section" className="px-4 py-12 md:py-20 bg-background">
      {/* Rounded content container card with pure white/neutral design and avocado green accents */}
      <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-card px-5 py-16 text-zinc-900 md:px-12 md:py-24">
        {/* Clean, premium marketing headers (no generic AI text) */}
        <div className="mb-16 flex flex-col items-center gap-3">
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl max-w-2xl mt-2 text-balance">
            {content.title}
          </h2>
          <p className="text-center text-sm md:text-base text-foreground/60 max-w-lg mt-3 text-pretty">
            {content.body}
          </p>
        </div>

        {/* Unified Overlapping Layout: Static screenshots and video mockups compenentrated with synergy */}
        <div className="mx-auto flex flex-col md:flex-row items-center justify-center gap-24 md:gap-36 py-8 px-4 overflow-visible">
          
          {/* Column 1: Shortcuts / Quick Log */}
          <div className="relative group flex flex-col items-center overflow-visible">
            <span className="text-sm font-semibold text-zinc-400 mb-8 tracking-wider uppercase select-none">
              {isEs ? "Registro rápido" : "Quick log"}
            </span>
            
            <div className="relative w-[215px] h-[465px] flex items-center justify-center">
              {/* Background static context (screenshot) */}
              <img
                src="/app-screenshots/AUINTA.png"
                alt="Menudo App Shortcuts static view showing expense lists"
                className="absolute -left-16 top-10 w-[195px] h-auto rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-zinc-100 opacity-60 group-hover:opacity-90 -rotate-[8deg] group-hover:-rotate-[11deg] group-hover:-translate-x-3 transition-all duration-700 select-none pointer-events-none z-0"
              />
              
              {/* Foreground interactive silver iPhone (video playback) */}
              <RealisticIPhone width={215} height={465} className="z-10 ">
                <video
                  src="/videos/shortcut_video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </RealisticIPhone>
            </div>
          </div>

          {/* Column 2: Voice Input */}
          <div className="relative group flex flex-col items-center overflow-visible">
            <span className="text-sm font-semibold text-zinc-400 mb-8 tracking-wider uppercase select-none">
              {isEs ? "Entrada por voz" : "Voice input"}
            </span>
            
            <div className="relative w-[215px] h-[465px] flex items-center justify-center">
              {/* Background static context (screenshot) */}
              <img
                src="/app-screenshots/speech-totext.jpeg"
                alt="Menudo App Voice entry screen showing speech to text processing"
                className="absolute -right-16 top-10 w-[195px] h-auto rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.1)] border border-zinc-100 opacity-60 group-hover:opacity-90 rotate-[8deg] group-hover:rotate-[11deg] group-hover:translate-x-3 transition-all duration-700 select-none pointer-events-none z-0"
              />
              
              {/* Foreground interactive silver iPhone (video playback) */}
              <RealisticIPhone width={215} height={465} className="z-10">
                <video
                  src="/videos/speech_text_video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
              </RealisticIPhone>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
