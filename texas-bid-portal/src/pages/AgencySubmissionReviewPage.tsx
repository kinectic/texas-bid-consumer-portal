import { ActionHeader } from '../components/ActionHeader'
import { DecisionControlsPanel } from '../components/DecisionControlsPanel'
import { MetricCard } from '../components/MetricCard'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PackageCompletenessPanel } from '../components/PackageCompletenessPanel'
import { ReviewerNotesPanel } from '../components/ReviewerNotesPanel'
import { SelectionContextPanel } from '../components/SelectionContextPanel'
import { StatusBadgeLegend } from '../components/StatusBadgeLegend'
import { StatusProgressionPanel } from '../components/StatusProgressionPanel'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { SubmissionQueueList } from '../components/SubmissionQueueList'
import { opportunities } from '../data/mockData'
import { submissionLifecycle } from '../data/submissionStatus'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import type { ReviewNotesState } from '../types/forms'
import { buildSubmissionQueueRowMeta } from '../utils/submissionQueue'
import { agencyReviewCopy } from '../utils/agencyContent'
import {
  presentAgencyActiveSubmissionLabel,
  presentAgencyChecklistContext,
  presentAgencyDecisionControls,
  presentAgencyDecisionDescription,
  presentAgencyOutcomeSummary,
  presentAgencyPackageTitle,
  presentAgencyReviewerLabels,
} from '../utils/reviewPresentation'

type AgencySubmissionReviewPageProps = {
  currentOpportunity: Opportunity
  selectedSubmissionId: string | null
  draftSummary: {
    formStatus: string
    attachedCount: number
    totalDocuments: number
    submissionStatus: string
    bufferLabel: string
    preservedUnsavedDraftLabel: string
  }
  reviewNotes: ReviewNotesState
  onChange: (field: keyof ReviewNotesState, value: string) => void
  packageCompletenessItems: Array<{ title: string; detail: string }>
  submissions: Submission[]
  queueFilter: 'current' | 'all'
  onQueueFilterChange: (filter: 'current' | 'all') => void
  onSelectOpportunity: (opportunity: Opportunity) => void
  onSelectSubmission: (submission: Submission) => void
  onAdvanceStatus: (status: Submission['status']) => void
  onArchiveSubmission: () => void
  onNavigate: (view: ViewKey) => void
}

