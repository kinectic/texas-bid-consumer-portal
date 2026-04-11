export const marketplaceCopy = {
  eyebrow: 'Product prototype',
  title: 'Texas procurement, without the ugly parts.',
  intro:
    'A structured Texas-first portal where government agencies can post opportunities and vendors can discover and submit directly.',
  vendorSignInLabel: 'Vendor Sign In',
  postBidLabel: 'Post a Bid',
  marketplaceFiltersTitle: 'Marketplace filters',
  marketplaceFilters: ['All', 'Open', 'Facilities', 'Professional'] as const,
  marketplaceFeedEyebrow: 'Vendor discovery',
  marketplaceFeedTitle: 'Marketplace feed',
  marketplaceFeedDescription:
    'What vendors see when they browse live opportunities and decide which bid deserves action next.',
  metadataTitle: 'Marketplace metadata',
  legendTitle: 'Marketplace status legend',
  detailEyebrow: 'Qualification',
  detailTitle: 'Opportunity detail',
  detailDescription:
    'The focused opportunity view vendors use when deciding whether to move into the submission workflow.',
  detailSummaryTitle: 'Opportunity summary',
  detailSummarySubtitle: 'Focused vendor-facing summary before moving into the submission workflow.',
  detailDocumentsTitle: 'Opportunity documents',
  selectionContextTitle: 'Selected opportunity + submission context',
  submissionWorkspaceTitle: 'Submission workspace',
  vendorActionEyebrow: 'Vendor action',
  vendorActionTitle: 'Ready to respond',
  vendorActionDescription:
    'Move from marketplace review into a direct submission flow without leaving the product.',
  vendorActionNote:
    'This is the product promise: discover, qualify, and act in one clearer Texas-first procurement surface.',
} as const

export const marketplaceStatsItems = [
  { value: '2,092+', label: 'Texas opportunities visible in ecosystem research' },
  { value: 3, label: 'Core workflows shown in this prototype' },
  { value: 1, label: 'Texas-first experience instead of generic procurement clutter' },
] as const

export const agencyFlowSteps = [
  'Create agency profile',
  'Draft solicitation with deadlines and attachments',
  'Publish to Texas marketplace',
  'Review vendor responses in one dashboard',
] as const
