import { MockHeader } from '@/components/primitives'
import { cn } from '@/lib/utils'

const shell =
  'overflow-hidden rounded-xl border border-ink-700 bg-ink-850 shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]'

/* -------------------------------------------------------------------------- */
/* Workflow canvas                                                            */
/* -------------------------------------------------------------------------- */

type FlowNode = {
  x: number
  y: number
  w: number
  label: string
  kind: string
  tone: 'wire' | 'signal' | 'moss' | 'plain'
}

const nodeTone = {
  wire: { stroke: 'var(--wire-deep)', fill: 'color-mix(in oklab, var(--wire) 12%, transparent)' },
  signal: {
    stroke: 'var(--signal-deep)',
    fill: 'color-mix(in oklab, var(--signal) 12%, transparent)',
  },
  moss: { stroke: 'var(--moss)', fill: 'color-mix(in oklab, var(--moss) 10%, transparent)' },
  plain: { stroke: 'var(--ink-600)', fill: 'var(--ink-800)' },
} as const

const workflowNodes: FlowNode[] = [
  { x: 30, y: 16, w: 200, label: 'Lead form submitted', kind: 'trigger', tone: 'wire' },
  { x: 30, y: 88, w: 200, label: 'Create contact + opportunity', kind: 'action', tone: 'plain' },
  { x: 30, y: 160, w: 200, label: 'Send SMS — first touch', kind: 'action', tone: 'signal' },
  { x: 30, y: 232, w: 200, label: 'Replied within 5 min?', kind: 'if / else', tone: 'plain' },
  { x: 30, y: 316, w: 200, label: 'AI qualifies + books', kind: 'yes branch', tone: 'signal' },
  { x: 288, y: 316, w: 200, label: '7-touch nurture cadence', kind: 'no branch', tone: 'moss' },
  { x: 30, y: 400, w: 200, label: 'Stage → Appointment Booked', kind: 'action', tone: 'wire' },
]

