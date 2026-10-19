import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SplitWords } from "@/components/ui/split-words"

type Props = {
  kicker?: string
  title: ReactNode
  lede?: ReactNode
  /** Light text for dark sections. */
  dark?: boolean
  /**
   * "split": heading left, lede right (default).
   * "center": stacked and centred, for the coloured sheets.
   * "stack": stacked and left-aligned, for side columns.
   */
  align?: "split" | "center" | "stack"
  id?: string
}

/** The heading block every section starts with, so headings share one size, rhythm and colour logic. */
export function SectionHead({ kicker, title, lede, dark = false, align = "split", id }: Props) {
  const layout = {
    split: "items-end gap-[clamp(20px,3vw,56px)] md:grid-cols-2",
    center: "mx-auto max-w-[760px] justify-items-center gap-5 text-center",
    stack: "max-w-[560px] gap-5",
  }[align]
  return (
    <div className={cn("mb-[clamp(36px,5vw,64px)] grid", layout)}>
      <div>
        {kicker && <span className={cn("mb-3.5 block text-[15px] font-medium", dark ? "text-soft" : "text-violet")}>{kicker}</span>}
        <SplitWords id={id} className="display-head text-[clamp(40px,5.6vw,68px)] leading-[1.02]">
          {title}
        </SplitWords>
      </div>
      {lede && (
        <p className={cn("max-w-[56ch] text-[clamp(16px,1.6vw,19px)] leading-relaxed", dark ? "text-cream/75" : "text-quiet")}>{lede}</p>
      )}
    </div>
  )
}
