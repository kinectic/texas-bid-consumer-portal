const workflowCards = [
  {
    title: 'Marketplace search',
    description: 'Browse and qualify Texas opportunities with cleaner sourcing and next-step clarity.',
  },
  {
    title: 'Agency posting',
    description: 'Create, structure, and publish solicitations from a direct agency workflow.',
  },
  {
    title: 'Vendor response',
    description: 'Move from saved opportunity to actual submission without leaving the portal.',
  },
]

const milestoneCards = [
  'Marketplace feed and opportunity detail',
  'Agency dashboard and bid creation',
  'Vendor dashboard and submission workflow',
  'Interactive shell navigation across the built prototype',
]

const lifecycleSteps = [
  {
    stage: '1. Agency drafts bid',
    detail: 'The procurement team structures the solicitation in the create-bid workflow.',
  },
  {
    stage: '2. Bid is published',
    detail: 'The opportunity appears in the marketplace with Texas-local sourcing clarity.',
  },
  {
    stage: '3. Vendor qualifies opportunity',
    detail: 'The vendor reviews fit, documents, and urgency from the detail screen.',
  },
  {
    stage: '4. Vendor submits response',
    detail: 'The submission workflow captures pricing, attachments, and confirmation in-platform.',
  },
  {
    stage: '5. Agency reviews responses',
    detail: 'The review lane supports triage, completeness checks, and shortlist decisions.',
  },
]

export function HomeDashboardPage() {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">TexasBid MVP</div>
          <h1>Texas procurement platform overview</h1>
          <p className="intro">
            One landing screen that shows the real product shape: agency posting, vendor discovery, direct submissions, and a cleaner Texas-first workflow than generic bidding portals.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">View product map</button>
          <button className="primary">Enter workflow</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">6</span>
          <span className="stat-label">Interactive workflow screens built</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">3</span>
          <span className="stat-label">Core workflow lanes shown in the MVP</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">Texas</span>
          <span className="stat-label">Localized procurement-first product direction</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Workflow landing</div>
          <div className="draft-list">
            {workflowCards.map((card) => (
              <div className="draft-card" key={card.title}>
                <strong>{card.title}</strong>
                <div className="muted">{card.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Why this exists</div>
          <div className="dashboard-note">
            The goal is not just another listing page. The goal is a Texas-first procurement product where agencies and vendors can actually complete meaningful workflow steps inside one cleaner system.
          </div>
          <div className="dashboard-note">
            This landing view gives the shell a real front door instead of forcing the prototype to start on one specific sub-screen.
          </div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Recently published</strong>
              <div className="muted">Citywide Custodial Services RFP now appears in the marketplace lane</div>
            </div>
            <div className="draft-card">
              <strong>Publishing continuity</strong>
              <div className="muted">Agency-created opportunities should visibly flow into vendor discovery and response paths.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Connected lifecycle summary</div>
          <div className="draft-list">
            {lifecycleSteps.map((step) => (
              <div className="draft-card" key={step.stage}>
                <strong>{step.stage}</strong>
                <div className="muted">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Built milestones</div>
          <ol className="flow-list">
            {milestoneCards.map((milestone) => (
              <li key={milestone}>{milestone}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Next product layers</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Reusable form state</strong>
              <div className="muted">Move from static screen mocks to shared interaction state.</div>
            </div>
            <div className="draft-card">
              <strong>Submission review controls</strong>
              <div className="muted">Give agencies a real response triage view.</div>
            </div>
            <div className="draft-card">
              <strong>Cross-screen data continuity</strong>
              <div className="muted">Make screens feel connected instead of isolated.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
