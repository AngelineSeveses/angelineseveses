import { useEffect, useRef, type KeyboardEvent } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { buttonClass } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { ProjectCard, ProjectRow } from "@/components/sections/project-card"
import { projects, type ProjectCategory } from "@/data/projects"
import { cn } from "@/lib/utils"

const tabs: { id: ProjectCategory; label: string; extra: string }[] = [
  { id: "redesign", label: "Redesign", extra: "More design work" },
  { id: "development", label: "Development", extra: "More builds" },
]

/** All projects, in two tabs. The tab lives in the URL (?tab=development), so each one can be linked to. */
export function ProjectsPage() {
  const [params, setParams] = useSearchParams()
  const tab: ProjectCategory = params.get("tab") === "development" ? "development" : "redesign"
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    document.title = "Projects | Angeline Seveses"
    return () => {
      document.title = "Freelance WordPress Developer & Web Designer | Angeline Seveses"
    }
  }, [])

  const select = (id: ProjectCategory) => setParams(id === "redesign" ? {} : { tab: id }, { replace: true, preventScrollReset: true })

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key]
    if (!step) return
    e.preventDefault()
    const next = (i + step + tabs.length) % tabs.length
    select(tabs[next].id)
    refs.current[next]?.focus()
  }

  const inTab = projects.filter((p) => p.category === tab)
  const withImage = inTab.filter((p) => p.image)
  const textOnly = inTab.filter((p) => !p.image)
  const current = tabs.find((t) => t.id === tab)!

  return (
    <main id="top">
      <section className="pb-[clamp(64px,8vw,112px)] pt-[clamp(48px,7vw,96px)]">
        <div className="wrap">
          <Link to="/#work" className="mb-8 inline-flex items-center gap-1.5 text-[14.5px] text-quiet no-underline hover:text-ink">
            <Icon name="arrowLeft" className="h-4 w-4" />
            Back to home
          </Link>
          <SectionHead
            kicker="Projects"
            title={
              <>
                <span className="font-extralight">Everything I've</span> <span className="font-semibold">designed and built.</span>
              </>
            }
            lede="Redesigns are sites I redesigned for better results. Development projects are sites I built in WordPress or React from an existing design."
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
                  id={`projects-tab-${t.id}`}
                  aria-selected={on}
                  aria-controls="projects-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(t.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "-mb-px flex cursor-pointer items-center gap-2 border-b-2 pb-3 pt-1 text-[17px] transition-[border-color,color] duration-200",
                    on ? "border-ink text-ink" : "border-transparent text-quiet hover:text-ink"
                  )}
                >
                  {t.label}
                  <span className="text-[13px] tabular-nums text-quiet">{projects.filter((p) => p.category === t.id).length}</span>
                </button>
              )
            })}
          </div>

          <div
            key={tab}
            id="projects-panel"
            role="tabpanel"
            aria-labelledby={`projects-tab-${tab}`}
            className="motion-safe:animate-[answer-in_320ms_var(--ease-out-strong)]"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {withImage.map((p) => (
                <ProjectCard key={p.name} p={p} />
              ))}
            </div>
            {textOnly.length > 0 && (
              <div className="mt-[clamp(48px,6vw,80px)]">
                <h2 className="mb-4 font-sans font-medium text-[clamp(26px,2.6vw,34px)] tracking-[-0.035em]">{current.extra}</h2>
                <ul className="border-b border-rule">
                  {textOnly.map((p) => (
                    <ProjectRow key={p.name} p={p} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="wrap pb-[clamp(64px,8vw,112px)]">
        <div className="flex flex-col items-center gap-6 rounded-sheet bg-plum px-6 py-[clamp(56px,7vw,96px)] text-center text-cream">
          <h2 className="display-head max-w-[18ch] text-[clamp(36px,4.6vw,60px)] leading-[1.02]">
            <span className="font-extralight">Have a project</span> <span className="font-semibold">like these?</span>
          </h2>
          <p className="max-w-[44ch] text-[17px] text-cream/75">Tell me about your website and I'll reply with next steps and a clear quote.</p>
          <Link to="/#contact" className={buttonClass({ variant: "soft", tone: "dark", size: "lg" })}>
            Start a project
          </Link>
        </div>
      </section>
    </main>
  )
}
