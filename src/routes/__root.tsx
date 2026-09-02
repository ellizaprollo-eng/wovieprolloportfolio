import type { ReactNode } from 'react'
import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import { SiteFooter, SiteNav } from '@/components/site-chrome'
import { identity } from '@/data/site'
import '../styles.css'

const description = identity.positioning

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: `${identity.name} — ${identity.title}` },
      { name: 'description', content: description },
      { name: 'theme-color', content: '#131a21' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${identity.name} — ${identity.title}` },
      { property: 'og:description', content: description },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Karla:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="bg-ink-900">
      <head>
        <HeadContent />
      </head>
      <body className="relative min-h-screen">
        {/* Fixed atmosphere layer — never inside a scrolling container. */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 grid-field opacity-[0.35]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[38rem] hero-glow"
        />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteNav />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-28 lg:px-8">
      <span className="label-mono text-signal-deep">404 · route not found</span>
      <h1 className="max-w-2xl font-display text-4xl font-bold text-paper">
        That page never got wired up.
      </h1>
      <p className="max-w-xl text-paper-dim">
        The link is broken, but the systems are not. Start from the case studies or tell
        me what you were looking for.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link
          to="/case-studies"
          className="rounded-md bg-signal px-5 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[oklch(0.19_0.03_70)]"
        >
          View case studies
        </Link>
        <Link
          to="/contact"
          className="rounded-md border border-ink-700 px-5 py-3 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-paper-dim transition-colors hover:border-signal-deep hover:text-paper"
        >
          Contact
        </Link>
      </div>
    </div>
  )
}
