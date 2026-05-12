import type { Submission } from '../types'

type ContractorComparisonPanelProps = {
  submissions: Submission[]
  selectedSubmissionId?: string | null
  onSelectSubmission?: (submission: Submission) => void
}

const comparisonRows = [
  {
    label: 'Trust level',
    values: {
      shortlisted: 'High',
      reviewing: 'Medium-High',
      received: 'Medium',
      draft: 'Unknown',
    },
  },
  {
    label: 'Scope fit',
    values: {
      shortlisted: 'Strong match',
      reviewing: 'Good match',
      received: 'Needs review',
      draft: 'Not ready',
    },
  },
  {
    label: 'Selection readiness',
    values: {
      shortlisted: 'Ready to advance',
      reviewing: 'Close to shortlist',
      received: 'Needs comparison',
      draft: 'Too early',
    },
  },
] as const

export function ContractorComparisonPanel({ submissions, selectedSubmissionId, onSelectSubmission }: ContractorComparisonPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Side-by-side comparison</div>
          <div className="panel-title">Compare contractors in one workspace</div>
        </div>
        <span className="status status-review">{submissions.length} bids</span>
      </div>

      <div className="submission-list">
        {submissions.map((submission) => {
          const isSelected = submission.id === selectedSubmissionId
          return (
            <button
              key={submission.id}
              className="submission-card review-queue-card"
              onClick={() => onSelectSubmission?.(submission)}
              style={isSelected ? { outline: '3px solid #1d4ed8', outlineOffset: '2px' } : undefined}
            >
              <div className="submission-header">
                <strong>{submission.vendor}</strong>
                <span className={submission.status === 'shortlisted' ? 'status status-awarded' : submission.status === 'reviewing' ? 'status status-review' : 'status status-open'}>
                  {submission.status}
                </span>
              </div>
              <div className="muted">Submission ID: {submission.id}</div>
              <div className="muted">Submitted: {submission.submittedAt}</div>
              <div className="draft-list" style={{ marginTop: '0.75rem' }}>
                {comparisonRows.map((row) => (
                  <div key={row.label} className="draft-card">
                    <strong>{row.label}</strong>
                    <div className="muted">{row.values[submission.status]}</div>
                  </div>
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
