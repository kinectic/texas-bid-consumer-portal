import { lifecycleMetrics } from '../data/metrics'
import { opportunities, vendorSubmissions, statusClass } from '../data/mockData'
import { submissionLifecycle, submissionStatusSummary } from '../data/submissionStatus'

export function VendorDashboardPage() {
  const savedOpportunities = opportunities.filter((opportunity) => opportunity.status === 'open')
  const recommendedOpportunities = opportunities.slice(0, 2)

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Vendor workspace</div>
          <h1>Vendor dashboard</h1>
          <p className="intro">
            A cleaner Texas-first workspace where vendors can track saved bids, monitor active responses, and see what to pursue next without portal confusion.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Update Profile</button>
          <button className="primary">Find Opportunities</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{savedOpportunities.length}</span>
          <span className="stat-label">Saved opportunities</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{lifecycleMetrics.responsesInReview}</span>
          <span className="stat-label">Active submissions</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{lifecycleMetrics.vendorProfileCompleteness}</span>
          <span className="stat-label">Profile completeness</span>
        </div>
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

        <div className="panel">
          <div className="panel-title">Account and compliance</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Business profile</strong>
              <div className="muted">Complete</div>
            </div>
            <div className="draft-card">
              <strong>W-9</strong>
              <div className="muted">On file</div>
            </div>
            <div className="draft-card">
              <strong>Insurance certificate</strong>
              <div className="muted">Needs refresh in 14 days</div>
            </div>
          </div>
          <button className="ghost wide">Review compliance docs</button>
        </div>
      </section>

      <section className="content-grid lower-grid">
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
