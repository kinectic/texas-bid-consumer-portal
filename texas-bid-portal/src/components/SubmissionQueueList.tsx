import { ReviewQueueCard } from './ReviewQueueCard'
import type { Submission } from '../types'

type SubmissionQueueListProps = {
  submissions: Submission[]
  mode?: 'agency' | 'vendor'
  currentOpportunityId?: string
}

export function SubmissionQueueList({ submissions, mode = 'agency', currentOpportunityId }: SubmissionQueueListProps) {
  return (
    <div className="submission-list">
      {submissions.map((submission) => (
        <ReviewQueueCard
          key={`${submission.opportunityId}-${submission.vendor}`}
          submission={submission}
          mode={mode}
          currentOpportunityId={currentOpportunityId}
        />
      ))}
    </div>
  )
}
