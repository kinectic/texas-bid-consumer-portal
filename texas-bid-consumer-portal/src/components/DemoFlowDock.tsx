import type { ViewKey } from '../data/viewData'

type DemoFlowStep = {
  target: ViewKey
  label: string
  shortLabel: string
  objective: string
}

type DemoFlowDockProps = {
  activeView: ViewKey
  onNavigate: (view: ViewKey) => void
}

const demoFlowSteps: DemoFlowStep[] = [
  {
    target: 'home',
    label: 'Texas Home',
    shortLabel: 'Home',
    objective: 'Open with the Texas-first marketplace story.',
  },
  {
    target: 'how-it-works',
    label: 'How It Works',
    shortLabel: 'Explain',
    objective: 'Make the post, compare, and hire loop obvious.',
  },
  {
    target: 'marketplace',
    label: 'Find Contractors',
    shortLabel: 'Browse',
    objective: 'Move into local matching and contractor discovery.',
  },
  {
    target: 'opportunity',
    label: 'Job Match',
    shortLabel: 'Inspect',
    objective: 'Carry one local job into a real decision context.',
  },
  {
    target: 'submission-workflow',
    label: 'Review Bids',
    shortLabel: 'Decide',
    objective: 'Land the story on comparison, trust, and hire readiness.',
  },
] as const

export function DemoFlowDock({ activeView, onNavigate }: DemoFlowDockProps) {
  const activeIndex = demoFlowSteps.findIndex((step) => step.target === activeView)
  const currentStep = activeIndex === -1 ? null : demoFlowSteps[activeIndex]
  const nextStep = activeIndex >= 0 && activeIndex < demoFlowSteps.length - 1 ? demoFlowSteps[activeIndex + 1] : null
  const previousStep = activeIndex > 0 ? demoFlowSteps[activeIndex - 1] : null

  return (
    <section className="demo-flow-dock">
      <div className="demo-flow-dock-copy">
        <div>
          <div className="eyebrow">Guided demo flow</div>
          <div className="panel-title">Keep the consumer story moving</div>
          <div className="panel-subtitle">This dock turns the current screen into a continuous presentation path instead of loose navigation.</div>
        </div>
        {currentStep ? (
          <div className="demo-flow-current">
            <span className="status status-review">Current: {currentStep.label}</span>
            <div className="small-note">Objective: {currentStep.objective}</div>
          </div>
        ) : (
          <span className="status status-open">Outside guided flow</span>
        )}
      </div>

      <div className="demo-flow-step-list">
        {demoFlowSteps.map((step, index) => {
          const isActive = step.target === activeView
          const isComplete = activeIndex > index
          return (
            <button
              key={step.target}
              className={isActive ? 'demo-flow-step demo-flow-step-active' : isComplete ? 'demo-flow-step demo-flow-step-complete' : 'demo-flow-step'}
              onClick={() => onNavigate(step.target)}
            >
              <span className="demo-flow-step-index">{index + 1}</span>
              <span className="demo-flow-step-body">
                <strong>{step.label}</strong>
                <span>{step.shortLabel}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="demo-flow-rail-actions">
        <button className="ghost" onClick={() => onNavigate(previousStep?.target ?? demoFlowSteps[0].target)} disabled={!previousStep}>
          Previous step
        </button>
        <button className="primary" onClick={() => onNavigate(nextStep?.target ?? demoFlowSteps[demoFlowSteps.length - 1].target)} disabled={!nextStep}>
          {nextStep ? `Next: ${nextStep.label}` : 'Flow complete'}
        </button>
      </div>
    </section>
  )
}
