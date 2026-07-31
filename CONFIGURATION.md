# Configuration Guide

The site is built around a **single source of truth** — `src/lib/site.config.ts`. To rebrand it for any university, club, personal portfolio, or commercial product, edit that file and ship. No component edits required.

> Reading this guide end-to-end takes ~10 min. After that you can fork the project, edit one file, and deploy in under 5 min.

---

## TL;DR

```ts
// src/lib/site.config.ts
export const hkust: SiteConfig = {
  key: 'stanford',
  name: '斯坦福大学',
  nameEn: 'Stanford University',
  shortCode: 'SU',
  theme: { blue: '#8C1515', gold: '#B83A4B', ... },
  navItems: [...],
  welcome: {...},
  academics: {...},
  ...
};
```

That's it. The variable name (`hkust`) doesn't have to match your university — what matters is the field values. If you want a cleaner name, rename `hkust` to your university's short identifier (e.g. `stanford`) — and remember to also update the `DEFAULT_SITE_CONFIG` export to point at it.

---

## Full configuration reference

### Top-level fields

| Field | Type | Description |
|---|---|---|
| `key` | `string` | Unique identifier for this build. Lowercase, no spaces. Becomes `data-site-key` on `<html>`. |
| `name` | `string` | Chinese / local display name. |
| `nameEn` | `string` | English display name (also becomes the page `<title>`). |
| `shortCode` | `string` | 1–3 letter tag shown in nav badge and favicon. E.g. `HK`, `CU`, `PKU`, `SU`. |
| `foundedYear` | `number` | Used to compute program/milestone timing. |
| `city` | `string` | Display city (e.g. `Hong Kong`, `Beijing`, `Stanford`). |
| `country` | `string` | Display country (e.g. `China`, `USA`). |
| `websiteUrl` | `string` | Official site link — referenced in the AI club banner & metas. |
| `tagline` | `string?` | Optional motto / one-liner shown on the welcome page. |
| `theme` | `ThemeTokens` | See below — drives the entire color palette. |
| `aiClub` | `AiClubConfig` | The AI-club scoped banner shown in the bottom-right. |
| `navItems` | `NavItemConfig[]` | Pages in the hub grid. |
| `welcome` | `WelcomeConfig` | Welcome page (greeting, dates, semester). |
| `academics` | `{ schools: SchoolConfig[] }` | Schools & programs. |
| `history` | `{ milestones: MilestoneConfig[] }` | Timeline. |
| `campus` | `{ buildings: BuildingConfig[] }` | Building cards. |
| `clubs` | `{ categories: ClubCategoryConfig[] }` | Clubs grouped by category. |
| `guide` | `{ sections: GuideSectionConfig[] }` | Sections of the orientation guide. |
| `apps` | `{ essential: AppConfig[] }` | Essential app cards. |
| `assets` | `VideoAssetConfig` | Optional paths to hero video / campus video / logo. |
| `socials` | `SocialConfig?` | Optional social handles. |

### `theme` — the color palette

```ts
theme: {
  blue: '#003366',           // primary deep brand color
  gold: '#996600',           // secondary accent
  gradient: {
    from: '#003366',         // gradient start
    to: '#1a4d7c',           // gradient end (used in buttons/cards)
  },
  lightBlue: '#4a7eb5',      // hover / light variant
  darkBlue: '#001a33',       // shadow / page background
  silver: '#C0C0C0',         // muted neutral
  highlightGold: '#d4a84b',  // one notch brighter than gold
}
```

These 6 hex values control **every** visual surface: nav, cards, gradients, glow effects, hero overlays, scrollbars, selection highlight. Customize them and you'll get a fresh identity immediately.

**Recipe**: pick the dominant brand color (→ `blue`), the accent (→ `gold`), then derive the rest:
- `gradient.to` = `blue` shifted ~30% lighter
- `lightBlue` = `blue` shifted ~50% lighter
- `darkBlue` = `blue` shifted 70% darker (for backgrounds)
- `highlightGold` = `gold` shifted 20% lighter
- `silver` can stay as `#C0C0C0` unless you want a different neutral

