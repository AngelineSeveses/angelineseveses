import { useRef, useState, type KeyboardEvent } from "react"
import { Fill } from "@/components/ui/fill"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { testimonials } from "@/data/content"
import { cn } from "@/lib/utils"

/**
 * One quote at a time, set large, with the people listed beside it to switch between.
 * Nothing rotates on its own: the visitor reads at their own pace.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0)
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const t = testimonials[index]
  const count = testimonials.length

  const go = (i: number, focus = false) => {
    const next = (i + count) % count
    setIndex(next)
    if (focus) refs.current[next]?.focus()
  }

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = ({ ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 } as Record<string, number>)[e.key]
    if (!step) return
    e.preventDefault()
    go(i + step, true)
  }

  return (
    <section aria-labelledby="t-title" className="dark rounded-sheet bg-band py-[clamp(64px,8vw,112px)] text-cream">
      <div className="wrap grid gap-x-[clamp(32px,6vw,96px)] gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
        <div>
          <SectionHead
            dark
            align="stack"
            kicker="Testimonials"
            id="t-title"
            title={
              <>
                <span className="font-extralight">Kind words from</span> <span className="font-semibold">people I've built with.</span>
              </>
            }
          />
          <div role="tablist" aria-label="Testimonials" aria-orientation="vertical" className="grid border-t border-cream/15">
            {testimonials.map((p, i) => {
              const on = i === index
              return (
                <button
                  key={p.name}
                  ref={(b) => {
                    refs.current[i] = b
                  }}
                  type="button"
                  role="tab"
                  id={`t-tab-${i}`}
                  aria-selected={on}
                  aria-controls="t-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "relative flex cursor-pointer items-center gap-4 border-b border-cream/15 py-4 text-left transition-colors duration-200",
                    on ? "text-cream" : "text-cream/55 hover:text-cream/85"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-px left-0 h-[2px] bg-soft transition-[width] duration-300 ease-out-strong motion-reduce:transition-none",
                      on ? "w-full" : "w-0"
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid h-11 w-11 flex-none place-items-center rounded-full font-serif text-[17px] italic transition-colors duration-200",
                      on ? "bg-lavender text-ink" : "bg-cream/10 text-cream/70"
                    )}
                  >
                    {p.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[16px] font-medium">{p.name}</span>
                    <span className="block truncate text-[13.5px] opacity-75">{p.role}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <p className="mt-6 text-[14px]">
            <Fill dark text="[Add a client testimonial with a result]" />
          </p>
        </div>

        <figure
          key={index}
          id="t-panel"
          role="tabpanel"
          aria-labelledby={`t-tab-${index}`}
          className="m-0 flex flex-col justify-between motion-safe:animate-[answer-in_420ms_var(--ease-out-strong)] lg:pt-[clamp(8px,2vw,40px)]"
        >
          <blockquote className="m-0">
            <span aria-hidden="true" className="block h-[0.5em] font-serif text-[clamp(96px,10vw,150px)] italic leading-[0.9] text-soft">
              “
            </span>
            <p className="mt-6 font-serif text-[clamp(28px,3.4vw,48px)] leading-[1.15] tracking-[-0.02em] text-balance">{t.quote}</p>
          </blockquote>
          <figcaption className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-cream/15 pt-6">
            <span className="text-[15px]">
              <b className="font-medium">{t.name}</b>
              <span className="block text-cream/65">{t.role}</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="mr-1 text-[14px] tabular-nums text-cream/60">
                {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
              </span>
              {[
                { step: -1, label: "Previous testimonial", icon: "arrowLeft" as const },
                { step: 1, label: "Next testimonial", icon: "arrowRight" as const },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  aria-label={b.label}
                  onClick={() => go(index + b.step)}
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-cream/25 text-cream transition-[background-color,transform] duration-200 hover:bg-cream/10 active:scale-[0.94]"
                >
                  <Icon name={b.icon} className="h-[18px] w-[18px]" />
                </button>
              ))}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
