import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import { Icon } from "@/components/ui/icon"
import { useSeam } from "@/hooks/use-seam"
import { gsap, prefersReducedMotion } from "@/lib/motion"
import { heroShowcases } from "@/data/content"
import { cn } from "@/lib/utils"

/** The familiar close / minimise / zoom dots that make the frame read as a real browser window. */
const WINDOW_CONTROLS = ["#e5735f", "#e8b54a", "#6bb46a"]

/** Where the seam rests: mostly "after", with a sliver of the old site for contrast. */
const REST = 30

/**
 * A browser window whose tabs are industries. Picking a tab loads a real redesign from that world:
 * the seam sweeps across the old site, pins mark what changed, and the result counts up.
 */
export function Showcase() {
  const [index, setIndex] = useState(0)
  const show = heroShowcases[index]
  const frameRef = useRef<HTMLDivElement>(null)
  const knobRef = useRef<HTMLButtonElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const { sweep, containerProps, knobProps } = useSeam(frameRef, knobRef, { initial: REST, snaps: [8, REST, 92] })

  const play = useCallback(
    (first: boolean) => {
      const stage = stageRef.current
      if (!stage || prefersReducedMotion()) return
      const pins = stage.querySelectorAll("[data-pin]")
      const legend = stage.querySelectorAll("[data-legend]")
      const headline = show.project.headline
      // A replay can interrupt a half-finished entrance; clear it so nothing is left invisible.
      gsap.killTweensOf([...pins, ...legend])
      gsap.set([...pins, ...legend], { clearProps: "opacity,transform,scale" })

      sweep(100, REST, { duration: first ? 1.5 : 1, delay: first ? 0.7 : 0.05 })
      const at = first ? 1.9 : 0.9
      gsap.from(pins, { scale: 0.4, opacity: 0, duration: 0.5, ease: "back.out(2.2)", stagger: 0.12, delay: at })
      gsap.from(legend, { y: 10, opacity: 0, duration: 0.5, ease: "expo.out", stagger: 0.08, delay: at + 0.1 })
      const el = counterRef.current
      if (headline && el) {
        const counter = { v: Number(headline.from) }
        gsap.to(counter, {
          v: Number(headline.to),
          duration: 1.1,
          ease: "power2.out",
          delay: at + 0.15,
          onStart: () => {
            el.textContent = headline.from
          },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.v))
          },
        })
      }
    },
    [show, sweep]
  )

  const firstPlay = useRef(true)
  useLayoutEffect(() => {
    play(firstPlay.current)
    firstPlay.current = false
  }, [play])

  // Pointer tilt: additive depth, mouse only, always returns to flat on blur or when the tab is hidden.
  useEffect(() => {
    const el = tiltRef.current
    if (!el || prefersReducedMotion() || !matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" })
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" })
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const r = el.getBoundingClientRect()
        const nx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth
        const ny = (e.clientY - (r.top + r.height / 2)) / window.innerHeight
        ry(Math.max(-1, Math.min(1, nx)) * 4)
        rx(Math.max(-1, Math.min(1, ny)) * -3)
      })
    }
    const reset = () => {
      rx(0)
      ry(0)
    }
    const onVisibility = () => {
      if (document.hidden) reset()
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("blur", reset)
    document.addEventListener("visibilitychange", onVisibility)
    document.documentElement.addEventListener("pointerleave", reset)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("blur", reset)
      document.removeEventListener("visibilitychange", onVisibility)
      document.documentElement.removeEventListener("pointerleave", reset)
      gsap.set(el, { rotationX: 0, rotationY: 0 })
    }
  }, [])

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1 } as Record<string, number>)[e.key]
    if (!step) return
    e.preventDefault()
    const next = (i + step + heroShowcases.length) % heroShowcases.length
    setIndex(next)
    tabsRef.current[next]?.focus()
  }

  const headline = show.project.headline

  return (
    <div ref={stageRef} className="min-w-0">
      <div className="[perspective:1600px]">
        <div ref={tiltRef} className="relative [transform-style:preserve-3d]">
          <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rounded-card bg-night/60 sm:translate-x-5 sm:translate-y-5" />
          <div className="relative overflow-hidden rounded-card border border-ink/10 bg-chrome shadow-raised">
            {/* Browser chrome. The tabs are industries: switch tab, switch client. */}
            <div className="flex items-end gap-3 px-3 pt-2.5 sm:px-4">
              <span aria-hidden="true" className="mb-3 hidden gap-1.5 sm:flex">
                {WINDOW_CONTROLS.map((color) => (
                  <i key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                ))}
              </span>
              <div
                role="tablist"
                aria-label="See a redesign for your industry"
                className="-mb-px flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]"
              >
                {heroShowcases.map((s, i) => (
                  <button
                    key={s.industry}
                    ref={(b) => {
                      tabsRef.current[i] = b
                    }}
                    type="button"
                    role="tab"
                    id={`hero-tab-${i}`}
                    aria-selected={i === index}
                    aria-controls="hero-panel"
                    tabIndex={i === index ? 0 : -1}
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={cn(
                      "flex flex-none cursor-pointer items-center gap-2 whitespace-nowrap rounded-t-[10px] px-3.5 py-2 text-[13.5px] transition-[background-color,color] duration-200",
                      i === index ? "bg-paper font-medium text-ink" : "text-quiet hover:bg-paper/50 hover:text-ink"
                    )}
                  >
                    <i aria-hidden="true" className={cn("h-2 w-2 rounded-full", i === index ? "bg-violet" : "bg-ink/25")} />
                    {s.industry}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 border-b border-rule bg-paper px-4 py-2" aria-hidden="true">
              <span className="truncate rounded-full bg-cream px-3 py-0.5 text-xs text-quiet">{show.url}</span>
              <span className="ml-auto hidden text-xs text-quiet sm:inline">Drag the line to compare</span>
            </div>

            <div
              id="hero-panel"
              role="tabpanel"
              aria-labelledby={`hero-tab-${index}`}
              ref={frameRef}
              {...containerProps}
              data-cursor="drag"
              className="relative aspect-[16/10] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-night"
              style={{ ["--cut" as string]: `${REST}%` }}
            >
              <img
                key={`b-${index}`}
                src={show.project.before.src}
                alt={show.project.before.alt}
                width={900}
                height={563}
                className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
              />
              <div className="pointer-events-none absolute inset-0 [clip-path:inset(0_0_0_var(--cut))]">
                <img
                  key={`a-${index}`}
                  src={show.project.after.src}
                  alt={show.project.after.alt}
                  width={900}
                  height={563}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                {show.pins.map((p, i) => (
                  <span
                    key={`${index}-${p.label}`}
                    data-pin
                    aria-hidden="true"
                    className="absolute -ml-3.5 -mt-3.5 grid h-7 w-7 place-items-center rounded-full bg-violet text-[13px] font-semibold tabular-nums text-paper shadow-[0_6px_16px_rgb(31_24_40/0.4)] ring-[3px] ring-paper"
                    style={{ left: p.x, top: p.y }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-3 left-3 z-[2] rounded-tag bg-ink/80 px-2 py-0.5 text-[12.5px] text-cream">Before</span>
              <span className="absolute bottom-3 right-3 z-[2] rounded-tag bg-violet px-2 py-0.5 text-[12.5px] text-paper">After, my redesign</span>
              <div className="absolute inset-y-0 z-[3] w-0" style={{ left: "var(--cut)" }}>
                <svg preserveAspectRatio="none" viewBox="0 0 2 900" aria-hidden="true" className="absolute -left-px top-0 h-full w-0.5 overflow-visible">
                  <line x1="1" y1="0" x2="1" y2="900" stroke="var(--color-soft)" strokeWidth="2" strokeDasharray="8 7" />
                </svg>
                <button
                  ref={knobRef}
                  type="button"
                  role="slider"
                  aria-label={`Drag to compare ${show.client}'s old website with the redesign`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={REST}
                  {...knobProps}
                  className="absolute left-0 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full border border-rule bg-paper p-0 text-violet shadow-[0_4px_14px_rgb(29_26_34/0.2)] transition-transform duration-[160ms] ease-out-strong active:cursor-grabbing active:scale-[0.94]"
                >
                  <Icon name="drag" className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Below the window, on the violet band: the result and what changed. */}
      <div className="mt-10 grid gap-5 text-cream md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-10">
        {headline && (
          <p className="flex items-baseline gap-3">
            <span className="whitespace-nowrap text-[clamp(40px,4.4vw,60px)] leading-none tracking-[-0.05em] tabular-nums">
              <span className="font-extralight text-cream/55">{headline.from}</span>
              <span className="mx-2 font-extralight text-soft" aria-label="to">
                →
              </span>
              <span ref={counterRef} className="font-semibold">
                {headline.to}
              </span>
            </span>
            <span className="text-[14px] leading-tight text-cream/80">
              {headline.label}
              <span className="block text-cream/55">{show.client}</span>
            </span>
          </p>
        )}
        <ol aria-label="What changed" className="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
          {show.pins.map((p, i) => (
            <li key={`${index}-${p.label}`} data-legend className="flex items-center gap-2 text-[14px]">
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-cream text-[11px] font-semibold tabular-nums text-violet">{i + 1}</span>
              {p.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

