import React from 'react'
import { colors, spacing, radius, shadows, typography } from '../design/tokens'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'bid' | 'submission' | 'notification'
  padding?: 'sm' | 'md' | 'lg'
  hoverable?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}

const paddingMap = {
  sm: spacing[4],
  md: spacing[6],
  lg: spacing[8],
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  onClick,
  style,
}) => {
  const baseStyle: React.CSSProperties = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: paddingMap[padding],
    boxShadow: shadows.sm,
    fontFamily: typography.fontFamily,
    transition: 'box-shadow 150ms ease, transform 150ms ease',
    cursor: onClick ? 'pointer' : 'default',
    ...style,
  }

  if (hoverable) {
    baseStyle[':hover'] = {
      boxShadow: shadows.md,
      transform: 'translateY(-1px)',
    }
  }

  // Variant-specific tweaks
  if (variant === 'bid') {
    baseStyle.borderLeft = `4px solid ${colors.accent}`
  }
  if (variant === 'submission') {
    baseStyle.borderLeft = `4px solid ${colors.stateSubmitted}`
  }
  if (variant === 'notification') {
    baseStyle.borderLeft = `4px solid ${colors.escrowBlue}`
  }

  return (
    <div style={baseStyle} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card
