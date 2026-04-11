import { HomeCtaPanel } from '../components/HomeCtaPanel'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { MetricCard } from '../components/MetricCard'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { lifecycleMetrics } from '../data/metrics'
import { workflowStageLabels } from '../data/workflowStages'
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

const milestoneCards = [
  'Marketplace feed and opportunity detail',
  'Agency dashboard and bid creation',
  'Vendor dashboard and submission workflow',
  'Interactive shell navigation across the built prototype',
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

      <section className="stats-grid">
        <MetricCard value={lifecycleMetrics.workflowScreensBuilt} label="Interactive workflow screens built" />
        <MetricCard value={3} label="Core workflow lanes shown in the MVP" />
        <MetricCard value="Texas" label="Localized procurement-first product direction" />
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Workflow landing</div>
          <div className="draft-list">
            {workflowCards.map((card) => (
              <div className="draft-card" key={card.title}>
                <strong>{card.title}</strong>
                <div className="muted">{card.description}</div>
                <div className="muted">Stage: {workflowStageLabels[card.key].stage} · Owner: {workflowStageLabels[card.key].owner}</div>
              </div>
            ))}
          </div>
        </div>

        <OutcomeSummaryPanel mode="shared" />
      </section>

      <section className="content-grid lower-grid">
        <HomeCtaPanel onNavigate={onNavigate} />
        <div className="panel">
          <div className="panel-title">Published bid snapshot</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>{publishedBidPreview.title}</strong>
              <div className="muted">Category: {publishedBidPreview.category}</div>
              <div className="muted">Deadline: {publishedBidPreview.deadline}</div>
            </div>
            <div className="draft-card">
              <strong>Scope preview</strong>
              <div className="muted">{publishedBidPreview.scope}</div>
            </div>
            <div className="draft-card">
              <strong>Requirements preview</strong>
              <div className="muted">{publishedBidPreview.requirements}</div>
            </div>
          </div>
        </div>
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
        <div className="panel">
          <div className="panel-title">Built milestones</div>
          <ol className="flow-list">
            {milestoneCards.map((milestone) => (
              <li key={milestone}>{milestone}</li>
            ))}
          </ol>
        </div>

        <div className="panel">
          <div className="panel-title">Consistent next move</div>
          <div className="draft-card">
            <strong>Follow the workflow actions bar</strong>
            <div className="muted">Every major screen now pushes toward the next practical procurement step instead of leaving the user guessing.</div>
          </div>
        </div>
      </section>
    </main>
  )
}
