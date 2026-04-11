import { submissionChecklist } from '../data/checklists'
import { ProcurementChecklistPanel } from './ProcurementChecklistPanel'

type SubmissionChecklistPanelProps = {
  title?: string
  contextLabel?: string
}

export function SubmissionChecklistPanel({
  title = 'Submission checklist',
  contextLabel,
}: SubmissionChecklistPanelProps) {
  return <ProcurementChecklistPanel title={title} items={submissionChecklist} contextLabel={contextLabel} />
}
