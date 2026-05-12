import { ActionHeader } from '../components/ActionHeader'
import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import { CustomerShortlistSummaryPanel } from '../components/CustomerShortlistSummaryPanel'
import { ComparisonCriteriaSnapshot } from '../components/ComparisonCriteriaSnapshot'
import { CustomerDecisionTimelinePanel } from '../components/CustomerDecisionTimelinePanel'
import { ContractorComparisonPanel } from '../components/ContractorComparisonPanel'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { OutcomeSummaryPanel } from '../components/OutcomeSummaryPanel'
import { PrimaryActionStrip } from '../components/PrimaryActionStrip'
import { RecommendedOpportunitiesPanel } from '../components/RecommendedOpportunitiesPanel'
import { RoleModeSummaryPanel } from '../components/RoleModeSummaryPanel'
import { SelectionContextPanel } from '../components/SelectionContextPanel'
import { StatusProgressionPanel } from '../components/StatusProgressionPanel'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { SubmissionQueueList } from '../components/SubmissionQueueList'
import { SubmissionStatusSnapshot } from '../components/SubmissionStatusSnapshot'
import { VendorQualificationPanel } from '../components/VendorQualificationPanel'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { lifecycleMetrics } from '../data/metrics'
import { opportunities, statusClass } from '../data/mockData'
import { submissionLifecycle, submissionStatusSummary } from '../data/submissionStatus'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import {
  buildSubmissionActivityItems,
  buildSubmissionQueueRowMeta,
  presentVendorActiveSubmissionLabel,
  presentVendorQueueSubtitle,
  presentVendorRowSummary,
} from '../utils/vendorLane'
import { shellContent } from '../utils/shellContent'

const submissionStatusItems = [
  submissionStatusSummary.draft,
  submissionStatusSummary.received,
  submissionStatusSummary.reviewing,
  submissionStatusSummary.shortlisted,
]

type VendorDashboardPageProps = {
  currentOpportunity: Opportunity
  submissions: Submission[]
  selectedSubmissionId: string | null
  draftSummary: {
    formStatus: string
    attachedCount: number
    totalDocuments: number
    submissionStatus: string
    bufferLabel: string
    preservedUnsavedDraftLabel: string
  }
  readinessByOpportunityId: Record<string, { label: string, detail: string }>
  queueFilter: 'current' | 'all'
  onQueueFilterChange: (filter: 'current' | 'all') => void
  onSelectOpportunity: (opportunity: Opportunity) => void
  onSelectSubmission: (submission: Submission) => void
  onStartNewSubmission: () => void
  onNavigate: (view: ViewKey) => void
}

