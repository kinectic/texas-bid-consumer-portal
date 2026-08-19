import React from 'react'
import { colors, spacing, radius, typography } from '../design/tokens'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { StatusBadge, WorkflowState } from '../components/StatusBadge'
import { Card } from '../components/Card'

/**
 * Browse/Search Screen — Annotated Layout
 * Consumer-side Texas Bid product track (first priority screen)
 *
 * Key elements:
 * - Search bar with filters (service/goods, region, budget, compliance)
 * - Results grid (Bid cards with trust signals, status, Texas-specific fields)
 * - Sidebar filters (state, category, escrow, deadline)
 * - Responsive: mobile stack, desktop 3-col grid
 *
 * Texas nuances: region badges, compliance flags, escrow indicator
 */

interface BidResult {
  id: string
  title: string
  description: string
  budget: string
  region: string
  category: string
  state: WorkflowState
  compliance: string[]
  escrow: boolean
  deadline: string
  bidsCount: number
  trustScore: number
}

const mockResults: BidResult[] = [
  {
    id: 'bid-001',
    title: 'HVAC Installation - Austin Office',
    description: 'Full HVAC system replacement for 3-story commercial building. Texas energy code compliant.',
    budget: '$48,500',
    region: 'Austin',
    category: 'HVAC',
    state: 'submitted',
    compliance: ['Texas Energy Code', 'OSHA'],
    escrow: true,
    deadline: 'Aug 28',
    bidsCount: 7,
    trustScore: 92,
  },
  {
    id: 'bid-002',
    title: 'Commercial Plumbing - Houston Warehouse',
    description: 'New construction plumbing rough-in for 12,000 sq ft warehouse.',
    budget: '$32,000',
    region: 'Houston',
    category: 'Plumbing',
    state: 'under_review',
    compliance: ['Texas Plumbing Code'],
    escrow: true,
    deadline: 'Sep 02',
    bidsCount: 4,
    trustScore: 88,
  },
]

export const BrowseSearchScreen: React.FC = () => {
  return (
    <div style={{ padding: spacing[8], maxWidth: 1280, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: spacing[8] }}>
        <h1 style={{ fontSize: typography.fontSize['3xl'], fontWeight: typography.fontWeight.extrabold, margin: 0 }}>
          Browse Open Bids
        </h1>
        <p style={{ color: colors.textMuted, marginTop: spacing[2] }}>
          Texas-first marketplace • Escrow-protected • Compliance verified
        </p>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: spacing[4], marginBottom: spacing[8], flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <Input
            placeholder="Search bids, categories, or regions..."
            aria-label="Search bids"
          />
        </div>
        <Button variant="secondary">Filters</Button>
        <Button>Post a Job</Button>
      </div>

      {/* Main content: Sidebar + Results */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: spacing[8] }}>
        {/* Sidebar Filters */}
        <div>
          <h3 style={{ fontSize: typography.fontSize.lg, marginBottom: spacing[4] }}>Filters</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[4] }}>
            <div>
              <div style={{ fontSize: typography.fontSize.sm, color: colors.textMuted, marginBottom: spacing[2] }}>Region</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                {['Austin', 'Houston', 'Dallas', 'San Antonio'].map(r => (
                  <span key={r} style={{ padding: `${spacing[1]} ${spacing[3]}`, background: colors.surfaceHover, borderRadius: radius.md, fontSize: typography.fontSize.sm }}>{r}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize.sm, color: colors.textMuted, marginBottom: spacing[2] }}>Category</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2] }}>
                {['HVAC', 'Plumbing', 'Electrical', 'General'].map(c => (
                  <span key={c} style={{ padding: `${spacing[1]} ${spacing[3]}`, background: colors.surfaceHover, borderRadius: radius.md, fontSize: typography.fontSize.sm }}>{c}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize.sm, color: colors.textMuted, marginBottom: spacing[2] }}>Escrow Protected</div>
              <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                <input type="checkbox" defaultChecked /> Only show escrow bids
              </label>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: spacing[6] }}>
          {mockResults.map(bid => (
            <Card key={bid.id} variant="bid" hoverable>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: spacing[3] }}>
                <StatusBadge state={bid.state} />
                <div style={{ fontSize: typography.fontSize.lg, fontWeight: typography.fontWeight.semibold }}>{bid.budget}</div>
              </div>

              <h3 style={{ margin: 0, fontSize: typography.fontSize.lg }}>{bid.title}</h3>
              <p style={{ color: colors.textMuted, fontSize: typography.fontSize.sm, margin: `${spacing[2]} 0` }}>{bid.description}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: spacing[2], marginBottom: spacing[4] }}>
                <span style={{ background: colors.surfaceHover, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, fontSize: typography.fontSize.xs }}>{bid.region}</span>
                <span style={{ background: colors.surfaceHover, padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, fontSize: typography.fontSize.xs }}>{bid.category}</span>
                {bid.escrow && <span style={{ background: colors.escrowBlue, color: '#fff', padding: `${spacing[1]} ${spacing[2]}`, borderRadius: radius.sm, fontSize: typography.fontSize.xs }}>Escrow</span>}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: typography.fontSize.sm }}>
                <div style={{ color: colors.textMuted }}>{bid.bidsCount} bids • {bid.deadline}</div>
                <div style={{ color: colors.trustGreen, fontWeight: typography.fontWeight.semibold }}>{bid.trustScore}% trust</div>
              </div>

              <div style={{ marginTop: spacing[4] }}>
                <Button fullWidth>View Details & Submit Bid</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BrowseSearchScreen
