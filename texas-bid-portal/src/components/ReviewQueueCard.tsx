import { submissionStatusSummary } from '../data/submissionStatus'
import type { Submission } from '../types'

type ReviewQueueCardProps = {
  submission: Submission
  mode?: 'agency' | 'vendor'
  currentOpportunityId?: string
}

export function ReviewQueueCard({ submission, mode = 'agency', currentOpportunityId }: ReviewQueueCardProps) {
  const statusSummary = submissionStatusSummary[submission.status]
  const statusClassName =
    submission.status === 'shortlisted'
      ? 'status status-awarded'
      : submission.status === 'reviewing'
        ? 'status status-review'
        : 'status status-open'
  const isCurrentOpportunity = submission.opportunityId === currentOpportunityId

  return (
    <div className="submission-card">
      <div className="submission-header">
        <strong>{mode === 'agency' ? submission.vendor : submission.opportunity}</strong>
        <span className={statusClassName}>
          {statusSummary.label}
        </span>
      </div>
      <div className="muted">
        {mode === 'agency' ? `Opportunity: ${submission.opportunity}` : `Submitted by: ${submission.vendor}`}
      </div>
      <div className="muted">Opportunity ID: {submission.opportunityId}</div>
      {isCurrentOpportunity ? <div className="dashboard-note compact-note">Linked to current selected opportunity.</div> : null}
      <div className="muted">Submitted: {submission.submittedAt}</div>
      <div className="muted">Progress: {statusSummary.progress}</div>
      <div className="dashboard-note compact-note">{statusSummary.detail}</div>
    </div>
  )
}
