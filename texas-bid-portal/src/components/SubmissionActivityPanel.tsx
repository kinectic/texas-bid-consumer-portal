type SubmissionActivityItem = {
  key: string
  opportunityId: string
  title: string
  detail: string
  summary?: string
}

type SubmissionActivityPanelProps = {
  title?: string
  items: SubmissionActivityItem[]
  currentOpportunityId?: string
  onSelectSubmission?: (opportunityId: string) => void
}

export function SubmissionActivityPanel({
  title = 'Submission activity',
  items,
  currentOpportunityId,
  onSelectSubmission,
}: SubmissionActivityPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="submission-activity-list">
        {items.map((item) => (
          <div
            className="draft-card"
            key={item.key}
            onClick={() => onSelectSubmission?.(item.opportunityId)}
            style={item.opportunityId === currentOpportunityId ? { outline: '2px solid #2563eb', outlineOffset: '2px' } : undefined}
          >
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
            {item.summary ? <div className="dashboard-note compact-note">{item.summary}</div> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
