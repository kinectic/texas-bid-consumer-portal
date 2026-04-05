---
name: codex-weekly-budget
description: Manage Codex OAuth usage as a finite weekly operating budget with safety bands, pacing rules, monitoring checkpoints, conservation modes, and anti-waste discipline. Use when Dylan wants to keep Codex as the main model path while avoiding provider usage-limit lockouts, especially after a prior restriction, or when deciding how aggressively to work under the remaining weekly bucket.
---

# Codex Weekly Budget

Use this skill when Codex is the preferred model path but the weekly OAuth usage bucket must last.

## Goal

Keep Codex useful across the whole week without triggering another provider usage-limit lockout.

Optimize for sustained usefulness, not short-term sprinting.

## Core Model

Treat Codex usage like a weekly operating budget.

Manage it with three layers:
1. weekly reserve
2. daily pacing
3. session discipline

## Monitoring Source

Use `openclaw status --usage` as the checkpoint source for Codex usage posture.

Do not check obsessively.
Use it when starting meaningful work, after heavy work, or when Dylan asks about usage posture.

## Safety Bands

### Green
70% to 100% weekly remaining.

Operate normally, but stay disciplined.

### Yellow
40% to 69% weekly remaining.

Start conserving.
Reduce waste and batch more aggressively.

### Orange
20% to 39% weekly remaining.

Reserve usage for higher-value work.
Prefer one strong pass over iterative churn.

### Red
Below 20% weekly remaining.

Emergency conservation.
Use Codex only for essential tasks until the bucket resets.

## Default Behavior By Band

### Green rules
- proceed with normal task execution
- keep work focused
- avoid obvious waste

### Yellow rules
- prefer shorter, denser answers when detail is not required
- batch related work into one stronger pass
- avoid speculative side quests
- cut repeated check-ins and status churn

### Orange rules
- do high-value work only
- avoid long exploratory research unless Dylan explicitly wants it
- avoid iterative polishing unless the output matters enough
- avoid optional tooling detours

### Red rules
- reserve Codex for critical work only
- avoid optional reminders, monitoring chatter, and exploratory loops
- keep responses direct and execution-oriented

## Daily Pacing Rule

Do not burn an outsized share of the weekly budget casually in one day.

If one day is heavy, compensate with leaner operation afterward.

No exact math is required.
Awareness is required.

## Session Discipline

For each session:
- complete more in fewer turns
- prefer one complete answer over multiple partials
- ask fewer but better clarifying questions
- avoid re-reading the same material unnecessarily
- avoid commentary that does not help the user
- avoid reopening work that could have been finished cleanly

## Turn Quality Rule

A Codex turn should usually do at least one of these:
- make a decision
- produce a deliverable
- materially reduce uncertainty
- complete a bounded batch of work

If a turn does none of those, question whether it is worth the spend.

## Tool Discipline

Tool work can quietly multiply usage.

So:
- prefer fewer broader reads over many tiny reads when practical
- avoid duplicate searches
- avoid repeated status checks
- avoid polling loops
- avoid multi-agent fan-out unless the value clearly justifies the cost

## Reminder Discipline

Recurring reminders can consume budget without producing meaningful progress.

Default rule:
- keep only reminders that consistently create value
- remove, lengthen, or consolidate reminders that often report nothing new
- prefer fewer useful checkpoints over many low-value wakeups

## Anti-Waste Patterns

Avoid these:
- repeated status checks with no decision attached
- duplicate file or memory passes
- long exploratory loops without a stop rule
- multi-step churn where one strong pass would do
- recurring wakes that mostly confirm no change
- unnecessary refinement cycles

## Communication Rule

When the budget is under pressure:
- be direct
- be useful
- avoid decorative verbosity
- favor completion over conversational padding

## Decision Rule

When choosing between speed and budget efficiency, prefer the option that:
- finishes the real task
- uses fewer turns
- reduces the chance of reopening the same work later

## Default Recommendation

If Dylan prefers Codex over local alternatives:
- keep Codex as the main path
- monitor usage at sensible checkpoints
- conserve more aggressively as the weekly bucket drops
- treat weekly usage as an operating constraint, not a surprise

## Output Format

When reporting budget posture, summarize briefly:
- weekly band
- current remaining usage if known
- current operating posture
- any immediate conservation changes recommended

## Guiding Principle

Use this rule:

> Spend Codex where it creates real progress, and remove every avoidable form of churn.
