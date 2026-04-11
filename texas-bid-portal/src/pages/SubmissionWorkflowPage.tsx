import { FieldMock } from '../components/FieldMock'
import { LifecycleSummaryPanel } from '../components/LifecycleSummaryPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PackageCompletenessPanel } from '../components/PackageCompletenessPanel'
import { SectionIntro } from '../components/SectionIntro'
import { SubmissionAttachmentsPanel } from '../components/SubmissionAttachmentsPanel'
import { SubmissionChecklistPanel } from '../components/SubmissionChecklistPanel'
import { SubmissionStatusSnapshot } from '../components/SubmissionStatusSnapshot'
import { VendorSubmissionPacketPanel } from '../components/VendorSubmissionPacketPanel'
import { WorkflowStageSummary } from '../components/WorkflowStageSummary'
import { submissionDocuments } from '../data/formState'
import { selectedOpportunity } from '../data/mockData'
import { submissionStatusSummary } from '../data/submissionStatus'
import type { SubmissionFormState } from '../types/forms'

const submissionStageSummaryItems = [
  {
    stage: 'Qualification',
    owner: 'Vendor',
    detail: 'Confirm fit, urgency, and document readiness before spending effort on the packet.',
  },
  {
    stage: 'Response assembly',
    owner: 'Vendor',
    detail: 'Prepare signer details, pricing, narrative support, and all required attachments.',
  },
  {
    stage: 'Agency review',
    owner: 'Agency',
    detail: 'Submission moves into completeness checks, clarification handling, and shortlist decisions.',
  },
]

const submissionStatusItems = [
  submissionStatusSummary.received,
  submissionStatusSummary.reviewing,
  submissionStatusSummary.shortlisted,
]

const packageCompletenessItems = [
  {
    title: 'Pricing response',
    detail: 'In progress and ready for final vendor confirmation',
  },
  {
    title: 'Compliance packet',
    detail: 'Required attachments are ready to upload before submission',
  },
  {
    title: 'Signer confirmation',
    detail: 'Authorized signer is captured in the response form',
  },
]

const lifecycleSummaryItems = [
  {
    stage: '1. Review opportunity fit',
    detail: 'Confirm the bid matches capability, timing, and submission requirements.',
  },
  {
    stage: '2. Assemble response packet',
    detail: 'Prepare pricing, attachments, signer details, and response narrative.',
  },
  {
    stage: '3. Submit into agency review',
    detail: 'Send the final packet directly through the Texas-first portal workflow.',
  },
]

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
        <OpportunitySummaryPanel
          title="Opportunity summary"
          subtitle="The live opportunity context that stays visible while the vendor assembles the response packet."
          summary={opportunity.summary}
        />

        <OpportunityMetadataPanel opportunity={opportunity} title="Submission metadata" />
      </section>

      <section className="content-grid lower-grid">
        <WorkflowStageSummary title="Submission stage summary" items={submissionStageSummaryItems} />

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

        <SubmissionAttachmentsPanel
          title="Required attachments"
          description="The packet components the vendor must gather and upload before final submission."
          documents={submissionDocuments}
          actionLabel="Upload attachment"
        />
      </section>

      <section className="content-grid lower-grid">
        <SubmissionChecklistPanel title="Pre-submit checklist" contextLabel={opportunity.title} />

        <SubmissionStatusSnapshot items={submissionStatusItems} />
      </section>

      <section className="content-grid lower-grid">
        <PackageCompletenessPanel title="Response completeness" items={packageCompletenessItems} />

        <LifecycleSummaryPanel title="Submission lifecycle summary" items={lifecycleSummaryItems} />
      </section>

      <section className="content-grid lower-grid">
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
