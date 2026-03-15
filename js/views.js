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
      <div class="profile-rating">
        <div class="profile-rating-value">${p.rating}</div>
        <div class="profile-rating-label">Rating</div>
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
  });
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
