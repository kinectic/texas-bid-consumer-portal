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
    'agency-dashboard',
    'create-bid',
    'agency-submission-review',
    'vendor-dashboard',
    'submission-workflow',
  ]

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">TexasBid</div>
        <div className="brand-sub">Texas-first procurement platform</div>
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
        <div className="card-label">MVP direction</div>
        <strong>BidNet-class workflow, Texas-first UX.</strong>
        <p>
          Agencies post bids. Vendors search, save, and submit inside one cleaner platform.
        </p>
      </div>
    </aside>
  )
}
