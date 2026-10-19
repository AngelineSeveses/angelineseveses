import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer"
import { useLocation } from "react-router-dom"
import { site } from "@/data/content"
import { token } from "@/lib/theme"

/**
 * Halftone wordmark footer: the name set enormous in dots, cropped by the bottom edge.
 * Brand palette: aubergine ground, cream dots that warm to soft violet when pushed.
 */
export function Footer() {
  // Section links point at the homepage when the footer is shown on another page.
  const base = useLocation().pathname === "/" ? "" : "/"
  return (
    <HalftoneWordmarkFooter
      wordmark="angeline"
      label="Angeline Seveses"
      meta="Web designer and WordPress developer, Philippines"
      columns={[
        {
          title: "Pages",
          links: [
            { label: "Work", href: `${base}#work` },
            { label: "All projects", href: "/projects" },
            { label: "Services", href: `${base}#services` },
            { label: "About", href: `${base}#about` },
            { label: "FAQ", href: `${base}#faq` },
          ],
        },
        {
          title: "Elsewhere",
          links: [
            { label: "LinkedIn", href: site.linkedin },
            { label: "Behance", href: site.behance },
          ],
        },
        {
          title: "Contact",
          links: [
            { label: "Start a project", href: `${base}#contact` },
            { label: site.email, href: `mailto:${site.email}` },
          ],
        },
      ]}
      palette={{ background: token("--color-band"), ink: token("--color-cream"), warm: token("--color-soft") }}
      fontFamily='"Geist Variable", ui-sans-serif, system-ui, sans-serif'
      fontWeight={800}
      monoFamily='"Geist Variable", ui-sans-serif, system-ui, sans-serif'
      height="clamp(420px, 52vw, 600px)"
      dotGap={6}
      crop={0.18}
    />
  )
}
