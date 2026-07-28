const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;700;800&display=swap');

  :root {
    --bg: #050b14;
    --bg2: #0b1730;
    --panel: rgba(8, 15, 28, 0.82);
    --panel-strong: rgba(12, 22, 41, 0.96);
    --panel-soft: rgba(255, 255, 255, 0.04);
    --line: rgba(139, 176, 228, 0.18);
    --text: #eef4ff;
    --muted: #aab9d7;
    --accent: #76bbff;
    --accent2: #9fe5c4;
    --good: #5be0a4;
    --warn: #ffd36d;
    --bad: #ff8b8b;
    --shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
  }

  * { box-sizing: border-box; }
  html, body { margin: 0; min-height: 100%; }
  body {
    color: var(--text);
    font-family: 'Inter Tight', Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background:
      radial-gradient(circle at 12% 12%, rgba(118, 187, 255, 0.28), transparent 20%),
      radial-gradient(circle at 85% 10%, rgba(159, 229, 196, 0.14), transparent 18%),
      radial-gradient(circle at 80% 82%, rgba(255, 211, 109, 0.08), transparent 20%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
    position: relative;
    overflow-x: hidden;
  }
  body::before,
  body::after {
    content: '';
    position: fixed;
    inset: auto;
    width: 420px;
    height: 420px;
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.32;
    pointer-events: none;
    z-index: 0;
  }
  body::before {
    top: -120px;
    left: -140px;
    background: rgba(118, 187, 255, 0.2);
  }
  body::after {
    right: -140px;
    bottom: -120px;
    background: rgba(159, 229, 196, 0.12);
  }
  a { color: inherit; }
  .wrap {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
    padding: 24px 16px 44px;
  }
  .shell {
    border: 1px solid var(--line);
    border-radius: 32px;
    background: linear-gradient(180deg, rgba(8, 15, 28, 0.96), rgba(10, 17, 33, 0.91));
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
    gap: 16px;
    align-items: center;
    flex-wrap: wrap;
  }
  .brand {
    display: grid;
    gap: 6px;
  }
  .brand b {
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
    font-size: 1rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .brand span,
  .muted,
  .meta {
    color: var(--muted);
  }
  .pillrow,
  .switch,
  .actions,
  .cluster {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .pill,
  .chip,
  .badge,
  .tag {
    border: 1px solid var(--line);
    background: rgba(255, 255, 255, 0.045);
    color: #d9e5ff;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.88rem;
    line-height: 1;
  }
  .pill.good,
  .chip.good,
  .badge.good,
  .tag.good {
    border-color: rgba(91, 224, 164, 0.34);
    color: #bff4da;
  }
  .pill.warn,
  .chip.warn,
  .badge.warn,
  .tag.warn {
    border-color: rgba(255, 211, 109, 0.34);
    color: #ffe4a8;
  }
  .pill.bad,
  .chip.bad,
  .badge.bad,
  .tag.bad {
    border-color: rgba(255, 139, 139, 0.34);
    color: #ffc8c8;
  }
  .hero {
    display: grid;
    gap: 14px;
    align-items: start;
  }
  .kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--muted);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 0.78rem;
  }
  .kicker::before {
    content: '';
    width: 28px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--accent));
  }
  h1 {
    margin: 0;
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
    font-size: clamp(2.6rem, 6vw, 5.4rem);
    line-height: 0.94;
    letter-spacing: -0.07em;
    max-width: 11ch;
  }
  .lede {
    max-width: 58ch;
    margin: 0;
    color: #d7e3fb;
    line-height: 1.65;
    font-size: 1.03rem;
  }
  .cards,
  .split,
  .grid-two,
  .grid-three {
    display: grid;
    gap: 16px;
  }
  .cards,
  .grid-two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .split {
    grid-template-columns: 1.08fr 0.92fr;
  }
  .grid-three {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .card,
  .mini,
  .field,
  .sheet,
  .frame,
  .job-card {
    border: 1px solid var(--line);
    border-radius: 22px;
    background: var(--panel);
    padding: 20px;
    display: grid;
    gap: 14px;
    text-decoration: none;
    position: relative;
    overflow: hidden;
  }
  .card::before,
  .mini::before,
  .field::before,
  .sheet::before,
  .frame::before,
  .job-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(118, 187, 255, 0.04), transparent 42%);
    pointer-events: none;
  }
  .card:hover,
  .mini:hover,
  .job-card:hover,
  .cta:hover {
    border-color: rgba(118, 187, 255, 0.42);
    transform: translateY(-1px);
  }
  .card,
  .mini,
  .job-card,
  .cta {
    transition: transform 160ms ease, border-color 160ms ease, background 160ms ease, box-shadow 160ms ease;
  }
  .card.strong,
  .sheet.strong,
  .frame.strong {
    background: linear-gradient(180deg, rgba(14, 27, 48, 0.98), rgba(9, 16, 31, 0.88));
  }
  .card.home-choice {
    min-height: 320px;
    padding: 26px;
  }
  .card h2,
  .job-card h3,
  .mini strong,
  .field strong {
    margin: 0;
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
    letter-spacing: -0.04em;
  }
  .card h2 { font-size: 1.7rem; }
  .job-card h3 { font-size: 1.08rem; }
  .card p,
  .job-card p,
  .mini p,
  .field p {
    margin: 0;
    color: #d4def5;
    line-height: 1.62;
  }
  .section-title {
    font-size: 0.78rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .steps {
    display: grid;
    gap: 10px;
  }
  .step {
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.03);
  }
  .step strong {
    display: block;
    margin-bottom: 4px;
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
  }
  .step span,
  .mini .meta,
  .field .meta,
  .job-card .meta {
    color: var(--muted);
    line-height: 1.5;
    font-size: 0.92rem;
  }
  .list {
    display: grid;
    gap: 12px;
  }
  .mini {
    padding: 16px;
    gap: 8px;
  }
  .mini strong {
    font-size: 1rem;
  }
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
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
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
    background: linear-gradient(135deg, #8cc7ff, #57a0ff);
    color: #04101f;
    box-shadow: 0 12px 32px rgba(87, 160, 255, 0.28);
  }
  .cta.secondary {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--line);
    color: var(--text);
  }
  .tableish {
    display: grid;
    gap: 10px;
  }
  .progress {
    display: grid;
    gap: 8px;
  }
  .progress .bar {
    height: 8px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }
  .progress .bar span {
    display: block;
    height: 100%;
    width: 33%;
    border-radius: inherit;
    background: linear-gradient(90deg, #5be0a4, #8cc7ff);
  }
  .form-grid {
    display: grid;
    gap: 12px;
  }
  .input {
    border: 1px solid rgba(139, 176, 228, 0.22);
    border-radius: 16px;
    padding: 14px 16px;
    background: rgba(4, 10, 20, 0.42);
    display: grid;
    gap: 6px;
  }
  .input label {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
    color: var(--muted);
  }
  .input .value {
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
    font-size: 1.02rem;
    letter-spacing: -0.03em;
  }
  .choice-list {
    display: grid;
    gap: 10px;
  }
  .choice {
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.03);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: center;
  }
  .choice strong {
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
  }
  .choice .hint {
    color: var(--muted);
    font-size: 0.92rem;
  }
  .job-card {
    padding: 18px;
  }
  .job-head {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    align-items: start;
  }
  .job-head strong,
  .profile-name {
    font-family: 'Space Grotesk', 'Inter Tight', sans-serif;
    font-size: 1.05rem;
    letter-spacing: -0.04em;
  }
  .meter {
    display: grid;
    gap: 8px;
  }
  .meter-line {
    height: 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }
  .meter-line span {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, #5be0a4, #8cc7ff);
  }
  .thread {
    display: grid;
    gap: 12px;
  }
  .bubble {
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 14px 16px;
    background: rgba(255, 255, 255, 0.03);
    display: grid;
    gap: 6px;
  }
  .bubble small {
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.72rem;
  }
  .composer {
    display: grid;
    gap: 10px;
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 14px;
    background: rgba(255, 255, 255, 0.03);
  }
  .composer .line {
    min-height: 72px;
    border-radius: 14px;
    border: 1px dashed rgba(139, 176, 228, 0.28);
    background: rgba(4, 10, 20, 0.36);
    padding: 12px 14px;
    color: var(--muted);
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
  .fade-up {
    animation: fadeUp 520ms ease both;
  }
  .delay-1 { animation-delay: 90ms; }
  .delay-2 { animation-delay: 180ms; }
  .delay-3 { animation-delay: 270ms; }
  .delay-4 { animation-delay: 360ms; }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (max-width: 960px) {
    .cards,
    .grid-two,
    .grid-three,
    .split {
      grid-template-columns: 1fr;
    }
  }
`

function layout({ title, eyebrow, headline, subhead, body, footerLeft, footerRight, topChips = [], actions = [], nav = [], minimalHeader = false, bare = false }) {
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
        ${bare ? body : `
        <div class="topbar">
          <div class="brand">
            <b>Texas Bid</b>
            <span>${eyebrow}</span>
          </div>
          ${minimalHeader ? '<div class="pill good">Free for now</div>' : `<div class="pillrow">${chips}</div>`}
        </div>
        ${nav.length ? `<div class="switch">${navHtml}</div>` : ''}
        <section class="hero">
          ${minimalHeader ? '' : '<div class="kicker">Texas marketplace</div>'}
          <h1>${headline}</h1>
          <p class="lede">${subhead}</p>
          ${actionHtml ? `<div class="actions">${actionHtml}</div>` : ''}
        </section>
        ${body}
        `}
      </div>
      ${bare ? '' : `<div class="footer">
        <span>${footerLeft}</span>
        <span>${footerRight}</span>
      </div>`}
    </div>
  </div>
</body>
</html>`
}

