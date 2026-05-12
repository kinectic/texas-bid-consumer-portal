import { useMemo, useState } from 'react'
import { AgencyFlowPanel } from '../components/AgencyFlowPanel'
import { DemoNarrativeCommandBar } from '../components/DemoNarrativeCommandBar'
import { DetailActionsStrip } from '../components/DetailActionsStrip'
import { FinalActionPanel } from '../components/FinalActionPanel'
import { MarketplaceStatsSnapshot } from '../components/MarketplaceStatsSnapshot'
import { OpportunityCardList } from '../components/OpportunityCardList'
import { OpportunityDocumentsPanel } from '../components/OpportunityDocumentsPanel'
import { OpportunityMetadataPanel } from '../components/OpportunityMetadataPanel'
import { OpportunityStatusPanel } from '../components/OpportunityStatusPanel'
import { OpportunitySummaryPanel } from '../components/OpportunitySummaryPanel'
import { PublishedBidSnapshotPanel } from '../components/PublishedBidSnapshotPanel'
import { SelectionContextPanel } from '../components/SelectionContextPanel'
import { SectionIntro } from '../components/SectionIntro'
import { StatusBadgeLegend } from '../components/StatusBadgeLegend'
import { SubmissionActivityPanel } from '../components/SubmissionActivityPanel'
import { TexasMarketplaceShell } from '../components/TexasMarketplaceShell'
import { WorkflowFilterStrip } from '../components/WorkflowFilterStrip'
import type { CreateBidFormState } from '../types/forms'
import type { Opportunity, Submission } from '../types'
import type { ViewKey } from '../data/viewData'
import { opportunities, statusClass } from '../data/mockData'
import { buildSubmissionActivityItems } from '../utils/submissionActivity'
import {
  agencyFlowSteps,
  marketplaceCopy,
  marketplaceStatsItems,
  presentMarketplacePublishedSnapshotState,
  shellContent,
} from '../utils/shellLane'

type MarketplacePageProps = {
  publishedBidPreview: CreateBidFormState
  publishedOpportunity: Opportunity | null
  currentOpportunity: Opportunity
  readinessByOpportunityId: Record<string, { label: string, detail: string }>
  submissions: Submission[]
  onSelectOpportunity: (opportunity: Opportunity) => void
  onSelectSubmission: (submission: Submission) => void
  onNavigate: (view: ViewKey) => void
}

type LocationStage = 'county' | 'city' | 'bids'

const marketplaceLaunchPoints = [
  'Start with local Texas drilldown so the marketplace feels human-scale instead of overwhelming.',
  'Keep trust review one click away from every meaningful comparison moment.',
  'Make the selected job feel like a live hiring path, not just a listing preview.',
] as const

