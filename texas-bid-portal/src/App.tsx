import './App.css'

type Status = 'open' | 'awarded' | 'under-review'

type Opportunity = {
  id: string
  title: string
  agency: string
  location: string
  category: string
  dueDate: string
  status: Status
  source: string
  summary: string
  documents: string[]
}

type Submission = {
  vendor: string
  opportunity: string
  submittedAt: string
  status: 'received' | 'reviewing' | 'shortlisted'
}

const opportunities: Opportunity[] = [
  {
    id: 'tx-001',
    title: 'Custodial Supplies',
    agency: 'Region 4 ESC',
    location: 'Houston, TX',
    category: 'Facilities / Supplies',
    dueDate: 'May 26, 2026',
    status: 'open',
    source: 'Texas Purchasing Group',
    summary:
      'Multi-agency purchasing opportunity for custodial supplies with statewide buyer visibility and recurring school / public facility relevance.',
    documents: ['Solicitation Overview.pdf', 'Vendor Terms.pdf', 'Pricing Sheet.xlsx'],
  },
  {
    id: 'tx-002',
    title: 'Internal Audit Services',
    agency: 'Texas Public Entity',
    location: 'Texas',
    category: 'Professional Services',
    dueDate: 'Apr 23, 2026',
    status: 'open',
    source: 'BidNet Direct',
    summary:
      'Example statewide RFP showing how professional services opportunities can be surfaced with cleaner summaries and easier vendor action.',
    documents: ['RFP.pdf', 'Scope of Work.pdf'],
  },
  {
    id: 'tx-003',
    title: 'Janitorial Services for Passenger Facilities',
    agency: 'DART',
    location: 'DFW, TX',
    category: 'Janitorial',
    dueDate: 'Closed',
    status: 'awarded',
    source: 'DART Board Documents',
    summary:
      'Awarded janitorial-services record used to demonstrate source transparency, historical context, and procurement intelligence value.',
    documents: ['Award Presentation.pdf'],
  },
]

const vendorSubmissions: Submission[] = [
  {
    vendor: 'Lone Star Facility Group',
    opportunity: 'Custodial Supplies',
    submittedAt: 'Apr 8, 2026 · 10:24 AM',
    status: 'received',
  },
  {
    vendor: 'Texas Audit Partners',
    opportunity: 'Internal Audit Services',
    submittedAt: 'Apr 8, 2026 · 9:11 AM',
    status: 'reviewing',
  },
]

const statusClass: Record<Status, string> = {
  open: 'status status-open',
  awarded: 'status status-awarded',
  'under-review': 'status status-review',
}

function App() {
  const highlighted = opportunities[0]

  return (
    <div className="app-shell">
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

      <main className="main">
        <header className="topbar">
          <div>
            <div className="eyebrow">Product prototype</div>
            <h1>Texas procurement, without the ugly parts.</h1>
            <p className="intro">
              A cleaner Texas-first portal where government agencies can post opportunities and vendors can discover and submit directly.
            </p>
          </div>
          <div className="top-actions">
            <button className="ghost">Vendor Sign In</button>
            <button className="primary">Post a Bid</button>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">2,092+</span>
            <span className="stat-label">Texas opportunities visible in ecosystem research</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">3</span>
            <span className="stat-label">Core workflows shown in this prototype</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">1</span>
            <span className="stat-label">Texas-first experience instead of generic procurement clutter</span>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel marketplace-panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">Marketplace feed</div>
                <div className="panel-subtitle">What vendors see when they browse opportunities</div>
              </div>
              <div className="filters">
                <span className="filter-pill active">All</span>
                <span className="filter-pill">Open</span>
                <span className="filter-pill">Facilities</span>
                <span className="filter-pill">Professional</span>
              </div>
            </div>

            <div className="opportunity-list">
              {opportunities.map((opportunity) => (
                <article className="opportunity-card" key={opportunity.id}>
                  <div className="opportunity-top">
                    <div>
                      <h3>{opportunity.title}</h3>
                      <div className="meta">
                        {opportunity.agency} • {opportunity.location} • {opportunity.category}
                      </div>
                    </div>
                    <span className={statusClass[opportunity.status]}>{opportunity.status}</span>
                  </div>
                  <p>{opportunity.summary}</p>
                  <div className="card-footer">
                    <div className="muted">Due {opportunity.dueDate}</div>
                    <div className="muted">Source: {opportunity.source}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="panel detail-panel">
            <div className="panel-title">Opportunity detail</div>
            <h2>{highlighted.title}</h2>
            <div className="detail-grid">
              <div>
                <div className="detail-label">Agency</div>
                <div>{highlighted.agency}</div>
              </div>
              <div>
                <div className="detail-label">Deadline</div>
                <div>{highlighted.dueDate}</div>
              </div>
              <div>
                <div className="detail-label">Category</div>
                <div>{highlighted.category}</div>
              </div>
              <div>
                <div className="detail-label">Source</div>
                <div>{highlighted.source}</div>
              </div>
            </div>
            <p className="detail-copy">{highlighted.summary}</p>
            <div className="doc-list">
              {highlighted.documents.map((document) => (
                <div className="doc-item" key={document}>
                  <span>{document}</span>
                  <button className="linkish">Open</button>
                </div>
              ))}
            </div>
            <div className="detail-actions">
              <button className="ghost">Save Opportunity</button>
              <button className="primary">Submit Response</button>
            </div>
          </div>
        </section>

        <section className="content-grid lower-grid">
          <div className="panel agency-panel">
            <div className="panel-title">Agency posting flow</div>
            <ol className="flow-list">
              <li>Create agency profile</li>
              <li>Draft solicitation with deadlines and attachments</li>
              <li>Publish to Texas marketplace</li>
              <li>Review vendor responses in one dashboard</li>
            </ol>
            <div className="form-mock">
              <div className="input-mock">Bid title</div>
              <div className="input-row">
                <div className="input-mock">Issue date</div>
                <div className="input-mock">Submission deadline</div>
              </div>
              <div className="input-mock tall">Scope / description</div>
              <div className="input-row">
                <div className="input-mock">Attachments</div>
                <div className="input-mock">Category</div>
              </div>
              <button className="primary wide">Publish Bid</button>
            </div>
          </div>

          <div className="panel vendor-panel">
            <div className="panel-title">Submission workspace</div>
            {vendorSubmissions.map((submission) => (
              <div className="submission-card" key={`${submission.vendor}-${submission.opportunity}`}>
                <div className="submission-header">
                  <strong>{submission.vendor}</strong>
                  <span className={submission.status === 'received' ? 'status status-open' : 'status status-review'}>
                    {submission.status}
                  </span>
                </div>
                <div className="muted">For: {submission.opportunity}</div>
                <div className="muted">Submitted: {submission.submittedAt}</div>
              </div>
            ))}
            <div className="small-note">
              This is the product direction: agencies post, vendors bid, and both sides stay inside one clearer Texas-first system.
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
