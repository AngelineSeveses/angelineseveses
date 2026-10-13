import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

/**
 * A "Drag" label that follows the pointer over anything marked data-cursor="drag".
 * Mouse and trackpad only; it eases toward the pointer so it feels attached, not glued.
 */
export function DragCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let raf = 0
    let visible = false

    const tick = () => {
      x += (tx - x) * 0.28
      y += (ty - y) * 0.28
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -150%) scale(${visible ? 1 : 0.9})`
      if (Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2) raf = requestAnimationFrame(tick)
      else raf = 0
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const over = (e.target as Element | null)?.closest?.('[data-cursor="drag"]')
      tx = e.clientX
      ty = e.clientY
      if (!!over !== visible) {
        visible = !!over
        if (visible) {
          x = tx
          y = ty
        }
        el.style.opacity = visible ? "1" : "0"
      }
      if (!raf) raf = requestAnimationFrame(tick)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduce])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full bg-ink px-3 py-1 text-[13px] font-medium text-cream opacity-0 transition-opacity duration-150"
    >
      Drag
    </div>
  )
}
