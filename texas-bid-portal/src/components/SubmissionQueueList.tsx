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
      {orderedSubmissions.map((submission) => (
        <ReviewQueueCard
          key={submission.id}
          submission={submission}
          mode={mode}
          currentOpportunityId={currentOpportunityId}
          selectedSubmissionId={selectedSubmissionId}
          onSelect={onSelectSubmission}
        />
      ))}
    </div>
  )
}
