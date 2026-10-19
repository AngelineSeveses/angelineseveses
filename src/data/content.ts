import nmsBefore from "@/assets/projects/nms-2412.jpg"
import nmsAfter from "@/assets/projects/nms-2508.jpg"
import glBefore from "@/assets/projects/glauto-2510.jpg"
import glAfter from "@/assets/projects/glauto-live.jpg"
import csBefore from "@/assets/projects/cleanspace-2511.jpg"
import csAfter from "@/assets/projects/cleanspace-live.jpg"
import imBefore from "@/assets/projects/impact-2510.jpg"
import imAfter from "@/assets/projects/impact-live.jpg"
import frBefore from "@/assets/projects/froggy-2508.jpg"
import frAfter from "@/assets/projects/froggy-live.jpg"
import burlington from "@/assets/projects/burlington-live.jpg"
import type { IconName } from "@/components/ui/icon"
import dm from "@/assets/projects/dm.jpg"
import ottawa from "@/assets/projects/ottawa.jpg"

import lGl from "@/assets/clients/gl-auto.png"
import lCs from "@/assets/clients/cleanspace.png"
import lIm from "@/assets/clients/impact.webp"
import lFr from "@/assets/clients/froggy-fence.png"
import lNms from "@/assets/clients/new-media-services.png"
import lBu from "@/assets/clients/burlington-food-hall.png"
import lDm from "@/assets/clients/dm-tilt-n-load.webp"
import lOt from "@/assets/clients/ottawa-millwork.svg"
import lWg from "@/assets/clients/white-glove.png"
import lDt from "@/assets/clients/digitaletimmerman.png"
import lFf from "@/assets/clients/fiftyone-fifty.png"
import lRh from "@/assets/clients/rehive.png"


/**
 * Media provenance: every project image is a screenshot of the client's live site (October 2026)
 * or of its Internet Archive snapshot (the "before" versions), shown as portfolio work by the designer.
 */

/** Text in square brackets is a placeholder for Angeline to fill in. */
export const site = {
  email: "angelinesevesesc@gmail.com",
  linkedin: "https://www.linkedin.com/in/angeline-seveses/",
  behance: "https://www.behance.net/angelineseveses",
  replyTime: "[24–48 hours]",
  hours: "[your hours and time zone]",
}

/** The phrases that travel along the seam in the hero: the UX and business promise in a few words each. */
export const seamPhrases = [
  "Design for the users",
  "Design that converts",
  "Design for everyone",
  "Design that earns trust",
  "Every page with a purpose",
  "Clear paths to call, book and buy",
]

/** Hero text: one message covering every service. */
export const heroCopy = {
  eyebrow: "Web design · WordPress · Frontend · Website care",
  line1: "Websites that",
  line2: "bring in customers.",
  sub: "I design, build and look after websites for small businesses and teams, from the first Figma frame to a fast WordPress or React site.",
}

/**
 * Client logos for the band under the hero. `h` is the display height in px, tuned per logo so they
 * read at the same visual size. `solid` marks a logo drawn on a filled shape, which needs a different
 * filter to keep its detail.
 */
export const clientLogos: { name: string; src: string; h: number; solid?: boolean }[] = [
  { name: "G&L Auto", src: lGl, h: 40 },
  { name: "CleanSpace", src: lCs, h: 20 },
  { name: "Impact Cleaning Services", src: lIm, h: 26 },
  { name: "Froggy Fence", src: lFr, h: 34 },
  { name: "New Media Services", src: lNms, h: 26 },
  { name: "Burlington Food Hall", src: lBu, h: 52, solid: true },
  { name: "D&M Tilt 'n Load", src: lDm, h: 34 },
  { name: "Ottawa Custom Millwork", src: lOt, h: 28 },
  { name: "White Glove Services", src: lWg, h: 28 },
  { name: "Digitaletimmerman", src: lDt, h: 28 },
  { name: "Fiftyone-fifty", src: lFf, h: 52 },
  { name: "Rehive", src: lRh, h: 28 },
]

export type Shot = { src: string; alt: string }

export type Redesign = {
  name: string
  /** The one result shown large on the card. */
  headline?: { from: string; to: string; label: string }
  meta: string
  description: string
  before: Shot & { label: string }
  after: Shot & { label: string }
  results: string[]
  scores: string[]
}

