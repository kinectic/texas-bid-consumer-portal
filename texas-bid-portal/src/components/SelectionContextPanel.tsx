import type { Opportunity, Submission } from '../types'

type DraftSummary = {
  formStatus: string
  attachedCount: number
  totalDocuments: number
  submissionStatus: string
}

type SelectionContextPanelProps = {
  title?: string
  currentOpportunity: Opportunity
  activeSubmission: Submission | null
  mode: 'vendor' | 'agency'
  draftSummary?: DraftSummary
}

export function SelectionContextPanel({
  title = 'Current selection context',
  currentOpportunity,
  activeSubmission,
  mode,
  draftSummary,
}: SelectionContextPanelProps) {
  return (
    <div className="panel selection-context-panel">
      <div className="panel-title">{title}</div>
      <div className="draft-list">
        <div className="draft-card">
          <strong>{currentOpportunity.title}</strong>
          <div className="muted">Opportunity ID: {currentOpportunity.id}</div>
          <div className="muted">Agency: {currentOpportunity.agency}</div>
          <div className="muted">Category: {currentOpportunity.category}</div>
        </div>
        <div className="draft-card">
          <strong>{mode === 'vendor' ? 'Vendor-side active submission' : 'Agency-side active submission'}</strong>
          <div className="muted">Status: {activeSubmission?.status ?? 'No linked submission yet'}</div>
          <div className="muted">Vendor: {activeSubmission?.vendor ?? 'No vendor record'}</div>
          <div className="muted">Selection linked: {activeSubmission?.opportunityId === currentOpportunity.id ? 'Yes' : 'No'}</div>
        </div>
        {draftSummary ? (
          <div className="draft-card">
            <strong>Draft persistence snapshot</strong>
            <div className="muted">Form state: {draftSummary.formStatus}</div>
            <div className="muted">Attachments: {draftSummary.attachedCount}/{draftSummary.totalDocuments} attached</div>
            <div className="muted">Submission record: {draftSummary.submissionStatus}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
