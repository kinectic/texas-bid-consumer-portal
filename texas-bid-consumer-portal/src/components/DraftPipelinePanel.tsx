type DraftPipelineItem = {
  title: string
  detail: string
}

type DraftPipelinePanelProps = {
  title?: string
  items: DraftPipelineItem[]
}

export function DraftPipelinePanel({ title = 'Draft pipeline', items }: DraftPipelinePanelProps) {
  return (
    <div className="panel draft-pipeline-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Pipeline status</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{items.length} items</span>
      </div>
      <div className="draft-pipeline-list">
        {items.map((item) => (
          <div className="draft-card" key={item.title}>
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
