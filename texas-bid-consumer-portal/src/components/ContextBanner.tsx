import { workflowStageLabels } from '../data/workflowStages'
import type { ViewKey } from '../data/viewData'

type ContextBannerProps = {
  activeView: ViewKey
}

const contextMap: Record<ViewKey, { lane: string; summary: string; surface: string; boundary: string }> = {
  home: {
    lane: 'Texas consumer marketplace overview',
    summary: 'This product is the consumer and contractor-facing TexasBid experience for posting jobs, comparing bids, and hiring local pros through one cleaner workflow.',
    surface: 'Public-facing home, search, matching, trust, messaging, and bid-review workflow',
    boundary: 'Formal government procurement operations stay in the separate government portal.',
  },
  marketplace: {
    lane: 'Texas contractor discovery',
    summary: 'Customers browse Texas contractors and local jobs by region, trade, urgency, and trust signals.',
    surface: 'Public-facing discovery and local matching',
    boundary: 'Internal agency queues, posting controls, and procurement review tooling are excluded from this portal.',
  },
  opportunity: {
    lane: 'Job-fit comparison',
    summary: 'Customers evaluate scope fit, timing, region, and contractor strength before choosing who to engage.',
    surface: 'Consumer-facing comparison and qualification view',
    boundary: 'Back-office approval controls and government review commentary stay out of the consumer lane.',
  },
  'vendor-dashboard': {
    lane: 'Customer job workspace',
    summary: 'Customers track posted requests, incoming bids, favorites, and selected contractors in one workspace.',
    surface: 'Consumer workspace inside the Texas marketplace',
    boundary: 'No agency-side controls or internal government approvals appear here.',
  },
  'submission-workflow': {
    lane: 'Bid review and selection',
    summary: 'Customers compare quotes, timing, and trust signals before selecting the right Texas contractor.',
    surface: 'Consumer-side decision workflow',
    boundary: 'Government procurement review and award formalization continue in the separate portal when public-sector handoff exists.',
  },
  'contractor-onboarding': {
    lane: 'Contractor onboarding',
    summary: 'Contractors learn how to join the marketplace, verify their business, and start receiving job opportunities.',
    surface: 'Contractor entry and verification framing',
    boundary: 'This stays focused on marketplace readiness, not government vendor-registration bureaucracy.',
  },
  messages: {
    lane: 'In-platform messaging',
    summary: 'Customers and contractors keep questions, clarifications, and next steps attached to the job record.',
    surface: 'Shared communication layer',
    boundary: 'External email, SMS, and government inbox handoffs are not the primary workflow here.',
  },
  'trust-center': {
    lane: 'Marketplace trust layer',
    summary: 'Users see verification tiers, proof signals, and response standards in plain English.',
    surface: 'Shared trust and safety framing',
    boundary: 'This explains trust signals; it does not expose private verification documents or internal review tooling.',
  },
  'how-it-works': {
    lane: 'Customer onboarding explainer',
    summary: 'First-time customers get a plain-language walkthrough of how TexasBid goes from posted job to hired contractor.',
    surface: 'Public-facing explainer and conversion support',
    boundary: 'This page explains the workflow; it does not replace the detailed marketplace, trust, or review surfaces.',
  },
}

export function ContextBanner({ activeView }: ContextBannerProps) {
  const context = contextMap[activeView]
  const stage = workflowStageLabels[activeView]

  return (
    <section className="context-banner">
      <div>
        <div className="context-label">Current workflow lane</div>
        <strong>{context.lane}</strong>
        <div className="context-stage">Stage: {stage.stage} · Owner: {stage.owner}</div>
      </div>
      <div>
        <p>{context.summary}</p>
        <div className="small-note">Surface: {context.surface}</div>
        <div className="small-note">Boundary: {context.boundary}</div>
        <div className="small-note">Texas cue: keep the experience local, simple, and clearly separated from government operations.</div>
      </div>
    </section>
  )
}