export function WorkflowCanvas({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Workflow canvas" note="Diagram of the build — not a screenshot" />
      <div className="p-4">
        <svg
          viewBox="0 0 520 470"
          className="h-auto w-full"
          role="img"
          aria-label="Workflow diagram: a lead form submission creates a contact and opportunity, sends a first-touch SMS, then branches on whether the lead replied within five minutes into either AI qualification and booking or a seven-touch nurture cadence, both ending in a pipeline stage change."
        >
          <g stroke="var(--ink-600)" strokeWidth="1.25" fill="none">
            <path d="M130 60V88" />
            <path d="M130 132V160" />
            <path d="M130 204V232" />
            <path d="M130 276V316" strokeDasharray="4 4" style={{ animation: 'drift 3s linear infinite' }} />
            <path d="M230 254H388V316" strokeDasharray="4 4" style={{ animation: 'drift 3s linear infinite' }} />
            <path d="M388 360V434H230" />
            <path d="M130 360V400" />
          </g>
          <g fill="var(--paper-faint)" fontSize="9" fontFamily="var(--font-mono)">
            <text x="138" y="298">yes</text>
            <text x="240" y="248">no</text>
          </g>

          {workflowNodes.map((n) => {
            const tone = nodeTone[n.tone]
            return (
              <g key={n.label}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={n.w}
                  height={44}
                  rx="8"
                  fill={tone.fill}
                  stroke={tone.stroke}
                  strokeWidth="1.25"
                />
                <text
                  x={n.x + 14}
                  y={n.y + 19}
                  fill="var(--paper-faint)"
                  fontSize="8"
                  fontFamily="var(--font-mono)"
                  letterSpacing="1"
                >
                  {n.kind.toUpperCase()}
                </text>
                <text
                  x={n.x + 14}
                  y={n.y + 33}
                  fill="var(--paper)"
                  fontSize="11.5"
                  fontFamily="var(--font-sans)"
                >
                  {n.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/* Pipeline board                                                             */
/* -------------------------------------------------------------------------- */

const pipelineColumns = [
  {
    stage: 'New Lead',
    count: 14,
    value: '$0',
    tone: 'wire' as const,
    cards: [
      { name: 'Marisol Ferreira', note: 'FB — 3bd Northside', value: '—', age: '2m' },
      { name: 'Dev Raichura', note: 'Google LSA', value: '—', age: '11m' },
    ],
  },
  {
    stage: 'Contacted',
    count: 9,
    value: '$0',
    tone: 'wire' as const,
    cards: [
      { name: 'Nnamdi Okonkwo', note: 'AI SMS · replied', value: '—', age: '1h' },
      { name: 'Halla Sigurdsdottir', note: 'Voice AI · callback', value: '—', age: '3h' },
    ],
  },
  {
    stage: 'Appointment Booked',
    count: 6,
    value: '$18,420',
    tone: 'signal' as const,
    cards: [
      { name: 'Aurelio Bantay', note: 'Thu 10:15 · viewing', value: '$4,180', age: '1d' },
      { name: 'Bea Trelawny', note: 'Fri 14:00 · estimate', value: '$2,960', age: '2d' },
    ],
  },
  {
    stage: 'Quote Sent',
    count: 5,
    value: '$27,315',
    tone: 'signal' as const,
    cards: [
      { name: 'Tobias Mwangi', note: 'Follow-up 2 of 3', value: '$11,340', age: '4d' },
      { name: 'Ines Castellanos', note: 'Stalled — alert sent', value: '$6,275', age: '13d' },
    ],
  },
  {
    stage: 'Won',
    count: 4,
    value: '$32,908',
    tone: 'moss' as const,
    cards: [{ name: 'Priya Venkataraman', note: 'Onboarding started', value: '$9,450', age: '1d' }],
  },
]

const stageDot = {
  wire: 'bg-wire',
  signal: 'bg-signal',
  moss: 'bg-moss',
} as const

export function PipelineBoard({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Opportunity pipeline" note="Illustrative — sample records" />
      <div className="overflow-x-auto p-4">
        <div className="flex min-w-[46rem] gap-3">
          {pipelineColumns.map((col) => (
            <div key={col.stage} className="w-44 shrink-0">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={cn('size-1.5 rounded-full', stageDot[col.tone])}
                />
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-paper-dim">
                  {col.stage}
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2 font-mono text-[0.625rem] text-paper-faint">
                <span>{col.count} open</span>
                <span>·</span>
                <span>{col.value}</span>
              </div>
              <ul className="mt-3 grid gap-2">
                {col.cards.map((card) => (
                  <li
                    key={card.name}
                    className="rounded-lg border border-ink-700 bg-ink-800 p-2.5"
                  >
                    <p className="text-[0.8125rem] font-semibold text-paper">{card.name}</p>
                    <p className="mt-0.5 text-[0.6875rem] leading-snug text-paper-faint">
                      {card.note}
                    </p>
                    <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem]">
                      <span className="text-paper-dim">{card.value}</span>
                      <span className="text-paper-faint">{card.age}</span>
                    </div>
                  </li>
                ))}
                <li className="rounded-lg border border-dashed border-ink-700 py-3 text-center font-mono text-[0.625rem] text-paper-faint">
                  + {Math.max(col.count - col.cards.length, 0)} more
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/* AI conversation thread                                                     */
/* -------------------------------------------------------------------------- */

const thread = [
  { from: 'ai', t: '0:00', text: "Hi Marisol — Wovie here from Northside Realty. You just asked about the 3-bed on Calder Row. Are you looking to buy in the next few months?" },
  { from: 'lead', t: '0:04', text: 'yes but only if we can sell ours first' },
  { from: 'ai', t: '0:04', text: 'Understood — so a sale and a purchase. Is your place already on the market, or would you want it valued first?' },
  { from: 'lead', t: '0:09', text: 'needs valuing' },
  { from: 'ai', t: '0:09', text: 'Easy. I can do both in one visit — value yours and walk you through Calder Row. Thursday 10:15 or Friday 16:30?' },
  { from: 'lead', t: '0:12', text: 'thursday works' },
  { from: 'ai', t: '0:12', text: "Booked for Thursday 10:15. Confirmation and directions are on their way, and you'll get a reminder the day before." },
]

export function ChatThread({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Conversation AI — SMS" note="Illustrative — sample conversation" />
      <div className="grid gap-2.5 p-4">
        {thread.map((m, i) => (
          <div
            key={i}
            className={cn('flex flex-col gap-1', m.from === 'lead' ? 'items-end' : 'items-start')}
          >
            <span className="font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-paper-faint">
              {m.from === 'ai' ? 'AI agent' : 'Lead'} · {m.t}
            </span>
            <p
              className={cn(
                'max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[0.8125rem] leading-relaxed',
                m.from === 'ai'
                  ? 'rounded-tl-sm border border-signal-deep/35 bg-signal/10 text-paper'
                  : 'rounded-tr-sm border border-ink-700 bg-ink-800 text-paper-dim',
              )}
            >
              {m.text}
            </p>
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2 rounded-lg border border-ink-700 bg-ink-800 px-3 py-2">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-moss"
            style={{ animation: 'breathe 3.6s ease-in-out infinite' }}
          />
          <span className="font-mono text-[0.625rem] text-paper-faint">
            Appointment created · opportunity moved to Appointment Booked
          </span>
        </div>
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/* Calendar                                                                   */
/* -------------------------------------------------------------------------- */

const days = ['Mon 14', 'Tue 15', 'Wed 16', 'Thu 17', 'Fri 18']
const times = ['09:00', '10:15', '11:30', '14:00', '16:30']
/** 0 = unavailable, 1 = open, 2 = booked, 3 = held by AI */
const grid = [
  [2, 1, 1, 2, 0],
  [1, 2, 0, 3, 1],
  [0, 1, 2, 1, 2],
  [2, 0, 1, 2, 1],
  [1, 1, 2, 0, 2],
]

export function CalendarSlots({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Round-robin calendar" note="Illustrative — sample availability" />
      <div className="p-4">
        <div className="grid grid-cols-[3rem_repeat(5,1fr)] gap-1.5">
          <span />
          {days.map((d) => (
            <span
              key={d}
              className="text-center font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-paper-faint"
            >
              {d}
            </span>
          ))}
          {times.map((t, r) => (
            <div key={t} className="col-span-6 grid grid-cols-[3rem_repeat(5,1fr)] gap-1.5">
              <span className="self-center font-mono text-[0.5625rem] text-paper-faint">{t}</span>
              {days.map((d, c) => {
                const state = grid[r][c]
                return (
                  <span
                    key={d}
                    title={
                      ['Unavailable', 'Open', 'Booked', 'Held by AI'][state] + ` — ${d} ${t}`
                    }
                    className={cn(
                      'h-7 rounded border text-center font-mono text-[0.5625rem] leading-7',
                      state === 0 && 'border-ink-800 bg-ink-800/40 text-ink-600',
                      state === 1 && 'border-ink-700 bg-ink-800 text-paper-faint',
                      state === 2 && 'border-signal-deep/45 bg-signal/15 text-signal',
                      state === 3 && 'border-wire-deep/50 bg-wire/15 text-wire',
                    )}
                  >
                    {state === 2 ? 'held' : state === 3 ? 'AI' : state === 1 ? 'open' : ''}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.5625rem] uppercase tracking-[0.1em] text-paper-faint">
          {[
            ['bg-signal', 'Booked'],
            ['bg-wire', 'Held by AI'],
            ['bg-ink-600', 'Open'],
          ].map(([dot, label]) => (
            <li key={label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={cn('size-1.5 rounded-full', dot)} />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/* Reporting                                                                  */
/* -------------------------------------------------------------------------- */

const tiles = [
  { label: 'Leads received', value: '214', sub: 'Last 7 days' },
  { label: 'Median first touch', value: '41s', sub: 'Form to first SMS' },
  { label: 'Appointments booked', value: '63', sub: '29.4% of leads' },
  { label: 'Show rate', value: '78.4%', sub: 'Attended vs booked' },
]

/** 12-point single-series column chart: bookings per week. */
const bookings = [31, 38, 34, 45, 41, 52, 47, 58, 54, 61, 57, 63]

function Sparkbars() {
  const max = Math.max(...bookings)
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="label-mono text-paper-dim">Appointments booked per week</span>
        <span className="font-mono text-[0.625rem] text-paper-faint">12 weeks</span>
      </div>
      <svg
        viewBox="0 0 300 84"
        className="mt-3 h-auto w-full"
        role="img"
        aria-label="Column chart of appointments booked per week over twelve weeks, rising from 31 to 63, with the current week highest."
      >
        {bookings.map((v, i) => {
          const h = (v / max) * 60
          const x = i * 25 + 2
          const w = 19
          const r = 4
          const top = 78 - h
          const isCurrent = i === bookings.length - 1
          // Rounded data-end, square at the baseline.
          const d = `M${x} 78V${top + r}q0-${r} ${r}-${r}h${w - r * 2}q${r} 0 ${r} ${r}V78Z`
          return <path key={i} d={d} fill={isCurrent ? 'var(--signal)' : 'var(--ink-600)'} />
        })}
        <line x1="0" y1="78.5" x2="300" y2="78.5" stroke="var(--ink-700)" strokeWidth="1" />
        <text
          x="286.5"
          y="14"
          textAnchor="middle"
          fill="var(--paper-faint)"
          fontSize="8"
          fontFamily="var(--font-mono)"
        >
          63
        </text>
      </svg>
    </div>
  )
}

export function ReportPanel({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Reporting dashboard" note="Illustrative — sample data" />
      <div className="grid gap-5 p-4">
        <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {tiles.map((tile) => (
            <div key={tile.label} className="rounded-lg border border-ink-700 bg-ink-800 p-3">
              <dt className="text-[0.6875rem] leading-snug text-paper-faint">{tile.label}</dt>
              <dd className="mt-1.5 font-sans text-xl font-semibold text-paper">{tile.value}</dd>
              <p className="mt-0.5 font-mono text-[0.5625rem] text-paper-faint">{tile.sub}</p>
            </div>
          ))}
        </dl>
        <Sparkbars />
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/* Funnel / landing page wireframe                                            */
/* -------------------------------------------------------------------------- */

export function FunnelPreview({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Funnel step — quote request" note="Wireframe of the build" />
      <div className="p-4">
        <div className="rounded-lg border border-ink-700 bg-ink-900">
          <div className="flex items-center gap-1.5 border-b border-ink-700 px-3 py-2">
            {['bg-ink-600', 'bg-ink-600', 'bg-ink-600'].map((c, i) => (
              <span key={i} aria-hidden="true" className={cn('size-2 rounded-full', c)} />
            ))}
            <span className="ml-2 truncate rounded bg-ink-800 px-2 py-0.5 font-mono text-[0.5625rem] text-paper-faint">
              /get-a-quote
            </span>
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-[1.2fr_1fr]">
            <div className="grid content-start gap-2.5">
              <span className="h-2 w-20 rounded-full bg-signal/60" />
              <span className="h-4 w-full rounded bg-ink-700" />
              <span className="h-4 w-4/5 rounded bg-ink-700" />
              <span className="mt-1 h-2 w-full rounded-full bg-ink-800" />
              <span className="h-2 w-11/12 rounded-full bg-ink-800" />
              <span className="h-2 w-3/4 rounded-full bg-ink-800" />
              <ul className="mt-2 grid gap-1.5">
                {['Same-week site visit', 'Fixed written quote', 'No call centre'].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[0.6875rem] text-paper-faint">
                    <span aria-hidden="true" className="size-1 rounded-full bg-moss" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-ink-700 bg-ink-850 p-3">
              <span className="label-mono text-paper-faint">Step 2 of 3</span>
              <div className="mt-3 grid gap-2">
                {['Service needed', 'Property type', 'Postcode', 'Phone'].map((f) => (
                  <div key={f} className="rounded border border-ink-700 bg-ink-800 px-2.5 py-2">
                    <span className="font-mono text-[0.5625rem] text-paper-faint">{f}</span>
                  </div>
                ))}
                <span className="mt-1 rounded bg-signal py-2 text-center font-mono text-[0.5625rem] font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)]">
                  Get my quote
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */
/* Voice AI call record                                                       */
/* -------------------------------------------------------------------------- */

const callTimeline = [
  { t: '00:02', text: 'Agent identifies itself as an automated assistant' },
  { t: '00:11', text: 'Service type captured — boiler replacement' },
  { t: '00:34', text: 'Property and access details confirmed' },
  { t: '00:58', text: 'Live availability read from calendar' },
  { t: '01:16', text: 'Appointment booked — Wed 11:30' },
  { t: '01:29', text: 'Confirmation SMS sent, transcript written to record' },
]

export function VoicePanel({ className }: { className?: string }) {
  return (
    <figure className={cn(shell, className)}>
      <MockHeader title="Voice AI call record" note="Illustrative — sample call" />
      <div className="grid gap-4 p-4">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-lg border border-ink-700 bg-ink-800 px-3 py-2.5">
          {[
            ['Direction', 'Outbound — new lead'],
            ['Duration', '1m 34s'],
            ['Outcome', 'Booked'],
          ].map(([k, v]) => (
            <div key={k}>
              <span className="block font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-paper-faint">
                {k}
              </span>
              <span className="text-[0.8125rem] text-paper">{v}</span>
            </div>
          ))}
        </div>
        <ol className="grid gap-0">
          {callTimeline.map((row, i) => (
            <li key={row.t} className="grid grid-cols-[3.25rem_1.25rem_1fr] items-start">
              <span className="pt-2 font-mono text-[0.625rem] text-paper-faint">{row.t}</span>
              <span className="relative flex h-full justify-center">
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-[0.6rem] size-2 rounded-full border',
                    i === callTimeline.length - 1
                      ? 'border-moss bg-moss/40'
                      : 'border-signal-deep bg-signal/30',
                  )}
                />
                {i < callTimeline.length - 1 ? (
                  <span aria-hidden="true" className="mt-4 w-px bg-ink-700" />
                ) : null}
              </span>
              <span className="pt-1.5 pb-3 text-[0.8125rem] leading-snug text-paper-dim">
                {row.text}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}

/* -------------------------------------------------------------------------- */

export const panelRegistry = {
  workflow: WorkflowCanvas,
  pipeline: PipelineBoard,
  chat: ChatThread,
  calendar: CalendarSlots,
  report: ReportPanel,
  funnel: FunnelPreview,
  voice: VoicePanel,
} as const

export type PanelKey = keyof typeof panelRegistry
