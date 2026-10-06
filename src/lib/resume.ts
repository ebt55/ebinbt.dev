/**
 * Versioned resume link. public/resume.pdf is hashed at build time (every
 * page is statically exported, so this never runs in a browser) and the
 * first 10 hex chars of its sha256 go on the link as ?v=, so a new PDF is a
 * new URL and no browser or edge cache can serve the old one. The bare
 * /resume.pdf keeps working for bookmarks; public/_headers marks it
 * must-revalidate.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { site } from '@/data/site';

const pdf = readFileSync(path.join(process.cwd(), 'public', site.resumePath.replace(/^\//, '')));
const hash = createHash('sha256').update(pdf).digest('hex').slice(0, 10);

export const resumeHref = `${site.resumePath}?v=${hash}`;
