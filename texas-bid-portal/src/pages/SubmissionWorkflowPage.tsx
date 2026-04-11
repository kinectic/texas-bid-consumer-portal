import { FieldMock } from '../components/FieldMock'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { SectionIntro } from '../components/SectionIntro'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { submissionDocuments } from '../data/formState'
import { selectedOpportunity } from '../data/mockData'
import type { SubmissionFormState } from '../types/forms'

type SubmissionWorkflowPageProps = {
  formState: SubmissionFormState
  onChange: (field: keyof SubmissionFormState, value: string) => void
}

export function SubmissionWorkflowPage({ formState, onChange }: SubmissionWorkflowPageProps) {
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
          <SectionIntro
            eyebrow="Submission entry"
            title="Opportunity summary"
            description="The live opportunity context that stays visible while the vendor assembles the response packet."
          />
          <p className="detail-copy">{opportunity.summary}</p>
        </div>

        <OpportunityMetadataPanel opportunity={opportunity} title="Submission metadata" />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <SectionIntro
            eyebrow="Response status"
            title="Submission status"
            description="The vendor-side readiness state before the packet can be sent for agency review."
          />
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

        <VendorSubmissionPacketPanel />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <SectionIntro
            eyebrow="Vendor drafting"
            title="Response builder"
            description="The editable vendor response form covering signer details, pricing, timing, and narrative support."
          />
          <div className="form-mock create-bid-form">
            <FieldMock label="Company contact and authorized signer" value={formState.signer} onChange={(value) => onChange('signer', value)} />
            <div className="input-row">
              <FieldMock label="Pricing total" value={formState.pricing} onChange={(value) => onChange('pricing', value)} />
              <FieldMock label="Delivery / service timeline" value={formState.timeline} onChange={(value) => onChange('timeline', value)} />
            </div>
            <FieldMock label="Response narrative" value={formState.narrative} multiline onChange={(value) => onChange('narrative', value)} />
            <FieldMock label="Exceptions, qualifications, or clarifications" value={formState.exceptions} multiline onChange={(value) => onChange('exceptions', value)} />
          </div>
        </div>

        <div className="panel">
          <SectionIntro
            eyebrow="Packet files"
            title="Required attachments"
            description="The packet components the vendor must gather and upload before final submission."
          />
          <div className="draft-list">
            {submissionDocuments.map((document) => (
              <div className="draft-card" key={document.name}>
                <strong>{document.name}</strong>
                <div className="muted">{document.status}</div>
              </div>
            ))}
          </div>
          <button className="ghost wide">Upload attachment</button>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title="Pre-submit checklist" contextLabel={opportunity.title} />

        <div className="panel">
          <SectionIntro
            eyebrow="Final step"
            title="Submission confirmation"
            description="The last confirmation state before the vendor sends the completed response into agency review."
          />
          <div className="dashboard-note">
            This is the core V1 workflow: vendors should be able to move from {opportunity.title} discovery to actual response submission without leaving the Texas-first portal.
          </div>
          <button className="primary wide">Final submit</button>
        </div>
      </section>
    </main>
  )
}
