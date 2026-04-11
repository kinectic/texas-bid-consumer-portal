import { ActionHeader } from '../components/ActionHeader'
import { AwardHistoryPanel } from '../components/AwardHistoryPanel'
import { DecisionControlsPanel } from '../components/DecisionControlsPanel'
import { DraftPipelinePanel } from '../components/DraftPipelinePanel'
import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { MilestonesPanel } from '../components/MilestonesPanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { SelectionContextPanel } from '../components/SelectionContextPanel'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { opportunities, statusClass } from '../data/mockData'
import type { Opportunity, Submission } from '../types'
import { buildSubmissionActivityItems } from '../utils/submissionActivity'
import {
  agencyDashboardCopy,
  agencyDraftPipelineItems,
  agencyMilestoneItems,
  agencyPriorityControls,
} from '../utils/agencyDashboardContent'
import { shellContent } from '../utils/shellContent'
import type { ViewKey } from '../data/viewData'

type AgencyDashboardPageProps = {
  currentOpportunity: Opportunity
  publishedOpportunity: Opportunity | null
  submissions: Submission[]
  selectedSubmissionId: string | null
  readinessByOpportunityId: Record<string, { label: string, detail: string }>
  queueFilter: 'current' | 'all'
  onQueueFilterChange: (filter: 'current' | 'all') => void
  onSelectOpportunity: (opportunity: Opportunity) => void
  onSelectSubmission: (submission: Submission) => void
  onNavigate: (view: ViewKey) => void
}

export function AgencyDashboardPage({ currentOpportunity, publishedOpportunity, submissions, selectedSubmissionId, readinessByOpportunityId, queueFilter, onQueueFilterChange, onSelectOpportunity, onSelectSubmission, onNavigate }: AgencyDashboardPageProps) {
  const activeBids = publishedOpportunity
    ? [publishedOpportunity, ...opportunities.filter((opportunity) => opportunity.status === 'open' && opportunity.id !== publishedOpportunity.id)]
    : opportunities.filter((opportunity) => opportunity.status === 'open')
  const awardedBids = opportunities.filter((opportunity) => opportunity.status === 'awarded')
  const agencyMetricsItems = [
    { value: activeBids.length, label: shellContent.agencyMetrics.activeBids },
    { value: publishedOpportunity ? 0 : 1, label: shellContent.agencyMetrics.draftsWaiting },
    { value: submissions.length, label: shellContent.agencyMetrics.recentVendorSubmissions },
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
  const currentOpportunitySubmissions = submissions.filter((submission) => submission.opportunityId === currentOpportunity.id)
  const displayedSubmissions = queueFilter === 'current' ? currentOpportunitySubmissions : submissions
  const selectedSubmissionForOpportunity = currentOpportunitySubmissions[0] ?? null
  const submissionActivityItems = buildSubmissionActivityItems({
    submissions: displayedSubmissions,
    allSubmissions: submissions,
    selectedSubmissionId,
    currentOpportunityId: currentOpportunity.id,
    mode: 'agency',
    readinessByOpportunityId,
  })
  const activeSubmission = selectedSubmissionForOpportunity

  return (
    <main className="main">
      <ActionHeader
        eyebrow={agencyDashboardCopy.workspaceEyebrow}
        title={agencyDashboardCopy.title}
        intro={agencyDashboardCopy.intro}
        actions={
          <>
            <button className="ghost" onClick={() => onNavigate('agency-submission-review')}>{agencyDashboardCopy.exportActivityLabel}</button>
            <button className="primary" onClick={() => onNavigate('create-bid')}>{agencyDashboardCopy.newBidLabel}</button>
          </>
        }
      />

      <DecisionControlsPanel
        title={agencyDashboardCopy.prioritiesTitle}
        controls={[...agencyPriorityControls]}
        description={agencyDashboardCopy.prioritiesDescription}
      />

      <WorkflowMetricsSnapshot items={agencyMetricsItems} />

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">{agencyDashboardCopy.activeOpportunitiesTitle}</div>
              <div className="panel-subtitle">{agencyDashboardCopy.activeOpportunitiesSubtitle}</div>
            </div>
            <button className="ghost">{agencyDashboardCopy.manageDeadlinesLabel}</button>
          </div>
          <OpportunityCardList
            opportunities={activeBids}
            statusClassMap={statusClass}
            metaFormatter={(opportunity) => `${opportunity.category} • ${opportunity.location}`}
            role="agency"
            readinessByOpportunityId={readinessByOpportunityId}
            selectedOpportunityId={currentOpportunity.id}
            onSelectOpportunity={(opportunity) => {
              onSelectOpportunity(opportunity)
              onNavigate('agency-submission-review')
            }}
          />
        </div>

        <div className="content-grid nested-grid">
          <RoleModeSummaryPanel mode="agency" />
          <DraftPublishSummaryPanel title={agencyDashboardCopy.draftPublishTitle} items={draftSummaryItems} />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title={shellContent.selectionContextTitle}
          currentOpportunity={currentOpportunity}
          activeSubmission={activeSubmission}
          mode="agency"
        />
        <MilestonesPanel title={agencyDashboardCopy.milestonesTitle} items={agencyMilestoneItems} />
      </section>

      <section className="content-grid lower-grid">
        <EmptyStatePanel mode="agency" />

        <div className="content-grid nested-grid">
          <DraftPipelinePanel items={[...agencyDraftPipelineItems]} />
          <AwardHistoryPanel items={awardHistoryItems} />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <SubmissionActivityPanel
          title={queueFilter === 'current' ? agencyDashboardCopy.currentSubmissionActivityTitle : agencyDashboardCopy.allSubmissionActivityTitle}
          items={submissionActivityItems}
          currentOpportunityId={currentOpportunity.id}
          selectedSubmissionId={selectedSubmissionId ?? undefined}
          onSelectSubmission={(opportunityId, submissionId) => {
            const matchingOpportunity = activeBids.find((opportunity) => opportunity.id === opportunityId)
              ?? opportunities.find((opportunity) => opportunity.id === opportunityId)
            const matchingSubmission = submissionId
              ? submissions.find((submission) => submission.id === submissionId)
              : null

            if (matchingOpportunity) {
              if (matchingSubmission) {
                onSelectSubmission(matchingSubmission)
              }
              onSelectOpportunity(matchingOpportunity)
              onNavigate('agency-submission-review')
            }
          }}
        />
        <div className="panel">
          <div className="panel-title">{agencyDashboardCopy.queueScopeTitle}</div>
          <div className="workflow-actions-list">
            <button className={queueFilter === 'current' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('current')}>{agencyDashboardCopy.queueScopeCurrent}</button>
            <button className={queueFilter === 'all' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('all')}>{agencyDashboardCopy.queueScopeAll}</button>
          </div>
          <div className="dashboard-note compact-note">
            {agencyDashboardCopy.queueScopeSummary(currentOpportunitySubmissions.length, submissions.length)}
          </div>
        </div>
      </section>
    </main>
  )
}
