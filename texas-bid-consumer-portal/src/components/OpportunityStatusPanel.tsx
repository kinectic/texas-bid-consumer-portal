import { unifiedOpportunityStatus } from '../data/opportunityStatus'

type OpportunityStatusPanelProps = {
  status: 'open' | 'awarded' | 'reviewing'
}

export function OpportunityStatusPanel({ status }: OpportunityStatusPanelProps) {
  const current = unifiedOpportunityStatus[status]

  return (
    <div className="panel opportunity-status-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Opportunity status</div>
          <div className="panel-title">Opportunity status</div>
        </div>
        <span className={`status ${status === 'open' ? 'status-open' : status === 'reviewing' ? 'status-review' : 'status-awarded'}`}>{current.label}</span>
      </div>
      <div className="draft-card">
        <strong>{current.label}</strong>
        <div className="dashboard-note compact-note">{current.detail}</div>
      </div>
    </div>
  )
}
