// ===== VIEW RENDERING FUNCTIONS =====

// ===== DASHBOARD =====
function renderDashboard() {
  const el = document.getElementById('view-dashboard');
  const total = PLAYERS.length;
  const greenCount = PLAYERS.filter(p => p.academic.status === 'green').length;
  const greenPct = Math.round((greenCount / total) * 100);
  const injured = PLAYERS.filter(p => p.injury !== null).length;
  const expiring = PLAYERS.filter(p => contractMonthsRemaining(p.contractUntil) <= 6).length;
  const atRisk = PLAYERS.filter(p => p.academic.status === 'red');
  const upcoming = DIVISIONS.filter(d => d.nextMatch).slice(0, 3);
  const contractAlerts = PLAYERS.filter(p => contractMonthsRemaining(p.contractUntil) <= 6);

  el.innerHTML = `
    <div class="page-header">
      <h1>Dashboard</h1>
      <span class="date">Marzo 2026</span>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card stagger-item">
        <div class="kpi-label">Jugadores Totales</div>
        <div class="kpi-value accent">${total}</div>
        <div class="kpi-sub">${DIVISIONS.length} divisiones activas</div>
      </div>
      <div class="kpi-card stagger-item">
        <div class="kpi-label">Al Día Académicamente</div>
        <div class="kpi-value green">${greenPct}%</div>
        <div class="kpi-sub">${greenCount} de ${total} jugadores</div>
      </div>
      <div class="kpi-card stagger-item">
        <div class="kpi-label">Lesionados</div>
        <div class="kpi-value ${injured > 0 ? 'red' : ''}">${injured}</div>
        <div class="kpi-sub">En recuperación</div>
      </div>
      <div class="kpi-card stagger-item">
        <div class="kpi-label">Contratos < 6 Meses</div>
        <div class="kpi-value ${expiring > 0 ? 'yellow' : ''}">${expiring}</div>
        <div class="kpi-sub">Requieren atención</div>
      </div>
    </div>

    <div class="alerts-section">
      <div class="alerts-title">Alertas</div>
      <div class="alerts-grid">
        ${atRisk.map(p => `
          <div class="alert-card stagger-item" onclick="openPlayerProfile(${p.id})">
            <div class="alert-icon red">!</div>
            <div class="alert-text"><strong>${p.name}</strong> — Riesgo académico (${p.academic.subjectsPending} materias pendientes, ${p.academic.attendance}% asistencia)</div>
          </div>
        `).join('')}
        ${contractAlerts.map(p => `
          <div class="alert-card stagger-item" onclick="openPlayerProfile(${p.id})">
            <div class="alert-icon yellow">$</div>
            <div class="alert-text"><strong>${p.name}</strong> — Contrato vence ${formatDate(p.contractUntil)} (${contractMonthsRemaining(p.contractUntil)} meses)</div>
          </div>
        `).join('')}
        ${PLAYERS.filter(p => p.injury).map(p => `
          <div class="alert-card stagger-item" onclick="openPlayerProfile(${p.id})">
            <div class="alert-icon red">+</div>
            <div class="alert-text"><strong>${p.name}</strong> — ${p.injury.type}. Retorno estimado: ${formatDate(p.injury.expectedReturn)}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="section-title">Próximos Partidos</div>
    <div class="alerts-grid" style="margin-bottom: 2rem;">
      ${upcoming.map(d => `
        <div class="alert-card stagger-item" onclick="navigateTo('divisions')">
          <div class="alert-icon blue">vs</div>
          <div class="alert-text">
            <strong>${d.name}</strong> vs ${d.nextMatch.opponent}<br>
            <span style="font-size:0.75rem;color:var(--text-muted);">${formatDate(d.nextMatch.date)} · ${d.nextMatch.home ? 'Local' : 'Visitante'}</span>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="section-title">Divisiones</div>
    <div class="divisions-grid">
      ${DIVISIONS.map(d => {
        const players = getPlayersByDivision(d.id);
        return `
          <div class="division-card stagger-item" onclick="navigateTo('divisions'); setTimeout(() => showRoster('${d.id}'), 50);">
            <div class="div-header">
              <div class="div-name">${d.name}</div>
              <div class="div-badge">${players.length} jug.</div>
            </div>
            <div class="div-coach">DT: ${d.coach}</div>
            <div class="div-results">
              ${d.lastResults.map(r => `<div class="result-badge ${r.result}">${r.result}</div>`).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ===== DIVISIONS =====
let currentRoster = null;

function renderDivisions() {
  const el = document.getElementById('view-divisions');
  currentRoster = null;
  el.innerHTML = `
    <div class="page-header">
      <h1>Divisiones</h1>
    </div>
    <div class="divisions-grid" id="divisionsGrid">
      ${DIVISIONS.map(d => {
        const players = getPlayersByDivision(d.id);
        const { w, d: draws, l } = d.record;
        return `
          <div class="division-card stagger-item" onclick="showRoster('${d.id}')">
            <div class="div-header">
              <div class="div-name">${d.name}</div>
              <div class="div-badge">${d.shortName}</div>
            </div>
            <div class="div-coach">DT: ${d.coach} · ${d.ageRange} años · ${d.competition}</div>
            <div class="div-stats">
              <div><span class="div-stat-label">Récord </span><span class="div-stat-value">${w}V ${draws}E ${l}D</span></div>
              <div><span class="div-stat-label">Goleador </span><span class="div-stat-value">${d.topScorer.name} (${d.topScorer.goals})</span></div>
            </div>
            <div class="div-results">
              ${d.lastResults.map(r => `
                <div class="result-badge ${r.result}" title="${r.opponent} ${r.score}">${r.result}</div>
              `).join('')}
            </div>
            <div class="div-next">
              Próximo: <strong>${d.nextMatch.opponent}</strong> · ${formatDate(d.nextMatch.date)} · ${d.nextMatch.home ? 'Local' : 'Visitante'}
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="hidden" id="rosterView"></div>
  `;
}

function showRoster(divId) {
  currentRoster = divId;
  const div = getDivisionById(divId);
  const players = getPlayersByDivision(divId);
  const grid = document.getElementById('divisionsGrid');
  const roster = document.getElementById('rosterView');

  grid.classList.add('hidden');
  roster.classList.remove('hidden');

  roster.innerHTML = `
    <button class="back-btn" onclick="hideRoster()">← Volver a divisiones</button>
    <div class="roster-header">
      <h2>${div.name}</h2>
      <div class="roster-meta">
        <span>DT: ${div.coach}</span>
        <span>${players.length} jugadores</span>
        <span>Récord: ${div.record.w}V ${div.record.d}E ${div.record.l}D</span>
      </div>
    </div>
    <div class="section-title">Últimos Resultados</div>
    <div class="alerts-grid" style="margin-bottom: 1.5rem;">
      ${div.lastResults.map(r => `
        <div class="alert-card">
          <div class="result-badge ${r.result}" style="width:28px;height:28px;font-size:0.7rem;">${r.result}</div>
          <div class="alert-text">vs <strong>${r.opponent}</strong> — ${r.score} <span style="color:var(--text-muted);font-size:0.75rem;">(${formatDate(r.date)})</span></div>
        </div>
      `).join('')}
    </div>
    <div class="section-title">Plantel</div>
    <div class="players-grid">
      ${players.map(p => renderPlayerCard(p)).join('')}
    </div>
  `;
}

function hideRoster() {
  currentRoster = null;
  document.getElementById('divisionsGrid').classList.remove('hidden');
  document.getElementById('rosterView').classList.add('hidden');
}

// ===== PLAYERS =====
function renderPlayers() {
  const el = document.getElementById('view-players');
  const positions = getAllPositions();
  const divisions = getAllDivisionIds();

  el.innerHTML = `
    <div class="page-header">
      <h1>Base de Jugadores</h1>
    </div>
    <div class="filter-bar">
      <input type="search" id="playerSearch" placeholder="Buscar jugador..." oninput="filterPlayers()">
      <select id="filterPosition" onchange="filterPlayers()">
        <option value="all">Posición</option>
        ${positions.map(p => `<option value="${p}">${p}</option>`).join('')}
      </select>
      <select id="filterDivision" onchange="filterPlayers()">
        <option value="all">División</option>
        ${divisions.map(d => `<option value="${d}">${d}</option>`).join('')}
      </select>
      <select id="filterAcademic" onchange="filterPlayers()">
        <option value="all">Estado académico</option>
        <option value="green">Al día</option>
        <option value="yellow">Materias pendientes</option>
        <option value="red">En riesgo</option>
      </select>
      <select id="filterRep" onchange="filterPlayers()">
        <option value="all">Representante</option>
        ${REPRESENTATIVES.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
      </select>
      <span class="filter-count" id="filterCount">${PLAYERS.length} jugadores</span>
    </div>
    <div class="players-grid" id="playersGrid">
      ${PLAYERS.map(p => renderPlayerCard(p)).join('')}
    </div>
  `;
}

function filterPlayers() {
  const search = document.getElementById('playerSearch').value.toLowerCase();
  const pos = document.getElementById('filterPosition').value;
  const div = document.getElementById('filterDivision').value;
  const acad = document.getElementById('filterAcademic').value;
  const rep = document.getElementById('filterRep').value;

  let filtered = PLAYERS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search)) return false;
    if (pos !== 'all' && p.position !== pos) return false;
    if (div !== 'all' && p.division !== div) return false;
    if (acad !== 'all' && p.academic.status !== acad) return false;
    if (rep !== 'all' && p.representative !== rep) return false;
    return true;
  });

  document.getElementById('filterCount').textContent = `${filtered.length} jugadores`;
  document.getElementById('playersGrid').innerHTML = filtered.length
    ? filtered.map(p => renderPlayerCard(p)).join('')
    : '<div class="empty-state"><div class="es-icon">?</div><div class="es-text">No se encontraron jugadores</div></div>';
}

function renderPlayerCard(p) {
  const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  return `
    <div class="player-card stagger-item ${p.injury ? 'injured' : ''}" onclick="openPlayerProfile(${p.id})">
      <div class="pc-top">
        <div class="pc-avatar">${initials}</div>
        <div class="pc-info">
          <div class="pc-name">${p.name}</div>
          <div class="pc-detail">${p.positionFull} · ${p.division} · ${p.age} años</div>
        </div>
        <div class="pc-rating">${p.rating}</div>
      </div>
      <div class="pc-tags">
        <span class="tag pos">${p.position}</span>
        <span class="tag div">${p.division}</span>
        <span class="tag age">${p.age} años</span>
        <span class="status-badge ${p.academic.status}">${getStatusLabel(p.academic.status)}</span>
        ${p.injury ? '<span class="status-badge red">Lesionado</span>' : ''}
      </div>
    </div>
  `;
}

// ===== PLAYER PROFILE =====
function openPlayerProfile(playerId) {
  const p = PLAYERS.find(pl => pl.id === playerId);
  if (!p) return;

  destroyCharts();
  const overlay = document.getElementById('playerOverlay');
  const backdrop = document.getElementById('overlayBackdrop');
  const content = document.getElementById('playerProfileContent');
  const rep = getRepById(p.representative);
  const group = getPositionGroup(p.position);
  const ageGroup = getAgeGroup(p.age);
  const bench = BENCHMARKS[ageGroup] || BENCHMARKS["Sub-19"];
  const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const monthsLeft = contractMonthsRemaining(p.contractUntil);

  content.innerHTML = `
    ${p.injury ? `
      <div class="injury-banner">
        <span>+</span>
        <div><strong>${p.injury.type}</strong><br>Desde ${formatDate(p.injury.since)} · Retorno estimado: ${formatDate(p.injury.expectedReturn)}</div>
      </div>
    ` : ''}

    <div class="profile-header">
      <div class="profile-avatar">${initials}</div>
      <div class="profile-info">
        <div class="profile-name">${p.name}</div>
        <div class="profile-position">${p.positionFull} (${p.position})</div>
        <div class="profile-meta">
          <span><strong>${p.age}</strong> años</span>
          <span>${p.nationality}</span>
          <span>${p.division}</span>
          <span>#${p.number}</span>
          <span>Contrato: <strong style="color: ${monthsLeft <= 6 ? 'var(--yellow)' : 'var(--text)'}">${formatDate(p.contractUntil)}</strong></span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
        <div class="profile-rating">
          <div class="profile-rating-value">${p.rating}</div>
          <div class="profile-rating-label">Rating</div>
        </div>
        <button class="export-pdf-btn" onclick="exportPlayerPDF(${p.id})">Exportar PDF</button>
      </div>
    </div>

    ${rep ? `
      <div class="rep-info-card">
        <div class="rep-name">${rep.name}</div>
        <div class="rep-agency">${rep.agency}</div>
        <div class="rep-contact">
          <span>${rep.phone}</span>
          <span>${rep.email}</span>
        </div>
      </div>
    ` : ''}

    <div class="profile-section">
      <div class="profile-section-title">Perfil Técnico — ${group}</div>
      <div class="chart-container">
        <canvas id="radarChart"></canvas>
      </div>
    </div>

    <div class="profile-section">
      <div class="profile-section-title">Curva de Desarrollo</div>
      <div class="chart-container line">
        <canvas id="devChart"></canvas>
      </div>
    </div>

    <div class="profile-section">
      <div class="profile-section-title">Métricas Físicas · Benchmark ${ageGroup}</div>
      <div class="physical-grid">
        ${renderPhysicalMetric('Velocidad', p.physical.speed, bench.speed, 'km/h', 35)}
        ${renderPhysicalMetric('Distancia', p.physical.distance, bench.distance, 'km', 14)}
        ${renderPhysicalMetric('Sprints', p.physical.sprints, bench.sprints, '/partido', 35)}
      </div>
    </div>

    <div class="profile-section">
      <div class="profile-section-title">Evolución Física (12 meses)</div>
      <select class="physical-compare-select" id="physComparePlayer" onchange="updatePhysicalEvo(${p.id})">
        <option value="">Comparar con...</option>
        ${PLAYERS.filter(pl => pl.id !== p.id).map(pl => `<option value="${pl.id}">${pl.name} (${pl.position} · ${pl.division})</option>`).join('')}
      </select>
      <div class="physical-evo-grid">
        ${[
          { metric: 'speed', label: 'Velocidad', unit: 'km/h', bench: bench.speed },
          { metric: 'distance', label: 'Distancia', unit: 'km', bench: bench.distance },
          { metric: 'sprints', label: 'Sprints', unit: '/partido', bench: bench.sprints }
        ].map(m => {
          const trend = getGrowthTrend(p.physicalHistory, m.metric);
          const trendLabel = trend === 'improving' ? '↑ Mejorando' : trend === 'declining' ? '↓ Bajando' : '→ Estable';
          return `
            <div class="physical-evo-chart">
              <div class="physical-evo-header">
                <span class="physical-evo-title">${m.label}</span>
                <span class="growth-indicator ${trend}">${trendLabel}</span>
              </div>
              <canvas id="evoChart_${m.metric}"></canvas>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <div class="profile-section">
      <div class="profile-section-title">Seguimiento Académico</div>
      <div class="academic-card">
        <div class="ac-row">
          <span class="ac-label">Año cursando</span>
          <span class="ac-value">${p.academic.schoolYear}</span>
        </div>
        <div class="ac-row">
          <span class="ac-label">Materias aprobadas</span>
          <span class="ac-value">${p.academic.subjectsPassed}</span>
        </div>
        <div class="ac-row">
          <span class="ac-label">Materias pendientes</span>
          <span class="ac-value" style="color: ${p.academic.subjectsPending > 2 ? 'var(--red-status)' : p.academic.subjectsPending > 0 ? 'var(--yellow)' : 'var(--green)'}">${p.academic.subjectsPending}</span>
        </div>
        <div class="ac-row">
          <span class="ac-label">Asistencia</span>
          <span class="ac-value" style="color: ${p.academic.attendance < 75 ? 'var(--red-status)' : p.academic.attendance < 85 ? 'var(--yellow)' : 'var(--green)'}">${p.academic.attendance}%</span>
        </div>
        <div class="ac-row">
          <span class="ac-label">Estado</span>
          <span class="status-badge ${p.academic.status}">${getStatusLabel(p.academic.status)}</span>
        </div>
      </div>
    </div>

    ${p.notes.length > 0 ? `
      <div class="profile-section">
        <div class="profile-section-title">Notas del Cuerpo Técnico</div>
        <div class="notes-list">
          ${p.notes.map(n => `
            <div class="note-item">
              <div class="note-meta">${formatDate(n.date)} · ${n.author}</div>
              <div class="note-text">${n.text}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;

  overlay.classList.add('open');
  backdrop.classList.add('open');

  // Render charts after DOM is ready
  requestAnimationFrame(() => {
    createRadarChart('radarChart', p);
    createDevelopmentChart('devChart', p);
    // Physical evolution charts
    createPhysicalEvoChart('evoChart_speed', p, 'speed', 'Velocidad', 'km/h', bench.speed, null);
    createPhysicalEvoChart('evoChart_distance', p, 'distance', 'Distancia', 'km', bench.distance, null);
    createPhysicalEvoChart('evoChart_sprints', p, 'sprints', 'Sprints', '/partido', bench.sprints, null);
  });
}

function updatePhysicalEvo(playerId) {
  const p = PLAYERS.find(pl => pl.id === playerId);
  if (!p) return;
  const compareId = document.getElementById('physComparePlayer')?.value;
  const comparePlayer = compareId ? PLAYERS.find(pl => pl.id === Number(compareId)) : null;
  const ageGroup = getAgeGroup(p.age);
  const bench = BENCHMARKS[ageGroup] || BENCHMARKS["Sub-19"];
  destroyPhysicalCharts();
  createPhysicalEvoChart('evoChart_speed', p, 'speed', 'Velocidad', 'km/h', bench.speed, comparePlayer);
  createPhysicalEvoChart('evoChart_distance', p, 'distance', 'Distancia', 'km', bench.distance, comparePlayer);
  createPhysicalEvoChart('evoChart_sprints', p, 'sprints', 'Sprints', '/partido', bench.sprints, comparePlayer);
}

function closePlayerProfile() {
  destroyCharts();
  document.getElementById('playerOverlay').classList.remove('open');
  document.getElementById('overlayBackdrop').classList.remove('open');
}

function renderPhysicalMetric(label, value, benchmark, unit, max) {
  const pct = Math.min(100, (value / max) * 100);
  const benchPct = Math.min(100, (benchmark / max) * 100);
  return `
    <div class="physical-metric">
      <div class="pm-label">${label}</div>
      <div class="pm-value">${value}<span style="font-size:0.7rem;color:var(--text-muted);font-weight:400;"> ${unit}</span></div>
      <div class="pm-bar">
        <div class="pm-bar-fill" style="width:${pct}%"></div>
        <div class="pm-benchmark" style="left:${benchPct}%" title="Benchmark ${label}: ${benchmark} ${unit}"></div>
      </div>
      <div class="pm-benchmark-label">Benchmark: ${benchmark}</div>
    </div>
  `;
}

// ===== ACADEMIC =====
function renderAcademic() {
  const el = document.getElementById('view-academic');
  const greenCount = PLAYERS.filter(p => p.academic.status === 'green').length;
  const yellowCount = PLAYERS.filter(p => p.academic.status === 'yellow').length;
  const redCount = PLAYERS.filter(p => p.academic.status === 'red').length;
  const total = PLAYERS.length;

  el.innerHTML = `
    <div class="page-header">
      <h1>Seguimiento Académico</h1>
    </div>

    <div class="academic-summary">
      <div class="academic-summary-card stagger-item">
        <div class="as-value green">${Math.round((greenCount / total) * 100)}%</div>
        <div class="as-label">Al día (${greenCount})</div>
      </div>
      <div class="academic-summary-card stagger-item">
        <div class="as-value yellow">${Math.round((yellowCount / total) * 100)}%</div>
        <div class="as-label">Materias pendientes (${yellowCount})</div>
      </div>
      <div class="academic-summary-card stagger-item">
        <div class="as-value red">${Math.round((redCount / total) * 100)}%</div>
        <div class="as-label">En riesgo (${redCount})</div>
      </div>
    </div>

    <div class="filter-bar">
      <select id="acadFilterDiv" onchange="filterAcademic()">
        <option value="all">Todas las divisiones</option>
        ${getAllDivisionIds().map(d => `<option value="${d}">${d}</option>`).join('')}
      </select>
      <select id="acadFilterStatus" onchange="filterAcademic()">
        <option value="all">Todos los estados</option>
        <option value="green">Al día</option>
        <option value="yellow">Materias pendientes</option>
        <option value="red">En riesgo</option>
      </select>
      <span class="filter-count" id="acadFilterCount">${total} jugadores</span>
    </div>

    <table class="data-table" id="academicTable">
      <thead>
        <tr>
          <th>Jugador</th>
          <th>División</th>
          <th>Año</th>
          <th>Aprobadas</th>
          <th>Pendientes</th>
          <th>Asistencia</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody id="academicTableBody">
        ${renderAcademicRows(PLAYERS)}
      </tbody>
    </table>
  `;
}

function renderAcademicRows(players) {
  return players.map(p => `
    <tr onclick="openPlayerProfile(${p.id})">
      <td><strong>${p.name}</strong></td>
      <td>${p.division}</td>
      <td>${p.academic.schoolYear}</td>
      <td>${p.academic.subjectsPassed}</td>
      <td style="color: ${p.academic.subjectsPending > 2 ? 'var(--red-status)' : p.academic.subjectsPending > 0 ? 'var(--yellow)' : 'var(--green)'}; font-weight: 600;">${p.academic.subjectsPending}</td>
      <td style="color: ${p.academic.attendance < 75 ? 'var(--red-status)' : p.academic.attendance < 85 ? 'var(--yellow)' : 'var(--green)'}; font-weight: 600;">${p.academic.attendance}%</td>
      <td><span class="status-badge ${p.academic.status}"><span class="status-dot ${p.academic.status}"></span>${getStatusLabel(p.academic.status)}</span></td>
    </tr>
  `).join('');
}

function filterAcademic() {
  const div = document.getElementById('acadFilterDiv').value;
  const status = document.getElementById('acadFilterStatus').value;

  let filtered = PLAYERS.filter(p => {
    if (div !== 'all' && p.division !== div) return false;
    if (status !== 'all' && p.academic.status !== status) return false;
    return true;
  });

  document.getElementById('acadFilterCount').textContent = `${filtered.length} jugadores`;
  document.getElementById('academicTableBody').innerHTML = filtered.length
    ? renderAcademicRows(filtered)
    : '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted);">No se encontraron jugadores</td></tr>';
}

// ===== REPRESENTATIVES =====
let currentRepView = null;

function renderRepresentatives() {
  const el = document.getElementById('view-representatives');
  currentRepView = null;

  el.innerHTML = `
    <div class="page-header">
      <h1>Representantes</h1>
    </div>
    <div class="reps-grid" id="repsGrid">
      ${REPRESENTATIVES.map(r => {
        const count = getPlayersByRep(r.id).length;
        return `
          <div class="rep-card stagger-item" onclick="showRepPlayers('${r.id}')">
            <div class="rep-card-header">
              <div class="rep-card-name">${r.name}</div>
              <div class="rep-card-count">${count} jug.</div>
            </div>
            <div class="rep-card-agency">${r.agency}</div>
            <div class="rep-card-contact">
              <span>${r.phone}</span>
              <span>${r.email}</span>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    <div class="hidden" id="repPlayersView"></div>
  `;
}

function showRepPlayers(repId) {
  currentRepView = repId;
  const rep = getRepById(repId);
  const players = getPlayersByRep(repId);
  const grid = document.getElementById('repsGrid');
  const view = document.getElementById('repPlayersView');

  grid.classList.add('hidden');
  view.classList.remove('hidden');

  view.innerHTML = `
    <button class="back-btn" onclick="hideRepPlayers()">← Volver a representantes</button>
    <div class="rep-players-header">
      <h3>${rep.name}</h3>
      <span style="font-size:0.82rem;color:var(--text-muted);">${rep.agency} · ${players.length} jugadores</span>
    </div>
    <div style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:1rem;">
      ${rep.phone} · ${rep.email}
    </div>
    <div class="players-grid">
      ${players.map(p => renderPlayerCard(p)).join('')}
    </div>
  `;
}

function hideRepPlayers() {
  currentRepView = null;
  document.getElementById('repsGrid').classList.remove('hidden');
  document.getElementById('repPlayersView').classList.add('hidden');
}

// ===== FEATURE: COMPARISON TOOL =====
function renderCompare() {
  const el = document.getElementById('view-compare');
  el.innerHTML = `
    <div class="page-header">
      <h1>Comparar Jugadores</h1>
    </div>
    <div class="compare-selector">
      <select id="cmpPlayer1" onchange="checkCompare()">
        <option value="">Jugador 1</option>
        ${PLAYERS.map(p => `<option value="${p.id}">${p.name} (${p.position} · ${p.division})</option>`).join('')}
      </select>
      <select id="cmpPlayer2" onchange="checkCompare()">
        <option value="">Jugador 2</option>
        ${PLAYERS.map(p => `<option value="${p.id}">${p.name} (${p.position} · ${p.division})</option>`).join('')}
      </select>
      <select id="cmpPlayer3" onchange="checkCompare()">
        <option value="">Jugador 3 (opcional)</option>
        ${PLAYERS.map(p => `<option value="${p.id}">${p.name} (${p.position} · ${p.division})</option>`).join('')}
      </select>
      <button class="compare-btn" id="cmpBtn" disabled onclick="runComparison()">Comparar</button>
    </div>
    <div class="compare-results" id="cmpResults"></div>
  `;
}

function checkCompare() {
  const p1 = document.getElementById('cmpPlayer1').value;
  const p2 = document.getElementById('cmpPlayer2').value;
  document.getElementById('cmpBtn').disabled = !(p1 && p2);
}

function runComparison() {
  destroyComparisonCharts();
  const ids = ['cmpPlayer1', 'cmpPlayer2', 'cmpPlayer3']
    .map(id => document.getElementById(id).value)
    .filter(Boolean)
    .map(Number);
  const players = ids.map(id => PLAYERS.find(p => p.id === id)).filter(Boolean);
  if (players.length < 2) return;

  const groups = [...new Set(players.map(p => getPositionGroup(p.position)))];
  const mixedGroups = groups.length > 1;

  const resultsEl = document.getElementById('cmpResults');
  resultsEl.classList.add('active');
  resultsEl.innerHTML = `
    ${mixedGroups ? '<div class="compare-warning">Los jugadores pertenecen a distintos grupos posicionales. El radar usa las métricas del primer jugador.</div>' : ''}
    <div class="compare-legend">
      ${players.map((p, i) => `<div class="compare-legend-item"><div class="compare-legend-dot" style="background:${COMPARE_COLORS[i].border}"></div>${p.name}</div>`).join('')}
    </div>
    <div class="compare-charts-row">
      <div class="compare-chart-box">
        <h3>Perfil Técnico</h3>
        <div class="chart-container"><canvas id="cmpRadar"></canvas></div>
      </div>
      <div class="compare-chart-box">
        <h3>Curva de Desarrollo</h3>
        <div class="chart-container line"><canvas id="cmpDev"></canvas></div>
      </div>
    </div>
    <table class="compare-table">
      <thead>
        <tr>
          <th>Métrica</th>
          ${players.map(p => `<th>${p.name}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${compareRow('Rating', players.map(p => p.rating), true)}
        ${compareRow('Edad', players.map(p => p.age), false)}
        ${compareRow('Velocidad (km/h)', players.map(p => p.physical.speed), true)}
        ${compareRow('Distancia (km)', players.map(p => p.physical.distance), true)}
        ${compareRow('Sprints', players.map(p => p.physical.sprints), true)}
        ${compareRow('Asistencia escolar (%)', players.map(p => p.academic.attendance), true)}
        ${compareRow('Materias pendientes', players.map(p => p.academic.subjectsPending), false, true)}
      </tbody>
    </table>
  `;

  requestAnimationFrame(() => {
    createComparisonRadarChart('cmpRadar', players);
    createComparisonDevChart('cmpDev', players);
  });
}

function compareRow(label, values, higherBetter, lowerBetter) {
  const best = lowerBetter ? Math.min(...values) : (higherBetter ? Math.max(...values) : null);
  return `<tr><td><strong>${label}</strong></td>${values.map(v => {
    const isWinner = best !== null && v === best && values.filter(x => x === best).length === 1;
    return `<td class="${isWinner ? 'winner' : ''}" style="font-family:var(--font-mono);">${v}</td>`;
  }).join('')}</tr>`;
}

// ===== FEATURE: PROMOTION PIPELINE =====
function renderPipeline() {
  const el = document.getElementById('view-pipeline');
  const candidates = [];

  DIVISION_ORDER.forEach(divId => {
    const threshold = PROMOTION_THRESHOLDS[divId];
    const players = getPlayersByDivision(divId).filter(p => p.rating >= threshold);
    players.forEach(p => {
      const idx = DIVISION_ORDER.indexOf(divId);
      const target = idx < DIVISION_ORDER.length - 1 ? DIVISION_ORDER[idx + 1] : 'Primera';
      candidates.push({ ...p, targetDiv: target });
    });
  });

  el.innerHTML = `
    <div class="page-header">
      <h1>Pipeline de Desarrollo</h1>
    </div>

    <div class="section-title">Flujo por División</div>
    <div class="pipeline-flow">
      ${DIVISION_ORDER.map((divId, i) => {
        const div = getDivisionById(divId);
        const players = getPlayersByDivision(divId).sort((a, b) => b.rating - a.rating);
        const threshold = PROMOTION_THRESHOLDS[divId];
        return `
          ${i > 0 ? '<div class="pipeline-arrow">→</div>' : ''}
          <div class="pipeline-column stagger-item">
            <div class="pipeline-column-header">
              <div class="pcl-name">${div ? div.name : divId}</div>
              <div class="pcl-count">${players.length} jugadores</div>
            </div>
            ${players.slice(0, 8).map(p => `
              <div class="pipeline-card ${p.rating >= threshold ? 'promotion-ready' : ''}" onclick="openPlayerProfile(${p.id})">
                <span class="pc-pos">${p.position}</span>
                <span class="pc-name">${p.name}</span>
                <span class="pc-rating">${p.rating}</span>
              </div>
            `).join('')}
          </div>
        `;
      }).join('')}
      <div class="pipeline-arrow">→</div>
      <div class="pipeline-column stagger-item" style="background:var(--river-red-light);border-color:var(--river-red-glow);">
        <div class="pipeline-column-header" style="border-color:var(--river-red);">
          <div class="pcl-name" style="color:var(--river-red);">Primera</div>
          <div class="pcl-count">Objetivo</div>
        </div>
        <div style="text-align:center;padding:1rem 0;color:var(--text-muted);font-size:0.78rem;">
          Destino final del desarrollo
        </div>
      </div>
    </div>

    ${candidates.length > 0 ? `
      <div class="promotion-section">
        <div class="section-title">Listos para Ascenso (${candidates.length})</div>
        <div class="promotion-grid">
          ${candidates.map(p => `
            <div class="promotion-candidate stagger-item" onclick="openPlayerProfile(${p.id})">
              <div class="promo-name">${p.name}</div>
              <div class="promo-detail">${p.positionFull} · ${p.division} · Rating: ${p.rating}</div>
              <div class="promo-badge">${p.division} → ${p.targetDiv}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

// ===== FEATURE: CONTRACT DASHBOARD =====
function renderContracts() {
  const el = document.getElementById('view-contracts');
  const sorted = [...PLAYERS].sort((a, b) => new Date(a.contractUntil) - new Date(b.contractUntil));
  const expThisYear = sorted.filter(p => new Date(p.contractUntil).getFullYear() <= 2026).length;
  const expSixMo = sorted.filter(p => contractMonthsRemaining(p.contractUntil) <= 6).length;
  const expTwelveMo = sorted.filter(p => contractMonthsRemaining(p.contractUntil) <= 12).length;
  const avgMonths = Math.round(sorted.reduce((s, p) => s + contractMonthsRemaining(p.contractUntil), 0) / sorted.length);

  // Max months for bar width calculation
  const maxMonths = Math.max(...sorted.map(p => contractMonthsRemaining(p.contractUntil)), 1);

  el.innerHTML = `
    <div class="page-header">
      <h1>Contratos</h1>
    </div>

    <div class="kpi-grid">
      <div class="kpi-card stagger-item">
        <div class="kpi-label">Vencen 2026</div>
        <div class="kpi-value ${expThisYear > 0 ? 'red' : ''}">${expThisYear}</div>
      </div>
      <div class="kpi-card stagger-item">
        <div class="kpi-label">< 6 Meses</div>
        <div class="kpi-value ${expSixMo > 0 ? 'red' : ''}">${expSixMo}</div>
      </div>
      <div class="kpi-card stagger-item">
        <div class="kpi-label">< 12 Meses</div>
        <div class="kpi-value ${expTwelveMo > 0 ? 'yellow' : ''}">${expTwelveMo}</div>
      </div>
      <div class="kpi-card stagger-item">
        <div class="kpi-label">Promedio Restante</div>
        <div class="kpi-value">${avgMonths}<span style="font-size:0.8rem;font-weight:400;color:var(--text-muted);"> meses</span></div>
      </div>
    </div>

    <div class="filter-bar">
      <select id="contractFilterDiv" onchange="filterContracts()">
        <option value="all">Todas las divisiones</option>
        ${getAllDivisionIds().map(d => `<option value="${d}">${d}</option>`).join('')}
      </select>
      <select id="contractFilterStatus" onchange="filterContracts()">
        <option value="all">Todos los estados</option>
        <option value="red">Crítico (< 6 meses)</option>
        <option value="yellow">Atención (6-12 meses)</option>
        <option value="green">OK (> 12 meses)</option>
      </select>
    </div>

    <div class="contract-timeline" id="contractTimeline">
      ${renderContractTimeline(sorted, maxMonths)}
    </div>
  `;
}

function renderContractTimeline(players, maxMonths) {
  const grouped = {};
  DIVISION_ORDER.forEach(d => grouped[d] = []);
  players.forEach(p => {
    if (grouped[p.division]) grouped[p.division].push(p);
  });

  return Object.entries(grouped).filter(([, ps]) => ps.length > 0).map(([divId, ps]) => `
    <div class="contract-timeline-group">
      <div class="contract-timeline-group-header">${divId} (${ps.length})</div>
      ${ps.map(p => {
        const months = contractMonthsRemaining(p.contractUntil);
        const status = contractStatus(p.contractUntil);
        const width = Math.max(5, (months / maxMonths) * 100);
        return `
          <div class="contract-timeline-row stagger-item">
            <div class="contract-timeline-name" onclick="openPlayerProfile(${p.id})">${p.name}</div>
            <div class="contract-bar-container">
              <div class="contract-bar ${status}" style="width:${width}%">${months}m</div>
            </div>
            <div class="contract-timeline-date">${formatDate(p.contractUntil)}</div>
          </div>
        `;
      }).join('')}
    </div>
  `).join('');
}

function filterContracts() {
  const div = document.getElementById('contractFilterDiv').value;
  const status = document.getElementById('contractFilterStatus').value;
  let filtered = [...PLAYERS].sort((a, b) => new Date(a.contractUntil) - new Date(b.contractUntil));
  if (div !== 'all') filtered = filtered.filter(p => p.division === div);
  if (status !== 'all') filtered = filtered.filter(p => contractStatus(p.contractUntil) === status);
  const maxMonths = Math.max(...filtered.map(p => contractMonthsRemaining(p.contractUntil)), 1);
  document.getElementById('contractTimeline').innerHTML = filtered.length
    ? renderContractTimeline(filtered, maxMonths)
    : '<div class="empty-state"><div class="es-icon">?</div><div class="es-text">No se encontraron contratos</div></div>';
}

// ===== FEATURE: PDF EXPORT =====
function exportPlayerPDF(playerId) {
  const p = PLAYERS.find(pl => pl.id === playerId);
  if (!p) return;

  const btn = document.querySelector('.export-pdf-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Generando...'; }

  const rep = getRepById(p.representative);
  const group = getPositionGroup(p.position);
  const ageGroup = getAgeGroup(p.age);
  const bench = BENCHMARKS[ageGroup] || BENCHMARKS["Sub-19"];
  const axes = RADAR_AXES[group];

  // Build off-screen container
  const container = document.createElement('div');
  container.className = 'pdf-container';
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:16px;border-bottom:3px solid #E2001A;">
      <div style="font-size:28px;font-weight:800;color:#E2001A;">CARP</div>
      <div style="flex:1;">
        <div style="font-size:20px;font-weight:700;">Reporte de Jugador</div>
        <div style="font-size:12px;color:#999;">Cantera River Plate · ${new Date().toLocaleDateString('es-AR')}</div>
      </div>
    </div>

    <div style="display:flex;gap:20px;margin-bottom:20px;">
      <div style="flex:1;">
        <div style="font-size:22px;font-weight:700;margin-bottom:4px;">${p.name}</div>
        <div style="font-size:14px;color:#E2001A;font-weight:600;margin-bottom:8px;">${p.positionFull} (${p.position})</div>
        <div style="font-size:12px;color:#555;line-height:1.8;">
          Edad: ${p.age} años · Nacimiento: ${formatDate(p.dob)}<br>
          Nacionalidad: ${p.nationality}<br>
          División: ${p.division} · #${p.number}<br>
          Contrato hasta: ${formatDate(p.contractUntil)} (${contractMonthsRemaining(p.contractUntil)} meses)
          ${rep ? `<br>Representante: ${rep.name} (${rep.agency})` : ''}
        </div>
      </div>
      <div style="text-align:center;padding:16px 24px;background:#f5f5f7;border-radius:12px;">
        <div style="font-size:42px;font-weight:800;color:#E2001A;font-family:'JetBrains Mono',monospace;">${p.rating}</div>
        <div style="font-size:10px;color:#999;text-transform:uppercase;">Rating</div>
      </div>
    </div>

    <div style="display:flex;gap:20px;margin-bottom:20px;">
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;margin-bottom:8px;">Perfil Técnico</div>
        <canvas id="pdfRadar" width="300" height="300"></canvas>
      </div>
      <div style="flex:1;">
        <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;margin-bottom:8px;">Evolución</div>
        <canvas id="pdfDev" width="360" height="200"></canvas>
      </div>
    </div>

    <div style="display:flex;gap:16px;margin-bottom:20px;">
      ${[
        { label: 'Velocidad', value: p.physical.speed, bench: bench.speed, unit: 'km/h' },
        { label: 'Distancia', value: p.physical.distance, bench: bench.distance, unit: 'km' },
        { label: 'Sprints', value: p.physical.sprints, bench: bench.sprints, unit: '/partido' }
      ].map(m => `
        <div style="flex:1;text-align:center;padding:12px;background:#f5f5f7;border-radius:8px;">
          <div style="font-size:10px;color:#999;text-transform:uppercase;">${m.label}</div>
          <div style="font-size:24px;font-weight:700;font-family:'JetBrains Mono',monospace;">${m.value}</div>
          <div style="font-size:10px;color:#999;">Benchmark: ${m.bench} ${m.unit}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-bottom:20px;">
      <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;margin-bottom:8px;">Seguimiento Académico</div>
      <div style="display:flex;gap:16px;font-size:12px;">
        <div><strong>Año:</strong> ${p.academic.schoolYear}</div>
        <div><strong>Aprobadas:</strong> ${p.academic.subjectsPassed}</div>
        <div><strong>Pendientes:</strong> ${p.academic.subjectsPending}</div>
        <div><strong>Asistencia:</strong> ${p.academic.attendance}%</div>
        <div><strong>Estado:</strong> ${getStatusLabel(p.academic.status)}</div>
      </div>
    </div>

    ${p.notes.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;margin-bottom:8px;">Notas</div>
        ${p.notes.map(n => `
          <div style="font-size:11px;color:#555;margin-bottom:6px;padding:6px 8px;background:#f5f5f7;border-radius:6px;border-left:3px solid rgba(226,0,26,0.2);">
            <span style="color:#999;">${formatDate(n.date)} · ${n.author}:</span> ${n.text}
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;

  document.body.appendChild(container);

  // Render charts in the PDF container
  const radarCanvas = container.querySelector('#pdfRadar');
  const devCanvas = container.querySelector('#pdfDev');
  const values = axes.map(a => p.radar[a] || 0);

  const pdfRadar = new Chart(radarCanvas, {
    type: 'radar',
    data: { labels: axes, datasets: [{ data: values, backgroundColor: 'rgba(226,0,26,0.12)', borderColor: '#E2001A', borderWidth: 2, pointBackgroundColor: '#E2001A', pointRadius: 3 }] },
    options: { ...radarOptions(), animation: false }
  });

  const pdfDev = new Chart(devCanvas, {
    type: 'line',
    data: { labels: ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'], datasets: [{ data: p.ratingHistory, borderColor: '#E2001A', backgroundColor: 'rgba(226,0,26,0.08)', fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#E2001A' }] },
    options: { ...lineOptions(p.ratingHistory), animation: false }
  });

  // Wait for charts to render, then capture
  setTimeout(() => {
    html2canvas(container, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(canvas => {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, Math.min(imgHeight, 297));
      const safeName = p.name.replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Reporte_${safeName}_${new Date().toISOString().slice(0, 10)}.pdf`);

      // Cleanup
      pdfRadar.destroy();
      pdfDev.destroy();
      document.body.removeChild(container);
      if (btn) { btn.disabled = false; btn.textContent = 'Exportar PDF'; }
    }).catch(() => {
      document.body.removeChild(container);
      if (btn) { btn.disabled = false; btn.textContent = 'Exportar PDF'; }
    });
  }, 600);
}
