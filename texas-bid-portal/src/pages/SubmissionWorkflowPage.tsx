import { opportunities } from '../data/mockData'

export function SubmissionWorkflowPage() {
  const selectedOpportunity = opportunities[0]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Vendor workspace</div>
          <h1>Submission workflow</h1>
          <p className="intro">
            A direct submission flow where Texas vendors can confirm fit, upload documents, answer requirements, and submit a bid response inside the platform.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost">Save Progress</button>
          <button className="primary">Submit Response</button>
        </div>
      </header>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-title">Opportunity summary</div>
          <div className="detail-grid">
            <div>
              <div className="detail-label">Bid</div>
              <div>{selectedOpportunity.title}</div>
            </div>
            <div>
              <div className="detail-label">Agency</div>
              <div>{selectedOpportunity.agency}</div>
            </div>
            <div>
              <div className="detail-label">Deadline</div>
              <div>{selectedOpportunity.dueDate}</div>
            </div>
            <div>
              <div className="detail-label">Category</div>
              <div>{selectedOpportunity.category}</div>
            </div>
          </div>
          <p className="detail-copy">{selectedOpportunity.summary}</p>
        </div>

        <div className="panel">
          <div className="panel-title">Submission status</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Company profile</strong>
              <div className="muted">Verified</div>
            </div>
            <div className="draft-card">
              <strong>Compliance packet</strong>
              <div className="muted">Ready to attach</div>
            </div>
            <div className="draft-card">
              <strong>Pricing response</strong>
              <div className="muted">In progress</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Response builder</div>
          <div className="form-mock create-bid-form">
            <div className="input-mock">Company contact and authorized signer</div>
            <div className="input-row">
              <div className="input-mock">Pricing total</div>
              <div className="input-mock">Delivery / service timeline</div>
            </div>
            <div className="input-mock tall">Response narrative</div>
            <div className="input-mock tall">Exceptions, qualifications, or clarifications</div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Required attachments</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Pricing Sheet.xlsx</strong>
              <div className="muted">Pending upload</div>
            </div>
            <div className="draft-card">
              <strong>W-9.pdf</strong>
              <div className="muted">Attached</div>
            </div>
            <div className="draft-card">
              <strong>Insurance Certificate.pdf</strong>
              <div className="muted">Attached</div>
            </div>
          </div>
          <button className="ghost wide">Upload attachment</button>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Pre-submit checklist</div>
          <ol className="flow-list">
            <li>Pricing file attached</li>
            <li>Required compliance documents attached</li>
            <li>Response narrative completed</li>
            <li>Authorized signer confirmed</li>
            <li>Submission confirmation ready</li>
          </ol>
        </div>

        <div className="panel">
          <div className="panel-title">Submission confirmation</div>
          <div className="dashboard-note">
            This is the core V1 workflow: vendors should be able to move from discovery to actual response submission without leaving the Texas-first portal.
          </div>
          <button className="primary wide">Final submit</button>
        </div>
      </section>
    </main>
  )
}