export function AgencySubmissionReviewPage({
  currentOpportunity,
  selectedSubmissionId,
  draftSummary,
  reviewNotes,
  onChange,
  packageCompletenessItems,
  submissions,
  queueFilter,
  onQueueFilterChange,
  onSelectOpportunity,
  onSelectSubmission,
  onAdvanceStatus,
  onArchiveSubmission,
  onNavigate,
}: AgencySubmissionReviewPageProps) {
  const visibleSubmissions = submissions.filter((submission) => submission.status !== 'draft')
  const currentOpportunitySubmissions = visibleSubmissions.filter((submission) => submission.opportunityId === currentOpportunity.id)
  const displayedSubmissions = queueFilter === 'current' ? currentOpportunitySubmissions : visibleSubmissions
  const activeSubmission = submissions.find((submission) => submission.id === selectedSubmissionId)
    ?? submissions.find((submission) => submission.opportunityId === currentOpportunity.id)
    ?? null
  const rowMetaBySubmissionId = buildSubmissionQueueRowMeta({
    submissions: currentOpportunitySubmissions,
    selectedSubmissionId: selectedSubmissionId ?? undefined,
    mode: 'agency',
  })
  const activeRowMeta = activeSubmission ? rowMetaBySubmissionId[activeSubmission.id] : null
  const activeSubmissionLabel = presentAgencyActiveSubmissionLabel(activeSubmission, activeRowMeta)
  const activeOutcomeSummary = presentAgencyOutcomeSummary({
    activeSubmission,
    currentOpportunityTitle: currentOpportunity.title,
    activeRowMeta,
    bufferReadiness: {
      label: draftSummary.bufferLabel,
      detail: draftSummary.preservedUnsavedDraftLabel,
    },
  })
  const decisionControls = presentAgencyDecisionControls(activeSubmission).map((control) => ({
    ...control,
    onClick:
      control.label.startsWith('Shortlist')
        ? () => onAdvanceStatus('shortlisted')
        : control.label.startsWith('Request clarification')
          ? () => onAdvanceStatus('reviewing')
          : control.label.startsWith('Flag')
            ? () => onAdvanceStatus('received')
            : onArchiveSubmission,
  }))
  const selectOpportunityFromSubmission = (submission: Submission) => {
    const matchingOpportunity = opportunities.find((opportunity) => opportunity.id === submission.opportunityId)
    if (matchingOpportunity) {
      onSelectSubmission(submission)
      onSelectOpportunity(matchingOpportunity)
      onQueueFilterChange('current')
      onNavigate('agency-submission-review')
    }
  }
  const reviewerLabels = presentAgencyReviewerLabels(activeSubmission)

  return (
    <main className="main">
      <ActionHeader
        eyebrow={agencyReviewCopy.workspaceEyebrow}
        title={agencyReviewCopy.title}
        intro={agencyReviewCopy.intro}
        actions={
          <>
            <button className="ghost" onClick={() => onNavigate('agency-dashboard')}>{agencyReviewCopy.exportResponsesLabel}</button>
            <button className="primary" onClick={() => onNavigate('vendor-dashboard')}>{agencyReviewCopy.advanceShortlistLabel}</button>
          </>
        }
      />

      <section className="stats-grid">
        <MetricCard value={currentOpportunitySubmissions.length} label={agencyReviewCopy.currentResponsesLabel} />
        <MetricCard value={visibleSubmissions.length} label={agencyReviewCopy.allResponsesLabel} />
        <MetricCard value={visibleSubmissions.filter((submission) => submission.status === 'shortlisted').length} label={agencyReviewCopy.shortlistLabel} />
        <MetricCard value={agencyReviewCopy.decisionWindowValue} label={agencyReviewCopy.decisionWindowLabel} />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">{agencyReviewCopy.queueTitle}</div>
              <div className="panel-subtitle">{agencyReviewCopy.queueSubtitle(currentOpportunitySubmissions.length)}</div>
            </div>
            <div className="workflow-actions-list">
              <button className={queueFilter === 'current' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('current')}>{agencyReviewCopy.queueFilterCurrent}</button>
              <button className={queueFilter === 'all' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('all')}>{agencyReviewCopy.queueFilterAll}</button>
            </div>
          </div>
          <SubmissionQueueList
            submissions={displayedSubmissions}
            mode="agency"
            currentOpportunityId={currentOpportunity.id}
            selectedSubmissionId={selectedSubmissionId ?? undefined}
            onSelectSubmission={selectOpportunityFromSubmission}
          />
        </div>

        <OutcomeSummaryPanel mode="agency" />
        <OutcomeSummaryPanel
          mode="agency"
          overrideTitle={`Active review outcome — ${activeSubmission?.vendor ?? 'No submission selected'}`}
          overrideSummary={activeOutcomeSummary}
        />
      </section>

      <section className="content-grid lower-grid">
        <DecisionControlsPanel
          controls={decisionControls}
          description={presentAgencyDecisionDescription(activeSubmissionLabel)}
        />

        <PackageCompletenessPanel title={presentAgencyPackageTitle(activeSubmissionLabel)} items={packageCompletenessItems} />
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title={agencyReviewCopy.selectionContextTitle}
          currentOpportunity={currentOpportunity}
          activeSubmission={activeSubmission}
          mode="agency"
          draftSummary={draftSummary}
        />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title={agencyReviewCopy.checklistTitle} contextLabel={presentAgencyChecklistContext(currentOpportunity.title, activeSubmissionLabel)} />

        <div className="content-grid nested-grid">
          <StatusProgressionPanel steps={submissionLifecycle} />
          <StatusBadgeLegend
            title={agencyReviewCopy.reviewLegendTitle}
            items={[
              {
                label: 'received',
                className: 'status status-open',
                description: 'Submission arrived and is ready for agency triage.',
              },
              {
                label: 'reviewing',
                className: 'status status-review',
                description: 'Procurement staff are checking completeness and fit.',
              },
              {
                label: 'shortlisted',
                className: 'status status-awarded',
                description: 'Response advanced to the next decision stage.',
              },
            ]}
          />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <ReviewerNotesPanel
          title={reviewerLabels.title}
          primaryLabel={reviewerLabels.primaryLabel}
          primaryValue={reviewNotes.internalNotes}
          secondaryLabel={reviewerLabels.secondaryLabel}
          secondaryValue={reviewNotes.vendorQuestions}
          onPrimaryChange={(value) => onChange('internalNotes', value)}
          onSecondaryChange={(value) => onChange('vendorQuestions', value)}
          actionLabel={reviewerLabels.actionLabel}
        />
      </section>
    </main>
  )
}
