import type { Submission } from '../types'

type ReviewDecisionTimelinePanelProps = {
  activeSubmission: Submission | null
}

function buildTimeline(activeSubmission: Submission | null) {
  const currentStatus = activeSubmission?.status ?? 'received'

  const steps = [
    {
      label: 'Received',
      detail: 'Response package enters the agency review lane.',
      complete: ['received', 'reviewing', 'shortlisted'].includes(currentStatus),
      current: currentStatus === 'received',
    },
    {
      label: 'Completeness check',
      detail: 'Procurement staff confirm packet structure, attachments, and response fit.',
      complete: ['reviewing', 'shortlisted'].includes(currentStatus),
      current: currentStatus === 'reviewing',
    },
    {
      label: 'Review decision',
      detail: 'Agency chooses clarification, shortlist, or archive path.',
      complete: currentStatus === 'shortlisted',
      current: currentStatus === 'shortlisted',
    },
  ]

  return steps
}

export function ReviewDecisionTimelinePanel({ activeSubmission }: ReviewDecisionTimelinePanelProps) {
  const steps = buildTimeline(activeSubmission)
  const completedSteps = steps.filter((step) => step.complete).length

  return (
    <div className="panel review-decision-timeline-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Review decision timeline</div>
          <div className="panel-title">Agency decision progression</div>
          <p className="muted response-builder-intro">
            A compact view of where the selected submission sits inside the agency decision path.
          </p>
        </div>
        <span className={`status ${activeSubmission?.status === 'shortlisted' ? 'status-awarded' : activeSubmission?.status === 'reviewing' ? 'status-review' : 'status-open'}`}>
          {activeSubmission?.status ?? 'received'}
        </span>
      </div>

      <div className="draft-card review-timeline-summary-card">
        <strong>Progress summary</strong>
        <div className="muted">{completedSteps}/{steps.length} agency review stages are complete for the selected submission.</div>
      </div>

      <div className="package-completeness-list">
        {steps.map((step) => (
          <div className="draft-card" key={step.label}>
            <div className="submission-status-snapshot-row">
              <strong>{step.label}</strong>
              <span className={`status ${step.current ? 'status-review' : step.complete ? 'status-live' : 'status-planning'}`}>
                {step.current ? 'Current' : step.complete ? 'Complete' : 'Next'}
              </span>
            </div>
            <div className="muted">{step.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
