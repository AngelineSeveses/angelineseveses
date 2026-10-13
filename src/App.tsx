import { useState } from "react"
import { ToastProvider } from "@/components/ui/toast"
import { Header } from "@/components/sections/header"
import { Hero, Trust } from "@/components/sections/hero"
import { ResultsBand } from "@/components/sections/results-band"
import { DragCursor } from "@/components/ui/drag-cursor"
import { Work } from "@/components/sections/work"
import { About, Agencies, CaseStudy, Faq, Process, Services, Skills, Testimonials } from "@/components/sections/story"
import { FloatingCta } from "@/components/sections/floating-cta"
import { Contact, Footer } from "@/components/sections/contact"
import type { ServiceKey } from "@/data/content"

export default function App() {
  const [service, setService] = useState<ServiceKey>("design")
  const [type, setType] = useState("Freelance project")

  // Service and agency buttons preselect the matching options in the contact form.
  const pick = (key: ServiceKey) => {
    setService(key)
    if (key === "agency") setType("Agency collaboration")
  }

  return (
    <ToastProvider>
      <Header />
      <main id="top">
        <Hero />
        <Trust />
        <ResultsBand />
        <Work />
        <CaseStudy />
        <Services onPick={pick} />
        <Agencies onPick={pick} />
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
  )
}
