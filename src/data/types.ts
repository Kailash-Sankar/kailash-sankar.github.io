export interface WritingPost {
  date: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
}

export interface Project {
  name: string;
  /** Written for the card, not copied from the repo's own description. */
  description: string;
  href: string;
  /** Shown where a writing card shows its date. */
  language: string;
  stack: string[];
  /** Set only where the project has something publicly reachable to look at. */
  demo?: string;
}
