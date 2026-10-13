import { Check } from "lucide-react"
import { CompareSlider } from "@/components/ui/compare-slider"
import { SectionHead } from "@/components/ui/section-head"
import { devWorks, featured, moreProjects, redesigns, type DevWork, type Redesign } from "@/data/content"
import { cn } from "@/lib/utils"

function Results({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <ul className={cn("border-t border-rule", compact ? "mt-3.5" : "mt-5")}>
      {items.map((r) => (
        <li key={r} className={cn("flex gap-3 border-b border-rule", compact ? "py-2 text-[15px]" : "py-[11px] text-[15.5px]")}>
          <Check className="mt-[3px] h-[18px] w-[18px] flex-none text-violet" strokeWidth={2} aria-hidden="true" />
          {r}
        </li>
      ))}
    </ul>
  )
}

function Scores({ items }: { items: string[] }) {
  return (
    <div className="mt-3.5 flex flex-wrap gap-2">
      {items.map((s, i) => (
        <span
          key={s}
          className={cn(
            "whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[13px] tabular-nums",
            i === 0 ? "border-transparent bg-mist text-violet" : "border-rule bg-paper"
          )}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

function RedesignCard({ p }: { p: Redesign }) {
  return (
    <article className="min-w-0">
      <CompareSlider name={p.name} before={p.before} after={p.after} />
      {p.headline && (
        <p className="mt-6 flex items-baseline gap-3">
          <span className="whitespace-nowrap text-[clamp(36px,4vw,52px)] leading-none tracking-[-0.05em] tabular-nums">
            <span className="font-extralight text-quiet">{p.headline.from}</span>
            <span className="mx-2 font-extralight text-violet" aria-label="to">→</span>
            <span className="font-semibold">{p.headline.to}</span>
          </span>
          <span className="text-[15px] leading-tight text-quiet">{p.headline.label}</span>
        </p>
      )}
      <p className="mt-4 text-sm text-quiet">{p.meta}</p>
      <h3 className="mt-1 text-[22px] tracking-[-0.025em]">{p.name}</h3>
      <p className="mt-1.5 text-[15.5px] text-quiet">{p.description}</p>
      <Results items={p.results} compact />
      <Scores items={p.scores} />
    </article>
  )
}

function DevCard({ p }: { p: DevWork }) {
  return (
    <article className="group min-w-0">
      <a
        href={p.url}
        target="_blank"
        rel="noopener"
        aria-label={`Open the ${p.name} website`}
        className="relative block aspect-[16/10] overflow-hidden rounded-md border border-rule bg-paper"
      >
        <img
          src={p.image.src}
          alt={p.image.alt}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-out-strong motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.02]"
        />
      </a>
      <p className="mt-[18px] text-sm text-quiet">{p.meta}</p>
      <h3 className="mt-1 text-[22px] tracking-[-0.025em]">{p.name}</h3>
      <p className="mt-1.5 text-[15.5px] text-quiet">{p.description}</p>
      <Scores items={p.scores} />
    </article>
  )
}

function SubHead({ title, note }: { title: string; note: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4 border-t border-rule pt-7">
      <h3 className="text-[22px] tracking-[-0.02em]">{title}</h3>
      <p className="text-quiet">{note}</p>
    </div>
  )
}

export function Work() {
  return (
    <section id="work" className="section-pad">
      <div className="wrap">
        <SectionHead
          kicker="Selected work"
          title={<><span className="font-extralight">Real projects.</span> <span className="font-semibold">Real results.</span></>}
          lede="Websites I've designed, built, or both. Each one lists my role, what changed, and its Google Lighthouse scores from October 2026."
        />

        <article className="mb-[clamp(56px,7vw,88px)] grid items-center gap-[clamp(24px,4vw,56px)] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <CompareSlider name={featured.name} before={featured.before} after={featured.after} />
          <div>
            <p className="text-sm text-quiet">{featured.meta}</p>
            <h3 className="mb-3.5 mt-2 text-[clamp(28px,3vw,36px)] leading-[1.1] tracking-[-0.035em]">{featured.name}</h3>
            <p className="text-quiet">{featured.description}</p>
            <Results items={featured.results} />
            <dl className="mt-[22px] flex flex-wrap gap-7">
              {[
                ["100", "SEO"],
                ["100", "Accessibility"],
              ].map(([n, l]) => (
                <div key={l} className="flex flex-col-reverse">
                  <dt className="mt-1.5 text-[13px] text-quiet">{l}</dt>
                  <dd className="text-[30px] leading-none tracking-[-0.04em] tabular-nums">{n}</dd>
                </div>
              ))}
              <div className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[13px] text-quiet">My role</dt>
                <dd className="text-lg leading-[1.67]">Design and build</dd>
              </div>
            </dl>
          </div>
        </article>

        <SubHead title="Redesigns" note="Drag each line to compare the old site with my redesign." />
        <div className="mb-[clamp(56px,7vw,88px)] grid gap-x-[clamp(20px,3vw,40px)] gap-y-[clamp(32px,4vw,56px)] md:grid-cols-2">
          {redesigns.map((p) => (
            <RedesignCard key={p.name} p={p} />
          ))}
        </div>

        <SubHead title="Development" note="Sites I built in WordPress from an existing design." />
        <div className="grid gap-x-[clamp(20px,3vw,40px)] gap-y-[clamp(32px,4vw,56px)] md:grid-cols-2 lg:grid-cols-3">
          {devWorks.map((p) => (
            <DevCard key={p.name} p={p} />
          ))}
        </div>

        <div className="mt-[clamp(48px,6vw,72px)] grid gap-2 border-t border-rule pt-7 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-6">
          <p className="text-sm text-quiet">More projects</p>
          <p className="leading-[1.75] text-quiet">{moreProjects}</p>
        </div>
      </div>
    </section>
  )
}
