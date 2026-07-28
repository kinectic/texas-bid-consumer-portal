const styles = `
  :root {
    --bg: #07111f;
    --bg2: #0d1930;
    --panel: rgba(10, 19, 38, 0.82);
    --line: rgba(138, 171, 226, 0.18);
    --text: #eef4ff;
    --muted: #a9b8d8;
    --accent: #6fb3ff;
    --good: #4ee09a;
    --warn: #ffd36f;
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
  .wrap { max-width: 1080px; margin: 0 auto; padding: 28px 18px 44px; }
  .shell {
    border: 1px solid var(--line);
    border-radius: 30px;
    background: linear-gradient(180deg, rgba(8, 15, 29, 0.95), rgba(10, 18, 35, 0.9));
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  header {
    padding: 24px 24px 16px;
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
  .pill, .chip {
    border: 1px solid var(--line);
    background: rgba(255,255,255,0.04);
    color: #d9e5ff;
    border-radius: 999px;
    padding: 8px 12px;
    font-size: 0.88rem;
  }
  .pill.good, .chip.good { border-color: rgba(78, 224, 154, 0.3); color: #b9f4d8; }
  .pill.warn, .chip.warn { border-color: rgba(255, 211, 111, 0.3); color: #ffe6ae; }
  .hero {
    display: grid;
    gap: 16px;
    align-items: start;
  }
  h1 {
    margin: 0;
    font-size: clamp(2.5rem, 7vw, 5rem);
    line-height: 0.95;
    letter-spacing: -0.055em;
    max-width: 9.5ch;
  }
  .lede {
    max-width: 52ch;
    margin: 0;
    color: #d6e2fa;
    line-height: 1.65;
    font-size: 1.02rem;
  }
  .cards {
    padding: 0 24px 24px;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .card {
    border: 1px solid var(--line);
    border-radius: 24px;
    background: var(--panel);
    padding: 22px;
    display: grid;
    gap: 14px;
    text-decoration: none;
    min-height: 220px;
  }
  .card:hover { border-color: rgba(111, 179, 255, 0.42); transform: translateY(-1px); }
  .card h2 {
    margin: 0;
    font-size: 1.5rem;
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
  .actions { display: flex; gap: 12px; flex-wrap: wrap; }
  .footer {
    padding: 18px 24px 24px;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
    color: var(--muted);
  }
  @media (max-width: 860px) {
    .cards { grid-template-columns: 1fr; }
  }
`

function layout({ title, body }) {
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
      ${body}
    </div>
  </div>
</body>
</html>`
}

function homePage() {
  return layout({
    title: 'Texas Bid',
    body: `
      <header>
        <div class="topbar">
          <div class="brand">
            <b>Texas Bid</b>
            <span>Free for now. Choose your path.</span>
          </div>
          <div class="pillrow">
            <div class="pill good">Free launch</div>
            <div class="pill">Texas-first</div>
          </div>
        </div>
        <section class="hero">
          <h1>Pick a job or pick a bid.</h1>
          <p class="lede">
            A simple Texas tool for both sides: homeowners and contractors.
          </p>
        </section>
      </header>
      <main class="cards">
        <a class="card" href="/post-job">
          <div class="pillrow">
            <div class="chip good">Consumer</div>
          </div>
          <h2>Post a job</h2>
          <p>Pick your location and move straight into the job posting flow.</p>
        </a>
        <a class="card" href="/bid-job">
          <div class="pillrow">
            <div class="chip warn">Contractor</div>
          </div>
          <h2>Bid a job</h2>
          <p>Create an account, browse nearby work, and start bidding.</p>
        </a>
      </main>
      <footer class="footer">
        <span>Everything is free right now.</span>
        <span>Built to keep the first screen clean.</span>
      </footer>
    `,
  })
}

function postJobPage() {
  return layout({
    title: 'Post a Job | Texas Bid',
    body: `
      <header>
        <div class="topbar">
          <div class="brand">
            <b>Texas Bid</b>
            <span>Consumer path</span>
          </div>
          <div class="pillrow">
            <div class="pill good">Free</div>
            <div class="pill">Post a job</div>
          </div>
        </div>
        <section class="hero">
          <h1>Post your job.</h1>
          <p class="lede">
            Pick a location, describe the work, and send it out to local contractors.
          </p>
        </section>
      </header>
      <main class="cards">
        <section class="card">
          <div class="pillrow"><div class="chip good">Next steps</div></div>
          <div class="steps">
            <div class="step"><strong>1. Choose your location</strong><span>Start with the city or area.</span></div>
            <div class="step"><strong>2. Describe the job</strong><span>Tell contractors what you need.</span></div>
            <div class="step"><strong>3. Review responses</strong><span>Compare the replies that come back.</span></div>
          </div>
          <div class="actions">
            <a class="cta primary" href="/">Back home</a>
          </div>
        </section>
        <section class="card">
          <div class="pillrow"><div class="chip">Free forever for now</div></div>
          <p>Post it, compare it, and keep moving without extra friction.</p>
        </section>
      </main>
      <footer class="footer">
        <span>Consumer flow</span>
        <span>Location first, then the job details.</span>
      </footer>
    `,
  })
}

function bidJobPage() {
  return layout({
    title: 'Bid a Job | Texas Bid',
    body: `
      <header>
        <div class="topbar">
          <div class="brand">
            <b>Texas Bid</b>
            <span>Contractor path</span>
          </div>
          <div class="pillrow">
            <div class="pill good">Free</div>
            <div class="pill">Bid a job</div>
          </div>
        </div>
        <section class="hero">
          <h1>Bid on work.</h1>
          <p class="lede">
            Create an account, browse nearby jobs, and send bids to the ones that fit.
          </p>
        </section>
      </header>
      <main class="cards">
        <section class="card">
          <div class="pillrow"><div class="chip warn">Next steps</div></div>
          <div class="steps">
            <div class="step"><strong>1. Create an account</strong><span>Set up your contractor profile.</span></div>
            <div class="step"><strong>2. Browse jobs</strong><span>See work nearby by location and fit.</span></div>
            <div class="step"><strong>3. Send a bid</strong><span>Respond to the jobs you want.</span></div>
          </div>
          <div class="actions">
            <a class="cta primary" href="/">Back home</a>
          </div>
        </section>
        <section class="card">
          <div class="pillrow"><div class="chip">Free forever for now</div></div>
          <p>Keep your work visible and your bids in one place.</p>
        </section>
      </main>
      <footer class="footer">
        <span>Contractor flow</span>
        <span>Browse first, then bid.</span>
      </footer>
    `,
  })
}

export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname === '/post-job') return new Response(postJobPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    if (url.pathname === '/bid-job') return new Response(bidJobPage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
    return new Response(homePage(), { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  },
}
