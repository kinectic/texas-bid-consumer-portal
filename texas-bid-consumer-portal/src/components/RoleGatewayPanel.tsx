import type { ViewKey } from '../data/viewData'

type RoleGatewayPanelProps = {
  onNavigate: (view: ViewKey) => void
}

const roleGatewayMilestones = [
  {
    label: '1. Customer posts the job',
    detail: 'Start with a simple Texas-first intake that describes scope, urgency, budget signal, and location clearly.',
    target: 'home' as ViewKey,
  },
  {
    label: '2. Contractors get matched locally',
    detail: 'Move into the marketplace where the right local pros can be discovered by county, city, trade, and trust.',
    target: 'marketplace' as ViewKey,
  },
  {
    label: '3. Customer compares and hires',
    detail: 'Finish in the workspace where bids, trust, messages, and next actions stay attached to the job.',
    target: 'vendor-dashboard' as ViewKey,
  },
]

export function RoleGatewayPanel({ onNavigate }: RoleGatewayPanelProps) {
  return (
    <section className="content-grid lower-grid role-gateway-grid">
      <div className="panel role-gateway-panel role-gateway-panel-primary">
        <div className="eyebrow">For customers</div>
        <h2>Describe the job once, then compare serious local contractors</h2>
        <p className="intro">
          The customer path should feel straightforward: define the work, see credible local options, compare bids, ask questions, and choose confidently.
        </p>
        <div className="draft-list">
          <div className="draft-card">
            <strong>Customer goals</strong>
            <div className="muted">Post a job, review contractor fit, compare bids, and keep conversation attached to the job record.</div>
          </div>
          <div className="draft-card">
            <strong>Customer trust need</strong>
            <div className="muted">Make contractor quality, response speed, and proof visible before the customer wastes time.</div>
          </div>
        </div>
        <div className="top-actions">
          <button className="primary" onClick={() => onNavigate('marketplace')}>Find local contractors</button>
          <button className="ghost" onClick={() => onNavigate('vendor-dashboard')}>Open my jobs</button>
        </div>
      </div>

      <div className="panel role-gateway-panel">
        <div className="eyebrow">For contractors</div>
        <h2>Give good contractors a cleaner path to trust and demand</h2>
        <p className="intro">
          Contractors should be able to set up a credible profile, define service areas, and respond to real local jobs without slogging through enterprise-style friction.
        </p>
        <div className="draft-list">
          <div className="draft-card">
            <strong>Contractor goals</strong>
            <div className="muted">Create a profile, show service coverage, build trust, and respond to matching opportunities quickly.</div>
          </div>
          <div className="draft-card">
            <strong>Marketplace support</strong>
            <div className="muted">Trust tiers, messaging, and local matching should help strong contractors stand out instead of getting buried.</div>
          </div>
        </div>
        <div className="top-actions">
          <button className="primary" onClick={() => onNavigate('contractor-onboarding')}>Open contractor onboarding</button>
          <button className="ghost" onClick={() => onNavigate('trust-center')}>View trust tiers</button>
        </div>
      </div>

      <div className="panel role-gateway-milestone-panel">
        <div className="eyebrow">Marketplace split</div>
        <div className="panel-title">Customer path + contractor path</div>
        <div className="panel-subtitle">Use this to show the two sides of the marketplace and where they meet inside the hiring workflow.</div>
        <div className="role-gateway-milestone-list">
          {roleGatewayMilestones.map((milestone) => (
            <button key={milestone.label} className="draft-card cta-card" onClick={() => onNavigate(milestone.target)}>
              <strong>{milestone.label}</strong>
              <div className="muted">{milestone.detail}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
