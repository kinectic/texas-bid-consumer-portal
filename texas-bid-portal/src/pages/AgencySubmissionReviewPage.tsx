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
import { submissionLifecycle } from '../data/submissionStatus'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import type { ReviewNotesState } from '../types/forms'

const packageCompletenessItems = [
  {
    title: 'Pricing sheet',
    detail: 'Attached for both responses',
  },
  {
    title: 'Compliance docs',
    detail: 'One response missing updated insurance proof',
  },
  {
    title: 'Response narrative',
    detail: 'Both submissions complete',
  },
]

type AgencySubmissionReviewPageProps = {
  currentOpportunity: Opportunity
  reviewNotes: ReviewNotesState
  onChange: (field: keyof ReviewNotesState, value: string) => void
  submissions: Submission[]
  onAdvanceStatus: (status: Submission['status']) => void
  onArchiveSubmission: () => void
  onNavigate: (view: ViewKey) => void
}

export function AgencySubmissionReviewPage({
  currentOpportunity,
  reviewNotes,
  onChange,
  submissions,
  onAdvanceStatus,
  onArchiveSubmission,
  onNavigate,
}: AgencySubmissionReviewPageProps) {
  const decisionControls = [
    { label: 'Mark shortlisted', className: 'primary wide' as const, onClick: () => onAdvanceStatus('shortlisted') },
    { label: 'Request clarification', className: 'ghost wide' as const, onClick: () => onAdvanceStatus('reviewing') },
    { label: 'Flag incomplete submission', className: 'ghost wide' as const, onClick: () => onAdvanceStatus('received') },
    { label: 'Archive response', className: 'ghost wide' as const, onClick: onArchiveSubmission },
  ]
  const visibleSubmissions = submissions.filter((submission) => submission.status !== 'draft')
  const activeSubmission = submissions.find((submission) => submission.opportunityId === currentOpportunity.id) ?? null
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
        <MetricCard value={visibleSubmissions.length} label="Responses in review" />
        <MetricCard value={visibleSubmissions.filter((submission) => submission.status === 'shortlisted').length} label="Shortlist candidate" />
        <MetricCard value="Today" label="Decision window" />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Response queue</div>
          <SubmissionQueueList submissions={visibleSubmissions} mode="agency" currentOpportunityId={currentOpportunity.id} />
        </div>

        <OutcomeSummaryPanel mode="agency" />
      </section>

      <section className="content-grid lower-grid">
        <DecisionControlsPanel
          controls={decisionControls}
          description="This is where the agency workflow stops being a posting tool and becomes an actual procurement operations surface."
        />

        <PackageCompletenessPanel items={packageCompletenessItems} />
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title="Selected opportunity + submission context"
          currentOpportunity={currentOpportunity}
          activeSubmission={activeSubmission}
          mode="agency"
        />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title="Agency review checklist" contextLabel={currentOpportunity.title} />

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
          primaryLabel="Internal procurement notes"
          primaryValue={reviewNotes.internalNotes}
          secondaryLabel="Follow-up questions for vendor"
          secondaryValue={reviewNotes.vendorQuestions}
          onPrimaryChange={(value) => onChange('internalNotes', value)}
          onSecondaryChange={(value) => onChange('vendorQuestions', value)}
        />
      </section>
    </main>
  )
}
