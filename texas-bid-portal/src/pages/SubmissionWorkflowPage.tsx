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
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import type { BidDocument, SubmissionFormState } from '../types/forms'
import { buildSubmissionQueueRowMeta } from '../utils/submissionQueue'
import {
  presentVendorActiveSubmissionLabel,
  presentVendorDraftPersistenceDetail,
  presentVendorDraftPersistenceLabel,
  presentVendorFinalAction,
  presentVendorResponseRowMode,
  presentVendorSaveActionLabel,
  presentVendorSiblingRowItems,
  presentVendorSubmitActionLabel,
  presentVendorUnsavedDraftProgress,
  presentVendorWorkflowHeaderTitle,
  presentVendorWorkflowRecordLine,
} from '../utils/vendorPresentation'
import {
  lifecycleSummaryItems,
  submissionRequirementItems,
  submissionStageSummaryItems,
  submissionStatusItems,
  vendorWorkflowPackageCompletenessItems,
} from '../utils/vendorWorkflowContent'

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
  const responseRowLabel = presentVendorActiveSubmissionLabel(
    activeSubmission,
    activeSubmission ? rowMetaBySubmissionId[activeSubmission.id] : null,
  )
  const responseRowMode = presentVendorResponseRowMode(activeSubmission)
  const siblingRowItems = presentVendorSiblingRowItems({
    activeSubmission,
    siblingSubmissions,
    rowMetaBySubmissionId,
    draftSummary,
    onSelectSubmission,
    onStartNewSubmission,
  })
  const finalAction = presentVendorFinalAction({
    activeSubmission,
    responseRowLabel,
    opportunityTitle: opportunity.title,
  })

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Vendor workspace</div>
          <h1>{presentVendorWorkflowHeaderTitle(activeSubmission, responseRowLabel)}</h1>
          <p className="intro">
            A direct submission flow where Texas vendors can confirm fit, upload documents, answer requirements, and submit a bid response inside the platform.
          </p>
          <p className="muted">
            Active response record: {presentVendorWorkflowRecordLine(activeSubmission)}
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
          }}>{presentVendorSaveActionLabel(activeSubmission, responseRowLabel)}</button>
          <button className="primary" onClick={() => {
            onSubmitResponse()
            onNavigate('agency-submission-review')
          }}>{presentVendorSubmitActionLabel(activeSubmission, responseRowLabel)}</button>
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
        <WorkflowStageSummary title="Submission stage summary" items={[...submissionStageSummaryItems]} />

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
              label: presentVendorDraftPersistenceLabel(responseRowLabel),
              detail: presentVendorDraftPersistenceDetail(responseRowMode, draftSummary),
              progress: `${Math.round((draftSummary.attachedCount / Math.max(draftSummary.totalDocuments, 1)) * 100)}%`,
            },
            {
              label: 'Unsaved draft lane',
              detail: draftSummary.preservedUnsavedDraftLabel,
              progress: presentVendorUnsavedDraftProgress(draftSummary),
            },
            ...submissionStatusItems,
          ]}
        />
        <PackageCompletenessPanel title="Response completeness" items={[...vendorWorkflowPackageCompletenessItems]} />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleSummaryPanel title="Submission lifecycle summary" items={[...lifecycleSummaryItems]} />
        <FinalActionPanel
          eyebrow="Final step"
          title={finalAction.title}
          description="The last confirmation state before the vendor sends the completed response into agency review."
          note={finalAction.note}
          actionLabel={finalAction.actionLabel}
          onAction={() => {
            onSubmitResponse()
            onNavigate('agency-submission-review')
          }}
        />
      </section>
    </main>
  )
}
