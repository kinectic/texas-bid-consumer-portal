type OpportunitySummaryPanelProps = {
  title?: string
  subtitle?: string
  summary: string
}

export function OpportunitySummaryPanel({
  title = 'Opportunity overview',
  subtitle = 'Vendor-facing summary with core procurement facts',
  summary,
}: OpportunitySummaryPanelProps) {
  return (
    <div className="panel opportunity-summary-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Opportunity overview</div>
          <div className="panel-title">{title}</div>
          <div className="panel-subtitle">{subtitle}</div>
        </div>
        <span className="status status-open">Summary</span>
      </div>
      <p className="detail-copy opportunity-summary-copy">{summary}</p>
    </div>
  )
}
