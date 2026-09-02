# AGENTS.md

Portfolio site for Wovie Prollo, positioned as a **GoHighLevel CRM & AI Automation
Specialist**. Read this before editing — the content model and the honesty rules below
are the parts that are easy to break.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start (React 19, TanStack Router v1, file-based routes) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Content | Content Collections — markdown + zod frontmatter |
| Forms | Netlify Forms |
| Language | TypeScript, strict, `@/*` → `src/*` |

There is no database, no server function, and no AI runtime in this project. The only
network call the site makes is the contact-form POST.

## Directory map

```
content/case-studies/*.md      Five case studies. Frontmatter drives the whole page.
content-collections.ts         Single `caseStudies` collection + zod schema.
public/__forms.html            Static skeleton so Netlify registers the form at build time.
src/data/site.ts               Positioning copy, 8 services, the 8-stage flow, résumé data.
src/components/primitives.tsx  SectionMark, Panel, Tag, MockHeader, Rule.
src/components/site-chrome.tsx SiteNav + SiteFooter (rendered by the root shell).
src/components/system-flow.tsx SystemFlowCompact, SystemFlowFull, ChainStrip.
src/components/mockups.tsx     Seven system diagrams + `panelRegistry`.
src/routes/__root.tsx          Document shell: fonts, meta, atmosphere layers, nav, footer, 404.
src/routes/index.tsx           Home.
src/routes/services.tsx        Services.
src/routes/systems.tsx         Systems — full flow plus one section per layer.
src/routes/case-studies/       index.tsx (list) and $slug.tsx (detail).
src/routes/about.tsx           Résumé.
src/routes/contact.tsx         Enquiry form.
src/styles.css                 Theme tokens, keyframes, custom utilities, prose styles.
```

## Content model

`content-collections.ts` defines one collection, `caseStudies`, exported as
`allCaseStudies`. Every field in the frontmatter is required — a missing field fails the
build, which is intentional. `panels` is a zod enum whose keys must exist in
`panelRegistry` in `src/components/mockups.tsx`; adding a new diagram means adding it to
both.

Positioning copy is deliberately centralised in `src/data/site.ts` (`identity`,
`services`, `flowStages`, `coreExpertise`, `accomplishments`, `workingMethod`,
`navigation`). Change the headline there, not in a route.

## Honesty rules — do not break these

These are content constraints the site was built around, not stylistic preferences.

1. **No invented metrics.** Case studies list `designTargets` — what the system is built
   and tested to guarantee — never "increased bookings by 40%". If real client numbers
   arrive, publish them with the account they came from.
2. **Demo work is labelled.** Every case study carries `label: "Demo Build"`. Only change
   that on a study that genuinely became client work.
3. **No fake screenshots.** The panels in `mockups.tsx` are diagrams, and each one renders
   a `MockHeader` note saying so ("Illustrative — sample data", "Diagram of the build").
   Keep that note if you edit a panel; remove it only when the panel shows a real capture.
4. **No stock headshot.** The template's placeholder photo was deleted. The only photo on
   the site is `public/wovie-prollo.png`, a real supplied studio portrait (framing-cropped
   to 4:5 at 514x643, subject centred), shown large in the About page header through the
   Netlify Image CDN (`/.netlify/images`) and captioned "Photograph". Its white studio
   backdrop is intentional: the frame sits on a `bg-paper` plate and fades into `ink-850`
   at the bottom edge so it reads as part of the console, not a pasted rectangle. Elsewhere identity is carried by the `WP` monogram in the nav. Never
   substitute a stock or generated image for it.

## Design system

The aesthetic is a dark "signal room" console: cool near-black ground, paper-white ink,
warm amber `--signal` for anything that moves (leads, triggers, actions), cool
`--wire` for connective structure, `--moss` for terminal/positive states.

- Tokens live in `:root` in `src/styles.css` and are exposed to Tailwind through
  `@theme inline` — so `bg-ink-850`, `text-signal`, `border-ink-700` all work.
- Typography: `font-display` = Bricolage Grotesque, `font-sans` = Karla,
  `font-mono` = JetBrains Mono (loaded from Google Fonts in `__root.tsx`).
  Monospace is reserved for labels, indices and metadata — never body copy.
- Custom utilities: `label-mono` (the uppercase micro-label used everywhere),
  `grid-field`, `hero-glow`, `hairline`, `stagger`.
- Section headers use `SectionMark` with a two-digit index. Page hero elements use
  `stagger` with an inline `animationDelay` for the load-in cascade.
- Animate `transform`/`opacity` only. The grid and glow layers are `fixed` and
  `pointer-events-none` in the root shell — never put them inside a scroller.

### Charts

`ReportPanel` in `mockups.tsx` contains stat tiles and a single-series column chart. It
follows fixed specs: bars ≤ 24px wide with a 4px rounded top and a square baseline, a
hairline recessive axis, one endpoint label rather than a value on every bar, no legend
(single series), and values in text tokens rather than the series colour. Keep those if
you touch it.

## Netlify Forms

The form is named `project-enquiry` in three places that must stay in sync:

1. `public/__forms.html` — the static skeleton Netlify parses at build time. **Every field
   the React form submits must exist here** or the submission is rejected.
2. `FORM_NAME` in `src/routes/contact.tsx`, including the hidden `form-name` input.
3. The `fetch` target, which must be `/__forms.html` — posting to `/` is swallowed by the
   SSR handler and never reaches Netlify's form processing.

The feature was activated with the `netlify-forms` skill's `scripts/enable.cjs`; if the
form is ever renamed or re-added, run that script again.

## Conventions

- Components PascalCase, data/util modules camelCase, route files kebab-case.
- Import with the `@/` alias, not relative paths, outside of same-folder imports.
- `cn()` from `@/lib/utils` for conditional classes.
- Type-only imports use the `type` keyword (`noUnusedLocals` is on — dead imports fail
  typecheck).
- Prefer adding a field to `src/data/site.ts` over hardcoding copy in a route.

## Commands

```bash
pnpm dev      # vite dev on :3000
pnpm build    # production build
```

Forms do not work under `vite dev`; use `netlify dev --port 8889` or a deploy preview.
