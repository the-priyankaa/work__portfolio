# Suman – portfolio landing page (Next.js 15, App Router, TypeScript)

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

## Assets
- `public/images/hero-suman.png` – waving character, background removed
- `public/images/about-suman.png` – blue-hoodie character (top part; the fade/dim is CSS)
- `public/images/logos/*` – client logos cut out of the design
