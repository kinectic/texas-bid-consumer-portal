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
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="form-mock create-bid-form reviewer-notes-form">
        <FieldMock label={primaryLabel} value={primaryValue} multiline onChange={onPrimaryChange} />
        <FieldMock label={secondaryLabel} value={secondaryValue} multiline onChange={onSecondaryChange} />
        <button className="ghost wide">{actionLabel}</button>
      </div>
    </div>
  )
}
