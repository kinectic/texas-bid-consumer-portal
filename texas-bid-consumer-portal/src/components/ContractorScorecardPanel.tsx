import type { Submission } from '../types'

type ContractorScorecardPanelProps = {
  activeSubmission: Submission | null
}

const scorecardRows = [
  { label: 'Trust confidence', detail: 'How safe this contractor feels to hire based on visible proof and follow-through.' },
  { label: 'Scope match', detail: 'How well the bid appears to fit the exact job requirements.' },
  { label: 'Pricing clarity', detail: 'How understandable and decision-ready the quote appears.' },
  { label: 'Selection readiness', detail: 'How close the customer is to advancing or choosing this contractor.' },
] as const

export function ContractorScorecardPanel({ activeSubmission }: ContractorScorecardPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Contractor scorecard</div>
          <div className="panel-title">Detailed read on the active contractor bid</div>
        </div>
        <span className="status status-review">{activeSubmission?.status ?? 'No bid selected'}</span>
      </div>

      <div className="draft-card" style={{ marginBottom: '1rem' }}>
        <strong>{activeSubmission?.vendor ?? 'No contractor selected'}</strong>
        <div className="muted">
          {activeSubmission
            ? `Reviewing ${activeSubmission.id} for active customer comparison.`
            : 'Select a contractor bid to populate the scorecard.'}
        </div>
      </div>

      <div className="draft-list">
        {scorecardRows.map((row) => (
          <div key={row.label} className="draft-card">
            <strong>{row.label}</strong>
            <div className="muted">{row.detail}</div>
            <div className="dashboard-note compact-note">
              {activeSubmission
                ? activeSubmission.status === 'shortlisted'
                  ? 'Currently strong enough to support final selection.'
                  : activeSubmission.status === 'reviewing'
                    ? 'Needs one more comparison pass before final advancement.'
                    : 'Still early; more review may be needed.'
                : 'No evaluation state yet.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
