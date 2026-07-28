const styles = `
  :root {
    --bg: #07111f;
    --bg2: #0d1930;
    --panel: rgba(10, 19, 38, 0.82);
    --panel-strong: rgba(14, 26, 48, 0.94);
    --line: rgba(138, 171, 226, 0.18);
    --text: #eef4ff;
    --muted: #a9b8d8;
    --accent: #6fb3ff;
    --good: #4ee09a;
    --warn: #ffd36f;
    --bad: #ff8c8c;
    --shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; }
  body {
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    color: var(--text);
    background:
      radial-gradient(circle at top left, rgba(111, 179, 255, 0.2), transparent 28%),
      radial-gradient(circle at 90% 10%, rgba(255, 211, 111, 0.12), transparent 24%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
  }
  a { color: inherit; }
  .wrap { max-width: 1120px; margin: 0 auto; padding: 28px 18px 44px; }
  .shell {
    border: 1px solid var(--line);
    border-radius: 30px;
    background: linear-gradient(180deg, rgba(8, 15, 29, 0.95), rgba(10, 18, 35, 0.9));
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .page {
    padding: 24px;
    display: grid;
    gap: 18px;
  }
  .topbar {
    display: flex;
    justify-content: space-between;
    gap: 14px;
    align-items: center;
    flex-wrap: wrap;
  }
  .brand {
    display: grid;
    gap: 6px;
  }
  .brand b {
    font-size: 1.05rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .brand span, .muted { color: var(--muted); }
  .pillrow { display: flex; gap: 10px; flex-wrap: wrap; }
  .pill, .chip, .badge {
    border: 1px solid var(--line);
    background: rgba(255,255,255,0.04);
    color: #d9e5ff;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.88rem;
  }
  .pill.good, .chip.good, .badge.good { border-color: rgba(78, 224, 154, 0.3); color: #b9f4d8; }
  .pill.warn, .chip.warn, .badge.warn { border-color: rgba(255, 211, 111, 0.3); color: #ffe6ae; }
  .pill.bad, .chip.bad, .badge.bad { border-color: rgba(255, 140, 140, 0.34); color: #ffcdcd; }
  .hero {
    display: grid;
    gap: 12px;
    align-items: start;
  }
  h1 {
    margin: 0;
    font-size: clamp(2.4rem, 6vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.055em;
    max-width: 10ch;
  }
  .lede {
    max-width: 54ch;
    margin: 0;
    color: #d6e2fa;
    line-height: 1.65;
    font-size: 1.02rem;
  }
  .cards, .split {
    display: grid;
    gap: 16px;
  }
  .cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .split {
    grid-template-columns: 1.15fr 0.85fr;
  }
  .card {
    border: 1px solid var(--line);
    border-radius: 24px;
    background: var(--panel);
    padding: 22px;
    display: grid;
    gap: 14px;
  }
  .card.strong {
    background: linear-gradient(180deg, rgba(14, 26, 48, 0.96), rgba(10, 18, 35, 0.86));
  }
  .card h2 {
    margin: 0;
    font-size: 1.45rem;
    letter-spacing: -0.04em;
  }
  .card p {
    margin: 0;
    color: #d3def6;
    line-height: 1.6;
  }
  .steps {
    display: grid;
    gap: 10px;
  }
  .step {
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 14px 16px;
    background: rgba(255,255,255,0.03);
  }
  .step strong { display: block; margin-bottom: 4px; }
  .step span { color: var(--muted); line-height: 1.5; }
  .list {
    display: grid;
    gap: 12px;
  }
  .mini {
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 16px;
    background: rgba(255,255,255,0.03);
    display: grid;
    gap: 8px;
  }
  .mini strong { font-size: 1rem; }
  .mini .meta { color: var(--muted); font-size: 0.9rem; }
  .rating {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    align-items: center;
  }
  .rating .score {
    font-size: 2rem;
    line-height: 1;
    letter-spacing: -0.05em;
    font-weight: 800;
  }
  .actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    padding: 12px 16px;
    font-weight: 700;
    text-decoration: none;
    border: 1px solid transparent;
  }
  .cta.primary {
    background: linear-gradient(135deg, #75baff, #4a8cff);
    color: #04101f;
  }
  .cta.secondary {
    background: rgba(255,255,255,0.05);
    border-color: var(--line);
    color: var(--text);
  }
  .footer {
    padding: 18px 24px 24px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    color: var(--muted);
  }
  .section-title {
    font-size: 0.82rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .switch {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .switch .pill {
    text-decoration: none;
  }
  @media (max-width: 920px) {
    .cards, .split { grid-template-columns: 1fr; }
  }
`

