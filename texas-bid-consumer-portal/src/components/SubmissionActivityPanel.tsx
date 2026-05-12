import type { SubmissionActivityItem } from '../utils/submissionActivity'

type SubmissionActivityPanelProps = {
  title?: string
  items: SubmissionActivityItem[]
  currentOpportunityId?: string
  selectedSubmissionId?: string
  onSelectSubmission?: (opportunityId: string, submissionId?: string) => void
}

export function SubmissionActivityPanel({
  title = 'Submission activity',
  items,
  currentOpportunityId,
  selectedSubmissionId,
  onSelectSubmission,
}: SubmissionActivityPanelProps) {
  return (
    <div className="panel submission-activity-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Activity feed</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{items.length} items</span>
      </div>
      <div className="submission-activity-list">
        {items.map((item) => (
          <div
            className="draft-card"
            key={item.key}
            onClick={() => onSelectSubmission?.(item.opportunityId, item.submissionId)}
            style={item.submissionId && item.submissionId === selectedSubmissionId
              ? { outline: '3px solid #1d4ed8', outlineOffset: '2px' }
              : item.opportunityId === currentOpportunityId
                ? { outline: '2px solid #2563eb', outlineOffset: '2px' }
                : undefined}
          >
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
            {item.summary ? <div className="dashboard-note compact-note">{item.summary}</div> : null}
            <div className="dashboard-note compact-note">
              {item.submissionId
                ? `Targets submission ${item.submissionId} for opportunity ${item.opportunityId}.`
                : `Targets opportunity ${item.opportunityId}.`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
