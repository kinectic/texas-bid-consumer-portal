import type { Opportunity } from '../types'

type RecommendedOpportunitiesPanelProps = {
  title?: string
  opportunities: Opportunity[]
  actionLabel?: string
  onSelectOpportunity?: (opportunity: Opportunity) => void
  onAction?: () => void
}

export function RecommendedOpportunitiesPanel({
  title = 'Recommended opportunities',
  opportunities,
  actionLabel,
  onSelectOpportunity,
  onAction,
}: RecommendedOpportunitiesPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="recommended-opportunities-list">
        {opportunities.map((opportunity) => (
          <div className="draft-card" key={opportunity.id} onClick={() => onSelectOpportunity?.(opportunity)}>
            <strong>{opportunity.title}</strong>
            <div className="muted">{opportunity.category}</div>
            <div className="muted">Due {opportunity.dueDate}</div>
          </div>
        ))}
      </div>
      {actionLabel ? <button className="primary wide" onClick={onAction}>{actionLabel}</button> : null}
    </div>
  )
}
