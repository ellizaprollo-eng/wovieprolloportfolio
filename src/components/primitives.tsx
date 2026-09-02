import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Small monospace section marker: "02 / Services" */
export function SectionMark({
  index,
  children,
  className,
}: {
  index: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-3 label-mono text-paper-faint', className)}>
      <span className="text-signal-deep">{index}</span>
      <span className="h-px w-8 bg-ink-700" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export function Panel({
  children,
  className,
  style,
  as: Element = 'div',
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: ElementType
}) {
  return (
    <Element
      style={style}
      className={cn(
        'relative rounded-xl border border-ink-700 bg-ink-850/70 backdrop-blur-[2px]',
        className,
      )}
    >
      {children}
    </Element>
  )
}

export function Tag({
  children,
  tone = 'neutral',
}: {
  children: ReactNode
  tone?: 'neutral' | 'signal' | 'wire' | 'moss'
}) {
  const tones = {
    neutral: 'border-ink-700 bg-ink-800 text-paper-dim',
    signal: 'border-signal-deep/45 bg-signal/10 text-signal',
    wire: 'border-wire-deep/45 bg-wire/10 text-wire',
    moss: 'border-moss/35 bg-moss/10 text-moss',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-tight',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

/** Panel header used above every UI mockup, so nothing reads as a real screenshot. */
export function MockHeader({
  title,
  note,
}: {
  title: string
  note?: string
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-ink-700 px-4 py-3">
      <span className="label-mono text-paper-dim">{title}</span>
      {note ? (
        <span className="font-mono text-[0.625rem] text-paper-faint">{note}</span>
      ) : null}
    </div>
  )
}

export function Rule({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('h-px w-full bg-ink-700', className)} />
}
