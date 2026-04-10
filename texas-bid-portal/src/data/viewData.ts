export type ViewKey =
  | 'home'
  | 'marketplace'
  | 'opportunity'
  | 'agency-dashboard'
  | 'create-bid'
  | 'vendor-dashboard'
  | 'submission-workflow'

export const viewOrder: { key: ViewKey; label: string }[] = [
  { key: 'home', label: 'Overview' },
  { key: 'marketplace', label: 'Marketplace' },
  { key: 'opportunity', label: 'Opportunity Detail' },
  { key: 'agency-dashboard', label: 'Agency Dashboard' },
  { key: 'create-bid', label: 'Create Bid' },
  { key: 'vendor-dashboard', label: 'Vendor Dashboard' },
  { key: 'submission-workflow', label: 'Submission Workflow' },
]
