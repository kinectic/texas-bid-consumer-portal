import type { Submission } from '../types'

export type SubmissionActivityItem = {
  key: string
  opportunityId: string
  submissionId?: string
  title: string
  detail: string
  summary?: string
}

function agencyReadinessSummary(readiness?: { label: string; detail: string }): string {
  if (!readiness) return ''

  const label = readiness.label
    .replace('Saved row active', 'Vendor prep state: saved response active')
    .replace('Unsaved draft lane has edits', 'Vendor prep state: unsent draft work exists')
    .replace('No activity yet', 'Vendor prep state: no saved or draft activity')

  const detail = readiness.detail
    .replace('buffer saved-row', 'saved response package on file')
    .replace('unsaved lane has preserved edits', 'vendor still has unsent draft work')
    .replace('unsaved lane empty', 'no extra unsent draft work')
    .replace('Unsaved draft buffer', 'Unsent draft work')

  return `${label} • ${detail}`
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
          ? `${isCurrentOpportunity ? 'Current opportunity' : 'Other opportunity'} • ${submission.status} • Vendor ${submission.vendor} • active row ${isSelected ? 'yes' : 'no'} • response row ${rowNumber}${readinessByOpportunityId?.[submission.opportunityId] ? ` • ${agencyReadinessSummary(readinessByOpportunityId[submission.opportunityId])}` : ''}`
          : isSelected
            ? `Active vendor-side submission row. ${readinessByOpportunityId?.[submission.opportunityId]?.label ?? 'Saved row active'} • ${readinessByOpportunityId?.[submission.opportunityId]?.detail ?? 'No extra buffer context.'}`
            : `Click to reopen this exact vendor response row in the workflow. ${readinessByOpportunityId?.[submission.opportunityId]?.label ?? 'Saved/draft state available'} • ${readinessByOpportunityId?.[submission.opportunityId]?.detail ?? 'No extra buffer context.'}`,
    }
  })
}
