// Small localStorage abstraction. Keeps every persistence detail (key names,
// JSON parsing, error handling) in one place instead of scattered across
// components.

const PREFIX = "ttt:";

export const STORAGE_KEYS = {
  players: `${PREFIX}players`,
  scores: `${PREFIX}scores`,
  theme: `${PREFIX}theme`,
  history: `${PREFIX}history`,
};

export function loadValue(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveValue(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail (private browsing, quota, etc). The game still
    // works in-memory for the session, so we fail silently.
  }
}

export function clearValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}
