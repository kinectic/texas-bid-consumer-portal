type ProcurementChecklistPanelProps = {
  title: string
  items: readonly string[]
  contextLabel?: string
  actionLabel?: string
  actionClassName?: 'primary wide' | 'ghost wide'
  onAction?: () => void
}

export function ProcurementChecklistPanel({
  title,
  items,
  contextLabel,
  actionLabel,
  actionClassName = 'primary wide',
  onAction,
}: ProcurementChecklistPanelProps) {
  return (
    <div className="panel procurement-checklist-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Checklist workflow</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{items.length} items</span>
      </div>
      <ol className="flow-list status-progression-list">
        {items.map((item, index) => (
          <li key={item}><strong>{index + 1}. </strong>{contextLabel ? `${item} — ${contextLabel}` : item}</li>
        ))}
      </ol>
      {actionLabel ? <button className={actionClassName} onClick={onAction}>{actionLabel}</button> : null}
    </div>
  )
}
