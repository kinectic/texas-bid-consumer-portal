export const homeDashboardCopy = {
  eyebrow: 'TexasBid MVP',
  title: 'Texas procurement platform overview',
  intro:
    'One landing screen that shows the real product shape: agency posting, vendor discovery, direct submissions, and a cleaner Texas-first workflow than generic bidding portals.',
  productMapLabel: 'View product map',
  enterWorkflowLabel: 'Enter workflow',
  primaryActionTitle: 'Start the next move',
  primaryActionDescription:
    'Jump straight into the most important lifecycle actions for agencies or vendors.',
  createBidLabel: 'Create a bid',
  reviewLiveOpportunityLabel: 'Review live opportunity',
  reviewSubmissionsLabel: 'Review submissions',
  workflowLandingTitle: 'Workflow landing',
  suggestedOpportunitiesTitle: 'Suggested opportunities',
  suggestedOpportunitiesAction: 'Review opportunities',
  opportunityReadinessTitle: 'Opportunity readiness scan',
  currentBuildLanesTitle: 'Current build lanes',
} as const

export const homeWorkflowCards = [
  {
    key: 'marketplace',
    title: 'Marketplace search',
    description: 'Browse and qualify Texas opportunities with cleaner sourcing and next-step clarity.',
  },
  {
    key: 'create-bid',
    title: 'Agency posting',
    description: 'Create, structure, and publish solicitations from a direct agency workflow.',
  },
  {
    key: 'submission-workflow',
    title: 'Vendor response',
    description: 'Move from saved opportunity to actual submission without leaving the portal.',
  },
] as const

export const homeMilestoneCards = [
  'Marketplace feed and opportunity detail',
  'Agency dashboard and bid creation',
  'Vendor dashboard and submission workflow',
  'Interactive shell navigation across the built prototype',
] as const

export const homeDraftPipelineItems = [
  {
    title: 'Agency draft quality pass',
    detail: 'Refining the bid form, publishing readiness, and operational review surfaces.',
  },
  {
    title: 'Vendor submission continuity',
    detail: 'Keeping vendor response assembly and status tracking connected across the MVP.',
  },
] as const

export const homeLifecycleSteps = [
  {
    stage: '1. Agency drafts bid',
    detail: 'The procurement team structures the solicitation in the create-bid workflow.',
  },
  {
    stage: '2. Bid is published',
    detail: 'The opportunity appears in the marketplace with Texas-local sourcing clarity.',
  },
  {
    stage: '3. Vendor qualifies opportunity',
    detail: 'The vendor reviews fit, documents, and urgency from the detail screen.',
  },
  {
    stage: '4. Vendor submits response',
    detail: 'The submission workflow captures pricing, attachments, and confirmation in-platform.',
  },
  {
    stage: '5. Agency reviews responses',
    detail: 'The review lane supports triage, completeness checks, and shortlist decisions.',
  },
] as const
