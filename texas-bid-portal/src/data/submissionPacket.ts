export const vendorSubmissionPacket = [
  {
    name: 'Pricing Template.xlsx',
    state: 'Pending upload',
    note: 'Core bid pricing file still needs vendor upload before final submit.',
  },
  {
    name: 'W-9.pdf',
    state: 'Attached',
    note: 'Tax documentation already included in the response packet.',
  },
  {
    name: 'Insurance Certificate.pdf',
    state: 'Attached',
    note: 'Coverage proof is present and ready for agency review.',
  },
] as const
