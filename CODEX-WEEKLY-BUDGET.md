# CODEX-WEEKLY-BUDGET.md

Operating policy for using Codex OAuth without blowing the weekly usage bucket.

## Goal

Keep Codex available for real work across the full week.

The objective is not maximum speed in one sitting.
The objective is sustained usefulness without tripping the provider usage limit again.

## What We Know

- Codex is the preferred path over Ollama for now.
- A prior overuse event caused a restriction period of about 5 days.
- OpenClaw status exposes provider usage snapshots for the Codex OAuth account.
- We should treat the weekly bucket as the main scarce resource.

## Weekly Control Model

Use a three-layer control model:
1. weekly reserve
2. daily pacing
3. session discipline

## Weekly Reserve

Treat the weekly limit like a tank that must last 7 days.

### Safety bands
- Green: 70% to 100% weekly remaining
- Yellow: 40% to 69% weekly remaining
- Orange: 20% to 39% weekly remaining
- Red: below 20% weekly remaining

## Rules by band

### Green
Normal operation, but still disciplined.

Allowed:
- normal task execution
- focused research
- bounded multi-step work

Avoid:
- unnecessary re-check loops
- idle chatter that burns turns
- repeated status polling

### Yellow
Start conserving.

Changes:
- prefer shorter answers unless detail matters
- avoid speculative side quests
- batch related work into one stronger pass
- reduce repeated follow-up checks
- avoid reminder churn unless the reminder is truly valuable

### Orange
Work only on high-value tasks.

Changes:
- do one good pass instead of multiple exploratory passes
- avoid long iterative refinement unless Dylan asks for it
- avoid low-value brainstorming sprees
- avoid unnecessary tool detours
- pause before any task likely to create a long chain of turns

### Red
Emergency conservation.

Changes:
- reserve Codex for only the most important tasks
- prefer brief execution-oriented responses
- do not run optional monitoring or reminder chatter
- avoid complex exploratory work unless Dylan explicitly prioritizes it

## Daily Pacing Rule

Assume the weekly bucket should roughly cover 7 days.

Practical pacing target:
- do not mentally spend more than about one day’s fair share in one day unless there is a clear reason
- if a heavy day happens, compensate by running leaner the next day

This does not require perfect math.
It requires awareness.

## Session Discipline

For each session:
- try to complete more in fewer turns
- prefer one well-structured answer over multiple partials
- ask fewer but better clarifying questions
- avoid repeating context back unless useful
- avoid unnecessary commentary during tool work
- avoid loops that keep re-reading similar data

## Turn Quality Rule

Each Codex turn should try to do one of these:
- make a decision
- produce a deliverable
- materially reduce uncertainty
- complete a bounded batch of work

If a turn is not doing one of those, it is suspect.

## Tool Discipline

Tool-heavy work can multiply spend.

So:
- use fewer broader reads instead of many tiny reads when practical
- avoid duplicate searches for the same thing
- avoid polling loops
- avoid repeated status checks unless a decision depends on them
- avoid fan-out across many helpers unless the expected value is strong

## Reminder And Cron Rule

Recurring reminders can quietly burn the budget by waking sessions that do little.

Default rule:
- only keep recurring reminders that produce consistent value
- remove or lengthen reminders that mostly confirm "nothing changed"
- prefer one useful checkpoint over many low-value pings

## Communication Style Rule

When weekly budget is under pressure:
- be direct
- be useful
- avoid decorative verbosity
- favor completion over conversational padding

## Monitoring Rule

Check `openclaw status --usage` when:
- starting a significant new work block
- after a visibly heavy session
- if the assistant feels unusually busy or multi-step
- when Dylan asks about usage posture

Do not obsessively check it.
Use it as a checkpoint, not a ritual.

## Working Threshold Policy

Use this immediate operating posture:
- if weekly remaining is above 70%: normal disciplined work
- if weekly remaining falls below 70%: start yellow conservation
- if weekly remaining falls below 40%: switch to orange
- if weekly remaining falls below 20%: switch to red

## Default Recommendation

For now:
- keep Codex as the main path
- monitor weekly usage at sensible checkpoints
- avoid unnecessary recurring session wakeups
- avoid wasteful loops
- batch work into fewer stronger turns
- treat the weekly budget as an operating constraint, not an afterthought

## Decision Rule

When choosing between speed and budget efficiency, prefer the option that:
- finishes the real task
- uses fewer turns
- avoids reopening the same work repeatedly

That is the sustainable path.
