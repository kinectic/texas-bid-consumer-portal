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

const workflowCards = [
  {
    key: 'marketplace',
    title: 'Marketplace search',
    description: 'Browse and qualify Texas opportunities with cleaner sourcing and next-step clarity.',
  },
  {
    key: 'create-bid',
    title: 'Agency posting',
    description: 'Create, structure, and publish solicitations from a direct agency workflow.',
  },
  {
    key: 'submission-workflow',
    title: 'Vendor response',
    description: 'Move from saved opportunity to actual submission without leaving the portal.',
  },
] as const

const workflowStageSummaryItems = workflowCards.map((card) => ({
  stage: workflowStageLabels[card.key].stage,
  owner: workflowStageLabels[card.key].owner,
  detail: card.description,
}))

const milestoneCards = [
  'Marketplace feed and opportunity detail',
  'Agency dashboard and bid creation',
  'Vendor dashboard and submission workflow',
  'Interactive shell navigation across the built prototype',
] as const

const draftPipelineItems = [
  {
    title: 'Agency draft quality pass',
    detail: 'Refining the bid form, publishing readiness, and operational review surfaces.',
  },
  {
    title: 'Vendor submission continuity',
    detail: 'Keeping vendor response assembly and status tracking connected across the MVP.',
  },
]

const lifecycleSteps = [
  {
    stage: '1. Agency drafts bid',
    detail: 'The procurement team structures the solicitation in the create-bid workflow.',
  },
  {
    stage: '2. Bid is published',
    detail: 'The opportunity appears in the marketplace with Texas-local sourcing clarity.',
  },
  {
    stage: '3. Vendor qualifies opportunity',
    detail: 'The vendor reviews fit, documents, and urgency from the detail screen.',
  },
  {
    stage: '4. Vendor submits response',
    detail: 'The submission workflow captures pricing, attachments, and confirmation in-platform.',
  },
  {
    stage: '5. Agency reviews responses',
    detail: 'The review lane supports triage, completeness checks, and shortlist decisions.',
  },
]

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
    { value: lifecycleMetrics.workflowScreensBuilt, label: 'Interactive workflow screens built' },
    { value: publishedOpportunity ? 1 : 0, label: 'Agency draft promoted live' },
    { value: 'Texas', label: 'Localized procurement-first product direction' },
  ]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">TexasBid MVP</div>
          <h1>Texas procurement platform overview</h1>
          <p className="intro">
            One landing screen that shows the real product shape: agency posting, vendor discovery, direct submissions, and a cleaner Texas-first workflow than generic bidding portals.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">View product map</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>Enter workflow</button>
        </div>
      </header>

      <PrimaryActionStrip
        title="Start the next move"
        description="Jump straight into the most important lifecycle actions for agencies or vendors."
        actions={
          <>
            <button className="primary" onClick={() => onNavigate('create-bid')}>Create a bid</button>
            <button className="ghost" onClick={() => onNavigate('opportunity')}>Review live opportunity</button>
            <button className="ghost" onClick={() => onNavigate('agency-submission-review')}>Review submissions</button>
          </>
        }
      />

      <WorkflowMetricsSnapshot items={workflowMetricsItems} />

      <section className="content-grid">
        <WorkflowStageSummary title="Workflow landing" items={workflowStageSummaryItems} />

        <OutcomeSummaryPanel mode="shared" />
      </section>

      <section className="content-grid lower-grid">
        <HomeCtaPanel onNavigate={onNavigate} />
        <PublishedBidSnapshotPanel
          bid={publishedBidPreview}
          statusLabel={publishedOpportunity ? 'Published' : 'Draft'}
          note={publishedOpportunity
            ? 'The current agency draft has been promoted into the live marketplace and dashboard state.'
            : 'The current agency draft is still editable and waiting for publication.'}
        />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleSummaryPanel items={lifecycleSteps} />
        <LifecycleTimelinePanel title="Lifecycle timeline" />
      </section>

      <section className="content-grid lower-grid">
        <BidFormOverviewPanel formState={publishedBidPreview} />
        <RecommendedOpportunitiesPanel
          title="Suggested opportunities"
          opportunities={recommendedOpportunities}
          actionLabel="Review opportunities"
          onSelectOpportunity={onSelectOpportunity}
          onAction={() => onNavigate('opportunity')}
        />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Opportunity readiness scan</div>
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
        <MilestonesPanel items={milestoneCards} />
        <DraftPipelinePanel title="Current build lanes" items={draftPipelineItems} />
      </section>
    </main>
  )
}
