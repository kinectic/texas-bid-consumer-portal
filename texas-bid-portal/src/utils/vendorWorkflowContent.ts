import { submissionStatusSummary } from '../data/submissionStatus'

export const submissionStageSummaryItems = [
  {
    stage: 'Qualification',
    owner: 'Vendor',
    detail: 'Confirm fit, urgency, and document readiness before spending effort on the packet.',
  },
  {
    stage: 'Response assembly',
    owner: 'Vendor',
    detail: 'Prepare signer details, pricing, narrative support, and all required attachments.',
  },
  {
    stage: 'Agency review',
    owner: 'Agency',
    detail: 'Submission moves into completeness checks, clarification handling, and shortlist decisions.',
  },
] as const

export const submissionStatusItems = [
  submissionStatusSummary.draft,
  submissionStatusSummary.received,
  submissionStatusSummary.reviewing,
  submissionStatusSummary.shortlisted,
] as const

export const vendorWorkflowPackageCompletenessItems = [
  {
    title: 'Pricing response',
    detail: 'In progress and ready for final vendor confirmation',
  },
  {
    title: 'Compliance packet',
    detail: 'Required attachments are ready to upload before submission',
  },
  {
    title: 'Signer confirmation',
    detail: 'Authorized signer is captured in the response form',
  },
] as const

export const lifecycleSummaryItems = [
  {
    stage: '1. Review opportunity fit',
    detail: 'Confirm the bid matches capability, timing, and submission requirements.',
  },
  {
    stage: '2. Assemble response packet',
    detail: 'Prepare pricing, attachments, signer details, and response narrative.',
  },
  {
    stage: '3. Submit into agency review',
    detail: 'Send the final packet directly through the Texas-first portal workflow.',
  },
] as const

export const submissionRequirementItems = [
  'Confirm the bid matches capability, timing, and submission requirements',
  'Prepare pricing total, timeline, and response narrative',
  'Upload required attachments and compliance materials',
  'Validate signer details and final packet completeness',
  'Submit directly into agency review',
] as const

export const vendorWorkflowCopy = {
  workspaceEyebrow: 'Vendor workspace',
  intro:
    'A direct submission flow where Texas vendors can confirm fit, upload documents, answer requirements, and submit a bid response inside the platform.',
  opportunitySummaryTitle: 'Opportunity summary',
  opportunitySummarySubtitle:
    'The live opportunity context that stays visible while the vendor assembles the response packet.',
  metadataTitle: 'Submission metadata',
  stageSummaryTitle: 'Submission stage summary',
  siblingRowsTitle: 'Other response rows for this opportunity',
  emptySiblingRowsDetail: 'Starting from a fresh unsaved vendor response for this opportunity.',
  requirementsTitle: 'Response requirements',
  attachmentsTitle: 'Required attachments',
  attachmentsDescription: 'The packet components the vendor must gather and upload before final submission.',
  draftingEyebrow: 'Vendor drafting',
  draftingTitle: 'Response builder',
  draftingDescription:
    'The editable vendor response form covering signer details, pricing, timing, and narrative support.',
  checklistTitle: 'Pre-submit checklist',
  completenessTitle: 'Response completeness',
  lifecycleTitle: 'Submission lifecycle summary',
  finalEyebrow: 'Final step',
  finalDescription:
    'The last confirmation state before the vendor sends the completed response into agency review.',
  unsavedDraftLabel: 'Unsaved draft lane',
} as const
