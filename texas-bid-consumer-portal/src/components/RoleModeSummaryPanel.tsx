import { roleModes } from '../data/roleModes'

type RoleModeSummaryPanelProps = {
  mode: 'agency' | 'vendor'
}

export function RoleModeSummaryPanel({ mode }: RoleModeSummaryPanelProps) {
  const current = roleModes[mode]
  const separationNote = mode === 'agency'
    ? 'Agency accounts manage drafting, publishing, review, and award activity. Vendors should not see this internal operating lane.'
    : 'Customer accounts can only see posted jobs, incoming contractor bids, and public-facing hiring details. Internal platform or government processing stays out of view.'

  return (
    <div className="panel role-mode-summary-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Role mode</div>
          <div className="panel-title">{current.title}</div>
        </div>
        <span className="status status-open">{mode === 'vendor' ? 'customer' : mode}</span>
      </div>
      <div className="draft-card">
        <strong>{current.title}</strong>
        <div className="dashboard-note compact-note">{current.summary}</div>
        <div className="dashboard-note compact-note">{separationNote}</div>
      </div>
    </div>
  )
}
