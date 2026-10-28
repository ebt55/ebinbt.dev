/**
 * Versioned resume links. Each PDF in public/ is hashed at build time (every
 * page is statically exported, so this never runs in a browser) and the
 * first 10 hex chars of its sha256 go on the link as ?v=, so a new PDF is a
 * new URL and no browser or edge cache can serve the old one. The bare
 * paths keep working for bookmarks; public/_headers marks them
 * must-revalidate.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import { site } from '@/data/site';

function versioned(href: string): string {
  const pdf = readFileSync(path.join(process.cwd(), 'public', href.replace(/^\//, '')));
  const hash = createHash('sha256').update(pdf).digest('hex').slice(0, 10);
  return `${href}?v=${hash}`;
}

export const resumeHref = versioned(site.resumePath);
export const engineerResumeHref = versioned(site.resumeVersions.engineer);
export const researchResumeHref = versioned(site.resumeVersions.research);
