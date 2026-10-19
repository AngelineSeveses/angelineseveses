/**
 * Every project, in one list. The homepage shows the ones in `homeProjects`; the /projects page
 * shows them all, split into the Redesign and Development tabs by `category`.
 *
 * Screenshots are of each client's live site (October 2026); "before" images come from the
 * Internet Archive. Descriptions for the older projects come from the previous portfolio.
 */
import { devWorks, featured, redesigns, type Redesign, type Shot } from "@/data/content"
import bidfood from "@/assets/projects/bidfood.jpg"
import choice from "@/assets/projects/choise.jpg"
import crusaders from "@/assets/projects/crusaders.jpg"
import digital from "@/assets/projects/digital.jpg"
import fiftyone from "@/assets/projects/fiftyone.jpg"
import genesys from "@/assets/projects/genesys.jpg"
import rehive from "@/assets/projects/rehive.jpg"
import trace from "@/assets/projects/trace.jpg"
import voxtech from "@/assets/projects/voxtech.jpg"
import whiteGlove from "@/assets/projects/whiteglove.jpg"

export type ProjectCategory = "redesign" | "development"

export type Project = {
  name: string
  category: ProjectCategory
  meta: string
  description: string
  /** Where "View project" goes: the live site, or Behance for concept work. */
  link?: { label: string; href: string }
  image?: Shot
  /** Redesigns with a before/after comparison. */
  compare?: Redesign
  scores?: string[]
}

const live = (href: string) => ({ label: "Visit site", href })
const behance = (href: string) => ({ label: "View on Behance", href })

/** Live sites for the redesigns (the redesign data in content.ts doesn't carry URLs). */
const redesignSites: Record<string, string> = {
  "New Media Services": "https://newmediaservices.com.au/",
  "G&L Auto": "https://glauto.ca/",
  CleanSpace: "https://cleanspaceonline.com/",
  "Impact Cleaning Services": "https://impact.ca/",
  "Froggy Fence": "https://froggyfence.com/",
}

const compared: Project[] = [featured, ...redesigns].map((r) => ({
  name: r.name,
  category: "redesign",
  meta: r.meta,
  description: r.description,
  compare: r,
  link: redesignSites[r.name] ? live(redesignSites[r.name]) : undefined,
  image: r.after,
  scores: r.scores,
}))

const built: Project[] = devWorks.map((d) => ({
  name: d.name,
  category: "development",
  meta: d.meta,
  description: d.description,
  link: live(d.url),
  image: d.image,
  scores: d.scores,
}))

const moreRedesigns: Project[] = [
  {
    name: "White Glove Services",
    category: "redesign",
    meta: "Web design, WordPress (Oxygen), 2025",
    description: "Created on WordPress Oxygen, improved UI/UX and page speed for higher engagement.",
    link: live("https://whitegloveservices.ai/"),
    image: { src: whiteGlove, alt: "White Glove Services homepage" },
    scores: ["Performance 84", "SEO 92", "Accessibility 91"],
  },
  {
    name: "Genesys",
    category: "redesign",
    meta: "Web design, 2025",
    description: "React redesign with improved UI consistency and performance.",
    link: live("https://genesys.popai.agency/"),
    image: { src: genesys, alt: "Genesys homepage with the headline AI Agents Come to Life" },
  },
  {
    name: "Voxtech",
    category: "redesign",
    meta: "Web design, 2025",
    description: "Improved UI/UX and performance using Oxygen.",
    link: live("https://www.voxtech3d.com/"),
    image: { src: voxtech, alt: "Voxtech micro 3D printing services page" },
  },
  {
    name: "Crusaders Fence",
    category: "redesign",
    meta: "Web design, Figma, 2025",
    description: "Crafted in Figma: modern, clean and focused on conversions.",
    link: live("https://crusadersfenceva.com/"),
    image: { src: crusaders, alt: "Crusaders Fence homepage with the headline Beautiful Boundaries Built to Last" },
  },
  {
    name: "Bidfood",
    category: "redesign",
    meta: "UI/UX design, 2025",
    description: "UI/UX redesign created for better performance and aesthetics.",
    link: live("https://bidfoodhome.ae/"),
    image: { src: bidfood, alt: "Bidfood Home online grocery homepage" },
  },
  {
    name: "Fence Haven",
    category: "redesign",
    meta: "UI/UX design, 2025",
    description: "Improved structure and hierarchy for a better browsing experience.",
    link: behance("https://www.behance.net/gallery/238793853/Fence-Haven-Redesign-Website"),
  },
  {
    name: "Clarity Growth",
    category: "redesign",
    meta: "Landing page design, 2025",
    description: "Clean and modern landing page focused on clarity.",
    link: behance("https://www.behance.net/gallery/230624641/Clarity-Growth-Landing-page-Design"),
  },
  {
    name: "Migrate",
    category: "redesign",
    meta: "Landing page design, 2025",
    description: "Landing page designed for readability and structure.",
  },
  {
    name: "Streets",
    category: "redesign",
    meta: "Landing page design, Figma, 2025",
    description: "Modern streetwear landing page made in Figma.",
    link: behance("https://www.behance.net/gallery/230624051/Streets-Landing-Page-design"),
  },
  {
    name: "Playkido",
    category: "redesign",
    meta: "UI design, 2025",
    description: "Playful UI design focusing on parents and kids.",
    link: behance("https://www.behance.net/gallery/230623765/PlayKido"),
  },
]

