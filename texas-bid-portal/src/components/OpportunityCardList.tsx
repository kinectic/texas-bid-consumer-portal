import type { Opportunity } from '../types'
import { presentReadinessForRole } from '../utils/readinessPresentation'

type OpportunityReadinessSummary = {
  label: string
  detail: string
}

type OpportunityCardListProps = {
  opportunities: Opportunity[]
  statusClassMap: Record<Opportunity['status'], string>
  metaFormatter: (opportunity: Opportunity) => string
  role?: 'vendor' | 'agency'
  selectedOpportunityId?: string
  onSelectOpportunity?: (opportunity: Opportunity) => void
  readinessByOpportunityId?: Record<string, OpportunityReadinessSummary>
}

export function OpportunityCardList({
  opportunities,
  statusClassMap,
  metaFormatter,
  role = 'vendor',
  selectedOpportunityId,
  onSelectOpportunity,
  readinessByOpportunityId,
}: OpportunityCardListProps) {
  return (
    <div className="opportunity-list">
      {opportunities.map((opportunity) => (
        (() => {
          const readiness = presentReadinessForRole(readinessByOpportunityId?.[opportunity.id], role)
          return (
        <article
          className="opportunity-card"
          key={opportunity.id}
          onClick={() => onSelectOpportunity?.(opportunity)}
          style={selectedOpportunityId === opportunity.id ? { outline: '2px solid #2563eb', outlineOffset: '2px' } : undefined}
        >
          <div className="opportunity-top">
            <div>
              <h3>{opportunity.title}</h3>
              <div className="meta">{metaFormatter(opportunity)}</div>
            </div>
            <span className={statusClassMap[opportunity.status]}>{opportunity.status}</span>
          </div>
          <p>{opportunity.summary}</p>
          {readiness ? (
            <div className="dashboard-note compact-note">
              <strong>{readiness.label}</strong>
              <div>{readiness.detail}</div>
            </div>
          ) : null}
          <div className="card-footer">
            <div className="muted">Due {opportunity.dueDate}</div>
            <div className="muted">Source: {opportunity.source}</div>
          </div>
        </article>
          )
        })()
      ))}
    </div>
  )
}
