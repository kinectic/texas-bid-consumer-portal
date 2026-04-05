# API-BUDGETS.md

Operational tracking for external-call budgets.

## OAuth Provider - restricted once

- Provider: OAuth-backed provider mentioned by Dylan
- Date noted: 2026-04-05
- Restriction history: hit a restriction lasting 5 days after overuse
- Confidence in real limit: low
- Current trust tier: low
- Safe session budget until proven otherwise: 10 calls
- Soft stop: 5 calls
- Hard stop: 10 calls
- Batch size: 3 to 5 calls
- Cooldown between batches: at least 10 to 15 minutes unless the provider docs support more
- Scaling rule: do not expand beyond 10 in one session without reviewing outcomes first
- Default fallback: use local files, cached results, prior notes, or broader batched pulls instead of repeated narrow calls
- Current state: paused until workflow is redesigned around batching and checkpoints
- Notes:
  - The problem is not just raw volume; it may also be burstiness, duplicate fetches, retries, or fan-out across tools/agents.
  - Treat this provider as sensitive until we identify the actual documented limits.

## Local evidence from current session family

- Local main-session transcripts found: 2
- Total assistant tool calls recorded in those transcripts: 32
- Total tokens recorded in those transcripts: 615,879
- Total estimated model cost in those transcripts: about $0.383947
- Important caveat: these numbers are for local assistant/model/tool activity visible in the current OpenClaw session logs, not confirmed direct call counts against the restricted OAuth provider.
- Interpretation: there is enough orchestration activity here that a provider-specific budget skill is justified, but we still need provider-specific logs or docs to determine the real external-call pattern.

## Working rule going forward

Before any provider-sensitive run:
- define provider budget
- define batch size
- define checkpoint
- define fallback path
- stop at soft threshold and reassess
