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
    'vendor-dashboard',
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
        <div className="brand-sub">Texas contractor marketplace · post jobs, compare bids, and hire local pros with confidence</div>
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
        <div className="card-label">Consumer flow</div>
        <strong>Post a job. Compare bids. Hire the right Texas contractor.</strong>
        <p>
          This product is the consumer-side marketplace focused on local service matching, contractor trust, and fast decision-making.
        </p>
        <div className="small-note">Recommended path: Texas Home → Find Contractors → Job Match → My Jobs → Review Bids.</div>
      </div>
    </aside>
  )
}
