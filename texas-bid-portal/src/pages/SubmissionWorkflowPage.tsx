import { FieldMock } from '../components/FieldMock'
import { submissionFormState } from '../data/formState'
import { selectedOpportunity } from '../data/mockData'

export function SubmissionWorkflowPage() {
  const opportunity = selectedOpportunity

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
              <div>{opportunity.title}</div>
            </div>
            <div>
              <div className="detail-label">Agency</div>
              <div>{opportunity.agency}</div>
            </div>
            <div>
              <div className="detail-label">Deadline</div>
              <div>{opportunity.dueDate}</div>
            </div>
            <div>
              <div className="detail-label">Category</div>
              <div>{opportunity.category}</div>
            </div>
            <div>
              <div className="detail-label">Source</div>
              <div>{opportunity.source}</div>
            </div>
            <div>
              <div className="detail-label">Opportunity ID</div>
              <div>{opportunity.id}</div>
            </div>
          </div>
          <p className="detail-copy">{opportunity.summary}</p>
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
            <FieldMock label="Company contact and authorized signer" value={submissionFormState.signer} />
            <div className="input-row">
              <FieldMock label="Pricing total" value={submissionFormState.pricing} />
              <FieldMock label="Delivery / service timeline" value={submissionFormState.timeline} />
            </div>
            <FieldMock label="Response narrative" value={submissionFormState.narrative} multiline />
            <FieldMock label="Exceptions, qualifications, or clarifications" value={submissionFormState.exceptions} multiline />
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Required attachments</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>{opportunity.documents[2]}</strong>
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
            <li>Pricing file attached for {opportunity.title}</li>
            <li>Required compliance documents attached</li>
            <li>Response narrative completed</li>
            <li>Authorized signer confirmed</li>
            <li>Submission confirmation ready</li>
          </ol>
        </div>

        <div className="panel">
          <div className="panel-title">Submission confirmation</div>
          <div className="dashboard-note">
            This is the core V1 workflow: vendors should be able to move from {opportunity.title} discovery to actual response submission without leaving the Texas-first portal.
          </div>
          <button className="primary wide">Final submit</button>
        </div>
      </section>
    </main>
  )
}
