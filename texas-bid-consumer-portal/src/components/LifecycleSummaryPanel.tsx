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
    <div className="panel lifecycle-summary-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Lifecycle view</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-open">{items.length} stages</span>
      </div>
      <div className="lifecycle-summary-list">
        {items.map((item) => (
          <div
            className={item.active ? 'draft-card draft-card-active interactive-card' : item.onClick ? 'draft-card interactive-card' : 'draft-card'}
            key={item.stage}
            onClick={item.onClick}
            onKeyDown={(event) => {
              if ((event.key === 'Enter' || event.key === ' ') && item.onClick) {
                event.preventDefault()
                item.onClick()
              }
            }}
            role={item.onClick ? 'button' : undefined}
            tabIndex={item.onClick ? 0 : undefined}
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
