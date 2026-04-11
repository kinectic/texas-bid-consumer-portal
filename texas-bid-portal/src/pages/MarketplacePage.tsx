import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import type { CreateBidFormState } from '../types/forms'
import { opportunities, statusClass, vendorSubmissions } from '../data/mockData'

type MarketplacePageProps = {
  publishedBidPreview: CreateBidFormState
}

export function MarketplacePage({ publishedBidPreview }: MarketplacePageProps) {
  const highlighted = opportunities[0]
  const previewOpportunity = {
    ...highlighted,
    title: publishedBidPreview.title,
    category: publishedBidPreview.category,
    dueDate: publishedBidPreview.deadline,
    summary: publishedBidPreview.scope,
  }

  const marketplaceFeed = [previewOpportunity, ...opportunities.slice(1)]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Product prototype</div>
          <h1>Texas procurement, without the ugly parts.</h1>
          <p className="intro">
            A structured Texas-first portal where government agencies can post opportunities and vendors can discover and submit directly.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Vendor Sign In</button>
          <button className="primary">Post a Bid</button>
        </div>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">2,092+</span>
          <span className="stat-label">Texas opportunities visible in ecosystem research</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">3</span>
          <span className="stat-label">Core workflows shown in this prototype</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">1</span>
          <span className="stat-label">Texas-first experience instead of generic procurement clutter</span>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel marketplace-panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Marketplace feed</div>
              <div className="panel-subtitle">What vendors see when they browse opportunities</div>
            </div>
            <div className="filters">
              <span className="filter-pill active">All</span>
              <span className="filter-pill">Open</span>
              <span className="filter-pill">Facilities</span>
              <span className="filter-pill">Professional</span>
            </div>
          </div>

          <div className="draft-card preview-card">
            <strong>Published bid preview sync</strong>
            <div className="muted">
              The top marketplace record now mirrors the current agency create-bid form state.
            </div>
          </div>

          <div className="opportunity-list">
            {marketplaceFeed.map((opportunity) => (
              <article className="opportunity-card" key={opportunity.id}>
                <div className="opportunity-top">
                  <div>
                    <h3>{opportunity.title}</h3>
                    <div className="meta">
                      {opportunity.agency} • {opportunity.location} • {opportunity.category}
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
          <div className="panel detail-panel">
            <div className="panel-title">Opportunity detail</div>
            <h2>{previewOpportunity.title}</h2>
            <div className="detail-grid">
              <div>
                <div className="detail-label">Agency</div>
                <div>{previewOpportunity.agency}</div>
              </div>
              <div>
                <div className="detail-label">Deadline</div>
                <div>{previewOpportunity.dueDate}</div>
              </div>
              <div>
                <div className="detail-label">Category</div>
                <div>{previewOpportunity.category}</div>
              </div>
              <div>
                <div className="detail-label">Source</div>
                <div>{previewOpportunity.source}</div>
              </div>
            </div>
            <p className="detail-copy">{previewOpportunity.summary}</p>
            <div className="doc-list">
              {previewOpportunity.documents.map((document) => (
                <div className="doc-item" key={document}>
                  <span>{document}</span>
                  <button className="linkish">Open</button>
                </div>
              ))}
            </div>
            <div className="detail-actions">
              <button className="ghost">Save Opportunity</button>
              <button className="primary">Submit Response</button>
            </div>
          </div>
          <OpportunityStatusPanel status="open" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel agency-panel">
          <div className="panel-title">Agency posting flow</div>
          <ol className="flow-list">
            <li>Create agency profile</li>
            <li>Draft solicitation with deadlines and attachments</li>
            <li>Publish to Texas marketplace</li>
            <li>Review vendor responses in one dashboard</li>
          </ol>
          <div className="form-mock">
            <div className="input-mock">Bid title</div>
            <div className="input-row">
              <div className="input-mock">Issue date</div>
              <div className="input-mock">Submission deadline</div>
            </div>
            <div className="input-mock tall">Scope / description</div>
            <div className="input-row">
              <div className="input-mock">Attachments</div>
              <div className="input-mock">Category</div>
            </div>
            <button className="primary wide">Publish Bid</button>
          </div>
        </div>

        <div className="panel vendor-panel">
          <div className="panel-title">Submission workspace</div>
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
          <div className="small-note">
            This is the product direction: agencies post, vendors bid, and both sides stay inside one clearer Texas-first system.
          </div>
        </div>
      </section>
    </main>
  )
}
