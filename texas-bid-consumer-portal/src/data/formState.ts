import type { BidDocument, CreateBidFormState, ReviewNotesState, SubmissionFormState } from '../types/forms'

export const createBidFormState: CreateBidFormState = {
  title: 'North Dallas retail center floor care and nightly cleaning',
  category: 'Janitorial',
  solicitationType: 'Customer job request',
  issueDate: 'May 8, 2026',
  deadline: 'Need walkthroughs this week',
  scope: 'Customer needs recurring nightly cleaning, floor care, and restroom restocking for a multi-tenant retail property in North Dallas.',
  requirements: 'Looking for insured contractors with retail or mixed-use experience, clear staffing plan, and flexible after-hours availability.',
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
