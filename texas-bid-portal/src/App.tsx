import { useState } from 'react'
import './App.css'
import { ContextBanner } from './components/ContextBanner'
import { Sidebar } from './components/Sidebar'
import { WorkflowActions } from './components/WorkflowActions'
import {
  bidPacketDocuments,
  createBidFormState as initialCreateBidFormState,
  reviewNotesState as initialReviewNotesState,
  submissionFormState as initialSubmissionFormState,
} from './data/formState'
import { viewOrder, type ViewKey } from './data/viewData'
import { AgencyDashboardPage } from './pages/AgencyDashboardPage'
import { AgencySubmissionReviewPage } from './pages/AgencySubmissionReviewPage'
import { CreateBidPage } from './pages/CreateBidPage'
import { HomeDashboardPage } from './pages/HomeDashboardPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'
import { SubmissionWorkflowPage } from './pages/SubmissionWorkflowPage'
import { VendorDashboardPage } from './pages/VendorDashboardPage'
import type { CreateBidFormState, ReviewNotesState, SubmissionFormState } from './types/forms'

function renderView(
  view: ViewKey,
  createBidForm: CreateBidFormState,
  updateCreateBidForm: (field: keyof CreateBidFormState, value: string) => void,
  submissionForm: SubmissionFormState,
  updateSubmissionForm: (field: keyof SubmissionFormState, value: string) => void,
  reviewNotes: ReviewNotesState,
  updateReviewNotes: (field: keyof ReviewNotesState, value: string) => void,
  navigate: (view: ViewKey) => void,
) {
  switch (view) {
    case 'home':
      return <HomeDashboardPage publishedBidPreview={createBidForm} onNavigate={navigate} />
    case 'marketplace':
      return <MarketplacePage publishedBidPreview={createBidForm} onNavigate={navigate} />
    case 'opportunity':
      return <OpportunityDetailPage onNavigate={navigate} />
    case 'agency-dashboard':
      return <AgencyDashboardPage onNavigate={navigate} />
    case 'create-bid':
      return <CreateBidPage formState={createBidForm} documents={bidPacketDocuments} onChange={updateCreateBidForm} onNavigate={navigate} />
    case 'agency-submission-review':
      return <AgencySubmissionReviewPage reviewNotes={reviewNotes} onChange={updateReviewNotes} onNavigate={navigate} />
    case 'vendor-dashboard':
      return <VendorDashboardPage onNavigate={navigate} />
    case 'submission-workflow':
      return <SubmissionWorkflowPage formState={submissionForm} onChange={updateSubmissionForm} onNavigate={navigate} />
    default:
      return <HomeDashboardPage publishedBidPreview={createBidForm} onNavigate={navigate} />
  }
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('home')
  const [createBidForm, setCreateBidForm] = useState<CreateBidFormState>(initialCreateBidFormState)
  const [submissionForm, setSubmissionForm] = useState<SubmissionFormState>(initialSubmissionFormState)
  const [reviewNotes, setReviewNotes] = useState<ReviewNotesState>(initialReviewNotesState)

  const updateCreateBidForm = (field: keyof CreateBidFormState, value: string) => {
    setCreateBidForm((current) => ({ ...current, [field]: value }))
  }

  const updateSubmissionForm = (field: keyof SubmissionFormState, value: string) => {
    setSubmissionForm((current) => ({ ...current, [field]: value }))
  }

  const updateReviewNotes = (field: keyof ReviewNotesState, value: string) => {
    setReviewNotes((current) => ({ ...current, [field]: value }))
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
        {renderView(
          activeView,
          createBidForm,
          updateCreateBidForm,
          submissionForm,
          updateSubmissionForm,
          reviewNotes,
          updateReviewNotes,
          setActiveView,
        )}
      </div>
    </div>
  )
}

export default App
