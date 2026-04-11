import { ActionHeader } from '../components/ActionHeader'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { RecommendedOpportunitiesPanel } from '../components/RecommendedOpportunitiesPanel'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { StatusProgressionPanel } from '../components/StatusProgressionPanel'
import { SubmissionQueueList } from '../components/SubmissionQueueList'
import { SubmissionStatusSnapshot } from '../components/SubmissionStatusSnapshot'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { lifecycleMetrics } from '../data/metrics'
import { opportunities, vendorSubmissions, statusClass } from '../data/mockData'
import { submissionLifecycle, submissionStatusSummary } from '../data/submissionStatus'

const submissionStatusItems = [
  submissionStatusSummary.received,
  submissionStatusSummary.reviewing,
  submissionStatusSummary.shortlisted,
]

export function VendorDashboardPage() {
  const savedOpportunities = opportunities.filter((opportunity) => opportunity.status === 'open')
  const recommendedOpportunities = opportunities.slice(0, 2)
  const vendorMetricsItems = [
    { value: savedOpportunities.length, label: 'Saved opportunities' },
    { value: lifecycleMetrics.responsesInReview, label: 'Active submissions' },
    { value: lifecycleMetrics.vendorProfileCompleteness, label: 'Profile completeness' },
  ]

  return (
    <main className="main">
      <ActionHeader
        eyebrow="Vendor workspace"
        title="Vendor dashboard"
        intro="A cleaner Texas-first workspace where vendors can track saved bids, monitor active responses, and see what to pursue next without portal confusion."
        actions={
          <>
            <button className="ghost">Update Profile</button>
            <button className="primary">Find Opportunities</button>
          </>
        }
      />

      <PrimaryActionStrip
        title="Vendor priorities"
        description="Keep the active bid pipeline moving from qualification into submission and tracking."
        actions={
          <>
            <button className="primary">Find opportunities</button>
            <button className="ghost">Continue submission</button>
            <button className="ghost">Review packet</button>
          </>
        }
      />

      <WorkflowMetricsSnapshot items={vendorMetricsItems} />

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Saved opportunities</div>
          <OpportunityCardList
            opportunities={savedOpportunities}
            statusClassMap={statusClass}
            metaFormatter={(opportunity) => `${opportunity.agency} • ${opportunity.location}`}
          />
        </div>

        <div className="content-grid nested-grid">
          <RoleModeSummaryPanel mode="vendor" />
          <VendorQualificationPanel />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <OutcomeSummaryPanel mode="vendor" />

        <div className="panel">
          <div className="panel-title">Active submissions</div>
          <SubmissionQueueList submissions={vendorSubmissions} mode="vendor" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <EmptyStatePanel mode="vendor" />

        <SubmissionStatusSnapshot title="Submission status progression" items={submissionStatusItems} />
      </section>

      <section className="content-grid lower-grid">
        <StatusProgressionPanel title="Submission lifecycle" steps={submissionLifecycle} />

        <RecommendedOpportunitiesPanel opportunities={recommendedOpportunities} actionLabel="Open recommendations" />
      </section>

      <section className="content-grid lower-grid">
        <VendorSubmissionPacketPanel />
      </section>
    </main>
  )
}
