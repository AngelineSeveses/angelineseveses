import { useEffect, useRef, useState } from "react"
import { ButtonLink } from "@/components/ui/button"
import { Fill } from "@/components/ui/fill"
import { Icon } from "@/components/ui/icon"
import { SectionHead } from "@/components/ui/section-head"
import { SplitWords } from "@/components/ui/split-words"
import { ScrollTrigger, getLenis } from "@/lib/motion"
import { services, skills, steps, testimonials, type Service, type ServiceKey } from "@/data/content"
import { cn } from "@/lib/utils"

/* ─────────────────────────────── Services ─────────────────────────────── */

/** What each service looks like: a real project where there is one, otherwise a small, honest interface vignette. */
function ServiceMedia({ s }: { s: Service }) {
  if (s.example) {
    return (
      <figure className="m-0 h-full">
        <img src={s.example.src} alt={s.example.alt} loading="lazy" className="h-full w-full object-cover object-top" />
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-paper/95 px-3 py-1 text-[13px]">
          {s.example.name}, <span className="text-quiet">{s.example.note}</span>
        </figcaption>
      </figure>
    )
  }
  if (s.key === "frontend") {
    return (
      <div className="grid h-full place-items-center bg-band p-8">
        <pre className="w-full max-w-[460px] overflow-hidden whitespace-pre-wrap break-words rounded-xl border border-cream/10 bg-[#100d14] p-5 font-mono text-[13px] leading-relaxed text-cream/80">
          <span className="text-soft">{"<Hero>"}</span>
          {"\n  "}
          <span className="text-[#9ad7a8]">{"<h1>"}</span>Websites that bring in customers.<span className="text-[#9ad7a8]">{"</h1>"}</span>
          {"\n  "}
          <span className="text-[#9ad7a8]">{"<Button"}</span> <span className="text-[#f2c48d]">href</span>=<span className="text-[#f2a7a7]">"#contact"</span>
          <span className="text-[#9ad7a8]">{">"}</span>Start a project<span className="text-[#9ad7a8]">{"</Button>"}</span>
          {"\n"}
          <span className="text-soft">{"</Hero>"}</span>
        </pre>
      </div>
    )
  }
  return (
    <div className="grid h-full place-items-center bg-mist p-8">
      <ul className="w-full max-w-[360px] rounded-2xl border border-rule bg-paper p-5 text-[14.5px] shadow-[0_20px_40px_-30px_rgb(31_24_40/0.5)]">
        {["WordPress and plugins updated", "Backup saved", "Speed check passed", "Contact form tested"].map((x) => (
          <li key={x} className="flex items-center justify-between border-b border-rule py-3 last:border-0">
            {x}
            <Icon name="check" className="h-5 w-5 text-success" />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ServiceText({ s, onPick, i }: { s: Service; onPick: (key: ServiceKey) => void; i: number }) {
  return (
    <div>
      <p className="text-[14px] tabular-nums text-violet">{String(i + 1).padStart(2, "0")}</p>
      <h3 className="mt-2 font-serif text-[clamp(30px,3vw,40px)] leading-[1.05] tracking-[-0.02em]">{s.title}</h3>
      <p className="mt-3 text-[16px] text-quiet">{s.summary}</p>
      <ul className="mt-5 grid gap-2">
        {s.items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[15px]">
            <Icon name="check" className="mt-[2px] h-[18px] w-[18px] text-violet" />
            {it}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[15px]">
        <span className="text-quiet">Starting at </span>
        <Fill text={s.price} />
      </p>
      <ButtonLink href="#contact" variant="soft" className="mt-6" onClick={() => onPick(s.key)}>
        {s.cta}
      </ButtonLink>
    </div>
  )
}

/** Story mode on large screens with motion on; a simple stack everywhere else. */
function useStoryMode() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)")
    const set = () => setOn(mq.matches)
    set()
    mq.addEventListener("change", set)
    return () => mq.removeEventListener("change", set)
  }, [])
  return on
}

/**
 * Services as a scroll story: the list on the left tracks progress, the picture in the middle and the
 * details on the right change as you scroll. The section is sticky (CSS), and ScrollTrigger only reads progress.
 */
export function Services({ onPick }: { onPick: (key: ServiceKey) => void }) {
  const story = useStoryMode()
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const n = services.length

  useEffect(() => {
    if (!story || !trackRef.current) return
    const st = ScrollTrigger.create({
      trigger: trackRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
    })
    return () => st.kill()
  }, [story, n])

  const jump = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / n
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(y)
    else window.scrollTo({ top: y, behavior: "smooth" })
  }

  const head = (
    <SectionHead
      kicker="Services"
      title={
        <>
          <span className="font-extralight">From first wireframe</span> <span className="font-semibold">to final build.</span>
        </>
      }
      lede="Hire me for the whole website, or just the design or the build. You get a clear quote once I know the scope."
    />
  )

  if (!story) {
    return (
      <section id="services" className="section-pad">
        <div className="wrap">
          {head}
          <div className="grid gap-6">
            {services.map((s, i) => (
              <article key={s.key} className="overflow-hidden rounded-[28px] border border-rule bg-paper">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ServiceMedia s={s} />
                </div>
                <div className="p-6 sm:p-8">
                  <ServiceText s={s} onPick={onPick} i={i} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="pt-[clamp(72px,10vw,136px)]">
      <div className="wrap">{head}</div>
      <div ref={trackRef} style={{ height: `${n * 85 + 15}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="wrap grid w-full grid-cols-[200px_minmax(0,1fr)_340px] items-center gap-12 xl:gap-16">
            <ol aria-label="Services" className="relative border-l border-rule">
              {services.map((s, i) => (
                <li key={s.key}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "relative -ml-px block w-full cursor-pointer border-l-2 py-2.5 pl-4 text-left font-serif text-[19px] leading-snug transition-colors duration-300",
                      i === active ? "border-violet text-ink" : "border-transparent text-quiet hover:text-ink"
                    )}
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>

            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-rule bg-paper shadow-[0_40px_80px_-50px_rgb(31_24_40/0.6)]">
              {services.map((s, i) => (
                <div
                  key={s.key}
                  aria-hidden={i !== active}
                  className={cn("absolute inset-0 transition-[opacity,transform] duration-500 ease-out-strong", i === active ? "scale-100 opacity-100" : "scale-[1.03] opacity-0")}
                >
                  <ServiceMedia s={s} />
                </div>
              ))}
            </div>

            <div key={active} className="motion-safe:animate-[answer-in_420ms_var(--ease-out-strong)]" aria-live="polite">
              <ServiceText s={services[active]} onPick={onPick} i={active} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Testimonials ───────────────────────────── */

export function Testimonials() {
  const [feature, second] = testimonials
  return (
    <section aria-labelledby="t-title" className="dark relative rounded-[clamp(28px,4vw,48px)] bg-band py-[clamp(72px,10vw,136px)] text-cream">
      <div className="wrap">
        <div className="mx-auto mb-[clamp(40px,6vw,72px)] max-w-[720px] text-center">
          <SplitWords id="t-title" className="serif-head text-[clamp(40px,5.6vw,72px)] leading-[1.02]">
            <span className="font-extralight">Kind words from</span> <span className="font-semibold">people I've built with.</span>
          </SplitWords>
        </div>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-12">
          <figure className="relative m-0 rounded-[28px] bg-lavender p-[clamp(28px,4vw,56px)] text-ink">
            <blockquote className="m-0">
              <p className="font-serif text-[clamp(26px,2.8vw,38px)] leading-[1.18] tracking-[-0.015em]">“{feature.quote}”</p>
            </blockquote>
            <figcaption className="mt-10 flex items-end justify-between gap-4 border-t border-ink/15 pt-5 text-[15px]">
              <span>
                <b className="font-medium">{feature.name}</b>
                <span className="block text-ink/65">{feature.role}</span>
              </span>
            </figcaption>
          </figure>
          <div className="grid gap-6">
            <figure className="m-0 rounded-[24px] bg-cream p-[clamp(24px,3vw,36px)] text-ink lg:-rotate-2">
              <blockquote className="m-0">
                <p className="font-serif text-[clamp(20px,1.9vw,25px)] leading-[1.3]">“{second.quote}”</p>
              </blockquote>
              <figcaption className="mt-6 text-[14.5px]">
                <b className="font-medium">{second.name}</b>
                <span className="block text-quiet">{second.role}</span>
              </figcaption>
            </figure>
            <div className="rounded-[24px] border border-dashed border-cream/25 p-6 text-center text-[14.5px] text-cream/70 lg:rotate-1">
              <Fill dark text="[Add a client testimonial with a result]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────── Process ─────────────────────────────── */

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
        <div className="relative">
        {/* The stitch that joins the steps (large screens). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[12%] top-[52px] hidden h-0.5 lg:block" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-violet) 0 10px, transparent 10px 18px)" }} />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex flex-col rounded-2xl border border-rule bg-cream p-6">
              <div className="flex items-center justify-between">
                <span className="relative z-[1] grid h-14 w-14 place-items-center rounded-full border border-rule bg-paper text-violet">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <span className="text-[56px] font-extralight leading-none tracking-[-0.05em] tabular-nums text-ink/15">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-6 text-[24px] tracking-[-0.025em]">{s.title}</h3>
              <p className="mt-2 flex-1 text-[15.5px] text-quiet">{s.body}</p>
              <p className="mt-6 flex items-center gap-2 rounded-xl bg-mist px-3.5 py-2.5 text-[14px] text-violet">
                <Icon name="check" className="h-4 w-4" />
                <span>
                  <span className="sr-only">You get: </span>
                  {s.get}
                </span>
              </p>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────────── Tools ──────────────────────────────── */

export function Skills() {
  return (
    <section className="section-pad" aria-labelledby="s-title">
      <div className="wrap">
        <SectionHead
          id="s-title"
          kicker="Toolkit"
          title={
            <>
              <span className="font-extralight">Tools I use</span> <span className="font-semibold">from concept to launch.</span>
            </>
          }
        />
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="mb-4 flex items-center gap-3 text-[15px] font-medium text-quiet">
                {g.group}
                <span aria-hidden="true" className="h-px flex-1 bg-rule" />
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.tools.map((t) => {
                  const logo = t.icon.startsWith("logo_")
                  return (
                    <li
                      key={t.name}
                      className="flex items-center gap-3 rounded-xl border border-rule bg-paper py-2.5 pl-2.5 pr-4 text-[15px] transition-[border-color,background-color] duration-200 hover:border-ink/25 hover:bg-cream"
                    >
                      <span className={cn("grid h-9 w-9 flex-none place-items-center rounded-lg", logo ? "bg-cream" : "bg-mist text-violet")}>
                        <Icon name={t.icon} className={logo ? "h-5 w-5" : "h-[18px] w-[18px]"} />
                      </span>
                      <span className="min-w-0 leading-tight">{t.name}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
