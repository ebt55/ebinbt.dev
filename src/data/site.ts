export const site = {
  name: "Ebin Babu Thomas",
  shortName: "Ebin",
  title: "AI Engineer — agent reliability, AI control & evaluation",
  headline: "I build the gates, then measure what they stop.",
  intro:
    "I work on AI control and evaluation: agents whose evidence cannot be fabricated, durable human approval over tool calls, and preregistered behavioural experiments on open models. Before that, three and a half years shipping LLM, RAG and agent backends for startup clients in four countries. I publish the failures next to the passes.",
  description:
    "Ebin Babu Thomas, AI engineer — agent reliability, AI control and evaluation. Agents whose evidence cannot be fabricated, measured under process kills.",
  url: "https://ebinbt.dev",
  email: "ebinbabuthomas@gmail.com",
  location: "Kerala, India",
  timezone: "IST (UTC+5:30)",
  remote: true,
  socials: {
    github: "https://github.com/ebt55",
    linkedin: "https://www.linkedin.com/in/ebinbt",
    peerlist: "https://peerlist.io/ebinbt",
    kaggle: "https://www.kaggle.com/ebinbt007",
    huggingface: "https://huggingface.co/ebt005" as string | null,
  },
  bookingUrl: null as string | null,
  repoUrl: "https://github.com/ebt55/ebinbt.dev",
  resumePath: "/resume.pdf",
  proof: [
    {
      value: "434/434",
      label: "agent runs recovered after being killed mid-action",
      href: "/work/incidentgate/",
    },
    {
      value: "$0.02–$0.19",
      label: "per review that takes a person 20–40 minutes",
      href: "/work/proofpack/",
    },
    {
      value: "65.8%",
      label: "of distress language trained away; the behaviour underneath stayed",
      href: "/work/digital-grimace-scale/",
    },
    {
      value: "16/16",
      label: "PDFs converted to editable Word, checked by re-rendering",
      href: "/work/exactdoc/",
    },
  ],
  principles: [
    {
      title: "Claims cite a run",
      body: "Every number I publish points at a committed artifact and the command that produced it, or it does not go up.",
    },
    {
      title: "Failures get published",
      body: "The preregistered test that failed sits in the repository under its own heading, next to the one that worked.",
    },
    {
      title: "Humans keep the decision",
      body: "A model can propose and a monitor can flag, but nothing mutates without a single-use token a person minted.",
    },
  ],
  availability:
    "I take on contract work in agent reliability, evaluation and LLM backends, and I consider full-time and research-fellowship roles — remote from Kerala, India (IST), overlapping US mornings and EU afternoons.",
  analyticsToken: import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? null,
} as const;
