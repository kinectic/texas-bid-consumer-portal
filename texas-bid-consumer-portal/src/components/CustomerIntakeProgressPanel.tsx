type CustomerIntakeProgressPanelProps = {
  title: string
  category: string
  deadline: string
}

const intakeSteps = [
  'Describe the work clearly',
  'Confirm the Texas location and urgency',
  'Review trust-first contractor discovery',
  'Move into comparison and shortlist review',
] as const

export function CustomerIntakeProgressPanel({ title, category, deadline }: CustomerIntakeProgressPanelProps) {
  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Customer intake progress</div>
          <div className="panel-title">How the post-a-job flow should progress</div>
        </div>
        <span className="status status-review">4 steps</span>
      </div>

      <div className="draft-card" style={{ marginBottom: '1rem' }}>
        <strong>{title}</strong>
        <div className="muted">{category} • {deadline}</div>
        <div className="dashboard-note compact-note">This keeps the consumer lane tied back to the original customer job request.</div>
      </div>

      <div className="draft-list">
        {intakeSteps.map((step) => (
          <div key={step} className="draft-card">
            <strong>{step}</strong>
            <div className="muted">A complete consumer build needs the job-posting loop to connect directly into trust, comparison, and selection.</div>
          </div>
        ))}
      </div>
    </div>
  )
}
