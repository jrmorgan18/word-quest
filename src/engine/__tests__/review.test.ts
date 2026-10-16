import { describe, expect, it } from 'vitest';
import { buildMemoryMission, completeMemoryMission, dueReviewWordIds, recordReview } from '../review';
import { DAY, freshState, HOUR, passQuiz, practiceWeek, T0 } from './helpers';

describe('spaced review', () => {
  it('nothing is due on first launch; historical words become due from the next day', () => {
    const s = freshState();
    expect(dueReviewWordIds(s, T0)).toEqual([]);
    expect(dueReviewWordIds(s, T0 + DAY)).toHaveLength(2);
    expect(dueReviewWordIds(s, T0 + 3 * DAY)).toHaveLength(6);
  });

  it('follows the 1, 3, 7, 14, 30 day ladder for correct recall', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    let t = T0 + 21 * HOUR;
    passQuiz(s, 'week-3', 'delayed', t);
    const r = () => s.wordProgress.persistent.review!;
    expect(r().dueAt - t).toBe(1 * DAY);
    const gaps: number[] = [];
    for (let i = 0; i < 5; i++) {
      t = r().dueAt;
      recordReview(s, 'persistent', true, t);
      gaps.push((r().dueAt - t) / DAY);
    }
    expect(gaps).toEqual([3, 7, 14, 30, 30]);
  });

  it('a miss shortens the interval but never removes mastery or stickers', () => {
    const s = freshState();
    const t = T0 + 5 * DAY;
    recordReview(s, 'peculiar', true, t); // stage 1 -> 2
    recordReview(s, 'peculiar', true, t + 3 * DAY); // stage 2 -> 3
    recordReview(s, 'peculiar', false, t + 10 * DAY);
    const p = s.wordProgress.peculiar;
    expect(p.mastered).toBe(true);
    expect(s.stickers['stk-peculiar']).toBeDefined();
    expect(p.review!.lapses).toBe(1);
    expect(p.review!.stage).toBe(1);
    expect(p.review!.dueAt).toBe(t + 11 * DAY);
    expect(p.struggle).toBeGreaterThan(0);
  });

  it('prioritizes words Brooks has struggled with', () => {
    const s = freshState();
    const t = T0 + 4 * DAY;
    s.wordProgress.astonished.struggle = 5;
    expect(dueReviewWordIds(s, t)[0]).toBe('astonished');
  });

  it('builds short Memory Missions only from due words and awards an achievement sticker', () => {
    const s = freshState();
    const t = T0 + 4 * DAY;
    const mission = buildMemoryMission(s, t, 5);
    expect(mission.questions.length).toBe(5);
    const due = new Set(dueReviewWordIds(s, t));
    for (const q of mission.questions) {
      expect(due.has(q.wordId)).toBe(true);
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
    }
    completeMemoryMission(s, t);
    expect(s.stickers['stk-ach-memory-1']).toBeDefined();
  });
});
