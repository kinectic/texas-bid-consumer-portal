export const agencyDashboardCopy = {
  workspaceEyebrow: 'Verified agency workspace',
  title: 'Agency operations dashboard',
  intro:
    'A state-presentation-ready control center for verified procurement teams to manage live bids, vendor activity, and fast next actions without portal clutter.',
  exportActivityLabel: 'Export Activity',
  newBidLabel: 'New Bid',
  prioritiesTitle: 'Agency operating priorities',
  prioritiesDescription: 'Move the procurement flow forward from controlled onboarding through publishing and review.',
  activeOpportunitiesTitle: 'Active agency opportunities',
  activeOpportunitiesSubtitle: 'Live postings now visible to the vendor marketplace',
  manageDeadlinesLabel: 'Manage deadlines',
  draftPublishTitle: 'Draft publishing readiness',
  selectionContextTitle: 'Selected opportunity + submission context',
  milestonesTitle: 'Agency workflow milestones',
  currentSubmissionActivityTitle: 'Submission activity — current opportunity',
  allSubmissionActivityTitle: 'Submission activity — all opportunities',
  queueScopeTitle: 'Submission queue scope',
  queueScopeCurrent: 'Current opportunity',
  queueScopeAll: 'All opportunities',
  queueScopeSummary: (currentCount: number, totalCount: number) =>
    `Current opportunity submissions: ${currentCount} • All submissions: ${totalCount}`,
} as const

export const agencyPriorityControls = [
  { label: 'Create new bid', className: 'primary wide' as const },
  { label: 'Manage deadlines', className: 'ghost wide' as const },
  { label: 'Review submissions', className: 'ghost wide' as const },
] as const

export const agencyDraftPipelineItems = [
  {
    title: 'North Texas agency enrollment',
    detail: 'County procurement office queued for verified workspace provisioning',
  },
  {
    title: 'IT Equipment Replacement RFP',
    detail: 'Awaiting attachments and insurance requirements',
  },
] as const

export const agencyMilestoneItems = [
  'Agency access request demo lane',
  'Controlled create-bid workflow connected to publishing state',
  'Submission review and vendor activity tracking',
] as const
