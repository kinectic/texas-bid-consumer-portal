import type { ViewKey } from './viewData'

export const navigationLabels: Record<ViewKey, { short: string; stageAware: string }> = {
  home: { short: 'Texas Home', stageAware: 'Start here · post a job, discover local pros, and understand how the marketplace works' },
  marketplace: { short: 'Find Contractors', stageAware: 'Discover matches · browse Texas jobs and local contractor fit by area and trade' },
  opportunity: { short: 'Job Match', stageAware: 'Compare bids · review scope, timing, trust signals, and next actions' },
  'vendor-dashboard': { short: 'My Jobs', stageAware: 'Customer workspace · track requests, incoming bids, and selected contractors' },
  'submission-workflow': { short: 'Review Bids', stageAware: 'Decision workspace · compare contractors and choose confidently' },
  'contractor-onboarding': { short: 'For Contractors', stageAware: 'Contractor entry · explain verification, profile setup, and how to start bidding' },
  messages: { short: 'Messages', stageAware: 'Conversation layer · keep job questions and bid follow-up inside the platform' },
  'trust-center': { short: 'Trust Center', stageAware: 'Trust layer · show verification tiers, proof signals, and marketplace standards' },
  'how-it-works': { short: 'How It Works', stageAware: 'Customer explainer · show the simple post, compare, and hire flow end-to-end' },
}
