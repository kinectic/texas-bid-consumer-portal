type OpportunityRequirementsPanelProps = {
  title?: string
  items: readonly string[]
  note?: string
}

export function OpportunityRequirementsPanel({
  title = 'Requirements and scope',
  items,
  note,
}: OpportunityRequirementsPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <ol className="flow-list opportunity-requirements-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
      {note ? <div className="dashboard-note">{note}</div> : null}
    </div>
  )
}
