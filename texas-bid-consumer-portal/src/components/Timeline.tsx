import React from 'react'
import { colors, spacing, radius, typography } from '../design/tokens'
import { WorkflowState } from './StatusBadge'

interface TimelineStep {
  state: WorkflowState
  label: string
  timestamp?: string
  description?: string
}

interface TimelineProps {
  steps: TimelineStep[]
  currentState?: WorkflowState
  orientation?: 'vertical' | 'horizontal'
}

const stateDotColor: Record<WorkflowState, string> = {
  draft: colors.stateDraft,
  submitted: colors.stateSubmitted,
  under_review: colors.stateReview,
  countered: colors.stateReview,
  accepted: colors.stateAccepted,
  fulfilled: colors.stateFulfilled,
  rejected: colors.stateRejected,
  expired: colors.stateExpired,
  withdrawn: colors.stateExpired,
  paused: colors.statePaused,
}

export const Timeline: React.FC<TimelineProps> = ({
  steps,
  currentState,
  orientation = 'vertical',
}) => {
  if (orientation === 'horizontal') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: spacing[4] }}>
        {steps.map((step, index) => {
          const isActive = step.state === currentState
          const isPast = steps.findIndex(s => s.state === currentState) > index
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: radius.full,
                    backgroundColor: isActive || isPast ? stateDotColor[step.state] : colors.border,
                    border: `2px solid ${isActive ? colors.text : colors.border}`,
                    margin: '0 auto 6px',
                  }}
                />
                <div style={{ fontSize: typography.fontSize.xs, color: colors.textMuted }}>
                  {step.label}
                </div>
                {step.timestamp && (
                  <div style={{ fontSize: typography.fontSize.xs, color: colors.textSubtle }}>
                    {step.timestamp}
                  </div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, backgroundColor: colors.border, marginTop: -20 }} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Vertical timeline
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
      {steps.map((step, index) => {
        const isActive = step.state === currentState
        const isPast = steps.findIndex(s => s.state === currentState) > index
        return (
          <div key={index} style={{ display: 'flex', gap: spacing[4] }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: radius.full,
                  backgroundColor: isActive || isPast ? stateDotColor[step.state] : colors.surfaceHover,
                  border: `3px solid ${isActive ? colors.text : colors.border}`,
                  flexShrink: 0,
                }}
              />
              {index < steps.length - 1 && (
                <div
                  style={{
                    width: 3,
                    flex: 1,
                    backgroundColor: isPast ? stateDotColor[step.state] : colors.border,
                    marginTop: spacing[2],
                  }}
                />
              )}
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontWeight: typography.fontWeight.semibold, color: colors.text }}>
                {step.label}
              </div>
              {step.description && (
                <div style={{ fontSize: typography.fontSize.sm, color: colors.textMuted, marginTop: spacing[1] }}>
                  {step.description}
                </div>
              )}
              {step.timestamp && (
                <div style={{ fontSize: typography.fontSize.xs, color: colors.textSubtle, marginTop: spacing[1] }}>
                  {step.timestamp}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Timeline
