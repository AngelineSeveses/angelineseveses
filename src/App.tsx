import { useState } from "react"
import { ToastProvider } from "@/components/ui/toast"
import { DragCursor } from "@/components/ui/drag-cursor"
import { Header } from "@/components/sections/header"
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
import { Footer } from "@/components/sections/footer"
import { AudienceProvider } from "@/lib/audience"
import { useSmoothScroll } from "@/lib/motion"
import type { ServiceKey } from "@/data/content"

export default function App() {
  useSmoothScroll()
  const [service, setService] = useState<ServiceKey>("design")
  const [type, setType] = useState("Freelance project")

  // Service buttons preselect the matching options in the contact form.
  const pick = (key: ServiceKey) => {
    setService(key)
    if (key === "agency") setType("Agency collaboration")
  }

  return (
    <AudienceProvider>
      <ToastProvider>
        <Header />
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
        <Footer />
        <DragCursor />
      </ToastProvider>
    </AudienceProvider>
  )
}
