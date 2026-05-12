type WorkflowStageSummaryItem = {
  stage: string
  owner: string
  detail: string
}

type WorkflowStageSummaryProps = {
  title?: string
  items: WorkflowStageSummaryItem[]
}

export function WorkflowStageSummary({ title = 'Workflow stage summary', items }: WorkflowStageSummaryProps) {
  return (
    <div className="panel workflow-stage-summary-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Workflow ownership</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-open">{items.length} stages</span>
      </div>
      <div className="workflow-stage-summary-list">
        {items.map((item) => (
          <div className="draft-card" key={`${item.stage}-${item.owner}`}>
            <strong>{item.stage}</strong>
            <div className="muted">Owner: {item.owner}</div>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
