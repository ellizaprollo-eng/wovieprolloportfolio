import { createFileRoute, Link } from '@tanstack/react-router'
import { allCaseStudies } from 'content-collections'
import { ArrowRight } from 'lucide-react'
import { Panel, SectionMark, Tag } from '@/components/primitives'
import { ChainStrip } from '@/components/system-flow'
import { identity } from '@/data/site'

export const Route = createFileRoute('/case-studies/')({
  head: () => ({
    meta: [
      { title: `Case studies — ${identity.name}` },
      {
        name: 'description',
        content:
          'Five GoHighLevel systems built end to end: real estate lead conversion, a home services CRM, an AI voice agent, an agency CRM, and an appointment reactivation system.',
      },
    ],
  }),
  loader: () => ({
    studies: [...allCaseStudies].sort((a, b) => a.order - b.order),
  }),
  component: CaseStudies,
})

function CaseStudies() {
  const { studies } = Route.useLoaderData()

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 lg:px-8 lg:pt-24">
        <SectionMark index="03">Case studies</SectionMark>
        <h1 className="stagger mt-5 max-w-3xl font-display text-4xl leading-[1.06] font-extrabold text-paper sm:text-5xl">
          Each one starts with a problem, not a feature list.
        </h1>
        <p
          className="stagger mt-6 max-w-2xl text-lg leading-relaxed text-paper-dim"
          style={{ animationDelay: '80ms' }}
        >
          These are complete systems built to demonstrate the architecture, aimed at the
          industries that buy this work. Every one is labelled{' '}
          <span className="text-paper">Demo Build</span> — the wiring is real, the
          businesses are not.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <ul className="grid gap-4">
          {studies.map((study) => (
            <Panel
              as="li"
              key={study._meta.path}
              className="group transition-colors hover:border-signal-deep/60"
            >
              <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-start lg:p-8">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[0.6875rem] text-signal-deep">
                      Project #{study.order}
                    </span>
                    <Tag tone="wire">{study.industry}</Tag>
                    <Tag>{study.label}</Tag>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold text-paper group-hover:text-signal sm:text-[1.75rem]">
                    <Link to="/case-studies/$slug" params={{ slug: study._meta.path }}>
                      {study.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-2xl leading-relaxed text-paper-dim">
                    {study.tagline}
                  </p>

                  <div className="mt-6">
                    <span className="label-mono text-paper-faint">The chain</span>
                    <div className="mt-3">
                      <ChainStrip chain={study.chain} />
                    </div>
                  </div>
                </div>

                <div className="lg:w-56">
                  <span className="label-mono text-paper-faint">Tech</span>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {study.tech.map((t) => (
                      <li key={t}>
                        <Tag tone="signal">{t}</Tag>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/case-studies/$slug"
                    params={{ slug: study._meta.path }}
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal hover:underline"
                  >
                    Read the build
                    <ArrowRight size={13} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </Panel>
          ))}
        </ul>
      </section>
    </>
  )
}
