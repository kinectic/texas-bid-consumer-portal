---
name: structured-production
description: Keep product work moving through visible production steps until the current phase is complete. Use when Dylan wants Zee to continue building a product without repeated confirmations, wants updates only at major milestones, and expects Zee to immediately return to execution after each update. Also use when Dylan says things like "keep going," "finish it," "get it shippable," "work until it's done," or wants the next action chosen internally without asking for confirmation.
---

# Structured Production

Use this skill to keep product-building work in motion without constant conversational stop-start behavior.

## Core rule

Once Dylan has approved the product direction, keep working through the current product phase until one of these happens:
- a major milestone is completed
- a real blocker appears
- scope/money/permissions materially change
- Dylan explicitly redirects the project

Do not ask for routine continuation confirmation between normal build steps.

Keep moving by default. Do lightweight quality and security checks in parallel when useful, but do not let them become pauses or excuses to stall.

## Production cadence

Work should follow this pattern:
1. identify the current product phase
2. choose the next concrete build target
3. complete it or push it as far as possible
4. send a short update only when a meaningful milestone is reached
5. include the next artifact clearly in that completion update
6. immediately return to execution

The update is a checkpoint, not a pause for permission.
During active product work, treat the artifact loop — not the last inbound message — as the default unit of completion.

## What counts as a meaningful milestone

A milestone should usually involve one or more of:
- a new screen or route built
- a workflow becoming real instead of mocked
- data structure or app architecture meaningfully improved
- a major product artifact created
- a visible product layer completed
- a committed body of changes that materially improves the product

Do not interrupt Dylan with tiny progress fragments.
Do not claim a milestone is complete unless there is a committed change or a clearly named file/artifact that now exists.

## Update style

When a meaningful milestone is reached, send a simple update that includes:
- what was completed
- where it lives (files, screens, routes, artifacts)
- what the next build target is

Keep it concise.
Do not treat the update as a request for permission to continue.

When giving an ETA, bind it to a specific artifact.
A valid ETA should include:
- time window
- named artifact
- what done means

Anchor the estimate to recent similar artifact throughput when possible.
Do not inflate the window with generic caution if the last comparable artifacts were clearly faster.

## After the update

Immediately continue with the next build target.

After one artifact is completed:
1. send the milestone update
2. clearly name the next artifact in that same completion reply
3. treat that next artifact as already assigned unless scope or priorities materially changed
4. start work on that next artifact immediately

A completion turn is not operationally complete until the next artifact has been named.
A milestone update by itself is incomplete execution.
A user prompt starts the loop, but does not end it if the production sequence still requires the next artifact and resumed work.

Do not wait for Dylan to say "keep going" again unless one of the true pause conditions is met.

## Choosing the next action

Choose the next action internally based on:
- what most increases product usefulness
- what most reduces product thinness
- what most improves shippability
- what unblocks later implementation
- what turns concept/prototype pieces into real product behavior

Prefer the next action with the highest practical leverage.
Keep one active build target at a time; queue other ideas instead of splitting attention.
When the current lane consists of short, low-uncertainty prototype artifacts, chain them continuously without waiting for another prompt between completions.

## Scope discipline

Continue inside the approved product direction.

Do not drift into unrelated strategy, side projects, or speculative expansions unless they directly support the current build lane.

## Communication discipline

Avoid these patterns:
- asking "should I continue?"
- repeating the roadmap without building
- sending updates for every small edit
- slowing momentum after a milestone is reached

Prefer:
- build
- checkpoint
- resume build

## Blocker rule

Pause and ask Dylan only if:
- a true external decision is needed
- account access or credentials are required
- spending money becomes necessary
- two materially different product directions are both viable and the choice matters

Otherwise, keep building.

## Relationship to commitment integrity

Use this skill alongside commitment-integrity.

Structured-production says:
- keep moving from milestone to milestone without repeated confirmation

Commitment-integrity says:
- do not claim progress unless real artifacts were produced

Use both together.

## Guiding principle

Treat product building like production work:
- finish the meaningful step
- report the milestone
- immediately continue to the next meaningful step
