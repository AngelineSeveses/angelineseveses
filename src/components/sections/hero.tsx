import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react"
import { ButtonLink, buttonClass } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { SplitWords } from "@/components/ui/split-words"
import { useSeam } from "@/hooks/use-seam"
import { gsap, prefersReducedMotion } from "@/lib/motion"
import { heroShowcases, resultsBand, site } from "@/data/content"
import { useAudience } from "@/lib/audience"
import { useToast } from "@/components/ui/toast"
import { cn } from "@/lib/utils"

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
          <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl bg-night sm:translate-x-6 sm:translate-y-6" />
          <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-[#ECE6DC] shadow-[0_50px_100px_-40px_rgb(20_10_40/0.75)]">
            {/* Browser chrome. The tabs are industries: switch tab, switch client. */}
            <div className="flex items-end gap-3 px-3 pt-2.5 sm:px-4">
              <span aria-hidden="true" className="mb-3 hidden gap-1.5 sm:flex">
                <i className="h-2.5 w-2.5 rounded-full bg-[#E5735F]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#E8B54A]" />
                <i className="h-2.5 w-2.5 rounded-full bg-[#6BB46A]" />
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
                      "flex flex-none cursor-pointer items-center gap-2 whitespace-nowrap rounded-t-xl px-3.5 py-2 text-[13.5px] transition-[background-color,color] duration-200",
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
              <span className="absolute bottom-3 left-3 z-[2] rounded-full bg-ink/80 px-2.5 py-0.5 text-[12.5px] text-cream">Before</span>
              <span className="absolute bottom-3 right-3 z-[2] rounded-full bg-violet px-2.5 py-0.5 text-[12.5px] text-paper">After, my redesign</span>
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
        <ol aria-label="What changed" className="flex flex-wrap gap-2 md:justify-end">
          {show.pins.map((p, i) => (
            <li key={`${index}-${p.label}`} data-legend className="flex items-center gap-2 rounded-full bg-cream/10 py-1 pl-1 pr-3 text-[13.5px]">
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-cream text-[11px] font-semibold tabular-nums text-violet">{i + 1}</span>
              {p.label}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/** Results that ride along the seam in the hero. Each one is a real, credited number. */
const ribbonText = resultsBand
  .map((r) => (r.from !== undefined ? `${r.from} → ${r.to} ${r.label}, ${r.client.split(",")[0]}` : `${r.to} ${r.label}`))
  .join("   ✦   ")

/**
 * The seam as a flowing stitch across the hero, carrying the results along it.
 * One SVG path, drawn twice: dashed thread underneath, text on top. It drifts slowly and
 * stops when offscreen, when the tab is hidden, or entirely under reduced motion.
 */
function SeamRibbon() {
  const textRef = useRef<SVGTextPathElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const tp = textRef.current
    const svg = svgRef.current
    if (!tp || !svg || prefersReducedMotion()) return
    const state = { o: 0 }
    const tween = gsap.to(state, {
      o: -50,
      duration: 60,
      ease: "none",
      repeat: -1,
      onUpdate: () => tp.setAttribute("startOffset", `${state.o}%`),
    })
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? tween.play() : tween.pause()))
    io.observe(svg)
    const onVis = () => (document.hidden ? tween.pause() : tween.play())
    document.addEventListener("visibilitychange", onVis)
    return () => {
      io.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      tween.kill()
    }
  }, [])

  const d = "M -80 300 C 220 120, 420 120, 640 230 S 1080 380, 1520 150"
  return (
    <svg ref={svgRef} viewBox="0 0 1440 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[clamp(220px,32vw,420px)] w-full">
      <defs>
        <path id="seam-path" d={d} />
      </defs>
      <use href="#seam-path" fill="none" stroke="var(--color-violet)" strokeWidth="2" strokeDasharray="10 9" opacity="0.55" />
      <text className="fill-ink font-serif text-[22px] italic" dy="-12">
        <textPath ref={textRef} href="#seam-path" startOffset="0%">
          {`${ribbonText}   ✦   ${ribbonText}   ✦   `}
        </textPath>
      </text>
    </svg>
  )
}

const copy = {
  business: {
    eyebrow: "Web designer and WordPress developer",
    line1: "Websites that",
    line2: "bring in customers.",
    sub: "I design and build WordPress sites that make small businesses look trusted and get more enquiries.",
  },
  hiring: {
    eyebrow: "Open to part-time and full-time remote roles",
    line1: "A designer who",
    line2: "also builds the site.",
    sub: "4+ years taking websites from Figma to WordPress for clients in Canada, the US, Australia and the Netherlands.",
  },
}

