/**
 * Schema versioning and curriculum migration.
 *
 *  - `migrateState` upgrades saved documents from older schema versions step by step, then
 *    `normalizeState` fills any missing fields with defaults (useful for hand-edited imports).
 *  - `mergeBundledCurriculum` brings in new bundled content (new words/weeks, refreshed text) while
 *    never touching progress and never overwriting parent-customized words or week lists.
 */
import { bundledCurriculum, CURRICULUM_VERSION } from '../data/curriculum';
import type { Curriculum } from '../data/types';
import { DEFAULT_CONFIG, DEFAULT_SETTINGS } from './config';
import { emptyWeekProgress, emptyWordProgress, SCENE_IDS } from './seed';
import { SCHEMA_VERSION, type AppState } from './types';

type AnyDoc = Record<string, any>;

/**
 * Ordered list of migrations. Key N upgrades a document from version N to N+1.
 * Add a new entry (and bump SCHEMA_VERSION) whenever the persisted shape changes.
 */
export const MIGRATIONS: Record<number, (doc: AnyDoc) => AnyDoc> = {
  // Version 0 = pre-release prototype documents without a schemaVersion field.
  0: (doc) => ({ ...doc, schemaVersion: 1, celebrations: doc.celebrations ?? [] }),
};

export class MigrationError extends Error {}

export function migrateState(doc: AnyDoc, now: number): AppState {
  if (!doc || typeof doc !== 'object') throw new MigrationError('Not a Word Quest save file.');
  let d: AnyDoc = { ...doc };
  let v = typeof d.schemaVersion === 'number' ? d.schemaVersion : 0;
  if (v > SCHEMA_VERSION) throw new MigrationError(`This save is from a newer version of Word Quest (schema ${v}).`);
  while (v < SCHEMA_VERSION) {
    const step = MIGRATIONS[v];
    if (!step) throw new MigrationError(`No migration from schema ${v}.`);
    d = step(d);
    v = d.schemaVersion;
  }
  const state = normalizeState(d, now);
  mergeBundledCurriculum(state);
  return state;
}

export function normalizeState(d: AnyDoc, now: number): AppState {
  if (!d.curriculum || !d.curriculum.words || !Array.isArray(d.curriculum.weeks)) {
    throw new MigrationError('Save file is missing its curriculum.');
  }
  const state: AppState = {
    schemaVersion: SCHEMA_VERSION,
    createdAt: typeof d.createdAt === 'number' ? d.createdAt : now,
    curriculum: d.curriculum,
    wordProgress: d.wordProgress ?? {},
    weekProgress: d.weekProgress ?? {},
    quizAttempts: Array.isArray(d.quizAttempts) ? d.quizAttempts : [],
    stickers: d.stickers ?? {},
    achievements: d.achievements ?? {},
    scenes: d.scenes ?? {},
    settings: { ...DEFAULT_SETTINGS, ...(d.settings ?? {}) },
    config: {
      ...structuredClone(DEFAULT_CONFIG),
      ...(d.config ?? {}),
      initial: { ...DEFAULT_CONFIG.initial, ...(d.config?.initial ?? {}) },
      delayed: { ...DEFAULT_CONFIG.delayed, ...(d.config?.delayed ?? {}) },
    },
    stats: { reviewsDone: 0, reviewsCorrect: 0, memoryMissions: 0, creativeDone: 0, ...(d.stats ?? {}) },
    celebrations: Array.isArray(d.celebrations) ? d.celebrations : [],
  };
  for (const id of Object.keys(state.curriculum.words)) {
    state.wordProgress[id] = { ...emptyWordProgress(id), ...(state.wordProgress[id] ?? {}) };
  }
  for (const w of state.curriculum.weeks) {
    state.weekProgress[w.id] = { ...emptyWeekProgress(w.id), ...(state.weekProgress[w.id] ?? {}) };
  }
  for (const id of SCENE_IDS) {
    const s = state.scenes[id];
    state.scenes[id] = { id, placements: Array.isArray(s?.placements) ? s.placements : [], updatedAt: s?.updatedAt ?? null };
  }
  return state;
}

/**
 * Merges the bundled curriculum into the saved one when the bundle is newer. Mutates.
 * Returns a summary for logging/tests.
 */
export function mergeBundledCurriculum(state: AppState, bundled: Curriculum = bundledCurriculum()): { added: string[]; updated: string[]; weeksAdded: string[] } {
  const summary = { added: [] as string[], updated: [] as string[], weeksAdded: [] as string[] };
  const saved = state.curriculum;
  if ((saved.version ?? 0) >= bundled.version) return summary;

  for (const [id, word] of Object.entries(bundled.words)) {
    const existing = saved.words[id];
    if (!existing) {
      saved.words[id] = structuredClone(word);
      summary.added.push(id);
    } else if (!existing.customized) {
      saved.words[id] = structuredClone(word);
      summary.updated.push(id);
    }
    state.wordProgress[id] ??= emptyWordProgress(id);
  }
  for (const week of bundled.weeks) {
    const existing = saved.weeks.find((w) => w.id === week.id);
    if (!existing) {
      saved.weeks.push(structuredClone(week));
      state.weekProgress[week.id] ??= emptyWeekProgress(week.id);
      summary.weeksAdded.push(week.id);
    } else if (!existing.custom) {
      // Refresh display text only; word lists may have been edited by a parent.
      existing.title = week.title;
      existing.tagline = week.tagline;
    }
  }
  saved.version = bundled.version;
  return summary;
}

export { CURRICULUM_VERSION };
