import { SectionHead } from "@/components/ui/section-head"
import { steps } from "@/data/content"
import { cn } from "@/lib/utils"

/** Dividers between steps: stacked on phones, 2 columns on tablets, 4 in a row on desktop. */
function stepDivider(i: number) {
  return cn(i > 0 && "max-sm:border-t", i % 2 === 1 && "sm:border-l sm:pl-8", i === 2 && "lg:border-l lg:pl-8")
}

/** The four steps as one numbered row, joined by the brand's stitch, each ending with what the client receives. */
export function Process() {
  return (
    <section id="process" className="section-pad border-y border-rule bg-paper" aria-labelledby="p-title">
      <div className="wrap">
        <SectionHead
          id="p-title"
          kicker="How I work"
          title={
            <>
              <span className="font-extralight">Four steps,</span> <span className="font-semibold">no surprises.</span>
            </>
          }
          lede="You always know what's happening, what I need from you, and what you'll have at the end of each step."
        />
        <ol className="grid border-t-2 border-dashed border-violet/40 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className={cn("flex flex-col border-rule pb-2 pt-7 sm:pr-8", stepDivider(i))}>
              <span className="font-serif text-[44px] leading-none tracking-[-0.03em] tabular-nums text-violet">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-5 text-[21px] font-medium tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 flex-1 text-[15px] text-quiet">{step.body}</p>
              <p className="mt-6 border-t border-rule pt-3 text-[14px]">
                <span className="block text-[12.5px] text-quiet">You get</span>
                {step.get}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
