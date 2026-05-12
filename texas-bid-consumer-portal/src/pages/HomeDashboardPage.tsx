import { BidFormOverviewPanel } from '../components/BidFormOverviewPanel'
import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { DraftPipelinePanel } from '../components/DraftPipelinePanel'
import { HomeCtaPanel } from '../components/HomeCtaPanel'
import { LifecycleSummaryPanel } from '../components/LifecycleSummaryPanel'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { MilestonesPanel } from '../components/MilestonesPanel'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { RecommendedOpportunitiesPanel } from '../components/RecommendedOpportunitiesPanel'
import { RoleGatewayPanel } from '../components/RoleGatewayPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { WorkflowStageSummary } from '../components/WorkflowStageSummary'
import { CustomerIntakeProgressPanel } from '../components/CustomerIntakeProgressPanel'
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
  presentHomePublishedSnapshotState,
  shellContent,
} from '../utils/shellLane'

const workflowStageSummaryItems = homeWorkflowCards.map((card) => {
  const stageMeta = workflowStageLabels[card.key]
  return {
    stage: stageMeta.stage,
    owner: stageMeta.owner,
    detail: card.description,
  }
})

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
    { value: lifecycleMetrics.workflowScreensBuilt, label: shellContent.homeWorkflowMetricLabels.screensBuilt },
    { value: '3-step flow', label: 'Post job → compare bids → hire' },
    { value: 'Texas', label: shellContent.homeWorkflowMetricLabels.productDirection },
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
          <button className="ghost" onClick={() => onNavigate('how-it-works')}>See how it works</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>Compare trusted contractors</button>
        </div>
      </header>

      <PrimaryActionStrip
        title="Customer starting points"
        description="Lead with the real hiring loop: discover local contractors, compare bids, and keep trust and follow-up attached to the job."
        actions={
          <>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Compare trusted contractors</button>
            <button className="ghost" onClick={() => onNavigate('trust-center')}>Check trust standards first</button>
            <button className="ghost" onClick={() => onNavigate('how-it-works')}>See how it works</button>
          </>
        }
      />

      <WorkflowMetricsSnapshot items={workflowMetricsItems} />

      <DemoNarrativeCommandBar activeView="marketplace" onNavigate={onNavigate} />

      <section className="content-grid">
        <WorkflowStageSummary title={homeDashboardCopy.workflowLandingTitle} items={workflowStageSummaryItems} />

        <div className="panel">
          <div className="panel-title">{homeDashboardCopy.customerValueTitle}</div>
          <div className="draft-list">
            {homeDashboardCopy.customerValuePoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">Built to reduce friction, increase trust, and keep the hiring decision in one place.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Launch trust</div>
          <h2>{homeDashboardCopy.launchTrustTitle}</h2>
          <div className="draft-list">
            {homeDashboardCopy.launchTrustPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">The public site needs to explain why the marketplace is credible even before it reaches full scale.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Public launch stance</div>
          <h2>Start free, local, and trust-first</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Free at launch</strong>
              <div className="muted">Reduce adoption friction early by making the first version easy to try for both sides of the marketplace.</div>
            </div>
            <div className="draft-card">
              <strong>Manual support behind the scenes</strong>
              <div className="muted">Early marketplace operations can still include human support while the product experience stays clean on the surface.</div>
            </div>
            <div className="draft-card">
              <strong>Texas-first credibility</strong>
              <div className="muted">Keep the language local, practical, and grounded in real hiring situations instead of generic nationwide marketplace copy.</div>
            </div>
          </div>
        </div>
      </section>

      <RoleGatewayPanel onNavigate={onNavigate} />

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
        <LifecycleTimelinePanel title={shellContent.lifecycleTimelineTitle} />
      </section>

      <section className="content-grid lower-grid">
        <BidFormOverviewPanel formState={publishedBidPreview} />
        <CustomerIntakeProgressPanel
          title={publishedBidPreview.title}
          category={publishedBidPreview.category}
          deadline={publishedBidPreview.deadline}
        />
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
            metaFormatter={(opportunity) => `${opportunity.category} • ${opportunity.location}`}
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

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Start a real job"
          title="Choose the right entry: trust review or contractor comparison"
          description="Make the next move obvious: either review trust standards first or enter the marketplace directly, but keep both paths attached to the same hiring flow."
          note="The home screen now supports two clean entry modes: confidence-building first or immediate contractor discovery."
          actionLabel="Open trust-first path"
          onAction={() => onNavigate('trust-center')}
        />
      </section>
    </main>
  )
}