const jobs = [
  { title: 'Drywall repair for a small retail space', city: 'Arlington', budget: '$1,500 - $3,000', category: 'Interior work', fit: '92%' },
  { title: 'Bathroom tile replacement', city: 'Plano', budget: '$2,000 - $4,500', category: 'Home repair', fit: '88%' },
  { title: 'After-hours lobby cleanup', city: 'Dallas', budget: '$900 - $1,800', category: 'Janitorial', fit: '81%' },
]

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

function homePage() {
  return layout({
    title: 'Texas Bid',
    bare: true,
    body: `
      <main class="cards">
        <a class="card strong home-choice fade-up delay-1" href="/post-job">
          <h2>Post a job</h2>
        </a>
        <a class="card strong home-choice fade-up delay-2" href="/bid-job">
          <h2>Place a bid</h2>
        </a>
      </main>
    `,
  })
}

function postJobPage() {
  return layout({
    title: 'Post a Job | Texas Bid',
    eyebrow: 'Consumer path · free',
    headline: 'Post your job.',
    subhead: 'Keep it short and move on.',
    topChips: [{ label: 'Free', tone: 'good' }],
    actions: [
      { label: 'Continue', href: '/post-job/account', primary: true },
      { label: 'Back home', href: '/', primary: false },
    ],
    body: `
      <main class="grid-two">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Step 1</div>
          <div class="progress">
            <div class="bar"><span style="width: 25%;"></span></div>
            <div class="meta">Location, then the job, then the account.</div>
          </div>
          <div class="form-grid">
            <div class="input">
              <label>Location</label>
              <div class="value">Dallas</div>
            </div>
            <div class="input">
              <label>Job</label>
              <div class="value">Drywall repair</div>
            </div>
            <div class="input">
              <label>Timing</label>
              <div class="value">This week</div>
            </div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Summary</div>
          <div class="choice-list">
            <div class="choice">
              <div>
                <strong>Location</strong>
                <div class="hint">Dallas</div>
              </div>
              <span class="tag good">Set</span>
            </div>
            <div class="choice">
              <div>
                <strong>Scope</strong>
                <div class="hint">Drywall repair</div>
              </div>
              <span class="tag">Set</span>
            </div>
            <div class="choice">
              <div>
                <strong>Budget</strong>
                <div class="hint">Visible to contractors</div>
              </div>
              <span class="tag">Open</span>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Consumer flow',
    footerRight: 'Keep it short, then continue.',
  })
}

function postJobAccountPage() {
  return layout({
    title: 'Make an Account | Texas Bid',
    eyebrow: 'Consumer path · free',
    headline: 'Make an account.',
    subhead: 'Just enough to keep the job and the replies in one place.',
    topChips: [{ label: 'Free', tone: 'good' }],
    actions: [
      { label: 'Continue', href: '/post-job/review', primary: true },
      { label: 'Back', href: '/post-job', primary: false },
    ],
    body: `
      <main class="grid-two">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Account</div>
          <div class="progress">
            <div class="bar"><span style="width: 60%;"></span></div>
            <div class="meta">One quick account step keeps messages and bids attached.</div>
          </div>
          <div class="form-grid">
            <div class="input"><label>Name</label><div class="value">Dylan</div></div>
            <div class="input"><label>Email</label><div class="value">dylan@example.com</div></div>
            <div class="input"><label>Phone</label><div class="value">555-000-0000</div></div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Keep it attached</div>
          <div class="choice-list">
            <div class="choice">
              <div>
                <strong>Replies</strong>
                <div class="hint">Stay with this job</div>
              </div>
              <span class="tag good">On</span>
            </div>
            <div class="choice">
              <div>
                <strong>Status</strong>
                <div class="hint">Track the post after launch</div>
              </div>
              <span class="tag">On</span>
            </div>
            <div class="choice">
              <div>
                <strong>Later</strong>
                <div class="hint">Account can expand with more features</div>
              </div>
              <span class="tag">Ready</span>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Consumer flow',
    footerRight: 'Account step before the review.',
  })
}

