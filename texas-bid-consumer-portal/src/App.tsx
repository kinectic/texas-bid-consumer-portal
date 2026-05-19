import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ContextBanner } from './components/ContextBanner'
import { DemoFlowDock } from './components/DemoFlowDock'
import { DemoNarrativeCommandBar } from './components/DemoNarrativeCommandBar'
import { Sidebar } from './components/Sidebar'
import { WorkflowActions } from './components/WorkflowActions'
import {
  bidPacketDocuments,
  createBidFormState as initialCreateBidFormState,
  submissionDocuments as initialSubmissionDocuments,
  submissionFormState as initialSubmissionFormState,
} from './data/formState'
import { opportunities, vendorSubmissions as initialVendorSubmissions } from './data/mockData'
import { getPathForView, getViewFromLocation, viewOrder, type ViewKey } from './data/viewData'
import { ContractorOnboardingPage } from './pages/ContractorOnboardingPage'
import { HomeDashboardPage } from './pages/HomeDashboardPage'
import { HowItWorksPage } from './pages/HowItWorksPage'
import { MarketplacePage } from './pages/MarketplacePage'
import { MessagesPage } from './pages/MessagesPage'
import { OpportunityDetailPage } from './pages/OpportunityDetailPage'
import { SubmissionWorkflowPage } from './pages/SubmissionWorkflowPage'
import { TrustCenterPage } from './pages/TrustCenterPage'
import { VendorDashboardPage } from './pages/VendorDashboardPage'
import type { CreateBidFormState, SubmissionFormState, BidDocument } from './types/forms'
import type { Opportunity, Submission } from './types'
import { computeDraftSummaryState, computeReadinessByOpportunityId } from './utils/vendorLane'

type SubmissionFormStateByKey = Record<string, SubmissionFormState>
type SubmissionDocumentsByKey = Record<string, BidDocument[]>

type DraftSummary = {
  formStatus: string
  attachedCount: number
  totalDocuments: number
  submissionStatus: string
  bufferLabel: string
  preservedUnsavedDraftLabel: string
}

type OpportunityReadinessSummary = {
  label: string
  detail: string
}

type SubmissionQueueFilter = 'current' | 'all'
type SelectedSubmissionByOpportunity = Record<string, string>

