/**
 * Site-wide constants.
 *
 * SEED FILE — authored by the scaffold agent so every component renders with
 * realistic data. Strings that are invented copy carry a literal `seed:` prefix
 * and are replaced wholesale by the content agent's `content-staging/src/data/site.ts`
 * in phase 2. Identity facts, project names and all numbers are real.
 */
export const site = {
  name: 'Ebin Babu Thomas',
  shortName: 'Ebin',
  title: 'AI Engineer — agent reliability, AI control & evaluation',
  headline: 'seed: I build agent systems that fail loudly, and measure how they fail.',
  intro:
    'seed: Three and a half years shipping 0→1 LLM, RAG and agent backends for startups ' +
    'in four countries, now spending the bench time on control experiments: crash-recovery ' +
    'harnesses, deterministic document tooling, and measurements of what models do when ' +
    'nobody is watching.',
  description:
    'seed: Ebin Babu Thomas — AI engineer working on agent reliability, AI control and ' +
    'model-behaviour evaluation. Control experiments, deterministic tooling, published numbers.',
  url: 'https://ebinbt.dev',
  email: 'ebinbabuthomas@gmail.com',
  location: 'Kerala, India',
  timezone: 'IST (UTC+5:30)',
  remote: true,
  socials: {
    github: 'https://github.com/ebt55',
    linkedin: 'https://www.linkedin.com/in/ebinbt',
    peerlist: 'https://peerlist.io/ebinbt',
    kaggle: 'https://www.kaggle.com/ebinbt007',
    huggingface: null as string | null,
  },
  bookingUrl: null as string | null,
  repoUrl: 'https://github.com/ebt55/ebinbt.dev',
  resumePath: '/resume.pdf',

  /** Exactly 4 rows — the hero proof ledger. */
  proof: [
    {
      value: '434/434',
      label: 'kill-point recoveries, 0 duplicate mutations',
      href: '/work/incidentgate/',
    },
    {
      value: '16/16',
      label: 'seed: corpus documents reproduced byte-for-byte, 663 tests green',
      href: '/work/exactdoc/',
    },
    {
      value: '65.8%',
      label: 'seed: expression-class accuracy at −2.90 nats',
      href: '/work/digital-grimace-scale/',
    },
    {
      value: '$0.02–0.19',
      label: 'seed: per automated review, ~3 min instead of 20–40',
      href: '/work/proofpack/',
    },
  ],

  /** Exactly 3. */
  principles: [
    {
      title: 'Claims cite runs',
      body: 'seed: Every number on this site points at a run log, a test suite or a notebook in a public repo. If it cannot be re-run, it does not get a number.',
    },
    {
      title: 'Failures get published',
      body: 'seed: Negative results and known limitations ship with the work, in the same README, not in a follow-up nobody writes.',
    },
    {
      title: 'Humans keep the decision',
      body: 'seed: Systems I build surface evidence and stop; they do not take the irreversible action on their own.',
    },
  ],

  availability:
    'seed: Taking on one or two focused engagements at a time in agent reliability and evaluation work, alongside the research above.',

  analyticsToken: (import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null) as string | null,
} as const;

export type Site = typeof site;
