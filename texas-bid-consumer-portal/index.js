const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Texas Bid Consumer Portal</title>
  <meta name="description" content="Free Texas marketplace for homeowners and contractors. Pick your path, post a job, browse work, and bid locally." />
  <style>
    :root {
      --bg: #07111f;
      --bg2: #0d1930;
      --panel: rgba(10, 19, 38, 0.8);
      --line: rgba(138, 171, 226, 0.18);
      --text: #eef4ff;
      --muted: #a9b8d8;
      --accent: #6fb3ff;
      --accent2: #ffca5c;
      --good: #48d18a;
      --shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
      --radius: 26px;
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; }
    body {
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--text);
      background:
        radial-gradient(circle at top left, rgba(111, 179, 255, 0.2), transparent 28%),
        radial-gradient(circle at 90% 10%, rgba(255, 202, 92, 0.13), transparent 24%),
        linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
    }
    a { color: inherit; }
    .wrap { max-width: 1160px; margin: 0 auto; padding: 28px 18px 48px; }
    .shell {
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(8, 15, 29, 0.94), rgba(10, 18, 35, 0.88));
      border-radius: 30px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    header {
      padding: 26px 26px 0;
      display: grid;
      gap: 20px;
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
      font-size: 1.1rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #fff;
    }
    .brand span { color: var(--muted); font-size: 0.92rem; }
    .pillrow { display: flex; gap: 10px; flex-wrap: wrap; }
    .pill {
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.04);
      color: #d9e5ff;
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 0.88rem;
    }
    .hero {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 20px;
      align-items: stretch;
      padding-bottom: 24px;
    }
    .hero-card, .free-card, .path-card {
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--panel);
      backdrop-filter: blur(14px);
    }
    .hero-card { padding: 28px; }
    .free-card { padding: 24px; display: grid; align-content: start; gap: 14px; }
    h1 {
      margin: 0;
      font-size: clamp(2.45rem, 6vw, 4.75rem);
      line-height: 0.98;
      letter-spacing: -0.05em;
      max-width: 10.5ch;
    }
    .lede {
      margin: 18px 0 0;
      max-width: 58ch;
      color: #d2def8;
      font-size: 1.04rem;
      line-height: 1.65;
    }
    .actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 24px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 12px 16px;
      border-radius: 14px;
      text-decoration: none;
      font-weight: 700;
      border: 1px solid transparent;
    }
    .btn-primary {
      background: linear-gradient(135deg, #75baff, #4a8cff);
      color: #04101f;
    }
    .btn-secondary {
      background: rgba(255,255,255,0.05);
      border-color: var(--line);
      color: var(--text);
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }
    .stat {
      border: 1px solid var(--line);
      background: rgba(255,255,255,0.04);
      border-radius: 20px;
      padding: 18px;
      min-height: 112px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .stat strong { font-size: 2rem; letter-spacing: -0.05em; }
    .stat span { color: var(--muted); font-size: 0.9rem; line-height: 1.4; }
    .role-grid {
      padding: 0 26px 26px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .path-card {
      padding: 24px;
      display: grid;
      gap: 14px;
    }
    .path-head {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: start;
      flex-wrap: wrap;
    }
    .path-head h2 {
      margin: 0;
      font-size: 1.4rem;
      letter-spacing: -0.04em;
    }
    .path-head span {
      color: var(--muted);
      font-size: 0.92rem;
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
    .cardrow { display: flex; flex-wrap: wrap; gap: 8px; }
    .tag {
      border-radius: 999px;
      padding: 6px 10px;
      border: 1px solid var(--line);
      font-size: 0.82rem;
      color: #d8e3fb;
      background: rgba(255,255,255,0.03);
    }
    .tag.good { border-color: rgba(72, 209, 138, 0.28); color: #9af0bd; }
    .tag.warn { border-color: rgba(255, 202, 92, 0.28); color: #ffe1a2; }
    .prompt {
      display: grid;
      gap: 8px;
      padding-top: 4px;
    }
    .prompt b {
      font-size: 1.05rem;
      letter-spacing: -0.02em;
    }
    .prompt span {
      color: var(--muted);
      line-height: 1.55;
    }
    footer {
      border-top: 1px solid var(--line);
      padding: 20px 26px 26px;
      color: var(--muted);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .role-grid { grid-template-columns: 1fr; }
      .stats { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 620px) {
      header, .grid, footer { padding-left: 18px; padding-right: 18px; }
      .stats { grid-template-columns: 1fr; }
      h1 { max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="shell" id="top">
      <header>
        <div class="topbar">
          <div class="brand">
            <b>Texas Bid</b>
            <span>Consumer portal for posting jobs, comparing bids, and hiring local Texas contractors.</span>
          </div>
          <div class="pillrow">
            <div class="pill">Texas-first</div>
            <div class="pill">Trust-aware</div>
            <div class="pill">Free launch</div>
          </div>
        </div>

        <section class="hero">
          <div class="hero-card">
            <div class="pillrow" style="margin-bottom: 18px;">
              <div class="pill">Free for everyone</div>
              <div class="pill">Consumer or contractor</div>
            </div>
            <h1>Pick a side. Start free. Keep it simple.</h1>
            <p class="lede">
              Texas Bid is a helpful Texas marketplace for both sides. Consumers start by picking a location and posting a job. Contractors start by creating an account, browsing nearby work, and bidding.
            </p>
            <div class="actions">
              <a class="btn btn-primary" href="#consumer">Start as consumer</a>
              <a class="btn btn-secondary" href="#contractor">Start as contractor</a>
            </div>
            <div class="cardrow" style="margin-top: 14px;">
              <div class="tag good">Free at launch</div>
              <div class="tag">No paid plan yet</div>
              <div class="tag warn">Simple first screen</div>
            </div>
          </div>

          <div class="free-card">
            <div class="prompt">
              <b>Everything is free right now.</b>
              <span>Free to browse. Free to post. Free to bid. Free to create an account later if you want a faster path.</span>
            </div>
            <div class="stats">
              <div class="stat">
                <strong>1</strong>
                <span>Place to start.</span>
              </div>
              <div class="stat">
                <strong>2</strong>
                <span>Paths: consumer or contractor.</span>
              </div>
              <div class="stat">
                <strong>0</strong>
                <span>Paywall on day one.</span>
              </div>
              <div class="stat">
                <strong>100%</strong>
                <span>Texas-first focus.</span>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main class="role-grid">
        <section class="path-card" id="consumer">
          <div class="path-head">
            <div>
              <h2>Consumer path</h2>
              <span>Pick location, describe the job, post it free.</span>
            </div>
            <div class="tag good">Start here</div>
          </div>
          <div class="steps">
            <div class="step">
              <strong>1. Pick your location</strong>
              <span>Choose your city or area so the match stays local.</span>
            </div>
            <div class="step">
              <strong>2. Post the job</strong>
              <span>Tell us what needs doing in a few plain words.</span>
            </div>
            <div class="step">
              <strong>3. Review responses</strong>
              <span>Compare bids and trust signals in one place.</span>
            </div>
          </div>
          <div class="actions">
            <a class="btn btn-primary" href="#consumer">Post a job free</a>
          </div>
        </section>

        <section class="path-card" id="contractor">
          <div class="path-head">
            <div>
              <h2>Contractor path</h2>
              <span>Create an account, browse jobs, bid free.</span>
            </div>
            <div class="tag warn">For pros</div>
          </div>
          <div class="steps">
            <div class="step">
              <strong>1. Create an account</strong>
              <span>Set up your profile and show what you do.</span>
            </div>
            <div class="step">
              <strong>2. Browse nearby jobs</strong>
              <span>See work by location, trade, and fit.</span>
            </div>
            <div class="step">
              <strong>3. Bid on the right ones</strong>
              <span>Send a response and keep track of your leads.</span>
            </div>
          </div>
          <div class="actions">
            <a class="btn btn-secondary" href="#contractor">Create account free</a>
          </div>
        </section>
      </main>

      <main class="role-grid" style="padding-top: 0;">
        <section class="path-card" style="grid-column: span 2;">
          <div class="prompt">
            <b>Helpful for both sides.</b>
            <span>Consumers get a cleaner way to start a job. Contractors get a clean place to find work and bid. That’s the whole point.</span>
          </div>
        </section>
      </main>

      <footer>
        <span>Texas Bid Consumer Portal</span>
        <span>Published free and kept intentionally direct.</span>
      </footer>
    </div>
  </div>
</body>
</html>`

export default {
  async fetch(request) {
    const url = new URL(request.url)
    if (url.pathname !== '/' && url.pathname !== '/index.html') {
      return new Response(page, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
        },
      })
    }

    return new Response(page, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
      },
    })
  },
}
