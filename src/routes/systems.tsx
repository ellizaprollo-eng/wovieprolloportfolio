import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Panel, SectionMark } from '@/components/primitives'
import { SystemFlowFull } from '@/components/system-flow'
import {
  CalendarSlots,
  ChatThread,
  FunnelPreview,
  PipelineBoard,
  ReportPanel,
  VoicePanel,
  WorkflowCanvas,
} from '@/components/mockups'
import { identity } from '@/data/site'

export const Route = createFileRoute('/systems')({
  head: () => ({
    meta: [
      { title: `Systems I build — ${identity.name}` },
      {
        name: 'description',
        content:
          'The complete lead-to-customer system: ad platforms and website into GoHighLevel, AI qualification, SMS, email and Voice AI, calendar booking, sales pipeline, automated follow-up, reviews and reactivation.',
      },
    ],
  }),
  component: Systems,
})

const layers = [
  {
    title: 'Workflow layer',
    body: 'Triggers, branches, wait steps and safe exits. Mapped on paper before a single step is built, so the logic is reviewable rather than archaeological.',
    Panel: WorkflowCanvas,
  },
  {
    title: 'Pipeline layer',
    body: 'Stages named after the buyer’s decision, with entry rules, owners, stall timers and won/lost reasons that make the report readable a quarter later.',
    Panel: PipelineBoard,
  },
  {
    title: 'Conversation layer',
    body: 'SMS, email and web chat handled by AI that qualifies and books, and knows when to stop and hand the thread to a person.',
    Panel: ChatThread,
  },
  {
    title: 'Voice layer',
    body: 'Inbound answering, missed-call callback and outbound speed-to-lead calls that book on the call and write the transcript back to the record.',
    Panel: VoicePanel,
  },
  {
    title: 'Booking layer',
    body: 'Round-robin and service calendars with real availability, buffers, reminder cadences and self-service rescheduling.',
    Panel: CalendarSlots,
  },
  {
    title: 'Capture layer',
    body: 'Funnels, landing pages and multi-step forms that ask only what the next step needs, wired directly into the CRM.',
    Panel: FunnelPreview,
  },
  {
    title: 'Reporting layer',
    body: 'Speed to first touch, booked appointments, show rate and pipeline value — reconciled with the pipeline instead of counted twice.',
    Panel: ReportPanel,
  },
]

function Systems() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-12 lg:px-8 lg:pt-24">
        <SectionMark index="02">Systems I build</SectionMark>
        <h1 className="stagger mt-5 max-w-3xl font-display text-4xl leading-[1.06] font-extrabold text-paper sm:text-5xl">
          One chain, from the click that costs money to the review that earns the next one.
        </h1>
        <p
          className="stagger mt-6 max-w-2xl text-lg leading-relaxed text-paper-dim"
          style={{ animationDelay: '80ms' }}
        >
          Every business I work with already has some of this. The value is in the joins —
          making sure a lead never falls between two tools, and that the pipeline tells the
          truth about what happened.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 lg:px-8">
        <SystemFlowFull />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <SectionMark index="03">The layers, up close</SectionMark>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold text-paper">
          What each layer looks like when it is built.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper-faint">
          The panels below are diagrams of the architecture I build, drawn to show
          structure — stages, branches, availability, hand-off points. They are not
          screenshots of a live account.
        </p>

        <div className="mt-10 grid gap-12">
          {layers.map((layer, i) => (
            <div
              key={layer.title}
              className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
            >
              <div className={i % 2 === 1 ? 'lg:order-2 lg:pl-6' : ''}>
                <span className="font-mono text-[0.625rem] text-signal-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-paper">
                  {layer.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-dim">{layer.body}</p>
              </div>
              <layer.Panel className={i % 2 === 1 ? 'lg:order-1' : ''} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <Panel className="p-8">
          <h2 className="max-w-2xl font-display text-2xl font-bold text-paper">
            Want to see the whole chain running as one build?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-dim">
            The case studies walk five complete systems end to end — the problem, the
            wiring, and the decisions behind it.
          </p>
          <Link
            to="/case-studies"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)] transition-transform hover:-translate-y-px"
          >
            View case studies
            <ArrowRight size={13} strokeWidth={2.5} />
          </Link>
        </Panel>
      </section>
    </>
  )
}
