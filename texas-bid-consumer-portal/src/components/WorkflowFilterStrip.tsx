type WorkflowFilterStripProps = {
  title?: string
  filters: string[]
  activeIndex?: number
}

export function WorkflowFilterStrip({
  title = 'Filters',
  filters,
  activeIndex = 0,
}: WorkflowFilterStripProps) {
  return (
    <div className="workflow-filter-strip">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Workflow filters</div>
          <div className="panel-title">{title}</div>
        </div>
        <span className="status status-review">{filters.length} filters</span>
      </div>
      <div className="filters">
        {filters.map((filter, index) => (
          <span key={filter} className={index === activeIndex ? 'filter-pill active' : 'filter-pill'}>
            {filter}
          </span>
        ))}
      </div>
    </div>
  )
}