function layout({ title, eyebrow, headline, subhead, body, footerLeft, footerRight, topChips = [], actions = [], nav = [] }) {
  const chips = topChips.map((chip) => `<div class="pill ${chip.tone || ''}">${chip.label}</div>`).join('')
  const actionHtml = actions.map((action) => `<a class="cta ${action.primary ? 'primary' : 'secondary'}" href="${action.href}">${action.label}</a>`).join('')
  const navHtml = nav.map((item) => `<a class="pill ${item.tone || ''}" href="${item.href}">${item.label}</a>`).join('')
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <meta name="description" content="Free Texas marketplace for homeowners and contractors." />
  <style>${styles}</style>
</head>
<body>
  <div class="wrap">
    <div class="shell">
      <div class="page">
        <div class="topbar">
          <div class="brand">
            <b>Texas Bid</b>
            <span>${eyebrow}</span>
          </div>
          <div class="pillrow">${chips}</div>
        </div>
        ${nav.length ? `<div class="switch">${navHtml}</div>` : ''}
        <section class="hero">
          <h1>${headline}</h1>
          <p class="lede">${subhead}</p>
          ${actionHtml ? `<div class="actions">${actionHtml}</div>` : ''}
        </section>
        ${body}
      </div>
      <div class="footer">
        <span>${footerLeft}</span>
        <span>${footerRight}</span>
      </div>
    </div>
  </div>
</body>
</html>`
}

const contractors = [
  {
    name: 'Alma Rivera',
    badge: 'Certified',
    tone: 'good',
    rating: '4.9',
    reviews: 42,
    service: 'Dallas, TX',
    proof: 'Business license verified',
    note: 'Insurance on file and strong response time.',
    route: '/contractors/alma-rivera',
  },
  {
    name: 'Lone Star Works',
    badge: 'Non-certified',
    tone: 'warn',
    rating: '4.3',
    reviews: 11,
    service: 'Fort Worth, TX',
    proof: 'Basic profile only',
    note: 'Ready to bid, but missing business proof.',
    route: '/contractors/lone-star-works',
  },
]

const jobs = [
  {
    title: 'Drywall repair for a small retail space',
    city: 'Arlington',
    budget: '$1,500 - $3,000',
    category: 'Interior work',
  },
  {
    title: 'Bathroom tile replacement',
    city: 'Plano',
    budget: '$2,000 - $4,500',
    category: 'Home repair',
  },
]

function homePage() {
  return layout({
    title: 'Texas Bid',
    eyebrow: 'Free for now. Choose your path.',
    headline: 'Pick a job or pick a bid.',
    subhead: 'A simple Texas tool for both sides: homeowners and contractors.',
    topChips: [
      { label: 'Free launch', tone: 'good' },
      { label: 'Texas-first' },
    ],
    body: `
      <main class="cards">
        <a class="card strong" href="/post-job" style="text-decoration:none;">
          <div class="pillrow"><div class="chip good">Consumer</div></div>
          <h2>Post a job</h2>
          <p>Pick your location and move straight into the job posting flow.</p>
        </a>
        <a class="card strong" href="/bid-job" style="text-decoration:none;">
          <div class="pillrow"><div class="chip warn">Contractor</div></div>
          <h2>Bid a job</h2>
          <p>Create an account, browse nearby work, and start bidding.</p>
        </a>
      </main>
    `,
    footerLeft: 'Everything is free right now.',
    footerRight: 'Built to keep the first screen clean.',
  })
}

function postJobPage() {
  return layout({
    title: 'Post a Job | Texas Bid',
    eyebrow: 'Consumer path · free',
    headline: 'Post your job.',
    subhead: 'Pick a location, describe the work, and send it out to local contractors.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Location first' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Bid a job', href: '/bid-job' },
      { label: 'Messages', href: '/messages' },
    ],
    actions: [
      { label: 'Back home', href: '/', primary: false },
      { label: 'See messages', href: '/messages', primary: true },
    ],
    body: `
      <main class="split">
        <section class="card strong">
          <div class="section-title">Transition</div>
          <div class="steps">
            <div class="step"><strong>1. Choose your location</strong><span>Start with the city or area.</span></div>
            <div class="step"><strong>2. Describe the job</strong><span>Tell contractors what you need.</span></div>
            <div class="step"><strong>3. Review responses</strong><span>Compare replies and chat in one place.</span></div>
          </div>
          <div class="mini">
            <strong>Starter form</strong>
            <div class="meta">Location · Job type · Timing · Budget</div>
            <p>Keep the form lean now so the app can grow into a fuller posting workflow later.</p>
          </div>
        </section>
        <section class="card">
          <div class="section-title">What comes next</div>
          <div class="mini">
            <strong>Messages</strong>
            <div class="meta">Keep conversations attached to the job.</div>
          </div>
          <div class="mini">
            <strong>Ratings</strong>
            <div class="meta">See contractor trust without extra hunting.</div>
          </div>
          <div class="mini">
            <strong>Certification</strong>
            <div class="meta">Certified vs non-certified will matter here later.</div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Consumer flow',
    footerRight: 'Location first, then job details.',
  })
}

