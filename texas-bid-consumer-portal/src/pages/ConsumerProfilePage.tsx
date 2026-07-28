import { useMemo, useState } from 'react'
import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import type { ViewKey } from '../data/viewData'
import { consumerBidsByJob, consumerPostedJobs, consumerProfileSummary } from '../data/profileData'

type ConsumerProfilePageProps = {
  onNavigate: (view: ViewKey) => void
}

export function ConsumerProfilePage({ onNavigate }: ConsumerProfilePageProps) {
  const [selectedJobId, setSelectedJobId] = useState(consumerPostedJobs[0]?.id ?? '')
  const selectedJob = useMemo(
    () => consumerPostedJobs.find((job) => job.id === selectedJobId) ?? consumerPostedJobs[0] ?? null,
    [selectedJobId],
  )
  const selectedBids = selectedJob ? consumerBidsByJob[selectedJob.id] ?? [] : []

  const stats = [
    { value: consumerPostedJobs.length, label: 'Posted jobs' },
    { value: selectedBids.length, label: 'Bids on selected job' },
    { value: '2', label: 'Jobs still open' },
  ]

  return (
    <main className="main">
      <header className="topbar">
        <div>
          <div className="eyebrow">Consumer profile</div>
          <h1>Your posted jobs, bids, and hiring decisions in one place</h1>
          <p className="intro">
            This is the consumer login area. After signing in, you can see what you have posted, which bids are coming in, and what still needs a reply.
          </p>
        </div>
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('marketplace')}>Browse contractors</button>
          <button className="primary" onClick={() => onNavigate('messages')}>Open messages</button>
        </div>
      </header>

      <MarketplaceStatsSnapshot items={stats} />
      <DemoNarrativeCommandBar activeView="consumer-profile" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Your posted jobs</div>
              <div className="panel-subtitle">Pick a job to review incoming bids and decide what happens next.</div>
            </div>
            <button className="ghost" onClick={() => onNavigate('marketplace')}>Post another job</button>
          </div>
          <div className="draft-list">
            {consumerPostedJobs.map((job) => (
              <button
                key={job.id}
                className={job.id === selectedJobId ? 'draft-card cta-card draft-card-active' : 'draft-card cta-card'}
                onClick={() => setSelectedJobId(job.id)}
              >
                <div className="panel-header">
                  <div>
                    <strong>{job.title}</strong>
                    <div className="muted">{job.category} · {job.location}</div>
                  </div>
                  <span className="status status-open">{job.status}</span>
                </div>
                <div className="small-note">{job.summary}</div>
                <div className="small-note">Posted {job.postedAt} · {job.bidCount} bids · Budget {job.budget}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">Profile snapshot</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Login identity</strong>
              <div className="muted">Consumer account for home repair and local service jobs across Texas.</div>
            </div>
            <div className="draft-card">
              <strong>Marketplace habit</strong>
              <div className="muted">Compare a few trusted bids, keep one job selected, and follow up from the same account.</div>
            </div>
            {consumerProfileSummary.map((item) => (
              <div key={item} className="draft-card">
                <strong>{item}</strong>
                <div className="muted">This profile is built to keep the decision process simple instead of scattered.</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel">
          <div className="panel-title">Bids on {selectedJob?.title ?? 'this job'}</div>
          <div className="draft-list">
            {selectedBids.map((bid) => (
              <div key={`${selectedJob?.id ?? 'job'}-${bid.contractor}`} className="draft-card">
                <div className="panel-header">
                  <strong>{bid.contractor}</strong>
                  <span className={bid.status === 'Shortlisted' ? 'status status-review' : 'status status-open'}>{bid.status}</span>
                </div>
                <div className="muted">{bid.amount} · {bid.timing} · {bid.trustTier}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-title">What to do next</div>
          <div className="draft-list">
            <div className="draft-card">
              <strong>Open the best fit contractor</strong>
              <div className="muted">Use the shortlist to open messages and ask about timing, materials, or pricing assumptions.</div>
            </div>
            <div className="draft-card">
              <strong>Compare one more bid</strong>
              <div className="muted">If the budget is off, keep shopping until the fit feels right.</div>
            </div>
            <div className="draft-card">
              <strong>Mark the job awarded</strong>
              <div className="muted">When you are ready, move the selected bid into an awarded state and keep the record attached to your account.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid lower-grid">
        <FinalActionPanel
          eyebrow="Consumer workspace"
          title="Keep every posted job attached to the same login"
          description="The consumer profile should make it easy to see what has been posted, what is still open, and where the strongest bids are landing."
          note="This gives homeowners one place to return to instead of juggling emails and separate contractor threads."
          actionLabel="Go back to marketplace"
          onAction={() => onNavigate('marketplace')}
        />
      </section>
    </main>
  )
}
