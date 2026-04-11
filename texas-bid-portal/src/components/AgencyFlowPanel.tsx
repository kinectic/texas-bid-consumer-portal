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
      <div className="panel-title">{title}</div>
      {description ? <div className="panel-subtitle agency-flow-description">{description}</div> : null}
      <ol className="flow-list agency-flow-steps">
        {steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
