import type { Submission } from '../types'

type HireConfirmationPreviewPanelProps = {
  activeSubmission: Submission | null
}

export function HireConfirmationPreviewPanel({ activeSubmission }: HireConfirmationPreviewPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Hire confirmation preview</div>
          <div className="panel-title">What advancing this contractor would mean</div>
        </div>
        <span className="status status-review">Pre-confirmation</span>
      </div>

      <div className="draft-list">
        <div className="draft-card">
          <strong>{activeSubmission?.vendor ?? 'No contractor selected'}</strong>
          <div className="muted">
            {activeSubmission
              ? `If you advance ${activeSubmission.vendor}, this bid becomes the active hire candidate for ${activeSubmission.opportunity}.`
              : 'Select a contractor bid to preview the hire confirmation state.'}
          </div>
        </div>
        <div className="draft-card">
          <strong>Customer impact</strong>
          <div className="muted">Messages, trust proof, and comparison context should remain attached as the decision moves from shortlist to likely hire.</div>
        </div>
        <div className="draft-card">
          <strong>Next expected move</strong>
          <div className="muted">Confirm final fit, preserve the message thread, and hand off into post-selection next steps.</div>
        </div>
      </div>
    </div>
  )
}
