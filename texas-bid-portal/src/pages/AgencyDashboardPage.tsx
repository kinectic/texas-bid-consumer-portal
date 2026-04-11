import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { lifecycleMetrics } from '../data/metrics'
import { opportunities, vendorSubmissions, statusClass } from '../data/mockData'

export function AgencyDashboardPage() {
  const activeBids = opportunities.filter((opportunity) => opportunity.status === 'open')
  const awardedBids = opportunities.filter((opportunity) => opportunity.status === 'awarded')

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Agency workspace</div>
          <h1>Agency dashboard</h1>
          <p className="intro">
            A Texas-first control center for procurement teams to manage live bids, vendor activity, and fast next actions without portal clutter.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Export Activity</button>
          <button className="primary">New Bid</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{lifecycleMetrics.activeBids}</span>
          <span className="stat-label">Active bids</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{lifecycleMetrics.draftBids}</span>
          <span className="stat-label">Drafts waiting for final review</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{lifecycleMetrics.responsesInReview}</span>
          <span className="stat-label">Recent vendor submissions</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Active opportunities</div>
              <div className="panel-subtitle">Live agency postings with vendor-facing visibility</div>
            </div>
            <button className="ghost">Manage deadlines</button>
          </div>
          <div className="opportunity-list">
            {activeBids.map((opportunity) => (
              <article className="opportunity-card" key={opportunity.id}>
                <div className="opportunity-top">
                  <div>
                    <h3>{opportunity.title}</h3>
                    <div className="meta">
                      {opportunity.category} • {opportunity.location}
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

        <DraftPublishSummaryPanel title="Draft publishing readiness" />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Draft pipeline</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Transit Shelter Cleaning Services</strong>
              <div className="muted">Draft ready for legal review</div>
            </div>
            <div className="draft-card">
              <strong>IT Equipment Replacement RFP</strong>
              <div className="muted">Awaiting attachments and insurance requirements</div>
            </div>
          </div>
          <div className="panel-title section-title">Recently awarded</div>
          <div className="draft-list">
            {awardedBids.map((opportunity) => (
              <div className="draft-card" key={opportunity.id}>
                <strong>{opportunity.title}</strong>
                <div className="muted">{opportunity.agency}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Recent submissions</div>
          <div className="submission-list">
            {vendorSubmissions.map((submission) => (
              <div className="submission-card" key={`${submission.vendor}-${submission.opportunity}`}>
                <div className="submission-header">
                  <strong>{submission.vendor}</strong>
                  <span className={submission.status === 'received' ? 'status status-open' : 'status status-review'}>
                    {submission.status}
                  </span>
                </div>
                <div className="muted">For: {submission.opportunity}</div>
                <div className="muted">Submitted: {submission.submittedAt}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
