type FinalActionPanelProps = {
  eyebrow?: string
  title: string
  description: string
  note?: string
  actionLabel: string
}

export function FinalActionPanel({
  eyebrow,
  title,
  description,
  note,
  actionLabel,
}: FinalActionPanelProps) {
  return (
    <div className="panel">
      {eyebrow ? <div className="section-intro-eyebrow">{eyebrow}</div> : null}
      <div className="panel-title">{title}</div>
      <div className="panel-subtitle final-action-description">{description}</div>
      {note ? <div className="dashboard-note final-action-note">{note}</div> : null}
      <button className="primary wide">{actionLabel}</button>
    </div>
  )
}
