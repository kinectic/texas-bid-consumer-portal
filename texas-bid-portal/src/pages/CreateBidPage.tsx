import { FieldMock } from '../components/FieldMock'
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

        <div className="panel">
          <div className="panel-title">Publishing controls</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Visibility</strong>
              <div className="muted">Texas statewide marketplace listing</div>
            </div>
            <div className="draft-card">
              <strong>Document package</strong>
              <div className="muted">Synced from the shared bid packet state below</div>
            </div>
            <div className="draft-card">
              <strong>Submission mode</strong>
              <div className="muted">Direct portal response with attachments and confirmations</div>
            </div>
          </div>
          <div className="dashboard-note">
            This form is where the product stops being a marketplace mock and starts behaving like an agency posting workflow.
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid create-bid-layout">
        <div className="panel">
          <div className="panel-title">Attachments</div>
          <div className="draft-list">
            {documents.map((document) => (
              <div className="draft-card" key={document.name}>
                <strong>{document.name}</strong>
                <div className="muted">{document.status}</div>
              </div>
            ))}
          </div>
          <button className="ghost wide">Add Attachment</button>
        </div>

        <div className="panel">
          <div className="panel-title">Pre-publish checklist</div>
          <ol className="flow-list">
            <li>Title and category are clear to vendors</li>
            <li>Deadline and issue dates are set</li>
            <li>Scope and evaluation notes are complete</li>
            <li>Required attachments are uploaded</li>
            <li>Submission mode is ready for vendor intake</li>
          </ol>
          <button className="primary wide">Submit for agency review</button>
        </div>
      </section>
    </main>
  )
}
