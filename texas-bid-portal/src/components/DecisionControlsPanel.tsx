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
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="action-stack decision-controls-list">
        {controls.map((control) => (
          <button key={control.label} className={control.className ?? 'ghost wide'} onClick={control.onClick}>
            {control.label}
          </button>
        ))}
      </div>
      {description ? <div className="dashboard-note">{description}</div> : null}
    </div>
  )
}
