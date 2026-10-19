# Angeline Seveses portfolio

React + TypeScript + Vite + Tailwind CSS v4, using the shadcn folder structure.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Build and deploy

```bash
npm run build
```

The site is built into `dist/`. Netlify reads `netlify.toml` (build command `npm run build`, publish `dist`), so every push to `main` redeploys. The same file sends every URL to `index.html`, so `/projects` works when opened directly.

## Where to change things

| To change | Edit |
|---|---|
| Any text: hero, services, steps, testimonials, FAQ, about facts, client logos | `src/data/content.ts` |
| Projects (homepage shows four, `/projects` shows all, split into Redesign and Development tabs) | `src/data/projects.ts` (`homeProjects` picks the four) |
| Client logos in the band under the hero | `src/assets/clients/`, listed in `clientLogos` in `content.ts` |
| The logo and favicon | `src/components/ui/logo.tsx` and `public/favicon.svg` |
| Colours, fonts, corner radii, the one shadow, easing curves | the `@theme` block at the top of `src/index.css` |
| Project screenshots | `src/assets/projects/` (CTA thumbnails in `src/assets/thumbs/`) |
| A single section's layout | `src/components/sections/<section>.tsx` (one file per section) |
| Page order | `src/pages/home.tsx` (routes and the shared header and footer are in `src/App.tsx`) |
| Navigation links | `links` at the top of `src/components/sections/header.tsx` |
| Footer links and wordmark | `src/components/sections/footer.tsx` |
| Icons and tool logos | `src/components/ui/icon.tsx` (Solar icons and SVG Logos, bundled offline) |

Anything written in `[square brackets]` in `content.ts` shows on the page as a dashed chip, a reminder to fill it in.

## Design tokens

Defined once in `src/index.css` and used as Tailwind classes:

- **Colours:** `cream`, `paper`, `ink`, `quiet`, `violet`, `plum`, `band`, `lavender`, `mist`, plus supporting tokens such as `chrome` (browser bar) and `code-*` (code sample). Use them as `bg-plum`, `text-violet` and so on.
- **Fonts:** `font-sans` (Geist) for headings and text, `font-serif` (Newsreader) for quotes, big numbers and the logo. Section headings use the `.display-head` class: first phrase light, second phrase bold.
- **Radii:** `rounded-tag` (small labels), `rounded-card` (cards, images, inputs), `rounded-sheet` (the large coloured sections). Buttons and the nav toggle are fully round.
- **Shadow:** `shadow-raised`, used only for the hero window and the mobile menu.

Canvas code can't read Tailwind classes, so the footer reads colours with `token("--color-band")` from `src/lib/theme.ts`. It throws a clear error if a token name is wrong.

## Shared building blocks (`src/components/ui`)

| Component | Use it for |
|---|---|
| `SectionHead` | Every section heading. `align="split"` (default), `"center"` for coloured sheets, `"stack"` for side columns. |
| `CheckList` | Lists of inclusions or results with check marks. |
| `TagList` | Scores and small facts. Square tags, so they never look like buttons. |
| `ButtonLink` / `Button` | All buttons. Variants: `primary`, `soft` (lavender, main actions), `ghost`. |
| `CompareSlider` | Before/after image comparison. |
| `SplitWords` | Headings that reveal word by word. Keeps the full text for screen readers. |
| `Fill` | Renders `[placeholder]` text as a dashed chip. |

## Motion

- GSAP drives the hero intro and heading reveals. Lenis is the only smooth-scroll engine (`src/lib/motion.ts`).
- Everything respects `prefers-reduced-motion`: smooth scrolling is off, and animated parts appear in their final state.

## Still to connect

- **Contact form:** it validates but doesn't send yet. Connect it to a form service (Formspree, Web3Forms) or a backend in `src/components/sections/contact.tsx`.
- **Bidfood:** its site announces it is closing (last orders 16 October). Remove it from `projects.ts` once it goes offline.
