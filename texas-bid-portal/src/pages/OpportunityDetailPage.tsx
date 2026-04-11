import { AwardHistoryPanel } from '../components/AwardHistoryPanel'
import { DetailActionsStrip } from '../components/DetailActionsStrip'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { bidPacketDocuments } from '../data/formState'
import { opportunities, selectedOpportunity, statusClass } from '../data/mockData'

export function OpportunityDetailPage() {
  const opportunity = selectedOpportunity
  const awardHistoryItems = opportunities
    .filter((item) => item.status === 'awarded')
    .map((item) => ({
      title: item.title,
      detail: item.agency,
    }))

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
        <div>
          <div className="opportunity-top opportunity-summary-status-row">
            <div />
            <span className={statusClass[opportunity.status]}>{opportunity.status}</span>
          </div>
          <OpportunitySummaryPanel summary={opportunity.summary} />
        </div>

        <div className="content-grid nested-grid">
          <OpportunityMetadataPanel opportunity={opportunity} />
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
          <DetailActionsStrip secondaryLabel="Save Opportunity" primaryLabel="Start Submission" />
        </div>

        <OpportunityDocumentsPanel documents={bidPacketDocuments} />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleTimelinePanel />
        <AwardHistoryPanel title="Related award history" items={awardHistoryItems} />
      </section>
    </main>
  )
}
