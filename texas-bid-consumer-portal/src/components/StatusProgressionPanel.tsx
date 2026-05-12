type StatusProgressionPanelProps = {
  title?: string
  steps: readonly string[]
}

export function StatusProgressionPanel({ title = 'Status progression', steps }: StatusProgressionPanelProps) {
  return (
    <div className="panel status-progression-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Workflow progression</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{steps.length} steps</span>
      </div>
      <ol className="flow-list status-progression-list">
        {steps.map((step, index) => (
          <li key={step}>
            <strong>{index + 1}. </strong>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}
