import { useEffect, useLayoutEffect, useRef } from "react"
import { ButtonLink, buttonClass } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { SplitWords } from "@/components/ui/split-words"
import { useToast } from "@/components/ui/toast"
import { gsap, prefersReducedMotion } from "@/lib/motion"
import { useAudience } from "@/lib/audience"
import { heroCopy, resultsBand, site } from "@/data/content"

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

export function Hero() {
  const { audience } = useAudience()
  const toast = useToast()
  const c = heroCopy[audience]
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

