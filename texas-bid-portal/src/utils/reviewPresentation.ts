import type { Submission } from '../types'
import type { SubmissionQueueRowMeta } from './submissionQueue'
import { presentReadinessForRole, type OpportunityReadinessSummary } from './readinessPresentation'

export function presentAgencyActiveSubmissionLabel(
  activeSubmission: Submission | null,
  activeRowMeta?: SubmissionQueueRowMeta | null,
) {
  if (!activeSubmission) {
    return 'No submission selected'
  }

  return `${activeSubmission.vendor} · ${activeSubmission.id} · ${activeRowMeta?.rowLabel ?? 'Response row 1 of 1'}`
}

export function presentAgencyDecisionControls(activeSubmission: Submission | null) {
  return [
    { label: `Shortlist ${activeSubmission?.vendor ?? 'selected vendor'}`, className: 'primary wide' as const },
    { label: `Request clarification from ${activeSubmission?.vendor ?? 'vendor'}`, className: 'ghost wide' as const },
    { label: `Flag ${activeSubmission?.vendor ?? 'submission'} incomplete`, className: 'ghost wide' as const },
    { label: `Archive ${activeSubmission?.vendor ?? 'selected response'}`, className: 'ghost wide' as const },
  ]
}

export function presentAgencyReviewerLabels(activeSubmission: Submission | null) {
  return {
    title: `Reviewer notes — ${activeSubmission?.vendor ?? 'No submission selected'}`,
    primaryLabel: `Internal procurement notes for ${activeSubmission?.vendor ?? 'selected vendor'}`,
    secondaryLabel: `Follow-up questions for ${activeSubmission?.vendor ?? 'selected vendor'}`,
    actionLabel: `Save notes for ${activeSubmission?.vendor ?? 'selected vendor'}`,
  }
}

export function presentAgencyDecisionDescription(activeSubmissionLabel: string) {
  return `This is where the agency workflow stops being a posting tool and becomes an actual procurement operations surface. Active row: ${activeSubmissionLabel}.`
}

export function presentAgencyPackageTitle(activeSubmissionLabel: string) {
  return `Package completeness — ${activeSubmissionLabel}`
}

export function presentAgencyChecklistContext(currentOpportunityTitle: string, activeSubmissionLabel: string) {
  return `${currentOpportunityTitle} • ${activeSubmissionLabel}`
}

export function presentAgencyOutcomeSummary({
  activeSubmission,
  currentOpportunityTitle,
  activeRowMeta,
  bufferReadiness,
}: {
  activeSubmission: Submission | null
  currentOpportunityTitle: string
  activeRowMeta?: SubmissionQueueRowMeta | null
  bufferReadiness: OpportunityReadinessSummary
}) {
  if (!activeSubmission) {
    return 'Select a submission row to apply review actions and see row-specific review context.'
  }

  const presentedDraftBuffer = presentReadinessForRole(bufferReadiness, 'agency')

  return `${activeSubmission.vendor} is currently ${activeSubmission.status} for ${currentOpportunityTitle}. This is ${activeRowMeta?.rowLabel.toLowerCase() ?? 'response row 1 of 1'}, and decision actions now apply only to submission ${activeSubmission.id}. ${presentedDraftBuffer.label} • ${presentedDraftBuffer.detail}.`
}
