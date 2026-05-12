import type { Submission } from '../types'

type PostSelectionNextStepsPanelProps = {
  activeSubmission: Submission | null
}

export function PostSelectionNextStepsPanel({ activeSubmission }: PostSelectionNextStepsPanelProps) {
  const steps = [
    'Confirm the chosen contractor and preserve the comparison record.',
    'Move the message thread into kickoff / final clarification mode.',
    'Keep job progress and next actions attached to the same customer record.',
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Post-selection flow</div>
          <div className="panel-title">What happens right after the contractor is advanced</div>
        </div>
        <span className="status status-review">Next steps</span>
      </div>

      <div className="draft-card" style={{ marginBottom: '1rem' }}>
        <strong>{activeSubmission?.vendor ?? 'No contractor selected yet'}</strong>
        <div className="muted">
          {activeSubmission
            ? `If ${activeSubmission.vendor} is confirmed, the workflow should move from comparison into kickoff without losing the job record.`
            : 'Select a contractor bid to preview the post-selection flow.'}
        </div>
      </div>

      <div className="draft-list">
        {steps.map((step) => (
          <div key={step} className="draft-card">
            <strong>{step}</strong>
            <div className="muted">This keeps the customer workflow moving beyond selection instead of ending at the decision moment.</div>
          </div>
        ))}
      </div>
    </div>
  )
}
