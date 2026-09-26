import type { WritingPost } from "./types";

export const writing: WritingPost[] = [
  {
    date: "Sep 2026",
    title: "Evaluating an MCP Server",
    description:
      "Building an evaluation suite for an MCP server that hands a product's data to an AI agent.",
    tags: ["AI", "MCP", "Evals"],
    href: "https://dev.to/ksankar/evaluating-an-mcp-server-k5b",
  },
  {
    date: "Mar 2026",
    title: "Defense in Depth: Tenant Isolation for an Agent",
    description:
      "Five layers of security designed to prevent cross-tenant data leaks in a code-executing agent.",
    tags: ["Agents", "AI", "Security"],
    href: "https://dev.to/ksankar/defense-in-depth-tenant-isolation-for-an-agent-that-executes-code-375j",
  },
  {
    date: "Mar 2026",
    title: "What I Learned Adding Memory to AI Agents",
    description:
      "Notes from building agent memory systems with a lot of prompting, directing, and iteration.",
    tags: ["AI", "Agents", "Memory"],
    href: "https://dev.to/ksankar/what-i-learned-adding-memory-to-ai-agents-1eh2",
  },
];

export const writingProfileUrl = "https://dev.to/ksankar";
