import { AwardHistoryPanel } from '../components/AwardHistoryPanel'
import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { DetailActionsStrip } from '../components/DetailActionsStrip'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityRequirementsPanel } from '../components/OpportunityRequirementsPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { SelectionReadinessSummaryPanel } from '../components/SelectionReadinessSummaryPanel'
import { bidPacketDocuments } from '../data/formState'
import { opportunities, statusClass } from '../data/mockData'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'

const opportunityRequirementItems = [
  'Review solicitation documents and pricing sheet',
  'Confirm vendor qualification and insurance readiness',
  'Prepare pricing response and service notes',
  'Upload required attachments before deadline',
  'Submit directly through the platform',
] as const

const evaluationPoints = [
  'Check whether the scope and service area fit the contractor before moving deeper.',
  'Use trust and qualification signals to reduce bad-fit outreach early.',
  'Push the customer toward a clean next step: save, compare, or open bid review.',
] as const

const opportunityLaunchPoints = [
  'The selected job feels real enough to imagine hiring through instead of reading like generic placeholder copy.',
  'Trust and fit reduce uncertainty before the customer opens the comparison workspace.',
  'The page makes the next move obvious: review trust, compare bids, or save this match and keep browsing.',
] as const

const decisionBridgeSteps = [
  'Confirm the job is still a real fit for scope, timing, and service area.',
  'Use trust and qualification signals to reduce hesitation before comparison starts.',
  'Move straight into bid review with the same selected job and no context reset.',
] as const

type OpportunityDetailPageProps = {
  opportunity: Opportunity
  submissionQueue: Submission[]
  onSelectSubmission: (submission: Submission) => void
  onStartNewSubmission: () => void
  onNavigate: (view: ViewKey) => void
}

export function OpportunityDetailPage({ opportunity, submissionQueue, onSelectSubmission, onStartNewSubmission, onNavigate }: OpportunityDetailPageProps) {
  const matchingSubmissions = submissionQueue.filter((submission) => submission.opportunityId === opportunity.id)
  const activeSubmission = matchingSubmissions[0]
  const nextResponseNumber = matchingSubmissions.length + 1
  const awardHistoryItems = opportunities
    .filter((item) => item.status === 'awarded')
    .map((item) => ({
      title: item.title,
      detail: item.agency,
    }))

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Marketplace</div>
          <h1>{opportunity.title}</h1>
          <p className="intro">
            A cleaner bid-detail page that shows vendors the real opportunity, source context, requirements, files, and next actions without sending them through a confusing portal maze.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('vendor-dashboard')}>Save Opportunity</button>
          <button className="primary" onClick={() => {
            if (activeSubmission) {
              onSelectSubmission(activeSubmission)
            }
            onNavigate('submission-workflow')
          }}>
            {activeSubmission ? `Continue ${activeSubmission.id}` : 'Start Submission'}
          </button>
          <button className="ghost" onClick={() => {
            onStartNewSubmission()
            if (activeSubmission) {
              onSelectSubmission(activeSubmission)
            }
            onNavigate('submission-workflow')
          }}>
            Start Response {nextResponseNumber}
          </button>
        </div>
      </header>

      <DemoNarrativeCommandBar activeView="opportunity" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div>
          <div className="opportunity-top opportunity-summary-status-row">
            <div />
            <span className={statusClass[opportunity.status]}>{opportunity.status}</span>
          </div>
          <OpportunitySummaryPanel summary={opportunity.summary} />
          <div className="panel" style={{ marginTop: '1rem' }}>
            <div className="panel-title">What to evaluate now</div>
            <div className="draft-list">
              {evaluationPoints.map((point) => (
                <div key={point} className="draft-card">
                  <strong>{point}</strong>
                  <div className="muted">This page drives a decision instead of acting like a passive document shelf.</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="content-grid nested-grid">
          <OpportunityMetadataPanel opportunity={opportunity} />
          <VendorQualificationPanel />
          <OpportunityStatusPanel status="open" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div>
          <div className="panel" style={{ marginBottom: '1rem' }}>
            <div className="panel-title">Decision bridge on this screen</div>
            <div className="draft-list">
              {decisionBridgeSteps.map((step) => (
                <div key={step} className="draft-card">
                  <strong>{step}</strong>
                  <div className="muted">This page exists to turn browsing interest into a real comparison decision.</div>
                </div>
              ))}
            </div>
          </div>
          <OpportunityRequirementsPanel
            items={opportunityRequirementItems}
            note={`This screen makes it immediately obvious what the opportunity is, what matters, and what the customer should do next. Current response rows: ${matchingSubmissions.length}. ${activeSubmission ? `Active row: ${activeSubmission.id}.` : 'No saved response row yet.'}`}
          />
          <SelectionReadinessSummaryPanel submissions={matchingSubmissions} />
          <DetailActionsStrip
            secondaryLabel="Review trust before comparing"
            primaryLabel={activeSubmission ? `Continue ${activeSubmission.id}` : 'Open bid review'}
            onSecondaryAction={() => onNavigate('trust-center')}
            onPrimaryAction={() => {
              if (activeSubmission) {
                onSelectSubmission(activeSubmission)
              }
              onNavigate('submission-workflow')
            }}
          />
          <div className="dashboard-note" style={{ marginTop: '0.85rem' }}>
            This is the decision bridge: once fit is clear, the user should either validate trust or move directly into the same bid-review flow without losing the selected job context.
          </div>
        </div>

        <OpportunityDocumentsPanel documents={bidPacketDocuments} />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Decision readiness</div>
          <h2>Make the selected opportunity feel hiring-ready</h2>
          <div className="draft-list">
            {opportunityLaunchPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This detail page should convert marketplace interest into a confident next move.</div>
              </div>
            ))}
          </div>
        </div>
        <LifecycleTimelinePanel />
        <AwardHistoryPanel title="Related award history" items={awardHistoryItems} />
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Decision move"
          title="Turn opportunity review into a trust-aware comparison decision"
          description="Once fit and requirements are clear, the product makes the next step binary and obvious: validate trust if needed or continue directly into bid comparison with the same selected job."
          note={`Current response rows: ${matchingSubmissions.length}. ${activeSubmission ? `Active row ready: ${activeSubmission.id}.` : 'No saved response row yet — review trust, then open the first one now.'}`}
          actionLabel="Continue into trust check"
          onAction={() => onNavigate('trust-center')}
        />
      </section>
    </main>
  )
}
