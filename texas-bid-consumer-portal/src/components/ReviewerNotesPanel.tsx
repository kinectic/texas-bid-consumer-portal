import { FieldMock } from './FieldMock'

type ReviewerNotesPanelProps = {
  title?: string
  primaryLabel: string
  primaryValue: string
  secondaryLabel: string
  secondaryValue: string
  onPrimaryChange: (value: string) => void
  onSecondaryChange: (value: string) => void
  actionLabel?: string
}

export function ReviewerNotesPanel({
  title = 'Reviewer notes',
  primaryLabel,
  primaryValue,
  secondaryLabel,
  secondaryValue,
  onPrimaryChange,
  onSecondaryChange,
  actionLabel = 'Save review note',
}: ReviewerNotesPanelProps) {
  const primaryCaptured = primaryValue.trim().length > 0
  const secondaryCaptured = secondaryValue.trim().length > 0

  return (
    <div className="panel reviewer-notes-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Reviewer notes</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{[primaryCaptured, secondaryCaptured].filter(Boolean).length}/2 captured</span>
      </div>

      <div className="submission-command-grid">
        <div className="draft-card">
          <div className="submission-status-snapshot-row">
            <strong>{primaryLabel}</strong>
            <span className={`status ${primaryCaptured ? 'status-live' : 'status-planning'}`}>{primaryCaptured ? 'Captured' : 'Missing'}</span>
          </div>
          <div className="muted">Internal procurement reasoning, evaluation context, and decision support notes.</div>
        </div>
        <div className="draft-card">
          <div className="submission-status-snapshot-row">
            <strong>{secondaryLabel}</strong>
            <span className={`status ${secondaryCaptured ? 'status-live' : 'status-planning'}`}>{secondaryCaptured ? 'Captured' : 'Missing'}</span>
          </div>
          <div className="muted">Vendor-facing clarification or follow-up language that can be tracked separately from internal notes.</div>
        </div>
      </div>

      <div className="form-mock create-bid-form reviewer-notes-form">
        <FieldMock label={primaryLabel} value={primaryValue} multiline onChange={onPrimaryChange} />
        <FieldMock label={secondaryLabel} value={secondaryValue} multiline onChange={onSecondaryChange} />
        <button className="ghost wide">{actionLabel}</button>
      </div>
    </div>
  )
}
