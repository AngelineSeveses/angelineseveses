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
import dm from "@/assets/projects/dm.jpg"
import ottawa from "@/assets/projects/ottawa.jpg"

import tGl from "@/assets/thumbs/glauto-live.jpg"
import tNms from "@/assets/thumbs/nms-2508.jpg"
import tIm from "@/assets/thumbs/impact-live.jpg"
import tFr from "@/assets/thumbs/froggy-live.jpg"
import tCs from "@/assets/thumbs/cleanspace-live.jpg"
import tBu from "@/assets/thumbs/burlington-live.jpg"
import tDm from "@/assets/thumbs/dm.jpg"
import tOt from "@/assets/thumbs/ottawa.jpg"

/** Text in square brackets is a placeholder for Angeline to fill in. */
export const site = {
  name: { first: "Angeline", last: "Seveses" },
  email: "angelinesevesesc@gmail.com",
  linkedin: "https://www.linkedin.com/in/angeline-seveses/",
  behance: "https://www.behance.net/angelineseveses",
  availability: "Open to freelance, part-time and full-time remote work",
  availabilityShort: "Available for new projects",
  replyTime: "[24–48 hours]",
  hours: "[your hours and time zone]",
}

/** Hero proof points: every number here is checked (Lighthouse, Oct 2026) or from Angeline's own history. */
export const heroProof = [
  { value: "4+", label: "years designing and building" },
  { value: "20+", label: "business websites" },
  { value: "8", label: "sites scoring 100 for SEO" },
]

