import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Panel, Rule, SectionMark, Tag } from '@/components/primitives'
import {
  accomplishments,
  coreExpertise,
  identity,
  services,
  workingMethod,
} from '@/data/site'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: `About & résumé — ${identity.name}` },
      { name: 'description', content: identity.summary },
    ],
  }),
  component: About,
})

function About() {
  return (
    <>
      {/* Résumé header */}
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 lg:px-8 lg:pt-24">
        <SectionMark index="05">About & résumé</SectionMark>
        <h1 className="stagger mt-5 font-display text-4xl font-extrabold tracking-tight text-paper uppercase sm:text-5xl">
          {identity.name}
        </h1>
        <p
          className="stagger mt-3 font-mono text-sm tracking-[0.08em] text-signal"
          style={{ animationDelay: '70ms' }}
        >
          {identity.resumeTitle}
        </p>
        <Rule className="mt-8" />
      </section>

      {/* Professional summary */}
      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <h2 className="label-mono text-paper-faint">Professional summary</h2>
          <div>
            <p className="max-w-3xl text-lg leading-relaxed text-paper-dim">
              {identity.summary}
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-paper-faint">
              The through-line in everything I build is the same: a lead should never wait
              for a human to be free, and a business owner should never have to remember a
              follow-up. Positioned as a{' '}
              <span className="text-paper">{identity.title}</span> — working toward{' '}
              <span className="text-paper">{identity.altTitle}</span> as the case studies
              deepen.
            </p>
          </div>
        </div>
      </section>

      {/* Core expertise */}
      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <h2 className="label-mono text-paper-faint">Core expertise</h2>
          <ul className="flex flex-wrap gap-2">
            {coreExpertise.map((skill) => (
              <li key={skill}>
                <Tag tone={skill === 'GoHighLevel' ? 'signal' : 'neutral'}>{skill}</Tag>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Experience, written as accomplishments */}
      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <h2 className="label-mono text-paper-faint">Experience & accomplishments</h2>
          <div>
            <ul className="grid gap-3">
              {accomplishments.map((item, i) => (
                <li
                  key={item}
                  className="grid grid-cols-[2rem_1fr] gap-2 border-b border-ink-800 pb-3 last:border-0"
                >
                  <span className="pt-0.5 font-mono text-[0.625rem] text-signal-deep">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-paper-dim">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <Panel className="mt-6 p-5">
              <span className="label-mono text-paper-faint">On numbers</span>
              <p className="mt-2 text-sm leading-relaxed text-paper-dim">
                Every case study on this site lists the targets its system was built and
                tested against rather than borrowed statistics. Where a live client account
                produces measurable results — response time, lead volume, booking rate — I
                report those figures with the account they came from, and not before.
              </p>
            </Panel>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <h2 className="label-mono text-paper-faint">How I work</h2>
          <ol className="grid gap-3 sm:grid-cols-2">
            {workingMethod.map((m, i) => (
              <Panel as="li" key={m.step} className="p-5">
                <span className="font-mono text-[0.625rem] text-signal-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold text-paper">{m.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-faint">{m.body}</p>
              </Panel>
            ))}
          </ol>
        </div>
      </section>

      {/* Service index */}
      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr]">
          <h2 className="label-mono text-paper-faint">Services</h2>
          <div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {services.map((s) => (
                <li
                  key={s.id}
                  className="flex items-center gap-2.5 text-[0.9375rem] text-paper-dim"
                >
                  <span aria-hidden="true" className="size-1 rounded-full bg-signal-deep" />
                  {s.name}
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal hover:underline"
            >
              What each one includes
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
