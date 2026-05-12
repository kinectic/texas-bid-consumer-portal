export type CreateBidFormState = {
  title: string
  category: string
  solicitationType: string
  issueDate: string
  deadline: string
  scope: string
  requirements: string
}

export type SubmissionFormState = {
  signer: string
  pricing: string
  timeline: string
  narrative: string
  exceptions: string
}

export type ReviewNotesState = {
  internalNotes: string
  vendorQuestions: string
}

export type BidDocument = {
  name: string
  status: string
}
