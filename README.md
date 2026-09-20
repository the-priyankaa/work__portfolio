# Work Portfolio — Suman

A production-grade, single-page creative portfolio built with **Next.js 15/16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Framer Motion**. It recreates the dark, editorial look of the reference landing page (`LANDING PAGE.pdf`) — big display type, numbered sections, terracotta/teal accents on deep navy-to-indigo surfaces — with custom animations, a custom cursor, deep responsive behaviour and accessibility built in.

---

## Running the project

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start      # serves the static build on :3000
```

Quality gates:

```bash
npx tsc --noEmit   # type check
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm run build      # static export-friendly production build
```

---

## Project structure

```
work_portfolio/
├── app/
│   ├── layout.tsx          # fonts (Archivo/Inter/Instrument Serif), metadata, MotionConfig, custom cursor
│   ├── page.tsx            # page composition: skip-link, Navbar, 6 sections, Footer
│   └── globals.css         # Tailwind v4 theme tokens, editorials helpers, marquee/reveal CSS, .anim-mask
├── components/
│   ├── Navbar.tsx          # fixed nav + scrollspy + animated mobile menu
│   ├── Hero.tsx            # HI! I'M SUMAN · taglines · CTAs · tall 320vh scroll stage + top-right portrait
│   ├── ScrollAnim.tsx      # scroll-scrubbed background animation (VP9 video, progress → currentTime)
│   ├── About.tsx           # bio, keyword skills, animated stats (count-up)
│   ├── Services.tsx        # "I OFFER" — numbered editorial cards 01–04
│   ├── Projects.tsx        # "MY SHOWCASE" — category filter tabs + data-driven grid
│   ├── Clients.tsx         # "WHO GETS SERVED" — dual marquees of industries
│   ├── Contact.tsx         # social links, call/mail, mailto-backed form
│   ├── Footer.tsx          # keyword marquee + copyright + back-to-top
│   ├── CustomCursor.tsx    # desktop-only cursor dot + trailing ring ("VIEW" over projects)
│   └── ui/
│       ├── SectionHeading.tsx  # kicker + oversized display heading
│       ├── Reveal.tsx          # scroll-triggered fade/slide (reduced-motion aware)
│       ├── Marquee.tsx         # pure-CSS infinite marquee (aria-hidden duplicate)
│       └── CountUp.tsx         # animated number, triggers in view
├── data/
│   └── portfolio.ts        # ★ THE single configuration file — edit this to personalise
├── lib/
│   ├── motion.ts           # shared easing + animation variants
│   └── utils.ts            # tiny cn() class joiner
├── public/
│   ├── hero.png / hero.webp    # cutout portrait (top-right of the hero)
│   ├── animation/              # scroll-scrubbed background animation
│   │   ├── scroll-anim.webm    # 165-frame sequence encoded to VP9 (~667 KB)
│   │   └── scroll-poster.jpg   # representative static frame (first paint / fallback)
│   └── projects/*.svg          # 7 placeholder artworks (swap for real project images)
└── asset/                 # (git-ignored) raw source frames + artwork — NOT deployed
    ├── bac_animation/frame_*.png   # the 165-frame image sequence (1280×720, ~92 MB)
    └── hero.png                    # original portrait cutout
```

## Technologies — and why

| Tech | Why |
| --- | --- |
| **Next.js 16 (App Router)** | Static prerendering by default, route-less single page, `next/font` self-hosts the display type, zero config for the level of polish required. |
| **React 19 + TypeScript** | Strict typing catches mistakes at build time; `satisfies` keeps the config data honest. |
| **Tailwind CSS v4** | Design tokens live in one `@theme` block; utilities map 1:1 to the PDF palette; no unused CSS. |
| **Framer Motion** | The single, genuinely-useful animation dependency: masked hero reveals, scroll-scrubbed animation progress (`useScroll` → `useMotionValueEvent`), parallax, scroll-triggered stagger, springs for the custom cursor, and `<MotionConfig reducedMotion="user">` for first-class reduced-motion support. Everything else is CSS. |
| **No other runtime deps** | No UI kit, no icon library (icons are inline SVG), no CLI helpers — keeps the bundle small and fast. |
| **ffmpeg (build-time only)** | Converts the 165-frame PNG sequence in `asset/` into a scrub-friendly **VP9 WebM** (`-g 6` frequent keyframes) — ~667 KB instead of 92 MB. The raw frames are git-ignored; only compressed derivatives deploy. |

## Scroll-scrubbed hero background

The hero is a **320vh scroll stage**: content and the portrait pin on a sticky
full-viewport stage (`ScrollAnim`) while the 165-frame doodle animation plays in
sync with the scroll — `useScroll` progress maps to `video.currentTime`. Design details:

- The animation is kept to the **right half** of the hero (`.anim-mask` fade on its left edge) so it never washes out the readable text column; it renders via `mix-blend-mode: screen` at 50 % so the butter-coloured line art reads as a growing pale panel behind the portrait.
- `prefers-reduced-motion` → the video simply never seeks (static poster frame). No hydration mismatch (the element type never changes).
- Decorative layer is `aria-hidden` + `pointer-events-none`; mobile (<768px) hides it entirely.

Regenerate the animation after changing frames in `asset/bac_animation/`:

```bash
ffmpeg -y -framerate 24 -i asset/bac_animation/frame_%03d.png -c:v libvpx-vp9 -b:v 0 -crf 35 -g 6 -pix_fmt yuv420p -row-mt 1 -an public/animation/scroll-anim.webm
ffmpeg -y -i asset/bac_animation/frame_082.png -frames:v 1 -vf scale=800:-1 -q:v 3 public/animation/scroll-poster.jpg
magick asset/hero.png -strip -quality 82 public/hero.webp
```

## Personalising (the only file you need to touch)

Everything — name, bio, services, projects, clients, social links, contact details — lives in **`data/portfolio.ts`**.

```ts
contact: {
  email: "hello@yourname.com",   // ← replace
  phone: "+91 00000 00000",      // ← replace
},
social: {
  instagram: "https://instagram.com/yourhandle", // ← replace, etc.
  linkedin: "…", github: "…", facebook: "…",
}
```

Projects come from the typed `projects` array — `{ title, category, image, description, year }`. Drop real images into `public/projects/` (or any URL) and update the `image` field; the grid and filters update themselves. The 7 bundled SVGs are deliberate placeholder artwork in the site's palette.

Hero extras are config-driven too, in `portfolio.hero`:

```ts
hero: {
  name: "SUMAN",
  image: "/hero.png",      // ← swap with your portrait (cutout PNG)
  imageWebp: "/hero.webp", // ← compressed copy served to modern browsers
  imageAlt: "Portrait of Suman",
},
```

## Design system

- **Palette** (sampled from the reference): `#0E1031` navy · `#2C1E4D` violet · `#191647` indigo · `#2F3164` mid · `#CFCBE5` cream · `#9494AE` muted · `#B25043` terracotta · `#276A8D` teal.
- **Type**: Archivo (display, heavy), Inter (body), Instrument Serif italic (accents).
- **Language**: numbered sections (SERVICES 01–04, category tabs 01–03), outlined (stroke) display words, ruled kickers, marquee strips — editorial, not template-y.
- **Motion**: masked line reveals, word-stagger intro, parallax ghost name, scroll triggers, count-ups. All non-essential motion is disabled for `prefers-reduced-motion`, and `overflow-x: clip` guarantees no horizontal scroll.

## QA summary

Automated checks (headless Chromium, Playwright — scripts kept in `/tmp`, not in the repo):

| Check | Result |
| --- | --- |
| Viewport sweep 1920 / 1440 / 1280 / 1024 / 768 / 480 / 375 | no horizontal overflow, no console errors at any width |
| Scroll animation | `/animation/scroll-anim.webm` serves `200 video/webm` (668 KB); scrub is monotonic at every width (e.g. 60 % scroll → `currentTime ≈ 4.0–4.1 of 6.875 s`); video stays `paused`, poster shown before load |
| Hero portrait | served as `/hero.webp` (108 KB) + `/hero.png` fallback; visible at ≥1024 px, hidden below; `fetchPriority=high` |
| `prefers-reduced-motion` + animation | video present but **never seeks** (static poster), no hydration mismatch |
| All anchors resolve to real section ids | ✔ (0 broken) |
| Heading hierarchy | 1×H1, section H2s, card H3s — correct order |
| Images | all 7 serve `200 image/svg+xml`, load lazily, correct `alt` |
| Mobile menu (375px) | full-screen overlay, body scroll lock, Escape/click closes, in-menu anchor nav works |
| Project filters | tab filtering re-renders the grid correctly |
| Contact form | submit fires, React handler runs without errors, builds `mailto:` with encoded subject/body (external-protocol handoff can't be observed inside headless by design) |
| `prefers-reduced-motion` | marquee/scroll-line CSS animations disabled, framer animation honoured via `MotionConfig`, **no hydration mismatch** (fixed: was rendering different DOM per motion preference) |
| Touch devices | custom cursor not rendered; mobile menu present |
| First load | ≈1.1 MB transferred, 16 requests, ~1.2 s load event (includes the 668 KB scroll-animation WebM prefetched eagerly so scrubbing starts instantly; everything else unchanged) |
| Contrast | body `#CFCBE5`/`#9494AE` text passes AA on all section backgrounds; small terracotta accent text uses the AA-sufficient `--color-terra-light` |

## Accessibility

Skip-to-content link, semantic sections with `aria-labelledby`, `aria-current` nav, `aria-expanded`/`aria-controls` mobile menu, labelled form fields, `:focus-visible` ring, alt text on all images, `prefers-reduced-motion` handling, keyboard-operable filters, and `overflow-x: clip` with scroll-margin for anchor targets.