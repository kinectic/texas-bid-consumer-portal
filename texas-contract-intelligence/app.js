async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function labelize(value) {
  if (!value) return '';
  return value.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function createOption(value, text) {
  const option = document.createElement('option');
  option.value = value;
  option.textContent = text;
  return option;
}

function buildLookup(items, key) {
  return Object.fromEntries(items.map(item => [item[key], item]));
}

(async function init() {
  const [entities, sources, evidence, opportunities, openOpportunities] = await Promise.all([
    loadJson('./data/entities.json'),
    loadJson('./data/sources.json'),
    loadJson('./data/evidence.json'),
    loadJson('./data/opportunities.json'),
    loadJson('./data/open-opportunities.json')
  ]);

  const records = [...openOpportunities, ...opportunities];
  const entityById = buildLookup(entities, 'entity_id');
  const sourceById = buildLookup(sources, 'source_id');

  const keywordFilter = document.getElementById('keywordFilter');
  const regionFilter = document.getElementById('regionFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  const statusFilter = document.getElementById('statusFilter');
  const cardsEl = document.getElementById('opportunityCards');
  const detailPanel = document.getElementById('detailPanel');
  const statsEl = document.getElementById('stats');
  const resultsMeta = document.getElementById('resultsMeta');
  const entityHighlights = document.getElementById('entityHighlights');
  const entityDirectory = document.getElementById('entityDirectory');
  const sourceDirectory = document.getElementById('sourceDirectory');

  regionFilter.appendChild(createOption('', 'All regions'));
  unique(records.map(o => o.geography)).forEach(v => regionFilter.appendChild(createOption(v, v)));

  categoryFilter.appendChild(createOption('', 'All categories'));
  unique(records.map(o => o.category)).forEach(v => categoryFilter.appendChild(createOption(v, labelize(v))));

  statusFilter.appendChild(createOption('', 'All statuses'));
  unique(records.map(o => o.status)).forEach(v => statusFilter.appendChild(createOption(v, labelize(v))));

  statsEl.innerHTML = `
    <div class="stat">${entities.length} entities tracked</div>
    <div class="stat">${sources.length} sources mapped</div>
    <div class="stat">${evidence.length} evidence records</div>
    <div class="stat">${records.length} opportunity records</div>
    <div class="stat">${openOpportunities.length} open/live records</div>
  `;

  const featuredEntityIds = ['entity_dart', 'entity_dfw_airport', 'entity_dallas_isd'];
  entityHighlights.innerHTML = featuredEntityIds.map(id => {
    const entity = entityById[id];
    if (!entity) return '';
    const sourceCount = sources.filter(s => s.parent_entity === entity.entity_name).length;
    return `
      <div class="list-item">
        <strong>${entity.entity_name}</strong>
        <div class="muted">${labelize(entity.entity_type)} • ${sourceCount} mapped source${sourceCount === 1 ? '' : 's'}</div>
        <div>${entity.notes}</div>
        <div style="margin-top:8px;"><a href="${entity.procurement_url}" target="_blank" rel="noopener noreferrer">Procurement entry</a></div>
      </div>
    `;
  }).join('');

  entityDirectory.innerHTML = entities.map(entity => {
    const relatedCount = records.filter(r => r.entity_id === entity.entity_id).length;
    return `
      <div class="directory-item" data-kind="entity" data-id="${entity.entity_id}">
        <div class="directory-title">${entity.entity_name}</div>
        <div class="muted">${labelize(entity.entity_type)} • ${relatedCount} related record${relatedCount === 1 ? '' : 's'}</div>
      </div>
    `;
  }).join('');

  sourceDirectory.innerHTML = sources.slice(0, 12).map(source => {
    const relatedCount = records.filter(r => r.source_id === source.source_id).length;
    return `
      <div class="directory-item" data-kind="source" data-id="${source.source_id}">
        <div class="directory-title">${source.source_name}</div>
        <div class="muted">${source.parent_entity} • ${source.procurement_system} • ${relatedCount} record${relatedCount === 1 ? '' : 's'}</div>
      </div>
    `;
  }).join('');

  let activeId = null;

  function matchingEvidence(opportunityId) {
    return evidence.filter(e => e.related_opportunity_id === opportunityId);
  }

  function renderEntityDetail(entity) {
    const relatedSources = sources.filter(s => s.parent_entity === entity.entity_name);
    const relatedRecords = records.filter(r => r.entity_id === entity.entity_id);
    detailPanel.innerHTML = `
      <h3>${entity.entity_name}</h3>
      <div class="badge historical_signal">${labelize(entity.entity_type)}</div>
      <div class="detail-grid">
        <div class="detail-row">
          <div class="detail-label">Region</div>
          <div>${entity.region}, ${entity.state}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Procurement Entry</div>
          <div><a href="${entity.procurement_url}" target="_blank" rel="noopener noreferrer">Open procurement page</a></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Notes</div>
          <div class="detail-copy">${entity.notes}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Related Sources</div>
          <div class="detail-copy">${relatedSources.length ? relatedSources.map(s => `${s.source_name} (${s.procurement_system})`).join('<br>') : 'No mapped sources.'}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Related Records</div>
          <div class="detail-copy">${relatedRecords.length ? relatedRecords.map(r => `${r.title} — ${labelize(r.status)}`).join('<br>') : 'No related records yet.'}</div>
        </div>
      </div>
    `;
  }

  function renderSourceDetail(source) {
    const relatedRecords = records.filter(r => r.source_id === source.source_id);
    detailPanel.innerHTML = `
      <h3>${source.source_name}</h3>
      <div class="badge weak_signal">${source.procurement_system}</div>
      <div class="detail-grid">
        <div class="detail-row">
          <div class="detail-label">Parent Entity</div>
          <div>${source.parent_entity}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Source Status</div>
          <div>${labelize(source.status)}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Notes</div>
          <div class="detail-copy">${source.notes}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Source URL</div>
          <div><a href="${source.url}" target="_blank" rel="noopener noreferrer">Open source</a></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Related Records</div>
          <div class="detail-copy">${relatedRecords.length ? relatedRecords.map(r => `${r.title} — ${labelize(r.status)}`).join('<br>') : 'No related records yet.'}</div>
        </div>
      </div>
    `;
  }

  function renderOpportunityDetail(opportunity) {
    const entity = entityById[opportunity.entity_id];
    const source = sourceById[opportunity.source_id];
    const relatedEvidence = matchingEvidence(opportunity.opportunity_id);

    detailPanel.innerHTML = `
      <h3>${opportunity.title}</h3>
      <div class="badge ${opportunity.status}">${labelize(opportunity.status)}</div>
      <div class="detail-grid">
        <div class="detail-row">
          <div class="detail-label">Entity</div>
          <div>${entity ? entity.entity_name : 'Unknown'}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Category</div>
          <div>${labelize(opportunity.category)} / ${labelize(opportunity.subcategory)}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Confidence</div>
          <div>${labelize(opportunity.confidence_level)}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Summary</div>
          <div class="detail-copy">${opportunity.summary}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Notes</div>
          <div class="detail-copy">${opportunity.notes || '—'}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Source</div>
          <div>${source ? source.source_name : 'Unknown source'}${source ? ` • ${source.procurement_system}` : ''}</div>
          <div style="margin-top:6px;"><a href="${opportunity.source_url}" target="_blank" rel="noopener noreferrer">Open source record</a></div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Related Evidence</div>
          <div class="detail-copy">${relatedEvidence.length ? relatedEvidence.map(item => `<div style="margin-bottom:8px;"><strong>${item.title}</strong><br><span class="muted">${item.date}</span><br>${item.excerpt}</div>`).join('') : 'No linked evidence records.'}</div>
        </div>
      </div>
    `;
  }

  function getFilteredRecords() {
    const keyword = keywordFilter.value.trim().toLowerCase();
    return records.filter(opportunity => {
      const entity = entityById[opportunity.entity_id];
      const haystack = [
        opportunity.title,
        opportunity.normalized_title,
        opportunity.summary,
        opportunity.notes,
        opportunity.category,
        opportunity.subcategory,
        opportunity.status,
        entity?.entity_name,
        entity?.notes
      ].join(' ').toLowerCase();

      if (keyword && !haystack.includes(keyword)) return false;
      if (regionFilter.value && opportunity.geography !== regionFilter.value) return false;
      if (categoryFilter.value && opportunity.category !== categoryFilter.value) return false;
      if (statusFilter.value && opportunity.status !== statusFilter.value) return false;
      return true;
    });
  }

  function renderCards() {
    const filtered = getFilteredRecords();
    resultsMeta.textContent = `${filtered.length} record${filtered.length === 1 ? '' : 's'} shown`;

    if (!filtered.length) {
      cardsEl.innerHTML = '<div class="empty-state">No records match the current filters.</div>';
      detailPanel.innerHTML = '<div class="muted">No record selected.</div>';
      return;
    }

    if (!activeId || !filtered.some(item => item.opportunity_id === activeId)) {
      activeId = filtered[0].opportunity_id;
    }

    cardsEl.innerHTML = filtered.map(opportunity => {
      const entity = entityById[opportunity.entity_id];
      const isActive = opportunity.opportunity_id === activeId;
      return `
        <article class="card ${isActive ? 'active' : ''}" data-id="${opportunity.opportunity_id}">
          <div class="card-top">
            <div>
              <div class="title">${opportunity.title}</div>
              <div class="meta">${entity ? entity.entity_name : 'Unknown entity'} • ${opportunity.geography} • ${labelize(entity?.entity_type || '')}</div>
            </div>
            <div class="badge ${opportunity.status}">${labelize(opportunity.status)}</div>
          </div>
          <div class="tags">
            <div class="tag">Category: ${labelize(opportunity.category)}</div>
            <div class="tag">Subcategory: ${labelize(opportunity.subcategory)}</div>
            <div class="tag">Confidence: ${labelize(opportunity.confidence_level)}</div>
          </div>
          <div class="summary">${opportunity.summary}</div>
          <a href="${opportunity.source_url}" target="_blank" rel="noopener noreferrer">View source</a>
        </article>
      `;
    }).join('');

    const activeRecord = filtered.find(item => item.opportunity_id === activeId);
    if (activeRecord) renderOpportunityDetail(activeRecord);

    cardsEl.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
        activeId = card.dataset.id;
        renderCards();
      });
    });
  }

  entityDirectory.querySelectorAll('.directory-item[data-kind="entity"]').forEach(item => {
    item.addEventListener('click', () => renderEntityDetail(entityById[item.dataset.id]));
  });

  sourceDirectory.querySelectorAll('.directory-item[data-kind="source"]').forEach(item => {
    item.addEventListener('click', () => renderSourceDetail(sourceById[item.dataset.id]));
  });

  [keywordFilter, regionFilter, categoryFilter, statusFilter].forEach(control => {
    control.addEventListener('input', renderCards);
    control.addEventListener('change', renderCards);
  });

  renderCards();
})();
