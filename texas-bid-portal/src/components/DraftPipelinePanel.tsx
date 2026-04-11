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
    <div className="panel">
      <div className="panel-title">{title}</div>
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
