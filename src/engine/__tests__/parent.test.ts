import { describe, expect, it } from 'vitest';
import { buildQuiz } from '../quiz';
import { currentWeek, delayedCheckAvailable, findWeek, wordStatus } from '../progress';
import {
  parentAddWeek,
  parentAddWord,
  parentMarkWeekComplete,
  parentMarkWordMastered,
  parentReplaceWord,
  parentResetQuizProgress,
  parentSetWeekLocked,
  parentSkipWait,
  parentUpdateConfig,
  parentUpdateWord,
} from '../parent';
import { buildQuestionRound, buildConnections } from '../activities';
import { freshState, passQuiz, practiceWeek, T0, HOUR } from './helpers';

describe('parent overrides', () => {
  it('marks a week complete, awards stickers as parent-override, and unlocks the next week', () => {
    const s = freshState();
    parentMarkWeekComplete(s, 'week-3', T0);
    expect(s.weekProgress['week-3'].mastered).toBe(true);
    expect(s.weekProgress['week-3'].completionSource).toBe('parent-override');
    expect(s.stickers['stk-persistent'].source).toBe('parent-override');
    expect(s.stickers['stk-week-3'].source).toBe('parent-override');
    expect(s.weekProgress['week-4'].unlocked).toBe(true);
    expect(currentWeek(s)?.id).toBe('week-4');
    expect(s.celebrations).toHaveLength(0);
  });

  it('marks a single word mastered and schedules its review', () => {
    const s = freshState();
    parentMarkWordMastered(s, 'cautious', T0);
    expect(wordStatus(s.wordProgress.cautious)).toBe('mastered');
    expect(s.wordProgress.cautious.review).not.toBeNull();
    expect(s.stickers['stk-cautious']).toBeDefined();
  });

  it('unlocks and relocks future weeks', () => {
    const s = freshState();
    parentSetWeekLocked(s, 'week-6', false);
    expect(s.weekProgress['week-6'].unlocked).toBe(true);
    parentSetWeekLocked(s, 'week-6', true);
    expect(s.weekProgress['week-6'].unlocked).toBe(false);
  });

  it('can skip the delayed-check waiting period', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    expect(delayedCheckAvailable(s, 'week-3', T0 + HOUR)).toBe(false);
    parentSkipWait(s, 'week-3', T0 + HOUR);
    expect(delayedCheckAvailable(s, 'week-3', T0 + HOUR)).toBe(true);
  });

  it('resets quiz progress but keeps history (voided) and stickers', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    parentResetQuizProgress(s, 'week-3');
    expect(s.weekProgress['week-3'].initialPassedAt).toBeNull();
    expect(s.quizAttempts).toHaveLength(1);
    expect(s.quizAttempts[0].voided).toBe(true);
    expect(s.stickers['stk-anticipate']).toBeDefined();
    expect(s.wordProgress.anticipate.learnedAt).toBeNull();
    expect(s.wordProgress.anticipate.exploredAt).toBe(T0); // practice history kept
  });

  it('clamps mastery thresholds and review intervals', () => {
    const s = freshState();
    parentUpdateConfig(s, { ...s.config, initial: { questionsPerWord: 3, passTotal: 50, perWordMin: 9 }, reviewIntervalsDays: [-1, 0] });
    expect(s.config.initial.passTotal).toBe(9);
    expect(s.config.initial.perWordMin).toBe(3);
    expect(s.config.reviewIntervalsDays).toEqual([1, 3, 7, 14, 30]);
  });
});

describe('curriculum management', () => {
  it('edits a word and marks it customized without touching progress', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    parentUpdateWord(s, 'persistent', { definition: 'Keeps going when things are hard', examples: ['The {persistent} ant kept going.', ' ', 'b {persistent}', 'c {persistent}'] });
    expect(s.curriculum.words.persistent.definition).toBe('Keeps going when things are hard');
    expect(s.curriculum.words.persistent.examples).toHaveLength(3);
    expect(s.curriculum.words.persistent.customized).toBe(true);
    expect(s.wordProgress.persistent.exploredAt).toBe(T0);
  });

  it('adds a week and a sparse custom word that can still be practiced and quizzed', () => {
    const s = freshState();
    const weekId = parentAddWeek(s, 'Dragon Mountain', 'dino');
    expect(findWeek(s, weekId)?.number).toBe(21);
    expect(s.weekProgress[weekId].unlocked).toBe(false);
    for (const [text, def] of [
      ['Brave', 'Ready to face danger or difficulty'],
      ['Curious', 'Wanting to learn or know about something'],
      ['Gigantic', 'Extremely big'],
    ]) {
      parentAddWord(s, weekId, { text, definition: def, examples: [`The ${text.toLowerCase()} knight smiled.`, `She felt ${text.toLowerCase()} today.`, `What a ${text.toLowerCase()} idea!`] });
    }
    const week = findWeek(s, weekId)!;
    expect(week.wordIds).toEqual(['brave', 'curious', 'gigantic']);
    for (const a of ['choose', 'story', 'detective'] as const) expect(buildQuestionRound(s, week, a, 1).length).toBe(3);
    expect(buildConnections(s, week, 1).steps.length).toBeGreaterThanOrEqual(0);
    const quiz = buildQuiz(s, week, 'initial', T0, 1);
    expect(quiz.questions.length).toBeGreaterThanOrEqual(6);
    for (const q of quiz.questions) expect(q.options[q.answerIndex]).toBeTruthy();
  });

  it('replaces a word in place and keeps the old word’s history', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    const newId = parentReplaceWord(s, 'week-3', 'consequence', { text: 'Outcome', definition: 'The way something ends up', examples: ['The {outcome} was great.', 'a', 'b'] });
    expect(findWeek(s, 'week-3')!.wordIds).toEqual(['anticipate', 'persistent', newId]);
    expect(s.curriculum.words.consequence).toBeDefined();
    expect(s.wordProgress.consequence.exploredAt).toBe(T0);
  });
});
