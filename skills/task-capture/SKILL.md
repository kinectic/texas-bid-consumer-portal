---
name: task-capture
description: Capture and normalize lightweight instructions into durable workspace notes. Use when messages contain shorthand like `task:`, `note:`, `idea:`, or `remember:`; when the user wants something written down quickly; or when conversational requests should be turned into a structured file entry without losing intent.
---

# Task Capture

Capture the user's intent with minimal friction. Prefer writing the information down over trusting short-term memory.

## Quick routing

- `task:` → create or append an actionable item with enough context to execute later.
- `note:` → save factual context, observations, or loose information.
- `idea:` → save speculative or creative thoughts without forcing them into a task.
- `remember:` → save something the assistant should preserve in daily memory or long-term memory, depending on importance.

## Workflow

1. Identify the shorthand trigger or infer the closest category if the user is clearly trying to capture something.
2. Preserve the original wording when it matters; lightly normalize only for clarity.
3. Write to the smallest sensible durable location:
   - daily notes for same-day context
   - `MEMORY.md` for stable long-term rules, preferences, or identity facts
   - a dedicated project/note file if the user names one
4. Confirm what was saved and where.

## Guardrails

- Do not silently upgrade trivial notes into long-term memory.
- Do not rewrite the user's meaning into something stronger than they said.
- If a captured item would expose secrets or create risk, pause and ask before saving it in a broad/shared location.
- If the user says to remember a new operating rule, save it explicitly instead of assuming it will persist.

## Output style

When replying after capture, keep it short:
- what was saved
- where it was saved
- any ambiguity that still matters
