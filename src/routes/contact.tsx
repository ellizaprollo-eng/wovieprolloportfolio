import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Check, Loader2, Send } from 'lucide-react'
import { Panel, SectionMark } from '@/components/primitives'
import { identity, services } from '@/data/site'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: `Contact — ${identity.name}` },
      {
        name: 'description',
        content:
          'Tell me about the system you need — CRM, pipelines, automation, funnels, AI follow-up or appointment booking — and what is currently breaking.',
      },
    ],
  }),
  component: Contact,
})

const FORM_NAME = 'project-enquiry'

const projectOptions = [
  'Complete GoHighLevel CRM build',
  'Pipelines & opportunity management',
  'Workflow automation',
  'Funnels & landing pages',
  'Email/SMS automation',
  'AI chatbot or Voice AI',
  'Calendar & appointment automation',
  'Integrations (API, webhook, Zapier, Make, n8n)',
  'Audit of an existing sub-account',
  'Not sure yet — needs mapping',
]

const timelineOptions = ['This week', 'Within a month', 'This quarter', 'Just researching']

type Fields = {
  name: string
  email: string
  business: string
  phone: string
  project: string
  timeline: string
  stack: string
  message: string
}

const empty: Fields = {
  name: '',
  email: '',
  business: '',
  phone: '',
  project: projectOptions[0],
  timeline: timelineOptions[1],
  stack: '',
  message: '',
}

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&')
}

function Field({
  label,
  hint,
  error,
  group,
  children,
}: {
  label: string
  hint?: string
  error?: string
  /** Renders a fieldset instead of a label — for button groups with no single control. */
  group?: boolean
  children: ReactNode
}) {
  const head = (
    <>
      <span className="flex items-baseline justify-between gap-3">
        <span className="label-mono text-paper-dim">{label}</span>
        {hint ? (
          <span className="font-mono text-[0.625rem] text-paper-faint">{hint}</span>
        ) : null}
      </span>
      <span className="mt-2 block">{children}</span>
      {error ? (
        <span className="mt-1.5 block font-mono text-[0.625rem] text-destructive">
          {error}
        </span>
      ) : null}
    </>
  )

  if (group) {
    return (
      <fieldset className="block min-w-0 border-0 p-0">
        <legend className="sr-only">{label}</legend>
        {head}
      </fieldset>
    )
  }

  return <label className="block">{head}</label>
}

const control =
  'w-full rounded-md border border-ink-700 bg-ink-800 px-3.5 py-2.5 text-sm text-paper placeholder:text-ink-600 outline-none transition-colors focus:border-signal-deep'

