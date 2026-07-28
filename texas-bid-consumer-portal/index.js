const page = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Texas Bid Consumer Portal</title>
  <meta name="description" content="Post a job, compare trusted Texas contractors, and hire locally with a cleaner consumer workflow." />
  <style>
    :root {
      --bg: #07111f;
      --bg2: #0d1930;
      --panel: rgba(9, 18, 35, 0.76);
      --panel2: rgba(18, 28, 52, 0.84);
      --line: rgba(138, 171, 226, 0.18);
      --text: #eef4ff;
      --muted: #a9b8d8;
      --accent: #6fb3ff;
      --accent2: #ffca5c;
      --good: #48d18a;
      --shadow: 0 28px 90px rgba(0, 0, 0, 0.42);
      --radius: 24px;
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
    .wrap { max-width: 1200px; margin: 0 auto; padding: 32px 20px 56px; }
    .shell {
      border: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(8, 15, 29, 0.92), rgba(10, 18, 35, 0.86));
      border-radius: 32px;
      box-shadow: var(--shadow);
      overflow: hidden;
    }
    header {
      padding: 28px 28px 0;
      display: grid;
      gap: 18px;
    }
    .topbar {
      display: flex;
      justify-content: space-between;
      gap: 18px;
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
      grid-template-columns: 1.35fr 0.9fr;
      gap: 22px;
      align-items: stretch;
      padding-bottom: 26px;
    }
    .hero-card {
      border: 1px solid var(--line);
      background:
        linear-gradient(135deg, rgba(111, 179, 255, 0.15), rgba(255, 202, 92, 0.08)),
        rgba(9, 17, 33, 0.72);
      border-radius: var(--radius);
      padding: 30px;
    }
    h1 {
      margin: 0;
      font-size: clamp(2.5rem, 6vw, 4.7rem);
      line-height: 0.98;
      letter-spacing: -0.05em;
      max-width: 11ch;
    }
    .lede {
      margin: 18px 0 0;
      max-width: 66ch;
      color: #d2def8;
      font-size: 1.08rem;
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
    .grid {
      padding: 0 28px 28px;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 16px;
    }
    .panel {
      grid-column: span 6;
      border: 1px solid var(--line);
      background: var(--panel);
      border-radius: 24px;
      padding: 22px;
      backdrop-filter: blur(12px);
    }
    .panel.wide { grid-column: span 12; }
    .panel h2 {
      margin: 0 0 10px;
      font-size: 1.2rem;
      letter-spacing: -0.03em;
    }
    .panel p, .panel li {
      color: #d4dff4;
      line-height: 1.6;
    }
    .list {
      display: grid;
      gap: 12px;
      margin-top: 14px;
    }
    .card {
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 16px;
      background: rgba(255,255,255,0.03);
    }
    .card b { display: block; margin-bottom: 6px; }
    .card .meta { color: var(--muted); font-size: 0.9rem; margin-bottom: 8px; }
    .tagrow { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
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
    footer {
      border-top: 1px solid var(--line);
      padding: 20px 28px 28px;
      color: var(--muted);
      display: flex;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; }
      .panel { grid-column: span 12; }
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
    <div class="shell">
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
              <div class="pill">Post a job</div>
              <div class="pill">Compare bids</div>
              <div class="pill">Hire locally</div>
            </div>
            <h1>One cleaner way to hire a Texas contractor.</h1>
            <p class="lede">
              Texas Bid gives homeowners, property managers, and local businesses one clear place to describe a job, review trusted contractors, compare responses, and choose confidently without bouncing between tools.
            </p>
            <div class="actions">
              <a class="btn btn-primary" href="https://github.com/kinectic/texas-bid-consumer-portal">View source</a>
              <a class="btn btn-secondary" href="https://github.com/kinectic/texas-bid-consumer-portal/actions">Check build history</a>
            </div>
            <div class="tagrow">
              <div class="tag good">Launched from a free site host</div>
              <div class="tag">Consumer-side workflow</div>
              <div class="tag warn">Public landing page first</div>
            </div>
          </div>

          <div class="stats">
            <div class="stat">
              <strong>3</strong>
              <span>Core actions: post, compare, hire.</span>
            </div>
            <div class="stat">
              <strong>2</strong>
              <span>Trust layers: visible proof and clear follow-up.</span>
            </div>
            <div class="stat">
              <strong>1</strong>
              <span>Focused Texas workflow, not generic clutter.</span>
            </div>
            <div class="stat">
              <strong>0</strong>
              <span>Paid hosting required to publish this page.</span>
            </div>
          </div>
        </section>
      </header>

      <main class="grid">
        <section class="panel">
          <h2>What the product is</h2>
          <p>
            A Texas-first marketplace that helps people compare local contractors with more confidence. It is built around a simple hiring flow: post a job once, see relevant local matches, compare bids and trust signals, and keep the conversation attached to the work.
          </p>
          <div class="list">
            <div class="card">
              <b>Trust-first matching</b>
              <div class="meta">Surface verification, responsiveness, and service area early.</div>
              <div>Make the quality signal obvious before the customer wastes time on back-and-forth.</div>
            </div>
            <div class="card">
              <b>Fast local discovery</b>
              <div class="meta">Keep the experience Texas-focused and easy to navigate.</div>
              <div>Help customers move from a county or city context into the right contractor shortlist quickly.</div>
            </div>
          </div>
        </section>

        <section class="panel">
          <h2>What the first launch shows</h2>
          <p>
            The current release is a launch page for the consumer portal, published free and kept intentionally lightweight while the deeper app remains under active build.
          </p>
          <div class="list">
            <div class="card">
              <b>Public entry point</b>
              <div class="meta">People can land here without paying for hosting.</div>
              <div>The page explains the product and points back to the source repository.</div>
            </div>
            <div class="card">
              <b>Clear next step</b>
              <div class="meta">Keep the build moving without losing the thread.</div>
              <div>The local app can keep evolving while this public page stays online and shareable.</div>
            </div>
          </div>
        </section>

        <section class="panel wide">
          <h2>Launch notes</h2>
          <p>
            The site is live on a free host. It is intentionally simple right now: a public product surface that points at the Texas Bid consumer portal, rather than a bloated demo or a dead placeholder.
          </p>
          <div class="tagrow">
            <div class="tag good">Public URL active</div>
            <div class="tag">Free publish path used</div>
            <div class="tag">Built for follow-up work</div>
            <div class="tag warn">Local app can keep growing separately</div>
          </div>
        </section>
      </main>

      <footer>
        <span>Texas Bid Consumer Portal</span>
        <span>Published from the workspace on the free site host.</span>
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
