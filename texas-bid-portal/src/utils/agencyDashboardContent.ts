export const agencyDashboardCopy = {
  workspaceEyebrow: 'Agency workspace',
  title: 'Agency dashboard',
  intro:
    'A Texas-first control center for procurement teams to manage live bids, vendor activity, and fast next actions without portal clutter.',
  exportActivityLabel: 'Export Activity',
  newBidLabel: 'New Bid',
  prioritiesTitle: 'Agency priorities',
  prioritiesDescription: 'Move the procurement flow forward from draft through publishing and review.',
  activeOpportunitiesTitle: 'Active opportunities',
  activeOpportunitiesSubtitle: 'Live agency postings with vendor-facing visibility',
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
    title: 'Transit Shelter Cleaning Services',
    detail: 'Draft ready for legal review',
  },
  {
    title: 'IT Equipment Replacement RFP',
    detail: 'Awaiting attachments and insurance requirements',
  },
] as const

export const agencyMilestoneItems = [
  'Create bid workflow connected to publishing state',
  'Agency dashboard active opportunities surface',
  'Submission review and vendor activity tracking',
] as const