function bidJobPage() {
  return layout({
    title: 'Bid a Job | Texas Bid',
    eyebrow: 'Contractor path · free',
    headline: 'Bid on work.',
    subhead: 'Create an account, browse nearby jobs, and send bids to the ones that fit.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Browse first' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Post a job', href: '/post-job' },
      { label: 'Trust & ratings', href: '/trust' },
    ],
    actions: [
      { label: 'View messages', href: '/messages', primary: false },
      { label: 'Trust rules', href: '/trust', primary: true },
    ],
    body: `
      <main class="split">
        <section class="card strong">
          <div class="section-title">Nearby work</div>
          <div class="list">
            ${jobs.map((job) => `
              <div class="mini">
                <strong>${job.title}</strong>
                <div class="meta">${job.city} · ${job.category} · ${job.budget}</div>
                <div class="pillrow">
                  <span class="badge good">Open</span>
                  <span class="badge">Free to bid</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="card">
          <div class="section-title">Contractor states</div>
          <div class="list">
            ${contractors.map((contractor) => `
              <a class="mini" href="${contractor.route}" style="text-decoration:none;">
                <strong>${contractor.name}</strong>
                <div class="meta">${contractor.service}</div>
                <div class="rating">
                  <span class="score">${contractor.rating}</span>
                  <span class="muted">${contractor.reviews} reviews</span>
                  <span class="badge ${contractor.tone}">${contractor.badge}</span>
                </div>
                <div class="muted">${contractor.proof} · ${contractor.note}</div>
              </a>
            `).join('')}
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Contractor flow',
    footerRight: 'Browse first, then bid.',
  })
}

function messagesPage() {
  return layout({
    title: 'Messages | Texas Bid',
    eyebrow: 'Shared messaging · free',
    headline: 'Keep the conversation with the job.',
    subhead: 'A simple in-app message system that stays attached to the post, the bid, and the contractor.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Built for both sides' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Post a job', href: '/post-job' },
      { label: 'Bid a job', href: '/bid-job' },
    ],
    body: `
      <main class="split">
        <section class="card strong">
          <div class="section-title">Inbox</div>
          <div class="list">
            <div class="mini">
              <strong>Alma Rivera</strong>
              <div class="meta">“I can start tomorrow afternoon.”</div>
            </div>
            <div class="mini">
              <strong>Lone Star Works</strong>
              <div class="meta">“Can you confirm the site size and access?”</div>
            </div>
          </div>
        </section>
        <section class="card">
          <div class="section-title">Thread</div>
          <div class="mini">
            <strong>Consumer</strong>
            <div class="meta">Posted the job and asked for timing.</div>
          </div>
          <div class="mini">
            <strong>Contractor</strong>
            <div class="meta">Asked for the address, scope, and preferred start date.</div>
          </div>
          <div class="mini">
            <strong>System</strong>
            <div class="meta">This can later become push, email, and paid messaging upgrades.</div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Messaging',
    footerRight: 'One thread, attached to the job.',
  })
}

function trustPage() {
  return layout({
    title: 'Trust & Ratings | Texas Bid',
    eyebrow: 'Trust system · free today, paid later',
    headline: 'Ratings, certification, and proof.',
    subhead: 'Certified vs non-certified contractors are visible right away so people can make a faster call.',
    topChips: [{ label: 'Free now', tone: 'good' }, { label: 'Easy to monetize later' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Messages', href: '/messages' },
      { label: 'Contractor profile', href: '/contractors/alma-rivera' },
    ],
    body: `
      <main class="split">
        <section class="card strong">
          <div class="section-title">Certification ladder</div>
          <div class="steps">
            <div class="step"><strong>Non-certified</strong><span>Basic profile only. Can bid, but lacks proof signals.</span></div>
            <div class="step"><strong>Verified</strong><span>Identity and business details on file.</span></div>
            <div class="step"><strong>Certified</strong><span>Business license, insurance, and trade proof visible.</span></div>
          </div>
          <div class="mini">
            <strong>Future paid tier</strong>
            <div class="meta">Later this can support boosts, analytics, faster lead handling, and premium contractor tools.</div>
          </div>
        </section>
        <section class="card">
          <div class="section-title">Rating model</div>
          <div class="list">
            <div class="mini">
              <strong>Stars</strong>
              <div class="meta">1-5 star rating based on completed jobs.</div>
            </div>
            <div class="mini">
              <strong>Response time</strong>
              <div class="meta">Fast replies make a contractor easier to choose.</div>
            </div>
            <div class="mini">
              <strong>Proof badges</strong>
              <div class="meta">Business license, insurance, EIN, and other verification can stack later.</div>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Trust layer',
    footerRight: 'Visible now, expandable later.',
  })
}

