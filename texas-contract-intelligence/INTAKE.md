# Intake Workflow

## Purpose
Add new records to the MVP consistently without hand-edit chaos.

## Files
- `data/opportunities.json` — structured awarded / historical / meaningful records
- `data/open-opportunities.json` — confirmed live feeds or currently open records
- `data/entities.json` — buyers
- `data/sources.json` — procurement surfaces
- `data/evidence.json` — supporting proof
- `data/intake-template.json` — starter opportunity shape

## Rules
- Prefer accuracy over volume.
- If uncertain, downgrade status instead of inflating it.
- Do not label something `open` unless it is clearly live right now.
- Use `historical_signal` when the record proves category buying but not a current open bid.
- Use `awarded` when the evidence clearly reflects extension, award, modification, or completed contract action.

## Order of operations
1. Confirm entity exists in `entities.json`; add it if missing.
2. Confirm source exists in `sources.json`; add it if missing.
3. Add supporting evidence to `evidence.json` when available.
4. Copy `data/intake-template.json` and turn it into a new opportunity record.
5. Put the record into:
   - `open-opportunities.json` if it is truly open/live
   - `opportunities.json` for awarded or historical records
6. Keep summary short, factual, and source-backed.
7. Reload the MVP and verify the record renders and filters correctly.

## Confidence guide
- `high` — direct source evidence, strong category fit, low ambiguity
- `medium-high` — strong signal with some interpretation
- `medium` — useful but not deeply confirmed
- `low` — should usually stay out of the featured dataset unless needed

## Fit score guide
- `high` — clearly meaningful to the wedge and likely valuable to a user
- `medium-high` — relevant but narrower or more indirect
- `medium` — useful mainly as source or buyer intelligence
- `low` — weak product value; usually exclude
