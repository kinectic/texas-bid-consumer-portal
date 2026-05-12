import { bidLifecycleTimeline } from '../data/lifecycleTimeline'

type LifecycleTimelinePanelProps = {
  title?: string
}

export function LifecycleTimelinePanel({ title = 'Bid lifecycle timeline' }: LifecycleTimelinePanelProps) {
  return (
    <div className="panel">
      <div className="panel-title">{title}</div>
      <div className="timeline-list">
        {bidLifecycleTimeline.map((item) => (
          <div className="timeline-item" key={`${item.label}-${item.date}`}>
            <div className="timeline-dot" />
            <div>
              <strong>{item.label}</strong>
              <div className="muted">{item.date}</div>
              <div className="timeline-detail">{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
