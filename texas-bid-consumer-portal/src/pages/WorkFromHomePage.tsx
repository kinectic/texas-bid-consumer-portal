import { useMemo, useState } from 'react'
import type { ViewKey } from '../data/viewData'
import './WorkFromHomePage.css'

type RemoteRole = {
  id: number
  title: string
  company: string
  location: string
  category: string
  type: string
  experience: string
  pay: string
  posted: string
  summary: string
  skills: string[]
  verified: boolean
  featured?: boolean
}

const roles: RemoteRole[] = [
  { id: 1, title: 'Customer Success Specialist', company: 'Lone Star Home Services', location: 'Remote · Texas', category: 'Customer Support', type: 'Full-time', experience: 'Entry level', pay: '$44,000–$56,000/yr', posted: 'Posted today', summary: 'Help Texas homeowners coordinate projects, understand bids, and get answers from trusted local professionals.', skills: ['Customer care', 'CRM', 'Problem solving'], verified: true, featured: true },
  { id: 2, title: 'Construction Estimating Coordinator', company: 'Bluebonnet Build Group', location: 'Remote · Texas', category: 'Construction & Trades', type: 'Full-time', experience: 'Mid level', pay: '$62,000–$78,000/yr', posted: 'Posted 1 day ago', summary: 'Review residential scopes, organize material takeoffs, and prepare clear estimates for project teams across Texas.', skills: ['Estimating', 'Plan review', 'Excel'], verified: true },
  { id: 3, title: 'Virtual Project Assistant', company: 'Hill Country Renovations', location: 'Remote · Central Texas', category: 'Operations', type: 'Part-time', experience: 'Entry level', pay: '$22–$28/hr', posted: 'Posted 2 days ago', summary: 'Keep schedules, homeowner updates, vendor records, and project documents moving for a busy remodeling team.', skills: ['Scheduling', 'Documentation', 'Vendor coordination'], verified: true },
  { id: 4, title: 'Digital Marketing Manager', company: 'Gulf Coast Property Care', location: 'Remote · United States', category: 'Marketing', type: 'Full-time', experience: 'Senior level', pay: '$82,000–$102,000/yr', posted: 'Posted 3 days ago', summary: 'Own growth campaigns, local search strategy, and customer acquisition for a multi-market property services brand.', skills: ['Paid media', 'SEO', 'Analytics'], verified: true, featured: true },
  { id: 5, title: 'Remote Bookkeeper', company: 'Texas Trade Partners', location: 'Remote · Texas', category: 'Finance', type: 'Contract', experience: 'Mid level', pay: '$30–$40/hr', posted: 'Posted 4 days ago', summary: 'Reconcile accounts, prepare monthly reporting, and support contractor payroll and project-cost tracking.', skills: ['QuickBooks', 'Reconciliation', 'Job costing'], verified: true },
  { id: 6, title: 'Permit Research Associate', company: 'Metro Permit Solutions', location: 'Remote · DFW preferred', category: 'Research', type: 'Part-time', experience: 'Entry level', pay: '$20–$25/hr', posted: 'Posted 5 days ago', summary: 'Research city and county permit requirements and turn findings into concise checklists for field teams.', skills: ['Web research', 'Local government', 'Data entry'], verified: false },
]

const categories = ['All categories', ...Array.from(new Set(roles.map((role) => role.category)))]
const jobTypes = ['All job types', ...Array.from(new Set(roles.map((role) => role.type)))]
const experienceLevels = ['All experience levels', ...Array.from(new Set(roles.map((role) => role.experience)))]

type WorkFromHomePageProps = { onNavigate: (view: ViewKey) => void }