function postJobReviewPage() {
  return layout({
    title: 'Review Job | Texas Bid',
    eyebrow: 'Consumer path · free',
    headline: 'Review the job.',
    subhead: 'Short screen, clear preview, no dead ends. Check the post before it goes live.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Ready to submit' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Post a job', href: '/post-job' },
      { label: 'Trust & ratings', href: '/trust' },
    ],
    actions: [
      { label: 'Go live', href: '/post-job/live', primary: true },
      { label: 'Edit details', href: '/post-job', primary: false },
    ],
    body: `
      <main class="split">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Summary</div>
          <div class="job-card">
            <div class="job-head">
              <strong>Drywall repair for a small retail space</strong>
              <span class="badge good">Ready</span>
            </div>
            <div class="meta">Dallas, TX · This week · $1,500 - $3,000</div>
          </div>
          <div class="job-card">
            <div class="job-head">
              <strong>What contractors see</strong>
              <span class="badge">Lean view</span>
            </div>
            <div class="meta">Job scope, location, timing, and your reply thread.</div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">After launch</div>
          <div class="list">
            <div class="mini">
              <strong>Messaging</strong>
              <div class="meta">Replies stay attached to the job so nothing gets lost.</div>
            </div>
            <div class="mini">
              <strong>Ratings</strong>
              <div class="meta">Contractor trust appears next to the bid.</div>
            </div>
            <div class="mini">
              <strong>Certification</strong>
              <div class="meta">Certified and non-certified contractors can both remain visible.</div>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Consumer flow',
    footerRight: 'A short review screen before posting.',
  })
}

function postJobLivePage() {
  return layout({
    title: 'Job Live | Texas Bid',
    eyebrow: 'Consumer path · free',
    headline: 'Your job is live.',
    subhead: 'Contractors can now find it, ask questions, and send bids in the same thread.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Ready for responses' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Messages', href: '/messages' },
      { label: 'Trust & ratings', href: '/trust' },
    ],
    actions: [
      { label: 'Open messages', href: '/messages', primary: true },
      { label: 'Back home', href: '/', primary: false },
    ],
    body: `
      <main class="split">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Live now</div>
          <div class="meter">
            <div class="cluster">
              <span class="tag good">Posted</span>
              <span class="tag">Bids incoming</span>
              <span class="tag">Thread open</span>
            </div>
            <div class="meter-line"><span style="width: 68%;"></span></div>
          </div>
          <div class="list">
            <div class="mini">
              <strong>First reply</strong>
              <div class="meta">A contractor asks clarifying questions inside the thread.</div>
            </div>
            <div class="mini">
              <strong>Trust visible</strong>
              <div class="meta">Rating and certification show up while the conversation is happening.</div>
            </div>
            <div class="mini">
              <strong>Business proof</strong>
              <div class="meta">License and insurance can stay visible without clutter.</div>
            </div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Next move</div>
          <div class="list">
            <div class="job-card">
              <div class="job-head">
                <strong>Read bids</strong>
                <span class="badge good">Compare</span>
              </div>
              <div class="meta">Look at price, timing, and trust side by side.</div>
            </div>
            <div class="job-card">
              <div class="job-head">
                <strong>Message back</strong>
                <span class="badge">One thread</span>
              </div>
              <div class="meta">Keep the thread tied to this exact job.</div>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Consumer flow',
    footerRight: 'The job, the thread, and the response lane.',
  })
}

