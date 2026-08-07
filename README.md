# Meet Your Match — Landing Page

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.
Investor/user-facing landing page for the Meet Your Match dating app, built entirely on
structured mock data (`lib/mock-data.ts`) to simulate a real product without a backend.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. An internet connection is required on first run so
`next/font/google` can fetch Fraunces, Manrope, and IBM Plex Mono.

## Structure

- `app/layout.tsx` — fonts + metadata
- `app/page.tsx` — assembles all sections
- `components/*` — one component per section (hero, features, pricing, etc.)
- `lib/mock-data.ts` — all mock content: live activity feed, features, metrics,
  testimonials, market sizing, revenue split, pricing plans

## Build

```bash
npm run build
npm run start
```
