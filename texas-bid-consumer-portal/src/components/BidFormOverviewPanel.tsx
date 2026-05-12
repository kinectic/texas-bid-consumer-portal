import type { CreateBidFormState } from '../types/forms'

type BidFormOverviewPanelProps = {
  title?: string
  formState: CreateBidFormState
}

export function BidFormOverviewPanel({
  title = 'Customer job post overview',
  formState,
}: BidFormOverviewPanelProps) {
  return (
    <div className="panel bid-form-overview-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Job post snapshot</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">Overview</span>
      </div>
      <div className="bid-form-overview-list">
        <div className="draft-card">
          <strong>{formState.title}</strong>
          <div className="muted">Category: {formState.category}</div>
          <div className="muted">Request type: {formState.solicitationType}</div>
        </div>
        <div className="draft-card">
          <strong>Timing</strong>
          <div className="muted">Posted: {formState.issueDate}</div>
          <div className="muted">Customer target: {formState.deadline}</div>
        </div>
        <div className="draft-card">
          <strong>Scope snapshot</strong>
          <div className="muted">{formState.scope}</div>
        </div>
        <div className="draft-card">
          <strong>Contractor requirements</strong>
          <div className="muted">{formState.requirements}</div>
        </div>
      </div>
    </div>
  )
}
