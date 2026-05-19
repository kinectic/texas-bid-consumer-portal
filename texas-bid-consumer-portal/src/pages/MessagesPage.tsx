import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { NegotiationStatusPanel } from '../components/NegotiationStatusPanel'
import type { ViewKey } from '../data/viewData'

type MessagesPageProps = {
  onNavigate: (view: ViewKey) => void
}

const conversationCards = [
  {
    title: 'Kitchen exhaust cleaning follow-up',
    detail: 'Customer asked whether after-hours service is available in Dallas County.',
    status: 'Awaiting contractor reply',
  },
  {
    title: 'School floor maintenance bid question',
    detail: 'Contractor asked for photos and square-footage detail before finalizing price.',
    status: 'Awaiting customer reply',
  },
  {
    title: 'Austin facilities walkthrough request',
    detail: 'Customer and contractor aligned on a site visit before final quote comparison.',
    status: 'Active thread',
  },
] as const

const workflowSignals = [
  'Keep scope clarification inside the job thread.',
  'Use messaging to resolve uncertainty before final selection.',
  'Make the conversation feel like part of hiring, not a disconnected inbox.',
] as const

const negotiationToDecisionSteps = [
  'Identify which thread is actually blocking contractor selection.',
  'Resolve the missing scope, timing, or pricing detail inside the same job record.',
  'Return directly to shortlist and bid review once the blocker is cleared.',
] as const

export function MessagesPage({ onNavigate }: MessagesPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Messages</div>
          <h1>Keep job questions and negotiation inside the platform</h1>
          <p className="intro">
            Messaging should feel attached to the job itself so customers and contractors can clarify scope, timing, and fit without scattering the workflow.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('vendor-dashboard')}>Back to my jobs</button>
          <button className="primary" onClick={() => onNavigate('submission-workflow')}>Open bid review</button>
        </div>
      </header>

      <DemoNarrativeCommandBar activeView="messages" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="draft-list" style={{ marginBottom: '1rem' }}>
            {workflowSignals.map((signal) => (
              <div key={signal} className="draft-card">
                <strong>{signal}</strong>
                <div className="muted">Messages should help the customer close the decision loop faster.</div>
              </div>
            ))}
          </div>
          <div className="eyebrow">Conversation layer</div>
          <h2>Every message should stay tied to the job record</h2>
          <div className="draft-list">
            {conversationCards.map((card) => (
              <div key={card.title} className="draft-card">
                <strong>{card.title}</strong>
                <div className="muted">{card.detail}</div>
                <div className="small-note">{card.status}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Why this matters</div>
          <h2>Better than leaking into email or texts</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Shared context</strong>
              <div className="muted">Everyone sees the same scope clarifications, timing changes, and file questions.</div>
            </div>
            <div className="draft-card">
              <strong>Less drop-off</strong>
              <div className="muted">The customer can compare bids and conversations without switching tools or losing context.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <NegotiationStatusPanel items={conversationCards} />

        <div className="panel">
          <div className="panel-title">Negotiation handoff</div>
          <div className="draft-list">
            {negotiationToDecisionSteps.map((step) => (
              <div key={step} className="draft-card">
                <strong>{step}</strong>
                <div className="muted">Messages should unblock the decision lane, not become a side destination.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Resolution move"
          title="Use the thread to close negotiation, then return to contractor selection"
          description="The message surface should end with a clear next move: resolve scope or pricing questions, reopen bid review, and push the final contractor choice forward without losing job context."
          note="This keeps messages as a decision-support layer instead of a detached inbox."
          actionLabel="Return to selection review"
          onAction={() => onNavigate('submission-workflow')}
        />
      </section>
    </main>
  )
}
