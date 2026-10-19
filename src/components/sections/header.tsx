import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react"
import { ButtonLink } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { getLenis, scrollToHash } from "@/lib/motion"
import { site } from "@/data/content"
import { useLocation, useNavigate } from "react-router-dom"
import { Logo } from "@/components/ui/logo"
import { cn } from "@/lib/utils"

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
]

/** Which section is under the header right now. */
function useActiveSection(pathname: string) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    setActive(null)
    const sections = links.map((l) => document.querySelector<HTMLElement>(l.href)).filter((s): s is HTMLElement => !!s)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    sections.forEach((s) => io.observe(s))
    // Above the first section (the hero), nothing is active.
    const onScroll = () => {
      if (sections[0] && sections[0].getBoundingClientRect().top > window.innerHeight * 0.3) setActive(null)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [pathname])
  return active
}

export function Header() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const onHome = pathname === "/"
  const active = useActiveSection(pathname)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({})
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // The highlight slides to the active link; measured, so it fits any label width.
  useLayoutEffect(() => {
    const el = active ? linkRefs.current[active] : null
    const nav = navRef.current
    if (!el || !nav) return setPill(null)
    const a = el.getBoundingClientRect()
    const n = nav.getBoundingClientRect()
    setPill({ x: a.left - n.left, w: a.width })
  }, [active])

  // Mobile menu: lock the page behind it, close on Escape, move focus in and back out.
  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    lenis?.stop()
    document.documentElement.style.overflow = "hidden"
    firstMenuLinkRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    const button = menuButtonRef.current
    return () => {
      window.removeEventListener("keydown", onKey)
      document.documentElement.style.overflow = ""
      lenis?.start()
      button?.focus()
    }
  }, [open])

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)
    // From another page, go home first; the home page scrolls to the hash once it has rendered.
    if (!onHome) return navigate(`/${href}`)
    // Wait one frame so the menu has released the scroll lock.
    requestAnimationFrame(() => scrollToHash(href))
  }

  return (
    <header className="sticky top-[calc(env(safe-area-inset-top,0px)+12px)] z-40 px-[clamp(12px,3vw,32px)]">
      <div
        className={cn(
          "mx-auto flex h-[60px] max-w-[1120px] items-center justify-between gap-4 rounded-card border pl-4 pr-2 backdrop-blur-[18px] backdrop-saturate-[1.6] transition-[background-color,border-color,box-shadow] duration-300",
          scrolled || open ? "border-ink/15 bg-cream/95" : "border-ink/10 bg-cream/75"
        )}
      >
        <a href="/#top" aria-label="Angeline Seveses, home" className="no-underline" onClick={(e) => go(e, "#top")}>
          <Logo className="text-[16px] sm:text-[17px]" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <div ref={navRef} className="relative flex items-center gap-0.5">
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-[2px] rounded-full bg-violet transition-[transform,width,opacity] duration-300 ease-out-strong motion-reduce:transition-none"
              style={{ transform: `translateX(${pill?.x ?? 0}px)`, width: pill?.w ?? 0, opacity: pill ? 1 : 0 }}
            />
            {links.map((l) => (
              <a
                key={l.href}
                ref={(el) => {
                  linkRefs.current[l.href] = el
                }}
                href={`/${l.href}`}
                onClick={(e) => go(e, l.href)}
                aria-current={active === l.href ? "location" : undefined}
                className={cn("relative px-3 py-2 text-[14.5px] no-underline transition-colors duration-200", active === l.href ? "text-ink" : "text-quiet hover:text-ink")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/#contact" size="sm" variant="soft" onClick={(e) => go(e, "#contact")}>
            Start a project
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-ink transition-transform duration-[160ms] ease-out-strong hover:bg-ink/5 active:scale-[0.94] lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile menu: drops from the header, leaves the same way. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-[clamp(12px,3vw,32px)] top-[calc(100%+8px)] h-[calc(100svh-96px)] overflow-y-auto rounded-card border border-ink/10 bg-cream shadow-raised lg:hidden"
      >
        <div className="flex min-h-full flex-col px-5 py-6 motion-safe:animate-[menu-in_280ms_var(--ease-drawer)]">
          <nav aria-label="Mobile">
            <ul>
              {links.map((l, i) => (
                <li key={l.href} className="border-b border-rule">
                  <a
                    ref={i === 0 ? firstMenuLinkRef : undefined}
                    href={`/${l.href}`}
                    onClick={(e) => go(e, l.href)}
                    className="flex items-center justify-between py-4 font-sans text-[32px] font-medium tracking-[-0.035em] no-underline"
                  >
                    {l.label}
                    <Icon name="arrowUpRight" className="h-6 w-6 text-violet" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-10">
            <ButtonLink href="/#contact" size="lg" onClick={(e) => go(e, "#contact")}>
              Start a project
            </ButtonLink>
            <p className="mt-3 flex items-center justify-center gap-2 text-sm text-quiet">
              <Icon name="mail" className="h-4 w-4" />
              <span className="select-all">{site.email}</span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
