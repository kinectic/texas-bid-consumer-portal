import { DraftPipelinePanel } from '../components/DraftPipelinePanel'
import { HomeCtaPanel } from '../components/HomeCtaPanel'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { RecommendedOpportunitiesPanel } from '../components/RecommendedOpportunitiesPanel'
import { WorkflowMetricsSnapshot } from '../components/WorkflowMetricsSnapshot'
import { WorkflowStageSummary } from '../components/WorkflowStageSummary'
import { lifecycleMetrics } from '../data/metrics'
import { workflowStageLabels } from '../data/workflowStages'
import { opportunities } from '../data/mockData'
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

const workflowMetricsItems = [
  { value: lifecycleMetrics.workflowScreensBuilt, label: 'Interactive workflow screens built' },
  { value: 3, label: 'Core workflow lanes shown in the MVP' },
  { value: 'Texas', label: 'Localized procurement-first product direction' },
]

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
]

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
  onNavigate: (view: ViewKey) => void
}

export function HomeDashboardPage({ publishedBidPreview, onNavigate }: HomeDashboardPageProps) {
  const recommendedOpportunities = opportunities.slice(0, 2)

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
        <PublishedBidSnapshotPanel bid={publishedBidPreview} />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Connected lifecycle summary</div>
          <div className="draft-list">
            {lifecycleSteps.map((step) => (
              <div className="draft-card" key={step.stage}>
                <strong>{step.stage}</strong>
                <div className="muted">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <LifecycleTimelinePanel title="Lifecycle timeline" />
      </section>

      <section className="content-grid lower-grid">
        <div className="content-grid nested-grid">
          <div className="panel">
            <div className="panel-title">Built milestones</div>
            <ol className="flow-list">
              {milestoneCards.map((milestone) => (
                <li key={milestone}>{milestone}</li>
              ))}
            </ol>
          </div>
          <DraftPipelinePanel title="Current build lanes" items={draftPipelineItems} />
        </div>

        <RecommendedOpportunitiesPanel title="Suggested opportunities" opportunities={recommendedOpportunities} actionLabel="Review opportunities" />
      </section>
    </main>
  )
}
