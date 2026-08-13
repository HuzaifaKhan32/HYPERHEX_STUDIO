# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HyperHex marketing website - a 3D modeling/design studio site with creative-direction references from Framer template-style agency sites (agencux, agenzo, portx, agencia).

## Commands

```bash
npm run dev      # Start local dev server
npm run build    # Production build
npm run lint     # Lint check
```

## Stack & Architecture

- **Next.js (App Router)** + TypeScript - Server Components by default
- **Tailwind CSS** - utility-first, no CSS modules unless genuinely needed
- **Framer Motion** - animation library (see Animation section)
- **Fonts**: Zalando Sans Expanded (display/headlines, weights 800/900) + DM Sans (body/nav)

### Component Structure

```
app/
  layout.tsx      # Font setup, metadata, global shell
  page.tsx        # Section composition
  globals.css     # Tailwind directives + CSS variable tokens
components/
  Navbar.tsx
  Hero.tsx
  ImageCarousel.tsx  # Client component - interactive carousel
public/
  images/          # Project renders and assets
```

**Server vs Client Components**: Only mark files `'use client'` when they require interactivity or state. Don't reach for client components by default - the carousel needs it for click handlers, but most sections should remain server components.

## Brand Design System

### Color Tokens (sampled from logo assets)

Variables defined in `globals.css`:
- `--color-void: #000000` - true black, logo background
- `--color-ink: #0a0a0a` - page backgrounds
- `--color-paper: #ffffff` - primary text
- `--color-mist: #9a9fa5` - secondary/muted text
- `--color-accent: #15b6e8` - cyan from logo facet (use sparingly for CTAs/active states)
- `--color-accent-dim: #0c86ac` - accent hover/pressed state

### Typography

- **Display**: Zalando Sans Expanded, weight 800-900, uppercase, tight leading (~0.9) - headlines/section titles only
- **Body**: DM Sans, weight 400/500 - paragraph copy, nav, buttons
- **Labels/Eyebrows**: DM Sans 500, small size, wide letter-spacing, uppercase

Both fonts wired as CSS variables in `app/layout.tsx` via `next/font/google`.

### Signature Design Element: Faceted Corners

The hexagon logo uses angled facets, not curves. Apply notched corners (45° cuts via `clip-path`) to carousel frame and project cards - not every element. Pills/buttons stay `rounded-full` for intentional contrast.

**Radius scale**: Large panels `rounded-[2.5rem]`, pills/buttons `rounded-full`.

### Logo Usage

Asset: `public/images/logo/hyperhex-logo-H.png` - cyan facet baked in. Only place on `--color-void` or `--color-ink` backgrounds. Don't recolor.

## Animation Strategy (Framer Motion)

**Intensity: moderate** - one or two signature animated moments per section, not every element.

Use `LazyMotion` + `domAnimation` where possible for bundle size. Full `motion` import only for gesture/drag features.

### Animation Types

- **Scroll-triggered reveals**: Section headlines/key blocks fade/slide in once via `whileInView` - don't re-trigger on scroll-up
- **Hover micro-interactions**: Buttons, nav links, cards - small scale/opacity shifts
- **Page transitions**: One consistent transition via `AnimatePresence` in layout
- **Ambient loops**: Reserved for later sections (marquee, tickers) - not hero

### Animation Rules

- Always respect `prefers-reduced-motion` - provide reduced/no-motion fallback
- Animate `transform`/`opacity` only - never `width`/`height`/`top`/`left` (causes layout shift)
- Never animate away keyboard/focus states

## Images

Use `next/image` with `fill` + explicit `sizes` attribute for project renders. Don't use plain `<img>` tags.

Real project images will be provided by client and placed in `public/images/`.

## Development Principles

- **Minimal client components**: Default to Server Components, only use `'use client'` when actually needed for interactivity
- **No over-engineering**: Build what's requested, not speculative features. Three similar lines > premature abstraction
- **No backwards-compatibility hacks**: Delete unused code completely, don't rename or comment it out
- **Tailwind-first**: Use utility classes, avoid CSS modules unless genuinely necessary
