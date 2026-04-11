import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { lifecycleMetrics } from '../data/metrics'
import type { CreateBidFormState } from '../types/forms'

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

type HomeDashboardPageProps = {
  publishedBidPreview: CreateBidFormState
}

export function HomeDashboardPage({ publishedBidPreview }: HomeDashboardPageProps) {
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
          <span className="stat-value">{lifecycleMetrics.workflowScreensBuilt}</span>
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
          <div className="panel-title">Lifecycle metrics</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Active bids</strong>
              <div className="muted">{lifecycleMetrics.activeBids}</div>
            </div>
            <div className="draft-card">
              <strong>Draft bids</strong>
              <div className="muted">{lifecycleMetrics.draftBids}</div>
            </div>
            <div className="draft-card">
              <strong>Responses in review</strong>
              <div className="muted">{lifecycleMetrics.responsesInReview}</div>
            </div>
            <div className="draft-card">
              <strong>Shortlisted</strong>
              <div className="muted">{lifecycleMetrics.shortlisted}</div>
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
          <div className="panel-title">Published bid snapshot</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>{publishedBidPreview.title}</strong>
              <div className="muted">Category: {publishedBidPreview.category}</div>
              <div className="muted">Deadline: {publishedBidPreview.deadline}</div>
            </div>
            <div className="draft-card">
              <strong>Scope preview</strong>
              <div className="muted">{publishedBidPreview.scope}</div>
            </div>
            <div className="draft-card">
              <strong>Requirements preview</strong>
              <div className="muted">{publishedBidPreview.requirements}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <LifecycleTimelinePanel title="Lifecycle timeline" />
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
          <div className="panel-title">Consistent next move</div>
          <div className="draft-card">
            <strong>Follow the workflow actions bar</strong>
            <div className="muted">Every major screen now pushes toward the next practical procurement step instead of leaving the user guessing.</div>
          </div>
        </div>

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
