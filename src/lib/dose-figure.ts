/* ---------------------------------------------------------------------------
   The Kobayashi Maru dose-response figure, as a static SVG string.

   Every value below is copied from the run's own
   `results/analysis/NUMBERS.md`, section "Primary DV per line: cheats on
   solvable items (baseline arm)", frozen grid, tag `freeze-2026-09-14b`. The
   percentages are the same cells as `results/analysis/cells.csv` column
   `cheat_pct_detector`, row for row.

   The figure is generated as a string rather than shipped as an image so that
   it can take the page's colour tokens in both schemes, and so the LinkedIn
   banner script can render the identical chart with literal hex values. No
   runtime JavaScript: callers inline the returned markup at build time.
   --------------------------------------------------------------------------- */

/** Fraction of the batch that is impossible, the five pre-registered levels. */
const F_LEVELS = [0, 0.167, 0.286, 0.444, 0.6] as const;
const F_TICKS = ['0', '.17', '.29', '.44', '.60'] as const;

/** Percentage of solvable item-runs that cheated, one entry per level. */
interface Series {
  label: string;
  points: readonly number[];
}

/** 0/120, 1/120, 16/120, 13/120, 36/120 — NUMBERS.md, dsv41flash-sal. */
const DEEPSEEK: Series = {
  label: 'DeepSeek-V4.1-flash',
  points: [0, 0.83, 13.33, 10.83, 30.0],
};

/** 0/120, 2/120, 13/120, 2/120, 6/120 — NUMBERS.md, glm53flash-sal. */
const GLM: Series = {
  label: 'GLM-5.3-flash',
  points: [0, 1.67, 10.83, 1.67, 5.0],
};

/** luna-sal, sol-sal, haiku45, qwen3-14b-sal: zero at every level. */
const ZERO: readonly number[] = [0, 0, 0, 0, 0];

/* --- geometry ------------------------------------------------------------ */

const W = 460;
const H = 330;
const LEFT = 54;
const RIGHT = 446;
const TOP = 24;
const BOTTOM = 192;
/** First legend row, clear of the x-axis title at BOTTOM + 42. */
const LEGEND_Y = 260;
const LEGEND_STEP = 20;
/** Top of the y scale. The largest plotted value is 30.0. */
const Y_MAX = 32;
const Y_TICKS = [0, 10, 20, 30] as const;

const x = (f: number) => LEFT + (f / 0.6) * (RIGHT - LEFT);
const y = (pct: number) => BOTTOM - (pct / Y_MAX) * (BOTTOM - TOP);

