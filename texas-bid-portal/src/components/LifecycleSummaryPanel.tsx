type LifecycleSummaryItem = {
  stage: string
  detail: string
  onClick?: () => void
  active?: boolean
}

type LifecycleSummaryPanelProps = {
  title?: string
  items: LifecycleSummaryItem[]
}

export function LifecycleSummaryPanel({
  title = 'Connected lifecycle summary',
  items,
}: LifecycleSummaryPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="lifecycle-summary-list">
        {items.map((item) => (
          <div
            className={item.active ? 'draft-card draft-card-active' : 'draft-card'}
            key={item.stage}
            onClick={item.onClick}
          >
            <strong>{item.stage}</strong>
            <div className="muted">{item.detail}</div>
            {item.onClick ? <div className="dashboard-note compact-note">Click to switch to this row.</div> : null}
          </div>
        ))}
      </div>
    </div>
  )
}
