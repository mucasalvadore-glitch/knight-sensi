import { useMemo, useState } from 'react';
import {
  DEVICE_DATABASE,
  GAME_MODES,
  PLAYSTYLES,
  WEAPON_PRESETS,
  defaultProfile,
  searchDevices,
  calculateCalibration,
  validateProfile,
  generateAnalysis,
  exportProfileAsJson,
  exportProfileAsText,
  exportProfileAsPng,
  createProfileSummary,
} from './lib/engine';

const testLabTemplate = [
  'Training test',
  'Close-range test',
  'Mid-range test',
  'Long-range test',
  'Tracking test',
  'Drag-shot test',
  'One-tap test',
  'Weapon-switch test',
  'Movement test',
  'Stability test',
];

const initialProfile = {
  ...defaultProfile,
  device: DEVICE_DATABASE[0],
  weaponProfile: { ...WEAPON_PRESETS[1].weights },
};

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [searchQuery, setSearchQuery] = useState('realme c30');
  const [results, setResults] = useState(() => calculateCalibration(initialProfile));
  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('knight-sensi-history') || '[]');
  });
  const [feedback, setFeedback] = useState({});

  const matches = useMemo(() => searchDevices(searchQuery), [searchQuery]);

  const setDevice = (device) => {
    setProfile((current) => ({ ...current, device }));
    setSearchQuery(device.displayName || device.model);
  };

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updateWeaponField = (field, value) => {
    setProfile((current) => ({
      ...current,
      weaponProfile: {
        ...current.weaponProfile,
        [field]: Number(value),
      },
    }));
  };

  const updatePlaystyle = (field, value) => {
    setProfile((current) => ({
      ...current,
      playerProfile: {
        ...current.playerProfile,
        [field]: Number(value),
      },
    }));
  };

  const handleCalculate = () => {
    const next = calculateCalibration(profile);
    setResults(next);
    const validation = validateProfile(profile);
    if (validation.valid) {
      const saved = JSON.parse(localStorage.getItem('knight-sensi-history') || '[]');
      const entry = {
        ...createProfileSummary(profile, next),
        timestamp: new Date().toISOString(),
      };
      const custom = [entry, ...saved].slice(0, 8);
      localStorage.setItem('knight-sensi-history', JSON.stringify(custom));
      setHistory(custom);
    }
  };

  const addFeedback = (step, value) => {
    setFeedback((current) => ({
      ...current,
      [step]: value,
    }));
  };

  const exportJson = () => {
    exportProfileAsJson(profile, results);
  };

  const exportText = () => {
    exportProfileAsText(profile, results);
  };

  const exportPng = () => {
    exportProfileAsPng(profile, results);
  };

  const analysis = generateAnalysis(profile, results);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">CALIBRATION LABORATORY</p>
          <h1>KNIGHT SENSI</h1>
        </div>
        <div className="status-pill">{results.overallConfidence}% confidence</div>
      </header>

      <main className="layout">
        <section className="panel form-panel">
          <div className="section-header">
            <h2>Device model</h2>
          </div>

          <label className="field">
            <span>Search device</span>
            <input
              aria-label="Search device database"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          <div className="device-list" aria-live="polite">
            {matches.slice(0, 5).map((device) => (
              <button
                key={device.id}
                type="button"
                className={`device-card ${profile.device.id === device.id ? 'selected' : ''}`}
                onClick={() => setDevice(device)}
              >
                <strong>{device.displayName}</strong>
                <small>{device.manufacturer}</small>
                <span>{device.refreshRate} Hz • {device.dpi} DPI</span>
              </button>
            ))}
          </div>

          <div className="grid two">
            <label className="field">
              <span>Game mode</span>
              <select value={profile.gameMode} onChange={(event) => updateField('gameMode', event.target.value)}>
                {GAME_MODES.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Current DPI</span>
              <input type="number" value={profile.currentDpi} onChange={(event) => updateField('currentDpi', Number(event.target.value))} />
            </label>

            <label className="field">
              <span>Target DPI</span>
              <input type="number" value={profile.targetDpi} onChange={(event) => updateField('targetDpi', Number(event.target.value))} />
            </label>

            <label className="field">
              <span>Refresh rate</span>
              <input type="number" value={profile.refreshRate} onChange={(event) => updateField('refreshRate', Number(event.target.value))} />
            </label>

            <label className="field">
              <span>Screen size</span>
              <input type="number" step="0.1" value={profile.screenSize} onChange={(event) => updateField('screenSize', Number(event.target.value))} />
            </label>

            <label className="field">
              <span>Fire button size</span>
              <select value={profile.fireButtonSize} onChange={(event) => updateField('fireButtonSize', event.target.value)}>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </label>
          </div>

          <div className="section-header">
            <h2>Player profile</h2>
          </div>

          <div className="grid two">
            {Object.entries(PLAYSTYLES).map(([key, label]) => (
              <label className="field" key={key}>
                <span>{label}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={profile.playerProfile[key]}
                  onChange={(event) => updatePlaystyle(key, event.target.value)}
                />
                <small>{profile.playerProfile[key]}%</small>
              </label>
            ))}
          </div>

          <div className="section-header">
            <h2>Weapon profile</h2>
          </div>

          <div className="grid two">
            {Object.entries(profile.weaponProfile).map(([key, value]) => (
              <label className="field" key={key}>
                <span>{key}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(event) => updateWeaponField(key, event.target.value)}
                />
                <small>{value}%</small>
              </label>
            ))}
          </div>

          <button className="primary" type="button" onClick={handleCalculate}>
            Run calibration
          </button>
        </section>

        <section className="panel output-panel">
          <div className="section-header">
            <h2>Calibration result</h2>
          </div>

          <div className="sensitivity-card">
            {Object.entries(results.sensitivity).map(([key, value]) => (
              <div key={key} className="sensitivity-row">
                <span>{key}</span>
                <strong>{Math.round(value)}</strong>
              </div>
            ))}
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <label>Calibration confidence</label>
              <strong>{results.overallConfidence}%</strong>
            </div>
            <div className="stat-box">
              <label>Robustness</label>
              <strong>{results.robustness.localStability}%</strong>
            </div>
            <div className="stat-box">
              <label>Device confidence</label>
              <strong>{results.deviceConfidence}%</strong>
            </div>
            <div className="stat-box">
              <label>Model confidence</label>
              <strong>{results.modelConfidence}%</strong>
            </div>
          </div>

          <div className="analysis-box">
            <h3>Why these values</h3>
            <ul>
              {analysis.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="analysis-box">
            <h3>Double check</h3>
            <ul>
              {analysis.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>

          <div className="toolbar">
            <button type="button" onClick={exportJson}>Export JSON</button>
            <button type="button" onClick={exportText}>TXT</button>
            <button type="button" onClick={exportPng}>PNG card</button>
          </div>
        </section>
      </main>

      <section className="panel lab-panel">
        <div className="section-header">
          <h2>Test lab</h2>
        </div>

        <div className="lab-grid">
          {testLabTemplate.map((step) => (
            <div key={step} className="lab-item">
              <label>{step}</label>
              <select value={feedback[step] || 'Neutral'} onChange={(event) => addFeedback(step, event.target.value)}>
                <option value="Neutral">Neutral</option>
                <option value="Too slow">Too slow</option>
                <option value="Too fast">Too fast</option>
                <option value="Overshoot">Overshoot</option>
                <option value="Tracking difficulty">Tracking difficulty</option>
                <option value="Stable">Stable</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="panel history-panel">
        <div className="section-header">
          <h2>History</h2>
        </div>

        {history.length === 0 ? (
          <p>No saved profiles yet.</p>
        ) : (
          <div className="history-list">
            {history.map((entry, index) => (
              <div key={`${entry.timestamp}-${index}`} className="history-item">
                <strong>{entry.mode}</strong>
                <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                <small>{entry.device}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
