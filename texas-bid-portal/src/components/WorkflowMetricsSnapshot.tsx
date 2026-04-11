type WorkflowMetricsSnapshotItem = {
  value: string | number
  label: string
}

type WorkflowMetricsSnapshotProps = {
  items: WorkflowMetricsSnapshotItem[]
}

export function WorkflowMetricsSnapshot({ items }: WorkflowMetricsSnapshotProps) {
  return (
    <section className="stats-grid workflow-metrics-snapshot">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </section>
  )
}
