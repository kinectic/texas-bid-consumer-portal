import { workflowActionMap } from '../data/actionMap'
import { navigationLabels } from '../data/navigationLabels'
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
      <div className="panel-title">Next actions</div>
      <div className="workflow-actions-list">
        {actions.map((action, index) => (
          <button
            key={`${activeView}-${action.target}`}
            className={index === 0 ? 'primary' : 'ghost'}
            onClick={() => onNavigate(action.target)}
            title={navigationLabels[action.target].stageAware}
          >
            {action.label}
          </button>
        ))}
      </div>
    </section>
  )
}
