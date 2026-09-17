/** The three work lanes, shared by the home page, /work/ and /work/<slug>/. */

export const LANES = [
  {
    id: 'control',
    title: 'AI control & agent reliability',
    intro:
      'Agents that must cite evidence and ask a person before changing anything, and harnesses that measure what the safeguards actually stop.',
  },
  {
    id: 'research',
    title: 'Model behaviour research',
    intro: 'Preregistered experiments on open models, published with their failed tests.',
  },
  {
    id: 'oss',
    title: 'Open source',
    intro: 'Tools I maintain, and fixes that landed in other people’s repositories.',
  },
] as const;

export type LaneId = (typeof LANES)[number]['id'];

export const WORK_INTRO =
  'Each one links to its repository and, where one exists, its write-up. Limitations are on the page, not in a footnote.';

export const LANE_LABEL: Record<string, string> = Object.fromEntries(
  LANES.map((l) => [l.id, l.title])
);

/** Flat display order across lanes, used for prev/next on detail pages. */
export const LANE_RANK: Record<string, number> = Object.fromEntries(
  LANES.map((l, i) => [l.id, i])
);
