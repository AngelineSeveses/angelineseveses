import { ButtonLink } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** "Angeline" in the sketch weight, "Seveses" in the build weight, joined by a stitch. */
export function Wordmark({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline whitespace-nowrap tracking-[-0.035em]", className)}>
      <span className="font-extralight">Angeline</span>
      <span
        aria-hidden="true"
        className="mx-[0.1em] inline-block h-[1.5px] w-[0.42em] -translate-y-[0.32em]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${dark ? "var(--color-soft)" : "var(--color-violet)"} 0 .1em, transparent .1em .18em)`,
        }}
      />
      <span className="font-semibold">Seveses</span>
    </span>
  )
}

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
]

export function Header() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-rule bg-cream/80 backdrop-blur-[18px] backdrop-saturate-[1.6] motion-reduce:backdrop-blur-none">
      <div className="wrap flex h-16 items-center justify-between gap-5">
        <a href="#top" aria-label="Angeline Seveses, back to top" className="text-lg no-underline">
          <Wordmark />
        </a>
        <nav aria-label="Main" className="hidden gap-7 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[15px] text-quiet no-underline transition-colors duration-200 hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <ButtonLink href="#contact" size="sm">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
