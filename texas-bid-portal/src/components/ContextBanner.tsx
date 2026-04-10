import type { ViewKey } from '../data/viewData'

type ContextBannerProps = {
  activeView: ViewKey
}

const contextMap: Record<ViewKey, { lane: string; summary: string }> = {
  home: {
    lane: 'Platform overview',
    summary: 'This shell shows the major TexasBid workflow lanes and current MVP shape.',
  },
  marketplace: {
    lane: 'Vendor discovery',
    summary: 'Vendors browse Texas opportunities and decide what to pursue.',
  },
  opportunity: {
    lane: 'Opportunity qualification',
    summary: 'Vendors evaluate fit, requirements, documents, and urgency before responding.',
  },
  'agency-dashboard': {
    lane: 'Agency operations',
    summary: 'Agencies monitor active bids, drafts, and recent submissions from one dashboard.',
  },
  'create-bid': {
    lane: 'Agency posting flow',
    summary: 'Agencies draft and publish a structured solicitation directly inside the product.',
  },
  'vendor-dashboard': {
    lane: 'Vendor operations',
    summary: 'Vendors track saved bids, compliance readiness, and active submissions.',
  },
  'submission-workflow': {
    lane: 'Direct submission flow',
    summary: 'Vendors prepare attachments and submit responses without leaving the portal.',
  },
}

export function ContextBanner({ activeView }: ContextBannerProps) {
  const context = contextMap[activeView]

  return (
    <section className="context-banner">
      <div>
        <div className="context-label">Current workflow lane</div>
        <strong>{context.lane}</strong>
      </div>
      <p>{context.summary}</p>
    </section>
  )
}