const moreBuilds: Project[] = [
  {
    name: "Digitaletimmerman",
    category: "development",
    meta: "WordPress development, CPT and ACF, 2025",
    description: "Dynamic WordPress build using CPT and ACF, optimised for structure, speed and flexibility.",
    link: live("https://www.digitaletimmerman.nl/"),
    image: { src: digital, alt: "De Digitale Timmerman homepage" },
    scores: ["SEO 100", "Accessibility 93"],
  },
  {
    name: "Fiftyone-fifty",
    category: "development",
    meta: "WordPress development, Elementor, 2025",
    description: "A clean Elementor build focused on speed, branding and conversion-focused UI.",
    link: live("https://www.fiftyone-fifty.nl/"),
    image: { src: fiftyone, alt: "Fiftyone-fifty homepage" },
    scores: ["SEO 92", "Best practices 100"],
  },
  {
    name: "Choice School Systems",
    category: "development",
    meta: "WordPress development, Oxygen, 2025",
    description: "A modern WordPress Oxygen layout designed with strong UX structure.",
    link: live("https://paleturquoise-gnat-909776.hostingersite.com/homepage/"),
    image: { src: choice, alt: "Choice School Systems homepage with the headline Automate Enrollment Campaigns" },
    scores: ["SEO 92", "Accessibility 91"],
  },
  {
    name: "Rehive",
    category: "development",
    meta: "Frontend development, React, 2025",
    description: "React-based frontend with modern UI components optimised for performance.",
    link: live("https://rehive.ai/"),
    image: { src: rehive, alt: "Rehive homepage" },
    scores: ["SEO 92", "Accessibility 93"],
  },
  {
    name: "Trace Design",
    category: "development",
    meta: "WordPress development, Oxygen, 2024",
    description: "Oxygen-built website with fast loading and clean structure.",
    link: live("https://trace-design.com/"),
    image: { src: trace, alt: "Trace Design homepage for custom shirt design" },
  },
  {
    name: "Dutch Dragons",
    category: "development",
    meta: "WordPress development, CPT and ACF, 2025",
    description: "Built with WordPress, CPT and ACF, delivering scalable structure and improved performance.",
  },
]

export const projects: Project[] = [...compared, ...moreRedesigns, ...built, ...moreBuilds]

/** The four shown on the homepage, in order. */
export const homeProjects: Project[] = ["New Media Services", "G&L Auto", "Impact Cleaning Services", "Burlington Food Hall"].map((name) => {
  const project = projects.find((p) => p.name === name)
  if (!project) throw new Error(`homeProjects: no project named "${name}" in projects.ts`)
  return project
})
