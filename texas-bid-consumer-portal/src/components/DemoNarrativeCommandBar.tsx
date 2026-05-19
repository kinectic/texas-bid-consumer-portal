import type { ViewKey } from '../data/viewData'

type DemoNarrativeStep = {
  label: string
  detail: string
  target: ViewKey
  cue: string
  outcome: string
  audience: string
  proof: string
  nextAction: string
  presenterPrompt: string
}

type DemoNarrativeCommandBarProps = {
  activeView: ViewKey
  onNavigate: (view: ViewKey) => void
  compact?: boolean
}

const demoNarrativeSteps: DemoNarrativeStep[] = [
  {
    label: '1. Texas-first home story',
    detail: 'Show that the product starts with simple Texas job posting and local contractor discovery.',
    target: 'home',
    cue: 'Lead with local trust, speed, and simplicity for Texas users.',
    outcome: 'Customers immediately understand what the marketplace does and why it feels built for Texas.',
    audience: 'Homeowners, property managers, and small business buyers',
    proof: 'Texas-first home framing, simple entry actions, and local-market language.',
    nextAction: 'Move into the plain-language how-it-works page so the model stays simple before browsing starts.',
    presenterPrompt: 'Start with the customer problem: finding a trustworthy Texas contractor without wasting time.',
  },
  {
    label: '2. Simple how-it-works explainer',
    detail: 'Show the plain-language post, compare, and hire loop before deeper workflow detail.',
    target: 'how-it-works',
    cue: 'Reduce confusion early by explaining the product in simple steps.',
    outcome: 'First-time users understand the marketplace model before they browse.',
    audience: 'New customers evaluating whether the product feels credible and usable',
    proof: 'Four-step flow, trust framing, and explicit next-step calls to action.',
    nextAction: 'Open the marketplace drill-down so the explanation immediately turns into local discovery.',
    presenterPrompt: 'Make the loop feel obvious: post once, compare clearly, and hire without jumping between tools.',
  },
  {
    label: '3. Local matching flow',
    detail: 'Show customers browsing local contractors, regions, and job-fit details without clutter.',
    target: 'marketplace',
    cue: 'Emphasize easy browsing, trust signals, and Texas regional relevance.',
    outcome: 'Users see a cleaner path to finding the right contractor fast.',
    audience: 'Customers and contractors evaluating the marketplace',
    proof: 'Regional discovery shell, contractor/job matching, and cleaner comparison framing.',
    nextAction: 'Carry one selected local job into the bid-review workspace instead of stopping at browsing.',
    presenterPrompt: 'Point out that browsing stays local and trust-backed instead of looking like a generic lead board.',
  },
  {
    label: '4. Easy bid review',
    detail: 'Show the customer moving from match review into quote comparison and selection.',
    target: 'submission-workflow',
    cue: 'Finish on clarity, confidence, and ease of decision-making.',
    outcome: 'The demo lands on an actual hiring workflow instead of a generic showcase.',
    audience: 'Customers choosing who to hire',
    proof: 'Bid-review workspace, trust cues, and direct selection flow.',
    nextAction: 'End by showing that messages and hire confirmation stay attached to the same decision lane.',
    presenterPrompt: 'Close on decision confidence: the customer can compare, message, and hire in one continuous lane.',
  },
]

export function DemoNarrativeCommandBar({ activeView, onNavigate, compact = false }: DemoNarrativeCommandBarProps) {
  const activeStep = demoNarrativeSteps.find((step) => step.target === activeView) ?? null

  return (
    <section className="workflow-actions demo-narrative-command-bar">
      <div className="demo-narrative-header">
        <div>
          <div className="panel-title">Consumer demo path</div>
          <div className="panel-subtitle">Use this flow when presenting the Texas consumer marketplace.</div>
          <div className="small-note">Recommended order: home story, how-it-works explainer, local matching, then easy bid review.</div>
        </div>
        {activeStep ? <span className="status status-review">Live step: {activeStep.label}</span> : null}
      </div>

      <div className={compact ? 'demo-narrative-list demo-narrative-list-compact' : 'demo-narrative-list'}>
        {demoNarrativeSteps.map((step, index) => {
          const isActive = step.target === activeView
          const isComplete = demoNarrativeSteps.findIndex((item) => item.target === activeView) > index
          const statusLabel = isActive ? 'Live' : isComplete ? 'Covered' : 'Ready'
          const statusClassName = isActive ? 'status status-review' : isComplete ? 'status status-awarded' : 'status status-open'

          return (
            <button
              key={step.label}
              className={isActive ? 'draft-card cta-card cta-card-primary demo-narrative-step-active' : 'draft-card cta-card'}
              onClick={() => onNavigate(step.target)}
            >
              <div className="demo-narrative-step-heading">
                <strong>{step.label}</strong>
                <span className={statusClassName}>{statusLabel}</span>
              </div>
              <div className="muted">{step.detail}</div>
              {!compact ? <div className="small-note">Audience: {step.audience}</div> : null}
              <div className="small-note">Presenter cue: {step.cue}</div>
              <div className="small-note">Say: {step.presenterPrompt}</div>
              {!compact ? <div className="small-note">Expected outcome: {step.outcome}</div> : null}
            </button>
          )
        })}
      </div>

      {activeStep && !compact ? (
        <div className="demo-narrative-live-panel">
          <div>
            <div className="eyebrow">Narration support</div>
            <div className="panel-title">What to say right now</div>
          </div>
          <div className="demo-narrative-live-grid">
            <div className="draft-card">
              <strong>Current frame</strong>
              <div className="muted">{activeStep.detail}</div>
            </div>
            <div className="draft-card">
              <strong>Presenter cue</strong>
              <div className="muted">{activeStep.cue}</div>
            </div>
            <div className="draft-card">
              <strong>Audience takeaway</strong>
              <div className="muted">{activeStep.outcome}</div>
            </div>
            <div className="draft-card">
              <strong>Proof on screen</strong>
              <div className="muted">{activeStep.proof}</div>
            </div>
            <div className="draft-card">
              <strong>What to say</strong>
              <div className="muted">{activeStep.presenterPrompt}</div>
            </div>
            <div className="draft-card">
              <strong>Next move</strong>
              <div className="muted">{activeStep.nextAction}</div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}