export type DevWork = {
  name: string
  url: string
  meta: string
  description: string
  image: Shot
  scores: string[]
}

export const featured: Redesign = {
  name: "New Media Services",
  meta: "Redesign, WordPress, 2025",
  description:
    'I redesigned the homepage from the client\'s marketing direction, moving from a dark 2024 layout to a light, open design that leads with the "Human and AI" message.',
  before: { src: nmsBefore, label: "Before, 2024", alt: "New Media Services homepage in 2024, before the redesign: dark layout with a building photo" },
  after: { src: nmsAfter, label: "After, 2025", alt: "New Media Services homepage in 2025: light layout with a large centred headline, Book a Meeting button and team photos" },
  results: [
    'Calls to action went from 1 to 4 "Book a Meeting" buttons',
    "Each service now has its own section: customer support, content moderation, outsourcing, virtual assistants and seat leasing",
  ],
  scores: ["SEO 100", "Accessibility 100"],
}

export const redesigns: Redesign[] = [
  {
    name: "G&L Auto",
    headline: { from: "0", to: "15", label: "tap-to-call links" },
    meta: "Redesign, auto repair, Navan ON, 2026",
    description: "A full redesign of a local auto repair shop, moving off a basic website builder to a page built to get service requests.",
    before: { src: glBefore, label: "Before, 2025", alt: "G and L Auto homepage in 2025, a simple website-builder page with a large serif headline" },
    after: { src: glAfter, label: "After, 2026", alt: "G and L Auto homepage in 2026, with a service request form, reviews and a call button" },
    results: [
      "Service request forms went from 0 to 2, with one right in the hero",
      "Click-to-call phone links went from 0 to 15",
      'Content sections went from 2 to 14, and the title now targets "Auto Repair in Navan, ON"',
    ],
    scores: ["SEO 100", "Accessibility 100", "Best practices 100"],
  },
  {
    name: "CleanSpace",
    headline: { from: "2", to: "12", label: "tap-to-call links" },
    meta: "Redesign, commercial cleaning, Florida, 2026",
    description: "A redesign for a Florida commercial cleaning company, built around a quote form and trust signals above the fold.",
    before: { src: csBefore, label: "Before, 2025", alt: "CleanSpace homepage in 2025 with a grey hero and the headline Commercial Cleaning Experts" },
    after: { src: csAfter, label: "After, 2026", alt: "CleanSpace homepage in 2026 with a team photo, reviews and a commercial cleaning quote form" },
    results: [
      'Added a clear H1, "Commercial Cleaning Services in Florida", where there was none',
      "Quote request form moved into the hero",
      "Click-to-call links went from 2 to 12",
    ],
    scores: ["SEO 92", "Best practices 96", "Performance 66"],
  },
  {
    name: "Impact Cleaning Services",
    headline: { from: "0", to: "2", label: "contact forms" },
    meta: "Redesign, commercial cleaning, Canada, 2026",
    description: "A redesign for a Canadian cleaning company founded in 1954, leading with its team, its guarantee and its certifications.",
    before: { src: imBefore, label: "Before, 2025", alt: "Impact Cleaning Services homepage in 2025 with the headline Your partner for a cleaner workplace" },
    after: { src: imAfter, label: "After, 2026", alt: "Impact Cleaning Services homepage in 2026 with a team photo, a cleaning guarantee badge and certifications" },
    results: [
      "Contact forms went from 0 to 2, including \"Let's talk about your facility\" in the hero",
      "Added the Impact Cleaning Guarantee and certification badges up front",
      "Added structured data so Google can read the business details",
    ],
    scores: ["Performance 83", "SEO 100", "Best practices 100", "Accessibility 94"],
  },
  {
    name: "Froggy Fence",
    headline: { from: "14", to: "37", label: "content sections" },
    meta: "Redesign, fence contractor, Sacramento CA, 2026",
    description: "A redesign for a Sacramento-area fence company, from a dark poster-style page to a light, photo-led layout built for quote requests.",
    before: { src: frBefore, label: "Before, 2025", alt: "Froggy Fence homepage in 2025, bright green display type on black" },
    after: { src: frAfter, label: "After, 2026", alt: "Froggy Fence homepage in 2026, a light layout with a fence photo and a free estimate button" },
    results: [
      'Headline rewritten for search: "#1 Rated Fence Company in Greater Sacramento"',
      "Content sections went from 14 to 37 across services and service areas",
      "Added structured data for the business",
    ],
    scores: ["SEO 100", "Accessibility 95"],
  },
]

