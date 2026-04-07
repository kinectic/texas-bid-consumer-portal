# Bid Monitoring Log

## Log Entries

### 2026-04-07 — Initial source validation pass
- Sources checked:
  - Dallas County BidNet open bids
  - Tarrant County IonWave portal landing
  - Denton County Bonfire open opportunities landing
  - Plano ISD IonWave current proposals/bids
  - City of Irving IonWave current bid opportunities
  - Fort Worth ISD current business opportunities / eBid
  - DFW Airport procurement page
  - DART procurement page
- Relevant janitorial signal found?
  - Direct live open janitorial bids: not clearly surfaced in lightweight fetch
  - Real custodial/public-facility relevance: yes
  - Historical / structural custodial signal: yes
- Briefs created: yes
- False positive pattern notes:
  - many open items are unrelated services, construction, supplies, or professional services
  - school and county portals may be relevant even when no live custodial listing is visible that day
- Follow-up needed:
  - repeat checks across multiple days
  - seek stronger recently awarded or search-visible custodial examples

### 2026-04-07 — Deeper custodial excavation pass
- Sources / paths checked:
  - Google/browser-assisted searches into Dallas ISD custodial procurement history
  - Google/browser-assisted searches into Fort Worth ISD custodial procurement relevance
  - Google/browser-assisted searches into Plano ISD custodial procurement relevance
- Relevant janitorial signal found?
  - Yes, stronger historical custodial signal found
- Strongest finding:
  - Dallas ISD visible search results tied **Bid 208263 — Pressure/Power Washing Services** to category code **30280 (Custodial Maintenance and Repair Services)**
  - Search-visible vendor/result examples included CCNG Building Services, Prestige Building Group, TJ'S Professional Painting and Construction, and JET SET II, LLC
- Briefs updated: yes
- False positive notes:
  - many direct current-opportunity pages still do not surface custodial work at first glance
  - search-visible procurement history is currently producing stronger evidence than raw portal landing pages alone
- Follow-up needed:
  - continue combining direct portal checks with search-assisted deeper excavation
  - gather more recent/historical custodial examples from other DFW public entities

### 2026-04-07 — Transit / airport custodial excavation pass
- Sources / paths checked:
  - search-assisted DFW Airport procurement / board-document custodial references
  - search-assisted DART procurement / board-document janitorial references
  - search-assisted Dallas County BidNet query attempts
- Relevant janitorial signal found?
  - Yes for DFW Airport
  - Yes for DART
  - No useful direct query return from Dallas County BidNet search pattern
- Strongest findings:
  - DFW Airport visible materials referenced janitorial cleaning supplies and chemicals for airport custodial vendors and a contract providing custodial cleaning services for Terminal E facilities
  - DART visible materials referenced contract modification for janitorial services for passenger facilities and janitorial/custodial services for 18 bus and rail operations
- Briefs updated: yes
- False positive notes:
  - direct site-specific Google queries work better for airport/transit board docs than broad procurement landing pages alone
  - Dallas County direct site query returned no useful Google-indexed result in this pass
- Follow-up needed:
  - continue targeted document-history extraction for counties, cities, schools, and transit entities
  - keep separate track of live-open opportunities vs. strong historical procurement evidence

## Instructions
For each future pass, add:
- date checked
- sources checked
- relevant janitorial signal found? (Y/N)
- briefs created? (Y/N)
- false positive notes
- follow-up needed
