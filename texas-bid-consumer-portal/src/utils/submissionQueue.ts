import type { Submission } from '../types'

export type SubmissionQueueRowMeta = {
  rowNumber: number
  rowCount: number
  rowLabel: string
  rowSummary: string
  activeLabel: string
}

type BuildSubmissionQueueRowMetaOptions = {
  submissions: Submission[]
  selectedSubmissionId?: string
  mode: 'agency' | 'vendor'
}

export function buildSubmissionQueueRowMeta({
  submissions,
  selectedSubmissionId,
  mode,
}: BuildSubmissionQueueRowMetaOptions): Record<string, SubmissionQueueRowMeta> {
  return Object.fromEntries(
    submissions.map((submission) => {
      const siblingRows = submissions.filter((item) => item.opportunityId === submission.opportunityId)
      const rowNumber = siblingRows.findIndex((item) => item.id === submission.id) + 1
      const isSelected = submission.id === selectedSubmissionId
      const rowCount = siblingRows.length
      const rowLabel = `Response row ${rowNumber} of ${rowCount}`
      const rowSummary = isSelected
        ? mode === 'agency'
          ? 'Currently selected procurement review row for this opportunity.'
          : 'Currently selected vendor response row for this opportunity.'
        : submission.status === 'draft'
          ? mode === 'agency'
            ? 'Draft row is not yet in agency review.'
            : 'Draft row available to continue or submit.'
          : mode === 'agency'
            ? 'Saved row available for procurement review and status action.'
            : 'Saved row available for review or continuation.'
      const activeLabel = `${submission.vendor} · ${submission.id} · ${rowLabel}`

      return [submission.id, { rowNumber, rowCount, rowLabel, rowSummary, activeLabel }]
    }),
  )
}
