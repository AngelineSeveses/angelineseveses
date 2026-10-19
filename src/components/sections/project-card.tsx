import { CheckList } from "@/components/ui/check-list"
import { Icon } from "@/components/ui/icon"
import { TagList } from "@/components/ui/tag-list"
import type { Project } from "@/data/projects"

function Headline({ headline }: { headline: NonNullable<NonNullable<Project["compare"]>["headline"]> }) {
  return (
    <p className="flex items-baseline gap-2.5">
      <span className="whitespace-nowrap font-serif text-[clamp(34px,3.4vw,44px)] leading-none tracking-[-0.03em] tabular-nums">
        <span className="text-quiet">{headline.from}</span>
        <span className="mx-1.5 italic text-violet" aria-label="to">
          →
        </span>
        <span>{headline.to}</span>
      </span>
      <span className="text-[14px] leading-tight text-quiet">{headline.label}</span>
    </p>
  )
}

function ExternalLink({ link, name }: { link: NonNullable<Project["link"]>; name: string }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener"
      aria-label={`${link.label}: ${name}`}
      className="inline-flex items-center gap-1.5 border-b border-ink/25 pb-0.5 text-[14.5px] font-medium no-underline transition-colors duration-200 hover:border-violet hover:text-violet"
    >
      {link.label}
      <Icon name="arrowUpRight" className="h-4 w-4" />
    </a>
  )
}

/**
 * A project with a screenshot of the finished site. (The before/after slider lives only in the
 * homepage showcase.) Used on /projects.
 */
export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-card border border-rule bg-paper">
      {p.image ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-rule">
          <img
            src={p.image.src}
            alt={p.image.alt}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-out-strong motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.03]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-sans font-medium text-[26px] leading-tight tracking-[-0.035em]">{p.name}</h3>
        <p className="mt-0.5 text-[13.5px] text-quiet">{p.meta}</p>
        {p.compare?.headline && (
          <div className="mt-5">
            <Headline headline={p.compare.headline} />
          </div>
        )}
        {p.compare ? (
          <CheckList items={p.compare.results} className="mt-5 border-t border-rule pt-4" />
        ) : (
          <p className="mt-3 text-[14.5px] leading-relaxed text-quiet">{p.description}</p>
        )}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-3 pt-6">
          {p.scores && <TagList items={p.scores} />}
          {p.link && <ExternalLink link={p.link} name={p.name} />}
        </div>
      </div>
    </article>
  )
}

/** A project without a screenshot (concept work on Behance, or a site that is offline): one line in a list. */
export function ProjectRow({ p }: { p: Project }) {
  return (
    <li className="grid gap-x-8 gap-y-2 border-t border-rule py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)_auto]">
      <div>
        <h3 className="font-sans font-medium text-[22px] leading-tight tracking-[-0.035em]">{p.name}</h3>
        <p className="mt-0.5 text-[13.5px] text-quiet">{p.meta}</p>
      </div>
      <p className="text-[14.5px] leading-relaxed text-quiet sm:col-span-2 sm:row-start-2 md:col-span-1 md:row-start-auto">{p.description}</p>
      <div className="sm:col-start-2 sm:row-start-1 sm:justify-self-end md:col-start-auto md:row-start-auto">{p.link ? <ExternalLink link={p.link} name={p.name} /> : <span className="text-[13.5px] text-quiet">No public link</span>}</div>
    </li>
  )
}
