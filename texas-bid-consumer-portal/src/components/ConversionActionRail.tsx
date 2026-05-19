import type { ViewKey } from '../data/viewData'

type ConversionAction = {
  title: string
  detail: string
  target: ViewKey
  buttonLabel: string
}

type ConversionActionRailProps = {
  title: string
  subtitle: string
  actions: ConversionAction[]
  onNavigate: (view: ViewKey) => void
}

export function ConversionActionRail({ title, subtitle, actions, onNavigate }: ConversionActionRailProps) {
  return (
    <section className="panel conversion-action-rail">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Next best actions</div>
          <div className="panel-title">{title}</div>
          <div className="panel-subtitle">{subtitle}</div>
        </div>
        <span className="status status-review">{actions.length} paths</span>
      </div>
      <div className="draft-list">
        {actions.map((action, index) => (
          <div key={action.title} className={index === 0 ? 'draft-card conversion-action-card conversion-action-card-primary' : 'draft-card conversion-action-card'}>
            <strong>{action.title}</strong>
            <div className="muted">{action.detail}</div>
            <button className={index === 0 ? 'primary' : 'ghost'} onClick={() => onNavigate(action.target)}>
              {action.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
