/** Types for the single-page home content in src/content/home.ts. */

export interface Link {
  label: string;
  href: string;
}

/** One piece of work in Research or Software. `slug` doubles as the anchor id on the home page. */
export interface Entry {
  slug: string;
  /** Small accent label in the left column, e.g. "Nov 2026". */
  when: string;
  title: string;
  /** Where the title links: usually the write-up, a /work/<slug>/ page, or the repo. */
  href: string;
  /** Small muted line under the title, e.g. "Apart Research · hackathon · top 10% of 179". */
  context?: string;
  /** One or two sentences. Inline markdown. */
  summary: string;
  /** Small row under the summary, rendered as `write-up / code / data`. */
  links: Link[];
}

export interface WorkSection {
  entries: Entry[];
  /** Lower-priority entries, shown under a "More" disclosure. */
  more?: Entry[];
}

export interface Update {
  when: string;
  /** One sentence. Inline markdown. */
  text: string;
}

export interface Role {
  when: string;
  org: string;
  role: string;
  /** One or two sentences. Inline markdown. */
  text: string;
  links?: Link[];
}

export interface Home {
  profile: {
    name: string;
    photo: string;
    photoAlt: string;
    /** Two or three short paragraphs. Inline markdown. */
    intro: string[];
    /** The Email · CV · GitHub · LinkedIn row. */
    links: Link[];
    /** YYYY-MM-DD, shown in the footer. */
    updated: string;
  };
  updates: Update[];
  /** How many updates show before the "Earlier updates" disclosure. */
  updatesShown: number;
  research: WorkSection;
  software: WorkSection;
  /** One line each. Inline markdown. */
  openSource: string[];
  experience: Role[];
}
