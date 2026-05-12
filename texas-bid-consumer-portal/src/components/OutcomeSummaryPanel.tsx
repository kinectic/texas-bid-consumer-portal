import { outcomeSummary } from '../data/outcomeSummary'

type OutcomeSummaryPanelProps = {
  mode: 'agency' | 'vendor' | 'shared'
  overrideTitle?: string
  overrideSummary?: string
}

export function OutcomeSummaryPanel({ mode, overrideTitle, overrideSummary }: OutcomeSummaryPanelProps) {
  const current = outcomeSummary[mode]
  const title = overrideTitle ?? current.title
  const summary = overrideSummary ?? current.summary

  return (
    <div className="panel outcome-summary-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Outcome summary</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-open">{mode}</span>
      </div>
      <div className="draft-card">
        <strong>{title}</strong>
        <div className="dashboard-note compact-note">{summary}</div>
      </div>
    </div>
  )
}
