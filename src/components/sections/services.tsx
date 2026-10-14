import { ButtonLink } from "@/components/ui/button"
import { CheckList } from "@/components/ui/check-list"
import { Fill } from "@/components/ui/fill"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { services, type Service, type ServiceKey } from "@/data/content"

/** Maintenance tasks shown in the Website care preview. */
const careChecks = ["WordPress and plugins updated", "Backup saved", "Speed check passed", "Contact form tested"]

function CodePreview() {
  return (
    <div className="grid h-full place-items-center bg-band p-5">
      <pre className="w-full max-w-[460px] overflow-hidden whitespace-pre-wrap break-words rounded-card bg-code p-4 font-mono text-[11.5px] leading-relaxed text-cream/80">
        <span className="text-soft">{"<Hero>"}</span>
        {"\n  "}
        <span className="text-code-tag">{"<h1>"}</span>Websites that bring in customers.<span className="text-code-tag">{"</h1>"}</span>
        {"\n  "}
        <span className="text-code-tag">{"<Button"}</span> <span className="text-code-attr">href</span>=<span className="text-code-string">"#contact"</span>
        <span className="text-code-tag">{">"}</span>Start a project<span className="text-code-tag">{"</Button>"}</span>
        {"\n"}
        <span className="text-soft">{"</Hero>"}</span>
      </pre>
    </div>
  )
}

function CarePreview() {
  return (
    <div className="grid h-full place-items-center bg-mist p-5">
      <ul className="w-full max-w-[320px] rounded-card border border-rule bg-paper px-4 py-1 text-[13px]">
        {careChecks.map((check) => (
          <li key={check} className="flex items-center justify-between border-b border-rule py-2 last:border-0">
            {check}
            <Icon name="check" className="h-5 w-5 text-success" />
          </li>
        ))}
      </ul>
    </div>
  )
}

/** A real project where there is one; otherwise a small, honest interface preview. */
function ServiceMedia({ service }: { service: Service }) {
  if (service.example) {
    return (
      <figure className="m-0 h-full">
        <img src={service.example.src} alt={service.example.alt} loading="lazy" className="h-full w-full object-cover object-top" />
        <figcaption className="absolute bottom-2.5 left-2.5 rounded-tag bg-paper/95 px-2 py-0.5 text-[12px]">
          {service.example.name}, <span className="text-quiet">{service.example.note}</span>
        </figcaption>
      </figure>
    )
  }
  return service.key === "frontend" ? <CodePreview /> : <CarePreview />
}

function ServiceCard({ service, onPick }: { service: Service; onPick: (key: ServiceKey) => void }) {
  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-card border border-rule bg-paper transition-colors duration-200 hover:border-ink/25">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-rule">
        <ServiceMedia service={service} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-[25px] leading-[1.1] tracking-[-0.02em]">{service.title}</h3>
        <p className="mt-2 text-[15px] text-quiet">{service.summary}</p>
        <CheckList items={service.items} className="mt-5 border-t border-rule pt-5" />
        <div className="mt-auto pt-6">
          <p className="text-[13px] text-quiet">Starting at</p>
          <p className="mt-0.5 text-[20px] font-medium tracking-[-0.02em]">
            <Fill text={service.price} />
          </p>
          <ButtonLink href="#contact" variant="soft" size="sm" className="mt-4 w-full" onClick={() => onPick(service.key)}>
            {service.cta}
          </ButtonLink>
        </div>
      </div>
    </li>
  )
}

/**
 * Services as four comparable cards: what it is, what's included, price and action,
 * in the same order on every card, so options can be compared at a glance.
 */
export function Services({ onPick }: { onPick: (key: ServiceKey) => void }) {
  return (
    <section id="services" className="section-pad">
      <div className="wrap">
        <SectionHead
          kicker="Services"
          title={
            <>
              <span className="font-extralight">From first wireframe</span> <span className="font-semibold">to final build.</span>
            </>
          }
          lede="Pick one, or combine them. Prices are starting points; you get a clear quote once I know the scope."
        />
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.key} service={service} onPick={onPick} />
          ))}
        </ul>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-[15px] text-quiet">
          Need the design and the build?
          <a href="#contact" onClick={() => onPick("design")} className="font-medium text-violet underline decoration-violet/30 underline-offset-4 hover:decoration-violet">
            Get one quote for both
          </a>
        </p>
      </div>
    </section>
  )
}
