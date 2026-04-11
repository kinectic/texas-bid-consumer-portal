import { ActionHeader } from '../components/ActionHeader'
import { FieldMock } from '../components/FieldMock'
import { MetricCard } from '../components/MetricCard'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PackageCompletenessPanel } from '../components/PackageCompletenessPanel'
import { StatusBadgeLegend } from '../components/StatusBadgeLegend'
import { StatusProgressionPanel } from '../components/StatusProgressionPanel'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { SubmissionQueueList } from '../components/SubmissionQueueList'
import { lifecycleMetrics } from '../data/metrics'
import { vendorSubmissions } from '../data/mockData'
import { submissionLifecycle } from '../data/submissionStatus'
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
  reviewNotes: ReviewNotesState
  onChange: (field: keyof ReviewNotesState, value: string) => void
}

export function AgencySubmissionReviewPage({ reviewNotes, onChange }: AgencySubmissionReviewPageProps) {
  return (
    <main className="main">
      <ActionHeader
        eyebrow="Agency workspace"
        title="Submission review"
        intro="A direct review screen where agencies can triage vendor responses, inspect package completeness, and move decisions forward without leaving the platform."
        actions={
          <>
            <button className="ghost">Export responses</button>
            <button className="primary">Advance shortlist</button>
          </>
        }
      />

      <section className="stats-grid">
        <MetricCard value={lifecycleMetrics.responsesInReview} label="Responses in review" />
        <MetricCard value={lifecycleMetrics.shortlisted} label="Shortlist candidate" />
        <MetricCard value="Today" label="Decision window" />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Response queue</div>
          <SubmissionQueueList submissions={vendorSubmissions} mode="agency" />
        </div>

        <OutcomeSummaryPanel mode="agency" />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Decision controls</div>
          <div className="action-stack">
            <button className="primary wide">Mark shortlisted</button>
            <button className="ghost wide">Request clarification</button>
            <button className="ghost wide">Flag incomplete submission</button>
            <button className="ghost wide">Archive response</button>
          </div>
          <div className="dashboard-note">
            This is where the agency workflow stops being a posting tool and becomes an actual procurement operations surface.
          </div>
        </div>

        <PackageCompletenessPanel items={packageCompletenessItems} />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title="Agency review checklist" contextLabel="before shortlist decision" />

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
        <div className="panel">
          <div className="panel-title">Reviewer notes</div>
          <div className="form-mock create-bid-form">
            <FieldMock label="Internal procurement notes" value={reviewNotes.internalNotes} multiline onChange={(value) => onChange('internalNotes', value)} />
            <FieldMock label="Follow-up questions for vendor" value={reviewNotes.vendorQuestions} multiline onChange={(value) => onChange('vendorQuestions', value)} />
            <button className="ghost wide">Save review note</button>
          </div>
        </div>
      </section>
    </main>
  )
}
