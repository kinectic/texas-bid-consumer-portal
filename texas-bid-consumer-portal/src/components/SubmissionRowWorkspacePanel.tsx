import type { Submission } from '../types'
import type { SubmissionFormState } from '../types/forms'

type SubmissionRowWorkspacePanelProps = {
  activeSubmission: Submission | null
  siblingSubmissions: Submission[]
  formState: SubmissionFormState
  draftSummary: {
    formStatus: string
    attachedCount: number
    totalDocuments: number
    submissionStatus: string
    bufferLabel: string
    preservedUnsavedDraftLabel: string
  }
  onSelectSubmission: (submission: Submission) => void
  onStartNewSubmission: () => void
}

function countCompletedFields(formState: SubmissionFormState) {
  return Object.values(formState).filter((value) => value.trim().length > 0).length
}

export function SubmissionRowWorkspacePanel({
  activeSubmission,
  siblingSubmissions,
  formState,
  draftSummary,
  onSelectSubmission,
  onStartNewSubmission,
}: SubmissionRowWorkspacePanelProps) {
  const completedFields = countCompletedFields(formState)
  const totalFields = Object.keys(formState).length
  const attachmentProgress = `${draftSummary.attachedCount}/${Math.max(draftSummary.totalDocuments, 1)}`

  return (
    <div className="panel submission-row-workspace-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Submission row workspace</div>
          <div className="panel-title">Draft row control center</div>
          <p className="muted response-builder-intro">
            Switch between saved response rows, preserve the unsaved draft lane, and keep one active working record.
          </p>
        </div>
        <button className="ghost" onClick={onStartNewSubmission}>Start unsaved draft row</button>
      </div>

      <div className="draft-card submission-command-summary-card">
        <strong>Workspace summary</strong>
        <div className="muted">{siblingSubmissions.length} saved response row(s) plus the unsaved draft lane are available for this opportunity.</div>
      </div>

      <div className="detail-stack">
        <div className="detail-card">
          <strong>Active lane</strong>
          <p>{activeSubmission ? `${activeSubmission.vendor} · ${activeSubmission.id} is the current saved row.` : 'Unsaved draft lane is the current active row.'}</p>
        </div>
        <div className="detail-card">
          <strong>Draft readiness</strong>
          <p>{draftSummary.formStatus} • {completedFields}/{totalFields} fields filled • {attachmentProgress} attachments ready</p>
        </div>
        <div className="detail-card">
          <strong>Buffer status</strong>
          <p>{activeSubmission ? draftSummary.bufferLabel : draftSummary.preservedUnsavedDraftLabel}</p>
        </div>
      </div>

      <div className="workspace-row-list">
        <button
          className={`workspace-row-card ${activeSubmission ? '' : 'active'}`.trim()}
          onClick={onStartNewSubmission}
          type="button"
        >
          <div className="workspace-row-topline">
            <strong>Unsaved draft lane</strong>
            <span>{activeSubmission ? 'available' : 'active'}</span>
          </div>
          <p>
            {draftSummary.preservedUnsavedDraftLabel} • {draftSummary.formStatus} • {attachmentProgress} attachments ready
          </p>
        </button>

        {siblingSubmissions.map((submission, index) => {
          const isActive = submission.id === activeSubmission?.id
          return (
            <button
              key={submission.id}
              className={`workspace-row-card ${isActive ? 'active' : ''}`.trim()}
              onClick={() => onSelectSubmission(submission)}
              type="button"
            >
              <div className="workspace-row-topline">
                <strong>{`Response row ${index + 1}`}</strong>
                <span>{isActive ? 'active' : submission.status}</span>
              </div>
              <p>{submission.vendor} • {submission.id} • {submission.status} • saved workflow row</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