function bidJobPage() {
  return layout({
    title: 'Bid a Job | Texas Bid',
    eyebrow: 'Contractor path · free',
    headline: 'Bid on work.',
    subhead: 'Keep it short and move on.',
    topChips: [{ label: 'Free', tone: 'good' }],
    actions: [
      { label: 'Continue', href: '/bid-job/account', primary: true },
      { label: 'Back home', href: '/', primary: false },
    ],
    body: `
      <main class="grid-two">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Step 1</div>
          <div class="progress">
            <div class="bar"><span style="width: 25%;"></span></div>
            <div class="meta">Account, then jobs, then bids.</div>
          </div>
          <div class="form-grid">
            <div class="input"><label>Trade</label><div class="value">Drywall repair</div></div>
            <div class="input"><label>Area</label><div class="value">Dallas</div></div>
            <div class="input"><label>Status</label><div class="value">Ready to bid</div></div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Start state</div>
          <div class="choice-list">
            <div class="choice">
              <div>
                <strong>Account</strong>
                <div class="hint">Create the contractor profile</div>
              </div>
              <span class="tag good">Next</span>
            </div>
            <div class="choice">
              <div>
                <strong>Proof</strong>
                <div class="hint">License, insurance, or later verification</div>
              </div>
              <span class="tag">Ready</span>
            </div>
            <div class="choice">
              <div>
                <strong>Jobs</strong>
                <div class="hint">Browse and bid</div>
              </div>
              <span class="tag">Open</span>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Contractor flow',
    footerRight: 'Keep it short, then continue.',
  })
}

function bidJobAccountPage() {
  return layout({
    title: 'Make an Account | Texas Bid',
    eyebrow: 'Contractor path · free',
    headline: 'Make an account.',
    subhead: 'One screen to start the contractor profile.',
    topChips: [{ label: 'Free', tone: 'good' }],
    actions: [
      { label: 'Continue', href: '/bid-job/browse', primary: true },
      { label: 'Back', href: '/bid-job', primary: false },
    ],
    body: `
      <main class="grid-two">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Contractor account</div>
          <div class="progress">
            <div class="bar"><span style="width: 60%;"></span></div>
            <div class="meta">A simple profile now, proof later if needed.</div>
          </div>
          <div class="form-grid">
            <div class="input"><label>Business name</label><div class="value">Lone Star Works</div></div>
            <div class="input"><label>Trade</label><div class="value">Interior repair</div></div>
            <div class="input"><label>Service area</label><div class="value">Fort Worth + Dallas</div></div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Verification</div>
          <div class="choice-list">
            <div class="choice">
              <div>
                <strong>Business license</strong>
                <div class="hint">Optional for now</div>
              </div>
              <span class="tag">Later</span>
            </div>
            <div class="choice">
              <div>
                <strong>Insurance</strong>
                <div class="hint">Optional for now</div>
              </div>
              <span class="tag">Later</span>
            </div>
            <div class="choice">
              <div>
                <strong>Visible badge</strong>
                <div class="hint">Certified or not certified</div>
              </div>
              <span class="tag good">Ready</span>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Contractor flow',
    footerRight: 'Account step before browsing jobs.',
  })
}

