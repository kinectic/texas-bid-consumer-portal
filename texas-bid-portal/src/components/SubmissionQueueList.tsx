import { ReviewQueueCard } from './ReviewQueueCard'
import type { Submission } from '../types'

type SubmissionQueueListProps = {
  submissions: Submission[]
  mode?: 'agency' | 'vendor'
  currentOpportunityId?: string
  selectedSubmissionId?: string
  onSelectSubmission?: (submission: Submission) => void
}

export function SubmissionQueueList({ submissions, mode = 'agency', currentOpportunityId, selectedSubmissionId, onSelectSubmission }: SubmissionQueueListProps) {
  const orderedSubmissions = selectedSubmissionId
    ? [
        ...submissions.filter((submission) => submission.id === selectedSubmissionId),
        ...submissions.filter((submission) => submission.id !== selectedSubmissionId),
      ]
    : submissions

  return (
    <div className="submission-list">
      {orderedSubmissions.map((submission) => {
        const siblingRows = orderedSubmissions.filter((item) => item.opportunityId === submission.opportunityId)
        const rowNumber = siblingRows.findIndex((item) => item.id === submission.id) + 1
        const isSelected = submission.id === selectedSubmissionId
        const rowLabel = `Response row ${rowNumber} of ${siblingRows.length}`
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

        return (
        <ReviewQueueCard
          key={submission.id}
          submission={submission}
          mode={mode}
          currentOpportunityId={currentOpportunityId}
          selectedSubmissionId={selectedSubmissionId}
          rowLabel={rowLabel}
          rowSummary={rowSummary}
          onSelect={onSelectSubmission}
        />
        )
      })}
    </div>
  )
}
