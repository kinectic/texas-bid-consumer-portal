# Texas Bid Consumer Portal

Consumer-side Texas marketplace product built with React, TypeScript, and Vite.

## Product direction

This site is the public-facing consumer and contractor experience for Texas Bid.

Core hiring loop:
- customer posts a job
- local contractors get matched
- customer compares bids and trust signals
- customer messages and hires with more confidence

The current build direction is intentionally:
- Texas-first
- trust-aware
- free-to-try at launch
- lightweight enough to publish on free static hosting

## Local development

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm run build
```

## Recommended free publish path

Primary recommendation: **Cloudflare Pages**

Why:
- good fit for a static Vite app
- free hosting
- simple production branch flow
- avoids GitHub Pages subpath awkwardness when a root-domain style deployment is preferred

Cloudflare Pages settings:
- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Root directory: blank
- Node version: `22`

## Other supported free hosts

### Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect file included at `public/_redirects`

### Vercel
- Uses `vercel.json`
- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages
If publishing under a repository subpath, set `VITE_BASE_PATH` during build, for example:

```bash
VITE_BASE_PATH=/texas-bid-consumer-portal/ npm run build
```

A workflow is included at:
- `.github/workflows/deploy-gh-pages.yml`

## Host-compatibility files already included

- `public/404.html` for GitHub Pages SPA fallback behavior
- `public/_redirects` for Netlify SPA routing
- `public/_headers` for compatible static-host security headers
- `public/site.webmanifest` for basic installable metadata
- `vite.config.ts` with `VITE_BASE_PATH` support for subpath deployments

## Publish status

Current state:
- lint passes
- production build passes
- consumer site has been hardened for free static hosting
- GitHub repo already exists: `https://github.com/kinectic/texas-bid-consumer-portal`

Current external blocker:
- command-line Git push auth still needs to be completed before the isolated standalone repo can be pushed from shell

## Launch-ready UX work already added

Recent polish focused on making the product feel more public-launch ready:
- stronger Texas-first home messaging
- clearer trust-center explanations
- better contractor onboarding framing
- more guided marketplace drilldown
- more decisive bid-comparison and selection language

## Next publish steps

1. Push the isolated standalone repo to GitHub `main`
2. Connect the repo to Cloudflare Pages
3. Run first production deploy
4. Verify public URL and final static-host behavior
5. Continue post-publish polish from the live deployment path
