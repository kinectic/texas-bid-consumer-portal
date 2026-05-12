import type { Submission } from '../types'

type ShortlistActionRailProps = {
  activeSubmission: Submission | null
}

export function ShortlistActionRail({ activeSubmission }: ShortlistActionRailProps) {
  const isShortlisted = activeSubmission?.status === 'shortlisted'

  return (
    <section className="workflow-actions primary-action-strip">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Shortlist actions</div>
          <div className="panel-title">Promote, hold, or remove from final consideration</div>
          <p className="action-strip-copy">
            {activeSubmission
              ? `Use this rail to decide what happens next to ${activeSubmission.vendor} without leaving the comparison workspace.`
              : 'Select a contractor bid to unlock shortlist actions.'}
          </p>
        </div>
      </div>
      <div className="workflow-actions-list">
        <button className="primary">{isShortlisted ? 'Advance selected contractor' : 'Promote to shortlist'}</button>
        <button className="ghost">Keep under review</button>
        <button className="ghost">Remove from shortlist</button>
      </div>
    </section>
  )
}
