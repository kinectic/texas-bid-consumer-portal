import type { Opportunity, Submission, Status } from '../types'

export const opportunities: Opportunity[] = [
  {
    id: 'tx-001',
    title: 'Citywide Custodial Services RFP',
    agency: 'City of Fort Worth',
    location: 'Fort Worth, TX',
    category: 'Janitorial',
    dueDate: 'May 6, 2026',
    status: 'open',
    source: 'TexasBid Agency Publish Flow',
    summary:
      'Newly published agency-created opportunity showing how a direct posting flow can feed straight into vendor discovery and submission inside the same Texas-first platform.',
    documents: ['Scope of Work.pdf', 'Vendor Terms.pdf', 'Pricing Template.xlsx'],
  },
  {
    id: 'tx-002',
    title: 'Internal Audit Services',
    agency: 'Texas Public Entity',
    location: 'Texas',
    category: 'Professional Services',
    dueDate: 'Apr 23, 2026',
    status: 'open',
    source: 'BidNet Direct',
    summary:
      'Example statewide RFP showing how professional services opportunities can be surfaced with cleaner summaries and easier vendor action.',
    documents: ['RFP.pdf', 'Scope of Work.pdf'],
  },
  {
    id: 'tx-003',
    title: 'Janitorial Services for Passenger Facilities',
    agency: 'DART',
    location: 'DFW, TX',
    category: 'Janitorial',
    dueDate: 'Closed',
    status: 'awarded',
    source: 'DART Board Documents',
    summary:
      'Awarded janitorial-services record used to demonstrate source transparency, historical context, and procurement intelligence value.',
    documents: ['Award Presentation.pdf'],
  },
]

export const vendorSubmissions: Submission[] = [
  {
    id: 'sub-001',
    opportunityId: 'tx-001',
    vendor: 'Lone Star Facility Group',
    opportunity: 'Citywide Custodial Services RFP',
    submittedAt: 'Apr 8, 2026 · 10:24 AM',
    status: 'received',
  },
  {
    id: 'sub-003',
    opportunityId: 'tx-001',
    vendor: 'Metro Civic Janitorial',
    opportunity: 'Citywide Custodial Services RFP',
    submittedAt: 'Apr 8, 2026 · 11:02 AM',
    status: 'reviewing',
  },
  {
    id: 'sub-002',
    opportunityId: 'tx-002',
    vendor: 'Texas Audit Partners',
    opportunity: 'Internal Audit Services',
    submittedAt: 'Apr 8, 2026 · 9:11 AM',
    status: 'reviewing',
  },
]

export const selectedOpportunityId = 'tx-001'

export const selectedOpportunity = opportunities.find((opportunity) => opportunity.id === selectedOpportunityId) ?? opportunities[0]

export const statusClass: Record<Status, string> = {
  open: 'status status-open',
  awarded: 'status status-awarded',
  'under-review': 'status status-review',
}
