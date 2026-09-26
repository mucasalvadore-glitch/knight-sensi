:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  color: #f4f7fb;
  background: #07111d;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: dark;
  --bg: #07111d;
  --panel: rgba(9, 19, 32, 0.9);
  --panel-alt: rgba(15, 26, 39, 0.9);
  --border: rgba(125, 211, 252, 0.24);
  --accent: #7dd3fc;
  --accent-2: #67e8f9;
  --muted: #9eb7c7;
  --success: #8ef3b7;
  --warning: #facc15;
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  background: radial-gradient(circle at top, #0f1d2d 0%, var(--bg) 45%, #020a14 100%);
}

body {
  min-height: 100vh;
  color: var(--fg);
}

button, input, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 20px;
  padding: 18px 22px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: rgba(14, 24, 37, 0.9);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.eyebrow {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  color: var(--muted);
}

h1, h2, h3, p {
  margin: 0;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.25rem);
  letter-spacing: 0.08em;
}

.status-pill {
  padding: 10px 14px;
  border-radius: 999px;
  color: var(--accent-2);
  border: 1px solid rgba(103, 232, 249, 0.3);
  background: rgba(103, 232, 249, 0.06);
}

.layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 20px;
}

.panel {
  padding: 20px;
  border-radius: 20px;
  background: var(--panel);
  border: 1px solid var(--border);
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.12);
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
  margin-bottom: 12px;
}

.field span {
  color: var(--muted);
  font-size: 0.85rem;
}

input, select {
  width: 100%;
  min-height: 44px;
  border: 1px solid rgba(125, 211, 252, 0.25);
  background: rgba(13, 25, 38, 0.9);
  border-radius: 12px;
  padding: 10px 12px;
  color: white;
}

input[type='range'] {
  min-height: 8px;
  padding: 0;
}

.device-list {
  display: grid;
  gap: 12px;
  margin: 12px 0 18px;
}

.device-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  text-align: left;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(125, 211, 252, 0.2);
  background: rgba(11, 22, 35, 0.75);
  color: white;
}

.device-card.selected {
  border-color: rgba(125, 211, 252, 0.7);
  box-shadow: inset 0 0 0 1px rgba(125, 211, 252, 0.5);
}

.device-card small, .device-card span {
  color: var(--muted);
}

.primary,
.toolbar button,
.lab-item select {
  border-radius: 12px;
  border: 1px solid rgba(125, 211, 252, 0.2);
  background: linear-gradient(135deg, rgba(125, 211, 252, 0.18), rgba(103, 232, 249, 0.08));
  color: white;
  min-height: 44px;
  padding: 10px 16px;
}

.primary {
  margin-top: 12px;
  width: 100%;
  font-weight: 700;
}

.sensitivity-card {
  margin: 18px 0;
  display: grid;
  gap: 10px;
}

.sensitivity-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(11, 22, 35, 0.8);
  border: 1px solid rgba(125, 211, 252, 0.15);
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
  gap: 4px;
  min-height: 92px;
  justify-content: center;
  padding: 14px;
  border-radius: 14px;
  background: rgba(11, 22, 35, 0.8);
  border: 1px solid rgba(125, 211, 252, 0.15);
}

.stat-box label {
  color: var(--muted);
  font-size: 0.75rem;
}

.analysis-box {
  margin-top: 18px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(11, 22, 35, 0.8);
  border: 1px solid rgba(125, 211, 252, 0.15);
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

.lab-panel {
  margin-top: 20px;
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
  background: rgba(11, 22, 35, 0.8);
  border: 1px solid rgba(125, 211, 252, 0.15);
}

.history-panel {
  margin-top: 20px;
}

.history-list {
  display: grid;
  gap: 10px;
}

.history-item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 10px;
  background: rgba(11, 22, 35, 0.8);
}

@media (max-width: 900px) {
  .layout,
  .grid.two,
  .lab-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .app-shell {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto;
    transition: none !important;
  }
}
