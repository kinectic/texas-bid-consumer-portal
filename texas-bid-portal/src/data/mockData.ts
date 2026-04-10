import type { Opportunity, Submission, Status } from '../types'

export const opportunities: Opportunity[] = [
  {
    id: 'tx-001',
    title: 'Custodial Supplies',
    agency: 'Region 4 ESC',
    location: 'Houston, TX',
    category: 'Facilities / Supplies',
    dueDate: 'May 26, 2026',
    status: 'open',
    source: 'Texas Purchasing Group',
    summary:
      'Multi-agency purchasing opportunity for custodial supplies with statewide buyer visibility and recurring school / public facility relevance.',
    documents: ['Solicitation Overview.pdf', 'Vendor Terms.pdf', 'Pricing Sheet.xlsx'],
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
    vendor: 'Lone Star Facility Group',
    opportunity: 'Custodial Supplies',
    submittedAt: 'Apr 8, 2026 · 10:24 AM',
    status: 'received',
  },
  {
    vendor: 'Texas Audit Partners',
    opportunity: 'Internal Audit Services',
    submittedAt: 'Apr 8, 2026 · 9:11 AM',
    status: 'reviewing',
  },
]

export const statusClass: Record<Status, string> = {
  open: 'status status-open',
  awarded: 'status status-awarded',
  'under-review': 'status status-review',
}
