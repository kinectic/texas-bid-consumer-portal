type SubmissionStatusSnapshotItem = {
  label: string
  detail: string
  progress: string
}

type SubmissionStatusSnapshotProps = {
  title?: string
  items: SubmissionStatusSnapshotItem[]
}

export function SubmissionStatusSnapshot({
  title = 'Submission status snapshot',
  items,
}: SubmissionStatusSnapshotProps) {
  return (
    <div className="panel submission-status-snapshot-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Status snapshot</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{items.length} signals</span>
      </div>
      <div className="submission-status-snapshot-list">
        {items.map((item) => (
          <div className="draft-card" key={item.label}>
            <div className="submission-status-snapshot-row">
              <strong>{item.label}</strong>
              <span className="muted">{item.progress}</span>
            </div>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
