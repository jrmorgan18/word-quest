import { describe, expect, it } from 'vitest';
import { currentWeek, quizGate, wordStatus } from '../progress';
import { freshState, T0, DAY } from './helpers';

describe('initial state', () => {
  const s = freshState();

  it('initializes progress for all 30 words', () => {
    expect(Object.keys(s.wordProgress)).toHaveLength(30);
    expect(Object.keys(s.weekProgress)).toHaveLength(10);
  });

  it('marks weeks 1 and 2 as historically completed, parent-confirmed, with no fabricated data', () => {
    for (const id of ['week-1', 'week-2']) {
      const wp = s.weekProgress[id];
      expect(wp.unlocked).toBe(true);
      expect(wp.mastered).toBe(true);
      expect(wp.completionSource).toBe('parent-confirmed');
      expect(wp.masteredAt).toBeNull();
      expect(wp.initialPassedAt).toBeNull();
      expect(wp.delayedPassedAt).toBeNull();
    }
    expect(s.quizAttempts).toHaveLength(0);
    for (const id of ['peculiar', 'reluctant', 'observe', 'inevitable', 'resourceful', 'astonished']) {
      const p = s.wordProgress[id];
      expect(wordStatus(p)).toBe('mastered');
      expect(p.masterySource).toBe('parent-confirmed');
      expect(p.masteredAt).toBeNull();
      expect(p.learnedAt).toBeNull();
      expect(p.activityHistory).toHaveLength(0);
    }
  });

  it('grants the six historical word stickers and two weekly rewards', () => {
    const ids = Object.keys(s.stickers).sort();
    expect(ids).toEqual(
      ['stk-astonished', 'stk-inevitable', 'stk-observe', 'stk-peculiar', 'stk-reluctant', 'stk-resourceful', 'stk-week-1', 'stk-week-2'].sort(),
    );
    for (const o of Object.values(s.stickers)) {
      expect(o.source).toBe('parent-confirmed');
      expect(o.unlockedAt).toBeNull();
    }
    expect(s.celebrations).toHaveLength(0);
  });

  it('unlocks week 3 as the current week and locks weeks 4-10', () => {
    expect(s.weekProgress['week-3'].unlocked).toBe(true);
    expect(s.weekProgress['week-3'].mastered).toBe(false);
    for (let n = 4; n <= 10; n++) expect(s.weekProgress[`week-${n}`].unlocked).toBe(false);
    expect(currentWeek(s)?.id).toBe('week-3');
    expect(quizGate(s, s.curriculum.weeks[2]).unlocked).toBe(false);
  });

  it('schedules gentle staggered reviews for historical words, starting the next day', () => {
    const due = Object.values(s.wordProgress).filter((p) => p.review).map((p) => p.review!.dueAt);
    expect(due).toHaveLength(6);
    expect(Math.min(...due)).toBe(T0 + DAY);
    expect(Math.max(...due)).toBe(T0 + 3 * DAY);
  });
});
