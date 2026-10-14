import { cn } from "@/lib/utils"

/** The "AS" monogram: a circle split by the stitch, sketch weight on the left, build weight on the right. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className={cn("h-24 w-24", className)}>
      <circle cx="48" cy="48" r="47" fill="var(--color-night-2)" />
      <path d="M48 1 A47 47 0 0 0 48 95 Z" fill="var(--color-cream)" />
      <line x1="48" y1="10" x2="48" y2="86" stroke="var(--color-soft)" strokeWidth="2" strokeDasharray="6 5" />
      <text x="28" y="59" fontFamily="var(--font-sans)" fontSize="32" fontWeight="200" fill="var(--color-ink)" textAnchor="middle">
        A
      </text>
      <text x="68" y="59" fontFamily="var(--font-sans)" fontSize="32" fontWeight="600" fill="var(--color-cream)" textAnchor="middle">
        S
      </text>
    </svg>
  )
}
