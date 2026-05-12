import { lifecycleDrivenHomeCtas } from '../data/homeCtas'
import { navigationLabels } from '../data/navigationLabels'
import type { ViewKey } from '../data/viewData'

type HomeCtaPanelProps = {
  onNavigate: (view: ViewKey) => void
}

export function HomeCtaPanel({ onNavigate }: HomeCtaPanelProps) {
  return (
    <div className="panel home-cta-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Next moves</div>
          <div className="panel-title">Lifecycle-driven next moves</div>
        </div>
        <span className="status status-review">{lifecycleDrivenHomeCtas.length} actions</span>
      </div>
      <div className="draft-list">
        {lifecycleDrivenHomeCtas.map((cta, index) => (
          <button
            key={cta.title}
            className={index === 0 ? 'draft-card cta-card cta-card-primary' : 'draft-card cta-card'}
            onClick={() => onNavigate(cta.target as ViewKey)}
            title={navigationLabels[cta.target as ViewKey].stageAware}
          >
            <strong>{cta.title}</strong>
            <div className="muted">{cta.detail}</div>
            <div className="muted">Go to: {navigationLabels[cta.target as ViewKey].short}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
