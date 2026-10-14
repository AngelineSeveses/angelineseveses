import { clientNames } from "@/data/content"

/** Client names set as a typographic band: honest proof without borrowing anyone's logo. */
export function ClientBand() {
  return (
    <div className="relative z-[1] rounded-t-sheet bg-band pb-[clamp(72px,9vw,120px)] pt-[clamp(36px,4vw,52px)] text-cream">
      <div className="wrap">
        <p className="text-center text-[13.5px] text-cream/60">Websites I've designed and built for</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-[clamp(24px,4vw,56px)] gap-y-4">
          {clientNames.map((c) => (
            <li key={c} className="whitespace-nowrap font-serif text-[clamp(20px,2.2vw,28px)] italic text-cream/85">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

