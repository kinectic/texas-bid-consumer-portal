import { ActionHeader } from '../components/ActionHeader'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { MetricCard } from '../components/MetricCard'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { lifecycleMetrics } from '../data/metrics'
import { opportunities, vendorSubmissions, statusClass } from '../data/mockData'
import { submissionLifecycle, submissionStatusSummary } from '../data/submissionStatus'

export function VendorDashboardPage() {
  const savedOpportunities = opportunities.filter((opportunity) => opportunity.status === 'open')
  const recommendedOpportunities = opportunities.slice(0, 2)

  return (
    <main className="main">
      <ActionHeader
        eyebrow="Vendor workspace"
        title="Vendor dashboard"
        intro="A cleaner Texas-first workspace where vendors can track saved bids, monitor active responses, and see what to pursue next without portal confusion."
        actions={
          <>
            <button className="ghost">Update Profile</button>
            <button className="primary">Find Opportunities</button>
          </>
        }
      />

      <PrimaryActionStrip
        title="Vendor priorities"
        description="Keep the active bid pipeline moving from qualification into submission and tracking."
        actions={
          <>
            <button className="primary">Find opportunities</button>
            <button className="ghost">Continue submission</button>
            <button className="ghost">Review packet</button>
          </>
        }
      />

      <section className="stats-grid">
        <MetricCard value={savedOpportunities.length} label="Saved opportunities" />
        <MetricCard value={lifecycleMetrics.responsesInReview} label="Active submissions" />
        <MetricCard value={lifecycleMetrics.vendorProfileCompleteness} label="Profile completeness" />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Saved opportunities</div>
          <div className="opportunity-list">
            {savedOpportunities.map((opportunity) => (
              <article className="opportunity-card" key={opportunity.id}>
                <div className="opportunity-top">
                  <div>
                    <h3>{opportunity.title}</h3>
                    <div className="meta">
                      {opportunity.agency} • {opportunity.location}
                    </div>
                  </div>
                  <span className={statusClass[opportunity.status]}>{opportunity.status}</span>
                </div>
                <p>{opportunity.summary}</p>
                <div className="card-footer">
                  <div className="muted">Due {opportunity.dueDate}</div>
                  <div className="muted">Source: {opportunity.source}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="content-grid nested-grid">
          <RoleModeSummaryPanel mode="vendor" />
          <VendorQualificationPanel />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <OutcomeSummaryPanel mode="vendor" />

        <div className="panel">
          <div className="panel-title">Active submissions</div>
          <div className="submission-list">
            {vendorSubmissions.map((submission) => {
              const statusSummary = submissionStatusSummary[submission.status]

              return (
                <div className="submission-card" key={`${submission.vendor}-${submission.opportunity}`}>
                  <div className="submission-header">
                    <strong>{submission.opportunity}</strong>
                    <span className={submission.status === 'received' ? 'status status-open' : 'status status-review'}>
                      {statusSummary.label}
                    </span>
                  </div>
                  <div className="muted">Submitted by: {submission.vendor}</div>
                  <div className="muted">Submitted: {submission.submittedAt}</div>
                  <div className="muted">Progress: {statusSummary.progress}</div>
                  <div className="dashboard-note compact-note">{statusSummary.detail}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <EmptyStatePanel mode="vendor" />

        <div className="panel">
          <div className="panel-title">Submission status progression</div>
          <ol className="flow-list">
            {submissionLifecycle.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <VendorSubmissionPacketPanel />

        <div className="panel">
          <div className="panel-title">Recommended bids</div>
          <div className="draft-list">
            {recommendedOpportunities.map((opportunity) => (
              <div className="draft-card" key={opportunity.id}>
                <strong>{opportunity.title}</strong>
                <div className="muted">{opportunity.category}</div>
                <div className="muted">Due {opportunity.dueDate}</div>
              </div>
            ))}
          </div>
          <button className="primary wide">Open recommendations</button>
        </div>
      </section>
    </main>
  )
}
