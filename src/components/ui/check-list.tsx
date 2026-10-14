import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

/** A list of short points, each with a check mark. Used for service inclusions and project results. */
export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("grid gap-2", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[14.5px] leading-snug">
          <Icon name="check" className="mt-[1px] h-[17px] w-[17px] text-violet" />
          {item}
        </li>
      ))}
    </ul>
  )
}
