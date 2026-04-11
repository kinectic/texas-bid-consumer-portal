import type { CreateBidFormState } from '../types/forms'

type BidFormOverviewPanelProps = {
  title?: string
  formState: CreateBidFormState
}

export function BidFormOverviewPanel({
  title = 'Bid form overview',
  formState,
}: BidFormOverviewPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="bid-form-overview-list">
        <div className="draft-card">
          <strong>{formState.title}</strong>
          <div className="muted">Category: {formState.category}</div>
          <div className="muted">Type: {formState.solicitationType}</div>
        </div>
        <div className="draft-card">
          <strong>Schedule</strong>
          <div className="muted">Issue date: {formState.issueDate}</div>
          <div className="muted">Deadline: {formState.deadline}</div>
        </div>
        <div className="draft-card">
          <strong>Requirements snapshot</strong>
          <div className="muted">{formState.requirements}</div>
        </div>
      </div>
    </div>
  )
}
