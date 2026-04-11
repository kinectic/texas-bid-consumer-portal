import type { Submission } from '../types'

export type SubmissionActivityItem = {
  key: string
  opportunityId: string
  submissionId?: string
  title: string
  detail: string
  summary?: string
}

type BuildSubmissionActivityItemsOptions = {
  submissions: Submission[]
  allSubmissions: Submission[]
  selectedSubmissionId?: string | null
  currentOpportunityId?: string
  mode: 'agency' | 'vendor'
}

export function buildSubmissionActivityItems({
  submissions,
  allSubmissions,
  selectedSubmissionId,
  currentOpportunityId,
  mode,
}: BuildSubmissionActivityItemsOptions): SubmissionActivityItem[] {
  return submissions.map((submission) => {
    const siblingRows = allSubmissions.filter((item) => item.opportunityId === submission.opportunityId)
    const rowNumber = siblingRows.findIndex((item) => item.id === submission.id) + 1
    const isSelected = submission.id === selectedSubmissionId
    const isCurrentOpportunity = submission.opportunityId === currentOpportunityId

    return {
      key: submission.id,
      opportunityId: submission.opportunityId,
      submissionId: submission.id,
      title: `${submission.vendor} • ${submission.id}`,
      detail: `${submission.opportunity} • row ${rowNumber} of ${siblingRows.length} • ${submission.opportunityId} • Submitted ${submission.submittedAt}`,
      summary:
        mode === 'agency'
          ? `${isCurrentOpportunity ? 'Current opportunity' : 'Other opportunity'} • ${submission.status} • Vendor ${submission.vendor} • active row ${isSelected ? 'yes' : 'no'} • response row ${rowNumber}`
          : isSelected
            ? 'Active vendor-side submission row.'
            : 'Click to reopen this exact vendor response row in the workflow.',
    }
  })
}
