import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { DemoWalkthroughPanel } from '../components/DemoWalkthroughPanel'
import { FinalActionPanel } from '../components/FinalActionPanel'
import type { ViewKey } from '../data/viewData'

const customerSteps = [
  {
    title: '1. Post the job once',
    detail: 'Tell us what needs to get done, where in Texas the work is located, and how soon you need it handled.',
  },
  {
    title: '2. Get matched with local contractors',
    detail: 'The marketplace surfaces contractors who cover that county, fit the trade, and meet the trust bar for the job.',
  },
  {
    title: '3. Compare bids clearly',
    detail: 'Review pricing, timing, trust signals, and notes in one place instead of juggling texts, calls, and scattered emails.',
  },
  {
    title: '4. Message and hire with confidence',
    detail: 'Ask follow-up questions inside the job thread, then choose the contractor that best fits the work.',
  },
] as const

const customerProfiles = [
  {
    title: 'Homeowners',
    detail: 'Quickly find trustworthy local help for repairs, maintenance, and one-off jobs without cold-calling multiple contractors.',
  },
  {
    title: 'Property managers',
    detail: 'Keep multiple job requests, contractor comparisons, and follow-up messages organized in one place.',
  },
  {
    title: 'Small businesses',
    detail: 'Source local service vendors with clearer trust and response signals before choosing who to hire.',
  },
] as const

const trustProofPoints = [
  'Visible verification tiers for contractors',
  'Local service-area and trade fit before contact',
  'Bid comparison stays attached to the job record',
  'Follow-up messaging does not leak into inbox chaos',
] as const

const launchReadinessPoints = [
  'Free to use during the early launch phase for both customers and contractors',
  'Layered trust checks help the marketplace feel credible before it reaches full scale',
  'Texas-first matching keeps the first version focused on real nearby hiring decisions',
] as const

const contractorSteps = [
  'Create a contractor profile with service areas and trade categories.',
  'Complete visible trust checks so customers can judge credibility fast.',
  'Respond to matched jobs with pricing, timeline, and scope notes.',
  'Win work by being clear, responsive, and easy to evaluate.',
] as const

type HowItWorksPageProps = {
  onNavigate: (view: ViewKey) => void
}

export function HowItWorksPage({ onNavigate }: HowItWorksPageProps) {
  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">How it works</div>
          <h1>Simple Texas flow: post a job, compare bids, hire local</h1>
          <p className="intro">
            This page makes the core marketplace loop obvious for first-time customers so the product feels concrete fast instead of abstract.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('trust-center')}>See trust standards</button>
          <button className="primary" onClick={() => onNavigate('marketplace')}>Browse local matches</button>
        </div>
      </header>

      <DemoNarrativeCommandBar activeView="how-it-works" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Customer journey</div>
          <h2>The product promise in four steps</h2>
          <div className="draft-list">
            {customerSteps.map((step) => (
              <div key={step.title} className="draft-card">
                <strong>{step.title}</strong>
                <div className="muted">{step.detail}</div>
              </div>
            ))}
          </div>
          <div className="top-actions" style={{ marginTop: '1rem' }}>
            <button className="primary" onClick={() => onNavigate('marketplace')}>Start with local matches</button>
            <button className="ghost" onClick={() => onNavigate('submission-workflow')}>See bid review flow</button>
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Who this is for</div>
          <h2>Built for real Texas hiring situations</h2>
          <div className="draft-list">
            {customerProfiles.map((profile) => (
              <div key={profile.title} className="draft-card">
                <strong>{profile.title}</strong>
                <div className="muted">{profile.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel">
          <div className="eyebrow">Trust and clarity</div>
          <h2>Why this should feel safer than generic lead sites</h2>
          <div className="draft-list">
            {trustProofPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">The product is designed to reduce uncertainty before the customer commits to a contractor.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Contractor side</div>
          <h2>Why good contractors would use it</h2>
          <div className="draft-list">
            {contractorSteps.map((step) => (
              <div key={step} className="draft-card">
                <strong>{step}</strong>
                <div className="muted">Built to keep local opportunity discovery, trust, and quote follow-through in one operating loop.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Early launch stance</div>
          <h2>Built to launch before the marketplace is huge</h2>
          <div className="draft-list">
            {launchReadinessPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">The product should explain why customers can trust the flow even during an early supply-building phase.</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel role-gateway-panel">
          <div className="eyebrow">Why that matters</div>
          <h2>Customers need a reason to try a new hiring workflow</h2>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Less friction than scattered outreach</strong>
              <div className="muted">A new marketplace has to feel easier than calling around, not just different.</div>
            </div>
            <div className="draft-card">
              <strong>Trust before scale</strong>
              <div className="muted">Credibility has to be explained clearly before raw marketplace volume can do the work on its own.</div>
            </div>
            <div className="draft-card">
              <strong>Local focus first</strong>
              <div className="muted">Starting Texas-first makes the product feel grounded instead of pretending to be nationwide from day one.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <DemoWalkthroughPanel activeView="how-it-works" onNavigate={onNavigate} />

        <div className="panel">
          <div className="panel-title">What makes this better than generic lead sites</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Local by default</strong>
              <div className="muted">County and city entry points make the marketplace feel closer to how Texans actually hire for service work.</div>
            </div>
            <div className="draft-card">
              <strong>Trust is visible</strong>
              <div className="muted">Customers can judge verification and responsiveness without leaving the workflow.</div>
            </div>
            <div className="draft-card">
              <strong>Decision stays attached to the job</strong>
              <div className="muted">Messages, bids, and final selection all stay tied to one record instead of drifting into inbox chaos.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Next step"
          title="Move from explanation into the real Texas marketplace"
          description="Once the customer understands the four-step loop, the product should push directly into local matches or live bid review instead of leaving the journey abstract."
          note="This page now closes with a conversion surface instead of ending as a static explainer."
          actionLabel="Browse local matches"
          onAction={() => onNavigate('marketplace')}
        />
      </section>
    </main>
  )
}
