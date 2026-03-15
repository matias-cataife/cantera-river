// ===== CHART.JS CONFIGURATIONS =====

let radarChartInstance = null;
let lineChartInstance = null;
let comparisonRadarInstance = null;
let comparisonLineInstance = null;
let physicalChartInstances = [];

function destroyCharts() {
  if (radarChartInstance) { radarChartInstance.destroy(); radarChartInstance = null; }
  if (lineChartInstance) { lineChartInstance.destroy(); lineChartInstance = null; }
  destroyPhysicalCharts();
}

function destroyComparisonCharts() {
  if (comparisonRadarInstance) { comparisonRadarInstance.destroy(); comparisonRadarInstance = null; }
  if (comparisonLineInstance) { comparisonLineInstance.destroy(); comparisonLineInstance = null; }
}

function destroyPhysicalCharts() {
  physicalChartInstances.forEach(c => c.destroy());
  physicalChartInstances = [];
}

// ===== SINGLE PLAYER RADAR =====
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
    options: radarOptions()
  });
}

// ===== SINGLE PLAYER DEV CHART =====
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
    options: lineOptions(data)
  });
}

// ===== COMPARISON RADAR (multi-player) =====
function createComparisonRadarChart(canvasId, players) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  // Use first player's position group for axes; warn if mixed
  const group = getPositionGroup(players[0].position);
  const axes = RADAR_AXES[group];

  const datasets = players.map((p, i) => {
    const color = COMPARE_COLORS[i];
    const pGroup = getPositionGroup(p.position);
    const pAxes = RADAR_AXES[pGroup];
    return {
      label: p.name,
      data: axes.map(a => {
        if (p.radar[a] !== undefined) return p.radar[a];
        const idx = pAxes.indexOf(a);
        return idx >= 0 ? Object.values(p.radar)[idx] || 0 : 0;
      }),
      backgroundColor: color.bg,
      borderColor: color.border,
      borderWidth: 2,
      pointBackgroundColor: color.point,
      pointBorderColor: '#fff',
      pointBorderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 6
    };
  });

  comparisonRadarInstance = new Chart(ctx, {
    type: 'radar',
    data: { labels: axes, datasets },
    options: {
      ...radarOptions(),
      plugins: {
        legend: { display: true, position: 'bottom', labels: { font: { family: 'Inter', size: 11 }, padding: 15, usePointStyle: true } },
        tooltip: { backgroundColor: '#1a1a1a', titleFont: { family: 'Inter', size: 12 }, bodyFont: { family: 'JetBrains Mono', size: 11 }, padding: 10, cornerRadius: 8 }
      }
    }
  });
}

// ===== COMPARISON DEV CHART (multi-player) =====
function createComparisonDevChart(canvasId, players) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const labels = ['Oct', 'Nov', 'Dic', 'Ene', 'Feb', 'Mar'];
  const allData = players.flatMap(p => p.ratingHistory || []);

  const datasets = players.map((p, i) => {
    const color = COMPARE_COLORS[i];
    return {
      label: p.name,
      data: p.ratingHistory || [],
      borderColor: color.border,
      backgroundColor: color.bg,
      fill: false,
      tension: 0.4,
      pointBackgroundColor: color.point,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7
    };
  });

  comparisonLineInstance = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      ...lineOptions(allData),
      plugins: {
        legend: { display: true, position: 'bottom', labels: { font: { family: 'Inter', size: 11 }, padding: 15, usePointStyle: true } },
        tooltip: { backgroundColor: '#1a1a1a', titleFont: { family: 'Inter', size: 12 }, bodyFont: { family: 'JetBrains Mono', size: 12 }, padding: 10, cornerRadius: 8 }
      }
    }
  });
}

// ===== PHYSICAL EVOLUTION CHART =====
function createPhysicalEvoChart(canvasId, player, metric, label, unit, benchmarkValue, comparePlayer) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  const history = player.physicalHistory || [];
  const labels = history.map(h => h.month);
  const data = history.map(h => h[metric]);

  const datasets = [{
    label: player.name,
    data: data,
    borderColor: '#E2001A',
    backgroundColor: 'rgba(226,0,26,0.06)',
    fill: true,
    tension: 0.4,
    pointRadius: 3,
    pointHoverRadius: 5,
    pointBackgroundColor: '#E2001A'
  }];

  // Benchmark line
  if (benchmarkValue) {
    datasets.push({
      label: 'Benchmark',
      data: Array(12).fill(benchmarkValue),
      borderColor: '#999',
      borderDash: [5, 5],
      borderWidth: 1,
      pointRadius: 0,
      fill: false
    });
  }

  // Compare player overlay
  if (comparePlayer && comparePlayer.physicalHistory) {
    const cData = comparePlayer.physicalHistory.map(h => h[metric]);
    datasets.push({
      label: comparePlayer.name,
      data: cData,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.06)',
      fill: false,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: '#3b82f6'
    });
  }

  const allVals = datasets.flatMap(d => d.data).filter(v => typeof v === 'number');

  const chart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: datasets.length > 1, position: 'bottom', labels: { font: { family: 'Inter', size: 10 }, padding: 8, usePointStyle: true } },
        tooltip: { backgroundColor: '#1a1a1a', bodyFont: { family: 'JetBrains Mono', size: 11 }, padding: 8, cornerRadius: 6, callbacks: { label: c => `${c.dataset.label}: ${c.parsed.y} ${unit}` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 9 }, color: '#999', maxRotation: 45 } },
        y: {
          min: Math.max(0, Math.min(...allVals) - 2),
          max: Math.max(...allVals) + 2,
          grid: { color: 'rgba(0,0,0,0.04)' },
          ticks: { font: { family: 'JetBrains Mono', size: 10 }, color: '#999' }
        }
      }
    }
  });

  physicalChartInstances.push(chart);
}

// ===== SHARED OPTIONS =====
function radarOptions() {
  return {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1a1a1a', titleFont: { family: 'Inter', size: 12 }, bodyFont: { family: 'JetBrains Mono', size: 11 }, padding: 10, cornerRadius: 8 }
    },
    scales: {
      r: {
        beginAtZero: true, suggestedMin: 0, suggestedMax: 100,
        ticks: { stepSize: 20, display: false },
        grid: { color: 'rgba(0,0,0,0.06)' },
        angleLines: { color: 'rgba(0,0,0,0.06)' },
        pointLabels: { font: { family: 'Inter', size: 11, weight: 500 }, color: '#555' }
      }
    }
  };
}

function lineOptions(data) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#1a1a1a', titleFont: { family: 'Inter', size: 12 }, bodyFont: { family: 'JetBrains Mono', size: 12 }, padding: 10, cornerRadius: 8, callbacks: { label: ctx => `Rating: ${ctx.parsed.y}` } }
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: 'Inter', size: 11 }, color: '#999' } },
      y: {
        min: Math.max(0, Math.min(...data) - 10),
        max: Math.min(100, Math.max(...data) + 10),
        grid: { color: 'rgba(0,0,0,0.04)' },
        ticks: { font: { family: 'JetBrains Mono', size: 11 }, color: '#999', stepSize: 5 }
      }
    }
  };
}
