import type { Submission } from '../types'

const trustDetails = [
  'Business identity and contact verification remain visible.',
  'Insurance / license proof should stay attached to the comparison lane.',
  'Response quality and follow-through should reinforce confidence before selection.',
] as const

type ContractorTrustDetailPanelProps = {
  activeSubmission: Submission | null
}

export function ContractorTrustDetailPanel({ activeSubmission }: ContractorTrustDetailPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Contractor trust detail</div>
          <div className="panel-title">Deeper proof behind the active contractor</div>
        </div>
        <span className="status status-review">Trust detail</span>
      </div>

      <div className="draft-card" style={{ marginBottom: '1rem' }}>
        <strong>{activeSubmission?.vendor ?? 'No contractor selected'}</strong>
        <div className="muted">
          {activeSubmission
            ? `Trust proof for ${activeSubmission.vendor} should stay available while the customer decides whether to advance ${activeSubmission.id}.`
            : 'Select a contractor to expose deeper trust detail.'}
        </div>
      </div>

      <div className="draft-list">
        {trustDetails.map((detail) => (
          <div key={detail} className="draft-card">
            <strong>{detail}</strong>
            <div className="muted">This helps the customer compare credibility without leaving the workflow.</div>
          </div>
        ))}
      </div>
    </div>
  )
}
