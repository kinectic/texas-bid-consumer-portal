# ON-DEMAND-AGENT-WORKFLOW.md

Official workaround workflow for running Zee's helper agents in the current environment.

## Model

The team is persistent in structure and rules.
The helper-agent executions are on demand.

That means:
- the roles always exist
- the live workers are launched when needed
- Zee remains the stable manager and continuity layer

## Workflow

### Step 1: Dylan gives Zee the task
Dylan assigns the project or batch objective to Zee.

### Step 2: Zee chooses the next helper role
Zee decides which project phase is next and launches the appropriate helper agent for that phase.

### Step 3: Helper agent performs bounded work
The helper agent works only on its assigned role and returns a concise summary to Zee.

### Step 4: Zee reviews and hands off again
Zee reviews the summary, stores relevant memory, and launches the next helper if needed.

### Step 5: Zee completes the project
Zee closes the loop, summarizes results for Dylan, and keeps continuity in workspace files.

## Role Activation Order For Outreach

1. Sweep Agent
2. Qualification Agent
3. Contact Discovery Agent
4. Batch Assembly Agent

## Security Rule

Every on-demand helper agent must inherit the same effective security posture as Zee.

## Reporting Rule

Each helper returns:
- what it worked on
- concise findings
- blockers or uncertainty
- recommended next handoff

## Operational Rule

Do not wait for always-on persistent helper sessions if the environment does not support them cleanly.
Use on-demand helper execution as the default working model until runtime support improves.
