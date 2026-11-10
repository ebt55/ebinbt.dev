/** Site-wide metadata. Page copy lives in src/content/home.ts. */
export const site = {
  name: 'Ebin Babu Thomas',
  url: 'https://ebinbt.dev',
  /** Meta description. */
  description:
    'Ebin Babu Thomas, AI engineer in Kerala, India. Experiments on how AI agents behave and whether the monitors that watch them get it right, with code and data.',
  /** The one line of role text on the OG card. */
  role: 'AI engineer · experiments on AI agents and their monitors',
  /** Admonymous page for anonymous feedback, shown in the footer as "Anonymous feedback".
   *  null hides the link. Set it to the page made at admonymous.co (e.g. https://www.admonymous.co/<name>). */
  feedbackUrl: "https://www.admonymous.co/ebin" as string | null,
  analyticsToken: process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;

export type Site = typeof site;
