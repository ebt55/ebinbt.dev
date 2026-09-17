/**
 * Post-build step, run by `npm run build` after `next build`:
 *
 *   1. out/rss.xml           — the writing feed (feature parity with the
 *                              Astro site's @astrojs/rss output).
 *   2. out/sitemap-index.xml — a sitemap index pointing at sitemap-0.xml,
 *                              matching the filenames public/robots.txt
 *                              already references.
 *   3. out/sitemap-0.xml     — every static route, with lastmod dates.
 *
 * Content is read with the same gray-matter frontmatter the pages use, via
 * the site's own loader logic (schema-light duplicates — these scripts only
 * need title/date/url/summary, which the page build has already validated).
 */
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');

const site = {
  name: 'Ebin Babu Thomas',
  url: 'https://ebinbt.dev',
  title: 'Independent researcher in AI control and evaluation',
};

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function loadWriting() {
  const dir = path.join(root, 'src', 'content', 'writing');
  if (!(await exists(dir))) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const items = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return { title: data.title, date: new Date(data.date), url: data.url, summary: data.summary, kind: data.kind, venue: data.venue, slug: file.replace(/\.md$/, '') };
    })
  );
  return items.filter((i) => i.title && i.date && i.url).sort((a, b) => b.date - a.date);
}

async function loadProjectSlugs() {
  const dir = path.join(root, 'src', 'content', 'projects');
  return (await readdir(dir)).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}

/* --------------------------------------------------------------------- rss */

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

async function writeRss(writing) {
  const feedUrl = `${site.url}/rss.xml`;
  const items = writing
    .map(
      (i) =>
        `    <item>\n` +
        `      <title>${esc(i.title)}</title>\n` +
        `      <link>${esc(i.url)}</link>\n` +
        `      <guid>${esc(i.url)}</guid>\n` +
        `      <pubDate>${i.date.toUTCString()}</pubDate>\n` +
        `      <description>${esc(i.summary)}</description>\n` +
        `      <category>${esc(i.kind)}</category>\n` +
        `      <category>${esc(i.venue)}</category>\n` +
        `    </item>`
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${esc(site.name)} — Writing</title>\n` +
    `    <link>${site.url}/</link>\n` +
    `    <description>Reports and write-ups on agent reliability, AI control and model evaluation.</description>\n` +
    `    <language>en-gb</language>\n` +
    `    <atom:link rel="self" href="${feedUrl}" type="application/rss+xml"/>\n` +
    `${items}\n` +
    `  </channel>\n` +
    `</rss>\n`;

  await writeFile(path.join(outDir, 'rss.xml'), xml, 'utf8');
  console.log(`postbuild: rss.xml (${writing.length} items)`);
}

/* ----------------------------------------------------------------- sitemap */

async function writeSitemap(writing, slugs) {
  const now = new Date().toISOString().slice(0, 10);
  const entries = [
    { loc: '/', lastmod: now, priority: '1.0' },
    { loc: '/work/', lastmod: now, priority: '0.9' },
    { loc: '/now/', lastmod: now, priority: '0.6' },
    ...(writing.length >= 2 ? [{ loc: '/writing/', lastmod: now, priority: '0.7' }] : []),
    ...slugs.map((s) => ({ loc: `/work/${s}/`, lastmod: now, priority: '0.8' })),
  ];

  const urls = entries
    .map(
      (e) =>
        `    <url>\n` +
        `      <loc>${site.url}${e.loc}</loc>\n` +
        `      <lastmod>${e.lastmod}</lastmod>\n` +
        `      <priority>${e.priority}</priority>\n` +
        `    </url>`
    )
    .join('\n');

  const sitemap0 =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  const index =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <sitemap>\n    <loc>${site.url}/sitemap-0.xml</loc>\n    <lastmod>${now}</lastmod>\n  </sitemap>\n` +
    `</sitemapindex>\n`;

  await writeFile(path.join(outDir, 'sitemap-0.xml'), sitemap0, 'utf8');
  await writeFile(path.join(outDir, 'sitemap-index.xml'), index, 'utf8');
  console.log(`postbuild: sitemap-0.xml + sitemap-index.xml (${entries.length} urls)`);
}

/* --------------------------------------------------------------------- run */

const writing = await loadWriting();
const slugs = await loadProjectSlugs();
await writeRss(writing);
await writeSitemap(writing, slugs);
