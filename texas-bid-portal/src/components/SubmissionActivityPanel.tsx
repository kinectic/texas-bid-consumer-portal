type SubmissionActivityItem = {
  title: string
  detail: string
}

type SubmissionActivityPanelProps = {
  title?: string
  items: SubmissionActivityItem[]
}

export function SubmissionActivityPanel({ title = 'Submission activity', items }: SubmissionActivityPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="submission-activity-list">
        {items.map((item) => (
          <div className="draft-card" key={item.title}>
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
