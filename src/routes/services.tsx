import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check } from 'lucide-react'
import { Panel, SectionMark, Tag } from '@/components/primitives'
import { coreExpertise, identity, services, workingMethod } from '@/data/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: `Services — ${identity.name}` },
      {
        name: 'description',
        content:
          'GoHighLevel CRM setup, pipelines, workflow automation, funnels, email and SMS automation, AI chatbots and Voice AI, calendar automation, and API, webhook, Zapier, Make and n8n integrations.',
      },
    ],
  }),
  component: Services,
})

function Services() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 lg:px-8 lg:pt-24">
        <SectionMark index="01">Services</SectionMark>
        <h1 className="stagger mt-5 max-w-3xl font-display text-4xl leading-[1.06] font-extrabold text-paper sm:text-5xl">
          Eight services that cover a lead's entire journey.
        </h1>
        <p
          className="stagger mt-6 max-w-2xl text-lg leading-relaxed text-paper-dim"
          style={{ animationDelay: '80ms' }}
        >
          Each of these can be a standalone build or one layer of a complete system. Most
          projects start with the CRM and pipeline, because everything else depends on
          those two being right.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <ul className="grid gap-3 lg:grid-cols-2">
          {services.map((service, i) => (
            <Panel
              as="li"
              key={service.id}
              className={cn('p-6', service.span === 'wide' && 'lg:col-span-2')}
            >
              <div className="flex items-start justify-between gap-6">
                <h2 className="max-w-lg font-display text-xl font-bold text-paper">
                  {service.name}
                </h2>
                <span className="font-mono text-[0.6875rem] text-signal-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-dim">
                {service.blurb}
              </p>
              <ul
                className={cn(
                  'mt-5 grid gap-2 border-t border-ink-800 pt-5',
                  service.span === 'wide' && 'sm:grid-cols-2',
                )}
              >
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[0.8125rem] text-paper-faint">
                    <Check
                      size={14}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-signal-deep"
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <SectionMark index="02">How a build runs</SectionMark>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <SectionMark index="03">Tools in play</SectionMark>
        <ul className="mt-6 flex flex-wrap gap-2">
          {coreExpertise.map((skill) => (
            <li key={skill}>
              <Tag>{skill}</Tag>
            </li>
          ))}
        </ul>
        <Link
          to="/case-studies"
          className="mt-10 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-signal hover:underline"
        >
          See these services assembled into systems
          <ArrowRight size={13} strokeWidth={2.5} />
        </Link>
      </section>
    </>
  )
}