export const devWorks: DevWork[] = [
  {
    name: "Burlington Food Hall",
    url: "https://burlingtonfoodhall.com/",
    meta: "WordPress development, 2025",
    description: "Built in WordPress from the design, with vendor pages, a commissary kitchen page and a blog.",
    image: { src: burlington, alt: "Burlington Food Hall homepage with a photo of the brick building and green awnings" },
    scores: ["Best practices 100", "Accessibility 87"],
  },
  {
    name: "D&M Tilt 'n Load Inc.",
    url: "https://dmtiltnload.ca/",
    meta: "WordPress development, transport, 2024",
    description: "Rebuilt the page headings for SEO (0 to 7 section headings), added a contact form, and cut the homepage images from 73 to 32.",
    image: { src: dm, alt: "D and M Tilt 'n Load homepage with a flatbed truck and a call button" },
    scores: ["SEO 100", "Contact form added"],
  },
  {
    name: "Ottawa Custom Millwork",
    url: "https://ottawamillwork.ca/",
    meta: "WordPress (Oxygen) development, 2024",
    description: "Built in Oxygen, then added a real page title, meta description and client testimonials.",
    image: { src: ottawa, alt: "Ottawa Custom Millwork homepage with a workshop photo and a project enquiry form" },
    scores: ["SEO 100", "Best practices 96", "Performance 77"],
  },
]

export type ServiceKey = "design" | "wordpress" | "frontend" | "care" | "agency"

export type Service = {
  key: ServiceKey
  /** One-word stage shown above the title, and a short promise under it. */
  kicker: string
  tagline: string
  title: string
  summary: string
  items: string[]
  bestFor: string
  price: string
  cta: string
  /** A real project that shows this service, when there is one. */
  example?: { name: string; note: string; src: string; alt: string }
}

export const services: Service[] = [
  {
    key: "design",
    kicker: "Design",
    tagline: "Start with a plan",
    title: "Website design and UI/UX",
    summary: "Websites and app interfaces that build trust and guide visitors to act.",
    items: ["Website and landing page design", "Figma wireframes and prototypes", "Website and mobile app UI/UX", "Redesigns of outdated sites"],
    bestFor: "Businesses that need a professional, easy-to-use design.",
    price: "[$ your price]",
    cta: "Discuss a design project",
    example: { name: "Froggy Fence", note: "Redesign, 2026", src: frAfter, alt: "Froggy Fence homepage after the redesign" },
  },
  {
    key: "wordpress",
    kicker: "Build",
    tagline: "Launch a site your team can run",
    title: "WordPress development",
    summary: "Fast, flexible WordPress sites your team can manage.",
    items: ["Figma-to-WordPress builds", "Oxygen Builder and Elementor", "Custom Post Types and ACF", "Custom CSS and JavaScript"],
    bestFor: "Businesses that want a site they can update themselves.",
    price: "[$ your price]",
    cta: "Build my WordPress site",
    example: { name: "Burlington Food Hall", note: "WordPress build, 2025", src: burlington, alt: "Burlington Food Hall homepage built in WordPress" },
  },
  {
    key: "frontend",
    kicker: "Code",
    tagline: "Bring a design to life",
    title: "Frontend development",
    summary: "Designs turned into clean, responsive, interactive code.",
    items: ["HTML, CSS and JavaScript", "React and Tailwind interfaces", "Figma-to-code implementation", "Interactive components and animation"],
    bestFor: "Teams that need a design built or a frontend improved.",
    price: "[$ your price]",
    cta: "Discuss a build",
  },
  {
    key: "care",
    kicker: "Care",
    tagline: "Keep your site in shape",
    title: "Website care",
    summary: "Ongoing support so your site stays updated and working.",
    items: ["WordPress, theme and plugin updates", "Backups and security checks", "Speed improvements", "Content updates and layout fixes"],
    bestFor: "Businesses that want one reliable person for their website.",
    price: "[$ / month]",
    cta: "Improve my website",
  },
]

