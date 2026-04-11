import type { ViewKey } from './viewData'

export const workflowActionMap: Partial<Record<ViewKey, { label: string; target: ViewKey }[]>> = {
  home: [
    { label: 'Open marketplace', target: 'marketplace' },
    { label: 'Go to agency dashboard', target: 'agency-dashboard' },
    { label: 'Go to vendor dashboard', target: 'vendor-dashboard' },
  ],
  marketplace: [
    { label: 'View opportunity detail', target: 'opportunity' },
    { label: 'Jump to vendor dashboard', target: 'vendor-dashboard' },
  ],
  opportunity: [
    { label: 'Start submission', target: 'submission-workflow' },
    { label: 'Back to marketplace', target: 'marketplace' },
    { label: 'Open vendor dashboard', target: 'vendor-dashboard' },
  ],
  'agency-dashboard': [
    { label: 'Create new bid', target: 'create-bid' },
    { label: 'Review submissions', target: 'agency-submission-review' },
  ],
  'create-bid': [
    { label: 'Return to agency dashboard', target: 'agency-dashboard' },
    { label: 'Preview in marketplace', target: 'marketplace' },
    { label: 'Review submissions', target: 'agency-submission-review' },
  ],
  'agency-submission-review': [
    { label: 'Back to agency dashboard', target: 'agency-dashboard' },
    { label: 'Open vendor view', target: 'vendor-dashboard' },
  ],
  'vendor-dashboard': [
    { label: 'Open saved opportunity', target: 'opportunity' },
    { label: 'Continue submission', target: 'submission-workflow' },
  ],
  'submission-workflow': [
    { label: 'Return to vendor dashboard', target: 'vendor-dashboard' },
    { label: 'Back to opportunity detail', target: 'opportunity' },
  ],
}