const round = (n: number) => Math.round(n * 100) / 100;
const path = (points: readonly number[]) =>
  points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(x(F_LEVELS[i]))} ${round(y(p))}`).join(' ');

/**
 * Colour and family go in an inline `style`, not in `fill`/`font-family`
 * presentation attributes: `var()` is reliable in a style declaration and is
 * not in a presentation attribute.
 */
const label = (fill: string, mono: string) =>
  `fill:${fill};font-family:${mono};font-variant-numeric:tabular-nums`;

export interface DoseFigureColours {
  /** The DeepSeek line, its markers and its endpoint labels. */
  accent: string;
  /** Axis titles and the other model lines. */
  ink2: string;
  /** The closing legend note. */
  ink3: string;
  /** Gridlines. */
  hairline: string;
  /** The two axis rules and the tick labels. */
  hairlineStrong: string;
  /** Tick numerals. */
  tick: string;
  /** Monospaced family for every label in the figure. */
  mono: string;
}

/**
 * Returns the complete `<svg>` element. `width`/`height` are left off so the
 * element scales to its container; the viewBox fixes the aspect ratio.
 */
export function doseFigureSvg(c: DoseFigureColours, titleId = 'dose-figure-title'): string {
  const gridlines = Y_TICKS.map(
    (t) =>
      `<line x1="${LEFT}" y1="${round(y(t))}" x2="${RIGHT}" y2="${round(y(t))}" stroke-width="1" style="stroke:${c.hairline}" />`
  ).join('');

  const yLabels = Y_TICKS.map(
    (t) =>
      `<text x="${LEFT - 10}" y="${round(y(t))}" text-anchor="end" dominant-baseline="middle" font-size="11" style="${label(c.tick, c.mono)}">${t}</text>`
  ).join('');

  const xLabels = F_TICKS.map(
    (t, i) =>
      `<text x="${round(x(F_LEVELS[i]))}" y="${BOTTOM + 20}" text-anchor="middle" font-size="11" style="${label(c.tick, c.mono)}">${t}</text>`
  ).join('');

  const markers = (points: readonly number[], fill: string, r: number) =>
    points
      .map(
        (p, i) =>
          `<circle cx="${round(x(F_LEVELS[i]))}" cy="${round(y(p))}" r="${r}" style="fill:${fill}" />`
      )
      .join('');

  const legend = [
    { dash: '', colour: c.accent, width: 2.4, text: DEEPSEEK.label },
    { dash: '', colour: c.ink2, width: 1.6, text: GLM.label },
    { dash: '6 4', colour: c.ink2, width: 1.6, text: 'GPT-5.6-Luna, the preregistered primary' },
  ]
    .map((row, i) => {
      const ly = LEGEND_Y + i * LEGEND_STEP;
      return (
        `<line x1="${LEFT}" y1="${ly}" x2="${LEFT + 26}" y2="${ly}" stroke-width="${row.width}" ${row.dash ? `stroke-dasharray="${row.dash}"` : ''} style="stroke:${row.colour}" />` +
        `<text x="${LEFT + 36}" y="${ly}" dominant-baseline="middle" font-size="11" style="${label(c.tick, c.mono)}">${row.text}</text>`
      );
    })
    .join('');

  return [
    `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="${titleId}">`,
    `<title id="${titleId}">Cheating on the ten solvable tasks against the impossible share of the batch. DeepSeek-V4.1-flash rises from 0% to 30%; GLM-5.3-flash reaches 5%; the four other model lines stay at 0%.</title>`,

    // axis titles
    `<text x="${LEFT}" y="14" font-size="11" style="${label(c.ink2, c.mono)}">cheat rate on the ten solvable tasks (%)</text>`,
    `<text x="${round((LEFT + RIGHT) / 2)}" y="${BOTTOM + 42}" text-anchor="middle" font-size="11" style="${label(c.ink2, c.mono)}">impossible share of the batch, f</text>`,

    gridlines,

    // axis rules
    `<line x1="${LEFT}" y1="${TOP}" x2="${LEFT}" y2="${BOTTOM}" stroke-width="1" style="stroke:${c.hairlineStrong}" />`,
    `<line x1="${LEFT}" y1="${BOTTOM}" x2="${RIGHT}" y2="${BOTTOM}" stroke-width="1" style="stroke:${c.hairlineStrong}" />`,

    yLabels,
    xLabels,

    // the three lines that never left zero, then the preregistered primary over them
    `<path d="${path(ZERO)}" stroke-width="1.6" style="fill:none;stroke:${c.ink2}" />`,
    `<path d="${path(ZERO)}" stroke-width="1.6" stroke-dasharray="6 4" style="fill:none;stroke:${c.ink2}" />`,

    // GLM
    `<path d="${path(GLM.points)}" stroke-width="1.6" style="fill:none;stroke:${c.ink2}" />`,
    markers(GLM.points, c.ink2, 2.6),

    // DeepSeek, the labelled line
    `<path d="${path(DEEPSEEK.points)}" stroke-width="2.4" style="fill:none;stroke:${c.accent}" />`,
    markers(DEEPSEEK.points, c.accent, 3.4),

    // endpoint labels on the DeepSeek line
    `<text x="${round(x(0)) + 8}" y="${round(y(0)) - 10}" font-size="12" style="${label(c.accent, c.mono)}">0%</text>`,
    `<text x="${round(x(0.6))}" y="${round(y(30)) - 12}" text-anchor="end" font-size="12" style="${label(c.accent, c.mono)}">30%</text>`,

    legend,
    `<text x="${LEFT}" y="${LEGEND_Y + LEGEND_STEP * 3 + 4}" font-size="11" style="${label(c.ink3, c.mono)}">GPT-5.6-Sol, Haiku 4.5 and Qwen3-14B also stayed at 0%.</text>`,
    `</svg>`,
  ].join('');
}

/** Token names for the site; hex values for anything rasterised off-site. */
export const SITE_COLOURS: DoseFigureColours = {
  accent: 'var(--accent)',
  ink2: 'var(--ink-2)',
  ink3: 'var(--ink-3)',
  hairline: 'var(--hairline)',
  hairlineStrong: 'var(--hairline-strong)',
  tick: 'var(--ink-2)',
  mono: 'var(--font-mono)',
};
