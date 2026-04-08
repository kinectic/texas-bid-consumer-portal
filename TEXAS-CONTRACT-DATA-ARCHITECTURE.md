# Texas Contract Data Architecture

## Goal
Define the minimum data model needed to evolve from a narrow procurement research lane into a Texas-wide contract intelligence platform.

## Core Record Types

### 1. Source
Represents a procurement source or entry point.

Fields:
- source_id
- source_name
- source_type (county, city, school district, airport, transit, etc.)
- geography
- parent_entity
- procurement_system (BidNet, IonWave, Bonfire, custom, board docs, archive)
- url
- status (active, weak, noisy, archived)
- notes

### 2. Entity
Represents the buying organization.

Fields:
- entity_id
- entity_name
- entity_type
- region
- state
- website
- procurement_url
- notes

### 3. Opportunity
Represents a bid / contract opportunity / procurement item.

Fields:
- opportunity_id
- entity_id
- source_id
- title
- normalized_title
- raw_title
- category
- subcategory
- keywords_matched
- geography
- open_date
- due_date
- contract_term
- status (open, closed, awarded, historical signal)
- source_url
- summary
- raw_excerpt
- fit_score
- confidence_level
- notes

### 4. Evidence
Represents supporting proof such as board docs, category pages, or award references.

Fields:
- evidence_id
- entity_id
- source_id
- evidence_type (board doc, award page, category page, vendor detail, archive)
- title
- date
- url
- excerpt
- related_opportunity_id (optional)
- notes

### 5. Monitoring Event
Represents a check run.

Fields:
- event_id
- source_id
- checked_at
- result_type (relevant signal, no change, false positive, blocked, weak)
- opportunities_found_count
- notes

## Key Product Distinctions
The system must distinguish between:
- open opportunities
- awarded opportunities
- historical procurement evidence
- weak/noisy source noise

If these are blended together badly, user trust collapses.

## Minimum Search/Filter Capabilities
Eventually the platform should support:
- search by keyword
- filter by category
- filter by geography
- filter by source type
- filter by entity
- filter by status
- sort by newest / due soon / relevance

## Early Build Rule
Do not over-engineer the final platform before proving the wedge.
Use this architecture to keep the work structured, not to justify premature complexity.
