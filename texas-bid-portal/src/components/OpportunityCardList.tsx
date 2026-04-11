import type { Opportunity } from '../types'

type OpportunityCardListProps = {
  opportunities: Opportunity[]
  statusClassMap: Record<Opportunity['status'], string>
  metaFormatter: (opportunity: Opportunity) => string
}

export function OpportunityCardList({ opportunities, statusClassMap, metaFormatter }: OpportunityCardListProps) {
  return (
    <div className="opportunity-list">
      {opportunities.map((opportunity) => (
        <article className="opportunity-card" key={opportunity.id}>
          <div className="opportunity-top">
            <div>
              <h3>{opportunity.title}</h3>
              <div className="meta">{metaFormatter(opportunity)}</div>
            </div>
            <span className={statusClassMap[opportunity.status]}>{opportunity.status}</span>
          </div>
          <p>{opportunity.summary}</p>
          <div className="card-footer">
            <div className="muted">Due {opportunity.dueDate}</div>
            <div className="muted">Source: {opportunity.source}</div>
          </div>
        </article>
      ))}
    </div>
  )
}
