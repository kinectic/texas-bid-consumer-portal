import React from 'react'
import { colors, spacing, radius, typography, transitions } from '../design/tokens'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showPercentage?: boolean
  variant?: 'default' | 'success' | 'warning'
  size?: 'sm' | 'md'
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showPercentage = true,
  variant = 'default',
  size = 'md',
}) => {
  const clamped = Math.max(0, Math.min(100, value))

  const barColor =
    variant === 'success'
      ? colors.stateAccepted
      : variant === 'warning'
      ? colors.stateReview
      : colors.accent

  const height = size === 'sm' ? '0.5rem' : '0.75rem'

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: spacing[2],
            fontSize: typography.fontSize.sm,
            color: colors.textMuted,
            fontFamily: typography.fontFamily,
          }}
        >
          {label && <span>{label}</span>}
          {showPercentage && <span>{clamped}%</span>}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: colors.surfaceHover,
          borderRadius: radius.full,
          overflow: 'hidden',
          border: `1px solid ${colors.border}`,
        }}
      >
        <div
          style={{
            width: `${clamped}%`,
            height: '100%',
            backgroundColor: barColor,
            borderRadius: radius.full,
            transition: transitions.base,
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
