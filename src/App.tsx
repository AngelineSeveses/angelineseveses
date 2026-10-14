import { useState } from "react"
import { ToastProvider } from "@/components/ui/toast"
import { DragCursor } from "@/components/ui/drag-cursor"
import { Header } from "@/components/sections/header"
import { BeforeAfter, ClientBand, Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { Process, Services, Skills, Testimonials } from "@/components/sections/offer"
import { About, Faq } from "@/components/sections/story"
import { FloatingCta } from "@/components/sections/floating-cta"
import { Contact, Footer } from "@/components/sections/contact"
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
          <Skills />
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