export const testimonials = [
  { quote: "I've had the pleasure of working with Angie, and I truly admire her work. Her designs are always clean and informative, beautiful yet professional.", name: "Moesha King", role: "Graphic/Web Designer, Rogers Hollow Consulting", initials: "MK" },
  { quote: "Professional, creative, and always on time. They helped us translate our ideas into a powerful online presence that truly connects with our audience.", name: "Celine Terrado", role: "Web Designer, Freelance", initials: "CT" },
]

export const steps: { title: string; body: string; get: string }[] = [
  { title: "Discover", body: "We talk through your goals, audience, content and must-haves.", get: "A clear project brief" },
  { title: "Design", body: "I plan the structure with wireframes, then design the look in Figma for your feedback.", get: "A Figma design you approve" },
  { title: "Build", body: "I build the responsive site in WordPress or code and test it on desktop, tablet and mobile.", get: "A working preview site" },
  { title: "Launch", body: "I polish the details, launch, show you how to manage it, and stay available for updates.", get: "Your live site and a handover" },
]

/** Quick facts in the About section. */
export const aboutFacts = [
  { value: "4+", label: "years designing and building" },
  { value: "100+", label: "projects, local and international" },
  { value: "4", label: "countries: Canada, US, Australia, Netherlands" },
  { value: "UTC+8", label: "Philippine time, overlaps with US, AU and EU hours" },
]

/** Work arrangements listed in the About section. */
export const openTo = ["Freelance projects", "Part-time remote roles", "Agency overflow work"]

/** Work history, newest first. Roles overlap because they're part-time and freelance. */
export const experience = [
  { role: "Intermediate Digital Designer", company: "Virtual Studios PH", dates: "2026 – present", body: "Research, design and code: from understanding users and the problem to designing the solution and building it." },
  { role: "Web Designer", company: "Secure Line Marketing", dates: "2025 – 2026", body: "Redesigned client websites in Figma, making sure each one met the client's needs and was built to convert." },
  { role: "WordPress Developer", company: "Digitaletimmerman", dates: "2025 – 2026", body: "Built dynamic WordPress sites with Custom Post Types and ACF, set up for structure, speed and easy editing." },
  {
    role: "Web Designer and WordPress Developer",
    company: "New Media Services",
    dates: "2023 – 2026",
    body: "Redesigned the company website in Figma and built it in WordPress, turning marketing goals into clearer pages and more calls to action.",
  },
]

export type Tool = { name: string; icon: IconName }

/** Real logos only where an official mark exists in the logo set; others get a neutral icon tile. */
export const skills: { group: string; tools: Tool[] }[] = [
  { group: "Design", tools: [{ name: "Figma", icon: "logo_figma" }, { name: "Photoshop", icon: "logo_photoshop" }, { name: "Illustrator", icon: "logo_illustrator" }, { name: "Wireframing", icon: "pen" }, { name: "Prototyping", icon: "layers" }, { name: "UI/UX", icon: "design" }] },
  { group: "WordPress", tools: [{ name: "WordPress", icon: "logo_wordpress" }, { name: "Oxygen Builder", icon: "layers" }, { name: "Elementor", icon: "widget" }, { name: "Custom Post Types", icon: "layers" }, { name: "ACF", icon: "widget" }] },
  { group: "Frontend", tools: [{ name: "HTML5", icon: "logo_html" }, { name: "CSS3", icon: "logo_css" }, { name: "JavaScript", icon: "logo_javascript" }, { name: "React", icon: "logo_react" }, { name: "Tailwind CSS", icon: "logo_tailwind" }, { name: "Bootstrap", icon: "logo_bootstrap" }] },
  { group: "Workflow", tools: [{ name: "VS Code", icon: "logo_vscode" }, { name: "Chrome DevTools", icon: "logo_chrome" }, { name: "Lighthouse", icon: "logo_lighthouse" }, { name: "Design handoff", icon: "pen" }] },
]

export const faqs = [
  { q: "Can you both design and develop my website?", a: "Yes. I can design it in Figma and build it in WordPress or code. You can also hire me for just one part." },
  { q: "Which WordPress builders do you use?", a: "Mostly Oxygen Builder and Elementor, plus Custom Post Types and ACF when a site needs structured content that's easy to edit." },
  { q: "Can you work on my existing website?", a: "Yes. I can redesign it, fix layouts and mobile issues, improve speed, or keep it updated every month." },
  { q: "Do you work with international clients?", a: `Yes. I'm based in the Philippines and work remotely with clients worldwide. I'm available during ${site.hours}.` },
  { q: "Are you open to part-time roles?", a: "Yes. Along with freelance projects, I'm open to part-time remote roles in web design, WordPress development or UI/UX. Send me a message and I'll share my CV." },
  { q: "Do you work with agencies?", a: "Yes. I can work white-label on design, WordPress builds and ongoing updates." },
  { q: "How much does a website cost?", a: "Most projects start at [$ your price]. The final price depends on the number of pages, features and timeline. Send me your project details and I'll reply with a clear quote." },
]

