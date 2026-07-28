import { useMemo, useState } from 'react'
import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import type { ViewKey } from '../data/viewData'
import { contractorBidQueue, contractorProfileSummary } from '../data/profileData'

type ContractorProfilePageProps = {
  onNavigate: (view: ViewKey) => void
}

export function ContractorProfilePage({ onNavigate }: ContractorProfilePageProps) {
  const [selectedBidId, setSelectedBidId] = useState(contractorBidQueue[0]?.id ?? '')
  const selectedBid = useMemo(
    () => contractorBidQueue.find((bid) => bid.id === selectedBidId) ?? contractorBidQueue[0] ?? null,
    [selectedBidId],
  )

  const stats = [
    { value: contractorBidQueue.length, label: 'Bids sent' },
    { value: contractorBidQueue.filter((bid) => bid.status === 'Shortlisted').length, label: 'Shortlisted' },
    { value: contractorBidQueue.filter((bid) => bid.status === 'Won').length, label: 'Jobs won' },
  ]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Contractor profile</div>
          <h1>Your bid history, follow-ups, and active opportunities</h1>
          <p className="intro">
            This is the contractor login area. After signing in, you can review the jobs you have bid on, see which ones are heating up, and jump back into discovery.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('marketplace')}>Find more jobs</button>
          <button className="primary" onClick={() => onNavigate('consumer-profile')}>View consumer workspace</button>
        </div>
      </header>

      <MarketplaceStatsSnapshot items={stats} />
      <DemoNarrativeCommandBar activeView="contractor-onboarding" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Bids you have out</div>
              <div className="panel-subtitle">Select a bid to see the job, customer, and response status.</div>
            </div>
            <button className="ghost" onClick={() => onNavigate('marketplace')}>Browse new jobs</button>
          </div>
          <div className="draft-list">
            {contractorBidQueue.map((bid) => (
              <button
                key={bid.id}
                className={bid.id === selectedBidId ? 'draft-card cta-card draft-card-active' : 'draft-card cta-card'}
                onClick={() => setSelectedBidId(bid.id)}
              >
                <div className="panel-header">
                  <div>
                    <strong>{bid.jobTitle}</strong>
                    <div className="muted">{bid.customer} · {bid.location}</div>
                  </div>
                  <span className={bid.status === 'Won' ? 'status status-awarded' : bid.status === 'Shortlisted' ? 'status status-review' : 'status status-open'}>{bid.status}</span>
                </div>
                <div className="small-note">{bid.bidAmount} · {bid.postedAt}</div>
                <div className="small-note">{bid.responseTime}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Contractor profile snapshot</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Lone Star Fix & Build</strong>
              <div className="muted">Pro Verified · North Texas service area · Interior and exterior repair</div>
            </div>
            <div className="draft-card">
              <strong>Login identity</strong>
              <div className="muted">Use this account to see bids, saved jobs, and replies from customers without hunting through email threads.</div>
            </div>
            {contractorProfileSummary.map((item) => (
              <div key={item} className="draft-card">
                <strong>{item}</strong>
                <div className="muted">This profile keeps the contractor side organized and close to the work queue.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Selected bid details</div>
          {selectedBid ? (
            <div className="draft-list">
              <div className="draft-card">
                <strong>{selectedBid.jobTitle}</strong>
                <div className="muted">{selectedBid.customer} · {selectedBid.location}</div>
                <div className="small-note">{selectedBid.bidAmount} · {selectedBid.responseTime}</div>
              </div>
              <div className="draft-card">
                <strong>Current status</strong>
                <div className="muted">{selectedBid.status}. Keep following up if the job is still open and move to messaging when the customer replies.</div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="panel">
          <div className="panel-title">Next contractor actions</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Respond fast to shortlisted jobs</strong>
              <div className="muted">Short response times help the profile feel active and credible.</div>
            </div>
            <div className="draft-card">
              <strong>Open the marketplace</strong>
              <div className="muted">Find more local jobs that match your service area and trade.</div>
            </div>
            <div className="draft-card">
              <strong>Back to the customer view</strong>
              <div className="muted">Jump into the consumer workspace if you need to see the job from the homeowner side.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Contractor workspace"
          title="Keep every bid and reply in one contractor login"
          description="The contractor profile should show where you have bid, what is pending, and which jobs are worth a follow-up."
          note="That makes the contractor side feel like a real pipeline instead of a dead-end inbox."
          actionLabel="Open the marketplace"
          onAction={() => onNavigate('marketplace')}
        />
      </section>
    </main>
  )
}
