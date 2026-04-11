import { ActionHeader } from '../components/ActionHeader'
import { AwardHistoryPanel } from '../components/AwardHistoryPanel'
import { DecisionControlsPanel } from '../components/DecisionControlsPanel'
import { DraftPipelinePanel } from '../components/DraftPipelinePanel'
import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { MilestonesPanel } from '../components/MilestonesPanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { opportunities, statusClass } from '../data/mockData'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'

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

const milestoneItems = [
  'Create bid workflow connected to publishing state',
  'Agency dashboard active opportunities surface',
  'Submission review and vendor activity tracking',
] as const

type AgencyDashboardPageProps = {
  publishedOpportunity: Opportunity | null
  submissions: Submission[]
  onNavigate: (view: ViewKey) => void
}

export function AgencyDashboardPage({ publishedOpportunity, submissions, onNavigate }: AgencyDashboardPageProps) {
  const activeBids = publishedOpportunity
    ? [publishedOpportunity, ...opportunities.filter((opportunity) => opportunity.status === 'open' && opportunity.id !== publishedOpportunity.id)]
    : opportunities.filter((opportunity) => opportunity.status === 'open')
  const awardedBids = opportunities.filter((opportunity) => opportunity.status === 'awarded')
  const agencyMetricsItems = [
    { value: activeBids.length, label: 'Active bids' },
    { value: publishedOpportunity ? 0 : 1, label: 'Drafts waiting for final review' },
    { value: submissions.length, label: 'Recent vendor submissions' },
  ]
  const draftSummaryItems = [
    {
      title: publishedOpportunity ? 'Publishing complete' : 'Draft still pending publish',
      detail: publishedOpportunity
        ? `${publishedOpportunity.title} is now visible as a live agency opportunity.`
        : 'The current agency draft has not been promoted into the live marketplace yet.',
    },
    {
      title: 'Dashboard sync',
      detail: 'Active bid counts and the opportunity list now reflect the shared create-bid publishing state.',
    },
    {
      title: 'Vendor visibility',
      detail: publishedOpportunity
        ? 'Vendors can now discover the live opportunity from the marketplace workflow.'
        : 'Vendors will only see the draft after the publish action is triggered.',
    },
  ] as const
  const awardHistoryItems = awardedBids.map((opportunity) => ({
    title: opportunity.title,
    detail: opportunity.agency,
  }))
  const submissionActivityItems = submissions.map((submission) => ({
    title: submission.vendor,
    detail: `${submission.opportunity} • ${submission.opportunityId} • Submitted ${submission.submittedAt}`,
  }))

  return (
    <main className="main">
      <ActionHeader
        eyebrow="Agency workspace"
        title="Agency dashboard"
        intro="A Texas-first control center for procurement teams to manage live bids, vendor activity, and fast next actions without portal clutter."
        actions={
          <>
            <button className="ghost" onClick={() => onNavigate('agency-submission-review')}>Export Activity</button>
            <button className="primary" onClick={() => onNavigate('create-bid')}>New Bid</button>
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
          <DraftPublishSummaryPanel title="Draft publishing readiness" items={draftSummaryItems} />
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
        <MilestonesPanel title="Agency workflow milestones" items={milestoneItems} />
      </section>
    </main>
  )
}
