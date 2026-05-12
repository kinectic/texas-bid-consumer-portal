import type { Submission } from '../types'

type ReasonsToChoosePanelProps = {
  activeSubmission: Submission | null
}

export function ReasonsToChoosePanel({ activeSubmission }: ReasonsToChoosePanelProps) {
  const reasons = activeSubmission
    ? [
        `${activeSubmission.vendor} is currently one of the clearest bids in the comparison set.`,
        'Trust and responsiveness are visible enough to support a shortlist decision.',
        'The customer can move from review into negotiation or final selection without leaving context.',
      ]
    : [
        'Select a contractor bid to see explicit reasons for advancement.',
        'This panel should make shortlist logic visible to the customer.',
        'Decision rationale should not remain implicit in scattered UI copy.',
      ]

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Decision rationale</div>
          <div className="panel-title">Reasons to choose this contractor</div>
        </div>
        <span className="status status-review">Visible rationale</span>
      </div>

      <div className="draft-list">
        {reasons.map((reason) => (
          <div key={reason} className="draft-card">
            <strong>{reason}</strong>
            <div className="muted">This panel makes the shortlist decision easier to defend and easier to act on.</div>
          </div>
        ))}
      </div>
    </div>
  )
}
