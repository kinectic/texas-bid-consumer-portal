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
      {items.map((item, index) => (
        <div className={index === 0 ? 'stat-card stat-card-highlight' : 'stat-card'} key={item.label}>
          <div className="submission-status-snapshot-row">
            <span className="stat-value">{item.value}</span>
            <span className="status status-open">Metric</span>
          </div>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </section>
  )
}