function bidBrowsePage() {
  return layout({
    title: 'Browse Jobs | Texas Bid',
    eyebrow: 'Contractor path · free',
    headline: 'Browse nearby jobs.',
    subhead: 'See jobs by location, category, fit, and trust. Keep the best matches at the top.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Open jobs' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Post a job', href: '/post-job' },
      { label: 'Messages', href: '/messages' },
    ],
    actions: [
      { label: 'Send a bid', href: '/bid-job/bid', primary: true },
      { label: 'View trust', href: '/trust', primary: false },
    ],
    body: `
      <main class="split">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Filters</div>
          <div class="cluster">
            <span class="pill">Dallas</span>
            <span class="pill">Fort Worth</span>
            <span class="pill">Plano</span>
            <span class="pill">Janitorial</span>
            <span class="pill">Interior work</span>
          </div>
          <div class="list">
            ${jobs.map((job) => `
              <div class="job-card">
                <div class="job-head">
                  <strong>${job.title}</strong>
                  <span class="badge good">${job.fit} fit</span>
                </div>
                <div class="meta">${job.city} · ${job.category} · ${job.budget}</div>
                <div class="cluster">
                  <span class="tag good">Open</span>
                  <span class="tag">Free to bid</span>
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Contractor trust</div>
          <div class="list">
            ${contractors.map((contractor) => `
              <a class="mini" href="${contractor.route}">
                <strong>${contractor.name}</strong>
                <div class="meta">${contractor.service}</div>
                <div class="rating">
                  <span class="score">${contractor.rating}</span>
                  <span class="muted">${contractor.reviews} reviews</span>
                  <span class="badge ${contractor.tone}">${contractor.badge}</span>
                </div>
                <div class="meta">${contractor.proof} · ${contractor.note}</div>
              </a>
            `).join('')}
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Contractor flow',
    footerRight: 'Location, fit, and proof together.',
  })
}

