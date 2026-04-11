import { AgencyFlowPanel } from '../components/AgencyFlowPanel'
import { BidFormOverviewPanel } from '../components/BidFormOverviewPanel'
import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { FieldMock } from '../components/FieldMock'
import { ProcurementChecklistPanel } from '../components/ProcurementChecklistPanel'
import { ReviewerNotesPanel } from '../components/ReviewerNotesPanel'
import { SubmissionAttachmentsPanel } from '../components/SubmissionAttachmentsPanel'
import { prePublishChecklist } from '../data/checklists'
import type { ViewKey } from '../data/viewData'
import type { BidDocument, CreateBidFormState } from '../types/forms'

const agencyFlowSteps = [
  'Create agency profile',
  'Draft solicitation with deadlines and attachments',
  'Publish to Texas marketplace',
  'Review vendor responses in one dashboard',
] as const

type CreateBidPageProps = {
  formState: CreateBidFormState
  documents: BidDocument[]
  onChange: (field: keyof CreateBidFormState, value: string) => void
  isPublished: boolean
  onSaveDraft: () => void
  onPublishBid: () => void
  onNavigate: (view: ViewKey) => void
}

export function CreateBidPage({
  formState,
  documents,
  onChange,
  isPublished,
  onSaveDraft,
  onPublishBid,
  onNavigate,
}: CreateBidPageProps) {
  const draftSummaryItems = [
    {
      title: isPublished ? 'Published to marketplace' : 'Draft in progress',
      detail: isPublished
        ? 'This solicitation is now live in the Texas marketplace feed and visible in the agency dashboard active opportunities list.'
        : 'The solicitation is still editable and waiting for a final publish action before vendors can discover it.',
    },
    {
      title: 'Form fields synced',
      detail: 'Title, category, scope, and requirements update the shared MVP preview state in real time.',
    },
    {
      title: 'Publish destination',
      detail: 'Publishing promotes this draft into the live marketplace and agency active-bids surfaces.',
    },
  ] as const

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Agency workspace</div>
          <h1>Create a new bid</h1>
          <p className="intro">
            A cleaner Texas-first solicitation form that lets agencies draft, structure, and publish bid opportunities without fighting a bloated procurement portal.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => {
            onSaveDraft()
            onNavigate('agency-dashboard')
          }}>Save Draft</button>
          <button className="primary" onClick={() => {
            onPublishBid()
            onNavigate('marketplace')
          }}>Publish Bid</button>
        </div>
      </header>

      <section className="content-grid create-bid-layout">
        <div className="panel">
          <div className="panel-title">Solicitation details</div>
          <div className="form-mock create-bid-form">
            <FieldMock label="Bid title" value={formState.title} onChange={(value) => onChange('title', value)} />
            <div className="input-row">
              <FieldMock label="Category" value={formState.category} onChange={(value) => onChange('category', value)} />
              <FieldMock label="Solicitation type" value={formState.solicitationType} onChange={(value) => onChange('solicitationType', value)} />
            </div>
            <div className="input-row">
              <FieldMock label="Issue date" value={formState.issueDate} onChange={(value) => onChange('issueDate', value)} />
              <FieldMock label="Submission deadline" value={formState.deadline} onChange={(value) => onChange('deadline', value)} />
            </div>
            <FieldMock label="Scope / project description" value={formState.scope} multiline onChange={(value) => onChange('scope', value)} />
            <FieldMock label="Vendor requirements and evaluation notes" value={formState.requirements} multiline onChange={(value) => onChange('requirements', value)} />
          </div>
        </div>

        <DraftPublishSummaryPanel items={draftSummaryItems} />
      </section>

      <section className="content-grid lower-grid create-bid-layout">
        <SubmissionAttachmentsPanel
          title="Attachments"
          description="The supporting files agencies need to upload before vendors can review and respond."
          documents={documents}
          actionLabel="Add attachment"
        />

        <ProcurementChecklistPanel
          title="Pre-publish checklist"
          items={prePublishChecklist}
          actionLabel="Submit for agency review"
          onAction={() => onNavigate('agency-submission-review')}
        />
      </section>

      <section className="content-grid lower-grid create-bid-layout">
        <ReviewerNotesPanel
          title="Agency drafting notes"
          primaryLabel="Internal drafting notes"
          primaryValue={formState.scope}
          secondaryLabel="Vendor guidance notes"
          secondaryValue={formState.requirements}
          onPrimaryChange={(value) => onChange('scope', value)}
          onSecondaryChange={(value) => onChange('requirements', value)}
          actionLabel="Save drafting notes"
        />

        <AgencyFlowPanel
          title="Agency workflow"
          description="How this draft moves from internal preparation into a live Texas marketplace opportunity."
          steps={agencyFlowSteps}
        />
      </section>

      <section className="content-grid lower-grid create-bid-layout">
        <BidFormOverviewPanel formState={formState} />
      </section>
    </main>
  )
}
