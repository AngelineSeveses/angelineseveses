import { clientLogos } from "@/data/content"
import { cn } from "@/lib/utils"

/**
 * Client logos on the dark band. Each logo is shown in one cream tone (whatever its original
 * colours), so a mixed set of brands reads as one calm row instead of a patchwork.
 */
export function ClientBand() {
  return (
    <div className="relative z-[1] rounded-t-sheet bg-band pb-[clamp(72px,9vw,120px)] pt-[clamp(36px,4vw,52px)] text-cream">
      <div className="wrap">
        <p className="text-center text-[13.5px] text-cream/60">Websites I've designed and built for</p>
        <ul className="mx-auto mt-8 flex max-w-[1040px] flex-wrap items-center justify-center gap-x-[clamp(32px,5vw,64px)] gap-y-8">
          {clientLogos.map((c) => (
            <li key={c.name} className="flex items-center">
              <img
                src={c.src}
                alt={c.name}
                title={c.name}
                loading="lazy"
                style={{ height: `clamp(${Math.round(c.h * 0.75)}px, ${(c.h / 14.4).toFixed(2)}vw, ${c.h}px)` }}
                className={cn(
                  "w-auto max-w-[180px] object-contain opacity-75 transition-opacity duration-200 hover:opacity-100",
                  // Flat logos become pure cream; a logo on a filled badge keeps its detail as a cream badge with dark lines.
                  c.solid ? "[filter:grayscale(1)_invert(1)_brightness(1.1)]" : "[filter:brightness(0)_invert(1)]"
                )}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
