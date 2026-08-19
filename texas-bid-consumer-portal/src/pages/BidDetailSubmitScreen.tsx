import React from 'react'
import { colors, spacing, radius, typography } from '../design/tokens'
import { Button } from '../components/Button'
import { StatusBadge, WorkflowState } from '../components/StatusBadge'
import { Card } from '../components/Card'
import { Timeline } from '../components/Timeline'
import { Textarea } from '../components/Input'

/**
 * Bid Detail + Submit Screen — Annotated Layout
 * Consumer-side Texas Bid product track (second priority screen)
 *
 * Key elements:
 * - Bid header with title, budget, region, compliance flags, escrow indicator
 * - Full description + attachments
 * - Workflow timeline (Draft → Submitted → Under Review → Countered → Accepted → Fulfilled)
 * - Submit bid form (amount, notes, documents, compliance checkboxes)
 * - Trust signals + previous bids count
 * - Responsive: mobile single column, desktop 2-col (detail | submit)
 *
 * Texas nuances: compliance checklist, escrow notice, region-specific notes
 */

interface BidDetail {
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
  attachments: string[]
  timeline: Array<{ state: WorkflowState; label: string; timestamp?: string }>
}

const mockBid: BidDetail = {
  id: 'bid-001',
  title: 'HVAC Installation - Austin Office',
  description: 'Full HVAC system replacement for 3-story commercial building. Must meet Texas Energy Code 2021 and local Austin amendments. Includes rooftop units, ductwork, controls, and commissioning.',
  budget: '$48,500',
  region: 'Austin',
  category: 'HVAC',
  state: 'submitted',
  compliance: ['Texas Energy Code 2021', 'OSHA 1926', 'Austin Amendments'],
  escrow: true,
  deadline: 'Aug 28, 2026',
  bidsCount: 7,
  trustScore: 92,
  attachments: ['site-photos.pdf', 'spec-sheet.pdf', 'energy-calc.xlsx'],
  timeline: [
    { state: 'draft', label: 'Draft', timestamp: 'Aug 12' },
    { state: 'submitted', label: 'Submitted', timestamp: 'Aug 14' },
    { state: 'under_review', label: 'Under Review' },
    { state: 'countered', label: 'Countered' },
    { state: 'accepted', label: 'Accepted' },
    { state: 'fulfilled', label: 'Fulfilled' },
  ],
}

export const BidDetailSubmitScreen: React.FC = () => {
  return (
    <div style={{ padding: spacing[8], maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: spacing[8] }}>
        {/* Left column: Detail */}
        <div>
          <div style={{ marginBottom: spacing[6] }}>
            <StatusBadge state={mockBid.state} />
            <h1 style={{ fontSize: typography.fontSize['3xl'], margin: `${spacing[3]} 0 ${spacing[2]}` }}>{mockBid.title}</h1>
            <div style={{ display: 'flex', gap: spacing[4], color: colors.textMuted, fontSize: typography.fontSize.lg }}>
              <span>{mockBid.budget}</span>
              <span>•</span>
              <span>{mockBid.region}</span>
              <span>•</span>
              <span>{mockBid.deadline}</span>
            </div>
          </div>

          <Card>
            <h3 style={{ marginTop: 0 }}>Description</h3>
            <p style={{ color: colors.textMuted }}>{mockBid.description}</p>

            <div style={{ marginTop: spacing[6] }}>
              <h4 style={{ marginBottom: spacing[3] }}>Compliance Requirements</h4>
              <ul style={{ margin: 0, paddingLeft: spacing[5], color: colors.textMuted }}>
                {mockBid.compliance.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>

            {mockBid.escrow && (
              <div style={{ marginTop: spacing[6], padding: spacing[4], background: 'rgba(59, 130, 246, 0.1)', borderRadius: radius.md }}>
                <strong>Escrow Protected</strong> — Funds held until job completion and verification.
              </div>
            )}

            <div style={{ marginTop: spacing[6] }}>
              <h4 style={{ marginBottom: spacing[3] }}>Attachments</h4>
              {mockBid.attachments.map((a, i) => (
                <div key={i} style={{ padding: spacing[2], background: colors.surfaceHover, borderRadius: radius.sm, marginBottom: spacing[2] }}>{a}</div>
              ))}
            </div>
          </Card>

          <div style={{ marginTop: spacing[8] }}>
            <h3>Workflow Timeline</h3>
            <Timeline steps={mockBid.timeline} currentState={mockBid.state} />
          </div>
        </div>

        {/* Right column: Submit Form */}
        <div>
          <Card>
            <h3 style={{ marginTop: 0 }}>Submit Your Bid</h3>

            <div style={{ marginBottom: spacing[4] }}>
              <label style={{ display: 'block', marginBottom: spacing[2], fontSize: typography.fontSize.sm, color: colors.textMuted }}>Your Bid Amount</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                <span style={{ fontSize: typography.fontSize.xl }}>$</span>
                <input type="text" defaultValue="46500" style={{ flex: 1, padding: spacing[3], fontSize: typography.fontSize.xl, background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.md, color: colors.text }} />
              </div>
            </div>

            <Textarea
              label="Bid Notes / Approach"
              placeholder="Describe your approach, timeline, and why you're the best fit..."
              hint="Mention any Texas-specific experience or certifications"
            />

            <div style={{ marginTop: spacing[6] }}>
              <label style={{ display: 'block', marginBottom: spacing[2], fontSize: typography.fontSize.sm, color: colors.textMuted }}>Upload Documents</label>
              <div style={{ padding: spacing[6], border: `2px dashed ${colors.border}`, borderRadius: radius.lg, textAlign: 'center', color: colors.textMuted }}>
                Drop files here or click to upload (PDF, XLSX, images)
              </div>
            </div>

            <div style={{ marginTop: spacing[6] }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2], marginBottom: spacing[2] }}>
                <input type="checkbox" defaultChecked /> I confirm compliance with all listed Texas requirements
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                <input type="checkbox" defaultChecked /> I agree to escrow terms
              </label>
            </div>

            <div style={{ marginTop: spacing[6] }}>
              <Button fullWidth size="lg">Submit Bid</Button>
              <div style={{ textAlign: 'center', marginTop: spacing[3], fontSize: typography.fontSize.xs, color: colors.textSubtle }}>
                Your bid will be visible to the customer after review
              </div>
            </div>
          </Card>

          <div style={{ marginTop: spacing[6], fontSize: typography.fontSize.sm, color: colors.textMuted }}>
            {mockBid.bidsCount} bids received • Trust score {mockBid.trustScore}%
          </div>
        </div>
      </div>
    </div>
  )
}

export default BidDetailSubmitScreen
