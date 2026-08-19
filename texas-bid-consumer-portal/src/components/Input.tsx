import React from 'react'
import { colors, spacing, radius, typography, transitions } from '../design/tokens'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  fullWidth = true,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily,
    color: colors.text,
    backgroundColor: colors.surface,
    border: `1px solid ${error ? colors.stateRejected : colors.border}`,
    borderRadius: radius.md,
    transition: transitions.fast,
    outline: 'none',
  }

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: spacing[2],
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textMuted,
          }}
        >
          {label}
        </label>
      )}
      <input style={{ ...baseStyle, ...style }} {...props} />
      {error && (
        <div style={{ marginTop: spacing[1], fontSize: typography.fontSize.xs, color: colors.stateRejected }}>
          {error}
        </div>
      )}
      {hint && !error && (
        <div style={{ marginTop: spacing[1], fontSize: typography.fontSize.xs, color: colors.textSubtle }}>
          {hint}
        </div>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  fullWidth?: boolean
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  hint,
  fullWidth = true,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : 'auto',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily,
    color: colors.text,
    backgroundColor: colors.surface,
    border: `1px solid ${error ? colors.stateRejected : colors.border}`,
    borderRadius: radius.md,
    transition: transitions.fast,
    outline: 'none',
    minHeight: '120px',
    resize: 'vertical',
  }

  return (
    <div style={{ width: fullWidth ? '100%' : 'auto' }}>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: spacing[2],
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            color: colors.textMuted,
          }}
        >
          {label}
        </label>
      )}
      <textarea style={{ ...baseStyle, ...style }} {...props} />
      {error && (
        <div style={{ marginTop: spacing[1], fontSize: typography.fontSize.xs, color: colors.stateRejected }}>
          {error}
        </div>
      )}
      {hint && !error && (
        <div style={{ marginTop: spacing[1], fontSize: typography.fontSize.xs, color: colors.textSubtle }}>
          {hint}
        </div>
      )}
    </div>
  )
}
