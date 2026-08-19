import React from 'react'
import { colors, spacing, radius, typography } from '../design/tokens'

export type WorkflowState =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'countered'
  | 'accepted'
  | 'fulfilled'
  | 'rejected'
  | 'expired'
  | 'withdrawn'
  | 'paused'

interface StatusBadgeProps {
  state: WorkflowState
  label?: string
  size?: 'sm' | 'md'
}

const stateConfig: Record<WorkflowState, { bg: string; color: string; label: string }> = {
  draft: { bg: colors.stateDraft, color: '#fff', label: 'Draft' },
  submitted: { bg: colors.stateSubmitted, color: '#fff', label: 'Submitted' },
  under_review: { bg: colors.stateReview, color: '#0a1429', label: 'Under Review' },
  countered: { bg: colors.stateReview, color: '#0a1429', label: 'Countered' },
  accepted: { bg: colors.stateAccepted, color: '#0a1429', label: 'Accepted' },
  fulfilled: { bg: colors.stateFulfilled, color: '#fff', label: 'Fulfilled' },
  rejected: { bg: colors.stateRejected, color: '#fff', label: 'Rejected' },
  expired: { bg: colors.stateExpired, color: '#fff', label: 'Expired' },
  withdrawn: { bg: colors.stateExpired, color: '#fff', label: 'Withdrawn' },
  paused: { bg: colors.statePaused, color: '#0a1429', label: 'Paused' },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  state,
  label,
  size = 'md',
}) => {
  const config = stateConfig[state]
  const displayLabel = label || config.label

  const sizeStyles = size === 'sm'
    ? { padding: `${spacing[1]} ${spacing[2]}`, fontSize: typography.fontSize.xs }
    : { padding: `${spacing[1]} ${spacing[3]}`, fontSize: typography.fontSize.sm }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: config.bg,
        color: config.color,
        borderRadius: radius.full,
        fontFamily: typography.fontFamily,
        fontWeight: typography.fontWeight.medium,
        ...sizeStyles,
      }}
    >
      {displayLabel}
    </span>
  )
}

export default StatusBadge
