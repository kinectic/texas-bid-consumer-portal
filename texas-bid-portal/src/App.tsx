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

type SubmissionFormStateByOpportunity = Record<string, SubmissionFormState>
type SubmissionDocumentsByOpportunity = Record<string, BidDocument[]>

type DraftSummary = {
  formStatus: string
  attachedCount: number
  totalDocuments: number
  submissionStatus: string
}

type OpportunityReadinessSummary = {
  label: string
  detail: string
}

type SubmissionQueueFilter = 'current' | 'all'
type ReviewNotesByOpportunity = Record<string, ReviewNotesState>
type SelectedSubmissionByOpportunity = Record<string, string>

type PackageCompletenessItem = {
  title: string
  detail: string
}

function renderView(
  view: ViewKey,
  createBidForm: CreateBidFormState,
  updateCreateBidForm: (field: keyof CreateBidFormState, value: string) => void,
  submissionForm: SubmissionFormState,
  updateSubmissionForm: (field: keyof SubmissionFormState, value: string) => void,
  reviewNotes: ReviewNotesState,
  updateReviewNotes: (field: keyof ReviewNotesState, value: string) => void,
  packageCompletenessItems: PackageCompletenessItem[],
  submissionDocuments: BidDocument[],
  draftSummary: DraftSummary,
  uploadNextSubmissionDocument: () => void,
  isBidPublished: boolean,
  saveDraft: () => void,
  publishBid: () => void,
  publishedOpportunity: Opportunity | null,
  currentOpportunity: Opportunity,
  selectOpportunity: (opportunity: Opportunity) => void,
  readinessByOpportunityId: Record<string, OpportunityReadinessSummary>,
  submissionQueue: Submission[],
  selectedSubmissionId: string | null,
  selectSubmission: (submission: Submission) => void,
  startNewSubmission: () => void,
  vendorQueueFilter: SubmissionQueueFilter,
  setVendorQueueFilter: (filter: SubmissionQueueFilter) => void,
  agencyQueueFilter: SubmissionQueueFilter,
  setAgencyQueueFilter: (filter: SubmissionQueueFilter) => void,
  saveSubmissionDraft: () => void,
  submitVendorResponse: () => void,
  advanceSubmissionStatus: (status: Submission['status']) => void,
  archiveSubmission: () => void,
  navigate: (view: ViewKey) => void,
) {
  switch (view) {
    case 'home':
      return (
        <HomeDashboardPage
          publishedBidPreview={createBidForm}
          publishedOpportunity={publishedOpportunity}
          currentOpportunity={currentOpportunity}
          readinessByOpportunityId={readinessByOpportunityId}
          onSelectOpportunity={selectOpportunity}
          onNavigate={navigate}
        />
      )
    case 'marketplace':
      return (
        <MarketplacePage
          publishedBidPreview={createBidForm}
          publishedOpportunity={publishedOpportunity}
          currentOpportunity={currentOpportunity}
          readinessByOpportunityId={readinessByOpportunityId}
          submissions={submissionQueue}
          onSelectOpportunity={selectOpportunity}
          onSelectSubmission={selectSubmission}
          onNavigate={navigate}
        />
      )
    case 'opportunity':
      return <OpportunityDetailPage opportunity={currentOpportunity} submissionQueue={submissionQueue} onStartNewSubmission={startNewSubmission} onNavigate={navigate} />
    case 'agency-dashboard':
      return (
        <AgencyDashboardPage
          currentOpportunity={currentOpportunity}
          publishedOpportunity={publishedOpportunity}
          readinessByOpportunityId={readinessByOpportunityId}
          submissions={submissionQueue}
          selectedSubmissionId={selectedSubmissionId}
          queueFilter={agencyQueueFilter}
          onQueueFilterChange={setAgencyQueueFilter}
          onSelectOpportunity={selectOpportunity}
          onSelectSubmission={selectSubmission}
          onNavigate={navigate}
        />
      )
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
          currentOpportunity={currentOpportunity}
          draftSummary={draftSummary}
          reviewNotes={reviewNotes}
          onChange={updateReviewNotes}
          packageCompletenessItems={packageCompletenessItems}
          submissions={submissionQueue}
          selectedSubmissionId={selectedSubmissionId}
          queueFilter={agencyQueueFilter}
          onQueueFilterChange={setAgencyQueueFilter}
          onSelectOpportunity={selectOpportunity}
          onSelectSubmission={selectSubmission}
          onAdvanceStatus={advanceSubmissionStatus}
          onArchiveSubmission={archiveSubmission}
          onNavigate={navigate}
        />
      )
    case 'vendor-dashboard':
      return <VendorDashboardPage currentOpportunity={currentOpportunity} submissions={submissionQueue} selectedSubmissionId={selectedSubmissionId} draftSummary={draftSummary} readinessByOpportunityId={readinessByOpportunityId} queueFilter={vendorQueueFilter} onQueueFilterChange={setVendorQueueFilter} onSelectOpportunity={selectOpportunity} onSelectSubmission={selectSubmission} onStartNewSubmission={startNewSubmission} onNavigate={navigate} />
    case 'submission-workflow':
      return (
        <SubmissionWorkflowPage
          formState={submissionForm}
          onChange={updateSubmissionForm}
          documents={submissionDocuments}
          draftSummary={draftSummary}
          onUploadNextDocument={uploadNextSubmissionDocument}
          opportunity={currentOpportunity}
          siblingSubmissions={submissionQueue.filter((submission) => submission.opportunityId === currentOpportunity.id)}
          activeSubmission={submissionQueue.find((submission) => submission.id === selectedSubmissionId)
            ?? submissionQueue.find((submission) => submission.opportunityId === currentOpportunity.id)
            ?? null}
          onSelectSubmission={selectSubmission}
          onStartNewSubmission={startNewSubmission}
          onSaveProgress={saveSubmissionDraft}
          onSubmitResponse={submitVendorResponse}
          onNavigate={navigate}
        />
      )
    default:
      return (
        <HomeDashboardPage
          publishedBidPreview={createBidForm}
          publishedOpportunity={publishedOpportunity}
          currentOpportunity={currentOpportunity}
          readinessByOpportunityId={readinessByOpportunityId}
          onSelectOpportunity={selectOpportunity}
          onNavigate={navigate}
        />
      )
  }
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('home')
  const [createBidForm, setCreateBidForm] = useState<CreateBidFormState>(initialCreateBidFormState)
  const [submissionFormsByOpportunity, setSubmissionFormsByOpportunity] = useState<SubmissionFormStateByOpportunity>({
    [opportunities[0].id]: initialSubmissionFormState,
  })
  const [reviewNotesByOpportunity, setReviewNotesByOpportunity] = useState<ReviewNotesByOpportunity>({
    [opportunities[0].id]: initialReviewNotesState,
  })
  const [submissionDocumentsByOpportunity, setSubmissionDocumentsByOpportunity] = useState<SubmissionDocumentsByOpportunity>({
    [opportunities[0].id]: initialSubmissionDocuments,
  })
  const [submissionQueue, setSubmissionQueue] = useState<Submission[]>(initialVendorSubmissions)
  const [isBidPublished, setIsBidPublished] = useState(false)
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(opportunities[0].id)
  const [selectedSubmissionByOpportunity, setSelectedSubmissionByOpportunity] = useState<SelectedSubmissionByOpportunity>({
    'tx-001': 'sub-001',
    'tx-002': 'sub-002',
  })
  const [vendorQueueFilter, setVendorQueueFilter] = useState<SubmissionQueueFilter>('current')
  const [agencyQueueFilter, setAgencyQueueFilter] = useState<SubmissionQueueFilter>('current')

  const updateCreateBidForm = (field: keyof CreateBidFormState, value: string) => {
    setIsBidPublished(false)
    setCreateBidForm((current) => ({ ...current, [field]: value }))
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

  const currentOpportunity = (() => {
    if (publishedOpportunity && selectedOpportunityId === publishedOpportunity.id) {
      return publishedOpportunity
    }

    return opportunities.find((opportunity) => opportunity.id === selectedOpportunityId) ?? publishedOpportunity ?? opportunities[0]
  })()

  const ensureSubmissionSelection = (
    queue: Submission[],
    opportunityId: string,
    preferredSubmissionId?: string | null,
  ) => {
    const exactMatch = preferredSubmissionId
      ? queue.find((submission) => submission.id === preferredSubmissionId && submission.opportunityId === opportunityId)
      : null

    if (exactMatch) {
      return exactMatch
    }

    return queue.find((submission) => submission.opportunityId === opportunityId) ?? null
  }

  const submissionForm = submissionFormsByOpportunity[currentOpportunity.id] ?? initialSubmissionFormState
  const submissionDocuments = submissionDocumentsByOpportunity[currentOpportunity.id] ?? initialSubmissionDocuments
  const reviewNotes = reviewNotesByOpportunity[currentOpportunity.id] ?? initialReviewNotesState
  const selectedSubmissionId = selectedSubmissionByOpportunity[currentOpportunity.id] ?? null
  const currentSubmission = submissionQueue.find((submission) => submission.id === selectedSubmissionId)
    ?? submissionQueue.find((submission) => submission.opportunityId === currentOpportunity.id)
    ?? null
  const changedFormFields = Object.entries(submissionForm).filter(([key, value]) => value !== initialSubmissionFormState[key as keyof SubmissionFormState]).length
  const attachedCount = submissionDocuments.filter((document) => document.status.toLowerCase().includes('attached')).length
  const draftSummary: DraftSummary = {
    formStatus: changedFormFields === 0 ? 'Untouched default draft' : `Edited draft (${changedFormFields} fields changed)`,
    attachedCount,
    totalDocuments: submissionDocuments.length,
    submissionStatus: currentSubmission?.status ?? 'No saved submission record',
  }
  const readinessByOpportunityId: Record<string, OpportunityReadinessSummary> = Object.fromEntries(
    opportunities.map((opportunity) => {
      const form = submissionFormsByOpportunity[opportunity.id] ?? initialSubmissionFormState
      const docs = submissionDocumentsByOpportunity[opportunity.id] ?? initialSubmissionDocuments
      const matchingSubmissions = submissionQueue.filter((item) => item.opportunityId === opportunity.id)
      const submission = matchingSubmissions.find((item) => item.id === selectedSubmissionByOpportunity[opportunity.id])
        ?? matchingSubmissions[0]
        ?? null
      const responseCount = matchingSubmissions.length
      const editedFields = Object.entries(form).filter(([key, value]) => value !== initialSubmissionFormState[key as keyof SubmissionFormState]).length
      const attachedDocs = docs.filter((document) => document.status.toLowerCase().includes('attached')).length
      const label = submission
        ? `Response ${responseCount} • ${submission.status}`
        : editedFields > 0 || attachedDocs > 0
          ? 'Draft in progress'
          : 'No activity yet'
      const detail = submission
        ? `${responseCount} response row${responseCount === 1 ? '' : 's'} • active ${submission.id} • ${attachedDocs}/${docs.length} attachments ready • ${editedFields} edited fields`
        : editedFields > 0 || attachedDocs > 0
          ? `${attachedDocs}/${docs.length} attachments ready • ${editedFields} edited fields`
          : 'Untouched default response state'

      return [opportunity.id, { label, detail }]
    }),
  )
  const packageCompletenessItems: PackageCompletenessItem[] = [
    {
      title: 'Pricing sheet',
      detail: submissionForm.pricing === initialSubmissionFormState.pricing
        ? 'Using baseline pricing draft'
        : 'Pricing updated for this selected opportunity',
    },
    {
      title: 'Compliance docs',
      detail: `${attachedCount}/${submissionDocuments.length} attachments linked to this opportunity packet`,
    },
    {
      title: 'Response narrative',
      detail: currentSubmission
        ? `Submission status is ${currentSubmission.status} for this opportunity`
        : 'No submission record created yet for this opportunity',
    },
  ]

  const updateSubmissionForm = (field: keyof SubmissionFormState, value: string) => {
    setSubmissionFormsByOpportunity((current) => ({
      ...current,
      [currentOpportunity.id]: {
        ...(current[currentOpportunity.id] ?? initialSubmissionFormState),
        [field]: value,
      },
    }))
  }

  const updateReviewNotes = (field: keyof ReviewNotesState, value: string) => {
    setReviewNotesByOpportunity((current) => ({
      ...current,
      [currentOpportunity.id]: {
        ...(current[currentOpportunity.id] ?? initialReviewNotesState),
        [field]: value,
      },
    }))
  }

  const saveDraft = () => {
    setIsBidPublished(false)
  }

  const publishBid = () => {
    setIsBidPublished(true)
  }

  const selectOpportunity = (opportunity: Opportunity) => {
    setSelectedOpportunityId(opportunity.id)
    setSelectedSubmissionByOpportunity((current) => {
      if (current[opportunity.id]) {
        const selectedStillExists = submissionQueue.some((submission) => submission.id === current[opportunity.id])
        if (selectedStillExists) {
          return current
        }
      }

      const repairedSelection = ensureSubmissionSelection(submissionQueue, opportunity.id, current[opportunity.id])

      if (!repairedSelection) {
        return current
      }

      return {
        ...current,
        [opportunity.id]: repairedSelection.id,
      }
    })
  }

  const selectSubmission = (submission: Submission) => {
    setSelectedSubmissionByOpportunity((current) => ({
      ...current,
      [submission.opportunityId]: submission.id,
    }))
  }

  const startNewSubmission = () => {
    setSelectedSubmissionByOpportunity((current) => {
      const next = { ...current }
      delete next[currentOpportunity.id]
      return next
    })

    setSubmissionFormsByOpportunity((current) => ({
      ...current,
      [currentOpportunity.id]: {
        ...initialSubmissionFormState,
      },
    }))

    setSubmissionDocumentsByOpportunity((current) => ({
      ...current,
      [currentOpportunity.id]: initialSubmissionDocuments.map((document) => ({ ...document })),
    }))
  }

  const setVendorQueueFilterWithSelectionRepair = (filter: SubmissionQueueFilter) => {
    setVendorQueueFilter(filter)

    const visibleQueue = filter === 'current'
      ? submissionQueue.filter((submission) => submission.opportunityId === currentOpportunity.id)
      : [
          ...submissionQueue.filter((submission) => submission.opportunityId === currentOpportunity.id),
          ...submissionQueue.filter((submission) => submission.opportunityId !== currentOpportunity.id),
        ]

    const repairedSelection = ensureSubmissionSelection(visibleQueue, currentOpportunity.id, selectedSubmissionId)

    if (repairedSelection) {
      setSelectedSubmissionByOpportunity((current) => ({
        ...current,
        [currentOpportunity.id]: repairedSelection.id,
      }))
    }
  }

  const setAgencyQueueFilterWithSelectionRepair = (filter: SubmissionQueueFilter) => {
    setAgencyQueueFilter(filter)

    const visibleQueue = (filter === 'current'
      ? submissionQueue.filter((submission) => submission.opportunityId === currentOpportunity.id && submission.status !== 'draft')
      : submissionQueue.filter((submission) => submission.status !== 'draft'))

    const repairedSelection = ensureSubmissionSelection(visibleQueue, currentOpportunity.id, selectedSubmissionId)
      ?? visibleQueue[0]
      ?? null

    if (repairedSelection) {
      setSelectedSubmissionByOpportunity((current) => ({
        ...current,
        [repairedSelection.opportunityId]: repairedSelection.id,
      }))

      if (repairedSelection.opportunityId !== currentOpportunity.id) {
        setSelectedOpportunityId(repairedSelection.opportunityId)
      }
    }
  }

  const uploadNextSubmissionDocument = () => {
    setSubmissionDocumentsByOpportunity((current) => {
      const currentDocuments = current[currentOpportunity.id] ?? initialSubmissionDocuments
      const pendingIndex = currentDocuments.findIndex((document) => document.status.toLowerCase().includes('pending'))

      if (pendingIndex === -1) {
        return current
      }

      return {
        ...current,
        [currentOpportunity.id]: currentDocuments.map((document, index) =>
          index === pendingIndex ? { ...document, status: 'Attached' } : document,
        ),
      }
    })
  }

  const upsertSubmission = (status: Submission['status']) => {
    const vendorName = submissionForm.signer.split(',')[0]?.trim() || 'Draft Vendor Response'
    const opportunityRecord = currentOpportunity

    setSubmissionQueue((current) => {
      const existingIndex = current.findIndex(
        (submission) => submission.id === selectedSubmissionId && submission.opportunityId === opportunityRecord.id,
      )
      const nextRecord: Submission = {
        id: existingIndex === -1 ? `sub-${Date.now()}` : current[existingIndex].id,
        opportunityId: opportunityRecord.id,
        vendor: vendorName,
        opportunity: opportunityRecord.title,
        submittedAt: status === 'draft' ? 'Saved just now' : 'Submitted just now',
        status,
      }

      if (existingIndex === -1) {
        setSelectedSubmissionByOpportunity((selected) => ({
          ...selected,
          [opportunityRecord.id]: nextRecord.id,
        }))
        return [nextRecord, ...current]
      }

      setSelectedSubmissionByOpportunity((selected) => ({
        ...selected,
        [opportunityRecord.id]: nextRecord.id,
      }))

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
      const activeIndex = current.findIndex(
        (submission) => submission.id === selectedSubmissionId,
      )

      if (activeIndex === -1) {
        return current
      }

      const updatedQueue = current.map((submission, index) =>
        index === activeIndex ? { ...submission, status } : submission,
      )

      const repairedSelection = ensureSubmissionSelection(updatedQueue, currentOpportunity.id, selectedSubmissionId)
      if (repairedSelection) {
        setSelectedSubmissionByOpportunity((selected) => ({
          ...selected,
          [currentOpportunity.id]: repairedSelection.id,
        }))
      }

      return updatedQueue
    })
  }

  const archiveSubmission = () => {
    setSubmissionQueue((current) => {
      const remaining = current.filter((submission) => submission.id !== selectedSubmissionId)
      const nextForSameOpportunity = remaining.find((submission) => submission.opportunityId === currentOpportunity.id)
      const fallbackSubmission = nextForSameOpportunity ?? remaining[0] ?? null

      setSelectedSubmissionByOpportunity((selected) => {
        const next = { ...selected }

        if (nextForSameOpportunity) {
          next[currentOpportunity.id] = nextForSameOpportunity.id
        } else {
          delete next[currentOpportunity.id]
        }

        if (fallbackSubmission) {
          next[fallbackSubmission.opportunityId] = fallbackSubmission.id
        }

        return next
      })

      if (!nextForSameOpportunity && fallbackSubmission) {
        setSelectedOpportunityId(fallbackSubmission.opportunityId)
      }

      return remaining
    })
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
          packageCompletenessItems,
          submissionDocuments,
          draftSummary,
          uploadNextSubmissionDocument,
          isBidPublished,
          saveDraft,
          publishBid,
          publishedOpportunity,
          currentOpportunity,
          selectOpportunity,
          readinessByOpportunityId,
          submissionQueue,
          selectedSubmissionId,
          selectSubmission,
          startNewSubmission,
          vendorQueueFilter,
          setVendorQueueFilterWithSelectionRepair,
          agencyQueueFilter,
          setAgencyQueueFilterWithSelectionRepair,
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
