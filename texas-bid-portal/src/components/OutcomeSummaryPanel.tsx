import { outcomeSummary } from '../data/outcomeSummary'

type OutcomeSummaryPanelProps = {
  mode: 'agency' | 'vendor' | 'shared'
}

export function OutcomeSummaryPanel({ mode }: OutcomeSummaryPanelProps) {
  const current = outcomeSummary[mode]

  return (
    <div className="panel">
      <div className="panel-title">{current.title}</div>
      <div className="draft-card">
        <strong>{current.title}</strong>
        <div className="dashboard-note compact-note">{current.summary}</div>
      </div>
    </div>
  )
}
