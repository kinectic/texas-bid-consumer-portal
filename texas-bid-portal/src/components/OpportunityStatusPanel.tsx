import { unifiedOpportunityStatus } from '../data/opportunityStatus'

type OpportunityStatusPanelProps = {
  status: 'open' | 'awarded' | 'reviewing'
}

export function OpportunityStatusPanel({ status }: OpportunityStatusPanelProps) {
  const current = unifiedOpportunityStatus[status]

  return (
    <div className="panel">
      <div className="panel-title">Opportunity status</div>
      <div className="draft-card">
        <strong>{current.label}</strong>
        <div className="dashboard-note compact-note">{current.detail}</div>
      </div>
    </div>
  )
}
