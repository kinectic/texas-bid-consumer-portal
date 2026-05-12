# Consumer lane — texas-bid-consumer-portal

## Product direction

Build the consumer-side Texas marketplace around one tight loop:
- customer posts a job
- verified contractor finds it and bids
- both sides message inside the platform
- customer compares bids and chooses a contractor
- both sides track status from posted to awarded to completed

The early product should optimize for:
- trust
- liquidity
- fast local matching
- low-friction onboarding
- Texas-first relevance
- future multi-state expansion through a reusable core plus state configuration

## Strategic stance

### Launch model
- Texas-wide availability
- local/manual fulfillment support when early jobs need supply help
- free for both sides at launch
- layered contractor verification instead of one hard gate
- marketplace software plus internal outreach/ops support during early liquidity building

### Core product thesis
This is not just a listing board. It should feel like:
- a homeowner-friendly local hiring workflow
- a contractor lead pipeline
- a trust-filtered Texas services marketplace

## Ordered artifact list

### Phase 0 — planning foundation
1. **ConsumerTrustLiquidityStrategy**
   - file: `CONSUMER-PLAN.md`
   - purpose: define trust model, liquidity model, launch stance, monetization sequence

2. **ConsumerInformationArchitecture**
   - target: new consumer route/view map in app structure
   - purpose: define the main product surfaces before heavy UI work

3. **ConsumerDataModelBlueprint**
   - target: shared local data/types layer
   - purpose: define users, contractor verification, jobs, bids, conversations, status tracking

### Phase 1 — product shell conversion
4. **ConsumerAppShellRefactor**
   - target: `src/App.tsx`, `src/data/viewData.ts`, navigation labels, shell copy
   - purpose: replace government-demo framing with consumer marketplace framing

5. **ConsumerHomeShowcase**
   - target: home route
   - purpose: explain the product in plain Texas-first consumer language

6. **ConsumerRoleGateway**
   - target: shared entry flow
   - purpose: split cleanly between job poster and contractor experience

### Phase 2 — customer workflow
7. **CustomerJobPostFlow**
   - target: post-job route and form state
   - purpose: let a consumer create a job with category, urgency, location, scope, budget/timeline signals

8. **CustomerJobDashboard**
   - target: customer workspace route
   - purpose: show posted jobs, incoming bids, messages, and selected contractor state

9. **BidComparisonWorkspace**
   - target: customer-side comparison panel(s)
   - purpose: compare bids on price, timing, trust indicators, and fit

### Phase 3 — contractor workflow
10. **ContractorOnboardingAndVerification**
    - target: contractor signup/profile route
    - purpose: capture business identity, service area, trade, phone/email verification, optional EIN/license/insurance

11. **ContractorJobFeed**
    - target: contractor discovery route
    - purpose: show relevant jobs by region, category, urgency, and fit

12. **ContractorBidSubmissionFlow**
    - target: bid creation route
    - purpose: enable fast bid submission with saved templates and message kickoff

13. **ContractorPipelineWorkspace**
    - target: contractor dashboard route
    - purpose: track sent bids, active conversations, awarded jobs, and archived/lost jobs

### Phase 4 — trust and messaging
14. **TrustSignalsSurface**
    - target: reusable cards/badges/panels
    - purpose: expose verification tier, response rate, service area, and proof signals clearly

15. **InPlatformMessagingLayer**
    - target: customer/contractor conversation panels
    - purpose: make negotiation and clarification feel native to the product

16. **JobLifecycleTracking**
    - target: shared status model and dashboards
    - purpose: track posted → bidding → reviewing → awarded → in progress → completed

### Phase 5 — launch readiness
17. **LiquidityOpsSupportSurfaces**
    - target: lightweight internal/admin-friendly states in demo data/copy
    - purpose: support early manual job fulfillment and contractor seeding logic

18. **TexasDifferentiationPass**
    - target: copy, categories, urgency types, service-region framing
    - purpose: make the product feel distinctly built for Texas

19. **MultiStateExpansionReadiness**
    - target: config-oriented content structure
    - purpose: keep the platform portable to future states without redesigning the core

## Initial execution order

Immediate build order:
1. ConsumerInformationArchitecture
2. ConsumerDataModelBlueprint
3. ConsumerAppShellRefactor
4. ConsumerHomeShowcase
5. ConsumerRoleGateway
6. CustomerJobPostFlow

## Concerns to keep in view
- fake contractors and low-trust profiles can poison the platform early
- statewide launch is fine only if manual supply support exists behind the scenes
- monetization should not arrive before visible user value exists
- messaging and bid comparison must be first-class, not afterthoughts
- the data model must support multi-state rollout later without rewriting the product

## Verification model recommendation

Use layered trust tiers:
- Unverified
- Contact Verified
- Business Verified
- Pro Verified
- Top Performer

Suggested early verification inputs:
- phone verification
- email verification
- business name
- trade category
- city/service area
- optional EIN
- optional license
- optional insurance proof

## Monetization sequence
- Phase 1: free for everyone
- Phase 2: premium contractor tools
- Phase 3: usage or subscription once value is proven

## Next artifact
- **ConsumerInformationArchitecture**
- likely targets: `src/data/viewData.ts`, `src/data/navigationLabels.ts`, `src/App.tsx`, route/page structure
- goal: convert the app from government procurement demo framing into consumer marketplace architecture
