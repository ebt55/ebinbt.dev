/** The three work lanes, shared by the home page, /work/ and /work/<slug>/. */

export const LANES = [
  {
    id: 'research',
    title: 'Experiments on AI agents and models',
    intro: 'Each one asks a question about how AI agents or models behave, and publishes the answer with its code, data and limits.',
  },
  {
    id: 'control',
    title: 'Tools I built',
    intro: 'Software you can install or run, with what it does well and where it falls short.',
  },
  {
    id: 'oss',
    title: 'Open source',
    intro: 'Small libraries and contributions to other projects.',
  },
] as const;

export type LaneId = (typeof LANES)[number]['id'];

/** Meta description for /work/. The page itself carries no lede. */
export const WORK_DESCRIPTION =
  'Experiments on AI agents and models, and the tools I built, each with its code and its limits.';

export const LANE_LABEL: Record<string, string> = Object.fromEntries(
  LANES.map((l) => [l.id, l.title])
);

/** Flat display order across lanes, used for prev/next on detail pages. */
export const LANE_RANK: Record<string, number> = Object.fromEntries(
  LANES.map((l, i) => [l.id, i])
);
