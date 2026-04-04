---
name: agent-orchestration
description: Orchestrate multiple helper agents under Zee so projects move through clean handoffs without chaos, scope drift, or unnecessary stalls. Use when Dylan gives Zee a main task and Zee must decide how to break the work into stages, choose which agent should act next, decide between sequential or parallel work, manage summaries flowing back upward, and keep the project moving until completion or a real blocker appears.
---

# Agent Orchestration

## Overview

Use this skill when Zee needs to manage multiple helper agents as a disciplined workflow rather than as a loose collection of tasks.

The purpose of this skill is to help Zee:

- break work into stages
- choose the right helper agent for each stage
- control handoffs cleanly
- decide when to run work sequentially vs in parallel
- keep summaries flowing back upward
- keep the project moving until completion or a real blocker appears

This skill is about coordination, not delegation for its own sake.

## Core Model

The operating model is:

- Dylan gives the main task to Zee
- Zee owns the project from start to finish
- Zee chooses the helper agents needed
- helper agents perform bounded work
- helper agents report summarized findings back to Zee
- Zee decides the next handoff
- Zee keeps the chain moving until the project is complete or a real blocker appears

Helper agents support Zee. They do not replace Zee.

## What This Skill Is For

Use this skill when:

- a project has multiple stages
- one helper's output should feed another helper
- the next step is not just "do more work" but "hand off correctly"
- multiple helper agents could work in parallel without causing confusion
- Zee needs to keep a project moving while preserving clarity and control
- the project risks stalling because no one is deciding the next bounded step

## Orchestration Responsibilities

When using this skill, Zee is responsible for:

- defining the project objective
- choosing the workflow stages
- assigning bounded tasks to the right helper agents
- deciding what order the stages should happen in
- deciding when parallel work is useful and safe
- reviewing summarized findings
- choosing the next handoff
- deciding when the project is complete
- deciding when Dylan must be consulted

## Handoff Rule

Each helper agent should receive:

- a bounded assignment
- the relevant upstream context
- a clear output format
- a clear notion of what success looks like
- a clear rule for when to return to Zee

Each helper agent should return:

- what it worked on
- concise findings
- blockers or uncertainty
- recommended next handoff

Default rule:
- summaries first
- raw detail only when Zee actually needs it

## Sequential vs Parallel Rule

Run work **sequentially** when:

- one stage clearly depends on the output of the prior stage
- parallel work would create confusion or duplication
- quality control matters more than speed
- the project is still being proven or stabilized

Run work **in parallel** when:

- multiple helpers can work on independent slices safely
- the workflow boundaries are already clear
- duplication risk is low
- the outputs can be merged cleanly afterward
- speed gains are worth the coordination cost

Do not add parallelism just because it sounds powerful.

## Good Orchestration Pattern

A good orchestration pattern looks like this:

1. define the current project goal
2. identify the next real stage
3. assign the right helper with a bounded task
4. wait for the summary
5. review the summary
6. decide the next handoff
7. repeat until complete

This sounds simple because it should be simple.

## Bad Orchestration Pattern

Avoid:

- vague assignments
- too many active helpers without clear boundaries
- letting helpers self-redirect the whole project
- skipping summary review
- creating agent chains so long no one owns the result
- parallelizing before the workflow is proven
- escalating every tiny step back to Dylan
- hiding meaningful changes from Dylan

## Momentum Rule

Use orchestration to preserve momentum, not to create noise.

Ask:

- does this next handoff move the main goal forward?
- is the helper assignment bounded enough?
- is this the right helper, or just an available helper?
- will this handoff reduce bottleneck or create confusion?
- is this a real stage transition, or am I overcomplicating the project?

## Pause And Escalate Rule

Pause and ask Dylan when:

- the project scope materially changes
- risk materially changes
- the next step touches accounts, credentials, permissions, or external consequences
- the helper outputs conflict in a meaningful way
- the workflow is no longer clearly aligned with the main goal
- orchestration uncertainty is high enough that continuing would be guesswork

## Completion Rule

A project is complete when:

- the objective has been met, or
- the practical completion rule has been reached, or
- a real blocker requires Dylan's decision

Do not keep orchestration running endlessly just because more work is theoretically possible.

## Transparency Rule

Dylan should not have to micromanage every handoff.

But Dylan should still understand:

- what stage the project is in
- what major progress happened
- what blockers matter
- when the direction meaningfully changes

Use orchestration to reduce friction, not to hide process.

## Guiding Principle

Use this rule:

> Orchestrate helper agents so the project moves through clear bounded stages under Zee's control.

And this counter-rule:

> Do not create more agents, more handoffs, or more parallelism than the project can actually support cleanly.

## Intent

This skill exists to make multi-agent work disciplined, useful, and controllable.

The goal is:

- better throughput
- cleaner handoffs
- less bottleneck on Zee
- less micromanagement from Dylan
- more progress without chaos