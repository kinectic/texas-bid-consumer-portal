import type { Opportunity } from '../types'

type RecommendedOpportunitiesPanelProps = {
  title?: string
  opportunities: Opportunity[]
  actionLabel?: string
}

export function RecommendedOpportunitiesPanel({
  title = 'Recommended opportunities',
  opportunities,
  actionLabel,
}: RecommendedOpportunitiesPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="recommended-opportunities-list">
        {opportunities.map((opportunity) => (
          <div className="draft-card" key={opportunity.id}>
            <strong>{opportunity.title}</strong>
            <div className="muted">{opportunity.category}</div>
            <div className="muted">Due {opportunity.dueDate}</div>
          </div>
        ))}
      </div>
      {actionLabel ? <button className="primary wide">{actionLabel}</button> : null}
    </div>
  )
}
