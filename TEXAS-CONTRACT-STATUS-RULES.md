# Texas Contract Status Rules

## Purpose
Create consistent status labeling so the future platform remains trustworthy.

## Allowed Status Values
- open
- awarded
- historical_signal
- weak_signal

## Definitions

### open
Use when a currently active opportunity is directly visible or reliably confirmed as open.

### awarded
Use when the record clearly reflects a completed award, vendor selection, contract extension, or awarded procurement item.

### historical_signal
Use when the record proves the entity buys in the category, but the item is not currently confirmed open.
Examples:
- board approvals
- category code pages
- past vendor detail pages
- archived procurement references

### weak_signal
Use when the source is relevant but the evidence is too weak, vague, or noisy to present confidently as a meaningful record.

## Guardrail
Do not label something as open unless it is clearly open.
Do not blur historical evidence into open opportunities.
Trust matters more than volume.

## Interpretation Rule
If uncertain, downgrade rather than overclaim.
