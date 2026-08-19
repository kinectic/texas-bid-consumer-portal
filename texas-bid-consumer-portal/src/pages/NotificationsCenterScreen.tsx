import React from 'react'
import { colors, spacing, radius, typography } from '../design/tokens'
import { Button } from '../components/Button'
import { StatusBadge, WorkflowState } from '../components/StatusBadge'
import { Card } from '../components/Card'

/**
 * Notifications Center — Annotated Layout
 * Consumer-side Texas Bid product track (fourth priority screen)
 *
 * Key elements:
 * - Notification list with type icons (bid update, message, escrow, compliance, system)
 * - Filters: All / Bids / Messages / Escrow / Compliance
 * - Quick actions per notification (view bid, reply, mark read)
 * - Unread count + "Mark all read"
 * - Texas-specific: compliance deadline alerts, escrow release notices
 * - Responsive: mobile list, desktop 2-col with detail pane
 *
 * Workflow integration: links back to Bid Detail, My Bids, Submit flow
 */

interface Notification {
  id: string
  type: 'bid_update' | 'message' | 'escrow' | 'compliance' | 'system'
  title: string
  body: string
  timestamp: string
  read: boolean
  bidId?: string
  state?: WorkflowState
}

const notifications: Notification[] = [
  {
    id: 'n-001',
    type: 'bid_update',
    title: 'Bid status updated',
    body: 'HVAC Installation - Austin Office moved to Under Review',
    timestamp: '2h ago',
    read: false,
    bidId: 'bid-001',
    state: 'under_review',
  },
  {
    id: 'n-002',
    type: 'escrow',
    title: 'Escrow funds released',
    body: '$31,200 released for Commercial Plumbing - Houston',
    timestamp: 'yesterday',
    read: true,
    bidId: 'bid-002',
    state: 'fulfilled',
  },
  {
    id: 'n-003',
    type: 'compliance',
    title: 'Compliance deadline approaching',
    body: 'Texas Energy Code documentation due in 3 days for bid-001',
    timestamp: '2d ago',
    read: false,
    bidId: 'bid-001',
  },
  {
    id: 'n-004',
    type: 'message',
    title: 'New message from customer',
    body: 'Can you confirm start date for the Austin HVAC job?',
    timestamp: '3d ago',
    read: true,
    bidId: 'bid-001',
  },
]

const typeIcon = (type: Notification['type']) => {
  switch (type) {
    case 'bid_update': return '📋'
    case 'escrow': return '💰'
    case 'compliance': return '✅'
    case 'message': return '💬'
    default: return '🔔'
  }
}

export const NotificationsCenterScreen: React.FC = () => {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div style={{ padding: spacing[8], maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing[8] }}>
        <div>
          <h1 style={{ fontSize: typography.fontSize['3xl'], margin: 0 }}>Notifications</h1>
          <div style={{ color: colors.textMuted }}>{unreadCount} unread</div>
        </div>
        <Button variant="ghost">Mark all as read</Button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: spacing[2], marginBottom: spacing[6] }}>
        {['All', 'Bids', 'Messages', 'Escrow', 'Compliance'].map(f => (
          <span key={f} style={{ padding: `${spacing[1]} ${spacing[4]}`, background: colors.surfaceHover, borderRadius: radius.full, fontSize: typography.fontSize.sm, cursor: 'pointer' }}>{f}</span>
        ))}
      </div>

      {/* Notification List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
        {notifications.map(n => (
          <Card key={n.id} variant="notification" hoverable>
            <div style={{ display: 'flex', gap: spacing[4] }}>
              <div style={{ fontSize: '1.5rem' }}>{typeIcon(n.type)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ fontWeight: typography.fontWeight.semibold }}>{n.title}</div>
                  <div style={{ fontSize: typography.fontSize.xs, color: colors.textSubtle, whiteSpace: 'nowrap' }}>{n.timestamp}</div>
                </div>
                <div style={{ color: colors.textMuted, marginTop: spacing[1] }}>{n.body}</div>
                {n.state && <div style={{ marginTop: spacing[2] }}><StatusBadge state={n.state} size="sm" /></div>}
                <div style={{ marginTop: spacing[4], display: 'flex', gap: spacing[3] }}>
                  {n.bidId && <Button variant="secondary" size="sm">View Bid</Button>}
                  {n.type === 'message' && <Button size="sm">Reply</Button>}
                  {!n.read && <Button variant="ghost" size="sm">Mark read</Button>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: spacing[8], textAlign: 'center', color: colors.textMuted, fontSize: typography.fontSize.sm }}>
        All notifications respect Texas escrow & compliance timelines
      </div>
    </div>
  )
}

export default NotificationsCenterScreen
