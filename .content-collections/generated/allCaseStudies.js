
export default [
  {
    "order": 4,
    "title": "Agency CRM",
    "tagline": "Lead capture to discovery call to proposal to onboarding, with nothing tracked in a spreadsheet.",
    "industry": "Agencies & Consultants",
    "label": "Demo Build",
    "problem": "New enquiries were handled personally and inconsistently. Discovery calls were booked over email threads, proposals were sent and chased by memory, and won clients were onboarded from a checklist that lived in one person's head. Nobody could see how many deals were actually live.",
    "solution": "A GoHighLevel pipeline built around the buying decision — New Enquiry, Discovery Booked, Discovery Held, Proposal Sent, Won, Lost — with automation on every transition. A qualification form gates the calendar, a pre-call sequence lifts attendance, proposal follow-up runs on a fixed cadence with a stall timer, and a Won transition launches the onboarding sequence and creates the internal setup tasks.",
    "tech": [
      "GoHighLevel",
      "Pipelines",
      "Forms & funnels",
      "Calendars",
      "Zapier",
      "Make"
    ],
    "chain": [
      "Lead capture",
      "Qualification form",
      "Discovery call booked",
      "Pre-call nurture",
      "Proposal sent",
      "Won / Lost with reason",
      "Onboarding sequence"
    ],
    "designTargets": [
      "No discovery call booked without qualification answers attached",
      "Every proposal followed up on a fixed cadence, not from memory",
      "Won and lost reasons captured on 100% of closed opportunities",
      "Onboarding started the same day a deal is marked won"
    ],
    "panels": [
      "funnel",
      "pipeline",
      "workflow",
      "report"
    ],
    "content": "## Qualification before the calendar\n\nThe booking page sits behind a short form: budget band, service interest, timeline, and one open question about what they are trying to fix. The answers write to custom fields and appear on the opportunity, so the call opens with context instead of discovery-by-interrogation. Below-threshold budgets are routed to a resources page and a nurture list rather than onto the calendar.\n\n## Show-rate work\n\nA discovery call is the most expensive slot in an agency's week, so the sequence protects it: immediate confirmation with an agenda, a value-led email the day before, a reminder two hours out with the join link, and a reschedule link in every message. No-shows trigger a same-day recovery message with two new slots.\n\n## Proposal follow-up with a stall timer\n\nProposal Sent carries a deal value and a date. The cadence runs day 2, day 5 and day 9. If the opportunity is still in that stage on day 14, the workflow raises an internal alert instead of letting it sit — the deal either moves or gets a closing reason.\n\nLost requires a reason from a fixed list: price, timing, went in-house, chose another provider, no response. That single field is what makes the pipeline report worth reading a quarter later.\n\n## The Won transition\n\nMarking an opportunity won does five things at once: sends the welcome email with next steps, sends the onboarding form, books the kickoff call, creates the internal setup tasks, and adds the client to the reporting cadence. The parts that used to depend on remembering now depend on a stage change.",
    "_meta": {
      "filePath": "agency-crm.md",
      "fileName": "agency-crm.md",
      "directory": ".",
      "extension": "md",
      "path": "agency-crm"
    }
  },
  {
    "order": 3,
    "title": "AI Voice Agent",
    "tagline": "An inbound and outbound voice agent that qualifies, books, and writes back to the CRM.",
    "industry": "Multi-industry",
    "label": "Demo Build",
    "problem": "Calls were the highest-intent channel and the worst-handled one. Missed calls went to a voicemail nobody checked, after-hours enquiries were lost entirely, and outbound callbacks depended on someone finding a gap between jobs.",
    "solution": "A Voice AI agent wired into GoHighLevel that answers inbound calls, handles the missed-call case with an immediate callback, and calls new leads outbound within minutes of the form submission. The agent qualifies against a defined script, reads live calendar availability, books the appointment on the call, and writes the transcript, outcome and captured fields back onto the contact before it hangs up.",
    "tech": [
      "Voice AI",
      "GoHighLevel",
      "Webhooks & API",
      "Calendar API",
      "n8n"
    ],
    "chain": [
      "Inbound call or new lead",
      "AI voice call",
      "Qualification on the call",
      "Live calendar booking",
      "Opportunity updated",
      "Transcript logged",
      "Human task if escalated"
    ],
    "designTargets": [
      "Every inbound call answered, including outside business hours",
      "Outbound callback attempted within five minutes of a new lead",
      "Booking completed inside the call rather than promised for later",
      "Full transcript and outcome on the contact record for every call"
    ],
    "panels": [
      "voice",
      "workflow",
      "calendar",
      "pipeline"
    ],
    "content": "## The three call paths\n\n**Inbound answered.** The agent greets, identifies the service needed, checks whether the caller already exists in the CRM, and either books or routes. A returning customer is greeted as one.\n\n**Missed call.** A missed-call trigger fires a text-back immediately and queues an outbound AI call for two minutes later. Two channels, one attempt each, no ringing the customer four times.\n\n**Outbound on new lead.** A form submission triggers the agent to call while the enquiry is still fresh. If nobody picks up, the workflow falls back to SMS rather than redialling into annoyance.\n\n## Booking on the call\n\nThe agent does not offer to \"have someone call you back to arrange a time.\" It reads live availability from the calendar, offers two concrete slots, confirms one, and creates the appointment before the call ends. The confirmation SMS is already in the customer's hand as they hang up.\n\n## Guardrails\n\nAn unsupervised voice agent needs limits, and these are the ones worth building:\n\n- **Escalation on uncertainty.** Pricing negotiations, complaints and anything outside the knowledge base transfer to a human or create an urgent task with the transcript attached.\n- **Disclosure.** The agent identifies itself as an automated assistant at the start of the call.\n- **Do-not-call respect.** Opt-outs and DNC flags are checked before any outbound call is queued.\n- **Attempt caps.** A maximum of two outbound attempts per lead per day, and a hard stop after the cadence completes.\n- **Failure visibility.** Failed API writes raise an internal alert through n8n instead of silently dropping the call outcome.\n\n## What lands on the record\n\nEvery call writes back: outcome, qualification fields, appointment ID where booked, a recording link, and a full transcript. That is the difference between a voice agent and a black box — the next person to speak to that customer can read what was already said.",
    "_meta": {
      "filePath": "ai-voice-agent.md",
      "fileName": "ai-voice-agent.md",
      "directory": ".",
      "extension": "md",
      "path": "ai-voice-agent"
    }
  },
  {
    "order": 5,
    "title": "Appointment Reactivation System",
    "tagline": "A database campaign that reopens old leads with AI conversation instead of a blast.",
    "industry": "Multi-industry",
    "label": "Demo Build",
    "problem": "Thousands of old leads sat in the CRM doing nothing — enquiries that never booked, quotes that went quiet, no-shows that were never rescheduled. The only tool anyone had used on them was a mass email that produced unsubscribes and no bookings.",
    "solution": "A segmented reactivation campaign that treats the database as a list of specific situations rather than one audience. Each segment gets its own opening message, then Conversation AI handles the reply — answering questions, re-qualifying, and booking straight into the calendar. Rebooked leads re-enter the live pipeline at the right stage, and non-responders are parked on a long-cycle nurture rather than burned.",
    "tech": [
      "GoHighLevel",
      "Conversation AI",
      "SMS/Email campaigns",
      "Pipelines",
      "Webhooks"
    ],
    "chain": [
      "Segment old leads",
      "SMS/Email reactivation",
      "AI conversation on reply",
      "Re-qualification",
      "Calendar rebooking",
      "Pipeline re-entry",
      "Long-cycle nurture"
    ],
    "designTargets": [
      "Dormant records segmented by reason they went quiet, not by date alone",
      "Every reply handled within a minute, day or night",
      "Opt-outs honoured and suppressed permanently on first request",
      "Rebooked leads re-entering the pipeline at the correct stage"
    ],
    "panels": [
      "chat",
      "workflow",
      "pipeline",
      "report"
    ],
    "content": "## Segmentation first\n\nA reactivation campaign fails when it is one message to everybody. The database is split by why the lead stopped:\n\n- **Never contacted** — enquired, nobody called. Opening message apologises and offers a slot.\n- **Quoted, no decision** — has a number in hand. Opening message references the quote and offers to revisit it.\n- **No-showed** — booked and missed. Opening message is friendly and offers two new times, with no guilt attached.\n- **Explicit not-now** — asked to be contacted later. Opening message references the timing they gave.\n\nEach segment gets its own copy, its own AI context, and its own success measure.\n\n## Sending like a person, not a blast\n\nSends are throttled in batches across the day rather than fired at once — partly for deliverability, mostly because a team cannot absorb four hundred simultaneous replies. Quiet hours are enforced. Anyone who has opted out, marked as a customer, or is currently live in another pipeline is suppressed before the campaign runs.\n\n## Where the AI earns its place\n\nReactivation replies are messy: \"who is this?\", \"how much again?\", \"I already sorted it\", \"maybe next month\". Conversation AI handles all four correctly — re-identifying the business, restating the offer, cleanly closing out the ones who are done, and setting a dated follow-up for the maybes. Anything resembling a complaint stops the AI and alerts a human immediately.\n\n## Closing the loop\n\nA rebooked lead does not go back to the top of the funnel. The workflow re-opens the original opportunity, sets the stage to Appointment Booked, tags the reactivation campaign that produced it, and adds it to the standard reminder cadence. Non-responders after the full sequence move to a quarterly nurture, which means the same database can be worked again later without being scorched.",
    "_meta": {
      "filePath": "appointment-reactivation.md",
      "fileName": "appointment-reactivation.md",
      "directory": ".",
      "extension": "md",
      "path": "appointment-reactivation"
    }
  },
  {
    "order": 2,
    "title": "Home Services CRM",
    "tagline": "Estimate request to completed job to a five-star review, on one track.",
    "industry": "Home Services",
    "label": "Demo Build",
    "problem": "Quote requests came in by phone, web form and text, and lived in three different places. Estimates were sent and then forgotten. Crews arrived at empty houses because nobody confirmed the day before, and reviews only happened when a customer felt like it.",
    "solution": "A single intake that normalises every enquiry into one contact record with a service type and address, then a pipeline that walks the job from estimate request through scheduled visit, quote sent, job won, job complete and review requested. Reminders go out at 24 hours and 1 hour with a confirm-or-reschedule reply option, quote follow-up runs on a three-touch cadence, and a review request fires the day after job completion.",
    "tech": [
      "GoHighLevel",
      "Forms & funnels",
      "SMS/Email workflows",
      "Calendars",
      "Reputation management"
    ],
    "chain": [
      "Phone / form / text enquiry",
      "Estimate request captured",
      "Site visit booked",
      "Reminder + confirmation",
      "Quote sent & followed up",
      "Job complete",
      "Review request"
    ],
    "designTargets": [
      "One record per customer regardless of which channel they used",
      "Every scheduled visit confirmed before the crew leaves the yard",
      "No quote left without follow-up for more than three days",
      "Review request sent on every completed job, automatically"
    ],
    "panels": [
      "funnel",
      "pipeline",
      "calendar",
      "report"
    ],
    "content": "## Intake that survives real life\n\nHome services enquiries do not arrive politely. The same customer will fill in a form, then call, then text a photo of their broken boiler. The intake workflow matches on phone number first and email second, so those three touches collapse into one contact with one open opportunity — and the photo attaches to the record instead of living in someone's camera roll.\n\nA short estimate-request form captures service type, property type, address and urgency. Urgency drives routing: same-day jobs notify the on-call number directly instead of entering the standard cadence.\n\n## The reminder cadence that fixes show rate\n\n- **On booking:** confirmation with the arrival window and the technician's name.\n- **24 hours before:** reminder with a one-tap confirm and a reschedule link.\n- **1 hour before:** \"we're on the way\" message.\n- **On no-answer at the door:** a workflow triggered by the crew's status update, which texts the customer and offers the next two slots.\n\n## Quote follow-up\n\nQuote sent is a stage, not an email. The opportunity carries the quote value, and a three-touch cadence runs over eight days: a check-in, an offer to walk through the line items, and a final \"still want this?\" message. Any reply pauses the cadence and creates a task. Silence at the end moves the opportunity to a long-cycle nurture list rather than to lost — those records are the fuel for the reactivation system.\n\n## Reviews as a system, not a favour\n\nThe day after a job is marked complete, a review request goes out with a direct link. Positive responses route to the public review profile; anything lukewarm routes to a private feedback form and an internal alert, so a problem gets a phone call rather than a one-star review.",
    "_meta": {
      "filePath": "home-services-crm.md",
      "fileName": "home-services-crm.md",
      "directory": ".",
      "extension": "md",
      "path": "home-services-crm"
    }
  },
  {
    "order": 1,
    "title": "Real Estate Lead Conversion System",
    "tagline": "Facebook lead ads to a qualified, booked viewing without a human touching the first reply.",
    "industry": "Real Estate",
    "label": "Demo Build",
    "problem": "Facebook lead ads produced volume, but the agent was the bottleneck. Leads arrived while they were mid-viewing, sat unanswered for hours, and by the time anyone called, three other agents had already spoken to them. Nobody could say which campaign produced a booking.",
    "solution": "A GoHighLevel workflow that receives the lead ad submission, creates the contact with its campaign and ad set attached, opens an opportunity, and fires an SMS within seconds. Conversation AI then qualifies on buy-or-sell intent, area, timeline and finance status, offers live calendar slots, books the viewing, and moves the opportunity to Appointment Booked. Unanswered leads roll into a seven-touch cadence; replies stop it instantly.",
    "tech": [
      "GoHighLevel",
      "Facebook Lead Ads",
      "Conversation AI",
      "Webhooks",
      "Round-robin calendar"
    ],
    "chain": [
      "Facebook lead ad",
      "GHL contact + opportunity",
      "Speed-to-lead SMS",
      "AI qualification",
      "Calendar booking",
      "Pipeline stage move",
      "Nurture if no reply"
    ],
    "designTargets": [
      "First outbound message sent in under 60 seconds of form submission",
      "Qualification captured without a human on the first exchange",
      "Every booking attributable to campaign, ad set and lead form",
      "Zero leads sitting in an untouched state for more than 24 hours"
    ],
    "panels": [
      "workflow",
      "chat",
      "pipeline",
      "calendar"
    ],
    "content": "## How the build is wired\n\nThe Facebook lead form posts straight into GoHighLevel rather than into an inbox. Field mapping is deliberate: `campaign_name`, `adset_name` and `form_name` land in custom fields on the contact, so pipeline reporting can be sliced by ad spend later without re-plumbing anything.\n\nContact creation and opportunity creation are separated. A repeat enquiry matches the existing contact, but still opens a new opportunity — so a buyer who enquires in March and again in September is one person with two deals, not two half-duplicated records.\n\n## The qualification conversation\n\nConversation AI runs a short script rather than an interrogation:\n\n1. Confirm whether they are buying, selling, or renting.\n2. Confirm the area and the price band.\n3. Confirm timeline — this month, this quarter, or browsing.\n4. For buyers: whether finance is already arranged.\n5. Offer two live calendar slots, then book.\n\nAnything the AI cannot answer — a legal question, a specific negotiation, a complaint — triggers an immediate handoff: the workflow assigns a task to the agent, notifies them by SMS, and stops the AI from replying again on that thread.\n\n## The parts that usually get skipped\n\n- **Anti-collision.** A lead already inside the nurture cadence cannot be enrolled a second time; the workflow checks for the tag before it enrolls.\n- **Quiet hours.** Messages that would land between 9pm and 8am local are held until the morning window rather than fired immediately.\n- **Reply detection.** Any inbound message removes the nurture tag and marks the conversation for a human, because a person typing is worth more than a sequence continuing.\n- **Attribution back to spend.** Won opportunities carry their originating ad set, so cost per booked viewing is a report rather than a guess.",
    "_meta": {
      "filePath": "real-estate-lead-conversion.md",
      "fileName": "real-estate-lead-conversion.md",
      "directory": ".",
      "extension": "md",
      "path": "real-estate-lead-conversion"
    }
  }
]