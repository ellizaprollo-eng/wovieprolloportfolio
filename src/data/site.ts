export const identity = {
  name: 'Wovie Prollo',
  title: 'GoHighLevel CRM & AI Automation Specialist',
  altTitle: 'GoHighLevel Solutions Architect',
  resumeTitle: 'GoHighLevel CRM | AI Automation | Funnel Specialist',
  positioning:
    'I help service businesses capture more leads, automate follow-ups, book more appointments, and manage their sales pipeline using GoHighLevel, AI, and smart integrations.',
  heroStatement:
    'I build CRM systems, sales funnels, AI automations, and lead-conversion workflows that help businesses turn more leads into booked appointments and customers.',
  summary:
    'GoHighLevel CRM and AI Automation Specialist experienced in building lead management systems, sales pipelines, automated workflows, funnels, appointment systems, and AI-powered customer communication. Skilled in connecting GoHighLevel with APIs, webhooks, Zapier, Make, n8n, chatbots, and Voice AI to reduce manual work and improve lead conversion.',
  ctaHeadline: 'Need a GoHighLevel system that actually converts leads?',
  ctaBody:
    'I can build your CRM, automation, funnels, AI follow-up, and appointment system from lead capture to closed customer.',
}

export const coreExpertise = [
  'GoHighLevel',
  'CRM Architecture',
  'Workflow Automation',
  'Pipelines',
  'Funnels',
  'Landing Pages',
  'Email/SMS Automation',
  'AI Chatbots',
  'Voice AI',
  'A2P 10DLC',
  'Calendars',
  'Webhooks',
  'APIs',
  'Zapier',
  'Make',
  'n8n',
  'HTML/CSS/JavaScript',
]

export type Service = {
  id: string
  name: string
  blurb: string
  deliverables: string[]
  span: 'wide' | 'standard'
}

export const services: Service[] = [
  {
    id: 'crm-setup',
    name: 'Complete GoHighLevel CRM setup',
    blurb:
      'A sub-account built the way an operating business actually runs: custom fields and objects that mirror the sales process, tags that mean one thing each, user roles, lead sources, and reporting that reconciles with the pipeline.',
    deliverables: [
      'Sub-account, users and permission structure',
      'Custom fields, tags and lead-source taxonomy',
      'Contact import, dedupe and field mapping',
      'A2P 10DLC brand and campaign registration',
    ],
    span: 'wide',
  },
  {
    id: 'pipelines',
    name: 'Pipelines & opportunity management',
    blurb:
      'Stages named after the decision the buyer is making, not after internal tasks. Every stage has an entry rule, an owner, an automation, and a stall timer so nothing quietly rots in the board.',
    deliverables: [
      'Stage definitions with entry and exit criteria',
      'Automatic opportunity creation and assignment',
      'Stale-deal detection and re-engagement triggers',
      'Won/lost reason capture for reporting',
    ],
    span: 'standard',
  },
  {
    id: 'workflows',
    name: 'Workflow automation',
    blurb:
      'The engine room. Branching workflows with wait steps, conditional logic, internal notifications and safe exits, built so a lead can never sit in two conflicting sequences at once.',
    deliverables: [
      'Trigger and branch mapping before a single step is built',
      'Conditional logic, wait steps and goal exits',
      'Anti-collision rules across concurrent workflows',
      'Internal alerts, task creation and round-robin routing',
    ],
    span: 'standard',
  },
  {
    id: 'funnels',
    name: 'Funnels & landing pages',
    blurb:
      'Opt-ins, quote requests, VSL pages, booking pages and thank-you flows. Fast, mobile-first, tracked end to end, and wired straight into the CRM rather than an orphan form.',
    deliverables: [
      'Landing page and multi-step funnel build',
      'Forms and surveys with conditional questions',
      'Custom HTML/CSS/JS where the builder runs out',
      'Conversion tracking and thank-you routing',
    ],
    span: 'standard',
  },
  {
    id: 'messaging',
    name: 'Email/SMS automation',
    blurb:
      'Sequences for new leads, confirmations, reminders, no-shows, reactivation and review requests — written to sound like a person, throttled to respect quiet hours and compliance.',
    deliverables: [
      'Speed-to-lead first-touch sequences',
      'Appointment confirmation, reminder and no-show flows',
      'Nurture, reactivation and review-request campaigns',
      'Opt-out handling and quiet-hour windows',
    ],
    span: 'standard',
  },
  {
    id: 'ai',
    name: 'AI chatbot & Voice AI',
    blurb:
      'Conversation AI on web chat, SMS and phone that qualifies, answers real questions, books into a live calendar, and hands off to a human the moment it should stop guessing.',
    deliverables: [
      'Qualification script and knowledge base',
      'Booking-capable chat and voice agents',
      'Human handoff and escalation rules',
      'Transcript logging back onto the contact record',
    ],
    span: 'wide',
  },
  {
    id: 'calendars',
    name: 'Calendar & appointment automation',
    blurb:
      'Round-robin and team calendars with real availability, buffers, service durations, reschedule links, and reminder cadences tuned to the show-rate problem you actually have.',
    deliverables: [
      'Service, team and round-robin calendar setup',
      'Availability, buffers and booking limits',
      'Reminder cadence and reschedule self-service',
      'No-show recovery automation',
    ],
    span: 'standard',
  },
  {
    id: 'integrations',
    name: 'API, webhook, Zapier, Make and n8n integrations',
    blurb:
      'Where GoHighLevel ends, the integration starts. Inbound and outbound webhooks, the GHL API, and orchestration in Zapier, Make or n8n — with retries and logging so a silent failure is visible.',
    deliverables: [
      'Inbound/outbound webhooks and custom API calls',
      'Zapier, Make and n8n scenario builds',
      'Ad-platform, form and telephony connections',
      'Error handling, retries and failure alerts',
    ],
    span: 'standard',
  },
]

