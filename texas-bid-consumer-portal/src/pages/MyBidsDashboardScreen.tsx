import React from 'react'
import { colors, spacing, radius, typography } from '../design/tokens'
import { Button } from '../components/Button'
import { StatusBadge, WorkflowState } from '../components/StatusBadge'
import { Card } from '../components/Card'
import { ProgressBar } from '../components/ProgressBar'

/**
 * My Bids Dashboard — Annotated Layout
 * Consumer-side Texas Bid product track (third priority screen - workflow lane centerpiece)
 *
 * Key elements:
 * - Tabs: Active / Submitted / Under Review / Accepted / Fulfilled / Paused
 * - Bid cards with status, progress, actions (view, counter, withdraw, message)
 * - Quick stats: total active, escrow held, avg response time
 * - Texas-specific: compliance status, region, escrow balance
 * - Responsive: mobile list, desktop grid
 *
 * Workflow states visible: Draft, Submitted, Under Review, Countered, Accepted, Fulfilled, Paused, Rejected
 */

interface MyBid {
  id: string
  title: string
  region: string
  budget: string
  myBidAmount: string
  state: WorkflowState
  progress: number
  escrowHeld?: string
  lastUpdate: string
  bidsCount: number
  compliance: string[]
}

const myBids: MyBid[] = [
  {
    id: 'my-001',
    title: 'HVAC Installation - Austin Office',
    region: 'Austin',
    budget: '$48,500',
    myBidAmount: '$46,500',
    state: 'under_review',
    progress: 45,
    escrowHeld: '$46,500',
    lastUpdate: '2h ago',
    bidsCount: 7,
    compliance: ['Texas Energy Code'],
  },
  {
    id: 'my-002',
    title: 'Commercial Plumbing - Houston',
    region: 'Houston',
    budget: '$32,000',
    myBidAmount: '$31,200',
    state: 'accepted',
    progress: 100,
    escrowHeld: '$31,200',
    lastUpdate: 'yesterday',
    bidsCount: 4,
    compliance: ['Texas Plumbing Code'],
  },
  {
    id: 'my-003',
    title: 'Electrical Upgrade - Dallas Warehouse',
    region: 'Dallas',
    budget: '$19,800',
    myBidAmount: '$18,900',
    state: 'submitted',
    progress: 20,
    lastUpdate: '3d ago',
    bidsCount: 2,
    compliance: ['NEC 2023'],
  },
]

export const MyBidsDashboardScreen: React.FC = () => {
  const activeCount = myBids.filter(b => ['submitted', 'under_review', 'countered'].includes(b.state)).length
  const escrowTotal = myBids.reduce((sum, b) => sum + (b.escrowHeld ? parseInt(b.escrowHeld.replace('$', '').replace(',', '')) : 0), 0)

  return (
    <div style={{ padding: spacing[8], maxWidth: 1280, margin: '0 auto' }}>
      {/* Header + Stats */}
      <div style={{ marginBottom: spacing[8] }}>
        <h1 style={{ fontSize: typography.fontSize['3xl'], margin: 0 }}>My Bids</h1>
        <div style={{ display: 'flex', gap: spacing[8], marginTop: spacing[4], color: colors.textMuted }}>
          <div><strong style={{ color: colors.text }}>{activeCount}</strong> active</div>
          <div><strong style={{ color: colors.text }}>${escrowTotal.toLocaleString()}</strong> in escrow</div>
          <div><strong style={{ color: colors.text }}>4.2d</strong> avg response</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: spacing[2], marginBottom: spacing[6], borderBottom: `1px solid ${colors.border}`, paddingBottom: spacing[2] }}>
        {['Active', 'Submitted', 'Under Review', 'Accepted', 'Fulfilled', 'Paused'].map(tab => (
          <button key={tab} style={{ padding: `${spacing[2]} ${spacing[4]}`, background: 'transparent', border: 'none', color: colors.textMuted, fontSize: typography.fontSize.sm, cursor: 'pointer' }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Bids Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: spacing[6] }}>
        {myBids.map(bid => (
          <Card key={bid.id} variant="submission" hoverable>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <StatusBadge state={bid.state} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>{bid.myBidAmount}</div>
                <div style={{ fontSize: typography.fontSize.xs, color: colors.textSubtle }}>of {bid.budget}</div>
              </div>
            </div>

            <h3 style={{ margin: `${spacing[3]} 0 ${spacing[1]}` }}>{bid.title}</h3>
            <div style={{ color: colors.textMuted, fontSize: typography.fontSize.sm, marginBottom: spacing[4] }}>{bid.region} • {bid.lastUpdate}</div>

            <ProgressBar value={bid.progress} variant={bid.state === 'accepted' ? 'success' : 'default'} showPercentage={false} />

            {bid.escrowHeld && (
              <div style={{ marginTop: spacing[4], fontSize: typography.fontSize.sm, color: colors.escrowBlue }}>
                Escrow held: {bid.escrowHeld}
              </div>
            )}

            <div style={{ marginTop: spacing[4], display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
              {bid.compliance.map((c, i) => (
                <span key={i} style={{ fontSize: typography.fontSize.xs, background: colors.surfaceHover, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm }}>{c}</span>
              ))}
            </div>

            <div style={{ marginTop: spacing[6], display: 'flex', gap: spacing[3] }}>
              <Button variant="secondary" size="sm" fullWidth>View Details</Button>
              {bid.state === 'under_review' && <Button size="sm" fullWidth>Message Customer</Button>}
              {bid.state === 'accepted' && <Button variant="success" size="sm" fullWidth>Start Work</Button>}
            </div>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: spacing[8], textAlign: 'center', color: colors.textMuted, fontSize: typography.fontSize.sm }}>
        Showing {myBids.length} bids • All Texas-compliant and escrow-protected
      </div>
    </div>
  )
}

export default MyBidsDashboardScreen
