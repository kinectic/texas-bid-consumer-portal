import { FieldMock } from '../components/FieldMock'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { LifecycleSummaryPanel } from '../components/LifecycleSummaryPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityRequirementsPanel } from '../components/OpportunityRequirementsPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PackageCompletenessPanel } from '../components/PackageCompletenessPanel'
import { SectionIntro } from '../components/SectionIntro'
import { SubmissionAttachmentsPanel } from '../components/SubmissionAttachmentsPanel'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { SubmissionStatusSnapshot } from '../components/SubmissionStatusSnapshot'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { WorkflowStageSummary } from '../components/WorkflowStageSummary'
import { submissionStatusSummary } from '../data/submissionStatus'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import type { BidDocument, SubmissionFormState } from '../types/forms'
import { buildSubmissionQueueRowMeta } from '../utils/submissionQueue'

const submissionStageSummaryItems = [
  {
    stage: 'Qualification',
    owner: 'Vendor',
    detail: 'Confirm fit, urgency, and document readiness before spending effort on the packet.',
  },
  {
    stage: 'Response assembly',
    owner: 'Vendor',
    detail: 'Prepare signer details, pricing, narrative support, and all required attachments.',
  },
  {
    stage: 'Agency review',
    owner: 'Agency',
    detail: 'Submission moves into completeness checks, clarification handling, and shortlist decisions.',
  },
]

const submissionStatusItems = [
  submissionStatusSummary.draft,
  submissionStatusSummary.received,
  submissionStatusSummary.reviewing,
  submissionStatusSummary.shortlisted,
]

const packageCompletenessItems = [
  {
    title: 'Pricing response',
    detail: 'In progress and ready for final vendor confirmation',
  },
  {
    title: 'Compliance packet',
    detail: 'Required attachments are ready to upload before submission',
  },
  {
    title: 'Signer confirmation',
    detail: 'Authorized signer is captured in the response form',
  },
]

const lifecycleSummaryItems = [
  {
    stage: '1. Review opportunity fit',
    detail: 'Confirm the bid matches capability, timing, and submission requirements.',
  },
  {
    stage: '2. Assemble response packet',
    detail: 'Prepare pricing, attachments, signer details, and response narrative.',
  },
  {
    stage: '3. Submit into agency review',
    detail: 'Send the final packet directly through the Texas-first portal workflow.',
  },
]

const submissionRequirementItems = [
  'Confirm the bid matches capability, timing, and submission requirements',
  'Prepare pricing total, timeline, and response narrative',
  'Upload required attachments and compliance materials',
  'Validate signer details and final packet completeness',
  'Submit directly into agency review',
] as const

type SubmissionWorkflowPageProps = {
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
  onUploadNextDocument: () => void
  opportunity: Opportunity
  siblingSubmissions: Submission[]
  activeSubmission: Submission | null
  onSelectSubmission: (submission: Submission) => void
  onStartNewSubmission: () => void
  onSaveProgress: () => void
  onSubmitResponse: () => void
  onNavigate: (view: ViewKey) => void
}

