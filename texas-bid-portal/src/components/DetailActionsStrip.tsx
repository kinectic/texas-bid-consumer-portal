type DetailActionsStripProps = {
  primaryLabel: string
  secondaryLabel: string
  onPrimaryAction?: () => void
  onSecondaryAction?: () => void
}

export function DetailActionsStrip({
  primaryLabel,
  secondaryLabel,
  onPrimaryAction,
  onSecondaryAction,
}: DetailActionsStripProps) {
  return (
    <div className="detail-actions detail-actions-strip">
      <button className="ghost" onClick={onSecondaryAction}>{secondaryLabel}</button>
      <button className="primary" onClick={onPrimaryAction}>{primaryLabel}</button>
    </div>
  )
}