export function VendorDashboardPage({ currentOpportunity, submissions, selectedSubmissionId, draftSummary, readinessByOpportunityId, queueFilter, onQueueFilterChange, onSelectOpportunity, onSelectSubmission, onStartNewSubmission, onNavigate }: VendorDashboardPageProps) {
  const savedOpportunities = [
    currentOpportunity,
    ...opportunities.filter((opportunity) => opportunity.status === 'open' && opportunity.id !== currentOpportunity.id),
  ]
  const recommendedOpportunities = [
    currentOpportunity,
    ...opportunities.filter((opportunity) => opportunity.id !== currentOpportunity.id),
  ].slice(0, 2)
  const currentOpportunitySubmissions = submissions.filter((submission) => submission.opportunityId === currentOpportunity.id)
  const displayedSubmissions = queueFilter === 'current'
    ? currentOpportunitySubmissions
    : [
        ...currentOpportunitySubmissions,
        ...submissions.filter((submission) => submission.opportunityId !== currentOpportunity.id),
      ]
  const vendorStatsItems = [
    { value: savedOpportunities.length, label: shellContent.vendorStats.savedOpportunities },
    { value: currentOpportunitySubmissions.length, label: shellContent.vendorStats.currentOpportunitySubmissions },
    { value: submissions.length, label: shellContent.vendorStats.allSubmissionRecords },
    { value: lifecycleMetrics.vendorProfileCompleteness, label: shellContent.vendorStats.profileCompleteness },
  ]
  const activeSubmission = submissions.find((submission) => submission.id === selectedSubmissionId)
    ?? submissions.find((submission) => submission.opportunityId === currentOpportunity.id)
    ?? null
  const rowMetaBySubmissionId = buildSubmissionQueueRowMeta({
    submissions: currentOpportunitySubmissions,
    selectedSubmissionId: selectedSubmissionId ?? undefined,
    mode: 'vendor',
  })
  const activeSubmissionLabel = presentVendorActiveSubmissionLabel(
    activeSubmission,
    activeSubmission ? rowMetaBySubmissionId[activeSubmission.id] : null,
  )
  const draftRowSummary = presentVendorRowSummary(
    activeSubmission,
    activeSubmission ? rowMetaBySubmissionId[activeSubmission.id] : null,
    currentOpportunitySubmissions.length,
  )
  const bufferModelSummary = `${draftSummary.bufferLabel} • ${draftSummary.preservedUnsavedDraftLabel}`
  const vendorActivityItems = buildSubmissionActivityItems({
    submissions: displayedSubmissions,
    allSubmissions: submissions,
    selectedSubmissionId,
    currentOpportunityId: currentOpportunity.id,
    mode: 'vendor',
    readinessByOpportunityId,
  })
  const decisionFlowPoints = [
    `Active job: keep ${currentOpportunity.title} as the hiring center of gravity.`,
    `Incoming bids in focus: ${currentOpportunitySubmissions.length}.`,
    activeSubmission ? `Current best next step: review ${activeSubmission.id}, narrow the shortlist, and move toward selection.` : 'Current best next step: open bid review, compare contractor responses, and start building a shortlist.',
  ]

  const selectOpportunityFromSubmission = (submission: Submission) => {
    onSelectSubmission(submission)
    const matchingOpportunity = savedOpportunities.find((opportunity) => opportunity.id === submission.opportunityId)
      ?? opportunities.find((opportunity) => opportunity.id === submission.opportunityId)

    if (matchingOpportunity) {
      onSelectOpportunity(matchingOpportunity)
      onNavigate('submission-workflow')
    }
  }

  return (
    <main className="main">
      <ActionHeader
        eyebrow="Customer workspace"
        title="My jobs dashboard"
        intro="A cleaner Texas-first customer workspace where posted jobs, incoming contractor bids, and next hiring steps stay attached to one job record instead of scattering across generic vendor views."
        actions={
          <>
            <button className="ghost" onClick={() => onNavigate('vendor-dashboard')}>Open my jobs</button>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Compare trusted contractors</button>
          </>
        }
      />

      <PrimaryActionStrip
        title="Customer priorities"
        description={`Track the active job, compare ${currentOpportunitySubmissions.length} incoming bid${currentOpportunitySubmissions.length === 1 ? '' : 's'}, and keep the shortlist moving without losing the message trail.`}
        actions={
          <>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Compare trusted contractors</button>
            <button className="ghost" onClick={() => onNavigate('submission-workflow')}>
              {activeSubmission ? `Shortlist ${activeSubmission.id}` : 'Review bids'}
            </button>
            <button className="ghost" onClick={() => {
              onStartNewSubmission()
              onNavigate('submission-workflow')
            }}>Post another job</button>
            <button className="ghost" onClick={() => onNavigate('messages')}>Open messages</button>
          </>
        }
      />

      <MarketplaceStatsSnapshot items={vendorStatsItems} />

      <DemoNarrativeCommandBar activeView="vendor-dashboard" onNavigate={onNavigate} compact />

      <div className="workflow-actions">
        <div className="panel-header">
          <div>
            <div className="eyebrow">Workspace handoff</div>
            <div className="panel-title">My Jobs should bridge comparison, negotiation, and final selection</div>
          </div>
          <span className="status status-review">Decision lane</span>
        </div>
        <p className="action-strip-copy">
          This workspace should keep one continuous customer decision lane: incoming bids, shortlist pressure, message follow-up, and the final move into hire.
        </p>
      </div>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Saved opportunities</div>
          <div className="draft-list" style={{ marginBottom: '1rem' }}>
            {decisionFlowPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This dashboard should keep the customer moving toward a hiring decision instead of acting like a generic inbox.</div>
              </div>
            ))}
          </div>
          <OpportunityCardList
            opportunities={savedOpportunities}
            statusClassMap={statusClass}
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

        <div className="content-grid nested-grid">
          <RoleModeSummaryPanel mode="vendor" />
          <VendorQualificationPanel />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <OutcomeSummaryPanel
          mode="vendor"
          overrideTitle="Customer hiring outcome"
          overrideSummary="Keep every bid, message, and next action tied to the active job so the customer can compare confidently and hire without losing context."
        />
        <OutcomeSummaryPanel
          mode="vendor"
          overrideTitle="Job bid context"
          overrideSummary={draftRowSummary}
        />
        <OutcomeSummaryPanel
          mode="vendor"
          overrideTitle="Draft vs saved bid state"
          overrideSummary={bufferModelSummary}
        />

        <ContractorComparisonPanel
          submissions={displayedSubmissions}
          selectedSubmissionId={selectedSubmissionId}
          onSelectSubmission={selectOpportunityFromSubmission}
        />

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Incoming contractor bids</div>
              <div className="panel-subtitle">{presentVendorQueueSubtitle(activeSubmissionLabel)}</div>
            </div>
            <div className="workflow-actions-list">
              <button className={queueFilter === 'current' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('current')}>Current job</button>
              <button className={queueFilter === 'all' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('all')}>All jobs</button>
            </div>
          </div>
          <SubmissionQueueList
            submissions={displayedSubmissions}
            mode="vendor"
            currentOpportunityId={currentOpportunity.id}
            selectedSubmissionId={selectedSubmissionId ?? undefined}
            onSelectSubmission={selectOpportunityFromSubmission}
          />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title="Selected job + bid context"
          currentOpportunity={currentOpportunity}
          activeSubmission={activeSubmission}
          mode="vendor"
          draftSummary={draftSummary}
          responseRowCount={currentOpportunitySubmissions.length}
          activeRowLabel={activeSubmission ? rowMetaBySubmissionId[activeSubmission.id]?.rowLabel : 'Unsaved draft lane'}
        />
        <CustomerShortlistSummaryPanel
          submissions={currentOpportunitySubmissions}
          selectedSubmissionId={selectedSubmissionId}
          onSelectSubmission={selectOpportunityFromSubmission}
        />
        <ComparisonCriteriaSnapshot
          opportunityTitle={currentOpportunity.title}
          activeVendor={activeSubmission?.vendor ?? null}
        />
        <SubmissionActivityPanel
          title="Bid activity — customer view"
          items={vendorActivityItems}
          currentOpportunityId={currentOpportunity.id}
          selectedSubmissionId={selectedSubmissionId ?? undefined}
          onSelectSubmission={(opportunityId, submissionId) => {
            const matchingOpportunity = savedOpportunities.find((opportunity) => opportunity.id === opportunityId)
              ?? opportunities.find((opportunity) => opportunity.id === opportunityId)
            const matchingSubmission = submissionId
              ? submissions.find((submission) => submission.id === submissionId)
              : null

            if (matchingSubmission) {
              onSelectSubmission(matchingSubmission)
            }

            if (matchingOpportunity) {
              onSelectOpportunity(matchingOpportunity)
              onNavigate('submission-workflow')
            }
          }}
        />
      </section>

      <section className="content-grid lower-grid">
        <EmptyStatePanel mode="vendor" />

        <SubmissionStatusSnapshot title="Bid status progression" items={submissionStatusItems} />
      </section>

      <section className="content-grid lower-grid">
        <StatusProgressionPanel title="Hiring lifecycle" steps={submissionLifecycle} />

        <CustomerDecisionTimelinePanel
          currentBidCount={currentOpportunitySubmissions.length}
          shortlistedCount={currentOpportunitySubmissions.filter((submission) => submission.status === 'shortlisted').length}
        />

        <RecommendedOpportunitiesPanel
          opportunities={recommendedOpportunities}
          actionLabel="Compare matching contractors"
          onSelectOpportunity={onSelectOpportunity}
          onAction={() => onNavigate('opportunity')}
        />
      </section>

      <section className="content-grid lower-grid">
        <VendorSubmissionPacketPanel />
      </section>

      <section className="content-grid lower-grid">
        <PrimaryActionStrip
          title="Keep the hiring pipeline moving"
          description={`Use the customer workspace to stay inside one loop: monitor ${currentOpportunitySubmissions.length} incoming bid${currentOpportunitySubmissions.length === 1 ? '' : 's'}, reopen comparison fast, build the shortlist, and push the next contractor decision without losing thread context.`}
          actions={
            <>
              <button className="primary" onClick={() => onNavigate('submission-workflow')}>
                {activeSubmission ? `Advance ${activeSubmission.id}` : 'Open bid review'}
              </button>
              <button className="ghost" onClick={() => onNavigate('messages')}>Open job messages</button>
              <button className="ghost" onClick={() => onNavigate('marketplace')}>Compare more contractors</button>
            </>
          }
        />
      </section>
    </main>
  )
}
