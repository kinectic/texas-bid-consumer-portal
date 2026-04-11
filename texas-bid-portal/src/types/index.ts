export type Status = 'open' | 'awarded' | 'under-review'

export type Opportunity = {
  id: string
  title: string
  agency: string
  location: string
  category: string
  dueDate: string
  status: Status
  source: string
  summary: string
  documents: string[]
}

export type Submission = {
  vendor: string
  opportunity: string
  submittedAt: string
  status: 'draft' | 'received' | 'reviewing' | 'shortlisted'
}
