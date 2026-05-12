import type { Submission } from '../types'

type AgencyReviewDecisionPanelProps = {
  activeSubmission: Submission | null
  onAdvanceStatus: (status: Submission['status']) => void
  onArchiveSubmission: () => void
}

function getDecisionState(activeSubmission: Submission | null) {
  if (!activeSubmission) {
    return {
      headline: 'No submission selected',
      detail: 'Choose a live response row before applying review actions.',
      tone: 'status-planning',
    }
  }

  if (activeSubmission.status === 'received') {
    return {
      headline: 'Ready for agency triage',
      detail: `${activeSubmission.vendor} is newly received and can be pushed into clarification, shortlist, or archive flow.`,
      tone: 'status-open',
    }
  }

  if (activeSubmission.status === 'reviewing') {
    return {
      headline: 'Under active review',
      detail: `${activeSubmission.vendor} is already in clarification / review handling and can be escalated to shortlist.`,
      tone: 'status-review',
    }
  }

  return {
    headline: 'Shortlist stage reached',
    detail: `${activeSubmission.vendor} has already advanced and now needs final downstream handling.`,
    tone: 'status-awarded',
  }
}

export function AgencyReviewDecisionPanel({
  activeSubmission,
  onAdvanceStatus,
  onArchiveSubmission,
}: AgencyReviewDecisionPanelProps) {
  const decisionState = getDecisionState(activeSubmission)
  const selectedSubmissionLabel = activeSubmission ? `${activeSubmission.vendor} • ${activeSubmission.id}` : 'No active review row selected.'

  return (
    <div className="panel agency-review-decision-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Agency decision workspace</div>
          <div className="panel-title">Review decision command layer</div>
          <p className="muted response-builder-intro">
            Keep the active agency decision state, recommended next move, and status controls visible in one place.
          </p>
        </div>
        <span className={`status ${decisionState.tone}`}>{activeSubmission?.status ?? 'no selection'}</span>
      </div>

      <div className="agency-decision-grid">
        <div className="detail-stack">
          <div className="detail-card">
            <strong>{decisionState.headline}</strong>
            <p>{decisionState.detail}</p>
          </div>
          <div className="detail-card">
            <strong>Selected submission</strong>
            <p>{selectedSubmissionLabel}</p>
          </div>
        </div>

        <div className="draft-card agency-decision-guidance-card">
          <strong>Decision guidance</strong>
          <div className="agency-readiness-guidance-list">
            <div className="muted">• Shortlist when the packet is complete and worth advancing.</div>
            <div className="muted">• Use clarification when the response is promising but still needs review follow-up.</div>
            <div className="muted">• Mark incomplete when the agency should hold the row in triage instead of advancing it.</div>
            <div className="muted">• Archive only when the row should leave the active review lane.</div>
          </div>
        </div>
      </div>

      <div className="action-stack decision-controls-list">
        <button className="primary wide" onClick={() => onAdvanceStatus('shortlisted')} disabled={!activeSubmission}>
          Shortlist active submission
        </button>
        <button className="ghost wide" onClick={() => onAdvanceStatus('reviewing')} disabled={!activeSubmission}>
          Request clarification
        </button>
        <button className="ghost wide" onClick={() => onAdvanceStatus('received')} disabled={!activeSubmission}>
          Mark incomplete
        </button>
        <button className="ghost wide" onClick={onArchiveSubmission} disabled={!activeSubmission}>
          Archive active submission
        </button>
      </div>
    </div>
  )
}
