type MarketplaceStatsSnapshotItem = {
  value: string | number
  label: string
}

type MarketplaceStatsSnapshotProps = {
  items: MarketplaceStatsSnapshotItem[]
}

export function MarketplaceStatsSnapshot({ items }: MarketplaceStatsSnapshotProps) {
  return (
    <section className="stats-grid marketplace-stats-snapshot">
      {items.map((item) => (
        <div className="stat-card" key={item.label}>
          <span className="stat-value">{item.value}</span>
          <span className="stat-label">{item.label}</span>
        </div>
      ))}
    </section>
  )
}
