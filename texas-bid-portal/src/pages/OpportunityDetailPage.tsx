import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { bidPacketDocuments } from '../data/formState'
import { selectedOpportunity, statusClass } from '../data/mockData'

export function OpportunityDetailPage() {
  const opportunity = selectedOpportunity

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Marketplace</div>
          <h1>{opportunity.title}</h1>
          <p className="intro">
            A cleaner bid-detail page that shows vendors the real opportunity, source context, requirements, files, and next actions without sending them through a confusing portal maze.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Save Opportunity</button>
          <button className="primary">Start Submission</button>
        </div>
      </header>

      <section className="content-grid">
        <div className="panel">
          <div className="opportunity-top">
            <div>
              <div className="panel-title">Opportunity overview</div>
              <div className="panel-subtitle">Vendor-facing summary with core procurement facts</div>
            </div>
            <span className={statusClass[opportunity.status]}>{opportunity.status}</span>
          </div>
          <div className="detail-grid">
            <div>
              <div className="detail-label">Agency</div>
              <div>{opportunity.agency}</div>
            </div>
            <div>
              <div className="detail-label">Location</div>
              <div>{opportunity.location}</div>
            </div>
            <div>
              <div className="detail-label">Category</div>
              <div>{opportunity.category}</div>
            </div>
            <div>
              <div className="detail-label">Deadline</div>
              <div>{opportunity.dueDate}</div>
            </div>
            <div>
              <div className="detail-label">Source</div>
              <div>{opportunity.source}</div>
            </div>
            <div>
              <div className="detail-label">Opportunity ID</div>
              <div>{opportunity.id}</div>
            </div>
          </div>
          <p className="detail-copy">{opportunity.summary}</p>
        </div>

        <div className="content-grid nested-grid">
          <VendorQualificationPanel />
          <OpportunityStatusPanel status="open" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Requirements and scope</div>
          <ol className="flow-list">
            <li>Review solicitation documents and pricing sheet</li>
            <li>Confirm vendor qualification and insurance readiness</li>
            <li>Prepare pricing response and service notes</li>
            <li>Upload required attachments before deadline</li>
            <li>Submit directly through the platform</li>
          </ol>
          <div className="dashboard-note">
            This screen should make it immediately obvious what the opportunity is, what matters, and what the vendor should do next.
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Documents</div>
          <div className="doc-list">
            {bidPacketDocuments.map((document) => (
              <div className="doc-item" key={document.name}>
                <span>{document.name}</span>
                <button className="linkish">{document.status}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <LifecycleTimelinePanel />
      </section>
    </main>
  )
}
