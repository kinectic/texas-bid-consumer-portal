import { draftToPublishSummary } from '../data/draftPublishSummary'

type DraftPublishSummaryPanelProps = {
  title?: string
}

export function DraftPublishSummaryPanel({ title = 'Draft-to-publish summary' }: DraftPublishSummaryPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="draft-list">
        {draftToPublishSummary.map((item) => (
          <div className="draft-card" key={item.title}>
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
