import { FieldMock } from './FieldMock'
import type { Opportunity, Submission } from '../types'
import type { BidDocument, SubmissionFormState } from '../types/forms'

type SharedResponseBuilderPanelProps = {
  formState: SubmissionFormState
  onChange: (field: keyof SubmissionFormState, value: string) => void
  documents: BidDocument[]
  draftSummary: {
    formStatus: string
    attachedCount: number
    totalDocuments: number
    submissionStatus: string
    bufferLabel: string
    preservedUnsavedDraftLabel: string
  }
  opportunity: Opportunity
  activeSubmission: Submission | null
  onSaveProgress: () => void
  onSubmitResponse: () => void
}

function summarizeField(value: string) {
  return value.trim().length > 0 ? 'Captured' : 'Missing'
}

function summarizeFormCompletion(formState: SubmissionFormState) {
  const fields = [formState.signer, formState.pricing, formState.timeline, formState.narrative, formState.exceptions]
  const completedFields = fields.filter((value) => value.trim().length > 0).length
  const totalFields = fields.length
  const percent = Math.round((completedFields / totalFields) * 100)

  return {
    completedFields,
    totalFields,
    percent,
  }
}

function summarizeAttachments(documents: BidDocument[], attachedCount: number, totalDocuments: number) {
  const pendingDocuments = documents
    .filter((document) => document.status.toLowerCase().includes('pending'))
    .map((document) => document.name)

  if (pendingDocuments.length === 0) {
    return `${attachedCount}/${Math.max(totalDocuments, 1)} attachments ready`
  }

  return `${pendingDocuments.join(', ')} still pending`
}

export function SharedResponseBuilderPanel({
  formState,
  onChange,
  documents,
  draftSummary,
  opportunity,
  activeSubmission,
  onSaveProgress,
  onSubmitResponse,
}: SharedResponseBuilderPanelProps) {
  const formCompletion = summarizeFormCompletion(formState)
  const pendingDocuments = documents.filter((document) => document.status.toLowerCase().includes('pending'))

  const fieldSummaryItems = [
    { label: 'Signer', status: summarizeField(formState.signer), detail: formState.signer || 'No authorized signer captured yet.' },
    { label: 'Pricing', status: summarizeField(formState.pricing), detail: formState.pricing || 'Pricing total still needs entry.' },
    { label: 'Timeline', status: summarizeField(formState.timeline), detail: formState.timeline || 'Service timeline still needs entry.' },
    { label: 'Narrative', status: summarizeField(formState.narrative), detail: formState.narrative || 'Response narrative still needs support.' },
  ]

  const readinessItems = [
    {
      label: 'Response row',
      detail: activeSubmission ? `${activeSubmission.id} is the active draft row.` : 'Working in the unsaved response lane.',
    },
    {
      label: 'Attachment packet',
      detail: summarizeAttachments(documents, draftSummary.attachedCount, draftSummary.totalDocuments),
    },
    {
      label: 'Agency context',
      detail: `${opportunity.agency} will receive this packet for ${opportunity.title}.`,
    },
  ]

  return (
    <div className="panel shared-response-builder-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Shared response builder</div>
          <div className="panel-title">Response workspace</div>
          <p className="muted response-builder-intro">
            One reusable builder layer for the vendor draft, readiness state, and final packet controls.
          </p>
        </div>
        <span className="status status-review">{draftSummary.formStatus}</span>
      </div>

      <div className="response-builder-progress-grid">
        <div className="draft-card response-builder-progress-card">
          <div className="submission-status-snapshot-row">
            <strong>Form completion</strong>
            <span className="muted">{formCompletion.percent}%</span>
          </div>
          <div className="muted">{formCompletion.completedFields} of {formCompletion.totalFields} response fields are captured for this draft.</div>
        </div>
        <div className="draft-card response-builder-progress-card">
          <div className="submission-status-snapshot-row">
            <strong>Attachments ready</strong>
            <span className="muted">{draftSummary.attachedCount}/{Math.max(draftSummary.totalDocuments, 1)}</span>
          </div>
          <div className="muted">{pendingDocuments.length === 0 ? 'Packet is attachment-complete for submission.' : `${pendingDocuments.length} required documents still need upload.`}</div>
        </div>
        <div className="draft-card response-builder-progress-card">
          <div className="submission-status-snapshot-row">
            <strong>Submission state</strong>
            <span className="muted">{draftSummary.submissionStatus}</span>
          </div>
          <div className="muted">{activeSubmission ? `${activeSubmission.id} is the saved response row driving this packet.` : 'This packet is still in the unsaved draft lane.'}</div>
        </div>
      </div>

      <div className="response-builder-grid">
        <div className="form-mock create-bid-form">
          <FieldMock label="Company contact and authorized signer" value={formState.signer} onChange={(value) => onChange('signer', value)} />
          <div className="input-row">
            <FieldMock label="Pricing total" value={formState.pricing} onChange={(value) => onChange('pricing', value)} />
            <FieldMock label="Delivery / service timeline" value={formState.timeline} onChange={(value) => onChange('timeline', value)} />
          </div>
          <FieldMock label="Response narrative" value={formState.narrative} multiline onChange={(value) => onChange('narrative', value)} />
          <FieldMock label="Exceptions, qualifications, or clarifications" value={formState.exceptions} multiline onChange={(value) => onChange('exceptions', value)} />
        </div>

        <div className="response-builder-sidecar">
          <div className="response-builder-summary-list">
            {fieldSummaryItems.map((item) => (
              <div className="draft-card" key={item.label}>
                <div className="submission-status-snapshot-row">
                  <strong>{item.label}</strong>
                  <span className="muted">{item.status}</span>
                </div>
                <div className="muted">{item.detail}</div>
              </div>
            ))}
          </div>

          <div className="dashboard-note compact-note response-builder-buffer-note">
            {draftSummary.preservedUnsavedDraftLabel} Buffer: {draftSummary.bufferLabel}.
          </div>
        </div>
      </div>

      <div className="response-builder-readiness-grid">
        <div className="response-builder-readiness-list">
          {readinessItems.map((item) => (
            <div className="draft-card" key={item.label}>
              <strong>{item.label}</strong>
              <div className="muted">{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="draft-card response-builder-checkpoint-card">
          <strong>Pre-submit checkpoint</strong>
          <div className="response-builder-checkpoint-list">
            <div className="muted">• Signer and pricing should match the final quoted response.</div>
            <div className="muted">• Narrative should explain fit, delivery confidence, and Texas-local relevance.</div>
            <div className="muted">• Exceptions should stay explicit so the agency review lane sees clarifications immediately.</div>
            <div className="muted">• Attachments should be complete before submitting to agency review.</div>
          </div>
        </div>
      </div>

      <div className="response-builder-actions">
        <button className="ghost" onClick={onSaveProgress}>Save response progress</button>
        <button className="primary" onClick={onSubmitResponse}>Submit packet to agency review</button>
      </div>
    </div>
  )
}
