# HKUST Admission Letter · Open Source Template

> A cinematic, fully open-source, customisable digital admission-letter experience — built for HKUST students, by HKUST students. Fork it and turn it into the admission page for **any** university.

[Live Demo · HKUST](https://hkust-admission-letter.vercel.app) · [Fork on GitHub](https://github.com/clarkwei-101/hkust-admission-letter)

---

## Why this exists

Every university has a powerful story to tell. Most don't have the engineering bandwidth to deliver it the way a Netflix-grade landing experience should. This template gives any student or developer a production-grade starting point:

- **Cinematic intro** — full-bleed video, audio-driven opening, envelope animation
- **13 content pages** — welcome, academics, history, campus, clubs, guide, apps, resources, checklist, testimonials, virtual tour, live campus, AI club, news
- **Two languages** — full English / 中文 i18n
- **Config-driven** — every piece of copy, branding, color, accent, club list, app list, building, and milestone lives in one file: `src/lib/site.config.ts`
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

That's it. The site will run as the HKUST default. To rebrand for another university, open [CONFIGURATION.md](./CONFIGURATION.md) and follow the **Fork Checklist** at the bottom of this README.

---

## How to fork it for your university / club / personal story

**One file does it all** — `src/lib/site.config.ts`. Replace colors, content, nav, milestones, club list, app list. Push to GitHub, deploy with Vercel. Done.

For a step-by-step recipe, see [CONFIGURATION.md](./CONFIGURATION.md).

If you want to **drop the HKUST-specific visual chrome entirely** (3D map, campus bus API, video assets) and rebrand cleanly, also walk through the **Fork Checklist** below — it lists every HKUST-specific file you should replace or delete.

---

## Fork Checklist

Before you ship your fork, work through this list. ✅ items are HKUST-specific — replace or delete them; the rest of the project should already work after editing `site.config.ts`.

### 🔴 Required — replace to remove "HKUST" from the UI

| # | File | What to do |
|---|---|---|
| 1 | `src/lib/site.config.ts` | Replace every value: `name`, `nameEn`, `shortCode`, `city`, `country`, `websiteUrl`, `foundedYear`, `theme`, `aiClub`, `navItems`, `welcome`, `academics`, `history`, `campus`, `clubs`, `guide`, `apps`, `socials`. Search for `"HKUST"` / `"香港科技大学"` and replace. |
| 2 | `src/lib/i18n/en.ts` | Search `HKUST` / `Hong Kong University of Science and Technology` and replace. There are ~hundreds of strings — use your editor's project-wide search. |
| 3 | `src/lib/i18n/zh.ts` | Same as above for Chinese copy. |
| 4 | `src/app/hub/page.tsx` | Page-level titles and taglines still mention HKUST explicitly. |
| 5 | `src/app/page.tsx` | Name-input welcome page. References HKUST by name in several places. |
| 6 | `src/app/content/welcome/page.tsx` | President's welcome letter — write your own copy. |
| 7 | `src/app/content/news/page.tsx` | News feed — replace with your own items or delete the page. |
| 8 | `src/app/content/clubs/page.tsx` | Club cards. |
| 9 | `src/app/content/testimonials/page.tsx` | Student testimonials — replace with real (or placeholder) voices. |
| 10 | `src/app/content/campus/page.tsx` | Building cards. |
| 11 | `src/app/content/campus-live/page.tsx` | Live shuttle/metro data — replace API endpoint or disable. |
| 12 | `src/app/content/virtual-tour/page.tsx` | 3D campus map entry. Falls back gracefully if `HKUSTThreeMap` is removed. |

### 🟡 Optional — remove HKUST-specific components

| # | Path | Notes |
|---|---|---|
| 13 | `src/components/HKUSTThreeMap/` | Delete the whole folder to disable 3D campus map. Then strip the import from `src/app/content/virtual-tour/page.tsx`. |
| 14 | `src/components/LiveFeed/` | Real-time shuttle/metro data from a HKUST-specific scrape. Delete and remove the import from `src/app/content/campus-live/page.tsx`. |
| 15 | `src/lib/hkust-map/` | Companion data files for the 3D map. Delete alongside #13. |
| 16 | `src/app/api/hkust/` | Backend API routes serving HKUST-specific data. Delete if you don't need them. |

### 🟢 Optional — replace media assets

| # | File | Notes |
|---|---|---|
| 17 | `public/landing-hero.mp4` | Cinematic intro video. Replace with your own or leave empty (site still works). |
| 18 | `public/landing-hero-audio.m4a` | Optional soundtrack. |
| 19 | `public/admission-celebration.mp4` | Letter-opening celebration loop. |
| 20 | `public/admission-applause.mp3` / `.wav` | Audio cues. |
| 21 | `public/hkust-campus-tour.mp4` | Campus aerial footage. |
| 22 | `public/hkust-logo-official.png` | Replace with your university's logo. |
| 23 | `public/ai-club-icon.png` | Replace with your club / society logo (or delete). |
| 24 | `public/cyber-foundation-icon.png` | AI club logo referenced from `site.config.ts` `aiClub`. |
| 25 | `public/hkust-data/` | JSON data backing the 3D map. Delete if you removed #13. |
| 26 | `public/textures/` | 3D map textures. Delete alongside #13. |

### ⚙️ Config tweaks (recommended)

| # | What | Why |
|---|---|---|
| 27 | `package.json` → `name`, `description`, `repository` | Rename from `hkust-admission-letter` to your fork's name. |
| 28 | `vercel.json` | Already correct — keep as-is for Vercel detection. |

> 💡 Once all 🔴 items are replaced, your fork should pass `npm run build` and be ready to deploy. The 🟡 and 🟢 items are only needed if you also want to gut the HKUST-specific 3D map, live data, and video assets.

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
│   ├── site.config.ts          ← THE single source of truth — edit this to rebrand
│   ├── site-configs/           ← convenience re-exports (no presets in this build)
│   │   └── index.ts
│   ├── university/             ← thin context wrapper around site.config.ts
│   │   └── UniversityProvider.tsx
│   ├── i18n/                   ← English / 中文 dictionaries (en.ts, zh.ts)
│   ├── personalisation/        ← remembers user's chosen name across pages
│   ├── constants.ts            ← legacy re-exports of site.config (back-compat)
│   └── animations.ts
├── components/
│   ├── ThemeRoot/              ← injects theme tokens as CSS vars on mount
│   ├── Navigation/             ← header, driven by config
│   ├── AIClubBanner/           ← the floating "AI X SCI-FI Club" card
│   ├── Envelope/               ← envelope opening animation
│   ├── HKUSTThreeMap/          ← ⚠️ HKUST-specific 3D campus map (replace/delete)
│   ├── LiveFeed/               ← ⚠️ HKUST-specific API client (replace/delete)
│   └── ...
└── app/
    ├── page.tsx                ← home (envelope + intro video)
    ├── hub/                    ← 13-page grid (drives nav config)
    └── content/[page]/         ← one folder per content page
```

Anything tagged with ⚠️ is **HKUST-specific** — see the **Fork Checklist** above.

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

> No environment variables are required — `npm run build` and Vercel both work with zero secrets. All configuration lives in `site.config.ts`.

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
