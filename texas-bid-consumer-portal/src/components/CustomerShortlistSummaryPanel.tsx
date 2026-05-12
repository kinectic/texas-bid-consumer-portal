import type { Submission } from '../types'

type CustomerShortlistSummaryPanelProps = {
  submissions: Submission[]
  selectedSubmissionId?: string | null
  onSelectSubmission?: (submission: Submission) => void
}

const statusRank: Record<Submission['status'], number> = {
  shortlisted: 4,
  reviewing: 3,
  received: 2,
  draft: 1,
}

export function CustomerShortlistSummaryPanel({ submissions, selectedSubmissionId, onSelectSubmission }: CustomerShortlistSummaryPanelProps) {
  const ranked = [...submissions].sort((left, right) => statusRank[right.status] - statusRank[left.status])
  const leader = ranked[0] ?? null
  const shortlistedCount = submissions.filter((submission) => submission.status === 'shortlisted').length
  const reviewingCount = submissions.filter((submission) => submission.status === 'reviewing').length

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Customer shortlist</div>
          <div className="panel-title">Who is closest to selection right now</div>
        </div>
        <span className="status status-review">{submissions.length} bids</span>
      </div>

      <div className="draft-list">
        <div className="draft-card">
          <strong>{leader ? leader.vendor : 'No active bids yet'}</strong>
          <div className="muted">{leader ? `Current strongest bid on file: ${leader.id}` : 'Once bids arrive, the leading contractor will appear here.'}</div>
          <div className="dashboard-note compact-note">
            {leader
              ? `${leader.vendor} is currently the clearest next contractor to compare or advance toward selection.`
              : 'This panel is ready for the first real shortlist signal.'}
          </div>
        </div>

        <div className="draft-card">
          <strong>{shortlistedCount} shortlisted</strong>
          <div className="muted">{reviewingCount} still under active comparison</div>
          <div className="dashboard-note compact-note">Use this summary to narrow the field before opening full bid review.</div>
        </div>
      </div>

      <div className="submission-list">
        {ranked.map((submission) => {
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
              <div className="dashboard-note compact-note">
                {submission.status === 'shortlisted'
                  ? 'Already closest to a customer decision.'
                  : submission.status === 'reviewing'
                    ? 'Strong comparison candidate for the shortlist.'
                    : 'Still early in the evaluation funnel.'}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
