import { draftToPublishSummary } from '../data/draftPublishSummary'

type DraftPublishSummaryPanelProps = {
  title?: string
  items?: readonly {
    title: string
    detail: string
  }[]
}

export function DraftPublishSummaryPanel({
  title = 'Draft-to-publish summary',
  items = draftToPublishSummary,
}: DraftPublishSummaryPanelProps) {
  return (
    <div className="panel draft-publish-summary-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Publish state</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{items.length} checkpoints</span>
      </div>
      <div className="draft-list">
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
