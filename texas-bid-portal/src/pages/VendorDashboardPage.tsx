import { ActionHeader } from '../components/ActionHeader'
import { EmptyStatePanel } from '../components/EmptyStatePanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
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
import { buildSubmissionActivityItems } from '../utils/submissionActivity'
import { buildSubmissionQueueRowMeta } from '../utils/submissionQueue'

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
    { value: savedOpportunities.length, label: 'Saved opportunities' },
    { value: currentOpportunitySubmissions.length, label: 'Current opportunity submissions' },
    { value: submissions.length, label: 'All submission records' },
    { value: lifecycleMetrics.vendorProfileCompleteness, label: 'Profile completeness' },
  ]
  const activeSubmission = submissions.find((submission) => submission.id === selectedSubmissionId)
    ?? submissions.find((submission) => submission.opportunityId === currentOpportunity.id)
    ?? null
  const rowMetaBySubmissionId = buildSubmissionQueueRowMeta({
    submissions: currentOpportunitySubmissions,
    selectedSubmissionId: selectedSubmissionId ?? undefined,
    mode: 'vendor',
  })
  const activeSubmissionLabel = activeSubmission
    ? rowMetaBySubmissionId[activeSubmission.id]?.activeLabel ?? `${activeSubmission.vendor} · ${activeSubmission.id}`
    : 'new unsaved response'
  const draftRowSummary = activeSubmission
    ? `Active saved row: ${rowMetaBySubmissionId[activeSubmission.id]?.activeLabel ?? activeSubmission.id}. Current opportunity has ${currentOpportunitySubmissions.length} total response rows.`
    : `No saved active row selected. Starting now will create response ${currentOpportunitySubmissions.length + 1}.`
  const bufferModelSummary = `${draftSummary.bufferLabel} • ${draftSummary.preservedUnsavedDraftLabel}`
  const vendorActivityItems = buildSubmissionActivityItems({
    submissions: displayedSubmissions,
    allSubmissions: submissions,
    selectedSubmissionId,
    currentOpportunityId: currentOpportunity.id,
    mode: 'vendor',
    readinessByOpportunityId,
  })

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
        eyebrow="Vendor workspace"
        title="Vendor dashboard"
        intro="A cleaner Texas-first workspace where vendors can track saved bids, monitor active responses, and see what to pursue next without portal confusion."
        actions={
          <>
            <button className="ghost" onClick={() => onNavigate('vendor-dashboard')}>Update Profile</button>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Find Opportunities</button>
          </>
        }
      />

      <PrimaryActionStrip
        title="Vendor priorities"
        description={`Keep the active bid pipeline moving from qualification into submission and tracking. Current opportunity has ${currentOpportunitySubmissions.length} response row${currentOpportunitySubmissions.length === 1 ? '' : 's'}; active row: ${activeSubmissionLabel}.`}
        actions={
          <>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Find opportunities</button>
            <button className="ghost" onClick={() => onNavigate('submission-workflow')}>
              {activeSubmission ? `Continue ${activeSubmission.id}` : 'Continue submission'}
            </button>
            <button className="ghost" onClick={() => {
              onStartNewSubmission()
              onNavigate('submission-workflow')
            }}>Start response {currentOpportunitySubmissions.length + 1}</button>
            <button className="ghost" onClick={() => onNavigate('opportunity')}>Review packet</button>
          </>
        }
      />

      <MarketplaceStatsSnapshot items={vendorStatsItems} />

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Saved opportunities</div>
          <OpportunityCardList
            opportunities={savedOpportunities}
            statusClassMap={statusClass}
            metaFormatter={(opportunity) => `${opportunity.agency} • ${opportunity.location}`}
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
        <OutcomeSummaryPanel mode="vendor" />
        <OutcomeSummaryPanel
          mode="vendor"
          overrideTitle="Vendor row context"
          overrideSummary={draftRowSummary}
        />
        <OutcomeSummaryPanel
          mode="vendor"
          overrideTitle="Draft vs saved buffer state"
          overrideSummary={bufferModelSummary}
        />

        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Active submissions</div>
              <div className="panel-subtitle">Filter between the selected opportunity and the full vendor queue. Selected row: {activeSubmissionLabel}.</div>
            </div>
            <div className="workflow-actions-list">
              <button className={queueFilter === 'current' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('current')}>Current opportunity</button>
              <button className={queueFilter === 'all' ? 'switch-pill switch-pill-active' : 'switch-pill'} onClick={() => onQueueFilterChange('all')}>All opportunities</button>
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
          title="Selected opportunity + submission context"
          currentOpportunity={currentOpportunity}
          activeSubmission={activeSubmission}
          mode="vendor"
          draftSummary={draftSummary}
        />
        <SubmissionActivityPanel
          title="Submission activity — vendor view"
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

        <SubmissionStatusSnapshot title="Submission status progression" items={submissionStatusItems} />
      </section>

      <section className="content-grid lower-grid">
        <StatusProgressionPanel title="Submission lifecycle" steps={submissionLifecycle} />

        <RecommendedOpportunitiesPanel
          opportunities={recommendedOpportunities}
          actionLabel="Open recommendations"
          onSelectOpportunity={onSelectOpportunity}
          onAction={() => onNavigate('opportunity')}
        />
      </section>

      <section className="content-grid lower-grid">
        <VendorSubmissionPacketPanel />
      </section>
    </main>
  )
}