function bidFormPage() {
  return layout({
    title: 'Send a Bid | Texas Bid',
    eyebrow: 'Contractor path · free',
    headline: 'Send a bid.',
    subhead: 'Keep it fast: price, timing, and a short note are enough for the first version.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Ready to send' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Browse jobs', href: '/bid-job/browse' },
      { label: 'Messages', href: '/messages' },
    ],
    actions: [
      { label: 'Open thread', href: '/messages', primary: true },
      { label: 'Back to browse', href: '/bid-job/browse', primary: false },
    ],
    body: `
      <main class="split">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Bid form</div>
          <div class="steps">
            <div class="step"><strong>Price</strong><span>Enter your bid amount.</span></div>
            <div class="step"><strong>Timing</strong><span>Tell them when you can start.</span></div>
            <div class="step"><strong>Note</strong><span>Short message, attached to the job.</span></div>
          </div>
          <div class="field">
            <strong>Thread preview</strong>
            <p>The message stays tied to this job and this bid.</p>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Why this works</div>
          <div class="list">
            <div class="mini">
              <strong>Simple first</strong>
              <div class="meta">Fast enough to use before the app gets heavier.</div>
            </div>
            <div class="mini">
              <strong>Expandable later</strong>
              <div class="meta">Saved templates, attachments, and paid tools can slot in later.</div>
            </div>
          </div>
        </section>
      </main>
    `,
    footerLeft: 'Contractor flow',
    footerRight: 'Fast bid, attached to the job.',
  })
}

