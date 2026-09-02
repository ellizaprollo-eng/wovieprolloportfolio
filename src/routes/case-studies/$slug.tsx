import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { allCaseStudies } from 'content-collections'
import { marked } from 'marked'
import { ArrowLeft, ArrowRight, Target } from 'lucide-react'
import { Panel, SectionMark, Tag } from '@/components/primitives'
import { ChainStrip } from '@/components/system-flow'
import { panelRegistry } from '@/components/mockups'
import { identity } from '@/data/site'

export const Route = createFileRoute('/case-studies/$slug')({
  loader: ({ params }) => {
    const study = allCaseStudies.find((s) => s._meta.path === params.slug)
    if (!study) throw notFound()

    const ordered = [...allCaseStudies].sort((a, b) => a.order - b.order)
    const next = ordered[(ordered.findIndex((s) => s._meta.path === study._meta.path) + 1) % ordered.length]

    return { study, html: marked(study.content) as string, next }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.study.title} — ${identity.name}` },
          { name: 'description', content: loaderData.study.tagline },
        ]
      : [],
  }),
  component: CaseStudy,
})

function CaseStudy() {
  const { study, html, next } = Route.useLoaderData()

  return (
    <article>
      <header className="mx-auto max-w-6xl px-5 pt-12 pb-10 lg:px-8 lg:pt-16">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper-faint transition-colors hover:text-signal"
        >
          <ArrowLeft size={13} strokeWidth={2.5} />
          All case studies
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.6875rem] text-signal-deep">
            Project #{study.order}
          </span>
          <Tag tone="wire">{study.industry}</Tag>
          <Tag>{study.label}</Tag>
        </div>

        <h1 className="stagger mt-5 max-w-4xl font-display text-4xl leading-[1.06] font-extrabold text-paper sm:text-5xl">
          {study.title}
        </h1>
        <p
          className="stagger mt-5 max-w-2xl text-lg leading-relaxed text-paper-dim"
          style={{ animationDelay: '80ms' }}
        >
          {study.tagline}
        </p>

        <div className="mt-10">
          <span className="label-mono text-paper-faint">The chain</span>
          <div className="mt-3">
            <ChainStrip chain={study.chain} />
          </div>
        </div>
      </header>

      {/* Problem / Solution / Tech */}
      <section className="mx-auto max-w-6xl px-5 py-6 lg:px-8">
        <div className="grid gap-3 lg:grid-cols-3">
          <Panel className="p-6">
            <span className="label-mono text-destructive">Problem</span>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">{study.problem}</p>
          </Panel>
          <Panel className="p-6 lg:col-span-2">
            <span className="label-mono text-signal">Solution</span>
            <p className="mt-3 text-sm leading-relaxed text-paper-dim">{study.solution}</p>
            <div className="mt-6 border-t border-ink-800 pt-5">
              <span className="label-mono text-paper-faint">Tech</span>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {study.tech.map((t) => (
                  <li key={t}>
                    <Tag tone="signal">{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>
      </section>

      {/* Design targets */}
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <SectionMark index="01">Design targets</SectionMark>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-faint">
          What the system is built to guarantee. These are the specifications the build is
          tested against — not results claimed from a client account.
        </p>
        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {study.designTargets.map((target) => (
            <li
              key={target}
              className="flex gap-3 rounded-lg border border-ink-700 bg-ink-850/70 p-4"
            >
              <Target size={15} strokeWidth={2.25} className="mt-0.5 shrink-0 text-signal" />
              <span className="text-sm leading-relaxed text-paper-dim">{target}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Build notes */}
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <SectionMark index="02">Build notes</SectionMark>
        <div
          className="prose-signal mt-6 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>

      {/* Panels */}
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <SectionMark index="03">Inside the build</SectionMark>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-faint">
          Diagrams of the structure this system uses — the workflow branches, the pipeline
          stages, the conversation and the availability model.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {study.panels.map((key) => {
            const PanelView = panelRegistry[key]
            return <PanelView key={key} />
          })}
        </div>
      </section>

      {/* Next */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <Panel className="group p-6 transition-colors hover:border-signal-deep/60">
          <Link to="/case-studies/$slug" params={{ slug: next._meta.path }} className="block">
            <span className="label-mono text-paper-faint">Next case study</span>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-display text-xl font-bold text-paper group-hover:text-signal">
                {next.title}
              </h2>
              <ArrowRight size={18} strokeWidth={2.25} className="text-signal-deep" />
            </div>
          </Link>
        </Panel>
      </section>
    </article>
  )
}
