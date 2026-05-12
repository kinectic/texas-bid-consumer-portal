import type { ViewKey } from '../data/viewData'

type DemoWalkthroughStep = {
  title: string
  detail: string
  target: ViewKey
  cue: string
  artifact: string
}

type DemoWalkthroughPanelProps = {
  activeView?: ViewKey
  onNavigate: (view: ViewKey) => void
}

const walkthroughSteps: DemoWalkthroughStep[] = [
  {
    title: 'Start with the Texas marketplace story',
    detail: 'Lead with simple job posting, local contractor discovery, and why this feels better than a generic directory.',
    target: 'home',
    cue: 'Lead with local trust and speed.',
    artifact: 'Texas-first home framing and clear customer entry actions.',
  },
  {
    title: 'Show local contractor discovery',
    detail: 'Move into the marketplace to show county and city drill-down with local fit and cleaner browsing.',
    target: 'marketplace',
    cue: 'Emphasize local relevance.',
    artifact: 'Texas marketplace shell showing regional discovery and job-fit context.',
  },
  {
    title: 'Open a job match and compare options',
    detail: 'Use the detail view to show scope, documents, trust, and next-step clarity for a customer deciding who to hire.',
    target: 'opportunity',
    cue: 'Show clarity and confidence.',
    artifact: 'Job match detail packet with scope, requirements, and next actions.',
  },
  {
    title: 'Finish with bid review and trust',
    detail: 'End with comparison, messaging, and trust-backed decision support instead of stopping at browsing.',
    target: 'submission-workflow',
    cue: 'End with decision support.',
    artifact: 'Bid comparison workspace, trust cues, and connected follow-up flow.',
  },
] as const

export function DemoWalkthroughPanel({ activeView, onNavigate }: DemoWalkthroughPanelProps) {
  const activeStep = walkthroughSteps.find((step) => step.target === activeView) ?? walkthroughSteps[0]

  return (
    <section className="panel demo-walkthrough-panel">
      <div className="demo-walkthrough-header">
        <div>
          <div className="panel-title">Presenter walkthrough</div>
          <div className="panel-subtitle">Use this order to keep the consumer demo tight, credible, and easy to narrate.</div>
        </div>
        <span className="status status-open">Focus: {activeStep.title}</span>
      </div>

      <div className="demo-walkthrough-active-card draft-card">
        <strong>Current showcase artifact</strong>
        <div className="muted">{activeStep.artifact}</div>
        <div className="small-note">Narration cue: {activeStep.cue}</div>
      </div>

      <div className="demo-walkthrough-list">
        {walkthroughSteps.map((step, index) => {
          const isActive = step.target === activeView
          return (
            <button key={step.title} className={isActive ? 'draft-card cta-card cta-card-primary' : 'draft-card cta-card'} onClick={() => onNavigate(step.target)}>
              <strong>{index + 1}. {step.title}</strong>
              <div className="muted">{step.detail}</div>
              <div className="small-note">Presenter cue: {step.cue}</div>
              <div className="small-note">Artifact: {step.artifact}</div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
