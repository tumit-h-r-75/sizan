# Sizan — Business Development Portfolio

A single-page portfolio for Md. Soykat Hasan Sizan, Business Development Executive at Exprovia. Built with React, TypeScript, Vite, and [React Bits](https://reactbits.dev/) components, with a minimal dark design built around Sizan's portrait.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Local URL printed by Vite. The project uses port 3000. No API key is required.

```powershell
npm.cmd run build
node scripts/verify-portfolio.mjs
```

The browser verification uses installed Microsoft Edge and a running local server. It checks desktop/mobile layouts, reduced motion, the portrait and animations, career disclosures, the process stepper, the WhatsApp and LinkedIn links, and the project-brief flow. Screenshots are written to the ignored `.qa/` directory. Set `PORTFOLIO_URL` to test another local URL.

## Content and customization

- `data/profile.ts`: the single source for all content. Each fact appears once on the page.
- `components/portfolio/`: the page (`Portfolio.tsx`), header and shared pieces (`Chrome.tsx`), and the contact section with the project-brief dialog (`ContactSection.tsx`).
- `src/portfolio.css`: visual system (colour tokens at the top, taken from the portrait's navy and green), responsive layouts, and the reduced-motion rules.
- `components/react-bits/`: the React Bits components in use, with the license and a list of what each is used for (`README.md`).
- `public/images/`: the portrait as optimised WebP (`sizan-portrait.webp`, 800 px, and `sizan-avatar.webp`, 160 px). The original PNG is in `src/shims/`.
- `index.html`: metadata and fonts.

Employment and education in the existing data file were confirmed by the user on 2026-10-11. Exprovia's company figures are presented separately from personal achievements, with a link to the supplied Abdur Rakib reference. Do not add personal client counts, endorsements, or degrees without confirmation.

WhatsApp (`DATA.whatsapp`) and LinkedIn are the contact channels. The project-brief form creates a preview on the visitor's device, then opens WhatsApp with the brief pre-filled, or lets them copy it for LinkedIn. It does not send or store anything itself.

The portrait is set in `DATA.avatarUrl` and `DATA.avatarThumbUrl`. To replace it, export a square image to `public/images/` and update those paths. All motion respects the visitor's reduced-motion setting.
