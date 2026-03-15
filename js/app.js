// ===== APP — ROUTING, STATE, INIT =====

let currentView = 'dashboard';

function navigateTo(viewId) {
  // Hide current view
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));

  // Show target view
  const target = document.getElementById(`view-${viewId}`);
  if (target) {
    target.classList.add('active');
  }

  // Highlight sidebar
  const navItem = document.querySelector(`.nav-links li[data-view="${viewId}"]`);
  if (navItem) navItem.classList.add('active');

  // Render view content
  switch (viewId) {
    case 'dashboard': renderDashboard(); break;
    case 'divisions': renderDivisions(); break;
    case 'players': renderPlayers(); break;
    case 'compare': renderCompare(); break;
    case 'pipeline': renderPipeline(); break;
    case 'contracts': renderContracts(); break;
    case 'academic': renderAcademic(); break;
    case 'representatives': renderRepresentatives(); break;
  }

  currentView = viewId;
  closePlayerProfile();

  // Save to localStorage
  try { localStorage.setItem('cantera_view', viewId); } catch {}
}

// ===== EVENT WIRING =====
function init() {
  // Sidebar navigation
  document.querySelectorAll('.nav-links li').forEach(li => {
    li.addEventListener('click', () => {
      const view = li.dataset.view;
      if (view) navigateTo(view);
    });
  });

  // Overlay close
  document.getElementById('overlayClose').addEventListener('click', closePlayerProfile);
  document.getElementById('overlayBackdrop').addEventListener('click', closePlayerProfile);

  // Keyboard: Escape to close overlay
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closePlayerProfile();
  });

  // Restore view from localStorage or default to dashboard
  let savedView = 'dashboard';
  try { savedView = localStorage.getItem('cantera_view') || 'dashboard'; } catch {}
  navigateTo(savedView);
}

document.addEventListener('DOMContentLoaded', init);
