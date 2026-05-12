export type TrustTier = 'unverified' | 'contact-verified' | 'business-verified' | 'pro-verified' | 'top-performer'

export type UserRole = 'customer' | 'contractor'

export type TexasRegion = {
  state: 'Texas'
  region: string
  county: string
  city: string
}

export type CustomerJob = {
  id: string
  customerName: string
  role: 'customer'
  category: string
  urgency: 'same-day' | 'this-week' | 'planned'
  budgetGuidance: string
  scopeSummary: string
  status: 'posted' | 'bidding' | 'reviewing' | 'awarded' | 'in-progress' | 'completed'
  location: TexasRegion
}

export type ContractorProfile = {
  id: string
  businessName: string
  role: 'contractor'
  trades: string[]
  serviceAreas: TexasRegion[]
  trustTier: TrustTier
  responseRateLabel: string
  yearsActive: number
  insured: boolean
  licensed: boolean
}

export type MarketplaceConversation = {
  id: string
  jobId: string
  contractorId: string
  customerId: string
  lastMessagePreview: string
  status: 'open' | 'awaiting-customer' | 'awaiting-contractor' | 'closed'
}

export type ContractorBid = {
  id: string
  jobId: string
  contractorId: string
  priceLabel: string
  timelineLabel: string
  trustTier: TrustTier
  noteSummary: string
  status: 'draft' | 'sent' | 'shortlisted' | 'selected' | 'declined'
}

export const trustTierLabels: Record<TrustTier, string> = {
  unverified: 'Unverified',
  'contact-verified': 'Contact Verified',
  'business-verified': 'Business Verified',
  'pro-verified': 'Pro Verified',
  'top-performer': 'Top Performer',
}