function messagesPage() {
  return layout({
    title: 'Messages | Texas Bid',
    eyebrow: 'Shared messaging · free',
    headline: 'Keep the conversation with the job.',
    subhead: 'A simple in-app message system that stays attached to the post, the bid, and the contractor.',
    topChips: [{ label: 'Free', tone: 'good' }, { label: 'Both sides use it' }],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Post a job', href: '/post-job' },
      { label: 'Bid a job', href: '/bid-job' },
    ],
    body: `
      <main class="split">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Inbox</div>
          <div class="list">
            <div class="bubble">
              <small>Alma Rivera</small>
              <strong>“I can start tomorrow afternoon.”</strong>
            </div>
            <div class="bubble">
              <small>Lone Star Works</small>
              <strong>“Can you confirm the site size and access?”</strong>
            </div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Thread</div>
          <div class="thread">
            <div class="bubble">
              <small>Consumer</small>
              <strong>Posted the job and asked for timing.</strong>
            </div>
            <div class="bubble">
              <small>Contractor</small>
              <strong>Asked for the address, scope, and preferred start date.</strong>
            </div>
            <div class="bubble">
              <small>System</small>
              <strong>This can later become push, email, and paid messaging upgrades.</strong>
            </div>
            <div class="composer">
              <div class="line">Write a reply...</div>
              <div class="cluster">
                <span class="tag good">Send</span>
                <span class="tag">Attach bid</span>
                <span class="tag">Mark read</span>
              </div>
            </div>
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
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Certification ladder</div>
          <div class="steps">
            <div class="step"><strong>Non-certified</strong><span>Basic profile only. Can bid, but lacks proof signals.</span></div>
            <div class="step"><strong>Verified</strong><span>Identity and business details on file.</span></div>
            <div class="step"><strong>Certified</strong><span>Business license, insurance, and trade proof visible.</span></div>
          </div>
          <div class="field">
            <strong>Future paid tier</strong>
            <p>Later this can support boosts, analytics, faster lead handling, and premium contractor tools.</p>
          </div>
        </section>
        <section class="frame fade-up delay-2">
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

function contractorProfilePage(contractor) {
  return layout({
    title: `${contractor.name} | Texas Bid`,
    eyebrow: contractor.badge === 'Certified' ? 'Profile view · certified example' : 'Profile view · non-certified example',
    headline: contractor.name,
    subhead: 'A contractor profile that shows rating, certification, and proof in one place.',
    topChips: [
      { label: contractor.badge, tone: contractor.tone },
      { label: `${contractor.rating} rating`, tone: 'good' },
      { label: `${contractor.reviews} reviews` },
    ],
    nav: [
      { label: 'Home', href: '/' },
      { label: 'Bid a job', href: '/bid-job' },
      { label: 'Trust & ratings', href: '/trust' },
    ],
    actions: [
      { label: 'Message contractor', href: '/messages', primary: true },
      { label: 'Back to jobs', href: '/bid-job/browse', primary: false },
    ],
    body: `
      <main class="split">
        <section class="sheet strong fade-up delay-1">
          <div class="section-title">Profile proof</div>
          <div class="rating">
            <span class="score">${contractor.rating}</span>
            <div>
              <div class="muted">${contractor.reviews} reviews</div>
              <div class="cluster" style="margin-top: 8px;">
                <span class="badge ${contractor.tone}">${contractor.badge}</span>
                <span class="badge">Service area: ${contractor.service}</span>
              </div>
            </div>
          </div>
          <div class="steps">
            <div class="step"><strong>Service area</strong><span>${contractor.service}</span></div>
            <div class="step"><strong>Trade focus</strong><span>Interior repair, light renovation, and small commercial jobs</span></div>
            <div class="step"><strong>Messaging status</strong><span>Replies quickly and keeps the thread with the job</span></div>
          </div>
        </section>
        <section class="frame fade-up delay-2">
          <div class="section-title">Why this matters</div>
          <div class="list">
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
    bare: true,
    body: `
      <main class="cards">
        <a class="card strong home-choice fade-up delay-1" href="/post-job">
          <h2>Post a job</h2>
        </a>
        <a class="card strong home-choice fade-up delay-2" href="/bid-job">
          <h2>Place a bid</h2>
        </a>
      </main>
    `,
  })
}

const contractorPages = {
  '/contractors/alma-rivera': () => contractorProfilePage({
    name: 'Alma Rivera',
    badge: 'Certified',
    tone: 'good',
    rating: '4.9',
    reviews: 42,
    service: 'Dallas, TX',
    proof: 'Business license verified',
    note: 'Insurance on file and strong response time.',
    route: '/contractors/alma-rivera',
  }),
  '/contractors/lone-star-works': () => contractorProfilePage({
    name: 'Lone Star Works',
    badge: 'Non-certified',
    tone: 'warn',
    rating: '4.3',
    reviews: 11,
    service: 'Fort Worth, TX',
    proof: 'Basic profile only',
    note: 'Ready to bid, but missing business proof.',
    route: '/contractors/lone-star-works',
  }),
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    const pathname = url.pathname
    if (pathname === '/') return new Response(homePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/post-job') return new Response(postJobPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/post-job/account') return new Response(postJobAccountPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/post-job/review') return new Response(postJobReviewPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/post-job/live') return new Response(postJobLivePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/bid-job') return new Response(bidJobPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/bid-job/account') return new Response(bidJobAccountPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/bid-job/browse') return new Response(bidBrowsePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/bid-job/bid') return new Response(bidFormPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/messages') return new Response(messagesPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname === '/trust') return new Response(trustPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (pathname in contractorPages) return new Response(contractorPages[pathname](), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    return new Response(notFoundPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  },
}
