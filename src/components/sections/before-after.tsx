import { SectionHead } from "@/components/ui/section-head"
import { Showcase } from "./showcase"

/** The plum sheet: pick an industry, drag the seam, see the result. */
export function BeforeAfter() {
  return (
    <section
      id="before-after"
      aria-labelledby="ba-title"
      className="dark relative z-[2] -mt-[clamp(40px,5vw,64px)] rounded-sheet bg-plum pb-[clamp(64px,8vw,112px)] pt-[clamp(56px,7vw,96px)] text-cream"
    >
      <div className="wrap">
        <SectionHead
          dark
          align="center"
          id="ba-title"
          title={
            <>
              <span className="font-extralight">From dated</span> <span className="font-semibold">to trusted.</span>
            </>
          }
          lede="Real client sites. Pick an industry, then drag the line to compare the old site with my redesign."
        />
        <div className="mx-auto max-w-[1040px]">
          <Showcase />
        </div>
      </div>
    </section>
  )
}
