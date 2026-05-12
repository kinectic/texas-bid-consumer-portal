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
    <div className="panel opportunity-requirements-panel-shell">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Requirements gate</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{items.length} items</span>
      </div>
      <ol className="flow-list opportunity-requirements-list">
        {items.map((item, index) => (
          <li key={item}><strong>{index + 1}. </strong>{item}</li>
        ))}
      </ol>
      {note ? <div className="dashboard-note">{note}</div> : null}
    </div>
  )
}
