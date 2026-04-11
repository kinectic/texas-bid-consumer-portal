type StatusBadgeLegendItem = {
  label: string
  className: string
  description: string
}

type StatusBadgeLegendProps = {
  title?: string
  items?: StatusBadgeLegendItem[]
}

const defaultItems: StatusBadgeLegendItem[] = [
  {
    label: 'open',
    className: 'status status-open',
    description: 'Live opportunity accepting vendor action now.',
  },
  {
    label: 'under review',
    className: 'status status-review',
    description: 'Agency is evaluating submissions or clarifications.',
  },
  {
    label: 'awarded',
    className: 'status status-awarded',
    description: 'Procurement outcome is closed and visible for history.',
  },
]

export function StatusBadgeLegend({ title = 'Status legend', items = defaultItems }: StatusBadgeLegendProps) {
  return (
    <div className="panel status-legend-panel">
      <div className="panel-title">{title}</div>
      <div className="status-legend-list">
        {items.map((item) => (
          <div className="status-legend-item" key={item.label}>
            <span className={item.className}>{item.label}</span>
            <div className="muted">{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
