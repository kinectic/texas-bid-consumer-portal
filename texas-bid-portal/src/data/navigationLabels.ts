import type { ViewKey } from './viewData'

export const navigationLabels: Record<ViewKey, { short: string; stageAware: string }> = {
  home: { short: 'Overview', stageAware: 'Overview · shared launch point' },
  marketplace: { short: 'Marketplace', stageAware: 'Discovery · browse live bids' },
  opportunity: { short: 'Opportunity Detail', stageAware: 'Qualification · inspect this bid' },
  'agency-dashboard': { short: 'Agency Dashboard', stageAware: 'Operations · manage agency activity' },
  'create-bid': { short: 'Create Bid', stageAware: 'Drafting · build and publish' },
  'agency-submission-review': { short: 'Agency Review', stageAware: 'Decision · review responses' },
  'vendor-dashboard': { short: 'Vendor Dashboard', stageAware: 'Workspace · track vendor activity' },
  'submission-workflow': { short: 'Submission Workflow', stageAware: 'Response · assemble submission' },
}
