import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { SectionIntro } from '../components/SectionIntro'
import { StatusBadgeLegend } from '../components/StatusBadgeLegend'
import { WorkflowFilterStrip } from '../components/WorkflowFilterStrip'
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
          <SectionIntro
            eyebrow="Vendor discovery"
            title="Marketplace feed"
            description="What vendors see when they browse live opportunities and decide which bid deserves action next."
          />
          <WorkflowFilterStrip title="Marketplace filters" filters={['All', 'Open', 'Facilities', 'Professional']} activeIndex={0} />

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
          <OpportunityMetadataPanel opportunity={previewOpportunity} title="Marketplace metadata" />
          <OpportunityStatusPanel status="open" />
          <StatusBadgeLegend title="Marketplace status legend" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel detail-panel">
          <SectionIntro
            eyebrow="Qualification"
            title="Opportunity detail"
            description="The focused opportunity view vendors use when deciding whether to move into the submission workflow."
          />
          <h2>{previewOpportunity.title}</h2>
          <p className="detail-copy">{previewOpportunity.summary}</p>
          <OpportunityDocumentsPanel
            documents={previewOpportunity.documents.map((name) => ({ name, status: 'Open' }))}
            title="Opportunity documents"
          />
          <div className="detail-actions">
            <button className="ghost">Save Opportunity</button>
            <button className="primary">Submit Response</button>
          </div>
        </div>

        <div className="panel agency-panel">
          <SectionIntro
            eyebrow="Agency flow"
            title="Agency posting flow"
            description="The simplified drafting-to-publish path that turns agency inputs into a vendor-visible opportunity."
          />
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
      </section>

      <section className="content-grid lower-grid">
        <div className="panel vendor-panel">
          <SectionIntro
            eyebrow="Vendor tracking"
            title="Submission workspace"
            description="Active submission records showing how vendor packets move after they are sent into the platform."
          />
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
