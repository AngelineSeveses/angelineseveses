import { Icon } from "@/components/ui/icon"
import { ButtonLink, Button } from "@/components/ui/button"
import { Fill } from "@/components/ui/fill"
import { SectionHead } from "@/components/ui/section-head"
import { useToast } from "@/components/ui/toast"
import { experience, faqs } from "@/data/content"

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
