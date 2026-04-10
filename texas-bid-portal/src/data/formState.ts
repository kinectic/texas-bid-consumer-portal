import type { BidDocument, CreateBidFormState, ReviewNotesState, SubmissionFormState } from '../types/forms'

export const createBidFormState: CreateBidFormState = {
  title: 'Citywide Custodial Services RFP',
  category: 'Janitorial',
  solicitationType: 'Request for Proposals',
  issueDate: 'Apr 15, 2026',
  deadline: 'May 6, 2026',
  scope: 'Provide janitorial staffing, supplies, and quality control across multiple public facilities.',
  requirements: 'Vendors must show prior public-sector experience, insurance coverage, and staffing plan.',
}

export const submissionFormState: SubmissionFormState = {
  signer: 'Jordan Patel, Operations Director',
  pricing: '$184,500 annual bid',
  timeline: 'Mobilization within 14 days of award',
  narrative: 'Regional janitorial team with transit and municipal facility experience across Texas.',
  exceptions: 'No material exceptions. Minor clarification requested on consumables reimbursement.',
}

export const reviewNotesState: ReviewNotesState = {
  internalNotes: 'Pricing is competitive. Need final confirmation on consumables and backup staffing coverage.',
  vendorQuestions: 'Please confirm whether weekend emergency support is included in the quoted annual rate.',
}

export const bidPacketDocuments: BidDocument[] = [
  { name: 'Scope of Work.pdf', status: 'Required' },
  { name: 'Pricing Template.xlsx', status: 'Optional' },
  { name: 'Insurance Requirements.pdf', status: 'Required' },
]

export const submissionDocuments: BidDocument[] = [
  { name: 'Pricing Template.xlsx', status: 'Pending upload' },
  { name: 'W-9.pdf', status: 'Attached' },
  { name: 'Insurance Certificate.pdf', status: 'Attached' },
]
