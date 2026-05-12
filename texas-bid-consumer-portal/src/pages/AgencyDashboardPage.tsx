import type { ViewKey } from '../data/viewData'
import type { Opportunity, Submission } from '../types'

type AgencyDashboardPageProps = {
  onNavigate: (view: ViewKey) => void
  currentOpportunity?: Opportunity
  publishedOpportunity?: Opportunity | null
  submissions?: Submission[]
  selectedSubmissionId?: string | null
  readinessByOpportunityId?: Record<string, { label: string; detail: string }>
  queueFilter?: 'current' | 'all'
  onQueueFilterChange?: (filter: 'current' | 'all') => void
  onSelectOpportunity?: (opportunity: Opportunity) => void
  onSelectSubmission?: (submission: Submission) => void
}

export function AgencyDashboardPage({ onNavigate }: AgencyDashboardPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Government portal boundary</div>
          <h1>Agency operations do not live in the consumer portal</h1>
          <p className="intro">
            This product is for vendors and public marketplace activity. Agency onboarding, posting controls, and internal operations continue in the separate government portal.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('marketplace')}>Back to marketplace</button>
          <button className="primary" onClick={() => onNavigate('submission-workflow')}>Continue vendor response flow</button>
        </div>
      </header>

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">What belongs here</div>
          <h2>Consumer portal scope</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Visible in this product</strong>
              <div className="muted">Posted bid discovery, vendor qualification, saved opportunities, and direct response submission.</div>
            </div>
            <div className="draft-card">
              <strong>Not visible in this product</strong>
              <div className="muted">Agency setup, unpublished drafts, internal review queues, decision controls, and procurement-only workflow tools.</div>
            </div>
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Why the split matters</div>
          <h2>Separate products prevent role confusion</h2>
          <p className="intro">
            Vendors should not be navigating agency workspaces, and agencies should not be running internal review from the public-facing experience.
          </p>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Consumer portal</strong>
              <div className="muted">Built for discovery, qualification, and submission.</div>
            </div>
            <div className="draft-card">
              <strong>Government portal</strong>
              <div className="muted">Built for onboarding, posting, review, approvals, and controlled government operations.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Recommended next move</div>
          <div className="panel-subtitle">Return to the vendor journey or inspect the submission handoff boundary.</div>
          <div className="workflow-actions-list">
            <button className="switch-pill switch-pill-active" onClick={() => onNavigate('marketplace')}>Open marketplace</button>
            <button className="switch-pill" onClick={() => onNavigate('opportunity')}>Open bid detail</button>
            <button className="switch-pill" onClick={() => onNavigate('trust-center')}>View trust center</button>
          </div>
        </div>
      </section>
    </main>
  )
}
