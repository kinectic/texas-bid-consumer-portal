# OPTIMIZATION-PLAN.md

Working plan for improving Zee's setup, reliability, and operating speed.

## Objectives

- Reduce friction in day-to-day use from WhatsApp
- Make task state clearer and easier to maintain
- Preserve project continuity with less drift
- Make future outreach and research work more repeatable
- Improve visibility into blocked vs active vs completed work

## Priority Order

### 1. Approval Flow Optimization
Goal: reduce wasted time when commands need approval.

Actions:
- Prefer lighter built-in tools when they are enough for the job.
- Use shell/exec only when it materially expands what Zee can do.
- When approval is needed, always send the exact `/approve ...` line immediately.
- Prefer `allow-always` for repeated safe patterns Dylan is comfortable with.
- Treat the Control UI/dashboard as the preferred approval path when WhatsApp approvals are flaky.

### 2. Task Tracking Optimization
Goal: make active work obvious and stop stale tasks from lingering.

Actions:
- Keep `TASKS.md` trimmed to real current work.
- Separate active system-building work from project work.
- Mark bounded project outcomes clearly when a batch is considered complete.
- Use practical completion criteria instead of endless open loops.

### 3. Outreach Operations Optimization
Goal: make future outreach batches faster and more structured.

Actions:
- Maintain a clear split between lead discovery, qualification, contact discovery, and send-ready preparation.
- Close each batch with a contact classification summary.
- Build send-ready lists only from direct-email contacts unless Dylan says otherwise.
- Keep fallback-only contacts in a separate hold section.

### 4. Memory Optimization
Goal: preserve what matters without clutter.

Actions:
- Save project milestone summaries after meaningful work blocks.
- Distill temporary work into long-term memory only when it changes standing process or rules.
- Keep daily memory as the operational log; keep `MEMORY.md` as stable guidance.

### 5. Dashboard / Setup Optimization
Goal: improve visibility into what Zee is doing and where work is blocked.

Actions:
- Keep a lightweight operations/status file inside the workspace.
- Show current mission, blockers, next actions, and recent wins.
- Keep setup notes and environment-specific details in the workspace instead of in conversation only.

## Immediate Changes To Make

- Clean up `TASKS.md`
- Add a persistent operations status file
- Save batch 1 completion into daily memory
- Preserve the practical batch-closing rule for outreach work

## Next Candidate Improvements

- Create a dedicated send-ready outreach list file
- Create a reusable contact-classification template
- Add a simple ops dashboard/status note for Dylan-facing visibility
