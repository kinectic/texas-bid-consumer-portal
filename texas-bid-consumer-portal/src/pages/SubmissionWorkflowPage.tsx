import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { LifecycleSummaryPanel } from '../components/LifecycleSummaryPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityRequirementsPanel } from '../components/OpportunityRequirementsPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PackageCompletenessPanel } from '../components/PackageCompletenessPanel'
import { SharedResponseBuilderPanel } from '../components/SharedResponseBuilderPanel'
import { ShortlistDecisionPanel } from '../components/ShortlistDecisionPanel'
import { SelectedContractorRecommendationPanel } from '../components/SelectedContractorRecommendationPanel'
import { SubmissionAttachmentsPanel } from '../components/SubmissionAttachmentsPanel'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { TrustCarryoverPanel } from '../components/TrustCarryoverPanel'
import { SubmissionPacketReadinessPanel } from '../components/SubmissionPacketReadinessPanel'
import { SubmissionRowWorkspacePanel } from '../components/SubmissionRowWorkspacePanel'
import { SubmissionStatusCommandBar } from '../components/SubmissionStatusCommandBar'
import { SubmissionStatusSnapshot } from '../components/SubmissionStatusSnapshot'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { WorkflowStageSummary } from '../components/WorkflowStageSummary'
import { ContractorScorecardPanel } from '../components/ContractorScorecardPanel'
import { ReasonsToChoosePanel } from '../components/ReasonsToChoosePanel'
import { ShortlistActionRail } from '../components/ShortlistActionRail'
import { HireConfirmationPreviewPanel } from '../components/HireConfirmationPreviewPanel'
import { PostSelectionNextStepsPanel } from '../components/PostSelectionNextStepsPanel'
import { ContractorTrustDetailPanel } from '../components/ContractorTrustDetailPanel'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import type { BidDocument, SubmissionFormState } from '../types/forms'
import {
  buildSubmissionQueueRowMeta,
  lifecycleSummaryItems,
  presentVendorActiveSubmissionLabel,
  presentVendorDraftPersistenceDetail,
  presentVendorDraftPersistenceLabel,
  presentVendorFinalAction,
  presentVendorResponseRowMode,
  presentVendorSaveActionLabel,
  presentVendorSiblingRowItems,
  presentVendorUnsavedDraftProgress,
  presentVendorWorkflowHeaderTitle,
  presentVendorWorkflowRecordLine,
  submissionRequirementItems,
  submissionStageSummaryItems,
  submissionStatusItems,
  vendorWorkflowCopy,
  vendorWorkflowPackageCompletenessItems,
} from '../utils/vendorLane'

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
  const decisionConfidencePoints = [
    'Keep the active response record obvious so the customer does not lose track of which contractor bid is being reviewed.',
    'Make attachment completeness and form readiness visible before the user commits to submit.',
    'Route the user into the message thread only after the review action is clear and intentional.',
  ]
  const comparisonLaunchPoints = [
    'The comparison workspace is the real moment where the customer gets comfortable choosing.',
    'Trust, reasons to choose, and readiness should all reinforce the same recommended contractor story.',
    'Message follow-up should support the decision, not derail the user away from the shortlist and hire flow.',
  ]
  const finalDecisionSteps = [
    'Keep the selected contractor and active bid record visually obvious throughout the page.',
    'Use trust, shortlist, and packet-readiness surfaces to reinforce one confident recommendation.',
    'Treat messages as support for the decision, then bring the user back to finalize the hire path fast.',
  ]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">{vendorWorkflowCopy.workspaceEyebrow}</div>
          <h1>{presentVendorWorkflowHeaderTitle(activeSubmission, responseRowLabel)}</h1>
          <p className="intro">{vendorWorkflowCopy.intro}</p>
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
            onNavigate('messages')
          }}>Advance recommended contractor</button>
        </div>
      </header>

      <DemoNarrativeCommandBar activeView="submission-workflow" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <OpportunitySummaryPanel
          title={vendorWorkflowCopy.opportunitySummaryTitle}
          subtitle={vendorWorkflowCopy.opportunitySummarySubtitle}
          summary={opportunity.summary}
        />

        <OpportunityMetadataPanel opportunity={opportunity} title={vendorWorkflowCopy.metadataTitle} />
      </section>

      <PrimaryActionStrip
        title="Customer bid decision lane"
        description={`Keep this review surface focused on one outcome: compare the active bid record${activeSubmission ? ` (${activeSubmission.id})` : ''}, confirm packet strength, narrow the shortlist, and move cleanly toward a hiring decision.`}
        actions={
          <>
            <button className="primary" onClick={onSubmitResponse}>Advance recommended contractor</button>
            <button className="ghost" onClick={onSaveProgress}>Save comparison progress</button>
            <button className="ghost" onClick={() => onNavigate('messages')}>Open job messages</button>
          </>
        }
      />

      <ShortlistActionRail activeSubmission={activeSubmission} />

      <div className="workflow-actions">
        <div className="panel-header">
          <div>
            <div className="eyebrow">Decision handoff</div>
            <div className="panel-title">Carry the same contractor story into the final choice</div>
          </div>
          <span className="status status-review">Final comparison</span>
        </div>
        <p className="action-strip-copy">
          The review workspace is the natural continuation of the job-match screen: same contractor context, same trust signal, and one clear move toward hire.
        </p>
        <p className="action-strip-copy">
          If a message thread is still blocking selection, this screen should send the user out to resolve that thread fast, then bring them straight back into the shortlist and hire decision.
        </p>
        <div className="draft-list" style={{ marginTop: '0.85rem' }}>
          {finalDecisionSteps.map((step) => (
            <div key={step} className="draft-card">
              <strong>{step}</strong>
              <div className="muted">This screen is the end of the hiring lane, not another workspace detour.</div>
            </div>
          ))}
        </div>
      </div>

      <section className="content-grid lower-grid">
        <WorkflowStageSummary title={vendorWorkflowCopy.stageSummaryTitle} items={[...submissionStageSummaryItems]} />

        <ShortlistDecisionPanel submissions={siblingSubmissions} activeSubmission={activeSubmission} />

        <ContractorScorecardPanel activeSubmission={activeSubmission} />

        <ContractorTrustDetailPanel activeSubmission={activeSubmission} />

        <ReasonsToChoosePanel activeSubmission={activeSubmission} />

        <TrustCarryoverPanel activeVendor={activeSubmission?.vendor ?? null} />

        <div className="panel">
          <div className="panel-title">Decision confidence</div>
          <div className="draft-list">
            {decisionConfidencePoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This review surface should help the customer feel ready to choose, not just fill fields.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <VendorSubmissionPacketPanel />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionRowWorkspacePanel
          activeSubmission={activeSubmission}
          siblingSubmissions={siblingSubmissions}
          formState={formState}
          draftSummary={draftSummary}
          onSelectSubmission={onSelectSubmission}
          onStartNewSubmission={onStartNewSubmission}
        />

        <LifecycleSummaryPanel
          title={vendorWorkflowCopy.siblingRowsTitle}
          items={siblingRowItems.length > 0 ? siblingRowItems : [{ stage: 'No saved rows yet', detail: vendorWorkflowCopy.emptySiblingRowsDetail }]}
        />
      </section>

      <section className="content-grid lower-grid">
        <OpportunityRequirementsPanel title={vendorWorkflowCopy.requirementsTitle} items={submissionRequirementItems} />

        <SubmissionAttachmentsPanel
          title={vendorWorkflowCopy.attachmentsTitle}
          description={vendorWorkflowCopy.attachmentsDescription}
          documents={documents}
          actionLabel="Upload next pending attachment"
          onAction={onUploadNextDocument}
        />
      </section>

      <section className="content-grid lower-grid">
        <SharedResponseBuilderPanel
          formState={formState}
          onChange={onChange}
          documents={documents}
          draftSummary={draftSummary}
          opportunity={opportunity}
          activeSubmission={activeSubmission}
          onSaveProgress={onSaveProgress}
          onSubmitResponse={onSubmitResponse}
        />

        <SubmissionChecklistPanel title={vendorWorkflowCopy.checklistTitle} contextLabel={opportunity.title} />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionStatusCommandBar
          activeSubmission={activeSubmission}
          attachedCount={draftSummary.attachedCount}
          totalDocuments={draftSummary.totalDocuments}
          formStatus={draftSummary.formStatus}
          submissionStatus={draftSummary.submissionStatus}
          onSaveProgress={onSaveProgress}
          onSubmitResponse={onSubmitResponse}
        />

        <SubmissionStatusSnapshot
          items={[
            {
              label: presentVendorDraftPersistenceLabel(responseRowLabel),
              detail: presentVendorDraftPersistenceDetail(responseRowMode, draftSummary),
              progress: `${Math.round((draftSummary.attachedCount / Math.max(draftSummary.totalDocuments, 1)) * 100)}%`,
            },
            {
              label: vendorWorkflowCopy.unsavedDraftLabel,
              detail: draftSummary.preservedUnsavedDraftLabel,
              progress: presentVendorUnsavedDraftProgress(draftSummary),
            },
            ...submissionStatusItems,
          ]}
        />
        <SubmissionPacketReadinessPanel formState={formState} documents={documents} />
        <PackageCompletenessPanel title={vendorWorkflowCopy.completenessTitle} items={[...vendorWorkflowPackageCompletenessItems]} />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Comparison launch quality</div>
          <h2>Make the final review feel decisive</h2>
          <div className="draft-list">
            {comparisonLaunchPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">The comparison screen needs to feel confident and conversion-oriented, not tentative.</div>
              </div>
            ))}
          </div>
        </div>
        <LifecycleSummaryPanel title={vendorWorkflowCopy.lifecycleTitle} items={[...lifecycleSummaryItems]} />
        <SelectedContractorRecommendationPanel submissions={siblingSubmissions} activeSubmission={activeSubmission} />
        <HireConfirmationPreviewPanel activeSubmission={activeSubmission} />
        <PostSelectionNextStepsPanel activeSubmission={activeSubmission} />
        <FinalActionPanel
          eyebrow={vendorWorkflowCopy.finalEyebrow}
          title="Close comparison and move toward contractor selection"
          description="The last state on this page acts as a hiring decision checkpoint: confirm the recommended contractor, keep message follow-up available, and move toward choosing without lingering in draft mode."
          note={finalAction.note}
          actionLabel="Advance recommended contractor"
          onAction={() => {
            onSubmitResponse()
            onNavigate('messages')
          }}
        />
      </section>
    </main>
  )
}
