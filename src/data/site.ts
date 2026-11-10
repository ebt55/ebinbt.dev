/** Site-wide metadata. Page copy lives in src/content/home.ts. */
export const site = {
  name: 'Ebin Babu Thomas',
  url: 'https://ebinbt.dev',
  /** Meta description. PLACEHOLDER — will be replaced. */
  description:
    'Ebin Babu Thomas, AI engineer in Kerala, India. Public experiments on how AI agents behave, and the tools that check them.',
  /** The one line of role text on the OG card. PLACEHOLDER — will be replaced. */
  role: 'AI engineer · agent evaluations',
  analyticsToken: process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;

export type Site = typeof site;
