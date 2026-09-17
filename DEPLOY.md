# Deploying ebinbt.dev

The deploy target is unchanged from the Astro site: **Cloudflare Workers static
assets**, built by the Workers Builds git integration. Only two things change
when switching from `site/` to `site-next/` — the build command and the output
directory.

## One-time switch (Cloudflare dashboard)

1. Push this folder as the repo `ebt55/ebinbt.dev`, branch `main` (replacing the
   old source, or as a fresh repo — either works).
2. In the dashboard: **Workers & Pages → ebinbt-dev → Settings → Build**:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy` (unchanged)
   - Root directory: the repo root that holds this folder's contents
3. Confirm the build variable `NODE_VERSION = 22` is still set.

Everything else carries over untouched:

- `wrangler.jsonc` already points `assets.directory` at `./out` and keeps
  `html_handling: "force-trailing-slash"` and `not_found_handling: "404-page"`.
- DNS: Porkbun nameservers → Cloudflare; `www` → apex via the proxied A record
  and the 301 Dynamic Redirect Rule.
- Rollback: dashboard → Deployments → Rollback, or `git revert` + push.

## The lockfile rule (important)

The Cloudflare build image runs `npm clean-install` with **npm 10.9.2**. This
repo's `package-lock.json` is therefore generated with npm 10, not npm 11:

```bash
npx -y npm@10 install     # regenerate the lockfile after any dependency change
```

Committing an npm-11 lockfile breaks `npm ci` in the build image with missing
`@emnapi/core` and friends.

## Verify before pushing

```bash
npm run check    # tsc --noEmit — 0 errors
npm run build    # next build + postbuild (rss, sitemaps) — must succeed
npm run preview  # sanity-check out/ on localhost before publishing
```

## What the build produces

```
out/
  index.html            / (and one .html per route, trailing-slash directories)
  work/<slug>/index.html
  writing/index.html
  now/index.html
  404.html              served by not_found_handling
  rss.xml               written by scripts/postbuild.mjs
  sitemap-0.xml         written by scripts/postbuild.mjs
  sitemap-index.xml     written by scripts/postbuild.mjs
  _next/                hashed CSS/JS chunks
  og.png, favicon.svg, resume.pdf, robots.txt
```

## Analytics (optional)

If `PUBLIC_CF_ANALYTICS_TOKEN` is set as a build variable, the layout emits the
Cloudflare Web Analytics beacon script and nothing else. Leave it unset and no
third-party request is made.

## Publishing checklist (Ebin's standing rule)

Pushing to `main` publishes. Nothing in this folder auto-pushes; the switch is
deliberate, on your word.
