import type { ViewKey } from '../data/viewData'
import type { BidDocument, CreateBidFormState } from '../types/forms'

type CreateBidPageProps = {
  onNavigate: (view: ViewKey) => void
  formState?: CreateBidFormState
  documents?: BidDocument[]
  onChange?: (field: keyof CreateBidFormState, value: string) => void
  isPublished?: boolean
  onSaveDraft?: () => void
  onPublishBid?: () => void
}

export function CreateBidPage({ onNavigate }: CreateBidPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Government posting boundary</div>
          <h1>Bid creation happens in the government portal</h1>
          <p className="intro">
            The consumer portal is where vendors find posted bids and submit responses. Drafting and publishing solicitations belong in the separate government product.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('marketplace')}>Back to marketplace</button>
          <button className="primary" onClick={() => onNavigate('messages')}>View post-selection messaging</button>
        </div>
      </header>

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Government-side responsibility</div>
          <h2>What the government portal handles</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Internal bid drafting</strong>
              <div className="muted">Agencies define scope, attach documents, set deadlines, and prepare internal notes before publication.</div>
            </div>
            <div className="draft-card">
              <strong>Publication control</strong>
              <div className="muted">Only published bids move across the boundary into the vendor marketplace.</div>
            </div>
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Consumer-side responsibility</div>
          <h2>What this portal does after publication</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Marketplace visibility</strong>
              <div className="muted">Vendors browse only the posted opportunities that agencies chose to publish.</div>
            </div>
            <div className="draft-card">
              <strong>Response execution</strong>
              <div className="muted">Vendors inspect requirements, assemble submissions, and send complete response packets.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Boundary summary</div>
          <div className="panel-subtitle">The split is simple: agencies publish there, vendors respond here.</div>
          <div className="workflow-actions-list">
            <button className="switch-pill switch-pill-active" onClick={() => onNavigate('marketplace')}>Browse posted bids</button>
            <button className="switch-pill" onClick={() => onNavigate('vendor-dashboard')}>Open vendor workspace</button>
            <button className="switch-pill" onClick={() => onNavigate('submission-workflow')}>Open submission flow</button>
          </div>
        </div>
      </section>
    </main>
  )
}
