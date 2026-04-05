---
name: api-call-budget
description: Control outbound API usage with explicit call budgets, cooldowns, batching rules, escalation thresholds, and stop conditions. Use when a task touches rate-limited APIs, OAuth-backed providers, web searches/fetches that could multiply quickly, repeated polling, agent fan-out, cron reminders, or any workflow where too many external calls could trigger provider restrictions, bans, or cooldowns.
---

# API Call Budget

Use this skill whenever a workflow could burn through API quota or trigger provider abuse/rate limits.

## Goal

Finish useful work while staying under a deliberate call budget.

Do not optimize only for speed.
Optimize for:
- useful output per call
- fewer larger requests
- fewer retries
- less duplicate fetching
- clear stop rules before restriction happens

## Core Rule

Before making external calls, define all five:
1. provider
2. daily or session budget guess
3. soft stop threshold
4. hard stop threshold
5. fallback plan

If the real provider limits are unknown, assume the limit is lower than expected and operate conservatively.

## Default Operating Mode

Use this default unless the user gives a better number:
- start with a small probe batch
- measure output quality per call
- only scale if yield is good
- stop when marginal value drops

Default conservative pattern:
- probe: 3 to 5 calls
- first expansion: up to 10 total calls
- review before going beyond 10
- never let loops expand silently

## Mandatory Pre-Flight Check

Before starting a call-heavy workflow:
- state what service is being hit
- identify what counts as one call
- estimate worst-case call count
- reduce duplicate paths
- choose batching over one-item loops when possible
- choose cached/local memory before fresh calls
- define a checkpoint interval

If the workflow does not justify the estimated call count, redesign it first.

## Call-Saving Rules

Prefer these in order:
1. local files and workspace state
2. existing memory and prior notes
3. one broad fetch instead of many narrow fetches
4. one batch job instead of per-item calls
5. deliberate sampling instead of exhaustive coverage
6. human approval before large expansion

## Loop Discipline

Never run open-ended external loops.

For any loop that may trigger outside calls:
- set a maximum item count first
- set a maximum call count first
- set a stop reason first
- record progress after each batch
- reassess after each batch

Good pattern:
- process 5 items
- review hit rate
- continue only if results justify more

Bad pattern:
- keep calling until nothing else is left

## Polling Rule

Avoid frequent polling.

Use:
- longer waits
- event-driven updates when available
- bounded retry counts
- explicit cooldowns between attempts

Do not create tight refresh loops.

## Fan-Out Rule

Do not let multiple agents or tools hit the same provider independently without a shared budget.

If multiple helpers are involved:
- assign one shared provider budget
- assign per-agent sub-budgets
- serialize bursts unless parallelism is clearly worth it
- stop all helpers if the shared soft stop is hit

## Soft Stop And Hard Stop

Use both.

### Soft stop
Pause and reassess when:
- roughly 50% to 70% of the safe budget is gone
- yield per call is falling
- retries start appearing
- the provider starts slowing or rejecting requests

At soft stop:
- summarize what was achieved
- switch to lower-call methods
- ask whether to continue if more calls are needed

### Hard stop
Stop immediately when:
- the planned budget is exhausted
- errors suggest throttling, abuse detection, or restriction
- the workflow would require speculative retries
- the remaining work is low-value relative to call cost

## Restriction Response

If a provider already restricted access:
- stop all non-essential calls to that provider
- avoid testing the boundary repeatedly
- document the likely trigger pattern
- wait out the cooldown when required
- redesign the workflow before resuming

Do not keep poking a restricted provider to see if it is back.

## Budget Log

When the workflow matters, maintain or update a simple budget note with:
- provider name
- date or session
- task name
- estimated safe budget
- calls already used
- current state: active, paused, cooldown, blocked
- notes on what patterns were expensive
- notes on what patterns were efficient

Keep it short and operational.

## Recommended Budget Heuristics

If exact provider limits are unknown, use a temporary safety budget such as:
- low trust / fresh OAuth app: 10 to 25 calls per session until behavior is understood
- medium confidence: 25 to 100 calls with checkpoints every 10 to 20
- mature stable workflow: still use checkpoints; do not assume infinite headroom

If a provider already issued a penalty, reset to the low-trust tier after cooldown.

## When To Ask Dylan

Ask before continuing when:
- the workflow needs a larger call budget than planned
- the return per call is poor
- the provider is already sensitive or recently restricted
- multiple possible strategies exist with different call costs

Do not ask for every tiny step.
Ask when the budget posture or risk materially changes.

## Output Format For Call-Heavy Plans

When proposing or running a call-heavy workflow, summarize briefly:
- provider
- intended outcome
- planned budget
- checkpoint size
- stop condition
- fallback path

## Guiding Principle

Use this rule:

> Every outbound call should either produce clear value or buy information that changes the plan.

If not, do not spend the call.