export function WorkFromHomePage({ onNavigate }: WorkFromHomePageProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [jobType, setJobType] = useState(jobTypes[0])
  const [experience, setExperience] = useState(experienceLevels[0])
  const [saved, setSaved] = useState<number[]>([])
  const [applied, setApplied] = useState<number[]>([])

  const filteredRoles = useMemo(() => roles.filter((role) => {
    const haystack = `${role.title} ${role.company} ${role.summary} ${role.skills.join(' ')}`.toLowerCase()
    return (!query || haystack.includes(query.toLowerCase()))
      && (category === categories[0] || role.category === category)
      && (jobType === jobTypes[0] || role.type === jobType)
      && (experience === experienceLevels[0] || role.experience === experience)
  }), [query, category, jobType, experience])

  const resetFilters = () => {
    setQuery('')
    setCategory(categories[0])
    setJobType(jobTypes[0])
    setExperience(experienceLevels[0])
  }

  return (
    <main className="wfh-page">
      <section className="wfh-hero">
        <div className="wfh-hero-copy">
          <span className="wfh-kicker">Texas talent, flexible work</span>
          <h1>Find work that works from home.</h1>
          <p>Explore real remote roles from Texas businesses—clear pay, flexible schedules, and employer trust signals included.</p>
          <div className="wfh-hero-actions">
            <a className="wfh-primary" href="#remote-openings">Browse {roles.length} open roles</a>
            <button className="wfh-secondary" onClick={() => onNavigate('contractor-onboarding')}>Create your profile</button>
          </div>
          <div className="wfh-proof-row" aria-label="Marketplace highlights">
            <span><strong>100%</strong> pay transparency</span>
            <span><strong>Texas-first</strong> employers</span>
            <span><strong>No fees</strong> for applicants</span>
          </div>
        </div>
        <div className="wfh-hero-card">
          <div className="wfh-live-dot">New this week</div>
          <strong>18 flexible roles added</strong>
          <p>Remote support, operations, estimating, marketing, bookkeeping, and more.</p>
          <div className="wfh-mini-stat"><span>Entry-level friendly</span><b>7 roles</b></div>
          <div className="wfh-mini-stat"><span>$60k+ salary</span><b>9 roles</b></div>
          <div className="wfh-mini-stat"><span>Flexible hours</span><b>11 roles</b></div>
        </div>
      </section>

      <section className="wfh-search-wrap" id="remote-openings">
        <div className="wfh-search-head">
          <div><span className="wfh-kicker">Remote opportunities</span><h2>Find your next role</h2></div>
          <div className="wfh-result-count"><strong>{filteredRoles.length}</strong> matching jobs</div>
        </div>
        <div className="wfh-filters">
          <label className="wfh-search-field"><span>Search</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Job title, company, or skill" /></label>
          <label><span>Category</span><select value={category} onChange={(event) => setCategory(event.target.value)}>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Job type</span><select value={jobType} onChange={(event) => setJobType(event.target.value)}>{jobTypes.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Experience</span><select value={experience} onChange={(event) => setExperience(event.target.value)}>{experienceLevels.map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>

        <div className="wfh-layout">
          <div className="wfh-jobs">
            {filteredRoles.map((role) => (
              <article className={`wfh-job-card${role.featured ? ' is-featured' : ''}`} key={role.id}>
                <div className="wfh-job-main">
                  <div className="wfh-company-mark" aria-hidden="true">{role.company.split(' ').map((word) => word[0]).slice(0, 2).join('')}</div>
                  <div className="wfh-job-content">
                    <div className="wfh-card-top">
                      <div>{role.featured && <span className="wfh-featured">Featured</span>}<h3>{role.title}</h3></div>
                      <button className={`wfh-save${saved.includes(role.id) ? ' is-saved' : ''}`} aria-label={`${saved.includes(role.id) ? 'Remove' : 'Save'} ${role.title}`} onClick={() => setSaved((current) => current.includes(role.id) ? current.filter((id) => id !== role.id) : [...current, role.id])}>{saved.includes(role.id) ? '♥ Saved' : '♡ Save'}</button>
                    </div>
                    <div className="wfh-company-line"><strong>{role.company}</strong>{role.verified && <span className="wfh-verified">✓ Verified employer</span>}</div>
                    <div className="wfh-meta"><span>⌂ {role.location}</span><span>◷ {role.type}</span><span>◫ {role.experience}</span></div>
                    <p>{role.summary}</p>
                    <div className="wfh-skills">{role.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                    <div className="wfh-card-bottom"><div><strong>{role.pay}</strong><span>{role.posted}</span></div><button className={`wfh-apply${applied.includes(role.id) ? ' is-applied' : ''}`} onClick={() => setApplied((current) => current.includes(role.id) ? current : [...current, role.id])}>{applied.includes(role.id) ? 'Application started ✓' : 'Quick apply'}</button></div>
                  </div>
                </div>
              </article>
            ))}
            {filteredRoles.length === 0 && <div className="wfh-empty"><span>⌕</span><h3>No exact matches yet</h3><p>Clear your filters to see all available remote roles.</p><button onClick={resetFilters}>Reset filters</button></div>}
          </div>

          <aside className="wfh-sidebar">
            <div className="wfh-side-card wfh-alert-card"><span className="wfh-side-icon">✦</span><h3>Get remote job alerts</h3><p>Save your search and hear about relevant Texas roles when they open.</p><button onClick={() => setSaved(roles.map((role) => role.id))}>Save this search</button></div>
            <div className="wfh-side-card"><span className="wfh-kicker">Stay safe</span><h3>A legitimate employer will never ask you to:</h3><ul><li>Pay for an application or interview</li><li>Deposit a check and send money back</li><li>Share banking details before an offer</li></ul><button className="wfh-link-button" onClick={() => onNavigate('trust-center')}>Read our safety guide →</button></div>
            <div className="wfh-side-card wfh-resume-card"><h3>Stand out from home</h3><p>Complete your profile so employers can see your skills, availability, and work preferences.</p><button onClick={() => onNavigate('contractor-onboarding')}>Build my profile</button></div>
          </aside>
        </div>
      </section>
    </main>
  )
}
