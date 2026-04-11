export const unifiedOpportunityStatus = {
  open: {
    label: 'Open for vendor action',
    detail: 'The opportunity is live and vendors should qualify and respond now.',
  },
  awarded: {
    label: 'Awarded / historical',
    detail: 'This opportunity is no longer open and now serves as outcome context.',
  },
  reviewing: {
    label: 'Under agency review',
    detail: 'The bid is in an internal decision stage after vendor submissions landed.',
  },
} as const
