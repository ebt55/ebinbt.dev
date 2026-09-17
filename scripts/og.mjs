/**
 * Generates public/og.png (1200x630) — the default Open Graph card.
 *
 *   npm run og
 *
 * Design: the METR-derived light tokens from src/app/globals.css — warm-white
 * paper, near-black name in Instrument Sans, the eyebrow line in slate, one
 * finding under a hairline rule, deep-green square mark, domain bottom-right.
 * No photos, no gradients, no shadows.
 *
 * Copy comes from src/data/site.ts so the card cannot drift from the page.
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

export const PAPER = '#FCFCFA';
export const INK = '#16181D';
export const BODY = '#4D5561';
export const QUIET = '#8A8F98';
export const HAIRLINE = '#E7E7E2';
export const GREEN = '#2E6B5B';

/* --- loaders --------------------------------------------------------------- */

export async function loadSite() {
  const mod = await loadTs(path.join(root, 'src/data/site.ts'));
  if (!mod.site) throw new Error('src/data/site.ts does not export `site`');
  return mod.site;
}

/** Instrument Sans static woff files (satori cannot read the woff2 the page serves). */
export const OG_FONTS = [
  ['Instrument Sans', '@fontsource/instrument-sans/files/instrument-sans-latin-600-normal.woff', 600],
  ['Instrument Sans', '@fontsource/instrument-sans/files/instrument-sans-latin-400-normal.woff', 400],
];

export async function loadFonts(files = OG_FONTS) {
  return Promise.all(
    files.map(async ([name, spec, weight]) => ({
      name,
      data: await readFile(require.resolve(spec)),
      weight,
      style: 'normal',
    }))
  );
}

export const el = (type, style, children) => ({ type, props: { style, children } });

/* --- layout ---------------------------------------------------------------- */

const PAD_X = 76;
const INNER = 1200 - PAD_X * 2; // 1048

function card(site) {
  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      backgroundColor: PAPER,
      padding: `72px ${PAD_X}px`,
      fontFamily: 'Instrument Sans',
    },
    [
      // --- top: green mark, name, the eyebrow line
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', {
          width: 18,
          height: 18,
          backgroundColor: GREEN,
          borderRadius: 4,
          marginBottom: 36,
        }),
        el(
          'div',
          {
            fontSize: 78,
            fontWeight: 600,
            color: INK,
            letterSpacing: '-0.022em',
            lineHeight: 1.04,
          },
          site.name
        ),
        el('div', { fontSize: 29, color: BODY, marginTop: 20, lineHeight: 1.35 }, site.eyebrow),
      ]),

      // --- rule, then the one finding the card leads with
      el('div', { display: 'flex', flexDirection: 'column', marginTop: 56 }, [
        el('div', { height: 1, backgroundColor: HAIRLINE, marginBottom: 32 }),
        el(
          'div',
          {
            display: 'flex',
            width: INNER,
            fontSize: 29,
            fontWeight: 600,
            color: GREEN,
            lineHeight: 1.45,
            letterSpacing: '-0.01em',
          },
          site.ogFinding
        ),
      ]),

      // --- spacer, then the domain pinned bottom-right
      el('div', { display: 'flex', flexGrow: 1, minHeight: 24 }),
      el(
        'div',
        {
          display: 'flex',
          width: INNER,
          justifyContent: 'flex-end',
          fontSize: 22,
          color: QUIET,
        },
        'ebinbt.dev'
      ),
    ]
  );
}

/* --- run ------------------------------------------------------------------- */

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const site = await loadSite();
  const fonts = await loadFonts();

  const svg = await satori(card(site), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  const out = path.join(root, 'public/og.png');
  await writeFile(out, png);
  console.log(`og.png written: ${out} (${png.length} bytes)`);
}
