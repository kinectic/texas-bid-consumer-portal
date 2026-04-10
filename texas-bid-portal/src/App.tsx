import { useState } from 'react'
import './App.css'
import { ContextBanner } from './components/ContextBanner'
import { Sidebar } from './components/Sidebar'
import { viewOrder, type ViewKey } from './data/viewData'
import { AgencyDashboardPage } from './pages/AgencyDashboardPage'
import { AgencySubmissionReviewPage } from './pages/AgencySubmissionReviewPage'
import { CreateBidPage } from './pages/CreateBidPage'
import { HomeDashboardPage } from './pages/HomeDashboardPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'
import { SubmissionWorkflowPage } from './pages/SubmissionWorkflowPage'
import { VendorDashboardPage } from './pages/VendorDashboardPage'

function renderView(view: ViewKey) {
  switch (view) {
    case 'home':
      return <HomeDashboardPage />
    case 'marketplace':
      return <MarketplacePage />
    case 'opportunity':
      return <OpportunityDetailPage />
    case 'agency-dashboard':
      return <AgencyDashboardPage />
    case 'create-bid':
      return <CreateBidPage />
    case 'agency-submission-review':
      return <AgencySubmissionReviewPage />
    case 'vendor-dashboard':
      return <VendorDashboardPage />
    case 'submission-workflow':
      return <SubmissionWorkflowPage />
    default:
      return <HomeDashboardPage />
  }
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('home')

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onSelect={setActiveView} />
      <div className="page-shell">
        <div className="view-switcher">
          {viewOrder.map((view) => (
            <button
              key={view.key}
              className={view.key === activeView ? 'switch-pill switch-pill-active' : 'switch-pill'}
              onClick={() => setActiveView(view.key)}
            >
              {view.label}
            </button>
          ))}
        </div>
        <ContextBanner activeView={activeView} />
        {renderView(activeView)}
      </div>
    </div>
  )
}

export default App
