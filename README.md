import { describe, expect, it } from 'vitest';
import {
  DEVICE_DATABASE,
  calculateCalibration,
  compareProfiles,
  searchDevices,
  validateImportedProfile,
  validateProfile,
} from './engine';

describe('device search', () => {
  it('finds Realme C30 by alias and model number', () => {
    expect(searchDevices('c30')).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'realme-c30' })]));
    expect(searchDevices('realme entry 60hz')).toEqual(expect.arrayContaining([expect.objectContaining({ id: 'realme-c30' })]));
  });
});

describe('profile validation', () => {
  it('accepts a valid profile with positive numbers', () => {
    const valid = validateProfile({
      device: DEVICE_DATABASE[0],
      currentDpi: 360,
      targetDpi: 360,
      refreshRate: 60,
      screenSize: 6.5,
      weaponProfile: { SMG: 25, AR: 25, SHOTGUN: 15, SNIPER: 15, DMR: 10, PISTOL: 10, MELEE: 0 },
    });
    expect(valid.valid).toBe(true);
  });

  it('rejects invalid inputs', () => {
    const invalid = validateProfile({
      device: null,
      currentDpi: 0,
      targetDpi: -1,
      refreshRate: 0,
      screenSize: 0,
      weaponProfile: { SMG: 0, AR: 0 },
    });
    expect(invalid.valid).toBe(false);
  });
});

describe('calibration engine', () => {
  it('returns a stable multi-sensitivity vector for a Realme C30 profile', () => {
    const result = calculateCalibration({
      device: DEVICE_DATABASE[0],
      gameMode: 'Free Fire Normal',
      currentDpi: 360,
      targetDpi: 360,
      refreshRate: 60,
      screenSize: 6.5,
      fireButtonSize: 'MEDIUM',
      playerProfile: { rush: 70, balanced: 65, tactical: 40, precision: 52, tracking: 60, dragShot: 80, oneTap: 55 },
      weaponProfile: { SMG: 30, AR: 25, SHOTGUN: 20, SNIPER: 10, DMR: 10, PISTOL: 5, MELEE: 0 },
    });

    expect(result.sensitivity.General).toBeGreaterThan(0);
    expect(result.sensitivity['Sniper/AWM']).toBeLessThan(result.sensitivity.General);
    expect(result.overallConfidence).toBeGreaterThan(0);
    expect(result.robustness.neighborhood).toHaveLength(7);
  });
});

describe('comparison and import validation', () => {
  it('supports profile comparison and import schema checks', () => {
    const pair = compareProfiles(
      {
        device: DEVICE_DATABASE[0],
        gameMode: 'Free Fire Normal',
        currentDpi: 360,
        targetDpi: 360,
        refreshRate: 60,
        screenSize: 6.5,
        fireButtonSize: 'MEDIUM',
        playerProfile: { rush: 60, balanced: 70, tactical: 40, precision: 55, tracking: 65, dragShot: 75, oneTap: 50 },
        weaponProfile: { SMG: 35, AR: 25, SHOTGUN: 20, SNIPER: 10, DMR: 5, PISTOL: 5, MELEE: 0 },
      },
      {
        device: DEVICE_DATABASE[0],
        gameMode: 'Free Fire Normal',
        currentDpi: 360,
        targetDpi: 360,
        refreshRate: 60,
        screenSize: 6.5,
        fireButtonSize: 'MEDIUM',
        playerProfile: { rush: 60, balanced: 70, tactical: 40, precision: 55, tracking: 65, dragShot: 75, oneTap: 50 },
        weaponProfile: { SMG: 35, AR: 25, SHOTGUN: 20, SNIPER: 10, DMR: 5, PISTOL: 5, MELEE: 0 },
      },
    );

    expect(pair.valueSimilarity).toBeGreaterThan(90);

    const imported = validateImportedProfile({
      device: { displayName: 'Realme C30' },
      currentDpi: 360,
      targetDpi: 360,
      refreshRate: 60,
      sensitivity: { General: 120 },
    });
    expect(imported.valid).toBe(true);
  });
});

