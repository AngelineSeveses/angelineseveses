# Angeline Seveses portfolio

React + TypeScript + Vite + Tailwind CSS v4, set up with the shadcn folder structure.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build for hosting

```bash
npm run build
```

The finished site is in `dist/`. Upload that folder to Vercel, Netlify or any static host.

## Where things live

| What | File |
|---|---|
| All text, projects, services, FAQ | `src/data/content.ts` |
| Brand colors, font, easing | `src/index.css` (the `@theme` block) |
| Project screenshots | `src/assets/projects/`, thumbnails in `src/assets/thumbs/` |
| Floating parallax component | `src/components/ui/parallax-floating.tsx` |
| Before/after slider | `src/components/ui/compare-slider.tsx` |
| Hero seam drag and spring | `src/hooks/use-seam.ts` |
| Page sections | `src/components/sections/` |

Anything written in `[square brackets]` in `content.ts` shows on the page as a dashed purple chip. Replace it with the real text and the chip disappears.

## Why `components/ui`

shadcn's CLI installs components into `src/components/ui`, and imports them with the `@/` alias (set in `vite.config.ts` and `tsconfig.json`). Keeping reusable building blocks there means future `npx shadcn@latest add <component>` commands drop straight in next to the existing ones.

## Still to connect

- The contact form shows a preview message only. Connect it to a form service (Formspree, Web3Forms) or your backend.
- The Download CV button needs a link to your CV PDF.
