# steveweed.dev

Personal site of **Steve Weed** — builder & full-stack developer. A fast,
static-first Next.js site with two in-depth project case studies.

## Highlights

- **Home** — hero, about, work, stack, and contact, with scroll-reveal motion
  and scroll-spy navigation.
- **Case studies** — dedicated pages for [`/ktxz`](src/app/ktxz) (KTXZ Shop, a
  multi-game trading-card marketplace) and [`/foresight`](src/app/foresight)
  (Foresight, a domain-foresight verification engine).
- **Light & dark themes** — system-aware with a no-flash toggle, persisted to
  `localStorage`.
- **Accessible** — visible focus states, a skip link, WCAG-minded contrast, and
  full `prefers-reduced-motion` support.
- **Shareable & discoverable** — Open Graph / Twitter cards with a generated OG
  image, `Person` JSON-LD, `sitemap.xml`, and `robots.txt`.
- **Hardened** — security headers (HSTS, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`) via `next.config.js`.

## Stack

Next.js 16 (App Router) · React 18 · TypeScript · CSS custom properties ·
`next/font` (Syne + DM Mono) · `next/og`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx          # metadata, JSON-LD, theme bootstrap, skip link
│   ├── page.tsx            # home
│   ├── globals.css         # theme tokens + all component styles
│   ├── icon.svg            # favicon (SW/ mark)
│   ├── opengraph-image.tsx # generated social share image
│   ├── sitemap.ts / robots.ts
│   ├── ktxz/page.tsx       # KTXZ Shop case study
│   └── foresight/page.tsx  # Foresight case study
└── components/             # Nav, Hero, About, Projects, Skills, Contact,
                            # Footer, Badge, ThemeToggle, ScrollFX, CaseHeader
```

© 2026 Steve Weed.
