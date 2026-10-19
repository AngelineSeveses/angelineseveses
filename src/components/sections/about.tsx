import { ButtonLink } from "@/components/ui/button"
import { Fill } from "@/components/ui/fill"
import { Icon } from "@/components/ui/icon"
import { LogoMark } from "@/components/ui/logo"
import { aboutFacts, experience, openTo } from "@/data/content"
import { cn } from "@/lib/utils"

function Portrait() {
  return (
    <figure className="m-0">
      <div className="grid aspect-[4/5] place-items-center rounded-card bg-lavender p-8 text-center">
        <div className="grid justify-items-center gap-3.5">
          <LogoMark className="text-[96px]" />
          <Fill text="[Add your photo, 4:5]" />
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[14px] text-quiet">
        Based in the Philippines
        <span className="inline-flex items-center gap-2 text-ink">
          <i aria-hidden="true" className="h-2 w-2 rounded-full bg-success" />
          Available for work
        </span>
      </figcaption>
    </figure>
  )
}

function Facts() {
  return (
    <dl className="grid grid-cols-2 border-y border-rule sm:grid-cols-4">
      {aboutFacts.map((fact, i) => (
        <div key={fact.label} className={cn("flex flex-col border-rule py-5 pr-4", i > 0 && "sm:border-l sm:pl-5", i % 2 === 1 && "max-sm:border-l max-sm:pl-5")}>
          <dt className="order-2 mt-1.5 text-[13px] leading-snug text-quiet">{fact.label}</dt>
          <dd className="order-1 font-serif text-[30px] leading-none tracking-[-0.02em]">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ExperienceTimeline() {
  return (
    <ol className="mt-4 border-l border-rule pl-6">
      {experience.map((job) => (
        <li key={job.company} className="relative pb-6 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[30px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-violet bg-cream" />
          <p className="text-[13.5px] tabular-nums text-quiet">{job.dates}</p>
          <p className="mt-0.5">
            <span className="font-medium">{job.role}</span>
            <span className="text-quiet"> · {job.company}</span>
          </p>
          <p className="mt-1 text-[15px] text-quiet">
            <Fill text={job.body} />
          </p>
        </li>
      ))}
    </ol>
  )
}

/** About: portrait, one serif statement, quick facts, experience, and the ways to work together. */
export function About() {
  return (
    <section id="about" className="section-pad" aria-labelledby="a-title">
      <div className="wrap grid items-start gap-[clamp(40px,6vw,88px)] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="mx-auto w-full max-w-[300px] sm:max-w-[380px] lg:sticky lg:top-28 lg:max-w-none">
          <Portrait />
        </div>

        <div>
          <span className="mb-3.5 block text-[15px] font-medium text-violet">About</span>
          <h2 id="a-title" className="display-head text-[clamp(44px,6vw,80px)] leading-[1]">
            <span className="font-extralight">Hi, I'm</span> <span className="font-semibold">Angeline.</span>
          </h2>
          <p className="mt-6 max-w-[30ch] font-serif text-[clamp(23px,2.3vw,30px)] leading-[1.28] tracking-[-0.01em]">
            I design websites in Figma and build them in WordPress, so nothing gets lost between the design and the live site.
          </p>
          <p className="mt-5 max-w-[58ch] text-quiet">
            I like fixing confusing websites and building sites clients can actually manage after launch. I also design banners and logos, so your
            visuals stay consistent.
          </p>

          <div className="mt-10">
            <Facts />
          </div>

          <h3 className="mt-12 text-[15px] font-medium text-quiet">Experience</h3>
          <ExperienceTimeline />

          <h3 className="mt-10 text-[15px] font-medium text-quiet">Open to</h3>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {openTo.map((option) => (
              <li key={option} className="flex items-center gap-2">
                <Icon name="check" className="h-4 w-4 text-violet" />
                {option}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#contact" variant="soft">
              Let's work together
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
