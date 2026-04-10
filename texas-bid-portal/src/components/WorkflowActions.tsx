import { workflowActionMap } from '../data/actionMap'
import type { ViewKey } from '../data/viewData'

type WorkflowActionsProps = {
  activeView: ViewKey
  onNavigate: (view: ViewKey) => void
}

export function WorkflowActions({ activeView, onNavigate }: WorkflowActionsProps) {
  const actions = workflowActionMap[activeView] ?? []

  if (actions.length === 0) return null

  return (
    <section className="workflow-actions">
      <div className="panel-title">Workflow actions</div>
      <div className="workflow-actions-list">
        {actions.map((action) => (
          <button key={`${activeView}-${action.target}`} className="ghost" onClick={() => onNavigate(action.target)}>
            {action.label}
          </button>
        ))}
      </div>
    </section>
  )
}
