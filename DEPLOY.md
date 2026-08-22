# Deploying ebinbt.dev

Target: **Cloudflare Workers static assets**, built automatically from the GitHub repo
`ebt55/ebinbt.dev`, served on the apex domain `ebinbt.dev` with `www` redirecting to it.

**Cost: $0.** The Workers free plan covers static assets with unlimited requests and
unlimited bandwidth, free TLS, global CDN, unmetered DDoS protection and cookie-less
analytics. The only recurring cost is the domain itself (Porkbun, renews Aug 2027).

## Why Workers and not Pages

Cloudflare's Pages documentation now carries this banner:

> "Workers supports most Pages use cases and offers a broader feature set. It is
> Cloudflare's primary platform for building applications. Start new projects with
> Workers."

Pages still works and is not being switched off, but it is no longer where new projects
are meant to start. For a purely static site the two are equivalent in behaviour and
price; Workers is the one that will keep getting features. The GitHub Pages fallback at
the end of this file is the escape hatch if Cloudflare is ever unacceptable.

---

## 0. Before you start

| You need | Notes |
|---|---|
| A GitHub account | `ebt55`, repo `ebinbt.dev`. Public is recommended — the source is part of the portfolio and the footer links to it. Private also works (Workers Builds reads private repos through the GitHub app); if you keep it private, set `repoUrl` to `null` in `src/data/site.ts` so the footer's "Source on GitHub" link disappears. |
| A free Cloudflare account | Sign up at <https://dash.cloudflare.com/sign-up>. No card, no paid plan. |
| Access to Porkbun | To change the domain's nameservers. |
| Nothing secret | The site needs no API keys or tokens to build or serve. |

The repo already contains `wrangler.jsonc`, which is the only deploy config Cloudflare
needs:

```jsonc
{
  "name": "ebinbt-dev",
  "compatibility_date": "2026-08-22",
  "assets": {
    "directory": "./dist",
    "html_handling": "force-trailing-slash",
    "not_found_handling": "404-page"
  }
}
```

`force-trailing-slash` matches `trailingSlash: 'always'` in `astro.config.mjs`.
`404-page` makes Cloudflare serve `dist/404.html` with a real 404 status.

---

## 1. Push the repository

```bash
# from the site/ directory, once the content is final
git remote add origin https://github.com/ebt55/ebinbt.dev.git
git push -u origin main
```

Confirm `npm run build` and `npm run check` pass locally first. `dist/` is gitignored on
purpose — Cloudflare builds it.

---

## 2. Add the domain to Cloudflare

1. Log in to <https://dash.cloudflare.com>.
2. In the left sidebar choose **Account Home**, then **Add a domain** (older accounts:
   **Websites → Add a site**).
3. Type `ebinbt.dev` and select **Continue**.
4. Choose the **Free** plan and **Continue**.
5. Cloudflare scans the existing DNS records. Since nothing is hosted yet there will be
   little or nothing to import — that is fine. Select **Continue**.
6. Cloudflare shows **two nameservers**, e.g. `xxx.ns.cloudflare.com` and
   `yyy.ns.cloudflare.com`. **Copy both** — they are specific to your account. Leave this
   page open.

---

## 3. Point the nameservers at Cloudflare (Porkbun)

1. Log in to <https://porkbun.com>.
2. **Domain Management** → find `ebinbt.dev` → **Details** / the caret to expand it.
3. Find **Authoritative Nameservers** and select **Edit**.
4. Delete Porkbun's default nameservers and paste the two Cloudflare nameservers from
   step 2.6, one per line.
5. Save.
6. Back in Cloudflare, select **Continue** / **Check nameservers now**. Propagation is
   usually minutes; Cloudflare emails you when the zone is **Active**. Do not proceed to
   the custom domain step until the zone shows **Active**.

While you are in Porkbun, leave WHOIS privacy on and auto-renew on.

---

## 4. Connect the repository to Workers Builds

1. Cloudflare dashboard → **Compute (Workers)** → **Workers & Pages**.
2. Select **Create application** (or **Create**).
3. Under **Import a repository**, select **Get started**.
4. Connect your **GitHub** account, authorise Cloudflare, and grant access to the
   `ebt55/ebinbt.dev` repository (you can grant access to that single repo).
