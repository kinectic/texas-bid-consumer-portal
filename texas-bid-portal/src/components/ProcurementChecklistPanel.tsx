type ProcurementChecklistPanelProps = {
  title: string
  items: readonly string[]
  contextLabel?: string
  actionLabel?: string
  actionClassName?: 'primary wide' | 'ghost wide'
}

export function ProcurementChecklistPanel({
  title,
  items,
  contextLabel,
  actionLabel,
  actionClassName = 'primary wide',
}: ProcurementChecklistPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ol className="flow-list">
        {items.map((item) => (
          <li key={item}>{contextLabel ? `${item} — ${contextLabel}` : item}</li>
        ))}
      </ol>
      {actionLabel ? <button className={actionClassName}>{actionLabel}</button> : null}
    </div>
  )
}
