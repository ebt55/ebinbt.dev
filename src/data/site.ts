export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "AI engineer · agent evaluations",
  /** The hero eyebrow, above the name. */
  eyebrow: "AI engineer · agent evaluations",
  headline: "I build AI software and test how AI agents behave.",
  intro:
    "I spent three and a half years building LLM, search and backend systems for startups in the US, Canada, Europe and Australia. Since March 2026 I've worked on my own on AI safety, testing AI agents and the tools meant to check them. Every project here is public, with its code, its data and what it can't show.",
  /** A quieter line under the intro: the one side interest. */
  aside:
    "Side interest: protein structure models, and what they still miss.",
  description:
    "Ebin Babu Thomas, AI engineer in Kerala, India. Public experiments on how AI agents and models behave, and the tools I've built, each with its code and its limits.",
  /** The line the OG card and the LinkedIn banner lead with. */
  ogFinding:
    "Public experiments on how AI agents and models behave, and the software behind them. Each one with its code, its data and its limits.",
  url: "https://ebinbt.dev",
  email: "hello@ebinbt.dev",
  location: "Kerala, India",
  timezone: "UTC+5:30",
  remote: true,
  socials: {
    github: "https://github.com/ebt55",
    linkedin: "https://www.linkedin.com/in/ebinbt",
    peerlist: "https://peerlist.io/ebinbt",
    kaggle: "https://www.kaggle.com/ebinbt007",
    huggingface: "https://huggingface.co/ebt005" as string | null,
  },
  bookingUrl: "https://cal.com/ebinbt" as string | null,
  // Set to null if the source repo is kept private — the footer link then disappears.
  repoUrl: "https://github.com/ebt55/ebinbt.dev" as string | null,
  resumePath: "/resume.pdf",
  /** The first two hrefs pick the two hero cards (a blind ranking chose these, 27 Oct 2026). */
  proof: [
    {
      value: "0% → 30%",
      label: "cheating on tasks one model could do honestly, once impossible tasks were added to its batch",
      href: "/work/kobayashi-maru/",
    },
    {
      value: "~30x",
      label: "faster than real time, transcribing meetings with speaker labels on my own PC",
      href: "/work/diarist/",
    },
  ],
  availability:
    "I'm looking for a research engineer role at an AI safety organisation, an AI engineer role, or a research fellowship. Remote or on-site. Based in Kerala, India.",
  analyticsToken: process.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;

export type Site = typeof site;
