import type { ViewKey } from './viewData'

export const workflowStageLabels: Record<ViewKey, { stage: string; owner: string }> = {
  home: { stage: 'Platform overview', owner: 'Shared' },
  marketplace: { stage: 'Discovery', owner: 'Shared' },
  opportunity: { stage: 'Qualification', owner: 'Customer' },
  'vendor-dashboard': { stage: 'Workspace / tracking', owner: 'Customer' },
  'submission-workflow': { stage: 'Bid comparison / selection', owner: 'Customer' },
  'contractor-onboarding': { stage: 'Onboarding / verification', owner: 'Contractor' },
  messages: { stage: 'Messaging / follow-up', owner: 'Shared' },
  'trust-center': { stage: 'Trust / proof', owner: 'Shared' },
  'how-it-works': { stage: 'Onboarding / explainer', owner: 'Shared' },
}
