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
  const scopedItems = submissionChecklist.map((item) => (contextLabel ? `${item} — ${contextLabel}` : item))

  return (
    <div className="panel submission-checklist-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Checklist gate</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{scopedItems.length} checks</span>
      </div>
      <ProcurementChecklistPanel title="Checklist items" items={scopedItems} />
    </div>
  )
}