5. Pick `ebt55/ebinbt.dev` from the list.
6. Fill in the build settings:

   | Field | Value |
   |---|---|
   | Project name | `ebinbt-dev` (must match `name` in `wrangler.jsonc`) |
   | Production branch | `main` (the default) |
   | Build command | `npm run build` |
   | Deploy command | `npx wrangler deploy` (the default) |
   | Root directory | leave blank (the repo root **is** the project) |
   | Build output directory | not asked for here — it comes from `assets.directory` in `wrangler.jsonc` |

   If the framework autodetector pre-fills something different, override it with the
   values above.
7. Select **Save and Deploy**. The first build takes a couple of minutes; watch the log.
8. When it finishes you get a `*.workers.dev` URL. Open it and check the site renders.

Every later push to `main` redeploys automatically. Pushes to other branches create a
preview version (`npx wrangler versions upload`) without touching production.

**Node version:** the build image defaults to Node 24 and also ships Node 22. The
repository's `.nvmrc` (`22`) is respected automatically. If a build ever fails on a Node
mismatch, add a build variable `NODE_VERSION = 22`.

---

## 5. Attach the custom domains

The zone must be **Active** (step 3) before this works.

### Apex — `ebinbt.dev`

1. **Workers & Pages** → select the `ebinbt-dev` Worker.
2. **Settings** → **Domains & Routes** → **Add** → **Custom Domain**.
3. Enter `ebinbt.dev` and select **Add Custom Domain**.
4. Cloudflare creates the DNS record and issues the certificate itself. Give it a minute,
   then load <https://ebinbt.dev> — HTTPS should already work.

### `www` → apex redirect

Custom Domains match the hostname exactly, so `www.ebinbt.dev` will not reach a Worker
bound to `ebinbt.dev`. Redirect it instead of attaching a second Custom Domain:

1. Zone `ebinbt.dev` → **DNS** → **Records**. Delete any existing `www` record.
2. **Add record**: Type `A`, Name `www`, IPv4 address `192.0.2.0`, **Proxied** (orange
   cloud) ON. `192.0.2.0` is the reserved documentation address — nothing is served from
   it; the proxy intercepts the request so a rule can act on it.
3. Zone `ebinbt.dev` → **Rules** → **Redirect Rules** → **Create rule**.
   - Name: `www to apex`
   - When incoming requests match: **Custom filter expression** →
     Field `Hostname`, Operator `equals`, Value `www.ebinbt.dev`
   - Then: **Dynamic redirect**
   - Expression: `concat("https://ebinbt.dev", http.request.uri.path)`
   - Status code: **301**
   - **Preserve query string**: on
4. Deploy the rule and test `http://www.ebinbt.dev/work/` — it must land on
   `https://ebinbt.dev/work/`.

---

## 6. Verify the deployment

- <https://ebinbt.dev/> loads, padlock present.
- <https://ebinbt.dev/work/incidentgate/> loads.
- <https://ebinbt.dev/work/incidentgate> (no slash) **301s** to the slashed URL.
- <https://ebinbt.dev/nonsense/> shows the branded 404 **and** returns HTTP 404
  (`curl -I https://ebinbt.dev/nonsense/`).
- <https://ebinbt.dev/robots.txt>, `/sitemap-index.xml`, `/rss.xml`, `/resume.pdf`,
  `/og.png` all return 200.
- Paste `https://ebinbt.dev` into <https://www.opengraph.xyz/> (or share the link in a
  Slack or LinkedIn message draft) and confirm the card image renders.
- Search Console (optional): add `ebinbt.dev` as a domain property, verify by DNS TXT
  through Cloudflare, submit `https://ebinbt.dev/sitemap-index.xml`.

---

## 7. Cloudflare Web Analytics

Free, cookie-less, no consent banner needed. Two ways to enable it — prefer the first.

### Automatic (no JavaScript at all)

1. Dashboard → **Analytics & Logs** → **Web Analytics**.
2. **Add a site** → choose `ebinbt.dev` from your zones → **Enable automatic setup**.

