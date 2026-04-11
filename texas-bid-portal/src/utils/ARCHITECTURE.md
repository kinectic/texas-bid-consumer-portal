# Utils Architecture

This folder is intentionally split by responsibility so the MVP shell does not drift back into page-level string assembly.

## Lane entrypoints

- `agencyLane.ts` — main import surface for agency-facing page code
- `vendorLane.ts` — main import surface for vendor-facing page code and vendor workflow state helpers
- `shellContent.ts` — shared top-level shell copy used across home / marketplace / dashboard surfaces

Page files should prefer these lane entrypoints before reaching into narrower helpers directly.

## Lower-level helper categories

- `*Content.ts` — static copy/config blocks for a lane or surface
- `*Presentation.ts` — role-aware phrasing and UI text assembly
- `readinessState.ts` — raw readiness / draft / package state derivation
- `submissionActivity.ts` — submission activity card item building
- `submissionQueue.ts` — queue row numbering / active-row metadata

## Rule of thumb

If a new page-level string depends on state, put it in a presentation helper.
If it is static copy, put it in a content module.
If it computes product state, put it in a state helper.
If it is agency- or vendor-facing, export it through the corresponding lane entrypoint.
