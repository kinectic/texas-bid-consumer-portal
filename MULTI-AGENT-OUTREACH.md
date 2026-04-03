# MULTI-AGENT-OUTREACH.md

Official outreach multi-agent structure for Zee.

## Purpose

Use a small coordinated agent system to make outreach research and batch preparation faster, cleaner, and easier to manage.

Zee remains the top-level manager.
All outreach agents report to Zee.
Dylan does not need to manage the helper agents directly.

## Command Structure

- **Dylan**
  - assigns missions to Zee
- **Zee**
  - sets direction
  - breaks work into parts
  - delegates to outreach agents
  - reviews outputs
  - stores memory
  - decides when a batch is complete
- **Outreach helper agents**
  - perform focused parts of the workflow
  - report upward to Zee

## Outreach Agent Roster

### 1. Sweep Agent
Role:
- Gather target companies by geography
- Keep the Texas sweep orderly from west to east
- Prevent duplicate coverage and city drift

Responsibilities:
- identify city/region slice
- collect candidate businesses with websites
- hand off candidates to qualification
- note what cities are already covered

Output:
- candidate company list by city/region

### 2. Qualification Agent
Role:
- Judge whether a business is worth pitching
- Identify visible website weaknesses and pitch angles

Responsibilities:
- inspect websites
- mark likely fit vs low priority
- note visible issues
- propose a help angle
- send qualified leads forward for contact discovery

Output:
- qualified lead list with notes

### 3. Contact Discovery Agent
Role:
- Find and classify outreach contact paths

Responsibilities:
- look for direct emails first
- if no direct email, find contact form, phone, named contact, or other usable fallback
- record source/provenance when practical
- classify contact quality clearly

Contact classifications:
- direct email found
- contact form only
- phone only
- named contact but no email
- no usable contact surfaced

Output:
- contact-complete lead sheet entries

### 4. Batch Assembly Agent
Role:
- Turn raw research into a clean usable outreach batch

Responsibilities:
- separate direct-email send list from fallback-only holds
- ensure batch is complete under the practical batch rule
- prepare a summary Zee can review quickly
- keep the batch structured and ready for next action

Output:
- send-ready batch package
- fallback hold list
- completion summary

## Zee's Responsibilities

Zee remains responsible for:
- mission selection
- batch size
- geographic direction
- quality control
- memory updates
- deciding when enough coverage is enough
- escalating replies and decisions to Dylan

Zee should not offload final judgment to helper agents.
Helper agents support Zee; they do not replace Zee.

## Standard Outreach Workflow

### Phase 1: Sweep
Sweep Agent gathers companies for the current geography slice.

### Phase 2: Qualify
Qualification Agent filters the sweep into likely outreach candidates.

### Phase 3: Contact Discovery
Contact Discovery Agent finds direct emails and fallback contact paths.

### Phase 4: Assemble
Batch Assembly Agent packages the finished batch.

### Phase 5: Review
Zee reviews the batch, updates memory/tasks, and decides next action.

## Batch Completion Rule

A batch is considered complete when each company has been classified into one of these states:
- direct email found
- contact form only
- phone only
- named contact but no email
- no usable contact surfaced

Do not spend unlimited time chasing hidden emails once the batch has practical coverage.
Use the practical completion rule unless Dylan explicitly says otherwise.

## Delegation Rules

- Zee should delegate focused, bounded work.
- Do not create extra helper agents unless the current roster is overloaded.
- Do not allow helper agents to talk directly to Dylan unless Zee explicitly routes it.
- Keep outputs concise and structured so Zee can merge them quickly.

## Initial Launch Order

Start with these in order:
1. Contact Discovery Agent
2. Qualification Agent
3. Sweep Agent
4. Batch Assembly Agent

Reason:
- contact discovery is the current pain point
- qualification is the next most valuable filter
- geographic sweep helps scale future batches
- batch assembly becomes most useful once the earlier steps are active

## Current Use Case

Primary initial use case:
- sweeping Texas HVAC companies in organized batches
- gathering contact data faster
- reducing manual bottlenecks while Zee stays in command

## Expansion Rule

If the outreach system proves useful, later helper agents can be added under this same structure, such as:
- website reviewer
- lead deduper
- outreach draft helper
- follow-up tracker

Only expand after the first outreach squad works reliably.
