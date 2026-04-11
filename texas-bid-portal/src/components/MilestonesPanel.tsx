type MilestonesPanelProps = {
  title?: string
  items: readonly string[]
}

export function MilestonesPanel({ title = 'Built milestones', items }: MilestonesPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ol className="flow-list milestones-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  )
}
