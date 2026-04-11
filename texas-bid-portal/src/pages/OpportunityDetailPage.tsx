import { AwardHistoryPanel } from '../components/AwardHistoryPanel'
import { DetailActionsStrip } from '../components/DetailActionsStrip'
import { LifecycleTimelinePanel } from '../components/LifecycleTimelinePanel'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityRequirementsPanel } from '../components/OpportunityRequirementsPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { bidPacketDocuments } from '../data/formState'
import { opportunities, selectedOpportunity, statusClass } from '../data/mockData'
import type { Submission } from '../types'
import type { ViewKey } from '../data/viewData'

const opportunityRequirementItems = [
  'Review solicitation documents and pricing sheet',
  'Confirm vendor qualification and insurance readiness',
  'Prepare pricing response and service notes',
  'Upload required attachments before deadline',
  'Submit directly through the platform',
] as const

type OpportunityDetailPageProps = {
  publishedOpportunity: typeof selectedOpportunity | null
  submissionQueue: Submission[]
  onNavigate: (view: ViewKey) => void
}

export function OpportunityDetailPage({ publishedOpportunity, submissionQueue, onNavigate }: OpportunityDetailPageProps) {
  const opportunity = publishedOpportunity ?? selectedOpportunity
  const activeSubmission = submissionQueue.find((submission) => submission.opportunity === opportunity.title)
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
          <button className="primary" onClick={() => onNavigate('submission-workflow')}>
            {activeSubmission ? 'Continue Submission' : 'Start Submission'}
          </button>
        </div>
      </header>

      <section className="content-grid">
        <div>
          <div className="opportunity-top opportunity-summary-status-row">
            <div />
            <span className={statusClass[opportunity.status]}>{opportunity.status}</span>
          </div>
          <OpportunitySummaryPanel summary={opportunity.summary} />
        </div>

        <div className="content-grid nested-grid">
          <OpportunityMetadataPanel opportunity={opportunity} />
          <VendorQualificationPanel />
          <OpportunityStatusPanel status="open" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div>
          <OpportunityRequirementsPanel
            items={opportunityRequirementItems}
            note="This screen should make it immediately obvious what the opportunity is, what matters, and what the vendor should do next."
          />
          <DetailActionsStrip
            secondaryLabel="Save Opportunity"
            primaryLabel={activeSubmission ? 'Continue Submission' : 'Start Submission'}
            onSecondaryAction={() => onNavigate('vendor-dashboard')}
            onPrimaryAction={() => onNavigate('submission-workflow')}
          />
        </div>

        <OpportunityDocumentsPanel documents={bidPacketDocuments} />
      </section>

      <section className="content-grid lower-grid">
        <LifecycleTimelinePanel />
        <AwardHistoryPanel title="Related award history" items={awardHistoryItems} />
      </section>
    </main>
  )
}
