type MetricCardProps = {
  value: string | number
  label: string
}

export function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="stat-card">
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
