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
  readinessByOpportunityId?: Record<string, { label: string; detail: string }>
}

export function buildSubmissionActivityItems({
  submissions,
  allSubmissions,
  selectedSubmissionId,
  currentOpportunityId,
  mode,
  readinessByOpportunityId,
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
          ? `${isCurrentOpportunity ? 'Current opportunity' : 'Other opportunity'} • ${submission.status} • Vendor ${submission.vendor} • active row ${isSelected ? 'yes' : 'no'} • response row ${rowNumber}${readinessByOpportunityId?.[submission.opportunityId] ? ` • vendor state: ${readinessByOpportunityId[submission.opportunityId].label} • ${readinessByOpportunityId[submission.opportunityId].detail}` : ''}`
          : isSelected
            ? `Active vendor-side submission row. ${readinessByOpportunityId?.[submission.opportunityId]?.label ?? 'Saved row active'} • ${readinessByOpportunityId?.[submission.opportunityId]?.detail ?? 'No extra buffer context.'}`
            : `Click to reopen this exact vendor response row in the workflow. ${readinessByOpportunityId?.[submission.opportunityId]?.label ?? 'Saved/draft state available'} • ${readinessByOpportunityId?.[submission.opportunityId]?.detail ?? 'No extra buffer context.'}`,
    }
  })
}
