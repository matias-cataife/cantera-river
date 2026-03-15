// ===== CHART.JS CONFIGURATIONS =====

let radarChartInstance = null;
let lineChartInstance = null;

function destroyCharts() {
  if (radarChartInstance) { radarChartInstance.destroy(); radarChartInstance = null; }
  if (lineChartInstance) { lineChartInstance.destroy(); lineChartInstance = null; }
}

function createRadarChart(canvasId, player) {
  const group = getPositionGroup(player.position);
  const axes = RADAR_AXES[group];
  const values = axes.map(a => player.radar[a] || 0);

  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: axes,
      datasets: [{
        label: player.name,
        data: values,
        backgroundColor: 'rgba(226, 0, 26, 0.12)',
        borderColor: '#E2001A',
        borderWidth: 2,
        pointBackgroundColor: '#E2001A',
        pointBorderColor: '#fff',
        pointBorderWidth: 1,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a1a',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'JetBrains Mono', size: 11 },
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            display: false
          },
          grid: {
            color: 'rgba(0,0,0,0.06)'
          },
          angleLines: {
            color: 'rgba(0,0,0,0.06)'
          },
          pointLabels: {
            font: { family: 'Inter', size: 11, weight: 500 },
            color: '#555'
          }
        }
      }
    }
  });
}

function createDevelopmentChart(canvasId, player) {
  const labels = ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'];
  const data = player.ratingHistory || [];

  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  lineChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Rating',
        data: data,
        borderColor: '#E2001A',
        backgroundColor: 'rgba(226, 0, 26, 0.08)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#E2001A',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1a1a1a',
          titleFont: { family: 'Inter', size: 12 },
          bodyFont: { family: 'JetBrains Mono', size: 12 },
          padding: 10,
          cornerRadius: 8,
          callbacks: {
            label: ctx => `Rating: ${ctx.parsed.y}`
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#999' }
        },
        y: {
          min: Math.max(0, Math.min(...data) - 10),
          max: Math.min(100, Math.max(...data) + 10),
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: {
            font: { family: 'JetBrains Mono', size: 11 },
            color: '#999',
            stepSize: 5
          }
        }
      }
    }
  });
}
