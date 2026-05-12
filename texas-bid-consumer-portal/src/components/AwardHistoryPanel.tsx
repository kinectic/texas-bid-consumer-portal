type AwardHistoryItem = {
  title: string
  detail: string
}

type AwardHistoryPanelProps = {
  title?: string
  items: AwardHistoryItem[]
}

export function AwardHistoryPanel({ title = 'Award history', items }: AwardHistoryPanelProps) {
  return (
    <div className="panel award-history-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Award history</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-awarded">{items.length} records</span>
      </div>
      <div className="award-history-list">
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
