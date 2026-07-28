import type { ViewKey } from './viewData'

export const workflowActionMap: Partial<Record<ViewKey, { label: string; target: ViewKey }[]>> = {
  home: [
    { label: 'See how it works', target: 'how-it-works' },
    { label: 'Open marketplace', target: 'marketplace' },
    { label: 'Open consumer profile', target: 'consumer-profile' },
  ],
  marketplace: [
    { label: 'View job match detail', target: 'opportunity' },
    { label: 'Open consumer profile', target: 'consumer-profile' },
    { label: 'Open contractor profile', target: 'contractor-profile' },
    { label: 'Open messages', target: 'messages' },
  ],
  opportunity: [
    { label: 'Review bids', target: 'submission-workflow' },
    { label: 'Back to marketplace', target: 'marketplace' },
    { label: 'Open trust center', target: 'trust-center' },
  ],
  'consumer-profile': [
    { label: 'Open bid comparison', target: 'submission-workflow' },
    { label: 'Back to marketplace', target: 'marketplace' },
    { label: 'Open contractor profile', target: 'contractor-profile' },
  ],
  'contractor-profile': [
    { label: 'Browse jobs', target: 'marketplace' },
    { label: 'Open consumer profile', target: 'consumer-profile' },
    { label: 'Open contractor onboarding', target: 'contractor-onboarding' },
  ],
  'vendor-dashboard': [
    { label: 'Open job match detail', target: 'opportunity' },
    { label: 'Continue bid review', target: 'submission-workflow' },
    { label: 'Open messages', target: 'messages' },
  ],
  'submission-workflow': [
    { label: 'Return to consumer profile', target: 'consumer-profile' },
    { label: 'Back to job match', target: 'opportunity' },
    { label: 'Open trust center', target: 'trust-center' },
  ],
  'contractor-onboarding': [
    { label: 'Open trust center', target: 'trust-center' },
    { label: 'Browse the marketplace', target: 'marketplace' },
    { label: 'Open customer explainer', target: 'how-it-works' },
  ],
  messages: [
    { label: 'Return to consumer profile', target: 'consumer-profile' },
    { label: 'Open bid review', target: 'submission-workflow' },
  ],
  'trust-center': [
    { label: 'Open contractor onboarding', target: 'contractor-onboarding' },
    { label: 'Browse the marketplace', target: 'marketplace' },
    { label: 'Open bid review', target: 'submission-workflow' },
  ],
  'how-it-works': [
    { label: 'Browse the marketplace', target: 'marketplace' },
    { label: 'Open consumer profile', target: 'consumer-profile' },
    { label: 'Open trust center', target: 'trust-center' },
  ],
}
