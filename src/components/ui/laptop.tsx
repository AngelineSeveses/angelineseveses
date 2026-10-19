import type { Shot } from "@/data/content"
import { cn } from "@/lib/utils"

/**
 * A screenshot shown on a laptop: dark bezel with a camera notch, 16:10 screen, aluminium base.
 * Pure CSS, so it scales with its container and needs no mockup image.
 */
export function Laptop({ shot, className }: { shot: Shot; className?: string }) {
  return (
    <div className={cn("relative w-full px-[6%]", className)}>
      <div className="relative rounded-t-[clamp(8px,1.2vw,16px)] bg-device p-[2.4%] pb-[3%] shadow-raised">
        <span aria-hidden="true" className="absolute left-1/2 top-[1%] h-[1.2%] w-[1.2%] min-h-1 min-w-1 -translate-x-1/2 rounded-full bg-cream/15" />
        <div className="overflow-hidden rounded-[2px] bg-paper">
          <img
            src={shot.src}
            alt={shot.alt}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-[900ms] ease-out-strong motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative -mx-[6%] h-[clamp(9px,1.3vw,16px)] rounded-b-[40%_100%] [background:linear-gradient(var(--color-device-base),var(--color-device-shade))]"
      >
        <span className="absolute left-1/2 top-0 h-[45%] w-[16%] -translate-x-1/2 rounded-b-[6px] bg-device-shade/70" />
      </div>
    </div>
  )
}
