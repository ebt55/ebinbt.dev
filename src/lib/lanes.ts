/** The two work lanes, shared by /work/ and /work/<slug>/. */

export const LANES = [
  {
    id: 'research',
    title: 'Research',
    intro:
      'Preregistered experiments on what safeguards and evaluations catch when an agent misbehaves, published with their failed tests.',
  },
  {
    id: 'tools',
    title: 'Tools',
    intro: 'Software I maintain, and fixes that landed in other people’s repositories.',
  },
] as const;

export const WORK_INTRO =
  'Each one links to its repository and, where one exists, its write-up. Limitations are on the page, not in a footnote.';

export const LANE_LABEL: Record<string, string> = Object.fromEntries(
  LANES.map((l) => [l.id, l.title])
);

/** Flat display order across lanes, used for prev/next on detail pages. */
export const LANE_RANK: Record<string, number> = Object.fromEntries(
  LANES.map((l, i) => [l.id, i])
);
