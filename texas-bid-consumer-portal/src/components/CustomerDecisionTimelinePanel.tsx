type CustomerDecisionTimelinePanelProps = {
  currentBidCount: number
  shortlistedCount: number
}

export function CustomerDecisionTimelinePanel({ currentBidCount, shortlistedCount }: CustomerDecisionTimelinePanelProps) {
  const steps = [
    {
      title: 'Incoming bids collected',
      detail: `${currentBidCount} bid${currentBidCount === 1 ? '' : 's'} currently tied to the active job.`,
    },
    {
      title: 'Shortlist narrowed',
      detail: `${shortlistedCount} bid${shortlistedCount === 1 ? '' : 's'} currently closest to selection.`,
    },
    {
      title: 'Final contractor selected',
      detail: 'The customer should be able to choose confidently without leaving the job record.',
    },
  ]

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Decision timeline</div>
          <div className="panel-title">How this job should move from bids to selection</div>
        </div>
        <span className="status status-review">3 stages</span>
      </div>

      <div className="timeline-list">
        {steps.map((step) => (
          <div key={step.title} className="timeline-item">
            <div className="timeline-dot" />
            <div>
              <strong>{step.title}</strong>
              <div className="timeline-detail">{step.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
