// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var caseStudies = defineCollection({
  name: "caseStudies",
  directory: "content/case-studies",
  include: "**/*.md",
  schema: z.object({
    order: z.number(),
    title: z.string(),
    tagline: z.string(),
    industry: z.string(),
    label: z.string(),
    problem: z.string(),
    solution: z.string(),
    tech: z.array(z.string()),
    chain: z.array(z.string()),
    designTargets: z.array(z.string()),
    panels: z.array(
      z.enum(["workflow", "pipeline", "chat", "calendar", "report", "funnel", "voice"])
    ),
    content: z.string()
  })
});
var content_collections_default = defineConfig({
  collections: [caseStudies]
});
export {
  content_collections_default as default
};
