import type { Submission } from '../types'

type SelectionReadinessSummaryPanelProps = {
  submissions: Submission[]
}

export function SelectionReadinessSummaryPanel({ submissions }: SelectionReadinessSummaryPanelProps) {
  const shortlistedCount = submissions.filter((submission) => submission.status === 'shortlisted').length
  const reviewingCount = submissions.filter((submission) => submission.status === 'reviewing').length
  const receivedCount = submissions.filter((submission) => submission.status === 'received').length

  const readinessLabel = shortlistedCount > 0
    ? 'Ready to choose'
    : reviewingCount > 0
      ? 'Ready to shortlist'
      : receivedCount > 0
        ? 'Needs more comparison'
        : 'Waiting on responses'

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Selection readiness</div>
          <div className="panel-title">How close this job is to a customer decision</div>
        </div>
        <span className="status status-review">{readinessLabel}</span>
      </div>

      <div className="draft-list">
        <div className="draft-card">
          <strong>{shortlistedCount} shortlisted</strong>
          <div className="muted">These contractor bids are closest to a final choice.</div>
        </div>
        <div className="draft-card">
          <strong>{reviewingCount} under active comparison</strong>
          <div className="muted">These bids likely need one more comparison pass before shortlisting.</div>
        </div>
        <div className="draft-card">
          <strong>{receivedCount} newly received</strong>
          <div className="muted">These bids are in the early review funnel and may still need clarification.</div>
        </div>
      </div>
    </div>
  )
}
