import { useMemo, useState } from 'react'
import { DetailActionsStrip } from '../components/DetailActionsStrip'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { MarketplaceJobExplorer } from '../components/MarketplaceJobExplorer'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { SectionIntro } from '../components/SectionIntro'
import { SelectionContextPanel } from '../components/SelectionContextPanel'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { TexasMarketplaceShell } from '../components/TexasMarketplaceShell'
import type { CreateBidFormState } from '../types/forms'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import { opportunities } from '../data/mockData'
import { buildSubmissionActivityItems } from '../utils/submissionActivity'
import { marketplaceStatsItems, presentMarketplacePublishedSnapshotState } from '../utils/shellLane'

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

export function MarketplacePage({ publishedBidPreview, publishedOpportunity, currentOpportunity, readinessByOpportunityId, submissions, onSelectOpportunity, onSelectSubmission, onNavigate }: MarketplacePageProps) {
  const initialOpportunity = publishedOpportunity && currentOpportunity.id === publishedOpportunity.id ? currentOpportunity : currentOpportunity ?? opportunities[0]
  const [selectedOpportunity, setSelectedOpportunity] = useState(initialOpportunity)
  const marketplaceFeed = useMemo(() => [
    ...(publishedOpportunity ? [publishedOpportunity] : []),
    ...opportunities.filter((item) => item.id !== publishedOpportunity?.id),
  ], [publishedOpportunity])
  const activeSubmission = submissions.find((submission) => submission.opportunityId === selectedOpportunity.id)
  const publishedSnapshotState = presentMarketplacePublishedSnapshotState(Boolean(publishedOpportunity))
  const submissionActivityItems = buildSubmissionActivityItems({ submissions, allSubmissions: submissions, selectedSubmissionId: activeSubmission?.id, currentOpportunityId: selectedOpportunity.id, mode: 'vendor', readinessByOpportunityId })

  const selectOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunity(opportunity)
    onSelectOpportunity(opportunity)
  }
  const openOpportunity = (opportunity: Opportunity) => {
    selectOpportunity(opportunity)
    onNavigate('opportunity')
  }

  return <main className="main">
    <TexasMarketplaceShell eyebrow="Texas job marketplace" title="Find local work. Bid with confidence." intro="Search public and private job opportunities by county and city, compare requirements, and move from discovery to a submitted bid in one place." countyLabel={selectedOpportunity.county} cityLabel={selectedOpportunity.city}>
      <div className="top-actions">
        <button className="ghost" onClick={() => onNavigate('consumer-profile')}>Saved jobs</button>
        <button className="primary" onClick={() => onNavigate('contractor-profile')}>Contractor profile</button>
      </div>
    </TexasMarketplaceShell>

    <MarketplaceStatsSnapshot items={[...marketplaceStatsItems]} />

    <section className="panel marketplace-panel">
      <SectionIntro eyebrow="Bid a job" title="Open jobs across Texas" description="Use the map or location filters to find work near you. Select any marker or job card to see its full bid details." />
      <MarketplaceJobExplorer opportunities={marketplaceFeed} selectedOpportunity={selectedOpportunity} readinessByOpportunityId={readinessByOpportunityId} onSelectOpportunity={selectOpportunity} onOpenOpportunity={openOpportunity} />
    </section>

    {publishedOpportunity ? <PublishedBidSnapshotPanel title={publishedSnapshotState.title} bid={publishedBidPreview} statusLabel={publishedSnapshotState.statusLabel} note={publishedSnapshotState.note} /> : null}

    <section className="content-grid lower-grid">
      <div className="panel detail-panel">
        <SectionIntro eyebrow="Selected job" title={selectedOpportunity.title} description={`${selectedOpportunity.agency} · ${selectedOpportunity.location}`} />
        <OpportunitySummaryPanel title="Scope of work" subtitle="Review the project before starting your bid." summary={selectedOpportunity.summary} />
        <OpportunityDocumentsPanel documents={selectedOpportunity.documents.map((name) => ({ name, status: 'Open' }))} title="Bid documents" />
        <DetailActionsStrip secondaryLabel="Review trust standards" primaryLabel={activeSubmission ? 'Continue my bid' : 'Start a bid'} onSecondaryAction={() => onNavigate('trust-center')} onPrimaryAction={() => onNavigate('submission-workflow')} />
      </div>
      <div className="content-grid nested-grid">
        <OpportunityMetadataPanel opportunity={selectedOpportunity} title="Job details" />
        <OpportunityStatusPanel status={selectedOpportunity.status === 'under-review' ? 'reviewing' : selectedOpportunity.status} />
      </div>
    </section>

    <section className="content-grid lower-grid">
      <SelectionContextPanel title="Your current job" currentOpportunity={selectedOpportunity} activeSubmission={activeSubmission ?? null} mode="vendor" />
      <SubmissionActivityPanel title="My bid activity" items={submissionActivityItems} currentOpportunityId={selectedOpportunity.id} selectedSubmissionId={activeSubmission?.id} onSelectSubmission={(opportunityId, submissionId) => {
        const opportunity = marketplaceFeed.find((item) => item.id === opportunityId)
        const submission = submissions.find((item) => item.id === submissionId)
        if (opportunity) selectOpportunity(opportunity)
        if (submission) onSelectSubmission(submission)
        onNavigate('submission-workflow')
      }} />
    </section>

    <FinalActionPanel eyebrow="Ready to compete?" title={`Build your bid for ${selectedOpportunity.city ?? selectedOpportunity.location}`} description="Review the documents, confirm your business details, and submit a clear, competitive response before the deadline." note={`Due ${selectedOpportunity.dueDate} · ${selectedOpportunity.agency}`} actionLabel={activeSubmission ? 'Continue my bid' : 'Start this bid'} onAction={() => onNavigate('submission-workflow')} />
  </main>
}
