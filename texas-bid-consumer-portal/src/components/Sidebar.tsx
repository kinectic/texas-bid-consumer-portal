import { navigationLabels } from '../data/navigationLabels'
import type { ViewKey } from '../data/viewData'

type SidebarProps = {
  activeView: ViewKey
  onSelect: (view: ViewKey) => void
}

export function Sidebar({ activeView, onSelect }: SidebarProps) {
  const navItems: ViewKey[] = [
    'home',
    'marketplace',
    'opportunity',
    'consumer-profile',
    'contractor-profile',
    'submission-workflow',
    'contractor-onboarding',
    'messages',
    'trust-center',
    'how-it-works',
  ]

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">TexasBid</div>
        <div className="brand-sub">Texas contractor marketplace · post jobs, compare bids, and log in to your own account workspace</div>
      </div>
      <nav className="nav">
        {navItems.map((key) => (
          <button
            key={key}
            className={key === activeView ? 'nav-item active nav-button' : 'nav-item nav-button'}
            onClick={() => onSelect(key)}
            title={navigationLabels[key].stageAware}
          >
            <span>{navigationLabels[key].short}</span>
            <span className="nav-stage-copy">{navigationLabels[key].stageAware}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-card">
        <div className="card-label">Account flow</div>
        <strong>Consumers track posted jobs. Contractors track bids. Everyone stays in one place.</strong>
        <p>
          This product is the Texas-first marketplace focused on local service matching, contractor trust, and fast decision-making.
        </p>
        <div className="small-note">Recommended path: Texas Home → Consumer Profile → Contractor Profile → Review Bids.</div>
      </div>
    </aside>
  )
}
