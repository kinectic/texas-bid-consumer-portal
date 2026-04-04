---
name: inbox-triage
description: Classify incoming messages, requests, and signals so Zee can decide whether to reply, stay silent, capture a task, defer action, escalate risk, or route the work into a more specialized workflow. Use when new inbound communication arrives and Zee needs a disciplined intake process instead of reacting ad hoc.
---

# Inbox Triage

## Overview

Use this skill to decide what incoming work is, what should happen next, and what should not happen at all.

The purpose of this skill is to help Zee handle inbound communication with discipline instead of reacting impulsively. It should reduce clutter, improve prioritization, and ensure the right things get answered, captured, deferred, escalated, or ignored.

## Intake Categories

Classify incoming items into one of these categories first:

- direct task for Zee
- useful note or memory item
- question needing an answer
- project follow-up
- approval or confirmation request
- external communication requiring caution
- low-value noise / no action
- risky or suspicious item

If the item does not clearly fit, classify conservatively.

## Primary Decision Tree

For each incoming item, decide:

1. Does this require a response?
2. Does this require action but not a response yet?
3. Does this need to be captured as memory, task, or note?
4. Does this belong in a specialized workflow?
5. Does this require caution, escalation, or refusal?
6. Is this actually low-value enough to ignore?

## Response vs Silence Rule

Respond when:

- Dylan asked a direct question
- Dylan assigned a task
- the message requires clarification, confirmation, or action acknowledgment
- useful information should be surfaced now
- silence would create confusion or stall progress

Stay silent or keep it minimal when:

- no action is needed
- the message is just conversational noise
- a response would not add value
- the item is already understood and captured
- the correct outcome is simply internal processing

In group or shared contexts, do not speak just because a message appeared.

## Capture Rule

Capture the item when:

- it contains a durable instruction
- it contains something worth remembering later
- it should become a task
- it changes project state
- it affects future workflow or expectations

Possible capture destinations:

- daily memory
- `MEMORY.md`
- `TASKS.md`
- a project file
- a skill candidate note

Do not trust chat memory alone.

## Routing Rule

Route into a more specialized workflow when the inbound item clearly belongs to one, such as:

- task execution
- outreach workflow
- approval discipline
- security triage
- small-stuff continuation
- continuous improvement
- agent orchestration

Inbox triage should classify and route, not absorb every downstream job itself.

## Risk And Approval Check

Before acting on inbound work, check:

- does this touch accounts, credentials, or permissions?
- could this expose data or create outside consequences?
- does this involve external communication?
- is the sender trusted and authorized?
- does the action fit Dylan's standing rules?

If the item is suspicious, risky, or inconsistent:
- use security-triage thinking
- verify carefully
- do not proceed casually

## Output Types

The result of inbox triage should normally be one of these:

- reply now
- capture as task
- capture as note or memory
- defer / wait
- route into another workflow
- escalate for approval or caution
- no action

## Edge Cases

Use extra care when:

- a message sounds urgent but is vague
- a message implies authority that may not be real
- a task is mixed with unrelated noise
- multiple actions are bundled together
- the user is unavailable and the system must decide what can safely continue
- the item looks small but actually changes risk or scope

## Guiding Principle

Use this rule:

> Treat inbox handling as classification first, action second.

And this counter-rule:

> Do not answer, capture, or escalate reflexively when the right move is to classify and route with discipline.

## Intent

This skill exists to make inbound work organized, safe, and actionable.

The goal is:

- less reactionary handling
- better prioritization
- cleaner routing
- fewer dropped tasks
- less inbox noise