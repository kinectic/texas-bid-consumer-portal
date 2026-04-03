# TEAM-RUNTIME-LIMITATIONS.md

Known runtime limitations and practical workarounds for Zee's helper-agent system.

## Current Observed Limitation

The helper-agent team design is valid, but the current environment is not reliably supporting the specific persistent helper-session path that was attempted.

Observed behavior:
- persistent subagent session creation did not bind cleanly in the attempted mode
- repeated approval-backed exec diagnostics did not behave like approvals were persisting cleanly from this route
- this makes durable always-on helper-session orchestration unreliable from the current path

## What This Means

This appears to be a tooling/runtime/session-behavior issue, not a problem with:
- Dylan's project design
- Zee's management model
- the computer's raw specs
- the helper-agent concept itself

## Practical Interpretation

Right now, the environment supports the team definition and workflow model better than it supports always-on persistent helper sessions.

So the correct move is:
- keep the team persistent as a system of roles, rules, memory, and workflow
- launch live helper agents on demand when a project phase needs them
- keep Zee as the stable manager and continuity layer

## Recommended Working Model

### Persistent
These remain durable:
- Zee as manager
- team structure
- role definitions
- security rules
- handoff rules
- memory and project continuity

### On-Demand
These are launched when needed:
- Sweep Agent live work
- Qualification Agent live work
- Contact Discovery Agent live work
- Batch Assembly Agent live work

## Why This Is Acceptable

This still matches Dylan's intended model closely:
- Dylan gives the task to Zee
- Zee manages the team
- helper agents work for Zee, not Dylan directly
- helper agents report summaries back to Zee
- Zee keeps the chain moving until the project is complete

The only difference is that helper agents are activated when needed rather than remaining always alive in the background.

## Conditions That May Improve This Later

Persistent helper agents may become more practical if:
- a better runtime/session path is available
- approval behavior is more stable from the Control UI/dashboard path
- OpenClaw session-binding behavior improves for this target

## Current Recommendation

For now, the official working model should be:
- persistent team design
- on-demand helper-agent execution
- Zee-managed memory and continuity

This is the most stable path that fits the current environment.