export function SubmissionWorkflowPage({
  formState,
  onChange,
  documents,
  draftSummary,
  onUploadNextDocument,
  opportunity,
  siblingSubmissions,
  activeSubmission,
  onSelectSubmission,
  onStartNewSubmission,
  onSaveProgress,
  onSubmitResponse,
  onNavigate,
}: SubmissionWorkflowPageProps) {
  const rowMetaBySubmissionId = buildSubmissionQueueRowMeta({
    submissions: siblingSubmissions,
    selectedSubmissionId: activeSubmission?.id,
    mode: 'vendor',
  })
  const responseRowLabel = activeSubmission
    ? rowMetaBySubmissionId[activeSubmission.id]?.activeLabel ?? activeSubmission.id
    : 'new unsaved response'
  const responseRowMode = activeSubmission ? 'editing existing saved row' : 'drafting a brand-new unsaved row'
  const unsavedDraftHasEdits = draftSummary.formStatus !== 'Untouched default draft' || draftSummary.attachedCount > 0
  const siblingRowItems = [
    ...(!activeSubmission
      ? [{
          stage: 'New unsaved response',
          detail: `Current draft is not saved as a submission row yet. ${unsavedDraftHasEdits ? 'Unsaved draft edits are preserved for this opportunity.' : 'No draft edits yet; save or submit to create the next response row.'} • active row`,
          active: true,
        }]
      : [{
          stage: `Start response ${siblingSubmissions.length + 1}`,
          detail: unsavedDraftHasEdits
            ? `Return to the preserved unsaved draft for this opportunity. ${draftSummary.formStatus} • ${draftSummary.attachedCount}/${draftSummary.totalDocuments} attachments ready.`
            : 'Jump back into a fresh unsaved draft without leaving the workflow. Creates a brand-new response row after save or submit.',
          onClick: onStartNewSubmission,
          active: false,
        }]),
    ...siblingSubmissions.map((submission) => ({
      stage: rowMetaBySubmissionId[submission.id]?.rowLabel ?? submission.id,
      detail: `${submission.vendor} • ${submission.id} • ${submission.status}${submission.id === activeSubmission?.id ? ' • active row' : ''}`,
      onClick: () => onSelectSubmission(submission),
      active: submission.id === activeSubmission?.id,
    })),
  ]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Vendor workspace</div>
          <h1>{activeSubmission ? `Submission workflow — ${responseRowLabel}` : 'Submission workflow — new response'}</h1>
          <p className="intro">
            A direct submission flow where Texas vendors can confirm fit, upload documents, answer requirements, and submit a bid response inside the platform.
          </p>
          <p className="muted">
            Active response record: {activeSubmission ? `${activeSubmission.vendor} · ${activeSubmission.id}` : 'new unsaved response'}
          </p>
          <p className="muted">
            Mode: {responseRowMode}
          </p>
          <p className="muted">
            Buffer: {draftSummary.bufferLabel}
          </p>
          <p className="muted">
            Unsaved draft lane: {draftSummary.preservedUnsavedDraftLabel}
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => {
            onSaveProgress()
            onNavigate('vendor-dashboard')
          }}>{activeSubmission ? `Save ${responseRowLabel}` : 'Save new response draft'}</button>
          <button className="primary" onClick={() => {
            onSubmitResponse()
            onNavigate('agency-submission-review')
          }}>{activeSubmission?.status === 'received' ? `Update ${responseRowLabel}` : activeSubmission ? `Submit ${responseRowLabel}` : 'Submit new response'}</button>
        </div>
      </header>

      <section className="content-grid">
        <OpportunitySummaryPanel
          title="Opportunity summary"
          subtitle="The live opportunity context that stays visible while the vendor assembles the response packet."
          summary={opportunity.summary}
        />

        <OpportunityMetadataPanel opportunity={opportunity} title="Submission metadata" />
      </section>

      <section className="content-grid lower-grid">
        <WorkflowStageSummary title="Submission stage summary" items={submissionStageSummaryItems} />

        <VendorSubmissionPacketPanel />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleSummaryPanel
          title="Other response rows for this opportunity"
          items={siblingRowItems.length > 0 ? siblingRowItems : [{ stage: 'No saved rows yet', detail: 'Starting from a fresh unsaved vendor response for this opportunity.' }]}
        />
      </section>

      <section className="content-grid lower-grid">
        <OpportunityRequirementsPanel title="Response requirements" items={submissionRequirementItems} />

        <SubmissionAttachmentsPanel
          title="Required attachments"
          description="The packet components the vendor must gather and upload before final submission."
          documents={documents}
          actionLabel="Upload next pending attachment"
          onAction={onUploadNextDocument}
        />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <SectionIntro
            eyebrow="Vendor drafting"
            title="Response builder"
            description="The editable vendor response form covering signer details, pricing, timing, and narrative support."
          />
          <div className="form-mock create-bid-form">
            <FieldMock label="Company contact and authorized signer" value={formState.signer} onChange={(value) => onChange('signer', value)} />
            <div className="input-row">
              <FieldMock label="Pricing total" value={formState.pricing} onChange={(value) => onChange('pricing', value)} />
              <FieldMock label="Delivery / service timeline" value={formState.timeline} onChange={(value) => onChange('timeline', value)} />
            </div>
            <FieldMock label="Response narrative" value={formState.narrative} multiline onChange={(value) => onChange('narrative', value)} />
            <FieldMock label="Exceptions, qualifications, or clarifications" value={formState.exceptions} multiline onChange={(value) => onChange('exceptions', value)} />
          </div>
        </div>

        <SubmissionChecklistPanel title="Pre-submit checklist" contextLabel={opportunity.title} />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionStatusSnapshot
          items={[
            {
              label: `Draft persistence — ${responseRowLabel}`,
              detail: `${responseRowMode} • ${draftSummary.bufferLabel} • ${draftSummary.formStatus} • ${draftSummary.attachedCount}/${draftSummary.totalDocuments} attachments ready • ${draftSummary.submissionStatus}`,
              progress: `${Math.round((draftSummary.attachedCount / Math.max(draftSummary.totalDocuments, 1)) * 100)}%`,
            },
            {
              label: 'Unsaved draft lane',
              detail: draftSummary.preservedUnsavedDraftLabel,
              progress: draftSummary.preservedUnsavedDraftLabel.startsWith('Preserved') ? '60%' : '0%',
            },
            ...submissionStatusItems,
          ]}
        />
        <PackageCompletenessPanel title="Response completeness" items={packageCompletenessItems} />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleSummaryPanel title="Submission lifecycle summary" items={lifecycleSummaryItems} />
        <FinalActionPanel
          eyebrow="Final step"
          title={`Submission confirmation — ${responseRowLabel}`}
          description="The last confirmation state before the vendor sends the completed response into agency review."
          note={`This is the core V1 workflow: vendors should be able to move from ${opportunity.title} discovery to actual response submission without leaving the Texas-first portal. Current record: ${activeSubmission ? `${activeSubmission.id} (${activeSubmission.status})` : 'brand-new unsaved row'}.`}
          actionLabel={activeSubmission?.status === 'received' ? `Update final submit for ${responseRowLabel}` : activeSubmission ? `Final submit ${responseRowLabel}` : 'Final submit new response'}
          onAction={() => {
            onSubmitResponse()
            onNavigate('agency-submission-review')
          }}
        />
      </section>
    </main>
  )
}
