import { useRef, useState, type KeyboardEvent } from "react"
import { Icon } from "@/components/ui/icon"
import { CheckList } from "@/components/ui/check-list"
import { CompareSlider } from "@/components/ui/compare-slider"
import { TagList } from "@/components/ui/tag-list"
import { SectionHead } from "@/components/ui/section-head"
import { devWorks, featured, moreProjects, redesigns, type DevWork, type Redesign } from "@/data/content"
import { cn } from "@/lib/utils"

function Headline({ p }: { p: Redesign }) {
  if (!p.headline) return null
  return (
    <p className="flex items-baseline gap-2.5">
      <span className="whitespace-nowrap font-serif text-[clamp(34px,3.4vw,44px)] leading-none tracking-[-0.03em] tabular-nums">
        <span className="text-quiet">{p.headline.from}</span>
        <span className="mx-1.5 italic text-violet" aria-label="to">
          →
        </span>
        <span>{p.headline.to}</span>
      </span>
      <span className="text-[14px] leading-tight text-quiet">{p.headline.label}</span>
    </p>
  )
}

/** Redesign card: the before/after is the hero of the card, then one big result, then the details. */
function RedesignCard({ p }: { p: Redesign }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-card border border-rule bg-paper">
      <CompareSlider name={p.name} before={p.before} after={p.after} className="rounded-none border-0 border-b" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-[26px] leading-tight tracking-[-0.02em]">{p.name}</h3>
            <p className="mt-0.5 text-[13.5px] text-quiet">{p.meta}</p>
          </div>
        </div>
        <div className="mt-5">
          <Headline p={p} />
        </div>
        <CheckList items={p.results} className="mt-5 border-t border-rule pt-4" />
        <TagList items={p.scores} className="mt-auto pt-5" />
      </div>
    </article>
  )
}

/** The featured redesign: same card, laid out wide. */
function FeaturedCard({ p }: { p: Redesign }) {
  return (
    <article className="grid min-w-0 overflow-hidden rounded-card border border-rule bg-paper lg:col-span-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <CompareSlider name={p.name} before={p.before} after={p.after} className="rounded-none border-0 max-lg:border-b lg:aspect-auto lg:h-full lg:min-h-[420px] lg:border-r" />
      <div className="flex flex-col justify-center p-[clamp(24px,3vw,44px)]">
        <span className="mb-3 text-[13.5px] font-medium text-violet">Featured redesign</span>
        <h3 className="font-serif text-[clamp(30px,3vw,40px)] leading-[1.05] tracking-[-0.02em]">{p.name}</h3>
        <p className="mt-1 text-[14px] text-quiet">{p.meta}</p>
        <p className="mt-4 text-[15.5px] text-quiet">{p.description}</p>
        <CheckList items={p.results} className="mt-5 border-t border-rule pt-4" />
        <TagList items={p.scores} className="mt-5" />
      </div>
    </article>
  )
}

/** Development card: the live site screenshot links out; the card says what was built. */
function DevCard({ p }: { p: DevWork }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-card border border-rule bg-paper">
      <a href={p.url} target="_blank" rel="noopener" aria-label={`Open the ${p.name} website`} className="relative block aspect-[16/10] overflow-hidden border-b border-rule">
        <img
          src={p.image.src}
          alt={p.image.alt}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-out-strong motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-paper/95 text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <Icon name="arrowUpRight" className="h-[18px] w-[18px]" />
        </span>
      </a>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[24px] leading-tight tracking-[-0.02em]">{p.name}</h3>
        <p className="mt-0.5 text-[13.5px] text-quiet">{p.meta}</p>
        <p className="mt-3 text-[14.5px] text-quiet">{p.description}</p>
        <TagList items={p.scores} className="mt-auto pt-5" />
      </div>
    </article>
  )
}

const tabs = [
  { id: "redesigns", label: "Redesigns", count: redesigns.length + 1 },
  { id: "development", label: "Development", count: devWorks.length },
] as const

export function Work() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("redesigns")
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key]
    if (!step) return
    e.preventDefault()
    const next = (i + step + tabs.length) % tabs.length
    setTab(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <section id="work" className="section-pad">
      <div className="wrap">
        <SectionHead
          kicker="Selected work"
          title={
            <>
              <span className="font-extralight">Real projects.</span> <span className="font-semibold">Real results.</span>
            </>
          }
          lede="Redesigns show the old site next to mine. Development projects are sites I built in WordPress from an existing design."
        />

        <div role="tablist" aria-label="Project type" className="mb-8 flex gap-8 border-b border-rule">
          {tabs.map((t, i) => {
            const on = tab === t.id
            return (
              <button
                key={t.id}
                ref={(b) => {
                  refs.current[i] = b
                }}
                type="button"
                role="tab"
                id={`work-tab-${t.id}`}
                aria-selected={on}
                aria-controls={`work-panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "-mb-px flex cursor-pointer items-center gap-2 border-b-2 pb-3 pt-1 text-[16px] transition-[border-color,color] duration-200",
                  on ? "border-ink text-ink" : "border-transparent text-quiet hover:text-ink"
                )}
              >
                {t.label}
                <span className="text-[13px] tabular-nums text-quiet">{t.count}</span>
              </button>
            )
          })}
        </div>

        {tab === "redesigns" ? (
          <div
            id="work-panel-redesigns"
            role="tabpanel"
            aria-labelledby="work-tab-redesigns"
            className="grid gap-5 motion-safe:animate-[answer-in_320ms_var(--ease-out-strong)] lg:grid-cols-2"
          >
            <FeaturedCard p={featured} />
            {redesigns.map((p) => (
              <RedesignCard key={p.name} p={p} />
            ))}
          </div>
        ) : (
          <div
            id="work-panel-development"
            role="tabpanel"
            aria-labelledby="work-tab-development"
            className="grid gap-5 motion-safe:animate-[answer-in_320ms_var(--ease-out-strong)] md:grid-cols-2 lg:grid-cols-3"
          >
            {devWorks.map((p) => (
              <DevCard key={p.name} p={p} />
            ))}
          </div>
        )}

        <p className="mt-10 max-w-[80ch] text-[14.5px] leading-relaxed text-quiet">
          <span className="font-medium text-ink">Also: </span>
          {moreProjects}
        </p>
      </div>
    </section>
  )
}
