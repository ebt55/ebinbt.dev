/**
 * Generates the LinkedIn banner, 1584x396, at
 * `content-staging/linkedin-banner-2026-09-17.png`.
 *
 *   npm run banner
 *
 * Same pipeline as scripts/og.mjs (satori + resvg, the site's own fonts and
 * light-theme tokens) and the same dose-response chart the home page draws, so
 * the banner cannot drift from ebinbt.dev. Layout follows the "Banner" section
 * of content-staging/linkedin-2026-09-17.md: the profile photo circle covers
 * the lower-left corner, so the text starts at x = 560.
 */
import { writeFile, mkdtemp, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import path from 'node:path';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { loadTs } from './load-ts.mjs';
import { woffToSfnt } from './woff.mjs';
import {
  loadSite,
  loadFonts,
  el,
  PAPER,
  INK,
  INK_2,
  INK_3,
  HAIRLINE,
  HAIRLINE_STRONG,
  ACCENT,
} from './og.mjs';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(root, '../content-staging/linkedin-banner-2026-09-17.png');

const W = 1584;
const H = 396;
const PAD_X = 56;
const PAD_Y = 24;
/** The profile photo circle sits over the lower-left corner. */
const PHOTO_GUTTER = 560 - PAD_X;
const TEXT_W = 488;
const CHART_W = 440;
const CHART_H = Math.round((CHART_W * 330) / 460);

/* --- the chart ----------------------------------------------------------- */

/**
 * Renders the same figure the home page draws, with the light-theme hexes in
 * place of the CSS custom properties, and returns it as a PNG data URI.
 */
async function chartDataUri() {
  const { doseFigureSvg } = await loadTs(path.join(root, 'src/lib/dose-figure.ts'));

  const svg = doseFigureSvg({
    accent: ACCENT,
    ink2: INK_2,
    ink3: INK_3,
    hairline: HAIRLINE,
    hairlineStrong: HAIRLINE_STRONG,
    tick: INK_2,
    mono: 'IBM Plex Mono',
  });

  // resvg reads sfnt, and @fontsource ships woff, so unwrap one to a temp file.
  const woff = await readFile(
    require.resolve('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff')
  );
  const dir = await mkdtemp(path.join(tmpdir(), 'ebinbt-banner-'));
  const ttf = path.join(dir, 'ibm-plex-mono-500.ttf');
  await writeFile(ttf, woffToSfnt(woff));

  // 2x, then satori scales it back down, so the labels stay crisp.
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: CHART_W * 2 },
    background: PAPER,
    font: {
      fontFiles: [ttf],
      loadSystemFonts: false,
      defaultFontFamily: 'IBM Plex Mono',
      monospaceFamily: 'IBM Plex Mono',
    },
  })
    .render()
    .asPng();

  return `data:image/png;base64,${Buffer.from(png).toString('base64')}`;
}

/* --- layout -------------------------------------------------------------- */

function banner(site, chart) {
  return el(
    'div',
    {
      width: W,
      height: H,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: PAPER,
      padding: `${PAD_Y}px ${PAD_X}px`,
      fontFamily: 'IBM Plex Sans',
    },
    [
      el('div', { display: 'flex', width: PHOTO_GUTTER, flexShrink: 0 }, []),

      el(
        'div',
        { display: 'flex', flexDirection: 'column', width: TEXT_W, flexShrink: 0 },
        [
          el(
            'div',
            {
              fontFamily: 'Newsreader',
              fontSize: 64,
              fontWeight: 500,
              color: INK,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            },
            site.name
          ),
          el(
            'div',
            { fontSize: 28, color: INK_2, marginTop: 14, lineHeight: 1.25 },
            'Independent researcher · AI control and evaluation'
          ),
          el(
            'div',
            {
              fontFamily: 'IBM Plex Mono',
              fontSize: 20,
              fontWeight: 500,
              color: INK,
              marginTop: 18,
              lineHeight: 1.45,
            },
            site.ogFinding
          ),
        ]
      ),

      el('div', { display: 'flex', flexGrow: 1 }, []),

      el(
        'div',
        {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          width: CHART_W,
          flexShrink: 0,
        },
        [
          {
            type: 'img',
            props: {
              src: chart,
              width: CHART_W,
              height: CHART_H,
              style: { width: CHART_W, height: CHART_H },
            },
          },
          el(
            'div',
            { fontFamily: 'IBM Plex Mono', fontSize: 18, color: INK_3, marginTop: 6 },
            'ebinbt.dev · github.com/ebt55'
          ),
        ]
      ),
    ]
  );
}

/* --- run ----------------------------------------------------------------- */

const site = await loadSite();
const fonts = await loadFonts();
const chart = await chartDataUri();

const svg = await satori(banner(site, chart), { width: W, height: H, fonts });
const png = new Resvg(svg, { fitTo: { mode: 'width', value: W } }).render().asPng();

await writeFile(OUT, png);
console.log(`banner written: ${OUT} (${png.length} bytes, ${W}x${H})`);
