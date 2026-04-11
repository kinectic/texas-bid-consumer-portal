import { roleModes } from '../data/roleModes'

type RoleModeSummaryPanelProps = {
  mode: 'agency' | 'vendor'
}

export function RoleModeSummaryPanel({ mode }: RoleModeSummaryPanelProps) {
  const current = roleModes[mode]

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
