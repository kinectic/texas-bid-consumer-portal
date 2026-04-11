type StatusProgressionPanelProps = {
  title?: string
  steps: readonly string[]
}

export function StatusProgressionPanel({ title = 'Status progression', steps }: StatusProgressionPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ol className="flow-list">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
