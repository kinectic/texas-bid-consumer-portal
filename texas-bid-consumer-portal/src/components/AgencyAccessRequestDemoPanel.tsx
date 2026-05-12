const requestSteps = [
  {
    title: 'Agency submits guided access request',
    detail: 'Organization, entity type, jurisdiction, and procurement contacts are captured before any workspace exists.',
  },
  {
    title: 'TexasBid verifies public-entity legitimacy',
    detail: 'The review confirms government identity, website/domain fit, and the correct onboarding owner.',
  },
  {
    title: 'Workspace is provisioned with admin controls',
    detail: 'Approved agencies get a private workspace, admin activation, and a guided first-posting setup path.',
  },
  {
    title: 'Agency team moves into live posting operations',
    detail: 'Only after approval does the team draft, publish, review vendor submissions, and manage bid workflow internally.',
  },
] as const

const requestFields = [
  'Entity name',
  'Entity type',
  'County / city',
  'Official website',
  'Government email',
  'Primary procurement contact',
] as const

const verificationChecks = [
  'Government entity identity matches the stated jurisdiction',
  'Official website and email domain support legitimacy review',
  'Primary procurement owner is identified before access is issued',
  'Workspace provisioning happens only after manual approval',
] as const

export function AgencyAccessRequestDemoPanel() {
  return (
    <div className="panel agency-access-request-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Controlled government onboarding</div>
          <div className="panel-title">Agency access request demo</div>
          <div className="panel-subtitle">Approval-based onboarding for verified Texas public entities.</div>
        </div>
        <span className="status status-review">Approval required</span>
      </div>

      <div className="agency-access-request-grid">
        <div className="draft-card">
          <strong>Request intake</strong>
          <div className="draft-list agency-access-request-fields">
            {requestFields.map((field) => (
              <div key={field} className="field-mock">
                <div className="field-mock-label">{field}</div>
                <div className="field-mock-value">Collected during guided agency enrollment</div>
              </div>
            ))}
          </div>
        </div>

        <div className="draft-card">
          <strong>White-glove rollout path</strong>
          <div className="timeline-list agency-access-request-steps">
            {requestSteps.map((step) => (
              <div className="timeline-item" key={step.title}>
                <div className="timeline-dot" />
                <div>
                  <strong>{step.title}</strong>
                  <div className="timeline-detail">{step.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="agency-access-request-grid">
        <div className="draft-card">
          <strong>Verification gate</strong>
          <div className="package-completeness-list agency-access-request-steps">
            {verificationChecks.map((item) => (
              <div className="submission-status-snapshot-row" key={item}>
                <span className="status status-open">Check</span>
                <div className="muted">{item}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="draft-card">
          <strong>Demo position</strong>
          <div className="dashboard-note compact-note">
            This lane keeps agency creation private. Vendors never self-upgrade into government access, and internal workspaces stay provisioned through review instead of open signup.
          </div>
          <div className="dashboard-note compact-note">
            Use this panel early in the showcase to establish trust, rollout control, and why Texas agencies get a governed onboarding path.
          </div>
        </div>
      </div>
    </div>
  )
}
