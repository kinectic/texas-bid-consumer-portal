import { useState } from 'react'
import './App.css'
import { ContextBanner } from './components/ContextBanner'
import { Sidebar } from './components/Sidebar'
import { WorkflowActions } from './components/WorkflowActions'
import { createBidFormState as initialCreateBidFormState, submissionFormState as initialSubmissionFormState } from './data/formState'
import { viewOrder, type ViewKey } from './data/viewData'
import { AgencyDashboardPage } from './pages/AgencyDashboardPage'
import { AgencySubmissionReviewPage } from './pages/AgencySubmissionReviewPage'
import { CreateBidPage } from './pages/CreateBidPage'
import { HomeDashboardPage } from './pages/HomeDashboardPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'
import { SubmissionWorkflowPage } from './pages/SubmissionWorkflowPage'
import { VendorDashboardPage } from './pages/VendorDashboardPage'
import type { CreateBidFormState, SubmissionFormState } from './types/forms'

function renderView(
  view: ViewKey,
  createBidForm: CreateBidFormState,
  updateCreateBidForm: (field: keyof CreateBidFormState, value: string) => void,
  submissionForm: SubmissionFormState,
  updateSubmissionForm: (field: keyof SubmissionFormState, value: string) => void,
) {
  switch (view) {
    case 'home':
      return <HomeDashboardPage publishedBidPreview={createBidForm} />
    case 'marketplace':
      return <MarketplacePage publishedBidPreview={createBidForm} />
    case 'opportunity':
      return <OpportunityDetailPage />
    case 'agency-dashboard':
      return <AgencyDashboardPage />
    case 'create-bid':
      return <CreateBidPage formState={createBidForm} onChange={updateCreateBidForm} />
    case 'agency-submission-review':
      return <AgencySubmissionReviewPage />
    case 'vendor-dashboard':
      return <VendorDashboardPage />
    case 'submission-workflow':
      return <SubmissionWorkflowPage formState={submissionForm} onChange={updateSubmissionForm} />
    default:
      return <HomeDashboardPage publishedBidPreview={createBidForm} />
  }
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('home')
  const [createBidForm, setCreateBidForm] = useState<CreateBidFormState>(initialCreateBidFormState)
  const [submissionForm, setSubmissionForm] = useState<SubmissionFormState>(initialSubmissionFormState)

  const updateCreateBidForm = (field: keyof CreateBidFormState, value: string) => {
    setCreateBidForm((current) => ({ ...current, [field]: value }))
  }

  const updateSubmissionForm = (field: keyof SubmissionFormState, value: string) => {
    setSubmissionForm((current) => ({ ...current, [field]: value }))
  }

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
        <WorkflowActions activeView={activeView} onNavigate={setActiveView} />
        {renderView(activeView, createBidForm, updateCreateBidForm, submissionForm, updateSubmissionForm)}
      </div>
    </div>
  )
}

export default App
