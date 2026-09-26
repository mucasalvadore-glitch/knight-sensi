:root {
  --bg: #050b14;
  --bg-strong: #0d1725;
  --panel: rgba(11, 23, 36, 0.9);
  --panel-strong: rgba(16, 31, 46, 0.98);
  --border: rgba(122, 204, 255, 0.2);
  --muted: #a9bbca;
  --text: #edf6ff;
  --accent: #7dd3fc;
  --accent-strong: #67e8f9;
  --glow: rgba(125, 211, 252, 0.18);
  --success: #8ef3b7;
  --warning: #facc15;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  background: radial-gradient(circle at top, #0d1e31 0%, var(--bg) 36%, #030813 100%);
  color: var(--text);
  font-family: Inter, 'Segoe UI', sans-serif;
}

body {
  min-height: 100vh;
}

button, input, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: rgba(12, 23, 35, 0.94);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 20px 22px;
  box-shadow: 0 24px 60px rgba(6, 12, 20, 0.4);
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  color: var(--muted);
}

h1, h2, h3, p {
  margin: 0;
}

h1 {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  letter-spacing: 0.08em;
}

.status-pill {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid rgba(103, 232, 249, 0.25);
  background: rgba(103, 232, 249, 0.08);
  color: var(--accent-strong);
}

.layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 20px;
  margin-top: 22px;
}

.panel {
  background: rgba(12, 23, 35, 0.95);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
}

.section-header {
  margin-bottom: 14px;
}

.grid {
  display: grid;
  gap: 14px;
}

.grid.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field span {
  color: var(--muted);
  font-size: 0.8rem;
}

.slider-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.slider-field small {
  color: var(--muted);
}

input, select {
  width: 100%;
  min-height: 46px;
  border-radius: 12px;
  border: 1px solid rgba(125, 211, 252, 0.2);
  background: rgba(9, 20, 31, 0.92);
  color: var(--text);
  padding: 10px 12px;
}

input[type='range'] {
  min-height: 10px;
  padding: 0;
  accent-color: var(--accent);
}

.device-list {
  display: grid;
  gap: 12px;
  margin: 14px 0 20px;
}

.device-card {
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid rgba(125, 211, 252, 0.18);
  background: rgba(13, 25, 38, 0.8);
  color: var(--text);
}

.device-card.selected {
  border-color: rgba(125, 211, 252, 0.65);
  background: rgba(19, 34, 50, 0.95);
}

.device-card small,
.device-card span,
.history-item small,
.empty-state {
  color: var(--muted);
}

.action-row {
  display: flex;
  gap: 10px;
  margin-top: 18px;
}

.primary,
.secondary,
.toolbar button {
  border: 1px solid rgba(125, 211, 252, 0.2);
  border-radius: 12px;
  min-height: 46px;
  padding: 10px 16px;
  color: var(--text);
  background: linear-gradient(135deg, rgba(125, 211, 252, 0.18), rgba(103, 232, 249, 0.06));
}

.secondary {
  background: rgba(12, 27, 40, 0.9);
}

.primary {
  flex: 1;
  font-weight: 700;
}

.sensitivity-card {
  display: grid;
  gap: 8px;
  margin: 16px 0 20px;
}

.sensitivity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(11, 22, 35, 0.82);
  border: 1px solid rgba(125, 211, 252, 0.12);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 18px;
}

.stat-box {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  min-height: 88px;
  padding: 14px;
  border-radius: 12px;
  background: rgba(11, 22, 35, 0.82);
  border: 1px solid rgba(125, 211, 252, 0.12);
}

.stat-box label {
  font-size: 0.72rem;
  color: var(--muted);
}

.analysis-box {
  margin-top: 18px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(11, 22, 35, 0.82);
  border: 1px solid rgba(125, 211, 252, 0.12);
}

.analysis-box ul {
  margin: 12px 0 0;
  padding-left: 18px;
  color: var(--muted);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 18px;
}

.lab-panel,
.history-panel {
  margin-top: 22px;
}

.lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.lab-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
  background: rgba(11, 22, 35, 0.82);
  border: 1px solid rgba(125, 211, 252, 0.12);
}

.history-list {
  display: grid;
  gap: 10px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(11, 22, 35, 0.82);
  border: 1px solid rgba(125, 211, 252, 0.12);
}

.history-item > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

@media (max-width: 900px) {
  .layout,
  .slider-grid,
  .grid.two,
  .lab-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .app-shell {
    padding: 16px;
  }

  .topbar,
  .action-row,
  .history-item {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}

