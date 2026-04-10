type ViewKey =
  | 'home'
  | 'marketplace'
  | 'opportunity'
  | 'agency-dashboard'
  | 'create-bid'
  | 'vendor-dashboard'
  | 'submission-workflow'

type SidebarProps = {
  activeView: ViewKey
  onSelect: (view: ViewKey) => void
}

export function Sidebar({ activeView, onSelect }: SidebarProps) {
  const navItems: { key: ViewKey; label: string }[] = [
    { key: 'home', label: 'Overview' },
    { key: 'marketplace', label: 'Marketplace' },
    { key: 'opportunity', label: 'Opportunity Detail' },
    { key: 'agency-dashboard', label: 'Agency Dashboard' },
    { key: 'create-bid', label: 'Create Bid' },
    { key: 'vendor-dashboard', label: 'Vendor Workspace' },
    { key: 'submission-workflow', label: 'Submissions' },
  ]

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">TexasBid</div>
        <div className="brand-sub">Texas-first procurement platform</div>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={item.key === activeView ? 'nav-item active nav-button' : 'nav-item nav-button'}
            onClick={() => onSelect(item.key)}
          >
            {item.label}
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