Cloudflare injects its beacon at the edge for the proxied hostname. Nothing changes in
the repository and the built HTML stays JavaScript-free.

### Manual (only if you ever move off Cloudflare DNS)

1. Web Analytics → **Add a site** → **Manual setup**. Copy the **site token**.
2. Workers & Pages → `ebinbt-dev` → **Settings** → **Build** → **Variables and secrets** →
   **Add variable**:
   - Name: `PUBLIC_CF_ANALYTICS_TOKEN`
   - Value: the site token
   - Type: plaintext (the token is public by design — it ships in the HTML)
3. Redeploy. `BaseHead.astro` reads `site.analyticsToken` and only then emits the
   `beacon.min.js` tag. Unset the variable and the tag disappears again.

It must be a **build** variable, not a runtime one: Astro inlines `import.meta.env`
values at build time.

---

## 8. Booking link

Already set up and live. `src/data/site.ts` carries:

```ts
bookingUrl: 'https://cal.com/ebinbt',
```

The contact section renders a "Call" row pointing at it; set the value back to `null` and
the row disappears. This is deliberately a source change, not an environment variable —
the URL is public and belongs in version control with the rest of the contact details.
Changing the Cal.com event's length or name needs no site change, as long as the handle
stays `ebinbt`.

## 9. Email routing (optional)

Gives you `hello@ebinbt.dev` forwarding to the existing Gmail, free, no mailbox to run.

1. Zone `ebinbt.dev` → **Email** → **Email Routing** → **Get started**.
2. Cloudflare offers to add the required MX and TXT (SPF) records — accept.
3. Create a custom address `hello@ebinbt.dev` → destination `ebinbabuthomas@gmail.com`.
4. Confirm the verification email Cloudflare sends to that Gmail.
5. Only then change `email` in `src/data/site.ts` if you want the site to show the
   custom address. Sending *from* it needs a Gmail "Send mail as" setup with an app
   password — worth doing before you advertise the address.

---

## Environment variables, all of them

| Name | Where | Required | Effect |
|---|---|---|---|
| `PUBLIC_CF_ANALYTICS_TOKEN` | Workers Builds → Variables and secrets (build) | No | Emits the Cloudflare Web Analytics beacon. Unset = no third-party script at all. |
| `NODE_VERSION` | Workers Builds → Variables and secrets (build) | No | Only if the default build image Node version ever breaks the build. Set to `22`. |

There are no secrets. Nothing else is read at build or run time.

---

## Rolling back

Workers & Pages → `ebinbt-dev` → **Deployments** → find the last good deployment →
**Rollback**. Instant, no rebuild. Or `git revert` and push, which triggers a fresh build.

---

## Fallback: GitHub Pages

Same $0, same custom domain, slightly slower cache invalidation and no built-in
analytics. Use it if Cloudflare is unavailable or unwanted.

**This workflow file is intentionally NOT committed to the repository** — having two
deploy paths armed at once causes confusing double deploys. If you switch, create
`.github/workflows/deploy.yml` with exactly this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v7
      - name: Install, build, and upload your site
        uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

Then:

1. Repo → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.
2. Add `public/CNAME` containing exactly `ebinbt.dev` (one line, no protocol).
3. DNS at whichever provider is authoritative:
   - Apex `ebinbt.dev`: four `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (and/or the matching `AAAA` records
     `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`).
   - `www`: `CNAME` → `ebt55.github.io`.
   - If the zone is on Cloudflare, set these records to **DNS only** (grey cloud) until
     GitHub has issued its certificate, then you may proxy them.
4. Repo → **Settings** → **Pages** → Custom domain → `ebinbt.dev` → **Save**, then tick
   **Enforce HTTPS** once the certificate is issued (can take up to an hour).
5. `astro.config.mjs` needs no change for a custom domain: `site` is already
   `https://ebinbt.dev` and no `base` is set. Only a project-page URL
   (`ebt55.github.io/ebinbt.dev/`) would need `base: '/ebinbt.dev'`.
6. Delete `wrangler.jsonc` only if you are abandoning Cloudflare entirely; it is inert
   otherwise.
