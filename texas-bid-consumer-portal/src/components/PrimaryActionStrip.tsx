import type { ReactNode } from 'react'

type PrimaryActionStripProps = {
  title: string
  description: string
  actions: ReactNode
}

export function PrimaryActionStrip({ title, description, actions }: PrimaryActionStripProps) {
  return (
    <section className="workflow-actions primary-action-strip">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Primary actions</div>
          <div className="panel-title">{title}</div>
          <p className="action-strip-copy">{description}</p>
        </div>
      </div>
      <div className="workflow-actions-list">{actions}</div>
    </section>
  )
}
