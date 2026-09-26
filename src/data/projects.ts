import type { Project } from "./types";

/** The rest of the shelf, linked from the section heading rather than given a
 *  card of its own — it was never a project, and numbering it made it look
 *  like the third thing built. */
export const projectProfileUrl = "https://github.com/Kailash-Sankar";

export const projects: Project[] = [
  {
    name: "systems-labs",
    description:
      "A systems engineering playground, and where most of the notes on this site started as experiments.",
    href: "https://github.com/Kailash-Sankar/systems-labs",
    language: "Python",
    stack: ["Systems", "Python"],
  },
  {
    name: "PocketMCP",
    description:
      "A local-first MCP server with a web UI, built while the protocol was new enough that writing one was the fastest way to learn it.",
    href: "https://github.com/Kailash-Sankar/PocketMCP",
    language: "TypeScript",
    stack: ["MCP", "TypeScript"],
  },
  {
    name: "dev-tools",
    description:
      "Small tools for dev and QE teams that run without analytics or data collection, so nothing leaves the machine.",
    href: "https://github.com/Kailash-Sankar/dev-tools",
    language: "TypeScript",
    stack: ["Tooling", "TypeScript"],
    demo: "https://pandoras-tool-box.vercel.app",
  },
];
