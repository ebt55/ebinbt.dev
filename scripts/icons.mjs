/**
 * Renders the site mark (src/app/icon.svg) to the raster icons:
 *
 *   npm run icons
 *
 *   src/app/apple-icon.png  180x180, picked up by the App Router file convention
 *   public/favicon.ico      16x16 + 32x32, PNG-in-ICO, for bare /favicon.ico requests
 *
 * The SVG is the single source; edit it, then rerun this script.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { Resvg } from '@resvg/resvg-js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svg = await readFile(path.join(root, 'src/app/icon.svg'), 'utf8');

const render = (size) =>
  new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();

/** ICO container with PNG payloads (accepted by all browsers and Windows Vista+). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + 16 * images.length;
  for (const { size, png } of images) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette colours
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += png.length;
  }
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

const apple = render(180);
await writeFile(path.join(root, 'src/app/apple-icon.png'), apple);
console.log(`icons: src/app/apple-icon.png (${apple.length} bytes)`);

const favicon = ico([16, 32].map((size) => ({ size, png: render(size) })));
await writeFile(path.join(root, 'public/favicon.ico'), favicon);
console.log(`icons: public/favicon.ico (${favicon.length} bytes)`);
