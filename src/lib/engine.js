import { useEffect, useMemo, useState } from 'react';
import {
  DEVICE_DATABASE,
  GAME_MODES,
  PLAYSTYLES,
  TEST_STEPS,
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
  compareProfiles,
} from './lib/engine';

const initialProfile = {
  ...defaultProfile,
  device: DEVICE_DATABASE[0],
  weaponProfile: { ...WEAPON_PRESETS[1].weights },
};

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [searchTerm, setSearchTerm] = useState('realme c30');
  const [results, setResults] = useState(() => calculateCalibration(initialProfile));
  const [history, setHistory] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(window.localStorage.getItem('knight-sensi-history') || '[]');
    } catch {
      return [];
    }
  });
  const [feedback, setFeedback] = useState({});
  const [comparison, setComparison] = useState(null);

  const matches = useMemo(() => searchDevices(searchTerm), [searchTerm]);

  useEffect(() => {
    setResults(calculateCalibration(profile));
  }, [profile]);

  const applyDevice = (device) => {
    setProfile((current) => ({ ...current, device }));
    setSearchTerm(device.displayName || device.model || '');
  };

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const updatePlayer = (field, value) => {
    setProfile((current) => ({
      ...current,
      playerProfile: {
        ...current.playerProfile,
        [field]: Number(value),
      },
    }));
  };

  const updateWeapon = (field, value) => {
    setProfile((current) => ({
      ...current,
      weaponProfile: {
        ...current.weaponProfile,
        [field]: Number(value),
      },
    }));
  };

  const runCalibration = () => {
    const next = calculateCalibration(profile);
    setResults(next);
    const validation = validateProfile(profile);
    if (validation.valid) {
      const saved = JSON.parse(window.localStorage.getItem('knight-sensi-history') || '[]');
      const entry = {
        ...createProfileSummary(profile, next),
        timestamp: new Date().toISOString(),
      };
      const merged = [entry, ...saved].slice(0, 8);
      window.localStorage.setItem('knight-sensi-history', JSON.stringify(merged));
      setHistory(merged);
    }
  };

  const runComparison = () => {
    const reference = {
      ...initialProfile,
      device: DEVICE_DATABASE[0],
      weaponProfile: { ...WEAPON_PRESETS[1].weights },
      playerProfile: { ...initialProfile.playerProfile },
    };
    setComparison(compareProfiles(profile, reference));
  };

  const updateFeedback = (step, value) => {
    setFeedback((current) => ({ ...current, [step]: value }));
  };

  const analysis = generateAnalysis(profile, results);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">CALIBRATION LABORATORY</p>
          <h1>KNIGHT SENSI</h1>
        </div>
        <div className="status-pill">{results.overallConfidence}% overall confidence</div>
      </header>

      <main className="layout">
        <section className="panel form-panel" aria-label="Calibration inputs">
          <div className="section-header">
            <h2>Device model</h2>
          </div>

          <label className="field">
            <span>Device search</span>
            <input
              aria-label="Search device database"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>

          <div className="device-list" aria-live="polite">
            {matches.slice(0, 6).map((device) => (
              <button
                key={device.id}
                type="button"
                className={`device-card ${profile.device.id === device.id ? 'selected' : ''}`}
                onClick={() => applyDevice(device)}
              >
                <strong>{device.displayName}</strong>
                <small>{device.manufacturer}</small>
                <span>
                  {device.refreshRate} Hz • {device.dpi} DPI • {device.provenance}
                </span>
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
              <span>Refresh rate</span>
              <input type="number" value={profile.refreshRate} onChange={(event) => updateField('refreshRate', Number(event.target.value))} />
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
              <span>Screen size</span>
              <input type="number" step="0.1" value={profile.screenSize} onChange={(event) => updateField('screenSize', Number(event.target.value))} />
            </label>

            <label className="field">
              <span>Fire button</span>
              <select value={profile.fireButtonSize} onChange={(event) => updateField('fireButtonSize', event.target.value)}>
                <option value="SMALL">Small</option>
                <option value="MEDIUM">Medium</option>
                <option value="LARGE">Large</option>
                <option value="CUSTOM">Custom</option>
              </select>
            </label>
          </div>

          <div className="section-header">
            <h2>Player model</h2>
          </div>

          <div className="slider-grid">
            {Object.entries(PLAYSTYLES).map(([key, label]) => (
              <label className="field slider-field" key={key}>
                <span>{label}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={profile.playerProfile[key]}
                  onChange={(event) => updatePlayer(key, event.target.value)}
                />
                <small>{profile.playerProfile[key]}%</small>
              </label>
            ))}
          </div>

          <div className="section-header">
            <h2>Weapon model</h2>
          </div>

          <div className="slider-grid">
            {Object.entries(profile.weaponProfile).map(([key, value]) => (
              <label className="field slider-field" key={key}>
                <span>{key}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(event) => updateWeapon(key, event.target.value)}
                />
                <small>{value}%</small>
              </label>
            ))}
          </div>

          <div className="action-row">
            <button type="button" className="primary" onClick={runCalibration}>Run calibration</button>
            <button type="button" className="secondary" onClick={runComparison}>Compare baseline</button>
          </div>
        </section>

        <section className="panel output-panel" aria-label="Calibration output">
          <div className="section-header">
            <h2>Results</h2>
          </div>

          <div className="sensitivity-card">
            {Object.entries(results.sensitivity).map(([label, value]) => (
              <div key={label} className="sensitivity-row">
                <span>{label}</span>
                <strong>{Math.round(value)}</strong>
              </div>
            ))}
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <label>Calibration quality</label>
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

          {comparison && (
            <div className="analysis-box">
              <h3>Profile comparison</h3>
              <ul>
                <li>Profile similarity: {comparison.valueSimilarity}%</li>
                <li>Device similarity: {comparison.deviceSimilarity}%</li>
              </ul>
            </div>
          )}

          <div className="toolbar">
            <button type="button" onClick={() => exportProfileAsJson(profile, results)}>JSON</button>
            <button type="button" onClick={() => exportProfileAsText(profile, results)}>TXT</button>
            <button type="button" onClick={() => exportProfileAsPng(profile, results)}>PNG</button>
          </div>
        </section>
      </main>

      <section className="panel lab-panel">
        <div className="section-header">
          <h2>Test lab</h2>
        </div>

        <div className="lab-grid">
          {TEST_STEPS.map((step) => (
            <div key={step} className="lab-item">
              <label>{step}</label>
              <select value={feedback[step] || 'Neutral'} onChange={(event) => updateFeedback(step, event.target.value)}>
                <option value="Neutral">Neutral</option>
                <option value="Too slow">Too slow</option>
                <option value="Too fast">Too fast</option>
                <option value="Overshoot">Overshoot</option>
                <option value="Undershoot">Undershoot</option>
                <option value="Tracking difficulty">Tracking difficulty</option>
                <option value="Stable">Stable</option>
              </select>
            </div>
          ))}
        </div>
      </section>

      <section className="panel history-panel">
        <div className="section-header">
          <h2>Profile history</h2>
        </div>

        {history.length === 0 ? (
          <p className="empty-state">No saved profiles yet.</p>
        ) : (
          <div className="history-list">
            {history.map((entry, index) => (
              <div key={`${entry.timestamp}-${index}`} className="history-item">
                <div>
                  <strong>{entry.mode}</strong>
                  <small>{entry.device}</small>
                </div>
                <div>
                  <span>{entry.general}</span>
                  <small>{new Date(entry.timestamp).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;


