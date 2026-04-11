import { submissionStatusSummary } from '../data/submissionStatus'
import type { Submission } from '../types'

type ReviewQueueCardProps = {
  submission: Submission
  mode?: 'agency' | 'vendor'
  currentOpportunityId?: string
  selectedSubmissionId?: string
  onSelect?: (submission: Submission) => void
}

export function ReviewQueueCard({ submission, mode = 'agency', currentOpportunityId, selectedSubmissionId, onSelect }: ReviewQueueCardProps) {
  const statusSummary = submissionStatusSummary[submission.status]
  const statusClassName =
    submission.status === 'shortlisted'
      ? 'status status-awarded'
      : submission.status === 'reviewing'
        ? 'status status-review'
        : 'status status-open'
  const isCurrentOpportunity = submission.opportunityId === currentOpportunityId
  const isSelectedSubmission = submission.id === selectedSubmissionId

  return (
    <div
      className="submission-card"
      onClick={() => onSelect?.(submission)}
      style={isSelectedSubmission ? { outline: '3px solid #1d4ed8', outlineOffset: '2px' } : isCurrentOpportunity ? { outline: '2px solid #2563eb', outlineOffset: '2px' } : undefined}
    >
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
      <div className="muted">Submission ID: {submission.id}</div>
      {isSelectedSubmission ? <div className="dashboard-note compact-note">Active review row.</div> : null}
      {isCurrentOpportunity ? <div className="dashboard-note compact-note">Linked to current selected opportunity.</div> : null}
      <div className="muted">Submitted: {submission.submittedAt}</div>
      <div className="muted">Progress: {statusSummary.progress}</div>
      <div className="dashboard-note compact-note">{statusSummary.detail}</div>
    </div>
  )
}
