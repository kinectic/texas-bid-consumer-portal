import type { Submission } from '../types'

type SelectedContractorRecommendationPanelProps = {
  submissions: Submission[]
  activeSubmission: Submission | null
}

export function SelectedContractorRecommendationPanel({ submissions, activeSubmission }: SelectedContractorRecommendationPanelProps) {
  const recommended = activeSubmission ?? submissions.find((submission) => submission.status === 'shortlisted') ?? submissions.find((submission) => submission.status === 'reviewing') ?? submissions[0] ?? null

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Recommendation</div>
          <div className="panel-title">Likely next contractor to advance</div>
        </div>
        <span className="status status-review">Decision aid</span>
      </div>

      <div className="draft-card">
        <strong>{recommended ? recommended.vendor : 'No recommendation yet'}</strong>
        <div className="muted">
          {recommended
            ? `Current best-fit bid: ${recommended.id} (${recommended.status}).`
            : 'As more comparison data arrives, this panel can recommend a likely next contractor.'}
        </div>
        <div className="dashboard-note compact-note">
          {recommended
            ? 'This recommendation should help the customer decide whether to advance, negotiate, or keep comparing.'
            : 'The recommendation layer is waiting for enough signal to name a likely winner.'}
        </div>
      </div>
    </div>
  )
}
