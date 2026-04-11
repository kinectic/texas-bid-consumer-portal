import { ActionHeader } from '../components/ActionHeader'
import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { lifecycleMetrics } from '../data/metrics'
import { opportunities, vendorSubmissions, statusClass } from '../data/mockData'

const agencyMetricsItems = [
  { value: lifecycleMetrics.activeBids, label: 'Active bids' },
  { value: lifecycleMetrics.draftBids, label: 'Drafts waiting for final review' },
  { value: lifecycleMetrics.responsesInReview, label: 'Recent vendor submissions' },
]

export function AgencyDashboardPage() {
  const activeBids = opportunities.filter((opportunity) => opportunity.status === 'open')
  const awardedBids = opportunities.filter((opportunity) => opportunity.status === 'awarded')

  return (
    <main className="main">
      <ActionHeader
        eyebrow="Agency workspace"
        title="Agency dashboard"
        intro="A Texas-first control center for procurement teams to manage live bids, vendor activity, and fast next actions without portal clutter."
        actions={
          <>
            <button className="ghost">Export Activity</button>
            <button className="primary">New Bid</button>
          </>
        }
      />

      <PrimaryActionStrip
        title="Agency priorities"
        description="Move the procurement flow forward from draft through publishing and review."
        actions={
          <>
            <button className="primary">Create new bid</button>
            <button className="ghost">Manage deadlines</button>
            <button className="ghost">Review submissions</button>
          </>
        }
      />

      <WorkflowMetricsSnapshot items={agencyMetricsItems} />

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Active opportunities</div>
              <div className="panel-subtitle">Live agency postings with vendor-facing visibility</div>
            </div>
            <button className="ghost">Manage deadlines</button>
          </div>
          <OpportunityCardList
            opportunities={activeBids}
            statusClassMap={statusClass}
            metaFormatter={(opportunity) => `${opportunity.category} • ${opportunity.location}`}
          />
        </div>

        <div className="content-grid nested-grid">
          <RoleModeSummaryPanel mode="agency" />
          <DraftPublishSummaryPanel title="Draft publishing readiness" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <EmptyStatePanel mode="agency" />

        <div className="panel">
          <div className="panel-title">Draft pipeline</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Transit Shelter Cleaning Services</strong>
              <div className="muted">Draft ready for legal review</div>
            </div>
            <div className="draft-card">
              <strong>IT Equipment Replacement RFP</strong>
              <div className="muted">Awaiting attachments and insurance requirements</div>
            </div>
          </div>
          <div className="panel-title section-title">Recently awarded</div>
          <div className="draft-list">
            {awardedBids.map((opportunity) => (
              <div className="draft-card" key={opportunity.id}>
                <strong>{opportunity.title}</strong>
                <div className="muted">{opportunity.agency}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Recent submissions</div>
          <div className="submission-list">
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
          </div>
        </div>
      </section>
    </main>
  )
}
