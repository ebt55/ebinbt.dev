/**
 * Generates public/og.png (1200x630) — the default Open Graph card.
 *
 *   npm run og
 *
 * Design: light-theme tokens from src/styles/tokens.css, name in Newsreader,
 * the eyebrow line in IBM Plex Sans, and one finding in IBM Plex Mono under a
 * hairline rule, domain bottom-right. No photos, no gradients, no shadows.
 *
 * Copy comes from src/data/site.ts so the card cannot drift from the page.
 */
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { loadTs } from './load-ts.mjs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --- tokens (light theme, kept in sync with src/styles/tokens.css) -------- */

export const PAPER = '#FBFAF7';
export const INK = '#14171A';
export const INK_2 = '#5B6068';
export const INK_3 = '#6A7078';
export const HAIRLINE = '#E3DFD6';
export const HAIRLINE_STRONG = '#CDC7BA';
export const ACCENT = '#C94210';

/* --- shared loaders ------------------------------------------------------ */

export async function loadSite() {
  const mod = await loadTs(path.join(root, 'src/data/site.ts'));
  if (!mod.site) throw new Error('src/data/site.ts does not export `site`');
  return mod.site;
}

/** The faces the OG card uses. Other scripts pass their own list. */
export const OG_FONTS = [
  ['Newsreader', '@fontsource/newsreader/files/newsreader-latin-500-normal.woff', 500],
  ['IBM Plex Sans', '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff', 400],
  ['IBM Plex Mono', '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff', 500],
];

/**
 * The fonts satori needs: woff/ttf, not the woff2 the site serves. Each entry
 * is [family, package specifier, weight]; register only the weights a card
 * asks for, because satori silently substitutes the nearest one it holds.
 */
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

/* --- layout -------------------------------------------------------------- */

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
      fontFamily: 'IBM Plex Sans',
    },
    [
      // --- top: mark, name, the eyebrow line
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', {
          width: 16,
          height: 16,
          backgroundColor: ACCENT,
          borderRadius: 2,
          marginBottom: 34,
        }),
        el(
          'div',
          {
            fontFamily: 'Newsreader',
            fontSize: 76,
            fontWeight: 500,
            color: INK,
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
          },
          site.name
        ),
        el('div', { fontSize: 30, color: INK_2, marginTop: 18, lineHeight: 1.3 }, site.eyebrow),
      ]),

      // --- rule, then the one finding the card leads with
      el('div', { display: 'flex', flexDirection: 'column', marginTop: 54 }, [
        el('div', { height: 1, backgroundColor: HAIRLINE, marginBottom: 30 }),
        el(
          'div',
          {
            display: 'flex',
            width: INNER,
            fontFamily: 'IBM Plex Mono',
            fontSize: 28,
            fontWeight: 500,
            color: INK,
            lineHeight: 1.4,
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
          fontFamily: 'IBM Plex Mono',
          fontSize: 22,
          color: INK_3,
        },
        'ebinbt.dev'
      ),
    ]
  );
}

/* --- run ----------------------------------------------------------------- */

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
