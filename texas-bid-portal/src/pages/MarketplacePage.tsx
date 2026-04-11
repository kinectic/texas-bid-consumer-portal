import { AgencyFlowPanel } from '../components/AgencyFlowPanel'
import { DetailActionsStrip } from '../components/DetailActionsStrip'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { SelectionContextPanel } from '../components/SelectionContextPanel'
import { SectionIntro } from '../components/SectionIntro'
import { StatusBadgeLegend } from '../components/StatusBadgeLegend'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { WorkflowFilterStrip } from '../components/WorkflowFilterStrip'
import type { CreateBidFormState } from '../types/forms'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import { opportunities, statusClass } from '../data/mockData'
import { buildSubmissionActivityItems } from '../utils/submissionActivity'
import { agencyFlowSteps, marketplaceCopy, marketplaceStatsItems } from '../utils/marketplaceContent'

type MarketplacePageProps = {
  publishedBidPreview: CreateBidFormState
  publishedOpportunity: Opportunity | null
  currentOpportunity: Opportunity
  readinessByOpportunityId: Record<string, { label: string, detail: string }>
  submissions: Submission[]
  onSelectOpportunity: (opportunity: Opportunity) => void
  onSelectSubmission: (submission: Submission) => void
  onNavigate: (view: ViewKey) => void
}

export function MarketplacePage({
  publishedBidPreview,
  publishedOpportunity,
  currentOpportunity,
  readinessByOpportunityId,
  submissions,
  onSelectOpportunity,
  onSelectSubmission,
  onNavigate,
}: MarketplacePageProps) {
  const previewOpportunity = publishedOpportunity && currentOpportunity.id === publishedOpportunity.id
    ? currentOpportunity
    : currentOpportunity ?? {
        ...(publishedOpportunity ?? opportunities[0]),
        title: publishedBidPreview.title,
        category: publishedBidPreview.category,
        dueDate: publishedBidPreview.deadline,
        summary: publishedBidPreview.scope,
      }

  const highlighted = previewOpportunity
  const marketplaceFeed = [
    highlighted,
    ...opportunities.filter((opportunity) => opportunity.id !== highlighted.id),
  ]
  const activeSubmission = submissions.find((submission) => submission.opportunityId === previewOpportunity.id)
  const submissionActivityItems = buildSubmissionActivityItems({
    submissions,
    allSubmissions: submissions,
    selectedSubmissionId: activeSubmission?.id,
    currentOpportunityId: previewOpportunity.id,
    mode: 'vendor',
    readinessByOpportunityId,
  })

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">{marketplaceCopy.eyebrow}</div>
          <h1>{marketplaceCopy.title}</h1>
          <p className="intro">{marketplaceCopy.intro}</p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('vendor-dashboard')}>{marketplaceCopy.vendorSignInLabel}</button>
          <button className="primary" onClick={() => onNavigate('create-bid')}>{marketplaceCopy.postBidLabel}</button>
        </div>
      </header>

      <MarketplaceStatsSnapshot items={[...marketplaceStatsItems]} />

      <section className="content-grid">
        <div className="panel marketplace-panel">
          <SectionIntro
            eyebrow={marketplaceCopy.marketplaceFeedEyebrow}
            title={marketplaceCopy.marketplaceFeedTitle}
            description={marketplaceCopy.marketplaceFeedDescription}
          />
          <WorkflowFilterStrip title={marketplaceCopy.marketplaceFiltersTitle} filters={[...marketplaceCopy.marketplaceFilters]} activeIndex={0} />

          <PublishedBidSnapshotPanel
            title="Published bid preview sync"
            bid={publishedBidPreview}
            statusLabel={publishedOpportunity ? 'Published' : 'Draft only'}
            note={publishedOpportunity
              ? 'This solicitation is live in the marketplace feed and now behaves like an active opportunity.'
              : 'This solicitation is still draft-only. Publish it from the agency workflow to move it into the live marketplace feed.'}
          />

          <OpportunityCardList
            opportunities={marketplaceFeed}
            statusClassMap={statusClass}
            metaFormatter={(opportunity) => `${opportunity.agency} • ${opportunity.location} • ${opportunity.category}`}
            role="vendor"
            readinessByOpportunityId={readinessByOpportunityId}
            selectedOpportunityId={previewOpportunity.id}
            onSelectOpportunity={(opportunity) => {
              onSelectOpportunity(opportunity)
              onNavigate('opportunity')
            }}
          />
        </div>

        <div className="content-grid nested-grid">
          <OpportunityMetadataPanel opportunity={previewOpportunity} title={marketplaceCopy.metadataTitle} />
          <OpportunityStatusPanel status="open" />
          <StatusBadgeLegend title={marketplaceCopy.legendTitle} />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel detail-panel">
          <SectionIntro
            eyebrow={marketplaceCopy.detailEyebrow}
            title={marketplaceCopy.detailTitle}
            description={marketplaceCopy.detailDescription}
          />
          <h2>{previewOpportunity.title}</h2>
          <OpportunitySummaryPanel
            title={marketplaceCopy.detailSummaryTitle}
            subtitle={marketplaceCopy.detailSummarySubtitle}
            summary={previewOpportunity.summary}
          />
          <OpportunityDocumentsPanel
            documents={previewOpportunity.documents.map((name) => ({ name, status: 'Open' }))}
            title={marketplaceCopy.detailDocumentsTitle}
          />
          <DetailActionsStrip
            secondaryLabel="Save Opportunity"
            primaryLabel={activeSubmission ? 'Continue Submission' : 'Submit Response'}
            onSecondaryAction={() => onNavigate('vendor-dashboard')}
            onPrimaryAction={() => onNavigate('submission-workflow')}
          />
        </div>

        <AgencyFlowPanel
          description="The simplified drafting-to-publish path that turns agency inputs into a vendor-visible opportunity."
          steps={agencyFlowSteps}
        />
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title={marketplaceCopy.selectionContextTitle}
          currentOpportunity={previewOpportunity}
          activeSubmission={activeSubmission ?? null}
          mode="vendor"
        />
        <SubmissionActivityPanel
          title={marketplaceCopy.submissionWorkspaceTitle}
          items={submissionActivityItems}
          currentOpportunityId={previewOpportunity.id}
          selectedSubmissionId={activeSubmission?.id}
          onSelectSubmission={(opportunityId, submissionId) => {
            const matchingOpportunity = marketplaceFeed.find((opportunity) => opportunity.id === opportunityId)
            const matchingSubmission = submissionId
              ? submissions.find((submission) => submission.id === submissionId)
              : null
            if (matchingOpportunity) {
              if (matchingSubmission) {
                onSelectSubmission(matchingSubmission)
              }
              onSelectOpportunity(matchingOpportunity)
              onNavigate('submission-workflow')
            }
          }}
        />
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow={marketplaceCopy.vendorActionEyebrow}
          title={marketplaceCopy.vendorActionTitle}
          description={marketplaceCopy.vendorActionDescription}
          note={marketplaceCopy.vendorActionNote}
          actionLabel={activeSubmission ? 'Continue submission workflow' : 'Open submission workflow'}
          onAction={() => onNavigate('submission-workflow')}
        />
      </section>
    </main>
  )
}
