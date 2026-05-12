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
  const linkedSelection = activeSubmission?.opportunityId === currentOpportunity.id

  return (
    <div className="panel selection-context-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Selection context</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className={`status ${linkedSelection ? 'status-live' : 'status-review'}`}>{linkedSelection ? 'Linked' : 'Check link'}</span>
      </div>
      <div className="selection-context-grid">
        <div className="draft-card">
          <strong>{currentOpportunity.title}</strong>
          <div className="muted">Job ID: {currentOpportunity.id}</div>
          <div className="muted">Customer record: {currentOpportunity.agency}</div>
          <div className="muted">County: {currentOpportunity.county ?? 'Texas statewide'}</div>
          <div className="muted">City: {currentOpportunity.city ?? currentOpportunity.location}</div>
          <div className="muted">Category: {currentOpportunity.category}</div>
        </div>
        <div className="draft-card">
          <strong>{mode === 'vendor' ? 'Customer-side active contractor bid' : 'Agency-side active submission'}</strong>
          <div className="muted">Status: {activeSubmission?.status ?? 'No linked bid yet'}</div>
          <div className="muted">Contractor: {activeSubmission?.vendor ?? 'No contractor record'}</div>
          {activeRowLabel ? <div className="muted">Active bid lane: {activeRowLabel}</div> : null}
          {typeof responseRowCount === 'number' ? <div className="muted">Bid rows for job: {responseRowCount}</div> : null}
          <div className="muted">Selection linked: {linkedSelection ? 'Yes' : 'No'}</div>
          <div className="dashboard-note compact-note">
            {mode === 'vendor'
              ? 'Customer-side context shows the posted job plus the selected contractor bid state. Internal platform/admin processing stays out of view.'
              : 'Agency-side context ties internal review activity to the selected solicitation and submission queue.'}
          </div>
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
