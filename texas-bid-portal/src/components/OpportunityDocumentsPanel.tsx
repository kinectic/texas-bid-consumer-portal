import type { BidDocument } from '../types/forms'

type OpportunityDocumentsPanelProps = {
  documents: BidDocument[]
  title?: string
}

export function OpportunityDocumentsPanel({ documents, title = 'Documents' }: OpportunityDocumentsPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="doc-list">
        {documents.map((document) => (
          <div className="doc-item" key={document.name}>
            <span>{document.name}</span>
            <button className="linkish">{document.status}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
