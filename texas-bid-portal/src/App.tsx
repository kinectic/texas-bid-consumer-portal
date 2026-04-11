import { useState } from 'react'
import './App.css'
import { ContextBanner } from './components/ContextBanner'
import { Sidebar } from './components/Sidebar'
import { WorkflowActions } from './components/WorkflowActions'
import {
  bidPacketDocuments,
  createBidFormState as initialCreateBidFormState,
  reviewNotesState as initialReviewNotesState,
  submissionDocuments as initialSubmissionDocuments,
  submissionFormState as initialSubmissionFormState,
} from './data/formState'
import { vendorSubmissions as initialVendorSubmissions } from './data/mockData'
import { viewOrder, type ViewKey } from './data/viewData'
import { AgencyDashboardPage } from './pages/AgencyDashboardPage'
import { AgencySubmissionReviewPage } from './pages/AgencySubmissionReviewPage'
import { CreateBidPage } from './pages/CreateBidPage'
import { HomeDashboardPage } from './pages/HomeDashboardPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'
import { SubmissionWorkflowPage } from './pages/SubmissionWorkflowPage'
import { VendorDashboardPage } from './pages/VendorDashboardPage'
import type { CreateBidFormState, ReviewNotesState, SubmissionFormState, BidDocument } from './types/forms'
import type { Submission } from './types'

function renderView(
  view: ViewKey,
  createBidForm: CreateBidFormState,
  updateCreateBidForm: (field: keyof CreateBidFormState, value: string) => void,
  submissionForm: SubmissionFormState,
  updateSubmissionForm: (field: keyof SubmissionFormState, value: string) => void,
  reviewNotes: ReviewNotesState,
  updateReviewNotes: (field: keyof ReviewNotesState, value: string) => void,
  submissionDocuments: BidDocument[],
  uploadNextSubmissionDocument: () => void,
  submissionQueue: Submission[],
  advanceSubmissionStatus: (status: Submission['status']) => void,
  archiveSubmission: () => void,
  navigate: (view: ViewKey) => void,
) {
  switch (view) {
    case 'home':
      return <HomeDashboardPage publishedBidPreview={createBidForm} onNavigate={navigate} />
    case 'marketplace':
      return <MarketplacePage publishedBidPreview={createBidForm} submissions={submissionQueue} onNavigate={navigate} />
    case 'opportunity':
      return <OpportunityDetailPage onNavigate={navigate} />
    case 'agency-dashboard':
      return <AgencyDashboardPage submissions={submissionQueue} onNavigate={navigate} />
    case 'create-bid':
      return <CreateBidPage formState={createBidForm} documents={bidPacketDocuments} onChange={updateCreateBidForm} onNavigate={navigate} />
    case 'agency-submission-review':
      return (
        <AgencySubmissionReviewPage
          reviewNotes={reviewNotes}
          onChange={updateReviewNotes}
          submissions={submissionQueue}
          onAdvanceStatus={advanceSubmissionStatus}
          onArchiveSubmission={archiveSubmission}
          onNavigate={navigate}
        />
      )
    case 'vendor-dashboard':
      return <VendorDashboardPage submissions={submissionQueue} onNavigate={navigate} />
    case 'submission-workflow':
      return (
        <SubmissionWorkflowPage
          formState={submissionForm}
          onChange={updateSubmissionForm}
          documents={submissionDocuments}
          onUploadNextDocument={uploadNextSubmissionDocument}
          onNavigate={navigate}
        />
      )
    default:
      return <HomeDashboardPage publishedBidPreview={createBidForm} onNavigate={navigate} />
  }
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('home')
  const [createBidForm, setCreateBidForm] = useState<CreateBidFormState>(initialCreateBidFormState)
  const [submissionForm, setSubmissionForm] = useState<SubmissionFormState>(initialSubmissionFormState)
  const [reviewNotes, setReviewNotes] = useState<ReviewNotesState>(initialReviewNotesState)
  const [submissionDocuments, setSubmissionDocuments] = useState<BidDocument[]>(initialSubmissionDocuments)
  const [submissionQueue, setSubmissionQueue] = useState<Submission[]>(initialVendorSubmissions)

  const updateCreateBidForm = (field: keyof CreateBidFormState, value: string) => {
    setCreateBidForm((current) => ({ ...current, [field]: value }))
  }

  const updateSubmissionForm = (field: keyof SubmissionFormState, value: string) => {
    setSubmissionForm((current) => ({ ...current, [field]: value }))
  }

  const updateReviewNotes = (field: keyof ReviewNotesState, value: string) => {
    setReviewNotes((current) => ({ ...current, [field]: value }))
  }

  const uploadNextSubmissionDocument = () => {
    setSubmissionDocuments((current) => {
      const pendingIndex = current.findIndex((document) => document.status.toLowerCase().includes('pending'))

      if (pendingIndex === -1) {
        return current
      }

      return current.map((document, index) =>
        index === pendingIndex ? { ...document, status: 'Attached' } : document,
      )
    })
  }

  const advanceSubmissionStatus = (status: Submission['status']) => {
    setSubmissionQueue((current) => {
      const activeIndex = current.findIndex((submission) => submission.status !== 'shortlisted')

      if (activeIndex === -1) {
        return current
      }

      return current.map((submission, index) =>
        index === activeIndex ? { ...submission, status } : submission,
      )
    })
  }

  const archiveSubmission = () => {
    setSubmissionQueue((current) => current.slice(1))
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
          submissionDocuments,
          uploadNextSubmissionDocument,
          submissionQueue,
          advanceSubmissionStatus,
          archiveSubmission,
          setActiveView,
        )}
      </div>
    </div>
  )
}

export default App
