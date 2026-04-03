# AGENTS-HIERARCHY.md

## Structure

Zee sits at the top of the agent structure.

Under Zee are category-based agents.
Under those category agents can be helper or specialist sub-agents when needed.

## Current Model

- **Zee**
  - Role: Lead operator, coordinator, memory keeper, and manager of future agents
  - Scope: Dylan-facing control, delegation, prioritization, continuity, and oversight

## Planned Category Layers

- **Research Category Agent**
  - Role: Find niches, markets, leads, patterns, and opportunities
  - Reports to: Zee
  - Possible helpers under it later:
    - niche scanner
    - lead finder
    - competitor summarizer

- **Execution Category Agent**
  - Role: Carry out focused builds, operations, and implementation tasks
  - Reports to: Zee
  - Possible helpers under it later:
    - builder
    - automation helper
    - documentation helper

- **Operations Category Agent**
  - Role: Track ongoing systems, maintenance, task flow, and reporting
  - Reports to: Zee
  - Possible helpers under it later:
    - task tracker
    - monitor
    - reporting helper

- **Outreach Category Agent**
  - Role: Manage lead discovery, qualification, contact discovery, batch assembly, and outreach preparation
  - Reports to: Zee
  - Current planned helpers under it:
    - sweep agent
    - qualification agent
    - contact discovery agent
    - batch assembly agent

## Rule

- Zee remains the top-level manager.
- Category agents report upward to Zee.
- Helper agents report to their parent category agent, not directly to Dylan unless Zee explicitly routes that way.
