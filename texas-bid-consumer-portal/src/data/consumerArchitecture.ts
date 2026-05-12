import type { ViewKey } from './viewData'

export type ConsumerSurface = {
  key: ViewKey
  title: string
  audience: 'customer' | 'contractor' | 'shared'
  purpose: string
  primaryOutcome: string
}

export const consumerSurfaces: ConsumerSurface[] = [
  {
    key: 'home',
    title: 'Marketplace home',
    audience: 'shared',
    purpose: 'Explain the Texas-first marketplace and route people into the right workflow fast.',
    primaryOutcome: 'A customer posts a job or a contractor enters the marketplace with context.',
  },
  {
    key: 'marketplace',
    title: 'Local marketplace discovery',
    audience: 'shared',
    purpose: 'Let users drill into local Texas demand and contractor coverage by county, city, and trade.',
    primaryOutcome: 'A customer or contractor finds the right local market to act in.',
  },
  {
    key: 'opportunity',
    title: 'Job match workspace',
    audience: 'customer',
    purpose: 'Help a customer understand scope, timing, fit, and bid quality before making contact or choosing a pro.',
    primaryOutcome: 'The customer decides which contractor or bid deserves the next step.',
  },
  {
    key: 'vendor-dashboard',
    title: 'Customer job dashboard',
    audience: 'customer',
    purpose: 'Track posted jobs, bid activity, favorites, and selected contractors in one place.',
    primaryOutcome: 'The customer stays oriented across active jobs without leaving the marketplace.',
  },
  {
    key: 'submission-workflow',
    title: 'Bid comparison workspace',
    audience: 'customer',
    purpose: 'Compare contractor bids, timing, proof, and notes inside a single decision workflow.',
    primaryOutcome: 'The customer confidently narrows to the best contractor response.',
  },
  {
    key: 'contractor-onboarding',
    title: 'Contractor onboarding',
    audience: 'contractor',
    purpose: 'Show how contractors join, verify their business, and start receiving Texas job opportunities.',
    primaryOutcome: 'A contractor understands what is required to become visible and trusted.',
  },
  {
    key: 'messages',
    title: 'Messaging layer',
    audience: 'shared',
    purpose: 'Keep customer and contractor follow-up inside the platform instead of leaking into scattered channels.',
    primaryOutcome: 'Questions, clarifications, and next steps stay attached to the job record.',
  },
  {
    key: 'trust-center',
    title: 'Trust center',
    audience: 'shared',
    purpose: 'Explain verification tiers, response quality, and marketplace standards in plain language.',
    primaryOutcome: 'Users understand why one contractor feels safer or stronger than another.',
  },
]
