import { useRef } from "react"
import { ArrowDownRight, ChevronsLeftRight, FileText } from "lucide-react"
import { ButtonLink } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"
import { useSeam } from "@/hooks/use-seam"
import { heroProof, redesigns, site } from "@/data/content"

/** The redesign shown in the hero: the clearest before/after for a small business owner. */
const showcase = redesigns[0]

/** What changed and why it matters to the business. Positions are on the 2026 screenshot. */
const annotations = [
  { x: "70%", y: "14%", label: "Phone number in the header", why: "0 → 15 tap-to-call links" },
  { x: "87%", y: "14%", label: "Request Service button", why: "Always one click away" },
  { x: "61%", y: "33%", label: "Quote form in the hero", why: "0 → 2 request forms" },
]

function HeroShowcase() {
  const frameRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLButtonElement>(null)
  const { containerProps, knobProps } = useSeam(frameRef, knobRef)

  return (
    <figure className="min-w-0">
      <div className="overflow-hidden rounded-xl border border-rule bg-paper">
        {/* Browser chrome makes it read as a real website, not a mockup. */}
        <div className="flex items-center gap-2 border-b border-rule px-4 py-2.5" aria-hidden="true">
          <i className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 truncate rounded-full bg-cream px-3 py-0.5 text-xs text-quiet">glauto.ca</span>
        </div>
        <div
          ref={frameRef}
          {...containerProps}
          data-cursor="drag"
          className="relative aspect-[16/10] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-night"
          style={{ ["--cut" as string]: "50%" }}
        >
          <img src={showcase.before.src} alt={showcase.before.alt} className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top" />
          <div className="pointer-events-none absolute inset-0 [clip-path:inset(0_0_0_var(--cut))]">
            <img src={showcase.after.src} alt={showcase.after.alt} className="absolute inset-0 h-full w-full object-cover object-top" />
            {/* Design annotations: they belong to the redesign, so they disappear as you drag back to the old site. */}
            {annotations.map((a, i) => (
              <span
                key={a.label}
                aria-hidden="true"
                className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-violet text-[13px] font-semibold text-paper shadow-[0_0_0_4px_rgb(91_63_196/0.25)] tabular-nums"
                style={{ left: a.x, top: a.y }}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <span className="absolute bottom-3 left-3 z-[2] rounded-full bg-ink/80 px-2.5 py-0.5 text-[12.5px] text-cream">Before</span>
          <span className="absolute bottom-3 right-3 z-[2] rounded-full bg-violet px-2.5 py-0.5 text-[12.5px] text-paper">After, my redesign</span>
          <div className="absolute inset-y-0 z-[3] w-0" style={{ left: "var(--cut)" }}>
            <svg preserveAspectRatio="none" viewBox="0 0 2 900" aria-hidden="true" className="absolute -left-px top-0 h-full w-0.5 overflow-visible">
              <line className="load-stitch" x1="1" y1="0" x2="1" y2="900" stroke="var(--color-soft)" strokeWidth="2" strokeDasharray="8 7" />
            </svg>
            <button
              ref={knobRef}
              type="button"
              role="slider"
              aria-label="Drag to compare G and L Auto's old website with the redesign"
              data-cursor="drag"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={50}
              {...knobProps}
              className="absolute left-0 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full border border-rule bg-paper p-0 text-violet shadow-[0_2px_10px_rgb(29_26_34/0.18)] transition-transform duration-[160ms] ease-out-strong active:cursor-grabbing active:scale-[0.94]"
            >
              <ChevronsLeftRight className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-col gap-3">
        <div>
          <p className="text-[15px] font-medium">G&amp;L Auto, an auto repair shop in Navan, Ontario, since 1973</p>
          <p className="text-sm text-quiet">From a basic website-builder page to a site built to get service requests.</p>
        </div>
        <ol className="grid gap-x-5 gap-y-2 border-t border-rule pt-3 sm:grid-cols-3">
          {annotations.map((a, i) => (
            <li key={a.label} className="flex gap-2.5 text-[13.5px] leading-snug">
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-violet text-[11px] font-semibold text-paper tabular-nums">{i + 1}</span>
              <span>
                <b className="font-medium">{a.label}</b>
                <span className="block text-quiet">{a.why}</span>
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}

export function Hero() {
  const toast = useToast()

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-rule">
      {/* Faint 12-column grid: the designer's guides, kept quiet. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 mx-auto max-w-site">
        {[8.33, 25, 41.66, 58.33, 75, 91.66].map((l) => (
          <i key={l} className="absolute inset-y-0 w-px bg-violet/[0.06]" style={{ left: `${l}%` }} />
        ))}
      </div>

      <div className="wrap relative grid items-center gap-[clamp(40px,5vw,72px)] pb-[clamp(48px,6vw,80px)] pt-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <p className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-rule bg-paper px-3.5 py-1.5 text-sm text-quiet">
            <i aria-hidden="true" className="h-2 w-2 rounded-full bg-success shadow-[0_0_0_3px_rgb(47_122_79/0.16)]" />
            {site.availabilityShort}
          </p>

          <h1 id="hero-title" className="text-balance text-[clamp(40px,4.4vw,62px)] font-semibold leading-[1.02] tracking-[-0.045em]">
            <span className="font-extralight">Websites that make your business look</span> as good as the work you do.
          </h1>

          <p className="mt-6 max-w-[52ch] text-[clamp(17px,1.7vw,19px)] leading-relaxed text-quiet">
            I'm Angeline, a web designer and WordPress developer with 4+ years of experience. I start by learning how your business wins customers, then design and
            build a site around it: services that are easy to understand, trust signals up front, and a clear way to get in touch.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contact" size="lg">
              Start a project
            </ButtonLink>
            <ButtonLink href="#work" variant="ghost" size="lg">
              See the results
              <ArrowDownRight className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-[520px] grid-cols-3 border-t border-rule pt-6">
            {heroProof.map((p, i) => (
              <div key={p.label} className={`flex flex-col ${i > 0 ? "border-l border-rule pl-[clamp(12px,2vw,24px)]" : "pr-[clamp(12px,2vw,24px)]"}`}>
                <dt className="mt-2 text-[13.5px] leading-snug text-quiet">{p.label}</dt>
                <dd className="order-first text-[clamp(26px,3vw,34px)] font-medium leading-none tracking-[-0.04em] tabular-nums">{p.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-quiet">
            <span className="font-medium text-ink">Hiring?</span>
            Open to part-time and full-time remote roles.
            <button
              type="button"
              onClick={() => toast("Link your CV PDF here")}
              className="inline-flex cursor-pointer items-center gap-1 font-medium text-violet underline decoration-violet/30 underline-offset-4 transition-colors duration-200 hover:decoration-violet"
            >
              <FileText className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
              View my CV
            </button>
          </p>
        </div>

        <HeroShowcase />
      </div>
    </section>
  )
}

export function Trust() {
  return (
    <div className="border-b border-rule bg-paper py-9">
      <div className="wrap grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-center">
        <blockquote className="flex gap-4">
          <span aria-hidden="true" className="grid h-11 w-11 flex-none place-items-center rounded-full bg-mist text-sm font-medium text-violet">
            CT
          </span>
          <div>
            <p className="text-[clamp(18px,1.9vw,21px)] font-light leading-snug tracking-[-0.02em]">
              "Professional, creative, and always on time. They helped us translate our ideas into a powerful online presence."
            </p>
            <footer className="mt-2 text-sm text-quiet">Celine Terrado, Web Designer</footer>
          </div>
        </blockquote>
        <dl className="grid gap-x-6 gap-y-2 text-[15px] sm:grid-cols-[110px_minmax(0,1fr)]">
          <dt className="text-quiet">Industries</dt>
          <dd>Contractors, cleaning, auto repair, BPO, food halls, SaaS</dd>
          <dt className="text-quiet">Clients in</dt>
          <dd>Canada, the US, Australia and the Netherlands</dd>
        </dl>
      </div>
    </div>
  )
}
