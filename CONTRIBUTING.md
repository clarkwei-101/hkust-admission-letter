# Contributing

Thanks for your interest in improving the HKUST Admission Letter template! Here's how to get involved.

---

## Before you start

1. **Open an issue first** for any non-trivial change. We use issues to discuss scope, design decisions, and naming before any code is written. This avoids wasted PRs that go in a different direction.
2. **Join the discussion**: [GitHub Discussions](https://github.com/clarkwei-101/hkust-admission-letter/discussions) for open-ended brainstorming.
3. **Read [CONFIGURATION.md](./CONFIGURATION.md)** so you understand what the code actually does.

---

## Development setup

```bash
git clone https://github.com/clarkwei-101/hkust-admission-letter.git
cd hkust-admission-letter
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

If 3000 is occupied, Next.js will pick another port. Check the terminal output.

### Useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Hot-reload dev server |
| `npm run build` | Production build (Turbopack) |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint with Next.js preset |

---

## Workflow

1. Create a feature branch:
   ```bash
   git checkout -b feature/short-slug
   # or: fix/short-slug
   ```
2. Make scoped changes. Try to keep PRs to one feature / fix.
3. Run `npm run build` before pushing — this runs lint + typecheck.
4. Push and open a PR:
   ```bash
   git push origin feature/short-slug
   gh pr create --title "..." --body "..."
   ```

### PR title conventions

- `feat(scope): ...` — new feature
- `fix(scope): ...` — bug fix
- `refactor(scope): ...` — code restructuring without behavior change
- `docs(...): ...` — documentation only
- `chore(...): ...` — tooling, deps, etc.

`scope` should match the area: `envelope`, `nav`, `i18n`, `site-config`, etc.

---

## Coding conventions

- **TypeScript strict mode** — no `any`, no `// @ts-ignore` unless absolutely necessary
- **Server vs client components** — keep server components by default; add `'use client'` only when you need state, effects, or DOM access
- **No emoji in UI** — only SVG icons (Lucide is great)
- **Hydration safety** — never call `Math.random()`, `Date.now()`, or browser-only APIs during render. Use `useEffect` or `useState` with `mounted` flag.
- **No invented stats** — don't fabricate user counts, ratings, or any metric. Use placeholder text the forker can replace.
- **No opaque-video overlays** — if any background video could obscure text, blur the background or shrink the frame, never keep the overlay opaque.
- **Dead code** — remove. Don't comment out unused code; delete it. Git history preserves everything.
- **Configuration-driven** — when in doubt, push the value into `site.config.ts`. Components should read from the live config, not hardcode.

---

## Contributing brand changes

The easiest contribution: fix a typo in `site.config.ts` or in the i18n dictionaries. Brand strings are centralised, so any copy fix that improves clarity for HKUST students is welcome.

For a single-university fork with new branding, see [README.md → Fork Checklist](./README.md#fork-checklist) — forkers who want to rebrand for another university should follow that list rather than sending a PR upstream.

---

## Things to avoid

- **Don't add a UI library** (Material UI, Chakra, AntD). Tailwind + Lucide only.
- **Don't pull in a state-management library**. `React.useState` + `useContext` is enough.
- **Don't write the dev dependency into `dependencies`**. Use `devDependencies`.
- **Don't commit `.env*`** — configuration belongs in `site.config.ts`.

---

## Project structure

- **`src/lib/site.config.ts`** — types + default config. This is the schema source of truth.
- **`src/lib/site-configs/`** — convenience re-exports of `site.config.ts` (no presets in this build).
- **`src/components/`** — one folder per component. PascalCase folder names.
- **`src/app/`** — Next.js app router. One folder per route.
- **`src/lib/i18n/{en,zh}.ts`** — English / 中文 dictionaries.
- **`public/`** — static assets (videos, icons).

---

## Communication

- **GitHub Issues** — for bug reports and feature proposals
- **GitHub Discussions** — for Q&A and brainstorming
- **PR comments** — for code review

Please be respectful of everyone's time. If a PR is open and you want to take over, comment first.

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License — same as the rest of the project.
