type PackageCompletenessItem = {
  title: string
  detail: string
}

type PackageCompletenessPanelProps = {
  title?: string
  items: PackageCompletenessItem[]
}

export function PackageCompletenessPanel({
  title = 'Package completeness',
  items,
}: PackageCompletenessPanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="package-completeness-list">
        {items.map((item) => (
          <div className="draft-card" key={item.title}>
            <strong>{item.title}</strong>
            <div className="muted">{item.detail}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
