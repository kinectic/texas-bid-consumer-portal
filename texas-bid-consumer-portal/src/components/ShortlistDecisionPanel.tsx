import type { Submission } from '../types'

type ShortlistDecisionPanelProps = {
  submissions: Submission[]
  activeSubmission: Submission | null
}

export function ShortlistDecisionPanel({ submissions, activeSubmission }: ShortlistDecisionPanelProps) {
  const strongestSubmission = activeSubmission ?? submissions.find((submission) => submission.status === 'shortlisted') ?? submissions[0] ?? null
  const comparisonSignals = [
    strongestSubmission ? `${strongestSubmission.vendor} is the clearest current lead.` : 'No lead bid yet.',
    `${submissions.filter((submission) => submission.status === 'reviewing').length} bid(s) still need active comparison.`,
    `${submissions.filter((submission) => submission.status === 'received').length} bid(s) are still earlier in the funnel.`,
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Shortlist decision</div>
          <div className="panel-title">Who is leading this customer decision</div>
        </div>
        <span className="status status-review">{submissions.length} tracked</span>
      </div>

      <div className="draft-list">
        {comparisonSignals.map((signal) => (
          <div key={signal} className="draft-card">
            <strong>{signal}</strong>
            <div className="muted">Use the shortlist view to decide whether to advance, keep comparing, or reopen negotiation.</div>
          </div>
        ))}
      </div>

      <div className="draft-card" style={{ marginTop: '1rem' }}>
        <strong>{strongestSubmission ? strongestSubmission.vendor : 'No active leader yet'}</strong>
        <div className="muted">
          {strongestSubmission
            ? `Active lead submission: ${strongestSubmission.id} (${strongestSubmission.status}).`
            : 'When real comparisons exist, the current best-fit contractor will appear here.'}
        </div>
        <div className="dashboard-note compact-note">
          {strongestSubmission
            ? 'This panel should make the likely next customer decision visible before the final CTA.'
            : 'This panel is waiting for enough activity to identify a likely leader.'}
        </div>
      </div>
    </div>
  )
}
