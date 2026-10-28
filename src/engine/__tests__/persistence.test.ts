import { beforeEach, describe, expect, it } from 'vitest';
import { bundledCurriculum } from '../../data/curriculum';
import { _resetDbConnection, clearDoc, loadDoc, saveDoc } from '../../persistence/db';
import { exportCurriculum, exportFull, importCurriculumInto, importFull, parseBackup } from '../backup';
import { mergeBundledCurriculum, migrateState } from '../migrations';
import { parentAddWeek, parentMarkWeekComplete, parentUpdateWord } from '../parent';
import { currentWeek } from '../progress';
import type { AppState } from '../types';
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
    next.version = s.curriculum.version + 1;
    next.words.anticipate.definition = 'Updated bundled definition';
    next.words.persistent.definition = 'Bundled version should NOT win';
    next.words.brave = { ...next.words.cautious, id: 'brave', text: 'Brave', week: 21, stickerId: 'stk-brave' };
    next.weeks.push({ id: 'week-21', number: 21, title: 'Dragon Peak', theme: 'dino', tagline: 'x', wordIds: ['brave'], rewardStickerId: 'stk-week-21' });

    const summary = mergeBundledCurriculum(s, next);
    expect(summary.added).toEqual(['brave']);
    expect(summary.weeksAdded).toEqual(['week-21']);
    expect(s.curriculum.words.anticipate.definition).toBe('Updated bundled definition');
    expect(s.curriculum.words.persistent.definition).toBe('Parent version');
    for (const [id, p] of Object.entries(progressBefore)) expect(s.wordProgress[id]).toEqual(p);
    expect(s.stickers).toEqual(stickersBefore);
    expect(s.weekProgress['week-21'].unlocked).toBe(false);
    expect(s.curriculum.version).toBe(next.version);
    // Merging again is a no-op.
    expect(mergeBundledCurriculum(s, next).added).toEqual([]);
  });

  /** A save from before Weeks 11-20 existed: curriculum version 1 with only Weeks 1-10. */
  function versionOneSave(): AppState {
    const s = freshState();
    const keep = s.curriculum.weeks.filter((w) => w.number <= 10);
    const keepWords = new Set(keep.flatMap((w) => w.wordIds));
    for (const w of s.curriculum.weeks.filter((w) => w.number > 10)) delete s.weekProgress[w.id];
    for (const id of Object.keys(s.curriculum.words)) {
      if (!keepWords.has(id)) {
        delete s.curriculum.words[id];
        delete s.wordProgress[id];
      }
    }
    s.curriculum.weeks = keep;
    s.curriculum.version = 1;
    return s;
  }

  it('adds Weeks 11-20 to an older save and opens Week 11 once Week 10 is mastered', () => {
    const old = versionOneSave();
    for (const w of old.curriculum.weeks) parentMarkWeekComplete(old, w.id, T0);
    const progressBefore = structuredClone(old.wordProgress);
    const stickersBefore = structuredClone(old.stickers);

    const s = migrateState(JSON.parse(JSON.stringify(old)), T0);
    expect(s.curriculum.weeks).toHaveLength(20);
    expect(s.curriculum.version).toBe(bundledCurriculum().version);
    expect(s.weekProgress['week-11'].unlocked).toBe(true);
    expect(s.weekProgress['week-11'].unlockSource).toBe('progression');
    expect(s.weekProgress['week-12'].unlocked).toBe(false);
    expect(currentWeek(s)?.id).toBe('week-11');
    for (const [id, p] of Object.entries(progressBefore)) expect(s.wordProgress[id]).toEqual(p);
    expect(s.stickers).toEqual(stickersBefore);
    expect(s.wordProgress.abundant.exploredAt).toBeNull();
  });

  it('keeps Week 11 locked for an older save that has not finished Week 10', () => {
    const s = migrateState(JSON.parse(JSON.stringify(versionOneSave())), T0);
    expect(s.weekProgress['week-11'].unlocked).toBe(false);
    expect(currentWeek(s)?.id).toBe('week-3');
  });

  it('moves a parent-added "Week 11" after the new bundled weeks, keeping its words and progress', () => {
    const old = versionOneSave();
    for (const w of old.curriculum.weeks) parentMarkWeekComplete(old, w.id, T0);
    const customId = parentAddWeek(old, 'Our Own Words', 'space');
    expect(customId).toBe('week-11');
    old.curriculum.weeks.find((w) => w.id === customId)!.wordIds = ['peculiar'];
    old.stickers['stk-week-11'] = { unlockedAt: T0, source: 'earned' };

    const s = migrateState(JSON.parse(JSON.stringify(old)), T0);
    const bundled11 = s.curriculum.weeks.find((w) => w.id === 'week-11')!;
    expect(bundled11.custom).toBeFalsy();
    expect(bundled11.wordIds).toHaveLength(5);
    const moved = s.curriculum.weeks.find((w) => w.title === 'Our Own Words')!;
    expect(moved.id).toBe('custom-week-11');
    expect(moved.number).toBe(21);
    expect(moved.wordIds).toEqual(['peculiar']);
    expect(moved.rewardStickerId).toBe('stk-custom-week-11');
    expect(s.weekProgress['custom-week-11'].unlocked).toBe(true);
    expect(s.stickers['stk-custom-week-11']).toBeDefined();
    expect(s.stickers['stk-week-11']).toBeUndefined();
    expect(new Set(s.curriculum.weeks.map((w) => w.number)).size).toBe(21);
  });
});
