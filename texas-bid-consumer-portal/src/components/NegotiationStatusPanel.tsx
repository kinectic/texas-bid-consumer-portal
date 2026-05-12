type NegotiationStatusPanelProps = {
  items: ReadonlyArray<{
    title: string
    status: string
    detail: string
  }>
}

export function NegotiationStatusPanel({ items }: NegotiationStatusPanelProps) {
  const blockingCount = items.filter((item) => item.status.toLowerCase().includes('awaiting')).length

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Negotiation status</div>
          <div className="panel-title">Which threads are blocking selection right now</div>
        </div>
        <span className="status status-review">{blockingCount} blocking</span>
      </div>

      <div className="draft-list">
        {items.map((item) => (
          <div key={item.title} className="draft-card">
            <strong>{item.title}</strong>
            <div className="small-note">{item.status}</div>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
