import type { CreateBidFormState } from '../types/forms'

type PublishedBidSnapshotPanelProps = {
  title?: string
  bid: CreateBidFormState
}

export function PublishedBidSnapshotPanel({
  title = 'Published bid snapshot',
  bid,
}: PublishedBidSnapshotPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="published-bid-snapshot-list">
        <div className="draft-card">
          <strong>{bid.title}</strong>
          <div className="muted">Category: {bid.category}</div>
          <div className="muted">Deadline: {bid.deadline}</div>
        </div>
        <div className="draft-card">
          <strong>Scope preview</strong>
          <div className="muted">{bid.scope}</div>
        </div>
        <div className="draft-card">
          <strong>Requirements preview</strong>
          <div className="muted">{bid.requirements}</div>
        </div>
      </div>
    </div>
  )
}
