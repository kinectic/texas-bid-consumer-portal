import { DraftPublishSummaryPanel } from '../components/DraftPublishSummaryPanel'
import { FieldMock } from '../components/FieldMock'
import { ProcurementChecklistPanel } from '../components/ProcurementChecklistPanel'
import { ReviewerNotesPanel } from '../components/ReviewerNotesPanel'
import { SubmissionAttachmentsPanel } from '../components/SubmissionAttachmentsPanel'
import { prePublishChecklist } from '../data/checklists'
import type { BidDocument, CreateBidFormState } from '../types/forms'

type CreateBidPageProps = {
  formState: CreateBidFormState
  documents: BidDocument[]
  onChange: (field: keyof CreateBidFormState, value: string) => void
}

export function CreateBidPage({ formState, documents, onChange }: CreateBidPageProps) {
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
          <button className="ghost">Save Draft</button>
          <button className="primary">Publish Bid</button>
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

        <DraftPublishSummaryPanel />
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
      </section>
    </main>
  )
}
