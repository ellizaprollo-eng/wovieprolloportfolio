# Wovie Prollo — GoHighLevel CRM & AI Automation Specialist

A positioning-led portfolio site. Rather than listing tools, it leads with the systems
being sold: complete GoHighLevel CRM builds, sales pipelines, workflow automation,
funnels, AI chat and Voice AI, appointment automation, and integrations via API,
webhooks, Zapier, Make and n8n.

## Pages

| Route | What it does |
| --- | --- |
| `/` | Hero positioning, the lead-to-customer chain, eight services, case study index, core expertise |
| `/services` | The eight services with concrete deliverables per service, plus how a build runs |
| `/systems` | The full annotated lead-to-customer system, then each layer shown as a diagram |
| `/case-studies` | Five complete demo systems, each with its problem, solution, tech and chain |
| `/case-studies/$slug` | Full case study: problem, solution, design targets, build notes, system diagrams |
| `/about` | Résumé — professional summary, core expertise, accomplishments, working method |
| `/contact` | Project enquiry form (Netlify Forms) with inline validation |

## Tech

- **TanStack Start** (React 19 + TanStack Router, file-based routes in `src/routes/`)
- **Vite 7** for build and dev
- **Tailwind CSS 4** — theme tokens declared in `src/styles.css` via `@theme inline`
- **Content Collections** — case studies are type-safe markdown in `content/case-studies/`
- **Netlify Forms** — the contact form, registered at build time via `public/__forms.html`
- **TypeScript** in strict mode, `@/*` path alias for `src/*`

No database, no server functions, no external services. Every page is static apart from
the form POST, which Netlify handles.

## Running locally

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Or through the Netlify CLI, which emulates Forms and the rest of the platform:

```bash
netlify dev --port 8889
```

Form submissions only reach Netlify on a deployed site (or a deploy preview) — in plain
`vite dev` the POST to `/__forms.html` will fail and the form shows its error state.

```bash
pnpm build         # production build into dist/
```

## Editing content

**Case studies** live in `content/case-studies/*.md`. Frontmatter drives the whole page:

```yaml
order: 1                # sort position, also shown as "Project #1"
title: "…"
tagline: "…"
industry: "Real Estate"
label: "Demo Build"     # honest labelling — change only when it becomes client work
problem: "…"
solution: "…"
tech: ["GoHighLevel", "Webhooks"]
chain: ["Facebook lead ad", "GHL contact + opportunity"]
designTargets: ["…"]    # what the build guarantees, not borrowed statistics
panels: [workflow, chat, pipeline, calendar]
```

`panels` selects which system diagrams render on that case study. Valid keys:
`workflow`, `pipeline`, `chat`, `calendar`, `report`, `funnel`, `voice`.

The markdown body below the frontmatter becomes the **Build notes** section.

**Services, positioning, the flow diagram and résumé copy** live in `src/data/site.ts`.

**Adding real screenshots.** The panels in `src/components/mockups.tsx` are diagrams of
the architecture, labelled as such so nothing reads as a fake screenshot. To swap in real
captures from a live sub-account, drop images in `public/` and replace the relevant panel
component's body with an `<img>` inside the same `figure`/`MockHeader` shell.
