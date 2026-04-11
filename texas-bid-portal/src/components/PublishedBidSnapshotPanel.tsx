import type { CreateBidFormState } from '../types/forms'

type PublishedBidSnapshotPanelProps = {
  title?: string
  bid: CreateBidFormState
  statusLabel?: string
  note?: string
}

export function PublishedBidSnapshotPanel({
  title = 'Published bid snapshot',
  bid,
  statusLabel = 'Draft',
  note = 'This bid is still in drafting mode and has not been pushed live into the marketplace yet.',
}: PublishedBidSnapshotPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="published-bid-snapshot-list">
        <div className="draft-card">
          <strong>{bid.title}</strong>
          <div className="muted">Status: {statusLabel}</div>
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
        <div className="draft-card">
          <strong>Publishing note</strong>
          <div className="muted">{note}</div>
        </div>
      </div>
    </div>
  )
}
