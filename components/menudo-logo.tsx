import { cn } from "@/lib/utils"

export function MenudoMark({ className }: { className?: string }) {
  return (
    <img
      src="/brand/menudo-logo.webp"
      alt="Menudo"
      className={cn("h-7 w-7 rounded-lg object-contain", className)}
    />
  )
}

export function MenudoLogo({
  className,
  showWordmark = true,
}: {
  className?: string
  showWordmark?: boolean
}) {
  return (
    <span className={cn("flex items-center gap-2.5 text-foreground", className)}>
      <MenudoMark className="h-11 w-11" />
      {showWordmark && (
        <span className="font-heading text-3xl font-bold tracking-tight text-foreground">menudo</span>
      )}
    </span>
  )
}
