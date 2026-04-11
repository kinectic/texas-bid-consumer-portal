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
  const activeSubmissionLabel = activeSubmission
    ? `${activeSubmission.vendor} · ${activeSubmission.id} · ${activeRowMeta?.rowLabel ?? 'Response row 1 of 1'}`
    : 'No submission selected'
  const activeOutcomeSummary = activeSubmission
    ? `${activeSubmission.vendor} is currently ${activeSubmission.status} for ${currentOpportunity.title}. This is ${activeRowMeta?.rowLabel.toLowerCase() ?? 'response row 1 of 1'}, and decision actions now apply only to submission ${activeSubmission.id}. Vendor buffer state: ${draftSummary.bufferLabel}. ${draftSummary.preservedUnsavedDraftLabel}.`
    : 'Select a submission row to apply review actions and see row-specific review context.'
  const decisionControls = [
    { label: `Shortlist ${activeSubmission?.vendor ?? 'selected vendor'}`, className: 'primary wide' as const, onClick: () => onAdvanceStatus('shortlisted') },
    { label: `Request clarification from ${activeSubmission?.vendor ?? 'vendor'}`, className: 'ghost wide' as const, onClick: () => onAdvanceStatus('reviewing') },
    { label: `Flag ${activeSubmission?.vendor ?? 'submission'} incomplete`, className: 'ghost wide' as const, onClick: () => onAdvanceStatus('received') },
    { label: `Archive ${activeSubmission?.vendor ?? 'selected response'}`, className: 'ghost wide' as const, onClick: onArchiveSubmission },
  ]
  const selectOpportunityFromSubmission = (submission: Submission) => {
    const matchingOpportunity = opportunities.find((opportunity) => opportunity.id === submission.opportunityId)
    if (matchingOpportunity) {
      onSelectSubmission(submission)
      onSelectOpportunity(matchingOpportunity)
      onQueueFilterChange('current')
      onNavigate('agency-submission-review')
    }
  }
  return (
    <main className="main">
      <ActionHeader
        eyebrow="Agency workspace"
        title="Submission review"
        intro="A direct review screen where agencies can triage vendor responses, inspect package completeness, and move decisions forward without leaving the platform."
        actions={
          <>
            <button className="ghost" onClick={() => onNavigate('agency-dashboard')}>Export responses</button>
            <button className="primary" onClick={() => onNavigate('vendor-dashboard')}>Advance shortlist</button>
          </>
        }
      />

      <section className="stats-grid">
        <MetricCard value={currentOpportunitySubmissions.length} label="Current opportunity responses" />
        <MetricCard value={visibleSubmissions.length} label="All responses in review" />
        <MetricCard value={visibleSubmissions.filter((submission) => submission.status === 'shortlisted').length} label="Shortlist candidate" />
        <MetricCard value="Today" label="Decision window" />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Response queue</div>
              <div className="panel-subtitle">Keep the selected opportunity context while switching queue scope. Current opportunity has {currentOpportunitySubmissions.length} review row{currentOpportunitySubmissions.length === 1 ? '' : 's'}.</div>
            </div>
            <div className="workflow-actions-list">
              <button className={queueFilter === 'current' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('current')}>Current opportunity</button>
              <button className={queueFilter === 'all' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('all')}>All opportunities</button>
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
          description={`This is where the agency workflow stops being a posting tool and becomes an actual procurement operations surface. Active row: ${activeSubmissionLabel}.`}
        />

        <PackageCompletenessPanel title={`Package completeness — ${activeSubmissionLabel}`} items={packageCompletenessItems} />
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title="Selected opportunity + submission context"
          currentOpportunity={currentOpportunity}
          activeSubmission={activeSubmission}
          mode="agency"
          draftSummary={draftSummary}
        />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title="Agency review checklist" contextLabel={`${currentOpportunity.title} • ${activeSubmissionLabel}`} />

        <div className="content-grid nested-grid">
          <StatusProgressionPanel steps={submissionLifecycle} />
          <StatusBadgeLegend
            title="Review status legend"
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
          title={`Reviewer notes — ${activeSubmissionLabel}`}
          primaryLabel={`Internal procurement notes for ${activeSubmission?.vendor ?? 'selected vendor'}`}
          primaryValue={reviewNotes.internalNotes}
          secondaryLabel={`Follow-up questions for ${activeSubmission?.vendor ?? 'selected vendor'}`}
          secondaryValue={reviewNotes.vendorQuestions}
          onPrimaryChange={(value) => onChange('internalNotes', value)}
          onSecondaryChange={(value) => onChange('vendorQuestions', value)}
          actionLabel={`Save notes for ${activeSubmission?.vendor ?? 'selected vendor'}`}
        />
      </section>
    </main>
  )
}
