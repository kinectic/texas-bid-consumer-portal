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
import { opportunities, vendorSubmissions as initialVendorSubmissions } from './data/mockData'
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
import type { Opportunity, Submission } from './types'

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
  isBidPublished: boolean,
  saveDraft: () => void,
  publishBid: () => void,
  publishedOpportunity: Opportunity | null,
  submissionQueue: Submission[],
  saveSubmissionDraft: () => void,
  submitVendorResponse: () => void,
  advanceSubmissionStatus: (status: Submission['status']) => void,
  archiveSubmission: () => void,
  navigate: (view: ViewKey) => void,
) {
  switch (view) {
    case 'home':
      return <HomeDashboardPage publishedBidPreview={createBidForm} publishedOpportunity={publishedOpportunity} onNavigate={navigate} />
    case 'marketplace':
      return <MarketplacePage publishedBidPreview={createBidForm} publishedOpportunity={publishedOpportunity} submissions={submissionQueue} onNavigate={navigate} />
    case 'opportunity':
      return <OpportunityDetailPage publishedOpportunity={publishedOpportunity} submissionQueue={submissionQueue} onNavigate={navigate} />
    case 'agency-dashboard':
      return <AgencyDashboardPage publishedOpportunity={publishedOpportunity} submissions={submissionQueue} onNavigate={navigate} />
    case 'create-bid':
      return (
        <CreateBidPage
          formState={createBidForm}
          documents={bidPacketDocuments}
          onChange={updateCreateBidForm}
          isPublished={isBidPublished}
          onSaveDraft={saveDraft}
          onPublishBid={publishBid}
          onNavigate={navigate}
        />
      )
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
          opportunityTitle={(publishedOpportunity ?? opportunities[0]).title}
          activeSubmission={submissionQueue.find((submission) => submission.opportunity === (publishedOpportunity ?? opportunities[0]).title) ?? null}
          onSaveProgress={saveSubmissionDraft}
          onSubmitResponse={submitVendorResponse}
          onNavigate={navigate}
        />
      )
    default:
      return <HomeDashboardPage publishedBidPreview={createBidForm} publishedOpportunity={publishedOpportunity} onNavigate={navigate} />
  }
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('home')
  const [createBidForm, setCreateBidForm] = useState<CreateBidFormState>(initialCreateBidFormState)
  const [submissionForm, setSubmissionForm] = useState<SubmissionFormState>(initialSubmissionFormState)
  const [reviewNotes, setReviewNotes] = useState<ReviewNotesState>(initialReviewNotesState)
  const [submissionDocuments, setSubmissionDocuments] = useState<BidDocument[]>(initialSubmissionDocuments)
  const [submissionQueue, setSubmissionQueue] = useState<Submission[]>(initialVendorSubmissions)
  const [isBidPublished, setIsBidPublished] = useState(false)

  const updateCreateBidForm = (field: keyof CreateBidFormState, value: string) => {
    setIsBidPublished(false)
    setCreateBidForm((current) => ({ ...current, [field]: value }))
  }

  const updateSubmissionForm = (field: keyof SubmissionFormState, value: string) => {
    setSubmissionForm((current) => ({ ...current, [field]: value }))
  }

  const updateReviewNotes = (field: keyof ReviewNotesState, value: string) => {
    setReviewNotes((current) => ({ ...current, [field]: value }))
  }

  const saveDraft = () => {
    setIsBidPublished(false)
  }

  const publishBid = () => {
    setIsBidPublished(true)
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

  const upsertSubmission = (status: Submission['status']) => {
    const vendorName = submissionForm.signer.split(',')[0]?.trim() || 'Draft Vendor Response'
    const opportunityTitle = (publishedOpportunity ?? opportunities[0]).title

    setSubmissionQueue((current) => {
      const existingIndex = current.findIndex((submission) => submission.opportunity === opportunityTitle)
      const nextRecord: Submission = {
        vendor: vendorName,
        opportunity: opportunityTitle,
        submittedAt: status === 'draft' ? 'Saved just now' : 'Submitted just now',
        status,
      }

      if (existingIndex === -1) {
        return [nextRecord, ...current]
      }

      return current.map((submission, index) =>
        index === existingIndex
          ? { ...submission, ...nextRecord }
          : submission,
      )
    })
  }

  const saveSubmissionDraft = () => {
    upsertSubmission('draft')
  }

  const submitVendorResponse = () => {
    upsertSubmission('received')
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

  const publishedOpportunity = isBidPublished
    ? {
        ...opportunities[0],
        title: createBidForm.title,
        category: createBidForm.category,
        dueDate: createBidForm.deadline,
        summary: createBidForm.scope,
        source: 'TexasBid Agency Publish Flow',
        documents: bidPacketDocuments.map((document) => document.name),
      }
    : null

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
          isBidPublished,
          saveDraft,
          publishBid,
          publishedOpportunity,
          submissionQueue,
          saveSubmissionDraft,
          submitVendorResponse,
          advanceSubmissionStatus,
          archiveSubmission,
          setActiveView,
        )}
      </div>
    </div>
  )
}

export default App
