import { ActionHeader } from '../components/ActionHeader'
import { AwardHistoryPanel } from '../components/AwardHistoryPanel'
import { DecisionControlsPanel } from '../components/DecisionControlsPanel'
import { DraftPipelinePanel } from '../components/DraftPipelinePanel'
import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { lifecycleMetrics } from '../data/metrics'
import { opportunities, vendorSubmissions, statusClass } from '../data/mockData'

const agencyMetricsItems = [
  { value: lifecycleMetrics.activeBids, label: 'Active bids' },
  { value: lifecycleMetrics.draftBids, label: 'Drafts waiting for final review' },
  { value: lifecycleMetrics.responsesInReview, label: 'Recent vendor submissions' },
]

const agencyPriorityControls = [
  { label: 'Create new bid', className: 'primary wide' as const },
  { label: 'Manage deadlines', className: 'ghost wide' as const },
  { label: 'Review submissions', className: 'ghost wide' as const },
]

const draftPipelineItems = [
  {
    title: 'Transit Shelter Cleaning Services',
    detail: 'Draft ready for legal review',
  },
  {
    title: 'IT Equipment Replacement RFP',
    detail: 'Awaiting attachments and insurance requirements',
  },
]

export function AgencyDashboardPage() {
  const activeBids = opportunities.filter((opportunity) => opportunity.status === 'open')
  const awardedBids = opportunities.filter((opportunity) => opportunity.status === 'awarded')
  const awardHistoryItems = awardedBids.map((opportunity) => ({
    title: opportunity.title,
    detail: opportunity.agency,
  }))
  const submissionActivityItems = vendorSubmissions.map((submission) => ({
    title: submission.vendor,
    detail: `${submission.opportunity} • Submitted ${submission.submittedAt}`,
  }))

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

      <DecisionControlsPanel
        title="Agency priorities"
        controls={agencyPriorityControls}
        description="Move the procurement flow forward from draft through publishing and review."
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

        <div className="content-grid nested-grid">
          <DraftPipelinePanel items={draftPipelineItems} />
          <AwardHistoryPanel items={awardHistoryItems} />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <SubmissionActivityPanel items={submissionActivityItems} />
      </section>
    </main>
  )
}