/** Screenshots floating in the contact CTA. All 16:10, the shape of a desktop screen, so each design reads whole. */
const desk = "aspect-[16/10]"
export const floatingShots = [
  { src: glAfter, depth: 0.5, className: `${desk} top-[7%] left-[4%] w-[clamp(150px,16vw,240px)]` },
  { src: nmsAfter, depth: 1, className: `${desk} top-[3%] left-[30%] w-[clamp(130px,13vw,200px)] max-md:hidden` },
  { src: imAfter, depth: 2, className: `${desk} top-[6%] left-[62%] w-[clamp(140px,14vw,210px)] max-md:top-[4%] max-md:left-[58%]` },
  { src: frAfter, depth: 1, className: `${desk} top-[13%] left-[81%] w-[clamp(150px,16vw,240px)] max-md:hidden` },
  { src: csAfter, depth: 1, className: `${desk} top-[44%] left-[-3%] w-[clamp(170px,18vw,270px)] max-md:top-[80%] max-md:left-[-8%]` },
  { src: burlington, depth: 2, className: `${desk} top-[62%] left-[80%] w-[clamp(180px,19vw,290px)] max-md:top-[82%] max-md:left-[60%]` },
  { src: dm, depth: 4, className: `${desk} top-[76%] left-[13%] w-[clamp(190px,20vw,300px)] max-md:hidden` },
  { src: ottawa, depth: 1, className: `${desk} top-[83%] left-[50%] w-[clamp(140px,14vw,210px)] max-md:hidden` },
]

export type Pin = { x: string; y: string; label: string; why: string }

/** Hero showcase: one real redesign per industry, with what changed and why it brings customers. */
export const heroShowcases: { industry: string; client: string; place: string; url: string; project: Redesign; pins: Pin[] }[] = [
  {
    industry: "Auto repair",
    client: "G&L Auto",
    place: "Navan, Ontario, since 1973",
    url: "glauto.ca",
    project: redesigns[0],
    pins: [
      { x: "70%", y: "14%", label: "Phone in the header", why: "0 → 15 tap-to-call links" },
      { x: "87%", y: "14%", label: "Request Service button", why: "Always one click away" },
      { x: "61%", y: "33%", label: "Quote form in the hero", why: "0 → 2 request forms" },
    ],
  },
  {
    industry: "Cleaning",
    client: "CleanSpace",
    place: "Florida",
    url: "cleanspaceonline.com",
    project: redesigns[1],
    pins: [
      { x: "42%", y: "26%", label: "A headline that says where", why: "\"Commercial Cleaning Services in Florida\"" },
      { x: "61%", y: "27%", label: "Quote form above the fold", why: "No scrolling to ask for a price" },
      { x: "88%", y: "9%", label: "Phone always visible", why: "2 → 12 tap-to-call links" },
    ],
  },
  {
    industry: "Facilities",
    client: "Impact Cleaning",
    place: "Canada, since 1954",
    url: "impact.ca",
    project: redesigns[2],
    pins: [
      { x: "40%", y: "25%", label: "Guarantee up front", why: "Trust before the first scroll" },
      { x: "66%", y: "57%", label: "\"Let's talk\" in the hero", why: "0 → 2 contact forms" },
      { x: "90%", y: "10%", label: "Certifications in the header", why: "Proof buyers look for" },
    ],
  },
  {
    industry: "Fencing",
    client: "Froggy Fence",
    place: "Greater Sacramento, CA",
    url: "froggyfence.com",
    project: redesigns[3],
    pins: [
      { x: "86%", y: "13%", label: "Free quote in the header", why: "One tap from any page" },
      { x: "40%", y: "81%", label: "Headline written for search", why: "\"#1 Rated Fence Company\"" },
      { x: "62%", y: "91%", label: "Estimate button by the copy", why: "Ask while they're convinced" },
    ],
  },
]
