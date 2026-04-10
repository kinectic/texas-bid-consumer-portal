import { FieldMock } from '../components/FieldMock'
import { createBidFormState } from '../data/formState'

export function CreateBidPage() {
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
            <FieldMock label="Bid title" value={createBidFormState.title} />
            <div className="input-row">
              <FieldMock label="Category" value={createBidFormState.category} />
              <FieldMock label="Solicitation type" value={createBidFormState.solicitationType} />
            </div>
            <div className="input-row">
              <FieldMock label="Issue date" value={createBidFormState.issueDate} />
              <FieldMock label="Submission deadline" value={createBidFormState.deadline} />
            </div>
            <FieldMock label="Scope / project description" value={createBidFormState.scope} multiline />
            <FieldMock label="Vendor requirements and evaluation notes" value={createBidFormState.requirements} multiline />
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
              <div className="muted">RFP, pricing sheet, insurance requirements, vendor instructions</div>
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
            <div className="draft-card">
              <strong>Scope of Work.pdf</strong>
              <div className="muted">Required</div>
            </div>
            <div className="draft-card">
              <strong>Pricing Template.xlsx</strong>
              <div className="muted">Optional</div>
            </div>
            <div className="draft-card">
              <strong>Insurance Requirements.pdf</strong>
              <div className="muted">Required</div>
            </div>
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
