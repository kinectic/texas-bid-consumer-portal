export const marketplaceCopy = {
  eyebrow: 'Texas vendor marketplace',
  title: 'Posted Texas bids, grounded in place instead of clutter.',
  intro:
    'A structured Texas-first marketplace where vendors move through county, city, and posted-bid discovery in a clearer local workflow instead of getting dropped into a generic statewide list.',
  vendorSignInLabel: 'Vendor Sign In',
  postBidLabel: 'Post a Bid',
  marketplaceFiltersTitle: 'Marketplace filters',
  marketplaceFilters: ['All', 'Open', 'Facilities', 'Professional'] as const,
  marketplaceFeedEyebrow: 'Geographic discovery',
  marketplaceFeedTitle: 'Texas discovery lane',
  marketplaceFeedDescription:
    'What vendors see when they move into a county, then a city, then the posted bid set that matters in that local market.',
  metadataTitle: 'Marketplace metadata',
  legendTitle: 'Marketplace status legend',
  detailEyebrow: 'Qualification',
  detailTitle: 'Opportunity detail',
  detailDescription:
    'The focused posted-bid view vendors use when deciding whether to move into the submission workflow.',
  detailSummaryTitle: 'Opportunity summary',
  detailSummarySubtitle: 'Focused vendor-facing summary before moving into the submission workflow.',
  detailDocumentsTitle: 'Opportunity documents',
  selectionContextTitle: 'Selected opportunity + submission context',
  submissionWorkspaceTitle: 'Submission workspace',
  vendorActionEyebrow: 'Vendor action',
  vendorActionTitle: 'Ready to respond',
  vendorActionDescription:
    'Move from posted-bid review into a direct submission flow without leaving the product.',
  vendorActionNote:
    'This is the showcase promise: discover, qualify, and act in one clearer Texas-first procurement surface.',
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
