import { ReviewQueueCard } from './ReviewQueueCard'
import type { Submission } from '../types'

type SubmissionQueueListProps = {
  submissions: Submission[]
  mode?: 'agency' | 'vendor'
  currentOpportunityId?: string
  onSelectSubmission?: (submission: Submission) => void
}

export function SubmissionQueueList({ submissions, mode = 'agency', currentOpportunityId, onSelectSubmission }: SubmissionQueueListProps) {
  return (
    <div className="submission-list">
      {submissions.map((submission) => (
        <ReviewQueueCard
          key={`${submission.opportunityId}-${submission.vendor}`}
          submission={submission}
          mode={mode}
          currentOpportunityId={currentOpportunityId}
          onSelect={onSelectSubmission}
        />
      ))}
    </div>
  )
}
