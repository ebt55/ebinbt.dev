# ebinbt.dev

Source for [ebinbt.dev](https://ebinbt.dev) — the personal site of Ebin Babu Thomas.

Static [Astro](https://astro.build) site. Hand-written CSS with design tokens, no UI
framework, no Tailwind, **no client-side JavaScript**. Content lives in Markdown and
JSON files that a non-developer can edit.

---

## Run it

Requires Node 22 (`.nvmrc` pins the major) and npm 11.

```bash
npm ci          # install exactly what package-lock.json says
npm run dev     # dev server on http://localhost:4321
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload. |
| `npm run build` | Static build into `dist/`. |
| `npm run preview` | Serve the built `dist/` locally (what the host will serve). |
| `npm run check` | `astro check` — types and template diagnostics. Must report 0 errors. |
| `npm run og` | Regenerate `public/og.png` from `src/data/site.ts`. |

`npm run build` must pass before anything is pushed; `main` is the deployed branch.

---

## Where the content lives

Nothing below requires touching a component.

```
src/
  data/site.ts                     name, title, intro, socials, proof ledger,
                                   principles, availability  ← edit this first
  content/
    projects/<slug>.md             one file per project  → /work/<slug>/
    writing/<slug>.md              one file per external report/post
    now/now.md                     the /now/ page (exactly one file)
    experience/experience.json     roles + open-source contributions
public/
  resume.pdf                       served at /resume.pdf
  og.png                           social preview card (generated, see below)
```

### Add a project

Copy any file in `src/content/projects/` to a new name — the filename becomes the URL
(`incidentgate.md` → `/work/incidentgate/`) — and edit the front matter:

```yaml
---
title: IncidentGate                 # display name
tagline: One line, under 100 characters, saying what it is.
lane: control                       # control | research | oss  (which group it appears in)
kind: system                        # system | experiment | tool | hackathon
status: active                      # active | in-development | shipped | archived
period: Aug 2026 – present
venue: null                         # or "Apart Research — Digital Minds sprint, Aug 2026"
order: 1                            # position within its lane, low numbers first
featured: true                      # true = also shown on the home page
headline:                           # the ONE number the card leads with
  value: 434/434
  label: kill-point recoveries, 0 duplicate mutations
metrics:                            # 2–4 more numbers, detail page only
  - value: '0'
    label: duplicate side effects across all recovery runs
stack: [Python, FastAPI, PostgreSQL]   # up to 8; the first 5 show on the card
links:
  repo: https://github.com/ebt55/incidentgate
  writeup: null
  demo: null
  model: null                       # e.g. a Hugging Face adapter
  other: []                         # [{ label: Changelog, url: https://example.com/changelog }]
honestStatus: One sentence naming the current limitation. Keep it.
summary: One or two sentences. Used as the page meta description.
---

## What it is

150–300 words of Markdown, under these three headings:
`## What it is`, `## What I measured`, `## Limitations`
(use `## Status` instead of `## Limitations` while something is in development).
```

The build fails with a readable error if a required field is missing or a value is not
one of the allowed options — that is the schema in `src/content.config.ts` doing its job.

### Add a writing item

Copy a file in `src/content/writing/`. Front matter: `title`, `date` (`YYYY-MM-DD`),
`venue`, `url` (where it actually lives — the site does not host post bodies), `kind`
(`report` | `post` | `write-up`), `summary`. Items appear on the home page as soon as
there is one, in `/rss.xml` always, and **`/writing/` only exists once there are two or
more items** — the route is generated conditionally in `src/pages/writing/[...index].astro`.

### Update /now/

Edit `src/content/now/now.md`: bump `updated:` to today and rewrite the 3–5 bullets.

### Replace the résumé

Drop a new PDF at `public/resume.pdf`. The path is set once, in `site.resumePath`.

### Add a photo (optional)

Drop a square image at `src/assets/ebin.jpg` (or `.png`/`.webp`). The hero picks it up
automatically and renders it at 112px. The page is designed to look finished without one;
no other change is needed either way.

---

## Design system

`src/styles/tokens.css` holds every colour, size and spacing value, light on `:root` and
dark under `@media (prefers-color-scheme: dark)`. There is no theme toggle by design —
the site follows the operating system. `src/styles/global.css` has the reset, the type
scale and a few utilities; everything else is scoped inside its component.

Fonts are self-hosted from the `@fontsource` packages (Newsreader for headings, IBM Plex
Sans for body, IBM Plex Mono for numbers and labels) — no requests to Google at runtime.
The three faces used above the fold are preloaded from `BaseHead.astro`.

## Social preview image

`public/og.png` (1200×630) is generated by `scripts/og.mjs` from `src/data/site.ts`, so
the card cannot drift from the page. Re-run `npm run og` and commit the PNG after
changing the name, title line or the first three proof numbers.

## No client-side JavaScript

`dist/` contains zero `.js` files. Nothing on the site needs it. If Cloudflare Web
Analytics is enabled (see `DEPLOY.md`) the build adds one third-party `defer` script tag
and nothing else; leave `PUBLIC_CF_ANALYTICS_TOKEN` unset and the tag is not emitted.

## Deploying

See [`DEPLOY.md`](./DEPLOY.md) — Cloudflare Workers static assets, DNS at Porkbun, and a
GitHub Pages fallback.

## Licence

Code is MIT — see [`LICENSE`](./LICENSE). Site **content** (prose, project write-ups,
résumé, images and the results they describe) is © 2026 Ebin Babu Thomas, all rights
reserved. Reuse the scaffolding, not the biography.
