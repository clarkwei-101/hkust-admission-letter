# HKUST Admission Letter · Open Source Template

> A cinematic, fully open-source, customisable digital admission-letter experience — built for HKUST students, by HKUST students. Fork it and turn it into the admission page for **any** university.

[Live Demo · HKUST](https://hkust-admission-letter.vercel.app) · [Template Preview](https://hkust-admission-letter.vercel.app/preview) · [Fork on GitHub](https://github.com/clarkwei-101/hkust-admission-letter)

---

## Why this exists

Every university has a powerful story to tell. Most don't have the engineering bandwidth to deliver it the way a Netflix-grade landing experience should. This template gives any student or developer a production-grade starting point:

- **Cinematic intro** — full-bleed video, audio-driven opening, envelope animation
- **11+ content pages** — welcome, academics, history, campus, clubs, guide, apps, resources, checklist, testimonials, virtual tour, live campus, AI club
- **Two languages** — full English / 中文 i18n
- **Live preview switcher** — flip between HKUST / CUHK / HKU / PKU / your own DIY preset without rebuilding
- **AI-club scoped** — designed for "Cyber Foundation"-style student groups to embed inside any university's site
- **Production deployed** — runs on Vercel with continuous GitHub deploys

---

## 30-second quickstart

```bash
git clone https://github.com/clarkwei-101/hkust-admission-letter.git my-uni-admission
cd my-uni-admission
npm install
npm run dev
# open http://localhost:3000
```

That's it. The site will run as the HKUST default. To rebrand for another university, open [CONFIGURATION.md](./CONFIGURATION.md) and follow the recipe.

---

## Two ways to use this template

### A) "I want to rebrand it for my university / club / personal story"

Edit **one** file:

```ts
// src/lib/site.config.ts
export const hkust: SiteConfig = { key: '...', name: '...', theme: {...}, ... }
```

Replace colors, content, nav, milestones, club list, app list. Push to GitHub, deploy with Vercel. Done.

### B) "I want it to be a multi-university live showcase"

This is what the live demo does. Edit the existing presets:

- `src/lib/site-configs/hkust.ts` — HKUST identity
- `src/lib/site-configs/cuhk.ts` — CUHK identity
- `src/lib/site-configs/hku.ts` — HKU identity
- `src/lib/site-configs/pku.ts` — PKU identity
- `src/lib/site-configs/personal.ts` — DIY / personal template

Or add your own:

```ts
// src/lib/site-configs/stanford.ts
import type { SiteConfig } from '../site.config';
const stanford: SiteConfig = {
  key: 'stanford',
  name: '斯坦福大学',
  nameEn: 'Stanford University',
  shortCode: 'SU',
  foundedYear: 1885,
  city: 'Stanford',
  country: 'USA',
  websiteUrl: 'https://stanford.edu',
  theme: { blue: '#8C1515', gold: '#B83A4B', ... },
  // ... see hkust.ts for the full schema
};
export default stanford;
```

Then register it in `src/lib/site-configs/index.ts` and `src/lib/site.config.ts#PRESET_KEYS`. Anyone hitting your `/preview` route can flip between them with one click.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static export capable, edge-ready, RSC support |
| Language | TypeScript 5 | strict mode on |
| UI | React 19 + Framer Motion 12 | smooth, declarative animations |
| 3D | Three.js + React Three Fiber | for the campus map |
| Animation | GSAP 3 | for the seal/envelope micro-interactions |
| Styling | Tailwind v4 + CSS variables | for the theme-token swap |
| Lint | ESLint (Next.js preset) | shipped with create-next-app |
| Deploy | Vercel | first-class Next.js integration |

---

## File map (the parts you should care about)

```
src/
├── lib/
│   ├── site.config.ts          ← THE single source of truth (HKUST default)
│   ├── site-configs/           ← alternate preset identities
│   │   ├── cuhk.ts
│   │   ├── hku.ts
│   │   ├── pku.ts
│   │   └── personal.ts
│   ├── university/             ← runtime preset switching
│   │   └── UniversityProvider.tsx
│   ├── i18n/                   ← English / 中文 dictionaries
│   ├── personalisation/        ← remembers user's chosen name across pages
│   ├── constants.ts            ← DEPRECATED — re-export of site.config for back-compat
│   └── animations.ts
├── components/
│   ├── ThemeRoot/              ← injects theme tokens as CSS vars
│   ├── Navigation/             ← header, driven by config
│   ├── AIClubBanner/           ← the floating "AI X SCI-FI Club" card
│   ├── Envelope/               ← envelope opening animation
│   ├── HKUSTThreeMap/          ← ⚠️ HKUST-specific campus map (fork-replace)
│   ├── LiveFeed/               ← ⚠️ HKUST-specific API (fork-replace)
│   └── ...
└── app/
    ├── page.tsx                ← home (envelope + intro video)
    ├── hub/                    ← 11-page grid (drives nav config)
    ├── preview/                ← the live preset switcher
    └── content/[page]/         ← one folder per content page
```

Anything tagged with ⚠️ is **HKUST-specific** and should be deleted or replaced by forks.

---

## Live preview demo

The `/preview` route is itself a marketing surface. It lets visitors:

- Click any preset card to switch the entire site
- Copy a shareable URL like `?preset=cuhk` that opens directly into that university
- Read a 5-step "how to customise" recipe

The preset switch is stored in `localStorage` under the key `site-preset-key` and a full URL reload is triggered to make sure server-rendered HTML (which can only know the default) catches up with client-side CSS variables.

---

## Deployment

### One-click on Vercel

1. Push the repo to GitHub (fork or your own)
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo
3. Vercel detects Next.js automatically — **important**: ensure `vercel.json` is at the project root (it ships in this repo):
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "framework": "nextjs"
   }
   ```
4. Deploy

### Manual preview → prod workflow

This repo follows the **test-serve → promote** discipline:

```bash
git checkout -b feature/your-changes
# make edits
git push origin feature/your-changes
# Vercel auto-deploys to a preview URL like https://hkust-admission-letter-git-feature-xxx.vercel.app
# test on the preview URL
npx vercel --prod --yes  # promote to production
```

---

## Open-source licensing

MIT — see [LICENSE](./LICENSE). Use it for anything: personal portfolios, university admissions, club sites, commercial products. Attribution is appreciated but not required.

If you ship something based on this, we'd love to hear about it. Drop a message in the [GitHub Discussions](https://github.com/clarkwei-101/hkust-admission-letter/discussions).

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). TL;DR:
- Open an issue before opening a large PR
- Run `npm run build` to verify the full project (lint included by default)
- Keep edits scoped — one feature per PR

---

## Credits

- Architecture & engineering: Clark Wei ([clarkwei-101](https://github.com/clarkwei-101))
- Built with the Cyber Foundation ([cyber-foundation-ten.vercel.app](https://cyber-foundation-ten.vercel.app)) open-source community
- HKUST students of the AI × SCI-FI Club

Inspired by the digital admission letters from MIT / Stanford / Tsinghua / Peking University, built for HKUST by HKUST students.

---

## See also

- [CONFIGURATION.md](./CONFIGURATION.md) — every config field, what it does, and how to fork it
- [CONTRIBUTING.md](./CONTRIBUTING.md) — contribution workflow
- [Cyber Foundation](https://cyber-foundation-ten.vercel.app) — the AI × SCI-FI Club behind this project
- [HKUST official site](https://hkust.edu.hk)
