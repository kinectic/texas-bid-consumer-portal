export function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="brand">TexasBid</div>
        <div className="brand-sub">Texas-first procurement platform</div>
      </div>
      <nav className="nav">
        <a className="nav-item active">Marketplace</a>
        <a className="nav-item">Agency Dashboard</a>
        <a className="nav-item">Vendor Workspace</a>
        <a className="nav-item">Submissions</a>
        <a className="nav-item">Documents</a>
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
