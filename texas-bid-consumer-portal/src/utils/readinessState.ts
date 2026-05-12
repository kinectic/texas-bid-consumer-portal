import type { Submission } from '../types'
import type { BidDocument, SubmissionFormState } from '../types/forms'
import type { OpportunityReadinessSummary } from './readinessPresentation'

type ComputeDraftSummaryParams = {
  currentOpportunityId: string
  selectedSubmissionId: string | null
  currentSubmission: Submission | null
  submissionFormsByKey: Record<string, SubmissionFormState>
  submissionDocumentsByKey: Record<string, BidDocument[]>
  initialSubmissionFormState: SubmissionFormState
  initialSubmissionDocuments: BidDocument[]
}

export function computeDraftSummaryState({
  currentOpportunityId,
  selectedSubmissionId,
  currentSubmission,
  submissionFormsByKey,
  submissionDocumentsByKey,
  initialSubmissionFormState,
  initialSubmissionDocuments,
}: ComputeDraftSummaryParams) {
  const currentDraftKey = selectedSubmissionId ?? `draft:${currentOpportunityId}`
  const submissionForm = submissionFormsByKey[currentDraftKey] ?? initialSubmissionFormState
  const submissionDocuments = submissionDocumentsByKey[currentDraftKey] ?? initialSubmissionDocuments
  const unsavedDraftForm = submissionFormsByKey[`draft:${currentOpportunityId}`] ?? initialSubmissionFormState
  const unsavedDraftDocuments = submissionDocumentsByKey[`draft:${currentOpportunityId}`] ?? initialSubmissionDocuments

  const changedFormFields = Object.entries(submissionForm).filter(
    ([key, value]) => value !== initialSubmissionFormState[key as keyof SubmissionFormState],
  ).length
  const attachedCount = submissionDocuments.filter((document) => document.status.toLowerCase().includes('attached')).length
  const unsavedDraftChangedFields = Object.entries(unsavedDraftForm).filter(
    ([key, value]) => value !== initialSubmissionFormState[key as keyof SubmissionFormState],
  ).length
  const unsavedDraftAttachedCount = unsavedDraftDocuments.filter((document) => document.status.toLowerCase().includes('attached')).length
  const unsavedDraftHasEdits = unsavedDraftChangedFields > 0 || unsavedDraftAttachedCount > 0

  return {
    currentDraftKey,
    submissionForm,
    submissionDocuments,
    attachedCount,
    unsavedDraftHasEdits,
    draftSummary: {
      formStatus: changedFormFields === 0 ? 'Untouched default draft' : `Edited draft (${changedFormFields} fields changed)`,
      attachedCount,
      totalDocuments: submissionDocuments.length,
      submissionStatus: currentSubmission?.status ?? 'No saved submission record',
      bufferLabel: selectedSubmissionId ? `Saved-row buffer (${selectedSubmissionId})` : `Unsaved draft buffer (draft:${currentOpportunityId})`,
      preservedUnsavedDraftLabel: unsavedDraftHasEdits
        ? `Preserved unsaved draft available: ${unsavedDraftChangedFields} edited fields • ${unsavedDraftAttachedCount}/${unsavedDraftDocuments.length} attachments ready`
        : 'No preserved unsaved draft edits for this opportunity',
    },
  }
}

type ComputeReadinessParams = {
  opportunities: { id: string }[]
  selectedSubmissionByOpportunity: Record<string, string>
  submissionFormsByKey: Record<string, SubmissionFormState>
  submissionDocumentsByKey: Record<string, BidDocument[]>
  submissionQueue: Submission[]
  initialSubmissionFormState: SubmissionFormState
  initialSubmissionDocuments: BidDocument[]
}

export function computeReadinessByOpportunityId({
  opportunities,
  selectedSubmissionByOpportunity,
  submissionFormsByKey,
  submissionDocumentsByKey,
  submissionQueue,
  initialSubmissionFormState,
  initialSubmissionDocuments,
}: ComputeReadinessParams): Record<string, OpportunityReadinessSummary> {
  return Object.fromEntries(
    opportunities.map((opportunity) => {
      const selectedSavedKey = selectedSubmissionByOpportunity[opportunity.id]
      const activeKey = selectedSavedKey ?? `draft:${opportunity.id}`
      const docs = submissionDocumentsByKey[activeKey] ?? initialSubmissionDocuments
      const unsavedDraftFormForOpportunity = submissionFormsByKey[`draft:${opportunity.id}`] ?? initialSubmissionFormState
      const unsavedDraftDocsForOpportunity = submissionDocumentsByKey[`draft:${opportunity.id}`] ?? initialSubmissionDocuments
      const matchingSubmissions = submissionQueue.filter((item) => item.opportunityId === opportunity.id)
      const submission = matchingSubmissions.find((item) => item.id === selectedSavedKey) ?? matchingSubmissions[0] ?? null
      const responseCount = matchingSubmissions.length
      const attachedDocs = docs.filter((document) => document.status.toLowerCase().includes('attached')).length
      const unsavedEditedFields = Object.entries(unsavedDraftFormForOpportunity).filter(
        ([key, value]) => value !== initialSubmissionFormState[key as keyof SubmissionFormState],
      ).length
      const unsavedAttachedDocs = unsavedDraftDocsForOpportunity.filter((document) => document.status.toLowerCase().includes('attached')).length
      const unsavedHasEdits = unsavedEditedFields > 0 || unsavedAttachedDocs > 0
      const label = submission
        ? `Saved row active • ${submission.status}`
        : unsavedHasEdits
          ? 'Unsaved draft lane has edits'
          : 'No activity yet'
      const detail = submission
        ? `${responseCount} saved row${responseCount === 1 ? '' : 's'} • active ${submission.id} • buffer saved-row • ${attachedDocs}/${docs.length} attachments ready • unsaved lane ${unsavedHasEdits ? 'has preserved edits' : 'empty'}`
        : unsavedHasEdits
          ? `Unsaved draft buffer • ${unsavedAttachedDocs}/${unsavedDraftDocsForOpportunity.length} attachments ready • ${unsavedEditedFields} edited fields`
          : 'Untouched default response state'

      return [opportunity.id, { label, detail }]
    }),
  )
}

type ComputePackageCompletenessParams = {
  submissionForm: SubmissionFormState
  submissionDocuments: BidDocument[]
  attachedCount: number
  currentSubmission: Submission | null
  initialSubmissionFormState: SubmissionFormState
}

export function computePackageCompletenessItems({
  submissionForm,
  submissionDocuments,
  attachedCount,
  currentSubmission,
  initialSubmissionFormState,
}: ComputePackageCompletenessParams) {
  return [
    {
      title: 'Pricing sheet',
      detail: submissionForm.pricing === initialSubmissionFormState.pricing
        ? 'Using baseline pricing draft'
        : 'Pricing updated for this selected opportunity',
    },
    {
      title: 'Compliance docs',
      detail: `${attachedCount}/${submissionDocuments.length} attachments linked to this opportunity packet`,
    },
    {
      title: 'Response narrative',
      detail: currentSubmission
        ? `Submission status is ${currentSubmission.status} for this opportunity`
        : 'No submission record created yet for this opportunity',
    },
  ]
}
