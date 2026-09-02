import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { identity, navigation } from '@/data/site'
import { cn } from '@/lib/utils'

function Monogram() {
  return (
    <span
      aria-hidden="true"
      className="grid size-9 shrink-0 place-items-center rounded-md border border-signal-deep/50 bg-signal/10 font-display text-sm font-bold text-signal"
    >
      WP
    </span>
  )
}

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-900/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Monogram />
          <span className="leading-tight">
            <span className="block font-display text-[0.95rem] font-bold tracking-tight text-paper">
              {identity.name}
            </span>
            <span className="hidden font-mono text-[0.625rem] uppercase tracking-[0.14em] text-paper-faint sm:block">
              GoHighLevel · CRM · AI Automation
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/' }}
              className="group relative rounded-md px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper-dim transition-colors hover:text-paper data-[status=active]:text-signal"
            >
              {item.label}
              <span className="absolute inset-x-3 bottom-1 h-px scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100 group-data-[status=active]:scale-x-100" />
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="ml-auto hidden items-center gap-1.5 rounded-md bg-signal px-4 py-2 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)] transition-transform hover:-translate-y-px lg:ml-2 lg:inline-flex"
        >
          Hire Me
          <ArrowUpRight size={13} strokeWidth={2.5} />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="ml-auto grid size-9 place-items-center rounded-md border border-ink-700 text-paper-dim lg:hidden"
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      <div
        className={cn(
          'grid overflow-hidden border-t border-ink-700 transition-[grid-template-rows] duration-300 lg:hidden',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] border-transparent',
        )}
      >
        <nav aria-label="Mobile" className="min-h-0">
          <ul className="px-5 py-2">
            {navigation.map((item) => (
              <li key={item.to} className="border-b border-ink-800 last:border-0">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === '/' }}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-xs uppercase tracking-[0.14em] text-paper-dim data-[status=active]:text-signal"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-ink-700">
      <div className="mx-auto max-w-6xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="max-w-xl font-display text-2xl font-bold text-paper sm:text-3xl">
              {identity.ctaHeadline}
            </h2>
            <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-paper-dim">
              {identity.ctaBody}
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)] transition-transform hover:-translate-y-px"
            >
              Start a project
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="lg:justify-self-end">
            <span className="label-mono text-paper-faint">Site</span>
            <ul className="mt-4 grid gap-2">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-paper-dim transition-colors hover:text-signal"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-ink-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[0.6875rem] text-paper-faint">
            {identity.name} — {identity.title}
          </span>
          <span className="font-mono text-[0.6875rem] text-paper-faint">
            Case studies marked Demo Build are systems built to demonstrate the
            architecture, not client engagements.
          </span>
        </div>
      </div>
    </footer>
  )
}
