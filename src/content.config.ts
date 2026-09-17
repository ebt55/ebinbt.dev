import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

/* --- projects ----------------------------------------------------------- */

export const LANES = ['control', 'research', 'oss'] as const;

const metric = z.object({
  value: z.string(),
  label: z.string(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().max(100),
    lane: z.enum(LANES),
    kind: z.enum(['system', 'experiment', 'tool', 'hackathon']),
    status: z.enum(['active', 'in-development', 'shipped', 'archived']),
    period: z.string(),
    /** Sortable month, YYYY-MM. Newest first on the home findings list. */
    date: z.string().regex(/^\d{4}-\d{2}$/),
    venue: z.string().nullable().default(null),
    order: z.number(),
    featured: z.boolean().default(true),
    /** One sentence with the number. Rendered on the home findings list. */
    finding: z.string().nullable().default(null),
    /** One sentence with what the finding does not cover. */
    limitation: z.string().nullable().default(null),
    /** Short status words beside the title while a project has no repo yet. */
    note: z.string().nullable().default(null),
    // Work still running has no measured headline and no metrics yet.
    headline: metric.nullable().default(null),
    // README tells authors to write 2–4; make that true rather than aspirational.
    metrics: z.array(metric).max(4).default([]),
    stack: z.array(z.string()).max(8).default([]),
    links: z
      .object({
        repo: z.url().nullable().default(null),
        writeup: z.url().nullable().default(null),
        demo: z.url().nullable().default(null),
        model: z.url().nullable().default(null),
        other: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      })
      .default({ repo: null, writeup: null, demo: null, model: null, other: [] }),
    honestStatus: z.string().nullable().default(null),
    summary: z.string(),
  }),
});

/* --- writing ------------------------------------------------------------ */

const writing = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    venue: z.string(),
    url: z.url(),
    kind: z.enum(['report', 'post', 'write-up']),
    summary: z.string(),
  }),
});

/* --- now ---------------------------------------------------------------- */

const now = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/now' }),
  schema: z.object({
    updated: z.coerce.date(),
  }),
});

/* --- experience --------------------------------------------------------- */

const link = z.object({ label: z.string(), url: z.string() });

const experience = defineCollection({
  loader: file('./src/content/experience/experience.json', {
    // The file holds one object ({ roles, open_source }); expose it as a single
    // entry with the id "experience" rather than one entry per top-level key.
    parser: (text) => {
      const data = JSON.parse(text) as Record<string, unknown>;
      return [{ id: 'experience', ...data }];
    },
  }),
  schema: z.object({
    roles: z
      .array(
        z.object({
          org: z.string(),
          role: z.string(),
          period: z.string(),
          location: z.string(),
          summary: z.string(),
          highlights: z.array(z.string()).max(4).default([]),
          links: z.array(link).default([]),
        })
      )
      .default([]),
    open_source: z
      .array(
        z.object({
          project: z.string(),
          url: z.url(),
          what: z.string(),
          link: link.nullable().default(null),
        })
      )
      .default([]),
  }),
});

export const collections = { projects, writing, now, experience };
