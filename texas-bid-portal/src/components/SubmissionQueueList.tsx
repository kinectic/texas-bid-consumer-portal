import { ReviewQueueCard } from './ReviewQueueCard'
import type { Submission } from '../types'
import { buildSubmissionQueueRowMeta } from '../utils/submissionQueue'

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

  const rowMetaBySubmissionId = buildSubmissionQueueRowMeta({
    submissions: orderedSubmissions,
    selectedSubmissionId,
    mode,
  })

  return (
    <div className="submission-list">
      {orderedSubmissions.map((submission) => {
        const rowMeta = rowMetaBySubmissionId[submission.id]

        return (
          <ReviewQueueCard
            key={submission.id}
            submission={submission}
            mode={mode}
            currentOpportunityId={currentOpportunityId}
            selectedSubmissionId={selectedSubmissionId}
            rowLabel={rowMeta?.rowLabel}
            rowSummary={rowMeta?.rowSummary}
            onSelect={onSelectSubmission}
          />
        )
      })}
    </div>
  )
}