function contractorProfilePage() {
  return layout({
    title: 'Contractor Profile | Texas Bid',
    eyebrow: 'Profile view · certified example',
    headline: 'Alma Rivera',
    subhead: 'A contractor profile that shows rating, certification, and proof in one place.',
    topChips: [{ label: 'Certified', tone: 'good' }, { label: '4.9 rating', tone: 'good' }, { label: '42 reviews' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Bid a job', href: '/bid-job' },
      { label: 'Trust & ratings', href: '/trust' },
    ],
    actions: [
      { label: 'Message contractor', href: '/messages', primary: true },
      { label: 'Back to jobs', href: '/bid-job', primary: false },
    ],
    body: `
      <main class="split">
        <section class="card strong">
          <div class="section-title">Profile proof</div>
          <div class="rating">
            <span class="score">4.9</span>
            <div>
              <div class="muted">42 reviews</div>
              <div class="pillrow" style="margin-top: 8px;">
                <span class="badge good">Certified</span>
                <span class="badge">Business license verified</span>
                <span class="badge">Insurance on file</span>
              </div>
            </div>
          </div>
          <div class="steps">
            <div class="step"><strong>Service area</strong><span>Dallas, Fort Worth, Arlington</span></div>
            <div class="step"><strong>Trade focus</strong><span>Interior repair, light renovation, and small commercial jobs</span></div>
            <div class="step"><strong>Messaging status</strong><span>Replies quickly and keeps the thread with the job</span></div>
          </div>
        </section>
        <section class="card">
          <div class="section-title">Why this matters</div>
          <div class="mini">
            <strong>Certified vs non-certified</strong>
            <div class="meta">Make that distinction visible at the moment of choice.</div>
          </div>
          <div class="mini">
            <strong>Rating + proof</strong>
            <div class="meta">Let the customer weigh both reputation and business credentials.</div>
          </div>
          <div class="mini">
            <strong>Later monetization</strong>
            <div class="meta">Premium placement and contractor tools can plug in later without changing the profile shape.</div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Contractor profile',
    footerRight: 'Built to expand into a fuller app.',
  })
}

function notFoundPage() {
  return layout({
    title: 'Texas Bid',
    eyebrow: 'Free for now. Choose your path.',
    headline: 'Pick a job or pick a bid.',
    subhead: 'A simple Texas tool for both sides: homeowners and contractors.',
    topChips: [{ label: 'Free launch', tone: 'good' }, { label: 'Texas-first' }],
    body: `
      <main class="cards">
        <a class="card strong" href="/post-job" style="text-decoration:none;">
          <div class="pillrow"><div class="chip good">Consumer</div></div>
          <h2>Post a job</h2>
          <p>Pick your location and move straight into the job posting flow.</p>
        </a>
        <a class="card strong" href="/bid-job" style="text-decoration:none;">
          <div class="pillrow"><div class="chip warn">Contractor</div></div>
          <h2>Bid a job</h2>
          <p>Create an account, browse nearby work, and start bidding.</p>
        </a>
      </main>
    `,
    footerLeft: 'Everything is free right now.',
    footerRight: 'Built to keep the first screen clean.',
  })
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const pathname = url.pathname
    if (pathname === '/') return new Response(homePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/post-job') return new Response(postJobPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/bid-job') return new Response(bidJobPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/messages') return new Response(messagesPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/trust') return new Response(trustPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/contractors/alma-rivera') return new Response(contractorProfilePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/contractors/lone-star-works') return new Response(contractorProfilePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    return new Response(notFoundPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  },
}
