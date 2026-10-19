import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { buttonClass } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { CheckList } from "@/components/ui/check-list"
import { Laptop } from "@/components/ui/laptop"
import { cn } from "@/lib/utils"
import { TagList } from "@/components/ui/tag-list"
import { homeProjects, projects, type Project } from "@/data/projects"

/** One selected project: the finished site on the left, the story and results on the right. */
function WorkCard({ p, index }: { p: Project; index: number }) {
  const headline = p.compare?.headline
  return (
    <article
      data-stack={index}
      className="group grid min-w-0 gap-2 overflow-hidden rounded-card border border-rule bg-paper p-2.5 shadow-[0_-18px_40px_-28px_rgb(31_24_40/0.35)] md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-0 lg:sticky lg:top-[var(--stack,96px)]"
    >
      {p.image && (
        <a
          href={p.link?.href}
          target="_blank"
          rel="noopener"
          tabIndex={-1}
          aria-hidden="true"
          className={cn("grid place-items-center rounded-[10px] px-[2%] py-[clamp(28px,4vw,56px)]", index % 2 ? "bg-lavender" : "bg-mist")}
        >
          <Laptop shot={p.image} />
        </a>
      )}
      <div className="flex flex-col justify-center p-[clamp(18px,3.4vw,48px)]">
        <span className="font-serif text-[18px] italic text-violet tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-3 font-sans font-medium text-[clamp(28px,2.9vw,38px)] leading-[1.06] tracking-[-0.035em] text-balance">{p.name}</h3>
        <p className="mt-1 text-[14px] text-quiet">{p.meta}</p>
        {headline && (
          <p className="mt-5 flex items-baseline gap-2.5">
            <span className="whitespace-nowrap font-serif text-[clamp(34px,3.4vw,44px)] leading-none tracking-[-0.03em] tabular-nums">
              <span className="text-quiet">{headline.from}</span>
              <span className="mx-1.5 italic text-violet" aria-label="to">
                →
              </span>
              <span>{headline.to}</span>
            </span>
            <span className="text-[14px] leading-tight text-quiet">{headline.label}</span>
          </p>
        )}
        <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-quiet">{p.description}</p>
        {p.compare && <CheckList items={p.compare.results} className="mt-5 border-t border-rule pt-4" />}
        {p.scores && <TagList items={p.scores} className="mt-5" />}
        {p.link && (
          <a href={p.link.href} target="_blank" rel="noopener" className={buttonClass({ variant: "primary", size: "md", className: "mt-7 self-start" })}>
            View project
            <Icon name="arrowUpRight" className="h-[18px] w-[18px]" />
            <span className="sr-only">: {p.name} (opens the live site)</span>
          </a>
        )}
      </div>
    </article>
  )
}

/**
 * Stacking cards (desktop): each card pins under the header, slightly lower than the one before,
 * and the next card slides over it. A card taller than the space left pins only once its bottom
 * is in view, so every line of every card can be read before it's covered.
 */
function useStackOffsets() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const list = ref.current
    if (!list) return
    const place = () => {
      for (const card of list.querySelectorAll<HTMLElement>("[data-stack]")) {
        const i = Number(card.dataset.stack)
        const top = Math.min(96 + i * 18, window.innerHeight - card.offsetHeight - 16)
        card.style.setProperty("--stack", `${top}px`)
      }
    }
    place()
    const ro = new ResizeObserver(place)
    ro.observe(list)
    window.addEventListener("resize", place)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", place)
    }
  }, [])
  return ref
}

/** Selected projects on the homepage; everything else lives on /projects. */
export function Work() {
  const listRef = useStackOffsets()
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
          lede="Redesigns and builds for real businesses, with what changed on each site."
        />
        <div ref={listRef} className="grid gap-5">
          {homeProjects.map((p, i) => (
            <WorkCard key={p.name} p={p} index={i} />
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <Link to="/projects" className={buttonClass({ variant: "primary", size: "lg" })}>
            View more projects
            <Icon name="arrowRight" className="h-[18px] w-[18px]" />
          </Link>
          <p className="text-[14px] text-quiet">{projects.length} projects across redesign and development</p>
        </div>
      </div>
    </section>
  )
}
