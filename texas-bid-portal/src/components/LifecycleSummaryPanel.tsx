type LifecycleSummaryItem = {
  stage: string
  detail: string
  onClick?: () => void
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
          <div className="draft-card" key={item.stage} onClick={item.onClick}>
            <strong>{item.stage}</strong>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
