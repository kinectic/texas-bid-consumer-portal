export const submissionStatusSummary = {
  draft: {
    label: 'Draft',
    detail: 'Vendor has started assembling a response but has not submitted it yet.',
    progress: '10%',
  },
  received: {
    label: 'Received',
    detail: 'Response package landed and is awaiting agency review.',
    progress: '25%',
  },
  reviewing: {
    label: 'Reviewing',
    detail: 'Agency procurement team is checking completeness and pricing.',
    progress: '60%',
  },
  shortlisted: {
    label: 'Shortlisted',
    detail: 'Vendor moved into the finalist decision set.',
    progress: '85%',
  },
} as const

export const submissionLifecycle = [
  'Draft',
  'Received',
  'Completeness check',
  'Reviewing',
  'Shortlisted',
  'Award / archive',
]
