import { beforeEach, describe, expect, it } from 'vitest';
import { bundledCurriculum } from '../../data/curriculum';
import { _resetDbConnection, clearDoc, loadDoc, saveDoc } from '../../persistence/db';
import { exportCurriculum, exportFull, importCurriculumInto, importFull, parseBackup } from '../backup';
import { mergeBundledCurriculum, migrateState } from '../migrations';
import { parentUpdateWord } from '../parent';
import { placeSticker, moveSticker, removePlacement, resizeSticker, resetScene, restack } from '../scenes';
import { freshState, passQuiz, practiceWeek, T0, HOUR } from './helpers';

describe('sticker placement', () => {
  it('only allows owned stickers and never consumes them', () => {
    const s = freshState();
    expect(placeSticker(s, 'dino', 'stk-persistent', 0.5, 0.5, T0)).toBeNull();
    const a = placeSticker(s, 'dino', 'stk-peculiar', 0.2, 0.3, T0)!;
    const b = placeSticker(s, 'dino', 'stk-peculiar', 0.6, 0.7, T0)!;
    expect(s.scenes.dino.placements).toHaveLength(2);
    moveSticker(s, 'dino', a, 1.5, -1, T0);
    expect(s.scenes.dino.placements[0]).toMatchObject({ x: 1, y: 0 });
    resizeSticker(s, 'dino', a, 10, T0);
    expect(s.scenes.dino.placements[0].scale).toBe(3);
    const layerA = s.scenes.dino.placements[0].layer;
    restack(s, 'dino', a, 1, T0);
    expect(s.scenes.dino.placements[0].layer).toBeGreaterThan(layerA);
    removePlacement(s, 'dino', b, T0);
    expect(s.scenes.dino.placements).toHaveLength(1);
    expect(s.stickers['stk-peculiar']).toBeDefined();
    resetScene(s, 'dino', T0);
    expect(s.scenes.dino.placements).toHaveLength(0);
    expect(s.stickers['stk-peculiar']).toBeDefined();
  });
});

describe('IndexedDB persistence', () => {
  beforeEach(async () => {
    _resetDbConnection();
    await clearDoc();
  });

  it('saves and reloads progress and sticker placements', async () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    placeSticker(s, 'space', 'stk-astonished', 0.4, 0.6, T0, 1.5);
    await saveDoc(s);
    _resetDbConnection();
    const loaded = migrateState((await loadDoc()) as any, T0 + HOUR);
    expect(loaded.scenes.space.placements).toHaveLength(1);
    expect(loaded.scenes.space.placements[0]).toMatchObject({ stickerId: 'stk-astonished', x: 0.4, y: 0.6, scale: 1.5 });
    expect(loaded.wordProgress.persistent.exploredAt).toBe(T0);
    expect(loaded).toEqual(s);
  });
});

describe('export / import', () => {
  it('round-trips full progress', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    s.celebrations = [];
    placeSticker(s, 'arcade', 'stk-anticipate', 0.1, 0.9, T0);
    const restored = importFull(parseBackup(exportFull(s, T0)), T0 + HOUR);
    expect(restored).toEqual(s);
  });

  it('rejects files that are not Word Quest backups', () => {
    expect(() => parseBackup('{"hello":1}')).toThrow(/not a Word Quest backup/);
    expect(() => parseBackup('nope')).toThrow(/not valid JSON/);
  });

  it('imports curriculum only, keeping all learning history', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    const other = freshState();
    parentUpdateWord(other, 'persistent', { definition: 'Never giving up' });
    importCurriculumInto(s, parseBackup(exportCurriculum(other, T0)));
    expect(s.curriculum.words.persistent.definition).toBe('Never giving up');
    expect(s.wordProgress.persistent.exploredAt).toBe(T0);
    expect(s.stickers['stk-peculiar']).toBeDefined();
  });
});

describe('migrations', () => {
  it('upgrades a schema-0 document and fills missing fields', () => {
    const s = freshState() as any;
    const old = { ...s };
    delete old.schemaVersion;
    delete old.stats;
    delete old.celebrations;
    delete old.scenes;
    const m = migrateState(old, T0);
    expect(m.schemaVersion).toBe(1);
    expect(m.stats.reviewsDone).toBe(0);
    expect(m.scenes.dino.placements).toEqual([]);
  });

  it('refuses documents from a newer schema', () => {
    expect(() => migrateState({ ...freshState(), schemaVersion: 999 }, T0)).toThrow(/newer version/);
  });

  it('merges a newer bundled curriculum without losing progress or parent edits', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    parentUpdateWord(s, 'persistent', { definition: 'Parent version' });
    const progressBefore = structuredClone(s.wordProgress);
    const stickersBefore = structuredClone(s.stickers);

    const next = bundledCurriculum();
    next.version = 2;
    next.words.anticipate.definition = 'Updated bundled definition';
    next.words.persistent.definition = 'Bundled version should NOT win';
    next.words.brave = { ...next.words.cautious, id: 'brave', text: 'Brave', week: 11, stickerId: 'stk-brave' };
    next.weeks.push({ id: 'week-11', number: 11, title: 'Dragon Peak', theme: 'dino', tagline: 'x', wordIds: ['brave'], rewardStickerId: 'stk-week-11' });

    const summary = mergeBundledCurriculum(s, next);
    expect(summary.added).toEqual(['brave']);
    expect(summary.weeksAdded).toEqual(['week-11']);
    expect(s.curriculum.words.anticipate.definition).toBe('Updated bundled definition');
    expect(s.curriculum.words.persistent.definition).toBe('Parent version');
    for (const [id, p] of Object.entries(progressBefore)) expect(s.wordProgress[id]).toEqual(p);
    expect(s.stickers).toEqual(stickersBefore);
    expect(s.weekProgress['week-11'].unlocked).toBe(false);
    expect(s.curriculum.version).toBe(2);
    // Merging again is a no-op.
    expect(mergeBundledCurriculum(s, next).added).toEqual([]);
  });
});
