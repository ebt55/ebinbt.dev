/** The three work lanes, shared by the home page, /work/ and /work/<slug>/. */

export const LANES = [
  {
    id: 'control',
    title: 'Agent safeguards & reliability',
    intro: 'An evidence-gated review agent, and a lab for per-call safeguards.',
  },
  {
    id: 'research',
    title: 'Model behaviour research',
    intro: 'Experiments on model behaviour, most with a preregistration.',
  },
  {
    id: 'oss',
    title: 'Open source',
    intro: 'Two tools, one merged PR and one proposal.',
  },
] as const;

export type LaneId = (typeof LANES)[number]['id'];

/** Meta description for /work/. The page itself carries no lede. */
export const WORK_DESCRIPTION =
  'Evaluations of agents and models, each with its repository and its limits.';

export const LANE_LABEL: Record<string, string> = Object.fromEntries(
  LANES.map((l) => [l.id, l.title])
);

/** Flat display order across lanes, used for prev/next on detail pages. */
export const LANE_RANK: Record<string, number> = Object.fromEntries(
  LANES.map((l, i) => [l.id, i])
);
