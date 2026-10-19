import { cn } from "@/lib/utils"

/**
 * The logo mark: an italic serif "a" on a plum tile, crossed by the lavender stitch (the brand's seam).
 * Sized with font-size: set `className="text-[32px]"` and the whole mark scales.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-grid h-[1em] w-[1em] flex-none place-items-center overflow-hidden rounded-[0.28em] bg-plum text-[32px]", className)}
    >
      <span className="translate-y-[-0.04em] font-serif text-[0.78em] italic leading-none text-cream">a</span>
      <span
        className="absolute inset-x-[0.16em] bottom-[0.2em] h-[0.05em]"
        style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-lavender) 0 0.09em, transparent 0.09em 0.15em)" }}
      />
    </span>
  )
}

/** The wordmark: the name, with "Seveses" in italic. (The mark above stays available on its own.) */
export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center whitespace-nowrap text-[18px]", className)}>
      <span className={cn("font-serif text-[1.15em] leading-none tracking-[-0.01em]", dark ? "text-cream" : "text-ink")}>
        Angeline <span className="italic">Seveses</span>
      </span>
    </span>
  )
}
