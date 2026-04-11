import { ReviewQueueCard } from './ReviewQueueCard'
import type { Submission } from '../types'

type SubmissionQueueListProps = {
  submissions: Submission[]
  mode?: 'agency' | 'vendor'
}

export function SubmissionQueueList({ submissions, mode = 'agency' }: SubmissionQueueListProps) {
  return (
    <div className="submission-list">
      {submissions.map((submission) => (
        <ReviewQueueCard key={`${submission.opportunityId}-${submission.vendor}`} submission={submission} mode={mode} />
      ))}
    </div>
  )
}
