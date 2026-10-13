import { Fragment } from "react"
import { cn } from "@/lib/utils"

/** Renders text, turning any [bracketed placeholder] into a dashed chip so it's easy to spot and fill in. */
export function Fill({ text, dark = false }: { text: string; dark?: boolean }) {
  const parts = text.split(/(\[[^\]]+\])/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[") && part.endsWith("]") ? (
          <span
            key={i}
            className={cn(
              "inline-block whitespace-nowrap rounded border border-dashed px-1.5 text-[0.92em]",
              dark ? "border-soft text-soft" : "border-violet text-violet"
            )}
          >
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  )
}
