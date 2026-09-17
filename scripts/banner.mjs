/**
 * Generates the LinkedIn banner, 1584x396, at
 * `content-staging/linkedin-banner-2026-09-17.png`.
 *
 *   npm run banner
 *
 * Text only: one sentence in Newsreader and the two addresses in Plex Mono, on
 * paper. Same pipeline as scripts/og.mjs (satori + resvg, the site's own fonts
 * and light-theme tokens). Layout follows the "Banner" section of
 * content-staging/linkedin-2026-09-17.md, revised 2026-09-17: no chart, no
 * accent colour, no rule, no photo, and no name or role line, because LinkedIn
 * prints the name and the headline directly under the banner. The text starts
 * at x = 560 so the profile photo circle does not cover it.
 */
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { loadFonts, el, PAPER, INK, INK_3 } from './og.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(root, '../content-staging/linkedin-banner-2026-09-17.png');

const W = 1584;
const H = 396;
/** The profile photo circle sits over the lower-left corner. */
const TEXT_X = 560;
/** Wraps the sentence to two lines. */
const TEXT_W = 900;

const SENTENCE = 'Measuring what AI safeguards and evaluations catch when an agent misbehaves.';
const ADDRESSES = 'ebinbt.dev · github.com/ebt55';

/** Regular weights, not the OG card's 500. */
const FONTS = [
  ['Newsreader', '@fontsource/newsreader/files/newsreader-latin-400-normal.woff', 400],
  ['IBM Plex Mono', '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff', 400],
];

function banner() {
  return el(
    'div',
    {
      width: W,
      height: H,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: TEXT_X,
      paddingRight: 64,
      backgroundColor: PAPER,
    },
    [
      el(
        'div',
        {
          fontFamily: 'Newsreader',
          fontSize: 44,
          fontWeight: 400,
          color: INK,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          maxWidth: TEXT_W,
        },
        SENTENCE
      ),
      el(
        'div',
        {
          fontFamily: 'IBM Plex Mono',
          fontSize: 22,
          fontWeight: 400,
          color: INK_3,
          marginTop: 22,
        },
        ADDRESSES
      ),
    ]
  );
}

/* --- run ----------------------------------------------------------------- */

const fonts = await loadFonts(FONTS);

const svg = await satori(banner(), { width: W, height: H, fonts });
const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();

await writeFile(OUT, png);
console.log(`banner written: ${OUT} (${png.length} bytes, ${W}x${H})`);
