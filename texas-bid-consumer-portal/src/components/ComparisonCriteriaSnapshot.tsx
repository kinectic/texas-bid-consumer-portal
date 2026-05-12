type ComparisonCriteriaSnapshotProps = {
  opportunityTitle: string
  activeVendor?: string | null
}

const criteria = [
  {
    title: 'Trust and verification',
    detail: 'Does the contractor have enough visible proof to reduce customer hesitation?',
  },
  {
    title: 'Scope fit',
    detail: 'Does the bid look tailored to this exact job instead of generic coverage?',
  },
  {
    title: 'Response quality',
    detail: 'Is the quote clear, timely, and easy for the customer to understand?',
  },
  {
    title: 'Selection readiness',
    detail: 'Does the customer have enough clarity to shortlist or choose now?',
  },
] as const

export function ComparisonCriteriaSnapshot({ opportunityTitle, activeVendor }: ComparisonCriteriaSnapshotProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Comparison basis</div>
          <div className="panel-title">What the customer should weigh before shortlisting</div>
        </div>
        <span className="status status-review">4 checks</span>
      </div>

      <div className="draft-list">
        {criteria.map((criterion) => (
          <div key={criterion.title} className="draft-card">
            <strong>{criterion.title}</strong>
            <div className="muted">{criterion.detail}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-note compact-note" style={{ marginTop: '1rem' }}>
        Active job: {opportunityTitle}. {activeVendor ? `Current lead under comparison: ${activeVendor}.` : 'No lead contractor selected yet.'}
      </div>
    </div>
  )
}
