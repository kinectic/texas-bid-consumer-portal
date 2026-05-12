import type { Submission } from '../types'

type AgencySubmissionReadinessPanelProps = {
  activeSubmission: Submission | null
  packageCompletenessItems: Array<{ title: string; detail: string }>
  draftSummary: {
    formStatus: string
    attachedCount: number
    totalDocuments: number
    submissionStatus: string
    bufferLabel: string
    preservedUnsavedDraftLabel: string
  }
}

function isReadyDetail(detail: string) {
  const normalized = detail.toLowerCase()
  return normalized.includes('ready') || normalized.includes('present') || normalized.includes('captured') || normalized.includes('included')
}

function presentReadinessTone(readyCount: number, totalCount: number) {
  if (readyCount === totalCount) return 'status-live'
  if (readyCount >= Math.max(1, totalCount - 2)) return 'status-review'
  return 'status-planning'
}

export function AgencySubmissionReadinessPanel({
  activeSubmission,
  packageCompletenessItems,
  draftSummary,
}: AgencySubmissionReadinessPanelProps) {
  const readinessItems = [
    {
      title: 'Submission selected',
      ready: Boolean(activeSubmission),
      detail: activeSubmission ? `${activeSubmission.vendor} • ${activeSubmission.id} is attached to this review lane.` : 'No active submission is selected for agency review.',
    },
    {
      title: 'Package attachments',
      ready: draftSummary.attachedCount >= draftSummary.totalDocuments,
      detail: `${draftSummary.attachedCount}/${Math.max(draftSummary.totalDocuments, 1)} required attachments are present in the current packet snapshot.`,
    },
    {
      title: 'Workflow state',
      ready: ['received', 'reviewing', 'shortlisted'].includes(activeSubmission?.status ?? ''),
      detail: activeSubmission ? `${activeSubmission.status} is the current agency-side review state.` : 'No review state is available until a submission is selected.',
    },
    ...packageCompletenessItems.map((item) => ({
      title: item.title,
      ready: isReadyDetail(item.detail),
      detail: item.detail,
    })),
  ]

  const readyCount = readinessItems.filter((item) => item.ready).length
  const readinessTone = presentReadinessTone(readyCount, readinessItems.length)
  const reviewGateSummary = activeSubmission
    ? `${activeSubmission.vendor} is ${activeSubmission.status} with ${readyCount}/${readinessItems.length} readiness checks satisfied.`
    : `No live submission is selected. ${readyCount}/${readinessItems.length} structural checks are currently satisfied.`

  return (
    <div className="panel agency-submission-readiness-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Agency submission readiness</div>
          <div className="panel-title">Agency review gate</div>
          <p className="muted response-builder-intro">
            A compact readiness view showing whether the selected response is structurally ready for agency review decisions.
          </p>
        </div>
        <span className={`status ${readinessTone}`}>{readyCount}/{readinessItems.length} ready</span>
      </div>

      <div className="draft-card agency-readiness-summary-card">
        <strong>Review gate summary</strong>
        <div className="muted">{reviewGateSummary}</div>
        <div className="small-note">Buffer snapshot: {draftSummary.bufferLabel}. Unsaved draft lane: {draftSummary.preservedUnsavedDraftLabel}</div>
      </div>

      <div className="agency-readiness-grid">
        <div className="package-completeness-list">
          {readinessItems.map((item) => (
            <div className="draft-card" key={item.title}>
              <div className="submission-status-snapshot-row">
                <strong>{item.title}</strong>
                <span className={`status ${item.ready ? 'status-live' : 'status-planning'}`}>{item.ready ? 'Ready' : 'Check'}</span>
              </div>
              <div className="muted">{item.detail}</div>
            </div>
          ))}
        </div>

        <div className="draft-card agency-readiness-summary-card">
          <strong>Decision guidance</strong>
          <div className="agency-readiness-guidance-list">
            <div className="muted">• Use this gate before shortlist, clarification, or archive decisions.</div>
            <div className="muted">• Missing attachments or missing packet elements should stay visible before staff action.</div>
            <div className="muted">• Review state should reflect where procurement staff actually are in the lane.</div>
            <div className="muted">• The buffer label helps explain whether the agency is reviewing the latest saved packet snapshot.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
