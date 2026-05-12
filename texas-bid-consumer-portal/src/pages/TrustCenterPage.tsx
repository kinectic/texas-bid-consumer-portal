import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { trustTierLabels } from '../data/consumerDataModel'
import type { ViewKey } from '../data/viewData'

type TrustCenterPageProps = {
  onNavigate: (view: ViewKey) => void
}

const trustSignals = [
  'Phone verification',
  'Email verification',
  'Business identity',
  'License or trade proof',
  'Insurance proof',
  'Response quality and follow-through',
] as const

const customerReassurancePoints = [
  'Customers should understand what each trust tier means before they compare bids.',
  'Proof should reduce uncertainty without turning the product into a compliance wall.',
  'Trust needs to support faster hiring decisions, not just look impressive in theory.',
] as const

const earlyLaunchTrustPoints = [
  'Early trust has to be visible before marketplace scale can speak for itself.',
  'Layered verification lets credible contractors stand out without blocking marketplace growth.',
  'Plain-language trust framing helps first-time customers feel safer trying the product.',
] as const

const trustFlowSteps = [
  {
    title: '1. Contractor builds visible proof',
    detail: 'The onboarding flow explains how a contractor moves from basic contact verification toward stronger business and performance trust.',
  },
  {
    title: '2. Customer sees trust in comparison',
    detail: 'Marketplace and bid-review screens reuse those trust signals so the customer can judge credibility without leaving the hiring flow.',
  },
  {
    title: '3. Trust accelerates the final choice',
    detail: 'The trust model should reduce hesitation and help the customer move faster into shortlist and hire decisions.',
  },
] as const

export function TrustCenterPage({ onNavigate }: TrustCenterPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Trust center</div>
          <h1>Make contractor quality and credibility obvious</h1>
          <p className="intro">
            Early marketplace trust will decide whether customers feel safe posting jobs and comparing bids here. This surface explains the proof system clearly.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('contractor-onboarding')}>Contractor onboarding</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>Compare trusted contractors</button>
        </div>
      </header>

      <DemoNarrativeCommandBar activeView="trust-center" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Verification tiers</div>
          <h2>Layered trust instead of one hard gate</h2>
          <div className="draft-list">
            {Object.values(trustTierLabels).map((label) => (
              <div key={label} className="draft-card">
                <strong>{label}</strong>
                <div className="muted">A visible step in contractor credibility so customers can quickly judge risk and confidence.</div>
              </div>
            ))}
          </div>
          <div className="top-actions" style={{ marginTop: '1rem' }}>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Compare contractors with trust in view</button>
            <button className="ghost" onClick={() => onNavigate('how-it-works')}>See the customer flow</button>
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Proof signals</div>
          <h2>What customers should be able to see</h2>
          <div className="draft-list">
            {trustSignals.map((signal) => (
              <div key={signal} className="draft-card">
                <strong>{signal}</strong>
                <div className="muted">Simple, plain-language proof that reduces uncertainty without making the interface feel bureaucratic.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Trust in the hiring loop</div>
          <div className="draft-list">
            {trustFlowSteps.map((step) => (
              <div key={step.title} className="draft-card">
                <strong>{step.title}</strong>
                <div className="muted">{step.detail}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Customer reassurance</div>
          <div className="draft-list">
            {customerReassurancePoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This trust layer should actively help the customer decide who feels safe to hire.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Early launch trust</div>
          <h2>Trust has to carry the early marketplace</h2>
          <div className="draft-list">
            {earlyLaunchTrustPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">This page should explain why a newer marketplace can still feel safe and credible.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Launch principle</div>
          <h2>Use trust to reduce hesitation, not add bureaucracy</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Visible proof beats hidden policy</strong>
              <div className="muted">Customers care more about what they can see and understand than internal compliance language.</div>
            </div>
            <div className="draft-card">
              <strong>Good contractors need a clear path upward</strong>
              <div className="muted">The product should reward stronger proof over time without making the first step too heavy.</div>
            </div>
            <div className="draft-card">
              <strong>Trust should move the hire forward</strong>
              <div className="muted">The real outcome is faster confident hiring, not a trust center that feels disconnected from the marketplace.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Trust to action"
          title="Use trust proof to move straight back into contractor comparison"
          description="The trust center should end with a direct hiring move: take the verification context, return to the marketplace, and compare contractors with clearer confidence."
          note="This turns trust from an informational side page into an active decision tool."
          actionLabel="Compare trusted contractors"
          onAction={() => onNavigate('marketplace')}
        />
      </section>
    </main>
  )
}
