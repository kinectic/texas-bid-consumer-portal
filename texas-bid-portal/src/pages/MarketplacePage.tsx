import { AgencyFlowPanel } from '../components/AgencyFlowPanel'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { SectionIntro } from '../components/SectionIntro'
import { StatusBadgeLegend } from '../components/StatusBadgeLegend'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { WorkflowFilterStrip } from '../components/WorkflowFilterStrip'
import type { CreateBidFormState } from '../types/forms'
import { opportunities, statusClass, vendorSubmissions } from '../data/mockData'

const marketplaceStatsItems = [
  { value: '2,092+', label: 'Texas opportunities visible in ecosystem research' },
  { value: 3, label: 'Core workflows shown in this prototype' },
  { value: 1, label: 'Texas-first experience instead of generic procurement clutter' },
]

const agencyFlowSteps = [
  'Create agency profile',
  'Draft solicitation with deadlines and attachments',
  'Publish to Texas marketplace',
  'Review vendor responses in one dashboard',
] as const

type MarketplacePageProps = {
  publishedBidPreview: CreateBidFormState
}

export function MarketplacePage({ publishedBidPreview }: MarketplacePageProps) {
  const highlighted = opportunities[0]
  const previewOpportunity = {
    ...highlighted,
    title: publishedBidPreview.title,
    category: publishedBidPreview.category,
    dueDate: publishedBidPreview.deadline,
    summary: publishedBidPreview.scope,
  }

  const marketplaceFeed = [previewOpportunity, ...opportunities.slice(1)]
  const submissionActivityItems = vendorSubmissions.map((submission) => ({
    title: submission.vendor,
    detail: `${submission.opportunity} • Submitted ${submission.submittedAt}`,
  }))

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Product prototype</div>
          <h1>Texas procurement, without the ugly parts.</h1>
          <p className="intro">
            A structured Texas-first portal where government agencies can post opportunities and vendors can discover and submit directly.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Vendor Sign In</button>
          <button className="primary">Post a Bid</button>
        </div>
      </header>

      <MarketplaceStatsSnapshot items={marketplaceStatsItems} />

      <section className="content-grid">
        <div className="panel marketplace-panel">
          <SectionIntro
            eyebrow="Vendor discovery"
            title="Marketplace feed"
            description="What vendors see when they browse live opportunities and decide which bid deserves action next."
          />
          <WorkflowFilterStrip title="Marketplace filters" filters={['All', 'Open', 'Facilities', 'Professional']} activeIndex={0} />

          <PublishedBidSnapshotPanel title="Published bid preview sync" bid={publishedBidPreview} />

          <OpportunityCardList
            opportunities={marketplaceFeed}
            statusClassMap={statusClass}
            metaFormatter={(opportunity) => `${opportunity.agency} • ${opportunity.location} • ${opportunity.category}`}
          />
        </div>

        <div className="content-grid nested-grid">
          <OpportunityMetadataPanel opportunity={previewOpportunity} title="Marketplace metadata" />
          <OpportunityStatusPanel status="open" />
          <StatusBadgeLegend title="Marketplace status legend" />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel detail-panel">
          <SectionIntro
            eyebrow="Qualification"
            title="Opportunity detail"
            description="The focused opportunity view vendors use when deciding whether to move into the submission workflow."
          />
          <h2>{previewOpportunity.title}</h2>
          <OpportunitySummaryPanel
            title="Opportunity summary"
            subtitle="Focused vendor-facing summary before moving into the submission workflow."
            summary={previewOpportunity.summary}
          />
          <OpportunityDocumentsPanel
            documents={previewOpportunity.documents.map((name) => ({ name, status: 'Open' }))}
            title="Opportunity documents"
          />
          <div className="detail-actions">
            <button className="ghost">Save Opportunity</button>
            <button className="primary">Submit Response</button>
          </div>
        </div>

        <AgencyFlowPanel
          description="The simplified drafting-to-publish path that turns agency inputs into a vendor-visible opportunity."
          steps={agencyFlowSteps}
        />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionActivityPanel title="Submission workspace" items={submissionActivityItems} />
        <FinalActionPanel
          eyebrow="Vendor action"
          title="Ready to respond"
          description="Move from marketplace review into a direct submission flow without leaving the product."
          note="This is the product promise: discover, qualify, and act in one clearer Texas-first procurement surface."
          actionLabel="Open submission workflow"
        />
      </section>
    </main>
  )
}