/** Before → after numbers for the results band. "from" is omitted for single scores. */
export const resultsBand: { from?: string; to: string; label: string; client: string }[] = [
  { from: "0", to: "15", label: "tap-to-call phone links", client: "G&L Auto, auto repair" },
  { from: "1", to: "4", label: '"Book a Meeting" calls to action', client: "New Media Services, BPO" },
  { from: "0", to: "2", label: "contact forms, one in the hero", client: "Impact Cleaning Services" },
  { to: "100", label: "SEO score on 8 live sites", client: "Google Lighthouse, Oct 2026" },
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

export const moreProjects =
  "White Glove Services, Digitaletimmerman, Genesys, Bidfood, Dutch Dragons, Fiftyone-fifty, Choise School System, Rehive, Crusaders Fence, Fence Haven, J&A Fence, Integra Built, Trace Design, Voxtech, Clarity Growth, Migrate, Streets and Playkido."

export const caseStudy = {
  title: "Rebuilding a BPO website around what clients look for.",
  intro: "New Media Services, 2024 to 2025 redesign. Designer and developer, Figma and WordPress.",
  image: { src: nmsAfter, alt: "The redesigned New Media Services homepage" },
  blocks: [
    { title: "The challenge", body: "The 2024 homepage was dark, with a long paragraph under the headline and a single call to action. All services sat in one block, so visitors had to dig to find the one they needed." },
    { title: "The approach", body: 'I followed the client\'s marketing direction: lead with the "Human and AI" message, open the layout up, show real people, and give every service its own place on the page.' },
    { title: "The solution", body: 'A light, responsive homepage with a large centred headline, team photos, dedicated sections for each service, a case studies link, and "Book a Meeting" repeated where visitors decide.' },
    { title: "The outcome", body: "Calls to action went from 1 to 4, and services went from one shared block to their own sections. The live site scores 100 for SEO and 100 for accessibility in Google Lighthouse." },
  ],
}

export type ServiceKey = "design" | "wordpress" | "frontend" | "care" | "agency"

export const services: { key: ServiceKey; title: string; summary: string; items: string[]; bestFor: string; price: string; cta: string }[] = [
  { key: "design", title: "Website design and UI/UX", summary: "Websites and app interfaces that build trust and guide visitors to act.", items: ["Website and landing page design", "Figma wireframes and interactive prototypes", "Website and mobile app UI/UX", "Redesigns of outdated or hard-to-use sites"], bestFor: "For businesses that need a professional, easy-to-use design.", price: "[$ your price]", cta: "Discuss a design project" },
  { key: "wordpress", title: "WordPress development", summary: "Fast, flexible WordPress sites your team can manage.", items: ["Figma-to-WordPress builds", "Oxygen Builder and Elementor", "Custom Post Types and ACF", "Custom CSS and JavaScript", "Responsive fixes and layout work"], bestFor: "For businesses that want a site they can update themselves.", price: "[$ your price]", cta: "Build my WordPress site" },
  { key: "frontend", title: "Frontend development", summary: "Designs turned into clean, responsive, interactive code.", items: ["HTML, CSS and JavaScript", "React and Tailwind interfaces", "Figma-to-code implementation", "Interactive components and animation"], bestFor: "For teams that need a design built or a frontend improved.", price: "[$ your price]", cta: "Discuss a build" },
  { key: "care", title: "Website care", summary: "Ongoing support so your site stays updated and working.", items: ["WordPress, theme and plugin updates", "Backups and basic security checks", "Speed improvements", "Content updates and layout fixes"], bestFor: "For businesses that want one reliable person for their website.", price: "[$ / month]", cta: "Improve my website" },
]

export const testimonials = [
  { quote: "I've had the pleasure of working with Angie, and I truly admire her work. Her designs are always clean and informative, beautiful yet professional.", name: "Moesha King", role: "Graphic/Web Designer, Rogers Hollow Consulting", initials: "MK" },
  { quote: "Professional, creative, and always on time. They helped us translate our ideas into a powerful online presence that truly connects with our audience.", name: "Celine Terrado", role: "Web Designer, Freelance", initials: "CT" },
]

export const steps = [
  { title: "Discover", body: "We talk through your goals, audience, content and must-haves." },
  { title: "Design", body: "I plan the structure with wireframes, then design the look in Figma for your feedback." },
  { title: "Build", body: "I build the responsive site in WordPress or code and test it on desktop, tablet and mobile." },
  { title: "Launch", body: "I polish the details, launch, show you how to manage it, and stay available for updates." },
]

export const experience = [
  { role: "[Job title] at [Company]", dates: "[Year] to now", body: "Design and build client websites in Figma and WordPress (Oxygen, Elementor, ACF)." },
  { role: "[Job title] at [Company]", dates: "[Year] to [Year]", body: "[One line on what you did]" },
  { role: "Freelance web designer and WordPress developer", dates: "[Year] to now", body: "Design and development projects for clients worldwide." },
]

export const skills = [
  { group: "Design", items: ["Figma", "Wireframing", "Prototyping", "UI/UX", "Photoshop", "Illustrator"] },
  { group: "WordPress", items: ["WordPress", "Oxygen Builder", "Elementor", "Custom Post Types", "ACF"] },
  { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Bootstrap"] },
  { group: "Workflow", items: ["VS Code", "Browser DevTools", "Design handoff", "Lighthouse audits"] },
]

export const faqs = [
  { q: "Can you both design and develop my website?", a: "Yes. I can design it in Figma and build it in WordPress or code. You can also hire me for just one part." },
  { q: "Which WordPress builders do you use?", a: "Mostly Oxygen Builder and Elementor, plus Custom Post Types and ACF when a site needs structured content that's easy to edit." },
  { q: "Can you work on my existing website?", a: "Yes. I can redesign it, fix layouts and mobile issues, improve speed, or keep it updated every month." },
  { q: "Do you work with international clients?", a: `Yes. I'm based in the Philippines and work remotely with clients worldwide. I'm available during ${site.hours}.` },
  { q: "Are you open to part-time or full-time roles?", a: "Yes. Along with freelance projects, I'm open to part-time and full-time remote roles in web design, WordPress development or UI/UX. Download my CV or send me a message." },
  { q: "Do you work with agencies?", a: "Yes. I can work white-label on design, WordPress builds and ongoing updates." },
  { q: "How much does a website cost?", a: "Most projects start at [$ your price]. The final price depends on the number of pages, features and timeline. Send me your project details and I'll reply with a clear quote." },
]

export const floatingShots = [
  { src: tGl, depth: 0.5, className: "top-[8%] left-[6%] w-[clamp(90px,10vw,150px)] aspect-[4/3]" },
  { src: tNms, depth: 1, className: "top-[10%] left-[28%] w-[clamp(110px,12vw,180px)] aspect-[16/10] max-md:hidden" },
  { src: tIm, depth: 2, className: "top-[-3%] left-[63%] w-[clamp(110px,11vw,170px)] aspect-[4/5] max-md:top-[3%]" },
  { src: tFr, depth: 1, className: "top-[6%] left-[82%] w-[clamp(110px,12vw,180px)] aspect-square max-md:hidden" },
  { src: tCs, depth: 1, className: "top-[42%] left-[-2%] w-[clamp(130px,14vw,210px)] aspect-square max-md:top-[76%] max-md:left-[-6%]" },
  { src: tBu, depth: 2, className: "top-[66%] left-[78%] w-[clamp(140px,15vw,230px)] aspect-[4/5] max-md:top-[74%] max-md:left-[66%]" },
  { src: tDm, depth: 4, className: "top-[72%] left-[12%] w-[clamp(170px,19vw,290px)] aspect-[16/10] max-md:top-[86%] max-md:left-[22%]" },
  { src: tOt, depth: 1, className: "top-[80%] left-[48%] w-[clamp(110px,12vw,180px)] aspect-[4/3] max-md:hidden" },
]
