export const agencyReviewCopy = {
  workspaceEyebrow: 'Agency workspace',
  title: 'Submission review',
  intro:
    'A direct review screen where agencies can triage vendor responses, inspect package completeness, and move decisions forward without leaving the platform.',
  queueTitle: 'Response queue',
  queueFilterCurrent: 'Current opportunity',
  queueFilterAll: 'All opportunities',
  queueSubtitle: (count: number) =>
    `Keep the selected opportunity context while switching queue scope. Current opportunity has ${count} review row${count === 1 ? '' : 's'}.`,
  currentResponsesLabel: 'Current opportunity responses',
  allResponsesLabel: 'All responses in review',
  shortlistLabel: 'Shortlist candidate',
  decisionWindowLabel: 'Decision window',
  decisionWindowValue: 'Today',
  exportResponsesLabel: 'Export responses',
  advanceShortlistLabel: 'Advance shortlist',
  selectionContextTitle: 'Selected opportunity + submission context',
  checklistTitle: 'Agency review checklist',
  reviewLegendTitle: 'Review status legend',
} as const
