// Design System Tokens - Texas Bid Consumer Portal (FixFolk)
// Aligned to consumer workflow lane: trust-first, Texas professional, accessible

export const colors = {
  // Core palette
  bg: '#091221',
  bgAlt: '#0d1930',
  surface: '#111f3a',
  surfaceHover: '#16264a',
  border: 'rgba(120, 146, 196, 0.18)',
  text: '#e8eefc',
  textMuted: '#9bb0d9',
  textSubtle: '#c8d5f3',

  // Accent (Texas warmth + trust)
  accent: '#c48f4e',
  accentHover: '#d4a36a',
  accentMuted: '#a67b4a',

  // Workflow states (consumer journey)
  stateDraft: '#6b8cff',
  stateSubmitted: '#4a9eff',
  stateReview: '#f4c95f',
  stateAccepted: '#4ade80',
  stateFulfilled: '#22c55e',
  statePaused: '#f59e0b',
  stateRejected: '#ef4444',
  stateExpired: '#94a3b8',

  // Trust & compliance
  trustGreen: '#22c55e',
  escrowBlue: '#3b82f6',
  texasOrange: '#c48f4e',
} as const

export const typography = {
  fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const

export const radius = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
  full: '9999px',
} as const

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
} as const

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const

// Component-specific tokens
export const components = {
  button: {
    height: {
      sm: '2rem',
      md: '2.5rem',
      lg: '3rem',
    },
    paddingX: {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
    },
  },
  card: {
    padding: spacing[6],
    radius: radius.lg,
  },
  badge: {
    paddingX: spacing[3],
    paddingY: spacing[1],
    radius: radius.full,
  },
} as const

export type ColorKey = keyof typeof colors
export type SpacingKey = keyof typeof spacing
export type RadiusKey = keyof typeof radius
