import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

let lenis: Lenis | null = null
/** The active Lenis instance, or null when smooth scrolling is off (reduced motion). */
export const getLenis = () => lenis

/** Scroll to an in-page anchor, through Lenis when it is running, accounting for the sticky header. */
/** Scroll to a section by hash. `immediate` jumps without animating (used when arriving from another page). */
export function scrollToHash(hash: string, { immediate = false } = {}) {
  const target = document.querySelector<HTMLElement>(hash)
  if (!target) return
  if (lenis) {
    // Lenis caches the page height; after a route change it would clamp to the old page's length.
    lenis.resize()
    lenis.scrollTo(target, { offset: -72, immediate })
  } else {
    target.scrollIntoView({ behavior: immediate || prefersReducedMotion() ? "auto" : "smooth", block: "start" })
  }
  // Keep React Router's history state; only the hash changes.
  history.replaceState(history.state, "", hash)
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * The site's one smooth-scroll engine (Lenis), driven by GSAP's ticker so ScrollTrigger and Lenis
 * share a single clock. Skipped entirely under reduced motion: native scrolling, no inertia.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      anchors: { offset: -72 },
    })
    lenis = instance
    const onTick = (time: number) => instance.raf(time * 1000)

    instance.on("scroll", ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    // Fonts and images change layout after first paint; re-measure triggers once they settle.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener("load", refresh)

    return () => {
      window.removeEventListener("load", refresh)
      gsap.ticker.remove(onTick)
      instance.destroy()
      lenis = null
    }
  }, [])
}
