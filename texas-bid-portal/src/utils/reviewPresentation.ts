import type { Submission } from '../types'
import type { SubmissionQueueRowMeta } from './submissionQueue'
import { presentReadinessForRole, type OpportunityReadinessSummary } from './readinessPresentation'

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