/** The lead-to-customer chain, section by section. */
export type FlowStage = {
  index: string
  title: string
  detail: string
  nodes: string[]
  tone: 'wire' | 'signal' | 'moss'
}

export const flowStages: FlowStage[] = [
  {
    index: '01',
    title: 'Facebook / Google / Website',
    detail:
      'Paid forms, call extensions, chat widgets and funnel opt-ins all land in one place with their source attached.',
    nodes: ['Lead ads', 'Search & LSA', 'Funnel opt-in', 'Web chat'],
    tone: 'wire',
  },
  {
    index: '02',
    title: 'GoHighLevel CRM',
    detail:
      'Contact created or matched, fields mapped, source tagged, opportunity opened and assigned to an owner.',
    nodes: ['Dedupe & match', 'Field mapping', 'Opportunity created', 'Owner assigned'],
    tone: 'signal',
  },
  {
    index: '03',
    title: 'AI qualification',
    detail:
      'Budget, timeline, service type and location captured by conversation instead of a form nobody finishes.',
    nodes: ['Intent scoring', 'Service match', 'Disqualify politely', 'Escalate to human'],
    tone: 'signal',
  },
  {
    index: '04',
    title: 'SMS + email + Voice AI',
    detail:
      'First touch inside the window where a lead still remembers enquiring, then a cadence that stops the moment they reply.',
    nodes: ['Speed-to-lead SMS', 'Email sequence', 'AI voice callback', 'Reply detection'],
    tone: 'signal',
  },
  {
    index: '05',
    title: 'Calendar booking',
    detail:
      'Real availability, correct duration, buffers respected, confirmation and reschedule link sent instantly.',
    nodes: ['Round-robin', 'Buffers & limits', 'Confirmation', 'Reschedule link'],
    tone: 'wire',
  },
  {
    index: '06',
    title: 'Sales pipeline',
    detail:
      'The opportunity moves on evidence — booked, attended, quoted, won — and stalls raise their hand.',
    nodes: ['Stage automation', 'Value tracking', 'Stall timers', 'Won/lost reasons'],
    tone: 'wire',
  },
  {
    index: '07',
    title: 'Automated follow-up',
    detail:
      'Nurture for the not-yet, no-show recovery for the missed, and a nudge to the rep for the ones worth a call.',
    nodes: ['No-show recovery', 'Quote follow-up', 'Long-cycle nurture', 'Rep tasks'],
    tone: 'moss',
  },
  {
    index: '08',
    title: 'Customer + review + reactivation',
    detail:
      'Onboarding, a review request at the moment of goodwill, and a database that gets asked again later.',
    nodes: ['Onboarding flow', 'Review request', 'Referral ask', 'Reactivation campaign'],
    tone: 'moss',
  },
]

/** Capability statements written as accomplishments, per the résumé section. */
export const accomplishments = [
  'Designed end-to-end GoHighLevel CRM systems covering lead capture, opportunity management, appointment booking, automated follow-up, and customer nurturing.',
  'Built automated SMS and email workflows for new leads, appointment confirmations, reminders, missed appointments, reactivation, and review requests.',
  'Integrated GoHighLevel with third-party platforms using APIs, webhooks, Zapier, Make, and n8n.',
  'Developed AI-powered lead qualification and appointment-booking systems using chat and voice automation.',
  'Built funnels, landing pages and forms with custom HTML, CSS and JavaScript where the page builder reached its limits.',
  'Handled A2P 10DLC brand and campaign registration so outbound SMS stayed deliverable and compliant.',
]

export const workingMethod = [
  {
    step: 'Map',
    body: 'Before anything is built: the lead sources, the stages, the people who touch a deal, and the exact points where leads currently go quiet.',
  },
  {
    step: 'Build',
    body: 'CRM structure first, then pipelines, then workflows, then the funnel and AI layers on top. Built in that order so nothing is wired to a moving target.',
  },
  {
    step: 'Test',
    body: 'Every path walked with a real test contact — including the ugly ones: duplicate leads, replies mid-sequence, no-shows, opt-outs.',
  },
  {
    step: 'Hand over',
    body: 'A loom-style walkthrough, a written map of the system, and naming conventions your team can extend without breaking anything.',
  },
]

export const navigation = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/systems', label: 'Systems' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const
