import type { ViewKey } from './viewData'

export const workflowStageLabels: Record<ViewKey, { stage: string; owner: string }> = {
  home: { stage: 'Platform overview', owner: 'Shared' },
  marketplace: { stage: 'Discovery', owner: 'Vendor' },
  opportunity: { stage: 'Qualification', owner: 'Vendor' },
  'agency-dashboard': { stage: 'Operations', owner: 'Agency' },
  'create-bid': { stage: 'Drafting / publishing', owner: 'Agency' },
  'agency-submission-review': { stage: 'Review / decision', owner: 'Agency' },
  'vendor-dashboard': { stage: 'Workspace / tracking', owner: 'Vendor' },
  'submission-workflow': { stage: 'Response assembly', owner: 'Vendor' },
}