You can validate by typing into [coolors.co](https://coolors.co) and dropping the hex strings.

### `aiClub` — the floating banner

```ts
aiClub: {
  title: 'AI X SCI-FI CLUB',
  subtitle: 'PRESENT',
  description: '探索AI与科幻的交汇点 | 让创意无限延伸',
  tagline: '香港科技大学官方科技社团',
  websiteUrl: 'https://cyber-foundation-ten.vercel.app',
  foundedYear: 2023,
}
```

This is the floating bottom-right card. Tailor it for any affiliated club or organization. `websiteUrl` is optional — empty/null disables the external link and uses an internal route instead.

### `navItems` — the hub grid

```ts
navItems: [
  {
    id: 'welcome',
    title: '欢迎页',
    titleEn: 'Welcome',
    icon: 'Heart',
    description: '校长欢迎语与重要信息',
    href: '/content/welcome',
    color: '#003366',
    featured: true,  // optional — render larger
  },
  ...
]
```

- `icon` is a [Lucide](https://lucide.dev) icon name (PascalCase, no spaces). Available: `Heart`, `GraduationCap`, `Clock`, `Building2`, `Users`, `Zap`, `BookOpen`, `Smartphone`, `Compass`, `ClipboardList`, `Quote`, `MapPin`, `Radio`, `Building`, `Book`, `FlaskConical`.
- `href` should match the route under `/content/`. The site auto-creates the route folder; if you change it, ensure the page exists or it will 404.
- `color` is shown as the card's accent strip — pick a colour from your theme.

### `welcome` — welcome page content

```ts
welcome: {
  greeting: 'Welcome to HKUST',
  greetingZh: '欢迎来到香港科技大学',
  subtitle: 'Your Journey Begins Here',
  subtitleZh: '您的学术之旅由此开启',
  academicYear: '2026-2027',
  semesterDates: {
    term1: '2026年9月1日 - 2026年12月5日',
    term2: '2027年2月1日 - 2027年5月8日',
  },
  importantDates: [
    { date: '2026年8月25日', event: '新生Orientation Week开始', color: '#996600' },
    { date: '2026年9月1日',  event: '秋季学期正式开学',     color: '#003366' },
  ],
}
```

### `academics`, `history`, `campus`, `clubs`, `guide`, `apps`

All follow the same shape — an array of items with optional Chinese/English text. Edit the values; do not rename the keys.

```ts
academics: {
  schools: [
    { name: '工程学院', nameEn: 'School of Engineering', programs: ['计算机科学与工程', '电子与计算机工程'] },
    ...
  ]
}

history: {
  milestones: [
    { year: 1991, title: '创校', titleEn: 'Founded', description: '香港科技大学正式成立', color: '#003366' },
    ...
  ]
}

campus: {
  buildings: [
    { name: '学术楼', nameEn: 'Academic Building', description: '主教学楼...', icon: 'Building' },
    ...
  ]
}

clubs: {
  categories: [
    { name: '学术科技', clubs: [
      { name: 'AI X SCI-FI CLUB', nameEn: 'AI X SCI-FI CLUB', description: '探索AI与科幻的交汇点', highlight: true },
      ...
    ] },
    ...
  ]
}

guide: {
  sections: [
    { title: '行前准备', titleEn: 'Before Arrival', items: ['办理学生签证...', '预约宿舍...', ...] },
    ...
  ]
}

apps: {
  essential: [
    {
      name: 'Canvas',
      category: '学习',
      description: '课程管理、作业提交',
      platform: ['iOS', 'Android', 'Web'],
      icon: 'GraduationCap',
      color: '#E01F3D',
    },
    ...
  ]
}
```

---

## Recipe: fork for a new university

1. **Clone & install**

   ```bash
   git clone https://github.com/clarkwei-101/hkust-admission-letter.git my-uni
   cd my-uni
   npm install
   ```

2. **Replace HKUST-specific assets**

   In `public/`:

   - `landing-hero.mp4` — your university cinematic intro (or remove and the site will still work)
   - `landing-hero-audio.m4a` — optional soundtrack
   - `cyber-foundation-icon.png` — your club logo (referenced from `site.config.ts` `aiClub`)
   - `hkust-logo-official.png` — your official university logo

   In `src/components/HKUSTThreeMap/` — either:

   - Replace `hkustGeo.ts` and `hkustData.ts` with your own 3D campus coordinates, OR
   - Delete the component and remove references from `src/app/content/virtual-tour/page.tsx`

   In `src/components/LiveFeed/` and `src/app/api/hkust/*` — replace with your own scrape targets, or disable the live feed.

3. **Edit the config**

   Open `src/lib/site.config.ts`. Replace the entire `hkust` export with your university's data — see the field reference above. Optional: rename the variable from `hkust` to your university's short identifier, and update the `DEFAULT_SITE_CONFIG` export accordingly.

4. **Update i18n dictionaries**

   In `src/lib/i18n/en.ts` and `src/lib/i18n/zh.ts`, find any string that's still HKUST-flavoured (the two files have hundreds of strings — search for "HKUST"). Replace with your own copy. Many strings read from `site.config.ts` automatically, so this is usually limited to a handful of hardcoded sentences.

5. **Update metadata**

   In `src/app/layout.tsx`, the `<title>` and favicon are generated from `site.config.nameEn` / `shortCode`. Make sure your config's `shortCode` is what you want visible.

6. **Build & verify**

   ```bash
   npm run build
   npm run dev
   # open http://localhost:3000
   ```

7. **Deploy**

   Push to GitHub → import in Vercel → ship. **No environment variables required.**

---

## Recipe: add a new content page

If you want to add a page (e.g. `Scholarships`):

1. Create `src/app/content/scholarships/page.tsx` (copy an existing page as a template)
2. Add a `{ id: 'scholarships', title: '奖学金', titleEn: 'Scholarships', href: '/content/scholarships', icon: 'Award', description: '...', color: '#...' }` entry to `navItems` in `site.config.ts`
3. Add i18n strings to `src/lib/i18n/en.ts` and `src/lib/i18n/zh.ts` under the relevant namespace (e.g. `nav.scholarships`)

The hub grid will auto-include your new card.

---

## Troubleshooting

**The home page still shows HKUST after editing the config** — make sure you reloaded with cache disabled, or rebuilt with `npm run build && npm run start`. Browser cache plus Next.js's static asset cache can make CSS variables look stale in dev mode.

**Colors don't change after editing `theme`** — `ThemeRoot` writes CSS variables once on mount. If you hot-reloaded, open DevTools → Elements → `<html>` and confirm `--hkust-blue` has your new value. If yes and the page still looks wrong, hard-refresh (Cmd/Ctrl+Shift+R).

**Adding a new page 404s** — confirm that `src/app/content/<slug>/page.tsx` exists, that `navItems[].href` matches exactly (`/content/<slug>`, no trailing slash), and that you rebuilt.

**Build fails with TypeScript errors** — the strictest check is the `tsconfig.json` settings. Run `npm run build` to see all type errors at once. ESLint warnings are non-blocking unless you configure CI to fail on them.

**Vercel deploy returns 404 on all routes** — confirm `vercel.json` is committed at the project root with the `framework: "nextjs"` setting, and that SSO protection is disabled on the Vercel project.

---

## Schema source of truth

The TypeScript types in `src/lib/site.config.ts` are the actual schema. If a field is optional (`?`), it's optional. If it's required, don't omit it. Add new fields there first; the rest of the site follows.
