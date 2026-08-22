/**
 * Generates public/og.png (1200x630) — the default Open Graph card.
 *
 *   npm run og
 *
 * Design: light-theme tokens from src/styles/tokens.css, name in Newsreader,
 * title line in IBM Plex Sans, three measured results in IBM Plex Mono across
 * the bottom third, domain bottom-right. No photos, no gradients, no shadows.
 *
 * Copy comes from src/data/site.ts so the card cannot drift from the page.
 * The .ts file is type-stripped with the TypeScript compiler that is already a
 * devDependency, then imported as a data: URL.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* --- tokens (light theme, kept in sync with src/styles/tokens.css) -------- */

const PAPER = '#FBFAF7';
const INK = '#14171A';
const INK_2 = '#5B6068';
const INK_3 = '#6A7078';
const HAIRLINE = '#E3DFD6';
const ACCENT = '#C94210';

/* --- load site.ts -------------------------------------------------------- */

async function loadSite() {
  const source = await readFile(path.join(root, 'src/data/site.ts'), 'utf8');
  const js = ts
    .transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    })
    .outputText // `import.meta.env` only exists inside Vite; the token is irrelevant here.
    .replace(/import\.meta\.env/g, '({})');
  const url = `data:text/javascript;base64,${Buffer.from(js, 'utf8').toString('base64')}`;
  const mod = await import(url);
  if (!mod.site) throw new Error('src/data/site.ts does not export `site`');
  return mod.site;
}

/* --- fonts (from the @fontsource packages; satori needs woff/ttf) --------- */

async function loadFonts() {
  const files = [
    ['Newsreader', '@fontsource/newsreader/files/newsreader-latin-500-normal.woff', 500],
    ['IBM Plex Sans', '@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff', 400],
    ['IBM Plex Mono', '@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff', 500],
  ];
  return Promise.all(
    files.map(async ([name, spec, weight]) => ({
      name,
      data: await readFile(require.resolve(spec)),
      weight,
      style: 'normal',
    }))
  );
}

/* --- layout -------------------------------------------------------------- */

const el = (type, style, children) => ({ type, props: { style, children } });

function card(site) {
  const stats = site.proof.slice(0, 3);

  return el(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: PAPER,
      padding: '72px 76px',
      fontFamily: 'IBM Plex Sans',
    },
    [
      // --- top: mark, name, title line
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
        el(
          'div',
          { fontSize: 30, color: INK_2, marginTop: 18, lineHeight: 1.3 },
          site.title
        ),
      ]),

      // --- bottom: hairline, three numbers, domain
      el('div', { display: 'flex', flexDirection: 'column' }, [
        el('div', { height: 1, backgroundColor: HAIRLINE, marginBottom: 30 }),
        el('div', { display: 'flex', alignItems: 'flex-end' }, [
          el(
            'div',
            { display: 'flex', flex: 1, gap: 52 },
            stats.map((s) =>
              el('div', { display: 'flex', flexDirection: 'column', maxWidth: 280 }, [
                el(
                  'div',
                  {
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 40,
                    fontWeight: 500,
                    color: INK,
                    letterSpacing: '-0.02em',
                  },
                  s.value
                ),
                el(
                  'div',
                  { fontSize: 17, color: INK_2, marginTop: 6, lineHeight: 1.35 },
                  stripSeed(s.label)
                ),
              ])
            )
          ),
          el(
            'div',
            { fontFamily: 'IBM Plex Mono', fontSize: 22, color: INK_3, paddingLeft: 32 },
            'ebinbt.dev'
          ),
        ]),
      ]),
    ]
  );
}

/** Seed copy carries a literal `seed:` prefix; never bake it into the image. */
const stripSeed = (s) => String(s).replace(/^seed:\s*/i, '');

/* --- run ----------------------------------------------------------------- */

const site = await loadSite();
const fonts = await loadFonts();

const svg = await satori(card(site), { width: 1200, height: 630, fonts });
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

const out = path.join(root, 'public/og.png');
await writeFile(out, png);
console.log(`og.png written: ${out} (${png.length} bytes)`);
