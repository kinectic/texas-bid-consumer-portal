import type { Submission } from '../types'
import type { SubmissionQueueRowMeta } from './submissionQueue'

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
