import { useMemo, useState } from 'react'
import type { Opportunity } from '../types'
import './MarketplaceJobExplorer.css'

type Props = {
  opportunities: Opportunity[]
  selectedOpportunity: Opportunity
  readinessByOpportunityId: Record<string, { label: string; detail: string }>
  onSelectOpportunity: (opportunity: Opportunity) => void
  onOpenOpportunity: (opportunity: Opportunity) => void
}

const mapPoints: Record<string, { x: number; y: number }> = {
  Austin: { x: 55, y: 61 }, Dallas: { x: 62, y: 35 }, 'Fort Worth': { x: 57, y: 34 },
  Houston: { x: 72, y: 68 }, 'San Antonio': { x: 48, y: 72 }, 'El Paso': { x: 16, y: 52 },
  Amarillo: { x: 43, y: 16 }, Lubbock: { x: 39, y: 31 }, Corpus: { x: 55, y: 87 },
}

function pointFor(opportunity: Opportunity, index: number) {
  const city = opportunity.city ?? opportunity.location.split(',')[0]
  return mapPoints[city] ?? { x: 42 + (index * 13) % 38, y: 38 + (index * 17) % 44 }
}

export function MarketplaceJobExplorer({ opportunities, selectedOpportunity, readinessByOpportunityId, onSelectOpportunity, onOpenOpportunity }: Props) {
  const [county, setCounty] = useState('All counties')
  const [city, setCity] = useState('All cities')
  const [search, setSearch] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')

  const counties = useMemo(() => [...new Set(opportunities.map((item) => item.county ?? 'Statewide'))].sort(), [opportunities])
  const cities = useMemo(() => [...new Set(opportunities.filter((item) => county === 'All counties' || (item.county ?? 'Statewide') === county).map((item) => item.city ?? item.location.split(',')[0]))].sort(), [opportunities, county])
  const filtered = useMemo(() => opportunities.filter((item) => {
    const itemCity = item.city ?? item.location.split(',')[0]
    const text = `${item.title} ${item.agency} ${item.category} ${item.location}`.toLowerCase()
    return (county === 'All counties' || (item.county ?? 'Statewide') === county)
      && (city === 'All cities' || itemCity === city)
      && (!search.trim() || text.includes(search.trim().toLowerCase()))
  }), [opportunities, county, city, search])

  return (
    <section className="market-explorer" aria-label="Texas bid job finder">
      <div className="market-explorer__filters">
        <label className="market-search"><span>Search jobs</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Job, agency, or service" /></label>
        <label><span>County</span><select value={county} onChange={(event) => { setCounty(event.target.value); setCity('All cities') }}><option>All counties</option>{counties.map((name) => <option key={name}>{name}</option>)}</select></label>
        <label><span>City</span><select value={city} onChange={(event) => setCity(event.target.value)}><option>All cities</option>{cities.map((name) => <option key={name}>{name}</option>)}</select></label>
        <button className="market-clear" onClick={() => { setSearch(''); setCounty('All counties'); setCity('All cities') }}>Clear</button>
      </div>

      <div className="market-explorer__summary">
        <div><strong>{filtered.length} job{filtered.length === 1 ? '' : 's'}</strong><span>{city !== 'All cities' ? `${city}, ${county}` : county === 'All counties' ? 'Across Texas' : county}</span></div>
        <div className="market-view-toggle" aria-label="Choose results view"><button className={mobileView === 'list' ? 'active' : ''} onClick={() => setMobileView('list')}>List</button><button className={mobileView === 'map' ? 'active' : ''} onClick={() => setMobileView('map')}>Map</button></div>
      </div>

      <div className={`market-explorer__body view-${mobileView}`}>
        <div className="market-results" aria-live="polite">
          {filtered.length ? filtered.map((item) => {
            const selected = item.id === selectedOpportunity.id
            const readiness = readinessByOpportunityId[item.id]
            return <article key={item.id} className={`market-job-card${selected ? ' selected' : ''}`} onClick={() => onSelectOpportunity(item)}>
              <div className="market-job-card__top"><span className={`market-job-status status-${item.status}`}>{item.status === 'open' ? 'Accepting bids' : item.status.replace('-', ' ')}</span><span>{item.dueDate === 'Closed' ? 'Closed' : `Due ${item.dueDate}`}</span></div>
              <h3>{item.title}</h3><p>{item.agency}</p>
              <div className="market-job-meta"><span>📍 {item.city ?? item.location}</span><span>🛠 {item.category}</span></div>
              {readiness ? <div className="market-fit"><strong>{readiness.label}</strong><span>{readiness.detail}</span></div> : null}
              <button className="market-open" onClick={(event) => { event.stopPropagation(); onOpenOpportunity(item) }}>View job &amp; bid</button>
            </article>
          }) : <div className="market-empty"><strong>No jobs match these filters.</strong><span>Clear a filter to search a wider area.</span></div>}
        </div>

        <div className="texas-map" role="img" aria-label={`Map showing ${filtered.length} Texas bid jobs`}>
          <div className="texas-map__toolbar"><strong>Texas job map</strong><span>Click a marker to preview</span></div>
          <svg viewBox="0 0 100 100" aria-hidden="true" className="texas-map__shape"><path d="M12 9h37v15h16l7 11 17 2-6 18 7 14-13 6-10 17-12-7-7-13-12-5-9-17-15-4 5-16z" /></svg>
          {filtered.map((item, index) => {
            const point = pointFor(item, index)
            return <button key={item.id} className={`map-pin${item.id === selectedOpportunity.id ? ' selected' : ''}`} style={{ left: `${point.x}%`, top: `${point.y}%` }} onClick={() => onSelectOpportunity(item)} aria-label={`Select ${item.title}`}><span>{item.status === 'open' ? '$' : '✓'}</span></button>
          })}
          <div className="texas-map__legend"><span><i className="open" />Open bid</span><span><i />Selected job</span></div>
          {filtered.some((item) => item.id === selectedOpportunity.id) ? <div className="map-preview"><span>{selectedOpportunity.city ?? selectedOpportunity.location}</span><strong>{selectedOpportunity.title}</strong><button onClick={() => onOpenOpportunity(selectedOpportunity)}>View job</button></div> : null}
        </div>
      </div>
    </section>
  )
}
