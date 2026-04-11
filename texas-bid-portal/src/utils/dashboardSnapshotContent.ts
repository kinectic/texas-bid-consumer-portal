export const sharedDashboardCopy = {
  selectionContextTitle: 'Selected opportunity + submission context',
  lifecycleTimelineTitle: 'Lifecycle timeline',
} as const

export const homeWorkflowMetricLabels = {
  screensBuilt: 'Interactive workflow screens built',
  draftPromoted: 'Agency draft promoted live',
  productDirection: 'Localized procurement-first product direction',
} as const

export function presentHomePublishedSnapshotState(isPublished: boolean) {
  return {
    statusLabel: isPublished ? 'Published' : 'Draft',
    note: isPublished
      ? 'The current agency draft has been promoted into the live marketplace and dashboard state.'
      : 'The current agency draft is still editable and waiting for publication.',
  }
}

export function presentMarketplacePublishedSnapshotState(isPublished: boolean) {
  return {
    title: 'Published bid preview sync',
    statusLabel: isPublished ? 'Published' : 'Draft only',
    note: isPublished
      ? 'This solicitation is live in the marketplace feed and now behaves like an active opportunity.'
      : 'This solicitation is still draft-only. Publish it from the agency workflow to move it into the live marketplace feed.',
  }
}
