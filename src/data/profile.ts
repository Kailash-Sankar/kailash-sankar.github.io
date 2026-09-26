/** Single source of truth for identity, copy, and outbound links. */

export const profile = {
  name: "Kailash Sankar",
  email: "kailash.sankar@outlook.com",
  /** Hero eyebrow is intentionally absent: the headline and intro carry the
   *  introduction. Focus areas live in the About section instead. */

  tagline: "Making useful things, one thoughtful step at a time.",
  intro:
    "I'm Kailash Sankar. I've spent 15 years shipping software that has to hold up in the real world.",
  /** Stated once, as scannable items, rather than repeated in prose. */
  focusAreas: ["AI agents", "Evaluation", "Observability", "Web systems"],
  about: [
    "More broadly, I care about systems that are useful, observable, and safe to operate — the kind that stay comprehensible long after launch.",
    "When I'm away from a screen, I'm probably tinkering in my home lab, reading, or out walking Luna.",
  ],
} as const;

export const social = {
  github: "https://github.com/Kailash-Sankar",
  linkedin: "https://www.linkedin.com/in/kailash-sankar/",
} as const;

/** Sections shown in the top nav, in order. */
export const navLinks = [
  { label: "Writing", href: "#writing" },
  { label: "Work", href: "#work" },
  { label: "Say hello", href: "#contact", external: true },
] as const;
