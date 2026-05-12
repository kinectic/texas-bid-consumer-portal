import type { CreateBidFormState } from '../types/forms'

type PublishedBidSnapshotPanelProps = {
  title?: string
  bid: CreateBidFormState
  statusLabel?: string
  note?: string
}

export function PublishedBidSnapshotPanel({
  title = 'Customer job snapshot',
  bid,
  statusLabel = 'Draft',
  note = 'This job record is still being shaped and has not yet moved into the live customer-to-contractor matching flow.',
}: PublishedBidSnapshotPanelProps) {
  const vendorVisibilityLabel = statusLabel === 'Published' ? 'Visible to matched contractors' : 'Draft only'
  return (
    <div className="panel published-bid-snapshot-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Job snapshot</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className={`status ${statusLabel === 'Published' ? 'status-open' : 'status-review'}`}>{statusLabel}</span>
      </div>
      <div className="published-bid-snapshot-list">
        <div className="draft-card preview-card preview-card-publish-state">
          <strong>{bid.title}</strong>
          <div className="muted">Status: {statusLabel}</div>
          <div className="muted">Contractor visibility: {vendorVisibilityLabel}</div>
          <div className="muted">Category: {bid.category}</div>
          <div className="muted">Target timeline: {bid.deadline}</div>
        </div>
        <div className="draft-card">
          <strong>Scope preview</strong>
          <div className="muted">{bid.scope}</div>
        </div>
        <div className="draft-card">
          <strong>Requirements preview</strong>
          <div className="muted">{bid.requirements}</div>
        </div>
        <div className="draft-card">
          <strong>Matching note</strong>
          <div className="muted">{note}</div>
        </div>
      </div>
    </div>
  )
}
