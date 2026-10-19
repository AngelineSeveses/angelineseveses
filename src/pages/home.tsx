import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Hero } from "@/components/sections/hero"
import { ClientBand } from "@/components/sections/client-band"
import { BeforeAfter } from "@/components/sections/before-after"
import { Services } from "@/components/sections/services"
import { Work } from "@/components/sections/work"
import { Testimonials } from "@/components/sections/testimonials"
import { Process } from "@/components/sections/process"
import { About } from "@/components/sections/about"
import { Toolkit } from "@/components/sections/toolkit"
import { Faq } from "@/components/sections/faq"
import { FloatingCta } from "@/components/sections/floating-cta"
import { Contact } from "@/components/sections/contact"
import { ScrollTrigger, scrollToHash } from "@/lib/motion"
import type { ServiceKey } from "@/data/content"

export function HomePage() {
  const { hash, key } = useLocation()
  const [service, setService] = useState<ServiceKey>("design")
  const [type, setType] = useState("Freelance project")

  // Arriving from another page with a hash (e.g. /#contact): once the sections have laid out,
  // re-measure the scroll animations, then jump straight to the section.
  useEffect(() => {
    if (!hash) return
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh()
      scrollToHash(hash, { immediate: true })
    }, 150)
    return () => window.clearTimeout(t)
  }, [hash, key])

  // Service links preselect the matching options in the contact form.
  const pick = (k: ServiceKey) => {
    setService(k)
    if (k === "agency") setType("Agency collaboration")
  }

  return (
    <main id="top">
      <Hero />
      <ClientBand />
      <BeforeAfter />
      <Services onPick={pick} />
      <Work />
      <Testimonials />
      <Process />
      <About />
      <Toolkit />
      <Faq />
      <FloatingCta />
      <Contact service={service} setService={setService} type={type} setType={setType} />
    </main>
  )
}
