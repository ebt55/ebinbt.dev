/**
 * Markdown helpers, run at build time only (every page is statically
 * exported). `inline` renders one line of inline markdown for the home page;
 * `loadArticles` reads the markdown article pages under src/content.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { Marked } from 'marked';
import { z } from 'zod';

import type { Link } from '@/lib/types';

const marked = new Marked({ gfm: true, breaks: false, async: false });

/** Inline markdown (links, emphasis, code) to HTML. No wrapping <p>. */
export function inline(text: string): string {
  return marked.parseInline(text, { async: false }) as string;
}

/* ---------------------------------------------------------------- articles */

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

const linkSchema = z.object({ label: z.string(), url: z.string() });

/** src/content/work/*.md */
const workSchema = z.object({
  title: z.string(),
  context: z.string().default(''),
  when: z.string().default(''),
  links: z.array(linkSchema).default([]),
  updated: z.coerce.date().optional(),
});

/** src/content/writing/*.md — only files without an external `url` become pages. */
const writingSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  url: z.string().nullable().default(null),
  kind: z.string().default('write-up'),
  summary: z.string().default(''),
  links: z.array(linkSchema).default([]),
});

export interface Article {
  slug: string;
  title: string;
  /** Muted line under the title. */
  context: string;
  /** Meta description. */
  description: string;
  links: Link[];
  html: string;
  /** ISO date for <time>, when the article has one. */
  date?: Date;
}

const DATE = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});
export const formatDate = (d: Date) => DATE.format(d);

/**
 * Post-processing of rendered article HTML:
 * - a paragraph holding only an image becomes a figure, captioned by its alt text;
 * - tables get a scrolling wrapper so wide ones never widen the page.
 */
function polish(html: string): string {
  return html
    .replace(
      /<p>(<img src="([^"]*)" alt="([^"]*)"[^>]*>)<\/p>/g,
      (_m, _img, src: string, alt: string) =>
        `<figure><img src="${src}" alt="${alt}" loading="lazy"><figcaption>${alt}</figcaption></figure>`
    )
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

function fail(file: string, err: z.ZodError): never {
  const detail = err.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
  throw new Error(`[content] ${file}: ${detail}`);
}

async function readDir(dir: string): Promise<string[]> {
  try {
    return (await readdir(path.join(CONTENT_DIR, dir))).filter((f) => f.endsWith('.md')).sort();
  } catch {
    return [];
  }
}

async function read(dir: string, file: string) {
  const raw = await readFile(path.join(CONTENT_DIR, dir, file), 'utf8');
  const { data, content } = matter(raw);
  return { data, html: polish(await marked.parse(content)) };
}

export async function getWorkArticles(): Promise<Article[]> {
  const files = await readDir('work');
  return Promise.all(
    files.map(async (file) => {
      const { data, html } = await read('work', file);
      const parsed = workSchema.safeParse(data);
      if (!parsed.success) fail(`work/${file}`, parsed.error);
      const d = parsed.data;
      return {
        slug: file.replace(/\.md$/, ''),
        title: d.title,
        context: [d.context, d.when].filter(Boolean).join(' · '),
        description: d.context || d.title,
        links: d.links.map((l) => ({ label: l.label, href: l.url })),
        html,
        date: d.updated,
      };
    })
  );
}

export async function getWritingArticles(): Promise<Article[]> {
  const files = await readDir('writing');
  const all = await Promise.all(
    files.map(async (file) => {
      const { data, html } = await read('writing', file);
      const parsed = writingSchema.safeParse(data);
      if (!parsed.success) fail(`writing/${file}`, parsed.error);
      return { slug: file.replace(/\.md$/, ''), d: parsed.data, html };
    })
  );
  return all
    .filter((a) => a.d.url === null)
    .map(({ slug, d, html }) => ({
      slug,
      title: d.title,
      context: `${d.kind.charAt(0).toUpperCase()}${d.kind.slice(1)} · ${formatDate(d.date)}`,
      description: d.summary,
      links: d.links.map((l) => ({ label: l.label, href: l.url })),
      html,
      date: d.date,
    }));
}
