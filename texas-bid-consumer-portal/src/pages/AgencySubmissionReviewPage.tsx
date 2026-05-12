import type { ViewKey } from '../data/viewData'
import type { Opportunity, Submission } from '../types'
import type { ReviewNotesState } from '../types/forms'

type AgencySubmissionReviewPageProps = {
  onNavigate: (view: ViewKey) => void
  currentOpportunity?: Opportunity
  selectedSubmissionId?: string | null
  draftSummary?: {
    formStatus: string
    attachedCount: number
    totalDocuments: number
    submissionStatus: string
    bufferLabel: string
    preservedUnsavedDraftLabel: string
  }
  reviewNotes?: ReviewNotesState
  onChange?: (field: keyof ReviewNotesState, value: string) => void
  packageCompletenessItems?: Array<{ title: string; detail: string }>
  submissions?: Submission[]
  queueFilter?: 'current' | 'all'
  onQueueFilterChange?: (filter: 'current' | 'all') => void
  onSelectOpportunity?: (opportunity: Opportunity) => void
  onSelectSubmission?: (submission: Submission) => void
  onAdvanceStatus?: (status: Submission['status']) => void
  onArchiveSubmission?: () => void
}

export function AgencySubmissionReviewPage({ onNavigate }: AgencySubmissionReviewPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Government review handoff</div>
          <h1>Agency review continues in the government portal</h1>
          <p className="intro">
            The consumer portal stops after the vendor sends a response. Completeness review, clarification, shortlisting, and award decisions happen in the separate government product.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('submission-workflow')}>Back to vendor submission</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>Return to marketplace</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="metric-card">
          <div className="metric-value">1</div>
          <div className="metric-label">Boundary crossed</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">Vendor</div>
          <div className="metric-label">Consumer-side role completed</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">Agency</div>
          <div className="metric-label">Government-side review owner</div>
        </div>
        <div className="metric-card">
          <div className="metric-value">Separate</div>
          <div className="metric-label">Portal rule</div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">What happened in this portal</div>
          <h2>Vendor submission is complete</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Consumer-side finish line</strong>
              <div className="muted">The vendor discovered a posted bid, qualified the opportunity, prepared documents, and submitted a response.</div>
            </div>
            <div className="draft-card">
              <strong>Boundary event</strong>
              <div className="muted">That response packet now leaves the consumer portal and enters the government review lane.</div>
            </div>
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">What happens next</div>
          <h2>Government-side review workflow</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Agency tasks</strong>
              <div className="muted">Check completeness, request clarification, compare responses, shortlist, and decide next steps.</div>
            </div>
            <div className="draft-card">
              <strong>Why it is separate</strong>
              <div className="muted">These actions involve internal review controls and decision tooling that should not appear in the public-facing vendor product.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Consumer portal rule</div>
          <div className="panel-subtitle">End the vendor journey cleanly, then hand off. Do not merge government review back into this app.</div>
          <div className="workflow-actions-list">
            <button className="switch-pill switch-pill-active" onClick={() => onNavigate('marketplace')}>Browse more bids</button>
            <button className="switch-pill" onClick={() => onNavigate('vendor-dashboard')}>Open vendor workspace</button>
            <button className="switch-pill" onClick={() => onNavigate('messages')}>Open messaging layer</button>
          </div>
        </div>
      </section>
    </main>
  )
}
