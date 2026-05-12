import type { ViewKey } from './viewData'

export const workflowActionMap: Partial<Record<ViewKey, { label: string; target: ViewKey }[]>> = {
  home: [
    { label: 'See how it works', target: 'how-it-works' },
    { label: 'Open marketplace', target: 'marketplace' },
    { label: 'Open customer workspace', target: 'vendor-dashboard' },
  ],
  marketplace: [
    { label: 'View job match detail', target: 'opportunity' },
    { label: 'Open customer workspace', target: 'vendor-dashboard' },
    { label: 'Open messages', target: 'messages' },
  ],
  opportunity: [
    { label: 'Review bids', target: 'submission-workflow' },
    { label: 'Back to marketplace', target: 'marketplace' },
    { label: 'Open trust center', target: 'trust-center' },
  ],
  'vendor-dashboard': [
    { label: 'Open job match detail', target: 'opportunity' },
    { label: 'Continue bid review', target: 'submission-workflow' },
    { label: 'Open messages', target: 'messages' },
  ],
  'submission-workflow': [
    { label: 'Return to my jobs', target: 'vendor-dashboard' },
    { label: 'Back to job match', target: 'opportunity' },
    { label: 'Open trust center', target: 'trust-center' },
  ],
  'contractor-onboarding': [
    { label: 'Open trust center', target: 'trust-center' },
    { label: 'Browse the marketplace', target: 'marketplace' },
    { label: 'Open customer explainer', target: 'how-it-works' },
  ],
  messages: [
    { label: 'Return to my jobs', target: 'vendor-dashboard' },
    { label: 'Open bid review', target: 'submission-workflow' },
  ],
  'trust-center': [
    { label: 'Open contractor onboarding', target: 'contractor-onboarding' },
    { label: 'Browse the marketplace', target: 'marketplace' },
    { label: 'Open bid review', target: 'submission-workflow' },
  ],
  'how-it-works': [
    { label: 'Browse the marketplace', target: 'marketplace' },
    { label: 'Open customer workspace', target: 'vendor-dashboard' },
    { label: 'Open trust center', target: 'trust-center' },
  ],
}
