import type { ReactNode } from "react"
import { buttonClass } from "@/components/ui/button"
import { Fill } from "@/components/ui/fill"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { services, type Service, type ServiceKey } from "@/data/content"

/** Shared strokes for the little wireframes, so all four drawings use the same line weight and colours. */
const line = { stroke: "var(--color-ink)", strokeOpacity: 0.28, strokeWidth: 1.5, fill: "none" } as const
const bar = (x: number, y: number, w: number, strong = false) => (
  <rect x={x} y={y} width={w} height={strong ? 5 : 3.5} rx={1.75} fill="var(--color-ink)" fillOpacity={strong ? 0.6 : 0.2} />
)

/** A browser window outline; each service draws its own content inside. */
function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 220 124" aria-hidden="true" className="h-auto w-full max-w-[260px]">
      <rect x="1" y="1" width="218" height="122" rx="6" {...line} fill="var(--color-paper)" />
      <path d="M1 15h218" {...line} />
      {[10, 18, 26].map((cx) => (
        <circle key={cx} cx={cx} cy="8" r="2" fill="var(--color-ink)" fillOpacity="0.2" />
      ))}
      {children}
    </svg>
  )
}

const drawings: Record<ServiceKey, ReactNode> = {
  // Layout: headline, text, button, and an image placeholder.
  design: (
    <Frame>
      {bar(16, 34, 72, true)}
      {bar(16, 46, 84)}
      {bar(16, 54, 62)}
      <rect x="16" y="68" width="38" height="11" rx="5.5" fill="var(--color-violet)" />
      <rect x="120" y="28" width="84" height="80" rx="4" fill="none" stroke="var(--color-violet)" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 3" />
      <path d="M134 94l18-20 13 13 8-8 17 15" fill="none" stroke="var(--color-ink)" strokeOpacity="0.35" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="184" cy="46" r="5" fill="var(--color-lavender-deep)" />
    </Frame>
  ),
  // A page made of blocks, one of them a code block: a theme being built.
  wordpress: (
    <Frame>
      <rect x="16" y="26" width="188" height="16" rx="3" {...line} />
      {bar(24, 32, 48)}
      <rect x="16" y="50" width="88" height="58" rx="3" {...line} />
      <path d="M44 72l-8 7 8 7M76 72l8 7-8 7M64 69l-8 20" fill="none" stroke="var(--color-violet)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="112" y="50" width="92" height="58" rx="3" {...line} />
      {bar(122, 62, 64, true)}
      {bar(122, 74, 72)}
      {bar(122, 82, 52)}
      <rect x="122" y="92" width="30" height="7" rx="3.5" fill="var(--color-violet)" />
    </Frame>
  ),
  // A short component in code, coloured like the editor.
  frontend: (
    <Frame>
      <g fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="9.5">
        <text x="16" y="38" fill="var(--color-violet)">{"<Hero>"}</text>
        <text x="28" y="54" fill="var(--color-ink)" fillOpacity="0.6">
          {"<h1>"}
          <tspan fill="var(--color-ink)" fillOpacity="0.9">Bring in customers</tspan>
          {"</h1>"}
        </text>
        <text x="28" y="70" fill="var(--color-ink)" fillOpacity="0.6">
          {"<Button "}
          <tspan fill="var(--color-violet)">href</tspan>
          {'="#contact" />'}
        </text>
        <text x="16" y="86" fill="var(--color-violet)">{"</Hero>"}</text>
      </g>
      <rect x="150" y="94" width="54" height="16" rx="8" fill="var(--color-lavender)" />
      <path d="M170 102l4 4 7-8" fill="none" stroke="var(--color-violet)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  ),
  // A speed gauge beside a short checklist: updates, backups, checks.
  care: (
    <Frame>
      <path d="M26 96a34 34 0 0 1 68 0" fill="none" stroke="var(--color-ink)" strokeOpacity="0.12" strokeWidth="7" strokeLinecap="round" />
      <path d="M26 96a34 34 0 0 1 58-24" fill="none" stroke="var(--color-violet)" strokeWidth="7" strokeLinecap="round" />
      <text x="60" y="94" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="17" fill="var(--color-ink)">
        98
      </text>
      {[38, 60, 82].map((y, i) => (
        <g key={y}>
          <circle cx="122" cy={y} r="5.5" fill="var(--color-lavender)" />
          <path d={`M119.5 ${y}l2 2 3.5-4`} fill="none" stroke="var(--color-violet)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          {bar(134, y - 2, [58, 46, 52][i])}
        </g>
      ))}
    </Frame>
  ),
  agency: null,
}

/**
 * A service card: a small drawing of the work on a plum panel, then the stage, the name,
 * what it is, what's included, the price and one action. Every card keeps the same order.
 */
function ServiceCard({ service, onPick }: { service: Service; onPick: (key: ServiceKey) => void }) {
  return (
    <li className="flex min-w-0 flex-col overflow-hidden rounded-card border border-rule bg-paper">
      <div className="bg-plum p-[clamp(16px,2.2vw,24px)] pb-0">
        <div className="grid h-[clamp(150px,15vw,190px)] place-items-center rounded-t-[10px] bg-lavender px-6 pt-5">{drawings[service.key]}</div>
      </div>
      <div className="flex flex-1 flex-col p-[clamp(22px,2.6vw,32px)]">
        <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-violet">{service.kicker}</p>
        <p className="mt-1 text-[14.5px] text-quiet">{service.tagline}</p>
        <h3 className="mt-3 font-sans font-medium text-[clamp(28px,2.6vw,34px)] leading-[1.05] tracking-[-0.035em]">{service.title}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-quiet">{service.summary}</p>
        <ul className="mt-6 grid gap-2">
          {service.items.map((item) => (
            <li key={item} className="flex items-center gap-3 rounded-tag bg-cream px-3.5 py-2.5 text-[14.5px]">
              <Icon name="check" className="h-[17px] w-[17px] flex-none text-violet" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-7">
          <p className="text-[14.5px] text-quiet">
            <span className="font-medium text-ink">Starting at </span>
            <Fill text={service.price} />
          </p>
          <a href="#contact" onClick={() => onPick(service.key)} className={buttonClass({ variant: "ghost", size: "md", className: "group mt-5 w-full" })}>
            {service.cta}
            <Icon name="arrowRight" className="h-[18px] w-[18px] transition-transform duration-200 ease-out-strong group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </a>
        </div>
      </div>
    </li>
  )
}

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
        <ul className="grid gap-5 md:grid-cols-2">
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
