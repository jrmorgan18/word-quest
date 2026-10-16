import type { Curriculum } from '../data/types';
import { migrateState, MigrationError } from './migrations';
import { emptyWeekProgress, emptyWordProgress } from './seed';
import type { AppState } from './types';

export const BACKUP_APP_TAG = 'word-quest-backup';

export interface BackupFile {
  app: typeof BACKUP_APP_TAG;
  kind: 'full' | 'curriculum';
  exportedAt: string;
  schemaVersion: number;
  state?: AppState;
  curriculum?: Curriculum;
}

export function exportFull(state: AppState, now: number): string {
  const file: BackupFile = {
    app: BACKUP_APP_TAG,
    kind: 'full',
    exportedAt: new Date(now).toISOString(),
    schemaVersion: state.schemaVersion,
    state: { ...state, celebrations: [] },
  };
  return JSON.stringify(file, null, 2);
}

export function exportCurriculum(state: AppState, now: number): string {
  const file: BackupFile = {
    app: BACKUP_APP_TAG,
    kind: 'curriculum',
    exportedAt: new Date(now).toISOString(),
    schemaVersion: state.schemaVersion,
    curriculum: state.curriculum,
  };
  return JSON.stringify(file, null, 2);
}

export function parseBackup(json: string): BackupFile {
  let data: any;
  try {
    data = JSON.parse(json);
  } catch {
    throw new MigrationError('That file is not valid JSON.');
  }
  if (data?.app !== BACKUP_APP_TAG) throw new MigrationError('That file is not a Word Quest backup.');
  if (data.kind === 'full' && !data.state) throw new MigrationError('Backup is missing progress data.');
  if (data.kind === 'curriculum' && !data.curriculum) throw new MigrationError('Backup is missing curriculum data.');
  return data as BackupFile;
}

/** Full restore: replaces everything with the backup (after migrating it to the current schema). */
export function importFull(file: BackupFile, now: number): AppState {
  if (file.kind !== 'full' || !file.state) throw new MigrationError('This is not a full progress backup.');
  return migrateState(file.state, now);
}

/**
 * Curriculum-only import: replaces word content and week lists but keeps ALL learning history.
 * Imported words are marked customized so future bundled updates won't overwrite them. Mutates.
 */
export function importCurriculumInto(state: AppState, file: BackupFile): void {
  if (!file.curriculum?.words || !Array.isArray(file.curriculum.weeks)) throw new MigrationError('Backup is missing curriculum data.');
  const c = structuredClone(file.curriculum);
  for (const w of Object.values(c.words)) w.customized = true;
  // Keep words that have history but were dropped from the imported curriculum, so nothing is lost.
  for (const [id, w] of Object.entries(state.curriculum.words)) if (!c.words[id]) c.words[id] = w;
  c.version = Math.max(c.version ?? 0, state.curriculum.version);
  state.curriculum = c;
  for (const id of Object.keys(c.words)) state.wordProgress[id] ??= emptyWordProgress(id);
  for (const w of c.weeks) state.weekProgress[w.id] ??= emptyWeekProgress(w.id);
}
