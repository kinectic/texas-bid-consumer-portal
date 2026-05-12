export type ViewKey =
  | 'home'
  | 'marketplace'
  | 'opportunity'
  | 'vendor-dashboard'
  | 'submission-workflow'
  | 'contractor-onboarding'
  | 'messages'
  | 'trust-center'
  | 'how-it-works'

export const viewOrder: { key: ViewKey; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'marketplace', label: 'Find Contractors' },
  { key: 'opportunity', label: 'Job Match' },
  { key: 'vendor-dashboard', label: 'My Jobs' },
  { key: 'submission-workflow', label: 'Review Bids' },
  { key: 'contractor-onboarding', label: 'For Contractors' },
  { key: 'messages', label: 'Messages' },
  { key: 'trust-center', label: 'Trust Center' },
  { key: 'how-it-works', label: 'How It Works' },
]

export const defaultView: ViewKey = 'home'

export const viewPathMap: Record<ViewKey, string> = {
  home: '/',
  marketplace: '/find-contractors',
  opportunity: '/job-match',
  'vendor-dashboard': '/my-jobs',
  'submission-workflow': '/review-bids',
  'contractor-onboarding': '/for-contractors',
  messages: '/messages',
  'trust-center': '/trust-center',
  'how-it-works': '/how-it-works',
}

export const pathViewMap = Object.fromEntries(
  Object.entries(viewPathMap).map(([view, path]) => [path, view as ViewKey]),
) as Record<string, ViewKey>

export function isViewKey(value: string): value is ViewKey {
  return value in viewPathMap
}

export function getViewFromLocation(pathname: string): ViewKey {
  return pathViewMap[pathname] ?? defaultView
}

export function getPathForView(view: ViewKey): string {
  return viewPathMap[view]
}
