type AgencyFlowPanelProps = {
  title?: string
  description?: string
  steps: readonly string[]
}

export function AgencyFlowPanel({
  title = 'Agency posting flow',
  description,
  steps,
}: AgencyFlowPanelProps) {
  return (
    <div className="panel agency-flow-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Agency workflow</div>
          <div className="panel-title">{title}</div>
          {description ? <div className="panel-subtitle agency-flow-description">{description}</div> : null}
        </div>
        <span className="status status-open">{steps.length} steps</span>
      </div>
      <ol className="flow-list agency-flow-steps">
        {steps.map((step, index) => (
          <li key={step}><strong>{index + 1}. </strong>{step}</li>
        ))}
      </ol>
    </div>
  )
}
