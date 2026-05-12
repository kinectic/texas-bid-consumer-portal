type MilestonesPanelProps = {
  title?: string
  items: readonly string[]
}

export function MilestonesPanel({ title = 'Built milestones', items }: MilestonesPanelProps) {
  return (
    <div className="panel milestones-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Build milestones</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-open">{items.length} milestones</span>
      </div>
      <ol className="flow-list milestones-list">
        {items.map((item, index) => (
          <li key={item}><strong>{index + 1}. </strong>{item}</li>
        ))}
      </ol>
    </div>
  )
}
