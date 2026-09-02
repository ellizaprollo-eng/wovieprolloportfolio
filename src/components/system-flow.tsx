import { flowStages } from '@/data/site'
import { cn } from '@/lib/utils'

const dotTone = {
  wire: 'border-wire-deep bg-wire/25',
  signal: 'border-signal-deep bg-signal/30',
  moss: 'border-moss/70 bg-moss/25',
} as const

/** The vertical rail with a signal pulse running down it. */
function Rail({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute top-3 bottom-3 w-px overflow-hidden bg-ink-700', className)}
    >
      <div
        className="absolute inset-x-0 h-1/5 bg-gradient-to-b from-transparent via-signal to-transparent"
        style={{ animation: 'railflow 5.5s linear infinite' }}
      />
    </div>
  )
}

/** Condensed chain — used in the hero. */
export function SystemFlowCompact() {
  return (
    <div className="relative">
      <Rail className="left-[0.875rem]" />
      <ol className="grid gap-2">
        {flowStages.map((stage, i) => (
          <li
            key={stage.index}
            className="stagger grid grid-cols-[1.75rem_1fr] items-center"
            style={{ animationDelay: `${200 + i * 70}ms` }}
          >
            <span className="flex justify-center">
              <span
                aria-hidden="true"
                className={cn('size-2.5 rounded-full border', dotTone[stage.tone])}
              />
            </span>
            <span className="flex items-baseline gap-2.5">
              <span className="font-mono text-[0.625rem] text-paper-faint">{stage.index}</span>
              <span className="text-[0.8125rem] leading-snug text-paper-dim">{stage.title}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Full annotated chain — used on the Systems page. */
export function SystemFlowFull() {
  return (
    <div className="relative">
      <Rail className="left-[0.875rem] sm:left-[1.75rem]" />
      <ol className="grid gap-3">
        {flowStages.map((stage) => (
          <li
            key={stage.index}
            className="grid grid-cols-[1.75rem_1fr] sm:grid-cols-[3.5rem_1fr]"
          >
            <span className="flex justify-center pt-7">
              <span
                aria-hidden="true"
                className={cn('size-4 rounded-full border-2', dotTone[stage.tone])}
              />
            </span>
            <div className="rounded-xl border border-ink-700 bg-ink-850/70 p-5">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[0.6875rem] text-signal-deep">
                  {stage.index}
                </span>
                <h3 className="font-display text-lg font-bold text-paper">{stage.title}</h3>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-dim">
                {stage.detail}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stage.nodes.map((node) => (
                  <li
                    key={node}
                    className="rounded border border-ink-700 bg-ink-800 px-2 py-1 font-mono text-[0.625rem] text-paper-faint"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** Horizontal chain-of-steps used to summarise a case study. */
export function ChainStrip({ chain }: { chain: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-2">
      {chain.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded border border-ink-700 bg-ink-800 px-2.5 py-1.5 font-mono text-[0.6875rem] text-paper-dim">
            {step}
          </span>
          {i < chain.length - 1 ? (
            <svg
              aria-hidden="true"
              width="14"
              height="8"
              viewBox="0 0 14 8"
              className="text-signal-deep"
            >
              <path
                d="M0 4h9"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeDasharray="3 3"
                style={{ animation: 'drift 2.4s linear infinite' }}
              />
              <path d="M9 1l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
