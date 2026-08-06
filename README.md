# Root Mobiles

Premium redesign of [rootmobiles.in](https://rootmobiles.in) — Root Mobiles is a mobile phone retail
and repair store in Gandhipuram, Coimbatore. This is a Next.js rebuild covering the full
buy/sell/repair/EMI customer journey with a dark, glassmorphic, gold-accented design system.

## Stack

- **Next.js 16** (App Router, Turbopack) + React 19 + TypeScript
- **Tailwind CSS v4** with a custom dark/gold design system (`src/app/globals.css`)
- **Radix UI primitives** hand-assembled in shadcn/ui style (`src/components/ui`) — the `shadcn` CLI
  registry (`ui.shadcn.com`) isn't reachable from this environment's network policy, so components were
  built directly from `@radix-ui/react-*` + `class-variance-authority` instead of `shadcn add`
- **Framer Motion**, **GSAP-ready**, **Lenis** smooth scroll, **React Three Fiber / drei** for the
  cinematic hero (desktop-only, lazy-loaded, skipped under `prefers-reduced-motion`)
- **Supabase** (`@supabase/ssr`) and **Cloudinary** clients, scaffolded but optional — see below
- Data currently comes from a local mock layer (`src/lib/data/*`), not a live backend

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
```

## Project structure

```
src/
  app/                 Routes (App Router) — home, /shop, /sell, /repair, /compare, /quiz, /emi, legal pages
  components/
    ui/                Radix-based primitives (button, card, dialog, accordion, ...)
    sections/           Homepage sections (hero, stats, services, testimonials, FAQ, ...)
    tools/              Interactive tools (trade-in estimator, repair booking/tracker, comparison, quiz)
    layout/             Header, footer, loading screen, WhatsApp FAB
    three/               React Three Fiber hero scene
    motion/              Reveal-on-scroll, magnetic buttons, animated counters
  lib/
    data/                Mock content: products, services, testimonials, FAQ, repair pricing, quiz logic
    supabase/            Client/server Supabase helpers + schema.sql (not yet connected)
    cloudinary.ts        Optimized delivery URL + unsigned upload helper (not yet connected)
    constants.ts          Real business info (address, phone, hours, WhatsApp)
```

## Connecting a real backend

The site runs fully on mock data today. To go live:

1. Copy `.env.example` to `.env.local` and fill in Supabase + Cloudinary credentials.
2. Run `src/lib/supabase/schema.sql` against your Supabase project.
3. Swap the mock data reads in `src/lib/data/*` for Supabase queries (the client/server helpers in
   `src/lib/supabase/` already handle the "not configured yet" fallback, so this can be done
   incrementally, page by page).

## Notes on scope

This redesign focuses on a fully designed, fully interactive frontend across the whole customer
journey (buy, sell/trade-in, repair booking + tracking, device comparison, an AI-style
recommendation quiz, EMI calculator). Backend persistence (Supabase), image hosting (Cloudinary),
and a fully interactive store-locator map are scaffolded with real integration code, but currently
run against local mock data / a keyless Google Maps embed until real credentials are provided.
