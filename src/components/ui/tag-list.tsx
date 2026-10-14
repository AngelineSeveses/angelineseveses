import { cn } from "@/lib/utils"

/**
 * Small, quiet labels for scores and facts. Square-cornered on purpose, so they never read as buttons.
 * The first tag is highlighted; it carries the most important number.
 */
export function TagList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item, i) => (
        <li
          key={item}
          className={cn("whitespace-nowrap rounded-tag px-2 py-0.5 text-[12.5px] tabular-nums", i === 0 ? "bg-mist text-violet" : "bg-ink/[0.05] text-quiet")}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
