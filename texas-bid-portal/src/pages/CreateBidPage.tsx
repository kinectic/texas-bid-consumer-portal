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
            <div className="input-mock">Bid title</div>
            <div className="input-row">
              <div className="input-mock">Category</div>
              <div className="input-mock">Solicitation type</div>
            </div>
            <div className="input-row">
              <div className="input-mock">Issue date</div>
              <div className="input-mock">Submission deadline</div>
            </div>
            <div className="input-mock tall">Scope / project description</div>
            <div className="input-mock tall">Vendor requirements and evaluation notes</div>
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
