import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SplitWords } from "@/components/ui/split-words"

type Props = { kicker: string; title: ReactNode; lede?: ReactNode; dark?: boolean; id?: string }

/** Kicker + H2 on the left, optional lede on the right; stacks on small screens. */
export function SectionHead({ kicker, title, lede, dark = false, id }: Props) {
  return (
    <div className="mb-[clamp(40px,6vw,72px)] grid items-end gap-[clamp(24px,4vw,64px)] md:grid-cols-2">
      <div>
        <span className={cn("mb-3.5 block text-[15px] font-medium", dark ? "text-soft" : "text-violet")}>{kicker}</span>
        <SplitWords id={id} className="text-[clamp(36px,5.2vw,60px)] leading-[1.04] tracking-[-0.04em]">
          {title}
        </SplitWords>
      </div>
      {lede && (
        <p className={cn("max-w-[56ch] text-[clamp(18px,1.9vw,20px)] leading-relaxed", dark ? "text-quiet-dark" : "text-quiet")}>{lede}</p>
      )}
    </div>
  )
}
