import type { Opportunity } from '../types'

type OpportunityMetadataPanelProps = {
  opportunity: Opportunity
  title?: string
}

export function OpportunityMetadataPanel({ opportunity, title = 'Opportunity metadata' }: OpportunityMetadataPanelProps) {
  return (
    <div className="panel opportunity-metadata-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Opportunity facts</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-open">Metadata</span>
      </div>
      <div className="detail-grid">
        <div>
          <div className="detail-label">Agency</div>
          <div>{opportunity.agency}</div>
        </div>
        <div>
          <div className="detail-label">Deadline</div>
          <div>{opportunity.dueDate}</div>
        </div>
        <div>
          <div className="detail-label">Category</div>
          <div>{opportunity.category}</div>
        </div>
        <div>
          <div className="detail-label">Source</div>
          <div>{opportunity.source}</div>
        </div>
        <div>
          <div className="detail-label">Location</div>
          <div>{opportunity.location}</div>
        </div>
        <div>
          <div className="detail-label">Opportunity ID</div>
          <div>{opportunity.id}</div>
        </div>
      </div>
    </div>
  )
}
