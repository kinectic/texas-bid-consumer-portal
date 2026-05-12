export const submissionStatusSummary = {
  draft: {
    label: 'Draft',
    detail: 'A contractor has started shaping a response but has not sent it to the customer yet.',
    progress: '10%',
  },
  received: {
    label: 'Received',
    detail: 'The contractor bid reached the customer workspace and is ready for review.',
    progress: '25%',
  },
  reviewing: {
    label: 'Reviewing',
    detail: 'The customer is comparing scope, timing, and trust signals across bids.',
    progress: '60%',
  },
  shortlisted: {
    label: 'Shortlisted',
    detail: 'This contractor is in the final decision set for the job.',
    progress: '85%',
  },
} as const

export const submissionLifecycle = [
  'Job posted',
  'Contractor bid received',
  'Customer review',
  'Shortlist',
  'Selected',
  'Job in progress / complete',
]
