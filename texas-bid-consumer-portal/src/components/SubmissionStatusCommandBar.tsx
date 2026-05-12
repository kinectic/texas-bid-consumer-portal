import type { Submission } from '../types'

type SubmissionStatusCommandBarProps = {
  activeSubmission: Submission | null
  attachedCount: number
  totalDocuments: number
  formStatus: string
  submissionStatus: string
  onSaveProgress: () => void
  onSubmitResponse: () => void
}

function presentStatusTone(status: string) {
  const normalized = status.toLowerCase()

  if (normalized.includes('complete') || normalized.includes('ready')) return 'status-live'
  if (normalized.includes('progress') || normalized.includes('draft')) return 'status-review'
  return 'status-planning'
}

function presentAttachmentTone(attachedCount: number, totalDocuments: number) {
  if (attachedCount >= totalDocuments && totalDocuments > 0) return 'status-live'
  if (attachedCount > 0) return 'status-review'
  return 'status-planning'
}

export function SubmissionStatusCommandBar({
  activeSubmission,
  attachedCount,
  totalDocuments,
  formStatus,
  submissionStatus,
  onSaveProgress,
  onSubmitResponse,
}: SubmissionStatusCommandBarProps) {
  const normalizedTotalDocuments = Math.max(totalDocuments, 1)
  const attachmentProgress = `${attachedCount}/${normalizedTotalDocuments}`
  const activeRowLabel = activeSubmission ? `${activeSubmission.vendor} · ${activeSubmission.id}` : 'Unsaved draft lane'
  const primaryActionLabel = activeSubmission?.status === 'received' ? 'Update submitted response' : 'Submit active response'
  const statusTone = presentStatusTone(submissionStatus)
  const attachmentTone = presentAttachmentTone(attachedCount, totalDocuments)
  const actionSummary = activeSubmission
    ? `${activeSubmission.vendor} is the live row. Save if the packet still needs revision; submit when the current snapshot is ready for agency review.`
    : 'You are still working in the unsaved draft lane. Save the row or submit the current packet when the draft is ready.'

  return (
    <div className="panel submission-status-command-bar">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Submission command bar</div>
          <div className="panel-title">Active response controls</div>
          <p className="muted response-builder-intro">
            Keep the live row state, attachment readiness, and final response actions visible at one decision point.
          </p>
        </div>
        <span className={`status ${statusTone}`}>{submissionStatus}</span>
      </div>

      <div className="draft-card submission-command-summary-card">
        <strong>Action summary</strong>
        <div className="muted">{actionSummary}</div>
      </div>

      <div className="submission-command-grid">
        <div className="draft-card">
          <div className="submission-status-snapshot-row">
            <strong>Active row</strong>
            <span className="status status-open">Live</span>
          </div>
          <div className="muted">{activeRowLabel}</div>
        </div>
        <div className="draft-card">
          <div className="submission-status-snapshot-row">
            <strong>Form state</strong>
            <span className={`status ${presentStatusTone(formStatus)}`}>{formStatus}</span>
          </div>
          <div className="muted">Use this to confirm whether the editable response fields are ready for final handoff.</div>
        </div>
        <div className="draft-card">
          <div className="submission-status-snapshot-row">
            <strong>Attachments</strong>
            <span className={`status ${attachmentTone}`}>{attachmentProgress}</span>
          </div>
          <div className="muted">Attachment packet progress for the final response snapshot.</div>
        </div>
      </div>

      <div className="response-builder-actions">
        <button className="ghost" onClick={onSaveProgress}>Save active row</button>
        <button className="primary" onClick={onSubmitResponse}>{primaryActionLabel}</button>
      </div>
    </div>
  )
}
