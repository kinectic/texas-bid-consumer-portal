import { emptyStateGuidance } from '../data/emptyStateGuidance'

type EmptyStatePanelProps = {
  mode: 'agency' | 'vendor' | 'submissions'
}

export function EmptyStatePanel({ mode }: EmptyStatePanelProps) {
  const current = emptyStateGuidance[mode]

  return (
    <div className="panel empty-state-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Empty state</div>
          <div className="panel-title">{current.title}</div>
        </div>
        <span className="status status-review">{mode}</span>
      </div>
      <div className="draft-card">
        <strong>{current.title}</strong>
        <div className="dashboard-note compact-note">{current.detail}</div>
      </div>
    </div>
  )
}
