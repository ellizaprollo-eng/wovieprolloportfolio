import { createFileRoute, Link } from '@tanstack/react-router'
import { allCaseStudies } from 'content-collections'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Panel, SectionMark, Tag } from '@/components/primitives'
import { SystemFlowCompact } from '@/components/system-flow'
import { PipelineBoard, ChatThread } from '@/components/mockups'
import { coreExpertise, identity, services, workingMethod } from '@/data/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const studies = [...allCaseStudies].sort((a, b) => a.order - b.order)

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-20 lg:px-8 lg:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div>
            <div className="stagger" style={{ animationDelay: '40ms' }}>
              <Tag tone="signal">Available for new builds</Tag>
            </div>
            <h1
              className="stagger mt-6 font-display text-[2.6rem] leading-[1.02] font-extrabold text-paper sm:text-[3.6rem] lg:text-[4.1rem]"
              style={{ animationDelay: '90ms' }}
            >
              {identity.name}
            </h1>
            <p
              className="stagger mt-3 font-mono text-[0.8125rem] uppercase tracking-[0.16em] text-signal"
              style={{ animationDelay: '140ms' }}
            >
              {identity.title}
            </p>
            <p
              className="stagger mt-7 max-w-2xl text-lg leading-relaxed text-paper-dim sm:text-[1.3rem] sm:leading-[1.55]"
              style={{ animationDelay: '190ms' }}
            >
              {identity.heroStatement}
            </p>

            <div
              className="stagger mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: '240ms' }}
            >
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 rounded-md bg-signal px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)] transition-transform hover:-translate-y-px"
              >
                View my work
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-ink-600 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:border-signal hover:text-signal"
              >
                Hire me
                <ArrowUpRight size={15} strokeWidth={2.5} />
              </Link>
            </div>

            <p
              className="stagger mt-10 max-w-xl border-l-2 border-signal-deep/50 pl-4 text-sm leading-relaxed text-paper-faint"
              style={{ animationDelay: '300ms' }}
            >
              {identity.positioning}
            </p>
          </div>

          {/* The lead-to-customer chain, live in the hero. */}
          <Panel className="stagger self-start p-6" style={{ animationDelay: '160ms' }}>
            <SectionMark index="00">Lead to customer</SectionMark>
            <div className="mt-6">
              <SystemFlowCompact />
            </div>
            <Link
              to="/systems"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal hover:underline"
            >
              See the full system
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </Panel>
        </div>
      </section>

      {/* ------------------------------------------------------------ Services */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionMark index="01">What I build</SectionMark>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
              Eight things, built properly, instead of a list of forty skills.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal hover:underline"
          >
            All services
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Panel
              as="li"
              key={service.id}
              className={cn(
                'group p-5 transition-colors hover:border-ink-600',
                service.span === 'wide' && 'lg:col-span-2',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="max-w-md font-display text-[1.0625rem] leading-snug font-bold text-paper">
                  {service.name}
                </h3>
                <span className="font-mono text-[0.625rem] text-ink-600 transition-colors group-hover:text-signal-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-paper-faint">{service.blurb}</p>
            </Panel>
          ))}
        </ul>
      </section>

      {/* ----------------------------------------------------- Systems preview */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <SectionMark index="02">Systems, not screenshots</SectionMark>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
              The pipeline is the product. Everything else feeds it.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-paper-dim">
              A workflow that fires is easy. A system where the opportunity, the
              conversation, the calendar and the reporting all agree with each other is the
              part that takes experience. I build the second one.
            </p>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              {workingMethod.map((m) => (
                <div key={m.step}>
                  <dt className="label-mono text-signal-deep">{m.step}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-paper-faint">{m.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-3">
            <PipelineBoard />
            <ChatThread className="lg:ml-10" />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Case studies */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionMark index="03">Case studies</SectionMark>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-bold text-paper sm:text-4xl">
              Five systems, each solving a problem a business actually has.
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal hover:underline"
          >
            All case studies
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {studies.map((study, i) => (
            <Panel
              as="li"
              key={study._meta.path}
              className={cn(
                'group transition-colors hover:border-signal-deep/60',
                i === 0 && 'md:col-span-2',
              )}
            >
              <Link
                to="/case-studies/$slug"
                params={{ slug: study._meta.path }}
                className="block p-6"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone="wire">{study.industry}</Tag>
                  <Tag>{study.label}</Tag>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-paper group-hover:text-signal sm:text-2xl">
                  {study.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
                  {study.tagline}
                </p>
                <p className="mt-5 flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-signal-deep">
                  Read the build
                  <ArrowRight size={12} strokeWidth={2.5} />
                </p>
              </Link>
            </Panel>
          ))}
        </ul>
      </section>

      {/* --------------------------------------------------------------- Stack */}
      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <SectionMark index="04">Core expertise</SectionMark>
        <ul className="mt-6 flex flex-wrap gap-2">
          {coreExpertise.map((skill) => (
            <li key={skill}>
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
