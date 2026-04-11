import { submissionStatusSummary } from '../data/submissionStatus'
import type { Submission } from '../types'

type ReviewQueueCardProps = {
  submission: Submission
  mode?: 'agency' | 'vendor'
}

export function ReviewQueueCard({ submission, mode = 'agency' }: ReviewQueueCardProps) {
  const statusSummary = submissionStatusSummary[submission.status]

  return (
    <div className="submission-card">
      <div className="submission-header">
        <strong>{mode === 'agency' ? submission.vendor : submission.opportunity}</strong>
        <span className={submission.status === 'received' ? 'status status-open' : 'status status-review'}>
          {statusSummary.label}
        </span>
      </div>
      <div className="muted">
        {mode === 'agency' ? `Opportunity: ${submission.opportunity}` : `Submitted by: ${submission.vendor}`}
      </div>
      <div className="muted">Submitted: {submission.submittedAt}</div>
      <div className="muted">Progress: {statusSummary.progress}</div>
      <div className="dashboard-note compact-note">{statusSummary.detail}</div>
    </div>
  )
}