function Contact() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const set =
    (key: keyof Fields) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setFields((f) => ({ ...f, [key]: e.target.value }))
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    const next: Partial<Record<keyof Fields, string>> = {}
    if (!fields.name.trim()) next.name = 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) next.email = 'Enter a valid email'
    if (fields.message.trim().length < 12)
      next.message = 'A sentence or two about the problem helps'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setState('sending')
    try {
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': FORM_NAME, ...fields }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('sent')
    } catch {
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <section className="mx-auto max-w-3xl px-5 py-28 lg:px-8">
        <Panel className="p-8 sm:p-12">
          <span className="grid size-11 place-items-center rounded-full border border-moss/50 bg-moss/15">
            <Check size={18} strokeWidth={2.5} className="text-moss" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold text-paper">
            Enquiry received.
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-paper-dim">
            Thanks {fields.name.split(' ')[0] || 'for reaching out'} — I read every one of
            these properly rather than replying with a template. Expect a response with
            questions specific to your setup.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)]"
            >
              Read a case study while you wait
              <ArrowRight size={13} strokeWidth={2.5} />
            </Link>
            <button
              type="button"
              onClick={() => {
                setFields(empty)
                setState('idle')
              }}
              className="rounded-md border border-ink-700 px-5 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-paper-dim transition-colors hover:border-signal-deep hover:text-paper"
            >
              Send another
            </button>
          </div>
        </Panel>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-16 lg:px-8 lg:pt-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionMark index="06">Contact</SectionMark>
          <h1 className="stagger mt-5 font-display text-4xl leading-[1.06] font-extrabold text-paper sm:text-5xl">
            {identity.ctaHeadline}
          </h1>
          <p
            className="stagger mt-6 max-w-xl text-lg leading-relaxed text-paper-dim"
            style={{ animationDelay: '80ms' }}
          >
            {identity.ctaBody}
          </p>

          <div className="mt-10">
            <span className="label-mono text-paper-faint">Useful in your first message</span>
            <ul className="mt-4 grid gap-2.5">
              {[
                'Where your leads come from today',
                'What happens in the first five minutes after a lead arrives',
                'Whether you already have a GoHighLevel sub-account',
                'The one part of the process that costs you the most bookings',
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-sm text-paper-dim">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1 shrink-0 rounded-full bg-signal-deep"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10">
            <span className="label-mono text-paper-faint">Typical starting points</span>
            <ul className="mt-4 grid gap-1.5">
              {services.slice(0, 4).map((s) => (
                <li key={s.id} className="text-sm text-paper-faint">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Panel className="p-6 sm:p-8">
          <form
            name={FORM_NAME}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5"
          >
            <input type="hidden" name="form-name" value={FORM_NAME} />
            <p hidden>
              <label>
                Leave this empty
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  name="name"
                  value={fields.name}
                  onChange={set('name')}
                  aria-invalid={Boolean(errors.name)}
                  className={cn(control, errors.name && 'border-destructive')}
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  name="email"
                  type="email"
                  value={fields.email}
                  onChange={set('email')}
                  aria-invalid={Boolean(errors.email)}
                  className={cn(control, errors.email && 'border-destructive')}
                  placeholder="you@business.com"
                />
              </Field>
              <Field label="Business" hint="optional">
                <input
                  name="business"
                  value={fields.business}
                  onChange={set('business')}
                  className={control}
                  placeholder="Company or trading name"
                />
              </Field>
              <Field label="Phone" hint="optional">
                <input
                  name="phone"
                  type="tel"
                  value={fields.phone}
                  onChange={set('phone')}
                  className={control}
                  placeholder="Best number to reach you"
                />
              </Field>
            </div>

            <Field label="What do you need built?">
              <select
                name="project"
                value={fields.project}
                onChange={set('project')}
                className={cn(control, 'appearance-none')}
              >
                {projectOptions.map((o) => (
                  <option key={o} value={o} className="bg-ink-800">
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Timeline" group>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {timelineOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setFields((f) => ({ ...f, timeline: o }))}
                    aria-pressed={fields.timeline === o}
                    className={cn(
                      'rounded-md border px-2 py-2 font-mono text-[0.625rem] uppercase tracking-[0.08em] transition-colors',
                      fields.timeline === o
                        ? 'border-signal-deep bg-signal/12 text-signal'
                        : 'border-ink-700 bg-ink-800 text-paper-faint hover:text-paper',
                    )}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <input type="hidden" name="timeline" value={fields.timeline} />
            </Field>

            <Field label="Tools already in use" hint="optional">
              <input
                name="stack"
                value={fields.stack}
                onChange={set('stack')}
                className={control}
                placeholder="GoHighLevel, Zapier, Twilio, a spreadsheet…"
              />
            </Field>

            <Field label="What is breaking right now?" error={errors.message}>
              <textarea
                name="message"
                rows={5}
                value={fields.message}
                onChange={set('message')}
                aria-invalid={Boolean(errors.message)}
                className={cn(control, 'resize-y', errors.message && 'border-destructive')}
                placeholder="Leads come in from Facebook but nobody follows up until the evening…"
              />
            </Field>

            {state === 'error' ? (
              <p className="rounded-md border border-destructive/50 bg-destructive/10 px-3.5 py-3 text-sm text-paper">
                That did not send. Try once more — if it still fails, the form endpoint is
                only live on a deployed site, not in local preview.
              </p>
            ) : null}

            <button
              type="submit"
              disabled={state === 'sending'}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-signal px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)] transition-transform hover:-translate-y-px disabled:translate-y-0 disabled:opacity-70"
            >
              {state === 'sending' ? (
                <>
                  <Loader2 size={15} strokeWidth={2.5} className="animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Send size={15} strokeWidth={2.5} />
                  Send enquiry
                </>
              )}
            </button>
          </form>
        </Panel>
      </div>
    </section>
  )
}
