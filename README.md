# Suman – portfolio landing page (Next.js 16, App Router, TypeScript)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit things
- Text, links, phone, email, clients, service labels → `lib/data.ts`
- Showcase media (images/videos in the black slots) → `SHOWCASE` in `lib/data.ts`
- "I Offer" pill backgrounds → replace the placeholder SVGs in `public/images/offer/`
  (or point to your own JPG/WebP in `lib/data.ts`)
- Colours / spacing → CSS variables and sections in `app/globals.css`
- Background animation strength → `.scroll-anim { opacity }` in `app/globals.css`
- How far the background animation plays → `RANGE_VH` in `components/ScrollAnimation.tsx`
- Background animation frames → `npm run anim` (see below)
- Fonts: Poppins + Anton via `@fontsource` (no network call at build time)

## Contact form
The form posts to [Web3Forms](https://web3forms.com) so messages land in
`chitrokoralok@gmail.com`. One-time setup:
1. Visit web3forms.com, enter your email and copy the access key.
2. `cp .env.local.example .env.local` and paste the key into
   `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`.
3. Restart `npm run dev` / rebuild.
Until a key is set, the form falls back to opening the visitor's mail app
(addressed to your Gmail).

## Background animation
The scroll-driven background is a frame sequence painted onto a `<canvas>` by
`components/ScrollAnimation.tsx`. Scroll progress maps to frame index across the
first `RANGE_VH` (1.5) screens only; past that the final frame is held, so the
artwork never sits behind body copy for the rest of the page. It is decorative:
`aria-hidden`, `pointer-events: none`, and with reduced motion it draws a single
static frame, decodes no others, and never attaches a scroll listener.

The raw export (`assste/animation/*.png`, 235 frames, 69 MB) is **not committed**
and **not deployed** — see `.gitignore`. The shipped files in `public/anim/` are
generated:

```bash
npm run anim                      # every 3rd frame, 1280px wide, quality 72
node scripts/build-animation.mjs --stride 2 --width 960 --quality 70
node scripts/build-animation.mjs --dry-run
```

Output: 79 WebP frames (1280×720, alpha preserved) + `manifest.json`, ~2.5 MB.
The component reads the manifest, so frame count and dimensions are not
hard-coded anywhere. Requires `ffmpeg` and `ffprobe` on `PATH`; the script fails
with a clear message if either is missing or if the source frames are absent.

The source export is 1280×720, so 1280 is the resolution ceiling — going wider
only upscales. Frame count is cheap to cut because the sequence is scroll-scrubbed
rather than played at a fixed rate, so the bytes go on resolution instead.

Three things worth knowing if you touch this:
- **Video was ruled out.** The artwork is transparent and sits over the page
  gradient. WebM/MP4 alpha is unusable here — Safari has no WebM alpha at all,
  and `libvpx-vp9` silently drops the channel (transparent pixels decode as
  opaque grey). The build script asserts alpha survived and prints `*** LOST ***`
  if not.
- **Frame order needs zero-padding.** `ffmpeg -pattern_type glob` sorts
  lexicographically (`1, 10, 100, 101…`), which would scramble the animation.
  The script stages zero-padded symlinks to force numeric order.
- **Frames load nearest-to-target, not in order.** Whichever frame the visitor is
  actually looking at is claimed first, `CONCURRENCY` at a time. At the top of
  the page that is frame 0, so the order comes out ascending anyway; on a deep
  link to `#contact` the target is the last frame, so the *end* of the sequence
  loads instead of frames 0–23. Once well past the intro, loading stops — the
  held frame is the last one and nothing else will ever be painted. A missing
  frame falls back to the nearest decoded one, so a gap degrades to a static
  frame rather than a blank canvas.

Rebuild the frames after changing the source art, tune the visual strength with
the `opacity` on `.scroll-anim` in `app/globals.css`, and tune how long it plays
with `RANGE_VH` in `components/ScrollAnimation.tsx`.

## Assets
- `public/anim/` – generated background frames (do not edit by hand)
- `public/images/about-suman.png` – blue-hoodie character (top part; the fade/dim is CSS)
- `public/images/logos/*` – client logos cut out of the design
- `public/images/offer/*` – placeholder art behind the "I Offer" pills
