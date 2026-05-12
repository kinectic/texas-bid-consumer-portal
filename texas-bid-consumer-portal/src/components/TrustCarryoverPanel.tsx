type TrustCarryoverPanelProps = {
  activeVendor?: string | null
}

const trustCarryoverPoints = [
  'Verification context should stay visible while bids are compared.',
  'Trust proof should support the shortlist, not disappear after marketplace browsing.',
  'Selection confidence improves when trust and pricing stay in the same decision lane.',
] as const

export function TrustCarryoverPanel({ activeVendor }: TrustCarryoverPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Trust carryover</div>
          <div className="panel-title">Keep trust proof visible during final comparison</div>
        </div>
        <span className="status status-review">In play</span>
      </div>

      <div className="draft-list">
        {trustCarryoverPoints.map((point) => (
          <div key={point} className="draft-card">
            <strong>{point}</strong>
            <div className="muted">This helps the customer keep verification context attached to the final decision.</div>
          </div>
        ))}
      </div>

      <div className="dashboard-note compact-note" style={{ marginTop: '1rem' }}>
        {activeVendor
          ? `Current comparison lead: ${activeVendor}. Trust proof should stay visible while this bid is being advanced.`
          : 'No lead contractor selected yet. Trust proof still needs to remain part of the comparison lane.'}
      </div>
    </div>
  )
}
