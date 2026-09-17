/**
 * Turns a WOFF 1.0 file into the plain sfnt (TTF/OTF) inside it.
 *
 * resvg reads TrueType and OpenType, not WOFF, and the @fontsource packages
 * ship only .woff and .woff2. The dose-response chart is rasterised by resvg
 * for the LinkedIn banner, so its mono labels need a font resvg can open.
 * WOFF 1.0 is an sfnt whose tables are individually zlib-deflated, so this is
 * a container swap rather than a font conversion: no glyph is touched.
 */
import zlib from 'node:zlib';

const WOFF_SIGNATURE = 0x774f4646; // 'wOFF'

/**
 * @param {Buffer} buf a .woff file
 * @returns {Buffer} the sfnt font it contains
 */
export function woffToSfnt(buf) {
  if (buf.length < 44 || buf.readUInt32BE(0) !== WOFF_SIGNATURE) {
    throw new Error('not a WOFF 1.0 file');
  }

  const flavor = buf.readUInt32BE(4);
  const numTables = buf.readUInt16BE(12);

  // WOFF requires the table directory to be sorted by tag, which is also what
  // the sfnt directory needs, so the order carries over unchanged.
  const tables = [];
  for (let i = 0; i < numTables; i += 1) {
    const p = 44 + i * 20;
    const tag = buf.readUInt32BE(p);
    const offset = buf.readUInt32BE(p + 4);
    const compLength = buf.readUInt32BE(p + 8);
    const origLength = buf.readUInt32BE(p + 12);
    const checksum = buf.readUInt32BE(p + 16);

    const raw = buf.subarray(offset, offset + compLength);
    const data = compLength < origLength ? zlib.inflateSync(raw) : raw;
    if (data.length !== origLength) {
      throw new Error(`WOFF table ${tag.toString(16)} is ${data.length} bytes, expected ${origLength}`);
    }
    tables.push({ tag, checksum, origLength, data });
  }

  const pad4 = (n) => (n + 3) & ~3;
  let cursor = 12 + numTables * 16;
  for (const t of tables) {
    t.sfntOffset = cursor;
    cursor += pad4(t.origLength);
  }

  const out = Buffer.alloc(cursor, 0);
  const entrySelector = Math.floor(Math.log2(numTables));
  const searchRange = 16 * 2 ** entrySelector;

  out.writeUInt32BE(flavor, 0);
  out.writeUInt16BE(numTables, 4);
  out.writeUInt16BE(searchRange, 6);
  out.writeUInt16BE(entrySelector, 8);
  out.writeUInt16BE(numTables * 16 - searchRange, 10);

  tables.forEach((t, i) => {
    const p = 12 + i * 16;
    out.writeUInt32BE(t.tag, p);
    out.writeUInt32BE(t.checksum, p + 4);
    out.writeUInt32BE(t.sfntOffset, p + 8);
    out.writeUInt32BE(t.origLength, p + 12);
    t.data.copy(out, t.sfntOffset);
  });

  return out;
}
