import React from 'react'
import { colors, spacing, radius, typography, transitions, components } from '../design/tokens'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: colors.accent,
    color: '#0a1429',
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: colors.text,
    border: `1px solid ${colors.border}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.textMuted,
    border: 'none',
  },
  danger: {
    backgroundColor: colors.stateRejected,
    color: '#fff',
    border: 'none',
  },
  success: {
    backgroundColor: colors.stateAccepted,
    color: '#0a1429',
    border: 'none',
  },
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    height: components.button.height.sm,
    paddingLeft: components.button.paddingX.sm,
    paddingRight: components.button.paddingX.sm,
    fontSize: typography.fontSize.sm,
  },
  md: {
    height: components.button.height.md,
    paddingLeft: components.button.paddingX.md,
    paddingRight: components.button.paddingX.md,
    fontSize: typography.fontSize.base,
  },
  lg: {
    height: components.button.height.lg,
    paddingLeft: components.button.paddingX.lg,
    paddingRight: components.button.paddingX.lg,
    fontSize: typography.fontSize.lg,
  },
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[2],
    fontFamily: typography.fontFamily,
    fontWeight: typography.fontWeight.semibold,
    borderRadius: radius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: transitions.base,
    opacity: disabled || loading ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  }

  return (
    <button
      style={baseStyle}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Processing...' : children}
    </button>
  )
}

export default Button
