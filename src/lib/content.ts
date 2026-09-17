/**
 * Content loader — the Next.js replacement for Astro's content collections.
 *
 * Markdown and JSON files under src/content are read at build time (every
 * page is statically exported, so this never runs in a browser), validated
 * with the same zod schemas the Astro site enforced, and rendered to HTML
 * with `marked`. A file that fails its schema fails the build with a message
 * that names the file, exactly like `astro check` did.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import matter from 'gray-matter';
import { Marked } from 'marked';
import { z } from 'zod';

/* ------------------------------------------------------------------ schemas */

const urlish = z.string().url();

const projectSchema = z.object({
  title: z.string(),
  tagline: z.string().max(100),
  lane: z.enum(['control', 'research', 'oss']),
  kind: z.enum(['system', 'experiment', 'tool', 'hackathon']),
  status: z.enum(['active', 'in-development', 'shipped', 'archived']),
  period: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}$/, 'expected YYYY-MM'),
  order: z.number(),
  summary: z.string(),
  venue: z.string().nullable().default(null),
  featured: z.boolean().default(true),
  finding: z.string().nullable().default(null),
  limitation: z.string().nullable().default(null),
  note: z.string().nullable().default(null),
  headline: z
    .object({ value: z.string(), label: z.string() })
    .nullable()
    .default(null),
  metrics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .max(4)
    .default([]),
  stack: z.array(z.string()).max(8).default([]),
  links: z
    .object({
      repo: urlish.nullable().default(null),
      writeup: urlish.nullable().default(null),
      demo: urlish.nullable().default(null),
      model: urlish.nullable().default(null),
      other: z
        .array(z.object({ label: z.string(), url: urlish }))
        .default([]),
    })
    .default({ repo: null, writeup: null, demo: null, model: null, other: [] }),
  honestStatus: z.string().nullable().default(null),
});

const writingSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  venue: z.string(),
  url: urlish,
  kind: z.enum(['report', 'post', 'write-up']),
  summary: z.string(),
});

const nowSchema = z.object({
  updated: z.coerce.date(),
});

const experienceSchema = z.object({
  roles: z.array(
    z.object({
      org: z.string(),
      role: z.string(),
      period: z.string(),
      location: z.string(),
      summary: z.string(),
      highlights: z.array(z.string()).max(4),
      links: z.array(z.object({ label: z.string(), url: urlish })).default([]),
    })
  ),
  open_source: z.array(
    z.object({
      project: z.string(),
      url: urlish,
      what: z.string(),
      link: z.object({ label: z.string(), url: urlish }).nullable().default(null),
    })
  ),
});

/* -------------------------------------------------------------------- types */

export interface Project {
  slug: string;
  html: string;
  data: z.infer<typeof projectSchema>;
}

export interface WritingItem {
  slug: string;
  html: string;
  data: z.infer<typeof writingSchema>;
}

export interface NowEntry {
  html: string;
  data: z.infer<typeof nowSchema>;
}

export type Experience = z.infer<typeof experienceSchema>;

/* ------------------------------------------------------------------- marked */

const marked = new Marked({ gfm: true, breaks: false });

/* -------------------------------------------------------------------- utils */

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');

function fail(file: string, err: unknown): never {
  const detail = err instanceof z.ZodError
    ? err.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')
    : String(err);
  throw new Error(`[content] ${file}: ${detail}`);
}

async function readMarkdown(dir: string, file: string) {
  const raw = await readFile(path.join(CONTENT_DIR, dir, file), 'utf8');
  const { data, content } = matter(raw);
  const html = await marked.parse(content);
  return { data, html };
}

/* ------------------------------------------------------------------ loaders */

export async function getProjects(): Promise<Project[]> {
  const dir = path.join(CONTENT_DIR, 'projects');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md')).sort();
  const projects = await Promise.all(
    files.map(async (file) => {
      const { data, html } = await readMarkdown('projects', file);
      const parsed = projectSchema.safeParse(data);
      if (!parsed.success) fail(`projects/${file}`, parsed.error);
      return { slug: file.replace(/\.md$/, ''), html, data: parsed.data };
    })
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((p) => p.slug === slug);
}

export async function getWriting(): Promise<WritingItem[]> {
  const files = (await readdir(path.join(CONTENT_DIR, 'writing')))
    .filter((f) => f.endsWith('.md'))
    .sort();
  const items = await Promise.all(
    files.map(async (file) => {
      const { data, html } = await readMarkdown('writing', file);
      const parsed = writingSchema.safeParse(data);
      if (!parsed.success) fail(`writing/${file}`, parsed.error);
      return { slug: file.replace(/\.md$/, ''), html, data: parsed.data };
    })
  );
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getNow(): Promise<NowEntry | null> {
  try {
    const { data, html } = await readMarkdown('now', 'now.md');
    const parsed = nowSchema.safeParse(data);
    if (!parsed.success) fail('now/now.md', parsed.error);
    return { html, data: parsed.data };
  } catch (err) {
    if (err instanceof Error && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw err;
  }
}

export async function getExperience(): Promise<Experience> {
  const file = 'experience/experience.json';
  try {
    const raw = await readFile(path.join(CONTENT_DIR, file), 'utf8');
    return experienceSchema.parse(JSON.parse(raw));
  } catch (err) {
    fail(file, err);
  }
}