export function Hero() {
  const { audience } = useAudience()
  const toast = useToast()
  const c = copy[audience]
  const copyRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!copyRef.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from("[data-rise]", { y: 16, duration: 1, ease: "expo.out", stagger: 0.08, delay: 0.4 })
    }, copyRef)
    return () => ctx.revert()
  }, [])

  return (
    <section aria-labelledby="hero-title" className="relative -mt-[72px] overflow-hidden pt-[72px]">
      <div ref={copyRef} className="wrap relative z-[1] flex flex-col items-center pb-[clamp(200px,26vw,330px)] pt-[clamp(56px,9vw,120px)] text-center">
        <p data-rise className="mb-6 text-[15px] text-quiet">
          {c.eyebrow}
        </p>
        <SplitWords
          key={audience}
          as="h1"
          id="hero-title"
          trigger="load"
          delay={0.05}
          className="serif-head max-w-[14ch] text-[clamp(52px,8.4vw,124px)] leading-[0.96]"
        >
          <span className="block font-extralight">{c.line1}</span>
          <span className="block font-semibold">{c.line2}</span>
        </SplitWords>
        <p data-rise className="mt-7 max-w-[42ch] text-[clamp(17px,1.5vw,20px)] leading-relaxed text-quiet">
          {c.sub}
        </p>
        <div data-rise className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {audience === "business" ? (
            <>
              <ButtonLink href="#contact" variant="soft" size="lg">
                Start a project
              </ButtonLink>
              <ButtonLink href="#before-after" variant="ghost" size="lg">
                See a redesign
                <Icon name="arrowDown" className="h-[18px] w-[18px]" />
              </ButtonLink>
            </>
          ) : (
            <>
              <button type="button" onClick={() => toast("Link your CV PDF here")} className={buttonClass({ variant: "soft", size: "lg" })}>
                <Icon name="cv" className="h-5 w-5" />
                View my CV
              </button>
              <a href={`mailto:${site.email}`} className={buttonClass({ variant: "ghost", size: "lg" })}>
                <Icon name="mail" className="h-5 w-5" />
                Email me
              </a>
            </>
          )}
        </div>
      </div>
      <SeamRibbon />
    </section>
  )
}

/** Client names set as a typographic band: honest proof without borrowing anyone's logo. */
export function ClientBand() {
  const clients = ["G&L Auto", "CleanSpace", "Impact Cleaning", "Froggy Fence", "New Media Services", "Burlington Food Hall", "D&M Tilt 'n Load", "Ottawa Millwork"]
  return (
    <div className="relative z-[1] rounded-t-[clamp(28px,4vw,48px)] bg-band pb-[clamp(72px,9vw,120px)] pt-[clamp(36px,4vw,52px)] text-cream">
      <div className="wrap">
        <p className="text-center text-[13.5px] text-cream/60">Websites I've designed and built for</p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-[clamp(24px,4vw,56px)] gap-y-4">
          {clients.map((c) => (
            <li key={c} className="whitespace-nowrap font-serif text-[clamp(20px,2.2vw,28px)] italic text-cream/85">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** The plum sheet: pick an industry, drag the seam, see the result. */
export function BeforeAfter() {
  return (
    <section
      id="before-after"
      aria-labelledby="ba-title"
      className="dark relative z-[2] -mt-[clamp(40px,5vw,64px)] rounded-[clamp(28px,4vw,48px)] bg-plum pb-[clamp(64px,8vw,112px)] pt-[clamp(56px,7vw,96px)] text-cream"
    >
      <div className="wrap">
        <div className="mx-auto mb-[clamp(36px,5vw,64px)] max-w-[760px] text-center">
          <SplitWords id="ba-title" className="serif-head text-[clamp(42px,6vw,84px)] leading-[1]">
            <span className="font-extralight">From dated</span> <span className="font-semibold">to trusted.</span>
          </SplitWords>
          <p className="mx-auto mt-5 max-w-[46ch] text-[clamp(16px,1.4vw,19px)] text-cream/75">
            Real client sites. Pick an industry, then drag the line to compare the old site with my redesign.
          </p>
        </div>
        <div className="mx-auto max-w-[1040px]">
          <Showcase />
        </div>
      </div>
    </section>
  )
}
