import { Fill } from "@/components/ui/fill"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { faqs } from "@/data/content"

/** Questions on the right, heading held on the left on wide screens, so the list stays easy to scan. */
export function Faq() {
  return (
    <section id="faq" className="section-pad" aria-labelledby="f-title">
      <div className="wrap grid gap-x-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            align="stack"
            id="f-title"
            kicker="FAQ"
            title={
              <>
                <span className="font-extralight">Questions clients</span> <span className="font-semibold">ask first.</span>
              </>
            }
          />
        </div>
        <div className="border-t border-rule">
          {faqs.map((faq) => (
            <details key={faq.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[clamp(17px,1.8vw,20px)] font-medium tracking-[-0.015em]">
                {faq.q}
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 flex-none place-items-center rounded-full border border-rule transition-[transform,background-color,border-color] duration-200 ease-out-strong group-open:rotate-45 group-open:border-transparent group-open:bg-mist group-open:text-violet"
                >
                  <Icon name="plus" className="h-3.5 w-3.5" />
                </span>
              </summary>
              <div className="faq-answer max-w-[64ch] pb-6 pr-12 text-quiet">
                <Fill text={faq.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
