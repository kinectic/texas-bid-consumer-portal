type DetailActionsStripProps = {
  primaryLabel: string
  secondaryLabel: string
}

export function DetailActionsStrip({ primaryLabel, secondaryLabel }: DetailActionsStripProps) {
  return (
    <div className="detail-actions detail-actions-strip">
      <button className="ghost">{secondaryLabel}</button>
      <button className="primary">{primaryLabel}</button>
    </div>
  )
}
