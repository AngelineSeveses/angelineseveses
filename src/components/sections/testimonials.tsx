import { Fill } from "@/components/ui/fill"
import { SectionHead } from "@/components/ui/section-head"
import { testimonials } from "@/data/content"

/** Two real quotes: the first leads on lavender, the second sits beside it, with a slot for the next client review. */
export function Testimonials() {
  const [lead, second] = testimonials
  return (
    <section aria-labelledby="t-title" className="dark rounded-sheet bg-band py-[clamp(64px,8vw,112px)] text-cream">
      <div className="wrap">
        <SectionHead
          dark
          align="center"
          id="t-title"
          title={
            <>
              <span className="font-extralight">Kind words from</span> <span className="font-semibold">people I've built with.</span>
            </>
          }
        />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <figure className="m-0 flex flex-col justify-between rounded-card bg-lavender p-[clamp(28px,4vw,52px)] text-ink">
            <blockquote className="m-0">
              <p className="font-serif text-[clamp(25px,2.6vw,36px)] leading-[1.2] tracking-[-0.015em]">“{lead.quote}”</p>
            </blockquote>
            <figcaption className="mt-10 border-t border-ink/15 pt-5 text-[15px]">
              <b className="font-medium">{lead.name}</b>
              <span className="block text-ink/65">{lead.role}</span>
            </figcaption>
          </figure>
          <div className="grid gap-5">
            <figure className="m-0 rounded-card bg-cream p-[clamp(24px,3vw,36px)] text-ink">
              <blockquote className="m-0">
                <p className="font-serif text-[clamp(20px,1.9vw,25px)] leading-[1.3]">“{second.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-[14.5px]">
                <b className="font-medium">{second.name}</b>
                <span className="block text-quiet">{second.role}</span>
              </figcaption>
            </figure>
            <div className="grid place-items-center rounded-card border border-dashed border-cream/25 p-6 text-center text-[14.5px]">
              <Fill dark text="[Add a client testimonial with a result]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