function renderView(
  view: ViewKey,
  createBidForm: CreateBidFormState,
  submissionForm: SubmissionFormState,
  updateSubmissionForm: (field: keyof SubmissionFormState, value: string) => void,
  submissionDocuments: BidDocument[],
  draftSummary: DraftSummary,
  uploadNextSubmissionDocument: () => void,
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
  saveSubmissionDraft: () => void,
  submitVendorResponse: () => void,
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
      return <OpportunityDetailPage opportunity={currentOpportunity} submissionQueue={submissionQueue} onSelectSubmission={selectSubmission} onStartNewSubmission={startNewSubmission} onNavigate={navigate} />
    case 'contractor-onboarding':
      return <ContractorOnboardingPage onNavigate={navigate} />
    case 'messages':
      return <MessagesPage onNavigate={navigate} />
    case 'trust-center':
      return <TrustCenterPage onNavigate={navigate} />
    case 'how-it-works':
      return <HowItWorksPage onNavigate={navigate} />
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
  const [activeView, setActiveView] = useState<ViewKey>(() => getViewFromLocation(window.location.pathname))
  const [createBidForm] = useState<CreateBidFormState>(initialCreateBidFormState)
  const [submissionFormsByKey, setSubmissionFormsByKey] = useState<SubmissionFormStateByKey>({
    [`draft:${opportunities[0].id}`]: initialSubmissionFormState,
  })
  const [submissionDocumentsByKey, setSubmissionDocumentsByKey] = useState<SubmissionDocumentsByKey>({
    [`draft:${opportunities[0].id}`]: initialSubmissionDocuments,
  })
  const [submissionQueue, setSubmissionQueue] = useState<Submission[]>(initialVendorSubmissions)
  const initialRouteOpportunityId = useMemo(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('opportunity') ?? opportunities[0].id
  }, [])
  const [selectedOpportunityId, setSelectedOpportunityId] = useState(initialRouteOpportunityId)
  const [selectedSubmissionByOpportunity, setSelectedSubmissionByOpportunity] = useState<SelectedSubmissionByOpportunity>({
    'tx-001': 'sub-001',
    'tx-002': 'sub-002',
  })
  const [vendorQueueFilter, setVendorQueueFilter] = useState<SubmissionQueueFilter>('current')

  const publishedOpportunity = {
    ...opportunities[0],
    title: createBidForm.title,
    category: createBidForm.category,
    dueDate: createBidForm.deadline,
    summary: createBidForm.scope,
    source: 'TexasBid Consumer Job Intake',
    documents: bidPacketDocuments.map((document) => document.name),
  }

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

  const selectedSubmissionId = selectedSubmissionByOpportunity[currentOpportunity.id] ?? null

  const currentSubmission = submissionQueue.find((submission) => submission.id === selectedSubmissionId)
    ?? submissionQueue.find((submission) => submission.opportunityId === currentOpportunity.id)
    ?? null
  const {
    currentDraftKey,
    submissionForm,
    submissionDocuments,
    draftSummary,
  }: {
    currentDraftKey: string
    submissionForm: SubmissionFormState
    submissionDocuments: BidDocument[]
    attachedCount: number
    draftSummary: DraftSummary
  } = computeDraftSummaryState({
    currentOpportunityId: currentOpportunity.id,
    selectedSubmissionId,
    currentSubmission,
    submissionFormsByKey,
    submissionDocumentsByKey,
    initialSubmissionFormState,
    initialSubmissionDocuments,
  })
  const readinessByOpportunityId: Record<string, OpportunityReadinessSummary> = computeReadinessByOpportunityId({
    opportunities,
    selectedSubmissionByOpportunity,
    submissionFormsByKey,
    submissionDocumentsByKey,
    submissionQueue,
    initialSubmissionFormState,
    initialSubmissionDocuments,
  })
  const updateSubmissionForm = (field: keyof SubmissionFormState, value: string) => {
    setSubmissionFormsByKey((current) => ({
      ...current,
      [currentDraftKey]: {
        ...(current[currentDraftKey] ?? initialSubmissionFormState),
        [field]: value,
      },
    }))
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
    setSelectedOpportunityId(submission.opportunityId)
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

    const hasDraftEdits =
      Object.entries(submissionFormsByKey[`draft:${currentOpportunity.id}`] ?? initialSubmissionFormState).some(
        ([key, value]) => value !== initialSubmissionFormState[key as keyof SubmissionFormState],
      )
      || (submissionDocumentsByKey[`draft:${currentOpportunity.id}`] ?? initialSubmissionDocuments).some(
        (document, index) => document.status !== initialSubmissionDocuments[index]?.status,
      )

    if (!hasDraftEdits) {
      setSubmissionFormsByKey((current) => ({
        ...current,
        [`draft:${currentOpportunity.id}`]: {
          ...initialSubmissionFormState,
        },
      }))

      setSubmissionDocumentsByKey((current) => ({
        ...current,
        [`draft:${currentOpportunity.id}`]: initialSubmissionDocuments.map((document) => ({ ...document })),
      }))
    }
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

  const uploadNextSubmissionDocument = () => {
    setSubmissionDocumentsByKey((current) => {
      const currentDocuments = current[currentDraftKey] ?? initialSubmissionDocuments
      const pendingIndex = currentDocuments.findIndex((document) => document.status.toLowerCase().includes('pending'))

      if (pendingIndex === -1) {
        return current
      }

      return {
        ...current,
        [currentDraftKey]: currentDocuments.map((document, index) =>
          index === pendingIndex ? { ...document, status: 'Attached' } : document,
        ),
      }
    })
  }

  const upsertSubmission = (status: Submission['status']) => {
    const vendorName = submissionForm.signer.split(',')[0]?.trim() || 'Draft Vendor Response'
    const opportunityRecord = currentOpportunity
    const sourceForm = submissionFormsByKey[currentDraftKey] ?? initialSubmissionFormState
    const sourceDocuments = submissionDocumentsByKey[currentDraftKey] ?? initialSubmissionDocuments

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
        setSubmissionFormsByKey((buffers) => ({
          ...buffers,
          [nextRecord.id]: { ...sourceForm },
        }))
        setSubmissionDocumentsByKey((buffers) => ({
          ...buffers,
          [nextRecord.id]: sourceDocuments.map((document) => ({ ...document })),
        }))
        setSelectedSubmissionByOpportunity((selected) => ({
          ...selected,
          [opportunityRecord.id]: nextRecord.id,
        }))
        return [nextRecord, ...current]
      }

      setSubmissionFormsByKey((buffers) => ({
        ...buffers,
        [nextRecord.id]: { ...sourceForm },
      }))
      setSubmissionDocumentsByKey((buffers) => ({
        ...buffers,
        [nextRecord.id]: sourceDocuments.map((document) => ({ ...document })),
      }))
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

  useEffect(() => {
    const handlePopState = () => {
      const nextView = getViewFromLocation(window.location.pathname)
      const params = new URLSearchParams(window.location.search)
      const opportunityFromRoute = params.get('opportunity')
      const submissionFromRoute = params.get('submission')
      const queueFromRoute = params.get('queue') as SubmissionQueueFilter | null

      setActiveView(nextView)

      if (opportunityFromRoute) {
        setSelectedOpportunityId(opportunityFromRoute)
      }

      if (submissionFromRoute && opportunityFromRoute) {
        setSelectedSubmissionByOpportunity((current) => ({
          ...current,
          [opportunityFromRoute]: submissionFromRoute,
        }))
      }

      if (queueFromRoute === 'current' || queueFromRoute === 'all') {
        setVendorQueueFilter(queueFromRoute)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const nextPath = getPathForView(activeView)
    const params = new URLSearchParams()

    params.set('opportunity', currentOpportunity.id)

    if (selectedSubmissionId) {
      params.set('submission', selectedSubmissionId)
    }

    const queueValue = activeView === 'vendor-dashboard'
      ? vendorQueueFilter
      : null

    if (queueValue) {
      params.set('queue', queueValue)
    }

    const nextUrl = `${nextPath}${params.toString() ? `?${params.toString()}` : ''}`
    const currentUrl = `${window.location.pathname}${window.location.search}`

    if (currentUrl !== nextUrl) {
      window.history.replaceState({}, '', nextUrl)
    }
  }, [activeView, currentOpportunity.id, selectedSubmissionId, vendorQueueFilter])

  const navigateToView = (view: ViewKey) => {
    setActiveView(view)
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onSelect={navigateToView} />
      <div className="page-shell">
        <div className="showcase-lane-label">Consumer marketplace navigation</div>
        <div className="view-switcher">
          {viewOrder.map((view) => {
            const laneClass = view.key === 'marketplace' || view.key === 'opportunity' || view.key === 'vendor-dashboard' || view.key === 'submission-workflow'
              ? 'switch-pill-vendor'
              : view.key === 'contractor-onboarding' || view.key === 'messages' || view.key === 'trust-center'
                ? 'switch-pill-agency'
                : ''
            const activeClass = view.key === activeView ? 'switch-pill switch-pill-active' : 'switch-pill'
            return (
              <button
                key={view.key}
                className={`${activeClass} ${laneClass}`.trim()}
                onClick={() => navigateToView(view.key)}
              >
                {view.label}
              </button>
            )
          })}
        </div>
        <ContextBanner activeView={activeView} />
        <DemoFlowDock activeView={activeView} onNavigate={navigateToView} />
        <DemoNarrativeCommandBar activeView={activeView} onNavigate={navigateToView} />
        <WorkflowActions activeView={activeView} onNavigate={navigateToView} />
        {renderView(
          activeView,
          createBidForm,
          submissionForm,
          updateSubmissionForm,
          submissionDocuments,
          draftSummary,
          uploadNextSubmissionDocument,
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
          saveSubmissionDraft,
          submitVendorResponse,
          navigateToView,
        )}
      </div>
    </div>
  )
}

export default App
