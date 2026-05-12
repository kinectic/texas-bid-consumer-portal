type DecisionControlItem = {
  label: string
  className?: 'primary wide' | 'ghost wide'
  onClick?: () => void
}

type DecisionControlsPanelProps = {
  title?: string
  description?: string
  controls: DecisionControlItem[]
}

export function DecisionControlsPanel({
  title = 'Decision controls',
  description,
  controls,
}: DecisionControlsPanelProps) {
  return (
    <div className="panel decision-controls-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Agency action set</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-open">{controls.length} actions</span>
      </div>
      <div className="decision-controls-grid">
        {controls.map((control, index) => (
          <button key={control.label} className={control.className ?? 'ghost wide'} onClick={control.onClick}>
            {index + 1}. {control.label}
          </button>
        ))}
      </div>
      {description ? <div className="dashboard-note">{description}</div> : null}
    </div>
  )
}
