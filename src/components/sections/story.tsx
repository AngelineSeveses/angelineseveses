import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"
import { Icon } from "@/components/ui/icon"
import { ButtonLink, Button } from "@/components/ui/button"
import { Fill } from "@/components/ui/fill"
import { SectionHead } from "@/components/ui/section-head"
import { useToast } from "@/components/ui/toast"
import { caseStudy, experience, faqs, services, skills, steps, testimonials, type ServiceKey } from "@/data/content"
import { cn } from "@/lib/utils"

export function CaseStudy() {
  const imgRef = useRef<HTMLImageElement>(null)
  const reduce = useReducedMotion()

  // Unclip the image once, only when it enters from below, so the page is complete at rest.
  useEffect(() => {
    const img = imgRef.current
    if (!img || reduce || !("IntersectionObserver" in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      if (entry.boundingClientRect.top > window.innerHeight * 0.5) {
        img.animate([{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0 0)" }], {
          duration: 900,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
        })
      }
    })
    io.observe(img)
    return () => io.disconnect()
  }, [reduce])

  return (
    <section className="dark section-pad bg-night text-cream" aria-labelledby="cs-title">
      <div className="wrap">
        <SectionHead dark id="cs-title" kicker="Case study" title={<><span className="font-extralight">Rebuilding a BPO website</span> <span className="font-semibold">around what clients look for.</span></>} lede={caseStudy.intro} />
        <div className="grid border-t border-rule-dark md:grid-cols-2">
          {caseStudy.blocks.map((b, i) => (
            <div key={b.title} className={cn("min-w-0 border-b border-rule-dark py-7 md:pr-8", i % 2 === 1 && "md:border-l md:pl-8")}>
              <h3 className="mb-2 text-lg">{b.title}</h3>
              <p className="text-quiet-dark">{b.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-[clamp(40px,5vw,64px)] overflow-hidden rounded-md border border-rule-dark">
          <img ref={imgRef} src={caseStudy.image.src} alt={caseStudy.image.alt} loading="lazy" className="w-full" />
        </div>
      </div>
    </section>
  )
}

export function Services({ onPick }: { onPick: (key: ServiceKey) => void }) {
  return (
    <section id="services" className="section-pad">
      <div className="wrap">
        <SectionHead
          kicker="Services"
          title={<><span className="font-extralight">From first wireframe</span> <span className="font-semibold">to final build.</span></>}
          lede="Hire me for the whole website, or just the design or the build. Prices below are starting points; I'll send a clear quote once I know the scope."
        />
        <div>
          {services.map((s) => (
            <div key={s.key} className="grid gap-4 border-t border-rule py-9 last:border-b lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,0.8fr)] lg:gap-[clamp(20px,3vw,48px)]">
              <div>
                <h3 className="text-[26px] tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-2 text-quiet">{s.summary}</p>
              </div>
              <ul>
                {s.items.map((it) => (
                  <li key={it} className="relative py-[5px] pl-[22px] before:absolute before:left-0 before:top-[15px] before:h-[1.5px] before:w-2.5 before:bg-violet">
                    {it}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col items-start gap-4">
                <p className="text-[15px] text-quiet">{s.bestFor}</p>
                <p className="text-[15px]">
                  Starting at <Fill text={s.price} />
                </p>
                <ButtonLink href="#contact" variant="ghost" size="sm" onClick={() => onPick(s.key)}>
                  {s.cta}
                </ButtonLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Agencies({ onPick }: { onPick: (key: ServiceKey) => void }) {
  return (
    <section className="dark section-pad bg-night text-cream" aria-labelledby="ag-title">
      <div className="wrap grid items-center gap-[clamp(24px,4vw,64px)] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <span className="mb-3.5 block text-[15px] font-medium text-soft">For agencies</span>
          <h2 id="ag-title" className="text-[clamp(36px,5.2vw,60px)] leading-[1.04] tracking-[-0.04em]">
            <span className="font-extralight">An extra designer-developer</span> <span className="font-semibold">for your team.</span>
          </h2>
          <p className="mt-6 max-w-[56ch] text-[clamp(18px,1.9vw,20px)] leading-relaxed text-quiet-dark">
            I work with agencies and studios that need dependable help with Figma designs, WordPress builds and site updates. I'm used to working from marketing
            direction and existing design systems, and I can work under your brand.
          </p>
          <ButtonLink href="#contact" tone="dark" className="mt-8" onClick={() => onPick("agency")}>
            Let's collaborate
          </ButtonLink>
        </div>
        <ul>
          {["Figma to WordPress with Oxygen, Elementor and ACF", "Overflow design and development work", "Website updates and UI improvements", "Ongoing retainers or single projects"].map(
            (it) => (
              <li key={it} className="border-b border-rule-dark py-3.5 text-[17px] first:border-t">
                {it}
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  )
}

export function Testimonials() {
  return (
    <section className="section-pad" aria-labelledby="t-title">
      <div className="wrap">
        <SectionHead id="t-title" kicker="Kind words" title={<><span className="font-extralight">What people say</span> <span className="font-semibold">about working with me.</span></>} />
        <div className="grid gap-[clamp(24px,4vw,64px)] md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote key={t.name}>
              <p className="text-[clamp(21px,2.3vw,27px)] font-light leading-[1.38] tracking-[-0.025em]">"{t.quote}"</p>
              <footer className="mt-5 flex items-center gap-3 text-[15px]">
                <span>
                  <b className="font-medium">{t.name}</b>
                  <br />
                  <span className="text-quiet">{t.role}</span>
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-[clamp(32px,4vw,48px)] text-[15px]">
          <Fill text="[Add 1–2 client testimonials here]" />
        </p>
      </div>
    </section>
  )
}

export function Process() {
  return (
    <section id="process" className="pb-[clamp(72px,10vw,136px)]" aria-labelledby="p-title">
      <div className="wrap">
        <SectionHead id="p-title" kicker="How I work" title={<><span className="font-extralight">Four steps,</span> <span className="font-semibold">no surprises.</span></>} lede="You'll always know what's happening and what I need from you next." />
        <div aria-hidden="true" className="relative mb-2 hidden h-6 lg:block">
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2" style={{ backgroundImage: "repeating-linear-gradient(90deg, var(--color-violet) 0 10px, transparent 10px 18px)" }} />
          {[0, 25, 50, 75].map((l) => (
            <i key={l} className="absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-violet bg-cream" style={{ left: `${l}%` }} />
          ))}
        </div>
        <ol className="grid border-t border-rule sm:grid-cols-2 lg:grid-cols-4 lg:border-t-0">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={cn(
                "min-w-0 pt-7 pr-6",
                i > 0 && "max-sm:mt-6 max-sm:border-t max-sm:border-rule",
                i % 2 === 1 && "sm:border-l sm:border-rule sm:pl-6",
                i === 2 && "lg:border-l lg:border-rule lg:pl-6"
              )}
            >
              <span className="text-[15px] tabular-nums text-violet">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mb-2 mt-1.5 text-[22px] tracking-[-0.025em]">{s.title}</h3>
              <p className="text-[15.5px] text-quiet">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Monogram() {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="mx-auto mb-3.5 h-24 w-24">
      <circle cx="48" cy="48" r="47" fill="#2A2036" />
      <path d="M48 1 A47 47 0 0 0 48 95 Z" fill="#F5EFE6" />
      <line x1="48" y1="10" x2="48" y2="86" stroke="#B9A6FF" strokeWidth="2" strokeDasharray="6 5" />
      <text x="28" y="59" fontFamily="Geist Variable, sans-serif" fontSize="32" fontWeight="200" fill="#1D1A22" textAnchor="middle">
        A
      </text>
      <text x="68" y="59" fontFamily="Geist Variable, sans-serif" fontSize="32" fontWeight="600" fill="#F5EFE6" textAnchor="middle">
        S
      </text>
    </svg>
  )
}

export function About() {
  const toast = useToast()
  return (
    <section id="about" className="dark section-pad bg-night text-cream" aria-labelledby="a-title">
      <div className="wrap grid gap-[clamp(32px,5vw,80px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="grid aspect-[4/5] max-w-full place-items-center rounded-md border border-dashed border-soft/50 p-6 text-center">
          <div>
            <Monogram />
            <Fill dark text="[Add your photo, 4:5]" />
          </div>
        </div>
        <div>
          <span className="mb-3.5 block text-[15px] font-medium text-soft">About</span>
          <h2 id="a-title" className="text-[clamp(36px,5.2vw,60px)] leading-[1.04] tracking-[-0.04em]">
            <span className="font-extralight">Hi, I'm</span> <span className="font-semibold">Angeline.</span>
          </h2>
          <p className="mt-6 text-[clamp(18px,1.9vw,20px)] leading-relaxed">
            I'm a web designer and WordPress developer from the Philippines with 4+ years of experience designing and building websites for clients in SaaS, home
            services, education and professional services.
          </p>
          <p className="mt-4 text-quiet-dark">
            I work on both sides. I design the experience in Figma and build it in WordPress, so nothing gets lost between the design file and the live site. I like
            fixing confusing websites and building sites clients can actually manage after launch. I also design banners and logos, so your visuals stay consistent.
          </p>
          <ul aria-label="Experience" className="mt-9 border-t border-rule-dark">
            {experience.map((x, i) => (
              <li key={i} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border-b border-rule-dark py-4">
                <b className="font-medium">
                  <Fill dark text={x.role} />
                </b>
                <span className="whitespace-nowrap text-sm text-quiet-dark">
                  <Fill dark text={x.dates} />
                </span>
                <p className="col-span-full text-[15px] text-quiet-dark">
                  <Fill dark text={x.body} />
                </p>
              </li>
            ))}
          </ul>
          <div aria-label="Open to" className="mt-7 flex flex-wrap gap-2.5">
            {["Freelance projects", "Part-time remote", "Full-time remote"].map((t) => (
              <span key={t} className="rounded-full border border-rule-dark px-3.5 py-1.5 text-sm">
                {t}
              </span>
            ))}
            <span className="rounded-full border border-rule-dark px-3.5 py-1.5 text-sm">
              Hours: <Fill dark text="[your time zone]" />
            </span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contact" tone="dark">
              Let's work together
            </ButtonLink>
            <Button tone="dark" variant="ghost" onClick={() => toast("Link your CV PDF here")}>
              Download CV
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section className="section-pad" aria-labelledby="s-title">
      <div className="wrap">
        <SectionHead id="s-title" kicker="Toolkit" title={<><span className="font-extralight">Tools I use</span> <span className="font-semibold">from concept to launch.</span></>} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="mb-3 border-b border-rule pb-3 text-[15px] text-quiet">{g.group}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it} className="py-[3px] text-[17px] tracking-[-0.01em]">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Faq() {
  return (
    <section id="faq" className="pb-[clamp(72px,10vw,136px)]" aria-labelledby="f-title">
      <div className="wrap">
        <SectionHead id="f-title" kicker="FAQ" title={<><span className="font-extralight">Questions clients</span> <span className="font-semibold">ask first.</span></>} />
        <div className="border-t border-rule">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[clamp(18px,2vw,21px)] font-medium tracking-[-0.02em]">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-8 w-8 flex-none place-items-center rounded-full border border-rule transition-[transform,background-color] duration-200 ease-out-strong group-open:rotate-45 group-open:border-transparent group-open:bg-mist group-open:text-violet"
                >
                  <Icon name="plus" className="h-3.5 w-3.5" />
                </span>
              </summary>
              <div className="faq-answer max-w-[70ch] pb-[26px] pr-14 text-quiet">
                <Fill text={f.a} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
