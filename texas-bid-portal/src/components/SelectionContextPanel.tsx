import type { Opportunity, Submission } from '../types'

type DraftSummary = {
  formStatus: string
  attachedCount: number
  totalDocuments: number
  submissionStatus: string
  bufferLabel: string
  preservedUnsavedDraftLabel: string
}

type SelectionContextPanelProps = {
  title?: string
  currentOpportunity: Opportunity
  activeSubmission: Submission | null
  mode: 'vendor' | 'agency'
  draftSummary?: DraftSummary
  responseRowCount?: number
  activeRowLabel?: string
}

export function SelectionContextPanel({
  title = 'Current selection context',
  currentOpportunity,
  activeSubmission,
  mode,
  draftSummary,
  responseRowCount,
  activeRowLabel,
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
          {activeRowLabel ? <div className="muted">Active row: {activeRowLabel}</div> : null}
          {typeof responseRowCount === 'number' ? <div className="muted">Response rows for opportunity: {responseRowCount}</div> : null}
          <div className="muted">Selection linked: {activeSubmission?.opportunityId === currentOpportunity.id ? 'Yes' : 'No'}</div>
        </div>
        {draftSummary ? (
          <div className="draft-card">
            <strong>Draft persistence snapshot</strong>
            <div className="muted">Buffer: {draftSummary.bufferLabel}</div>
            <div className="muted">Form state: {draftSummary.formStatus}</div>
            <div className="muted">Attachments: {draftSummary.attachedCount}/{draftSummary.totalDocuments} attached</div>
            <div className="muted">Submission record: {draftSummary.submissionStatus}</div>
            <div className="muted">Unsaved draft lane: {draftSummary.preservedUnsavedDraftLabel}</div>
            <div className="dashboard-note compact-note">
              {draftSummary.preservedUnsavedDraftLabel.startsWith('Preserved')
                ? 'A separate unsaved draft lane exists for this opportunity and can be restored without overwriting the selected saved row.'
                : 'No preserved unsaved draft is waiting behind the selected saved row.'}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
