import { trustTierLabels, type TrustTier } from '../data/consumerDataModel'

const trustTierSequence: { tier: TrustTier; customerMeaning: string; visibleProof: string; hiringImpact: string }[] = [
  {
    tier: 'unverified',
    customerMeaning: 'Basic listing only. The contractor may still be new to the marketplace and has not completed visible checks yet.',
    visibleProof: 'Name, trade, and service area only.',
    hiringImpact: 'Best used for early browsing, not final confidence.',
  },
  {
    tier: 'contact-verified',
    customerMeaning: 'Contact details are confirmed so customers know the business can be reached reliably.',
    visibleProof: 'Verified phone and email.',
    hiringImpact: 'Good starting trust for early outreach and first comparison.',
  },
  {
    tier: 'business-verified',
    customerMeaning: 'The contractor has shown business identity proof and looks more established.',
    visibleProof: 'Business name and operating identity verified.',
    hiringImpact: 'Useful when narrowing a shortlist for real hiring decisions.',
  },
  {
    tier: 'pro-verified',
    customerMeaning: 'The contractor has supplied stronger operating proof such as insurance, licensing, or trade credentials when relevant.',
    visibleProof: 'Insurance, license, or trade proof visible in the trust summary.',
    hiringImpact: 'Supports higher-confidence comparison before selection.',
  },
  {
    tier: 'top-performer',
    customerMeaning: 'The contractor combines strong proof with reliable marketplace performance over time.',
    visibleProof: 'Verification plus response quality and successful follow-through.',
    hiringImpact: 'Best fit for customers who want the strongest confidence signal before hiring.',
  },
]

export function TrustProofLadderPanel() {
  return (
    <section className="panel trust-proof-ladder-panel">
      <div className="panel-header">
        <div>
          <div className="eyebrow">Trust ladder</div>
          <div className="panel-title">What each trust level means to a customer</div>
        </div>
        <span className="status status-review">{trustTierSequence.length} tiers</span>
      </div>
      <div className="draft-list">
        {trustTierSequence.map((item) => (
          <div key={item.tier} className="draft-card trust-proof-card">
            <strong>{trustTierLabels[item.tier]}</strong>
            <div className="muted">{item.customerMeaning}</div>
            <div className="small-note">Visible proof: {item.visibleProof}</div>
            <div className="small-note">Hiring impact: {item.hiringImpact}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
