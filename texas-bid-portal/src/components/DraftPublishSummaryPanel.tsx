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
    <div className="panel">
      <div className="panel-title">{title}</div>
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
