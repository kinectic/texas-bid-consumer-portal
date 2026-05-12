import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { FinalActionPanel } from '../components/FinalActionPanel'
import type { ViewKey } from '../data/viewData'

type ContractorOnboardingPageProps = {
  onNavigate: (view: ViewKey) => void
}

const onboardingSteps = [
  {
    title: 'Create your contractor profile',
    detail: 'Business name, trade, phone, email, and the Texas cities or counties you actually serve.',
  },
  {
    title: 'Add trust signals',
    detail: 'Verify contact details first, then add business identity, insurance, license, and service proof over time.',
  },
  {
    title: 'Start seeing matching jobs',
    detail: 'Once your profile is live, the marketplace can route relevant local jobs and give customers stronger confidence.',
  },
] as const

const trustTiers = [
  'Unverified',
  'Contact Verified',
  'Business Verified',
  'Pro Verified',
  'Top Performer',
] as const

const contractorValuePoints = [
  'Local jobs should feel reachable, not buried in a national lead feed.',
  'Trust signals help serious contractors stand out without forcing a giant application first.',
  'The product should make it obvious how credibility turns into more customer confidence.',
] as const

const earlyLaunchContractorPoints = [
  'Early marketplace supply grows faster when the first onboarding step is simple.',
  'Contractors should see how stronger trust proof can improve visibility and customer confidence over time.',
  'The launch story should make it clear that good local contractors can join early without heavy enterprise friction.',
] as const

const onboardingToMarketplaceLoop = [
  'Start with lightweight profile setup so contractors can enter supply quickly.',
  'Use trust tiers to show how stronger proof improves customer confidence.',
  'Return contractors to the live marketplace context so trust feels tied to real demand, not just admin setup.',
] as const

export function ContractorOnboardingPage({ onNavigate }: ContractorOnboardingPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">For contractors</div>
          <h1>Join the Texas marketplace without heavy signup friction</h1>
          <p className="intro">
            Contractors should understand what it takes to get visible, trusted, and ready to win work across Texas without forcing enterprise-style onboarding on day one.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('trust-center')}>View trust tiers</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>Browse marketplace</button>
        </div>
      </header>

      <DemoNarrativeCommandBar activeView="contractor-onboarding" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Contractor path</div>
          <h2>How contractors get marketplace-ready</h2>
          <div className="draft-list">
            {onboardingSteps.map((step) => (
              <div key={step.title} className="draft-card">
                <strong>{step.title}</strong>
                <div className="muted">{step.detail}</div>
              </div>
            ))}
          </div>
          <div className="top-actions" style={{ marginTop: '1rem' }}>
            <button className="primary" onClick={() => onNavigate('trust-center')}>Understand trust tiers</button>
            <button className="ghost" onClick={() => onNavigate('marketplace')}>See live marketplace context</button>
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">What matters most early</div>
          <h2>Trust grows in layers</h2>
          <div className="draft-list">
            {trustTiers.map((tier) => (
              <div key={tier} className="draft-card">
                <strong>{tier}</strong>
                <div className="muted">Clear, incremental proof so strong contractors can look credible fast without blocking good early supply.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Activation loop</div>
          <div className="draft-list">
            {onboardingToMarketplaceLoop.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This should feel like a supply activation path that feeds directly into customer-facing trust and job visibility.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Why contractors should care</div>
          <div className="draft-list">
            {contractorValuePoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This onboarding surface should sell the value of joining, not just describe the mechanics.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Early contractor launch</div>
          <h2>Bring in quality supply without heavy signup drag</h2>
          <div className="draft-list">
            {earlyLaunchContractorPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">The contractor side needs to feel worth joining even before the marketplace is fully mature.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Launch promise</div>
          <h2>Start simple, then earn stronger trust visibility</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Fast first step</strong>
              <div className="muted">Good contractors should be able to enter the marketplace quickly with basic profile and service-area details.</div>
            </div>
            <div className="draft-card">
              <strong>Stronger proof over time</strong>
              <div className="muted">Verification, insurance, and business proof should deepen credibility without blocking initial participation.</div>
            </div>
            <div className="draft-card">
              <strong>Local demand connection</strong>
              <div className="muted">Onboarding should feel directly tied to real Texas jobs and customer trust, not like isolated admin paperwork.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Join the market"
          title="Finish onboarding, then move straight into live Texas marketplace context"
          description="The contractor lane should end with a clear next move: understand trust, see the marketplace, and connect profile readiness to real job visibility."
          note="This turns onboarding from a passive explainer into an activation path."
          actionLabel="Enter marketplace view"
          onAction={() => onNavigate('marketplace')}
        />
      </section>
    </main>
  )
}
