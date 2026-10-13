import { ArrowRight } from "lucide-react"
import { resultsBand } from "@/data/content"
import { cn } from "@/lib/utils"

/** The proof, in numbers a business owner reads in two seconds. Every figure is credited to a real client. */
export function ResultsBand() {
  return (
    <section aria-labelledby="results-title" className="dark bg-night text-cream">
      <div className="wrap py-[clamp(56px,8vw,104px)]">
        <div className="mb-[clamp(32px,4vw,56px)] flex flex-wrap items-end justify-between gap-6">
          <h2 id="results-title" className="max-w-[18ch] text-[clamp(30px,3.6vw,44px)] leading-[1.08] tracking-[-0.035em]">
            <span className="font-extralight">What changed after </span>
            <span className="font-semibold">the redesign.</span>
          </h2>
          <a href="#work" className="inline-flex items-center gap-2 text-[15px] text-soft no-underline transition-colors duration-200 hover:text-cream">
            See the projects
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
        <dl className="grid border-t border-rule-dark sm:grid-cols-2 lg:grid-cols-4">
          {resultsBand.map((r, i) => (
            <div
              key={r.label}
              className={cn(
                "flex min-w-0 flex-col border-b border-rule-dark py-7 lg:border-b-0",
                i % 2 === 1 && "sm:border-l sm:pl-7",
                i > 0 && "lg:border-l lg:pl-7",
                "pr-7"
              )}
            >
              <dt className="order-2 mt-3 text-[15px] leading-snug">
                {r.label}
                <span className="mt-1 block text-[13.5px] text-quiet-dark">{r.client}</span>
              </dt>
              <dd className="order-1 flex items-baseline gap-2 whitespace-nowrap text-[clamp(52px,6vw,84px)] leading-none tracking-[-0.05em] tabular-nums">
                {r.from !== undefined && (
                  <>
                    <span className="font-extralight text-quiet-dark">{r.from}</span>
                    <ArrowRight className="h-[0.42em] w-[0.42em] self-center text-soft" strokeWidth={1.6} aria-label="to" />
                  </>
                )}
                <span className="font-semibold">{r.to}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-[13px] text-quiet-dark">Counted from the live sites and their archived versions. SEO scores from Google Lighthouse, October 2026.</p>
      </div>
    </section>
  )
}