export function MarketplacePage({
  publishedBidPreview,
  publishedOpportunity,
  currentOpportunity,
  readinessByOpportunityId,
  submissions,
  onSelectOpportunity,
  onSelectSubmission,
  onNavigate,
}: MarketplacePageProps) {
  const previewOpportunity = publishedOpportunity && currentOpportunity.id === publishedOpportunity.id
    ? currentOpportunity
    : currentOpportunity ?? {
        ...(publishedOpportunity ?? opportunities[0]),
        title: publishedBidPreview.title,
        category: publishedBidPreview.category,
        dueDate: publishedBidPreview.deadline,
        summary: publishedBidPreview.scope,
      }

  const highlighted = previewOpportunity
  const marketplaceFeed = useMemo(() => [
    highlighted,
    ...opportunities.filter((opportunity) => opportunity.id !== highlighted.id),
  ], [highlighted])
  const activeSubmission = submissions.find((submission) => submission.opportunityId === previewOpportunity.id)
  const publishedSnapshotState = presentMarketplacePublishedSnapshotState(Boolean(publishedOpportunity))
  const submissionActivityItems = buildSubmissionActivityItems({
    submissions,
    allSubmissions: submissions,
    selectedSubmissionId: activeSubmission?.id,
    currentOpportunityId: previewOpportunity.id,
    mode: 'vendor',
    readinessByOpportunityId,
  })

  const countyOptions = useMemo(() => {
    const grouped = new Map<string, { name: string; region: string; bidCount: number; cities: Set<string> }>()
    marketplaceFeed.forEach((opportunity) => {
      const countyName = opportunity.county ?? 'Texas statewide'
      const cityName = opportunity.city ?? opportunity.location
      const existing = grouped.get(countyName)
      if (existing) {
        existing.bidCount += 1
        existing.cities.add(cityName)
        return
      }
      grouped.set(countyName, {
        name: countyName,
        region: opportunity.regionLabel ?? 'Texas market',
        bidCount: 1,
        cities: new Set([cityName]),
      })
    })
    return Array.from(grouped.values())
  }, [marketplaceFeed])

  const [selectedCounty, setSelectedCounty] = useState<string>(previewOpportunity.county ?? countyOptions[0]?.name ?? 'Texas statewide')
  const [selectedCity, setSelectedCity] = useState<string>(previewOpportunity.city ?? previewOpportunity.location)
  const [locationStage, setLocationStage] = useState<LocationStage>('county')

  const cityOptions = useMemo(() => {
    const grouped = new Map<string, { name: string; bidCount: number }>()
    marketplaceFeed
      .filter((opportunity) => (opportunity.county ?? 'Texas statewide') === selectedCounty)
      .forEach((opportunity) => {
        const cityName = opportunity.city ?? opportunity.location
        const existing = grouped.get(cityName)
        if (existing) {
          existing.bidCount += 1
          return
        }
        grouped.set(cityName, { name: cityName, bidCount: 1 })
      })
    return Array.from(grouped.values())
  }, [marketplaceFeed, selectedCounty])

  const visibleOpportunities = marketplaceFeed.filter((opportunity) => {
    const countyName = opportunity.county ?? 'Texas statewide'
    const cityName = opportunity.city ?? opportunity.location
    return countyName === selectedCounty && cityName === selectedCity
  })

  const stageOpportunity = visibleOpportunities[0] ?? previewOpportunity
  const locationSummary = locationStage === 'county'
    ? `Showing ${countyOptions.length} county entry points across the current Texas sample.`
    : locationStage === 'city'
      ? `${selectedCounty} selected. Choose the city market you want to inspect next.`
      : `${selectedCity}, ${selectedCounty} selected. ${visibleOpportunities.length} posted bid${visibleOpportunities.length === 1 ? '' : 's'} visible to vendors here.`

  const transitionClass = `texas-stage texas-stage-${locationStage}`
  const drilldownNextAction = locationStage === 'county'
    ? 'Pick a county to narrow into the local market.'
    : locationStage === 'city'
      ? 'Pick a city to reveal the actual posted opportunities.'
      : 'Choose a job to inspect fit, trust signals, and bid-readiness next.'

  return (
    <main className="main">
      <TexasMarketplaceShell
        eyebrow={marketplaceCopy.eyebrow}
        title={marketplaceCopy.title}
        intro={marketplaceCopy.intro}
        countyLabel={locationStage === 'city' || locationStage === 'bids' ? selectedCounty : undefined}
        cityLabel={locationStage === 'bids' ? selectedCity : undefined}
      >
        <div className="top-actions">
          <button className="ghost" onClick={() => onNavigate('contractor-onboarding')}>{marketplaceCopy.vendorSignInLabel}</button>
          <button className="primary" onClick={() => onNavigate('vendor-dashboard')}>{marketplaceCopy.postBidLabel}</button>
        </div>
      </TexasMarketplaceShell>

      <MarketplaceStatsSnapshot items={[...marketplaceStatsItems]} />

      <DemoNarrativeCommandBar activeView="marketplace" onNavigate={onNavigate} compact />

      <section className="content-grid">
        <div className="panel marketplace-panel">
          <SectionIntro
            eyebrow={marketplaceCopy.marketplaceFeedEyebrow}
            title={marketplaceCopy.marketplaceFeedTitle}
            description={marketplaceCopy.marketplaceFeedDescription}
          />
          <WorkflowFilterStrip title={marketplaceCopy.marketplaceFiltersTitle} filters={[...marketplaceCopy.marketplaceFilters]} activeIndex={0} />

          <PublishedBidSnapshotPanel
            title={publishedSnapshotState.title}
            bid={publishedBidPreview}
            statusLabel={publishedSnapshotState.statusLabel}
            note={publishedSnapshotState.note}
          />

          <div className="texas-drilldown-card">
            <div className="texas-drilldown-header">
              <div>
                <div className="eyebrow">Local navigation</div>
                <h2>Start with the area, then move into the bids.</h2>
                <p className="intro">This keeps the experience personable and local instead of feeling like a statewide spreadsheet dump.</p>
                <div className="texas-location-summary">{locationSummary}</div>
                <div className="small-note">Next move: {drilldownNextAction}</div>
                <div className="small-note">Narrative handoff: choose a local market, open the job match, then carry the same context into trust-aware bid review.</div>
              </div>
              <div className="texas-drilldown-actions">
                {locationStage !== 'county' ? (
                  <button className="ghost" onClick={() => setLocationStage(locationStage === 'bids' ? 'city' : 'county')}>
                    Back
                  </button>
                ) : null}
                <button
                  className="ghost"
                  onClick={() => {
                    setSelectedCounty(previewOpportunity.county ?? countyOptions[0]?.name ?? 'Texas statewide')
                    setSelectedCity(previewOpportunity.city ?? previewOpportunity.location)
                    setLocationStage('county')
                  }}
                >
                  Reset to Texas
                </button>
              </div>
            </div>

            <div className={transitionClass}>
              {locationStage === 'county' ? (
                <div className="texas-pick-grid">
                  {countyOptions.map((county) => (
                    <button
                      key={county.name}
                      className={county.name === selectedCounty ? 'texas-pick-card texas-pick-card-active' : 'texas-pick-card'}
                      onClick={() => {
                        setSelectedCounty(county.name)
                        const nextCity = marketplaceFeed.find((opportunity) => (opportunity.county ?? 'Texas statewide') === county.name)?.city
                          ?? marketplaceFeed.find((opportunity) => (opportunity.county ?? 'Texas statewide') === county.name)?.location
                          ?? selectedCity
                        setSelectedCity(nextCity)
                        setLocationStage('city')
                      }}
                    >
                      <div className="texas-pick-card-top">
                        <strong>{county.name}</strong>
                        <span className="texas-pick-badge">{county.bidCount} posted</span>
                      </div>
                      <span>{county.region}</span>
                      <span>{county.cities.size} cities in sample</span>
                      <span className="texas-pick-link">Open county market</span>
                    </button>
                  ))}
                </div>
              ) : null}

              {locationStage === 'city' ? (
                <div className="texas-pick-grid texas-pick-grid-cities">
                  {cityOptions.map((city) => (
                    <button
                      key={city.name}
                      className={city.name === selectedCity ? 'texas-pick-card texas-pick-card-active' : 'texas-pick-card'}
                      onClick={() => {
                        setSelectedCity(city.name)
                        setLocationStage('bids')
                      }}
                    >
                      <div className="texas-pick-card-top">
                        <strong>{city.name}</strong>
                        <span className="texas-pick-badge">{city.bidCount} posted</span>
                      </div>
                      <span>{selectedCounty}</span>
                      <span>Vendor-visible bid view only</span>
                      <span className="texas-pick-link">Open city bid list</span>
                    </button>
                  ))}
                </div>
              ) : null}

              {locationStage === 'bids' ? (
                <>
                  <OpportunityCardList
                    opportunities={visibleOpportunities}
                    statusClassMap={statusClass}
                    metaFormatter={(opportunity) => `${opportunity.agency} • ${opportunity.location} • ${opportunity.category}`}
                    role="vendor"
                    readinessByOpportunityId={readinessByOpportunityId}
                    selectedOpportunityId={stageOpportunity.id}
                    onSelectOpportunity={(opportunity) => {
                      onSelectOpportunity(opportunity)
                      onNavigate('opportunity')
                    }}
                  />
                  <div className="top-actions" style={{ marginTop: '1rem' }}>
                    <button className="primary" onClick={() => onNavigate('opportunity')}>Open selected job match</button>
                    <button className="ghost" onClick={() => onNavigate('trust-center')}>Review trust standards</button>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="content-grid nested-grid">
          <div className="panel texas-detail-context-panel">
            <div className="panel-title">Selected market context</div>
            <div className="draft-list">
              <div className="draft-card">
                <strong>Best next step</strong>
                <div className="muted">
                  {locationStage === 'bids'
                    ? 'Move into the job match screen to compare fit, details, and next actions.'
                    : 'Keep narrowing the local market until the posted jobs appear.'}
                </div>
              </div>
              <div className="draft-card">
                <strong>{selectedCounty}</strong>
                <div className="muted">Texas county entry point</div>
                <div className="dashboard-note compact-note">County selection narrows the vendor view to a local market before any bid list appears.</div>
              </div>
              <div className="draft-card">
                <strong>{selectedCity}</strong>
                <div className="muted">City market in focus</div>
                <div className="dashboard-note compact-note">Only posted bids are visible here. Internal county or city processing activity is not exposed to vendors.</div>
              </div>
            </div>
          </div>
          <OpportunityMetadataPanel opportunity={stageOpportunity} title={marketplaceCopy.metadataTitle} />
          <OpportunityStatusPanel status="open" />
          <StatusBadgeLegend title={marketplaceCopy.legendTitle} />
        </div>
      </section>

      <section className="content-grid lower-grid">
        <div className="panel detail-panel">
          <SectionIntro
            eyebrow={marketplaceCopy.detailEyebrow}
            title={marketplaceCopy.detailTitle}
            description={marketplaceCopy.detailDescription}
          />
          <h2>{stageOpportunity.title}</h2>
          <OpportunitySummaryPanel
            title={marketplaceCopy.detailSummaryTitle}
            subtitle={marketplaceCopy.detailSummarySubtitle}
            summary={stageOpportunity.summary}
          />
          <OpportunityDocumentsPanel
            documents={stageOpportunity.documents.map((name) => ({ name, status: 'Open' }))}
            title={marketplaceCopy.detailDocumentsTitle}
          />
          <DetailActionsStrip
            secondaryLabel="Review trust before comparing"
            primaryLabel={activeSubmission ? 'Continue bid comparison' : 'Open bid review'}
            onSecondaryAction={() => onNavigate('trust-center')}
            onPrimaryAction={() => onNavigate('submission-workflow')}
          />
          <div className="dashboard-note" style={{ marginTop: '0.85rem' }}>
            This screen now acts as the middle handoff in the demo: marketplace discovery narrows into one job match, then hands the same local decision context into final bid comparison.
          </div>
        </div>

        <AgencyFlowPanel
          description="The simplified drafting-to-publish path that turns agency inputs into a vendor-visible opportunity."
          steps={agencyFlowSteps}
        />
      </section>

      <section className="content-grid lower-grid">
        <SelectionContextPanel
          title={shellContent.selectionContextTitle}
          currentOpportunity={stageOpportunity}
          activeSubmission={activeSubmission ?? null}
          mode="vendor"
        />
        <SubmissionActivityPanel
          title={marketplaceCopy.submissionWorkspaceTitle}
          items={submissionActivityItems}
          currentOpportunityId={stageOpportunity.id}
          selectedSubmissionId={activeSubmission?.id}
          onSelectSubmission={(opportunityId, submissionId) => {
            const matchingOpportunity = marketplaceFeed.find((opportunity) => opportunity.id === opportunityId)
            const matchingSubmission = submissionId
              ? submissions.find((submission) => submission.id === submissionId)
              : null
            if (matchingOpportunity) {
              if (matchingSubmission) {
                onSelectSubmission(matchingSubmission)
              }
              onSelectOpportunity(matchingOpportunity)
              onNavigate('submission-workflow')
            }
          }}
        />
      </section>

      <section className="content-grid lower-grid">
        <div className="panel role-gateway-panel role-gateway-panel-primary">
          <div className="eyebrow">Public marketplace stance</div>
          <h2>Make the first live market feel navigable and credible</h2>
          <div className="draft-list">
            {marketplaceLaunchPoints.map((point) => (
              <div key={point} className="draft-card">
                <strong>{point}</strong>
                <div className="muted">A public launch marketplace has to guide the user toward action instead of dumping too much choice on the screen at once.</div>
              </div>
            ))}
          </div>
        </div>

        <FinalActionPanel
          eyebrow={marketplaceCopy.vendorActionEyebrow}
          title="Choose a local contractor path and move into comparison"
          description="After county and city drilldown, the page should make the next move explicit: inspect the selected job, review trust if needed, then open bid review with the same local context intact."
          note="This closing panel now reinforces that the marketplace is a decision funnel, not just a browsing surface."
          actionLabel="Open trust-aware comparison"
          onAction={() => onNavigate('trust-center')}
        />
      </section>
    </main>
  )
}
