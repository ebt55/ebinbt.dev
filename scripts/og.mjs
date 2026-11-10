/**
 * Generates public/og.png (1200x630) — the default Open Graph card.
 *
 *   npm run og
 *
 * Same look as the site: warm paper background, the name in Newsreader,
 * one line of role text in Instrument Sans, the domain in the accent green.
 * Copy comes from src/data/site.ts (name, role) so the card cannot drift.
 */
import { writeFile, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { loadTs } from './load-ts.mjs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --- tokens (light theme, kept in sync with src/app/globals.css) ---------- */

const BG = '#faf8f3';
const TEXT = '#1f1b16';
const MUTED = '#6b645b';
const HAIRLINE = '#e4dfd4';
const ACCENT = '#1f5a44';

/* Static woff files: satori cannot read the woff2 files the page serves. */
const FONTS = [
  ['Newsreader', '@fontsource/newsreader/files/newsreader-latin-400-normal.woff', 400],
  ['Instrument Sans', '@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff', 400],
];

const el = (type, style, children) => ({ type, props: { style, children } });

function card(site) {
  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: BG,
      padding: '0 110px',
    },
    [
      el(
        'div',
        {
          fontFamily: 'Newsreader',
          fontSize: 104,
          color: TEXT,
          letterSpacing: '-0.015em',
          lineHeight: 1.05,
        },
        site.name
      ),
      el(
        'div',
        { fontFamily: 'Instrument Sans', fontSize: 34, color: MUTED, marginTop: 28, lineHeight: 1.35 },
        site.role
      ),
      el('div', { width: 96, height: 2, backgroundColor: HAIRLINE, marginTop: 56 }),
      el(
        'div',
        { fontFamily: 'Instrument Sans', fontSize: 26, color: ACCENT, marginTop: 28 },
        new URL(site.url).host
      ),
    ]
  );
}

const mod = await loadTs(path.join(root, 'src/data/site.ts'));
if (!mod.site) throw new Error('src/data/site.ts does not export `site`');

const fonts = await Promise.all(
  FONTS.map(async ([name, spec, weight]) => ({
    name,
    data: await readFile(require.resolve(spec)),
    weight,
    style: 'normal',
  }))
);

const svg = await satori(card(mod.site), { width: 1200, height: 630, fonts });
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

const out = path.join(root, 'public/og.png');
await writeFile(out, png);
console.log(`og.png written: ${out} (${png.length} bytes)`);
