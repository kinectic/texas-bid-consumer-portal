import { submissionChecklist } from '../data/checklists'

type SubmissionChecklistPanelProps = {
  title?: string
  contextLabel?: string
}

export function SubmissionChecklistPanel({
  title = 'Submission checklist',
  contextLabel,
}: SubmissionChecklistPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ol className="flow-list">
        {submissionChecklist.map((item) => (
          <li key={item}>{contextLabel ? `${item} — ${contextLabel}` : item}</li>
        ))}
      </ol>
    </div>
  )
}
