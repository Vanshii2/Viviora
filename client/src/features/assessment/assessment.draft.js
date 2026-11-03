/**
 * Temporary draft so answers survive a refresh or accidental navigation within the same tab.
 * PRIVACY: only non-medical sections are kept, in sessionStorage (cleared when the tab closes).
 * Body measurements and health answers are never stored in the browser.
 */
const KEY = 'viviora.assessmentDraft.v1';
const KEPT_SECTIONS = ['personal', 'child', 'nutrition', 'lifestyle', 'goals'];

export function loadDraft(program) {
  try {
    const draft = JSON.parse(sessionStorage.getItem(KEY) ?? 'null');
    return draft && draft.program === program ? draft.values : null;
  } catch {
    return null;
  }
}

export function saveDraft(program, values) {
  try {
    const kept = Object.fromEntries(KEPT_SECTIONS.map((section) => [section, values[section]]));
    sessionStorage.setItem(KEY, JSON.stringify({ program, values: kept }));
  } catch {
    /* storage unavailable (private mode) — draft simply isn't kept */
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
