export const homeDashboardCopy = {
  eyebrow: 'Texas-first consumer marketplace',
  title: 'Post a job once. Compare trusted Texas contractors in one cleaner hiring flow.',
  intro:
    'TexasBid should feel like the easiest way for a homeowner, property manager, or local business to describe a job, see serious local contractors, compare bids, and choose confidently without bouncing across tools.',
  productMapLabel: 'View marketplace map',
  enterWorkflowLabel: 'Explore local matches',
  primaryActionTitle: 'Start with the real customer loop',
  primaryActionDescription:
    'Lead with the customer journey: post a job, review local matches, compare bids, then keep conversation and status attached to the record.',
  createBidLabel: 'Post a job',
  reviewLiveOpportunityLabel: 'Review local matches',
  reviewSubmissionsLabel: 'Compare bids',
  workflowLandingTitle: 'Marketplace workflow',
  suggestedOpportunitiesTitle: 'Suggested Texas job matches',
  suggestedOpportunitiesAction: 'Open job matches',
  opportunityReadinessTitle: 'Marketplace readiness scan',
  currentBuildLanesTitle: 'Current build lanes',
  customerValueTitle: 'Why this feels better',
  customerValuePoints: [
    'Simple Texas-first job posting instead of generic intake friction',
    'Visible contractor trust signals before you waste time talking',
    'Bid comparison and messaging in one flow instead of scattered follow-up',
  ],
  launchTrustTitle: 'Built for an early real launch',
  launchTrustPoints: [
    'Free for customers and contractors during the initial launch phase',
    'Layered verification helps strong contractors stand out without slowing down early supply',
    'Texas-first local matching keeps the marketplace focused on real nearby hiring decisions',
  ],
} as const

export const homeWorkflowCards = [
  {
    key: 'marketplace',
    title: 'Local contractor discovery',
    description: 'Browse Texas contractors and job matches with cleaner local context, trust signals, and next-step clarity.',
  },
  {
    key: 'contractor-onboarding',
    title: 'Contractor readiness',
    description: 'Help contractors join, verify, and become visible without heavy onboarding friction.',
  },
  {
    key: 'submission-workflow',
    title: 'Bid comparison and hiring',
    description: 'Move from job match review into actual quote comparison and confident selection without leaving the product.',
  },
] as const

export const homeMilestoneCards = [
  'Texas marketplace entry and local value story',
  'Marketplace feed and job match detail',
  'Customer workspace and bid review flow',
  'Contractor onboarding, trust, and messaging layers',
] as const

export const homeDraftPipelineItems = [
  {
    title: 'Customer job posting flow',
    detail: 'Turn the marketplace into a real customer workflow instead of a browse-only shell.',
  },
  {
    title: 'Bid comparison workspace polish',
    detail: 'Make price, timing, trust, and fit easier to compare side by side.',
  },
  {
    title: 'Messaging + trust continuity',
    detail: 'Keep contractor proof and conversation flow connected across comparison and hiring.',
  },
] as const

export const homeLifecycleSteps = [
  {
    stage: '1. Customer posts a job',
    detail: 'A Texas customer defines the work, urgency, location, and expectations in plain language.',
  },
  {
    stage: '2. Contractors get matched locally',
    detail: 'Relevant contractors appear with trade fit, service area coverage, and visible trust signals.',
  },
  {
    stage: '3. Customer compares bids and questions',
    detail: 'The customer reviews price, timing, proof, and follow-up context in one place.',
  },
  {
    stage: '4. A contractor is selected',
    detail: 'The platform makes it easy to choose confidently instead of juggling scattered channels.',
  },
  {
    stage: '5. Job progress stays visible',
    detail: 'Status, conversation history, and job milestones remain connected after selection.',
  },
] as const
