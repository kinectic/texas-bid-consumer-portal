import type { Submission } from '../types'
import type { SubmissionQueueRowMeta } from './submissionQueue'

type DraftSummaryLike = {
  formStatus: string
  attachedCount: number
  totalDocuments: number
}

export function presentVendorActiveSubmissionLabel(
  activeSubmission: Submission | null,
  activeRowMeta?: SubmissionQueueRowMeta | null,
) {
  if (!activeSubmission) {
    return 'new unsaved response'
  }

  return activeRowMeta?.activeLabel ?? `${activeSubmission.vendor} · ${activeSubmission.id}`
}

export function presentVendorRowSummary(
  activeSubmission: Submission | null,
  activeRowMeta: SubmissionQueueRowMeta | null | undefined,
  currentOpportunitySubmissionCount: number,
) {
  if (!activeSubmission) {
    return `No saved active row selected. Starting now will create response ${currentOpportunitySubmissionCount + 1}.`
  }

  return `Active saved row: ${activeRowMeta?.activeLabel ?? activeSubmission.id}. Current opportunity has ${currentOpportunitySubmissionCount} total response rows.`
}

export function presentVendorPrimaryActionDescription(
  currentOpportunitySubmissionCount: number,
  activeSubmissionLabel: string,
) {
  return `Keep the active bid pipeline moving from qualification into submission and tracking. Current opportunity has ${currentOpportunitySubmissionCount} response row${currentOpportunitySubmissionCount === 1 ? '' : 's'}; active row: ${activeSubmissionLabel}.`
}

export function presentVendorQueueSubtitle(activeSubmissionLabel: string) {
  return `Filter between the selected opportunity and the full vendor queue. Selected row: ${activeSubmissionLabel}.`
}

export function presentVendorResponseRowMode(activeSubmission: Submission | null) {
  return activeSubmission ? 'editing existing saved row' : 'drafting a brand-new unsaved row'
}

export function presentVendorSiblingRowItems({
  activeSubmission,
  siblingSubmissions,
  rowMetaBySubmissionId,
  draftSummary,
  onSelectSubmission,
  onStartNewSubmission,
}: {
  activeSubmission: Submission | null
  siblingSubmissions: Submission[]
  rowMetaBySubmissionId: Record<string, SubmissionQueueRowMeta>
  draftSummary: DraftSummaryLike
  onSelectSubmission: (submission: Submission) => void
  onStartNewSubmission: () => void
}) {
  const unsavedDraftHasEdits = draftSummary.formStatus !== 'Untouched default draft' || draftSummary.attachedCount > 0

  return [
    ...(!activeSubmission
      ? [{
          stage: 'Unsaved draft lane',
          detail: `Current draft is not saved as a submission row yet. ${unsavedDraftHasEdits ? 'Unsaved draft edits are preserved for this opportunity.' : 'No draft edits yet; save or submit to create the next response row.'} • active row`,
          active: true,
        }]
      : [{
          stage: `Unsaved draft lane • response ${siblingSubmissions.length + 1}`,
          detail: unsavedDraftHasEdits
            ? `Preserved unsaved draft buffer. ${draftSummary.formStatus} • ${draftSummary.attachedCount}/${draftSummary.totalDocuments} attachments ready.`
            : 'Fresh unsaved draft buffer. Creates a brand-new response row after save or submit.',
          onClick: onStartNewSubmission,
          active: false,
        }]),
    ...siblingSubmissions.map((submission) => ({
      stage: `${rowMetaBySubmissionId[submission.id]?.rowLabel ?? submission.id} • saved row buffer`,
      detail: `${submission.vendor} • ${submission.id} • ${submission.status}${submission.id === activeSubmission?.id ? ' • active row' : ''}`,
      onClick: () => onSelectSubmission(submission),
      active: submission.id === activeSubmission?.id,
    })),
  ]
}
