import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import type { Shot } from "@/data/content"

type Props = {
  name: string
  before: Shot & { label: string }
  after: Shot & { label: string }
  className?: string
}

/** Before/after comparison. Tracks the pointer 1:1 with no easing, because the person is reading the images. */
export function CompareSlider({ name, before, after, className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [value, setValue] = useState(50)

  const fromPointer = (e: PointerEvent) => {
    const r = ref.current!.getBoundingClientRect()
    setValue(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)))
  }

  const onKey = (e: KeyboardEvent) => {
    const step = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 }[e.key]
    if (step === undefined) return
    e.preventDefault()
    setValue((v) => Math.max(0, Math.min(100, v + step)))
  }

  return (
    <div
      ref={ref}
      role="slider"
      data-cursor="drag"
      tabIndex={0}
      aria-label={`Compare ${name} before and after the redesign`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      onPointerDown={(e) => {
        dragging.current = true
        e.currentTarget.setPointerCapture(e.pointerId)
        fromPointer(e)
      }}
      onPointerMove={(e) => dragging.current && fromPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
      onKeyDown={onKey}
      className={cn(
        "relative aspect-[16/10] max-w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-card border border-rule bg-night",
        className
      )}
    >
      <img src={before.src} alt={before.alt} loading="lazy" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top" />
      <img
        src={after.src}
        alt={after.alt}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 0 0 ${value}%)` }}
      />
      <span className="absolute left-3 top-3 z-[2] rounded-tag bg-paper/90 px-2 py-0.5 text-[12.5px] text-ink">{before.label}</span>
      <span className="absolute right-3 top-3 z-[2] rounded-tag bg-paper/90 px-2 py-0.5 text-[12.5px] text-ink">{after.label}</span>
      <div className="absolute inset-y-0 z-[2] w-0" style={{ left: `${value}%` }} aria-hidden="true">
        <div className="stitch-v absolute inset-y-0 -left-px w-0.5" />
        <span className="absolute left-0 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rule bg-paper text-violet">
          <Icon name="drag" className="h-[18px] w-[18px]" />
        </span>
      </div>
    </div>
  )
}
