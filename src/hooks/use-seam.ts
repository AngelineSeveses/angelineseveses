import { useCallback, useEffect, useRef, type KeyboardEvent, type PointerEvent, type RefObject } from "react"
import { useReducedMotion } from "motion/react"
import { gsap } from "@/lib/motion"

const DEFAULT_SNAPS = [12, 50, 88]

/** Rubber-band past the edges: the further you drag, the less it follows. */
function rubberband(p: number) {
  const edge = 2
  const dim = 30
  const c = 0.55
  if (p < edge) {
    const o = edge - p
    return edge - (o * dim * c) / (dim + c * o)
  }
  if (p > 100 - edge) {
    const o = p - (100 - edge)
    return 100 - edge + (o * dim * c) / (dim + c * o)
  }
  return p
}

/** Apple's momentum projection, with a 0.998 deceleration rate. */
function project(velocity: number, decel = 0.998) {
  return ((velocity / 1000) * decel) / (1 - decel)
}

/**
 * Drives the hero seam: 1:1 drag that keeps the grab offset, momentum projection on release,
 * and a critically damped spring (damping 1.0, response 0.4s) that carries the release velocity.
 * Writes straight to a CSS variable so React doesn't re-render on every frame.
 */
export function useSeam(
  containerRef: RefObject<HTMLDivElement | null>,
  knobRef: RefObject<HTMLButtonElement | null>,
  { initial = 50, snaps = DEFAULT_SNAPS }: { initial?: number; snaps?: number[] } = {}
) {
  const reduce = useReducedMotion()
  const pos = useRef(initial)
  const tween = useRef<gsap.core.Tween | null>(null)
  const raf = useRef(0)
  const dragging = useRef(false)
  const offset = useRef(0)
  const history = useRef<{ p: number; t: number }[]>([])

  const render = useCallback(() => {
    containerRef.current?.style.setProperty("--cut", `${pos.current}%`)
    knobRef.current?.setAttribute("aria-valuenow", String(Math.round(pos.current)))
  }, [containerRef, knobRef])

  useEffect(() => {
    render()
    return () => {
      cancelAnimationFrame(raf.current)
      tween.current?.kill()
    }
  }, [render])

  /** Scripted sweep (intro, project switch). Any drag interrupts it from the current position. */
  const sweep = useCallback(
    (from: number, to: number, opts: { duration?: number; delay?: number; onComplete?: () => void } = {}) => {
      tween.current?.kill()
      cancelAnimationFrame(raf.current)
      if (reduce) {
        pos.current = to
        render()
        opts.onComplete?.()
        return
      }
      const proxy = { p: from }
      pos.current = from
      render()
      tween.current = gsap.to(proxy, {
        p: to,
        duration: opts.duration ?? 1.2,
        delay: opts.delay ?? 0,
        ease: "power3.inOut",
        onUpdate: () => {
          pos.current = proxy.p
          render()
        },
        onComplete: opts.onComplete,
      })
    },
    [reduce, render]
  )

  const percent = (clientX: number) => {
    const r = containerRef.current!.getBoundingClientRect()
    return ((clientX - r.left) / r.width) * 100
  }

  const springTo = (target: number, v0: number) => {
    cancelAnimationFrame(raf.current)
    if (reduce) {
      pos.current = target
      render()
      return
    }
    const response = 0.4
    const k = Math.pow((2 * Math.PI) / response, 2)
    const c = (4 * Math.PI * 1.0) / response
    let v = v0
    let last = performance.now()
    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000)
      last = now
      v += (-k * (pos.current - target) - c * v) * dt
      pos.current += v * dt
      render()
      if (Math.abs(v) < 0.05 && Math.abs(pos.current - target) < 0.05) {
        pos.current = target
        render()
        return
      }
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    dragging.current = true
    tween.current?.kill()
    cancelAnimationFrame(raf.current)
    e.currentTarget.setPointerCapture(e.pointerId)
    const onKnob = (e.target as HTMLElement).closest("[data-seam-knob]")
    offset.current = onKnob ? percent(e.clientX) - pos.current : 0
    if (!onKnob) {
      pos.current = rubberband(percent(e.clientX))
      render()
    }
    history.current = [{ p: pos.current, t: performance.now() }]
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    pos.current = rubberband(percent(e.clientX) - offset.current)
    render()
    history.current.push({ p: pos.current, t: performance.now() })
    if (history.current.length > 5) history.current.shift()
  }

  const onPointerUp = () => {
    if (!dragging.current) return
    dragging.current = false
    const h = history.current
    const a = h[0]
    const b = h[h.length - 1]
    const velocity = ((b.p - a.p) / Math.max(1, b.t - a.t)) * 1000
    const projected = pos.current + project(velocity) / 10
    const target = snaps.reduce((x, y) => (Math.abs(y - projected) < Math.abs(x - projected) ? y : x))
    springTo(target, velocity)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const step = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 }[e.key]
    if (step === undefined) return
    e.preventDefault()
    tween.current?.kill()
    cancelAnimationFrame(raf.current)
    pos.current = Math.max(0, Math.min(100, pos.current + step))
    render()
  }

  return {
    sweep,
    containerProps: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp },
    knobProps: { onKeyDown, "data-seam-knob": true },
  }
}
