import { useEffect, useRef, useState } from "react"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { skills, type Tool } from "@/data/content"
import { cn } from "@/lib/utils"

function ToolItem({ tool }: { tool: Tool }) {
  const isLogo = tool.icon.startsWith("logo_")
  return (
    <li className="flex flex-none items-center gap-3 rounded-card border border-rule bg-cream py-2 pl-2 pr-5 text-[15px]">
      <span className={cn("grid h-9 w-9 place-items-center rounded-[10px]", isLogo ? "bg-paper" : "bg-mist text-violet")}>
        <Icon name={tool.icon} className={isLogo ? "h-5 w-5" : "h-[18px] w-[18px]"} />
      </span>
      <span className="whitespace-nowrap">{tool.name}</span>
    </li>
  )
}

/** One marquee row. The list is rendered twice so the loop is seamless; screen readers hear it once. */
function MarqueeRow({ tools, reverse = false }: { tools: Tool[]; reverse?: boolean }) {
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 || undefined}
          className={cn(
            "flex flex-none gap-3 pr-3 [animation:marquee_48s_linear_infinite] group-hover:[animation-play-state:paused] group-data-[paused=true]/tools:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {tools.map((tool) => (
            <ToolItem key={tool.name} tool={tool} />
          ))}
        </ul>
      ))}
    </div>
  )
}

/**
 * Toolkit as two slow rows of logos moving in opposite directions.
 * Pauses on hover and while offscreen; with reduced motion it becomes one still, wrapped list.
 */
export function Toolkit() {
  const rowsRef = useRef<HTMLDivElement>(null)
  const [offscreen, setOffscreen] = useState(false)

  useEffect(() => {
    const el = rowsRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const tools = skills.flatMap((group) => group.tools)
  const half = Math.ceil(tools.length / 2)

  return (
    <section className="section-pad overflow-hidden border-y border-rule bg-paper" aria-labelledby="s-title">
      <div className="wrap">
        <SectionHead
          id="s-title"
          kicker="Toolkit"
          title={
            <>
              <span className="font-extralight">Tools I use</span> <span className="font-semibold">from concept to launch.</span>
            </>
          }
          lede="The design, WordPress, frontend and workflow tools I use day to day."
        />
      </div>
      <div ref={rowsRef} data-paused={offscreen} className="group/tools grid gap-3 motion-reduce:hidden">
        <MarqueeRow tools={tools.slice(0, half)} />
        <MarqueeRow tools={tools.slice(half)} reverse />
      </div>
      <ul aria-label="Tools" className="wrap hidden flex-wrap gap-3 motion-reduce:flex">
        {tools.map((tool) => (
          <ToolItem key={tool.name} tool={tool} />
        ))}
      </ul>
    </section>
  )
}
