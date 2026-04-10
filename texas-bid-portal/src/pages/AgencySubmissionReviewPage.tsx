import { vendorSubmissions } from '../data/mockData'

export function AgencySubmissionReviewPage() {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Agency workspace</div>
          <h1>Submission review</h1>
          <p className="intro">
            A direct review screen where agencies can triage vendor responses, inspect package completeness, and move decisions forward without leaving the platform.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Export responses</button>
          <button className="primary">Advance shortlist</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{vendorSubmissions.length}</span>
          <span className="stat-label">Responses in review</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">1</span>
          <span className="stat-label">Shortlist candidate</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">Today</span>
          <span className="stat-label">Decision window</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Response queue</div>
          <div className="submission-list">
            {vendorSubmissions.map((submission) => (
              <div className="submission-card" key={`${submission.vendor}-${submission.opportunity}`}>
                <div className="submission-header">
                  <strong>{submission.vendor}</strong>
                  <span className={submission.status === 'received' ? 'status status-open' : 'status status-review'}>
                    {submission.status}
                  </span>
                </div>
                <div className="muted">Opportunity: {submission.opportunity}</div>
                <div className="muted">Submitted: {submission.submittedAt}</div>
              </div>
            ))}
          </div>
        </div>

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
      </section>

      <section className="content-grid lower-grid">
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

        <div className="panel">
          <div className="panel-title">Reviewer notes</div>
          <div className="form-mock create-bid-form">
            <div className="input-mock tall">Internal procurement notes</div>
            <div className="input-mock tall">Follow-up questions for vendor</div>
            <button className="ghost wide">Save review note</button>
          </div>
        </div>
      </section>
    </main>
  )
}
