import { BidFormOverviewPanel } from '../components/BidFormOverviewPanel'
import { DraftPipelinePanel } from '../components/DraftPipelinePanel'
import { HomeCtaPanel } from '../components/HomeCtaPanel'
import { LifecycleSummaryPanel } from '../components/LifecycleSummaryPanel'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { MilestonesPanel } from '../components/MilestonesPanel'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { RecommendedOpportunitiesPanel } from '../components/RecommendedOpportunitiesPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { WorkflowStageSummary } from '../components/WorkflowStageSummary'
import { lifecycleMetrics } from '../data/metrics'
import { workflowStageLabels } from '../data/workflowStages'
import { opportunities } from '../data/mockData'
import type { Opportunity } from '../types'
import type { CreateBidFormState } from '../types/forms'
import type { ViewKey } from '../data/viewData'
import {
  homeDashboardCopy,
  homeDraftPipelineItems,
  homeLifecycleSteps,
  homeMilestoneCards,
  homeWorkflowCards,
} from '../utils/homeDashboardContent'
import {
  homeWorkflowMetricLabels,
  presentHomePublishedSnapshotState,
  sharedDashboardCopy,
} from '../utils/dashboardSnapshotContent'

const workflowStageSummaryItems = homeWorkflowCards.map((card) => ({
  stage: workflowStageLabels[card.key].stage,
  owner: workflowStageLabels[card.key].owner,
  detail: card.description,
}))

type HomeDashboardPageProps = {
  publishedBidPreview: CreateBidFormState
  publishedOpportunity: Opportunity | null
  currentOpportunity: Opportunity
  readinessByOpportunityId: Record<string, { label: string, detail: string }>
  onSelectOpportunity: (opportunity: Opportunity) => void
  onNavigate: (view: ViewKey) => void
}

export function HomeDashboardPage({ publishedBidPreview, publishedOpportunity, currentOpportunity, readinessByOpportunityId, onSelectOpportunity, onNavigate }: HomeDashboardPageProps) {
  const recommendedOpportunities = publishedOpportunity
    ? [currentOpportunity, ...opportunities.filter((opportunity) => opportunity.id !== currentOpportunity.id)].slice(0, 2)
    : opportunities.slice(0, 2)
  const workflowMetricsItems = [
    { value: lifecycleMetrics.workflowScreensBuilt, label: homeWorkflowMetricLabels.screensBuilt },
    { value: publishedOpportunity ? 1 : 0, label: homeWorkflowMetricLabels.draftPromoted },
    { value: 'Texas', label: homeWorkflowMetricLabels.productDirection },
  ]
  const publishedSnapshotState = presentHomePublishedSnapshotState(Boolean(publishedOpportunity))

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">{homeDashboardCopy.eyebrow}</div>
          <h1>{homeDashboardCopy.title}</h1>
          <p className="intro">{homeDashboardCopy.intro}</p>
        </div>
        <div className="top-actions">
          <button className="ghost">{homeDashboardCopy.productMapLabel}</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>{homeDashboardCopy.enterWorkflowLabel}</button>
        </div>
      </header>

      <PrimaryActionStrip
        title={homeDashboardCopy.primaryActionTitle}
        description={homeDashboardCopy.primaryActionDescription}
        actions={
          <>
            <button className="primary" onClick={() => onNavigate('create-bid')}>{homeDashboardCopy.createBidLabel}</button>
            <button className="ghost" onClick={() => onNavigate('opportunity')}>{homeDashboardCopy.reviewLiveOpportunityLabel}</button>
            <button className="ghost" onClick={() => onNavigate('agency-submission-review')}>{homeDashboardCopy.reviewSubmissionsLabel}</button>
          </>
        }
      />

      <WorkflowMetricsSnapshot items={workflowMetricsItems} />

      <section className="content-grid">
        <WorkflowStageSummary title={homeDashboardCopy.workflowLandingTitle} items={workflowStageSummaryItems} />

        <OutcomeSummaryPanel mode="shared" />
      </section>

      <section className="content-grid lower-grid">
        <HomeCtaPanel onNavigate={onNavigate} />
        <PublishedBidSnapshotPanel
          bid={publishedBidPreview}
          statusLabel={publishedSnapshotState.statusLabel}
          note={publishedSnapshotState.note}
        />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleSummaryPanel items={[...homeLifecycleSteps]} />
        <LifecycleTimelinePanel title={sharedDashboardCopy.lifecycleTimelineTitle} />
      </section>

      <section className="content-grid lower-grid">
        <BidFormOverviewPanel formState={publishedBidPreview} />
        <RecommendedOpportunitiesPanel
          title={homeDashboardCopy.suggestedOpportunitiesTitle}
          opportunities={recommendedOpportunities}
          actionLabel={homeDashboardCopy.suggestedOpportunitiesAction}
          onSelectOpportunity={onSelectOpportunity}
          onAction={() => onNavigate('opportunity')}
        />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">{homeDashboardCopy.opportunityReadinessTitle}</div>
          <OpportunityCardList
            opportunities={recommendedOpportunities}
            statusClassMap={{ open: 'status status-open', awarded: 'status status-awarded', 'under-review': 'status status-review' }}
            metaFormatter={(opportunity) => `${opportunity.agency} • ${opportunity.location}`}
            role="vendor"
            readinessByOpportunityId={readinessByOpportunityId}
            selectedOpportunityId={currentOpportunity.id}
            onSelectOpportunity={(opportunity) => {
              onSelectOpportunity(opportunity)
              onNavigate('opportunity')
            }}
          />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <MilestonesPanel items={homeMilestoneCards} />
        <DraftPipelinePanel title={homeDashboardCopy.currentBuildLanesTitle} items={[...homeDraftPipelineItems]} />
      </section>
    </main>
  )
}
