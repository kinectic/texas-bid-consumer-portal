import { ActionHeader } from '../components/ActionHeader'
import { FieldMock } from '../components/FieldMock'
import { MetricCard } from '../components/MetricCard'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { lifecycleMetrics } from '../data/metrics'
import { vendorSubmissions } from '../data/mockData'
import { submissionLifecycle, submissionStatusSummary } from '../data/submissionStatus'
import type { ReviewNotesState } from '../types/forms'

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
          <div className="submission-list">
            {vendorSubmissions.map((submission) => {
              const statusSummary = submissionStatusSummary[submission.status]

              return (
                <div className="submission-card" key={`${submission.vendor}-${submission.opportunity}`}>
                  <div className="submission-header">
                    <strong>{submission.vendor}</strong>
                    <span className={submission.status === 'received' ? 'status status-open' : 'status status-review'}>
                      {statusSummary.label}
                    </span>
                  </div>
                  <div className="muted">Opportunity: {submission.opportunity}</div>
                  <div className="muted">Submitted: {submission.submittedAt}</div>
                  <div className="muted">Progress: {statusSummary.progress}</div>
                  <div className="dashboard-note compact-note">{statusSummary.detail}</div>
                </div>
              )
            })}
          </div>
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

        <div className="panel">
          <div className="panel-title">Package completeness</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Pricing sheet</strong>
              <div className="muted">Attached for both responses</div>
            </div>
            <div className="draft-card">
              <strong>Compliance docs</strong>
              <div className="muted">One response missing updated insurance proof</div>
            </div>
            <div className="draft-card">
              <strong>Response narrative</strong>
              <div className="muted">Both submissions complete</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title="Agency review checklist" contextLabel="before shortlist decision" />

        <div className="panel">
          <div className="panel-title">Status progression</div>
          <ol className="flow-list">
            {submissionLifecycle.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
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
