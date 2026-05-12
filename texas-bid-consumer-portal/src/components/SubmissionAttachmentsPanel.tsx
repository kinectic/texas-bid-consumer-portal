import type { BidDocument } from '../types/forms'

type SubmissionAttachmentsPanelProps = {
  title?: string
  description?: string
  documents: BidDocument[]
  actionLabel: string
  onAction?: () => void
}

export function SubmissionAttachmentsPanel({
  title = 'Attachments',
  description,
  documents,
  actionLabel,
  onAction,
}: SubmissionAttachmentsPanelProps) {
  return (
    <div className="panel submission-attachments-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Attachment packet</div>
          <div className="panel-title">{title}</div>
          {description ? <div className="panel-subtitle attachments-panel-copy">{description}</div> : null}
        </div>
        <span className="status status-review">{documents.length} files</span>
      </div>
      <div className="draft-list">
        {documents.map((document) => (
          <div className="draft-card" key={document.name}>
            <strong>{document.name}</strong>
            <div className="muted">{document.status}</div>
          </div>
        ))}
      </div>
      <button className="ghost wide" onClick={onAction}>{actionLabel}</button>
    </div>
  )
}
