import { describe, expect, it } from 'vitest';
import { buildConnections, buildQuestionRound } from '../activities';
import { delayedCheckAvailable, findWeek, nextStep, quizGate, recordActivity, recordDiscovery } from '../progress';
import { applyQuizResult, buildQuiz, gradeQuiz } from '../quiz';
import type { Question } from '../types';
import { DAY, freshState, HOUR, passQuiz, practiceWeek, T0 } from './helpers';

function assertValid(q: Question) {
  expect(q.options.length).toBeGreaterThanOrEqual(2);
  expect(new Set(q.options.map((o) => o.toLowerCase())).size).toBe(q.options.length);
  expect(q.answerIndex).toBeGreaterThanOrEqual(0);
  expect(q.answerIndex).toBeLessThan(q.options.length);
}

describe('quiz unlock gate', () => {
  it('requires discovery of all words and two distinct practice activities per word', () => {
    const s = freshState();
    const week = findWeek(s, 'week-3')!;
    expect(quizGate(s, week).unlocked).toBe(false);
    for (const id of week.wordIds) recordDiscovery(s, id, T0);
    expect(quizGate(s, week).unexplored).toEqual([]);
    expect(quizGate(s, week).unlocked).toBe(false);
    // Repeating the SAME activity doesn't count twice.
    for (const id of week.wordIds) {
      recordActivity(s, id, 'choose', T0);
      recordActivity(s, id, 'choose', T0);
    }
    expect(quizGate(s, week).unlocked).toBe(false);
    // Creative challenges are a bonus and do not count.
    for (const id of week.wordIds) recordActivity(s, id, 'creative', T0);
    expect(quizGate(s, week).unlocked).toBe(false);
    for (const id of week.wordIds) recordActivity(s, id, 'detective', T0);
    expect(quizGate(s, week).unlocked).toBe(true);
    expect(nextStep(s, week, T0)).toEqual({ kind: 'quiz', quizType: 'initial' });
  });
});

describe('initial quiz generation', () => {
  const s = freshState();
  practiceWeek(s, 'week-3');
  const week = findWeek(s, 'week-3')!;

  it('has nine questions, three per word, with an application question for each word', () => {
    for (let seed = 1; seed <= 25; seed++) {
      const quiz = buildQuiz(s, week, 'initial', T0, seed);
      expect(quiz.questions).toHaveLength(9);
      for (const id of week.wordIds) {
        const qs = quiz.questions.filter((q) => q.wordId === id);
        expect(qs).toHaveLength(3);
        expect(qs.some((q) => q.format === 'application' || q.format === 'situation')).toBe(true);
        expect(new Set(qs.map((q) => q.format)).size).toBe(3);
      }
      expect(new Set(quiz.questions.map((q) => q.key)).size).toBe(9);
      quiz.questions.forEach(assertValid);
    }
  });

  it('randomizes answer positions without producing invalid answers', () => {
    const positions = new Set<number>();
    for (let seed = 1; seed <= 30; seed++) {
      const quiz = buildQuiz(s, week, 'initial', T0, seed);
      for (const q of quiz.questions) {
        positions.add(q.answerIndex);
        const word = s.curriculum.words[q.wordId];
        const correct = q.options[q.answerIndex];
        if (q.format === 'which-word' || q.format === 'cloze') expect(correct).toBe(word.text);
        if (q.format === 'synonym') expect(word.synonyms).toContain(correct);
        if (q.format === 'antonym') expect(word.antonyms).toContain(correct);
        if (q.format === 'situation') expect(word.contexts).toContain(correct);
        if (q.format === 'application') expect(word.quizItems!.map((i) => i.options[0])).toContain(correct);
      }
    }
    expect(positions).toEqual(new Set([0, 1, 2]));
  });

  it('never reuses practice-activity content', () => {
    const practiceKeys = new Set<string>();
    for (let seed = 1; seed <= 20; seed++) {
      for (const a of ['choose', 'story', 'detective'] as const) buildQuestionRound(s, week, a, seed).forEach((q) => practiceKeys.add(q.key));
      const conn = buildConnections(s, week, seed);
      conn.steps.forEach((st) => st.kind === 'choice' && practiceKeys.add(st.question.key));
    }
    for (let seed = 1; seed <= 20; seed++) {
      for (const q of buildQuiz(s, week, 'initial', T0, seed).questions) expect(practiceKeys.has(q.key)).toBe(false);
    }
  });

  it('generates a different variation after a failed attempt', () => {
    const s2 = freshState();
    practiceWeek(s2, 'week-3');
    const quiz = buildQuiz(s2, week, 'initial', T0, 7);
    const attempt = applyQuizResult(s2, quiz, quiz.questions.map(() => -1), T0);
    expect(attempt.passed).toBe(false);
    const retry = buildQuiz(s2, week, 'initial', T0 + HOUR, 7);
    const firstKeys = new Set(quiz.questions.map((q) => q.key));
    const overlap = retry.questions.filter((q) => firstKeys.has(q.key)).length;
    expect(overlap).toBeLessThanOrEqual(3);
  });
});

describe('grading and mastery', () => {
  it('passes with 8/9 and fails with 7/9', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    const quiz = buildQuiz(s, findWeek(s, 'week-3')!, 'initial', T0, 3);
    const right = quiz.questions.map((q) => q.answerIndex);
    const wrongAt = (idxs: number[]) => right.map((a, i) => (idxs.includes(i) ? (a + 1) % quiz.questions[i].options.length : a));
    expect(gradeQuiz(s, quiz, right).passed).toBe(true);
    expect(gradeQuiz(s, quiz, wrongAt([0])).passed).toBe(true);
    expect(gradeQuiz(s, quiz, wrongAt([0])).score).toBe(8);
    expect(gradeQuiz(s, quiz, wrongAt([0, 1])).passed).toBe(false);
  });

  it('enforces the per-word minimum when thresholds are relaxed', () => {
    const s = freshState();
    s.config.initial.passTotal = 6;
    practiceWeek(s, 'week-3');
    const quiz = buildQuiz(s, findWeek(s, 'week-3')!, 'initial', T0, 4);
    const right = quiz.questions.map((q) => q.answerIndex);
    // Miss two questions for the same word: 7/9 overall, but only 1/3 for that word.
    const target = quiz.questions[0].wordId;
    const idxs = quiz.questions.map((q, i) => (q.wordId === target ? i : -1)).filter((i) => i >= 0).slice(0, 2);
    const answers = right.map((a, i) => (idxs.includes(i) ? (a + 1) % quiz.questions[i].options.length : a));
    const g = gradeQuiz(s, quiz, answers);
    expect(g.score).toBe(7);
    expect(g.passed).toBe(false);
    expect(g.missedWordIds).toEqual([target]);
  });

  it('awards stickers + achievement on initial pass and schedules the delayed check 20h later', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    const wp = s.weekProgress['week-3'];
    expect(wp.initialPassedAt).toBe(T0);
    expect(wp.delayedAvailableAt).toBe(T0 + 20 * HOUR);
    for (const id of ['anticipate', 'persistent', 'consequence']) {
      expect(s.stickers[`stk-${id}`]?.source).toBe('earned');
      expect(s.wordProgress[id].learnedAt).toBe(T0);
      expect(s.wordProgress[id].mastered).toBe(false);
    }
    expect(s.achievements['quiz-week-3']).toBeDefined();
    expect(s.weekProgress['week-4'].unlocked).toBe(false);
    expect(delayedCheckAvailable(s, 'week-3', T0 + 19 * HOUR)).toBe(false);
    expect(delayedCheckAvailable(s, 'week-3', T0 + 20 * HOUR)).toBe(true);
    expect(nextStep(s, findWeek(s, 'week-3')!, T0 + HOUR).kind).toBe('wait');
  });

  it('delayed check: 6 questions (2 per word), new content, then unlocks week 4', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    const initial = passQuiz(s, 'week-3', 'initial', T0);
    const later = T0 + 21 * HOUR;
    const dq = buildQuiz(s, findWeek(s, 'week-3')!, 'delayed', later, 9);
    expect(dq.questions).toHaveLength(6);
    for (const id of ['anticipate', 'persistent', 'consequence']) expect(dq.questions.filter((q) => q.wordId === id)).toHaveLength(2);
    const initialKeys = new Set(initial.questions.map((q) => q.key));
    expect(dq.questions.filter((q) => initialKeys.has(q.key))).toHaveLength(0);

    const right = dq.questions.map((q) => q.answerIndex);
    const oneWrong = right.map((a, i) => (i === 0 ? (a + 1) % dq.questions[0].options.length : a));
    expect(gradeQuiz(s, dq, oneWrong).passed).toBe(true);
    const twoWrong = oneWrong.map((a, i) => (i === 1 ? (a + 1) % dq.questions[1].options.length : a));
    expect(gradeQuiz(s, dq, twoWrong).passed).toBe(false);

    applyQuizResult(s, dq, right, later);
    expect(s.weekProgress['week-3'].mastered).toBe(true);
    expect(s.weekProgress['week-4'].unlocked).toBe(true);
    expect(s.stickers['stk-week-3']?.source).toBe('earned');
    for (const id of ['anticipate', 'persistent', 'consequence']) {
      expect(s.wordProgress[id].mastered).toBe(true);
      expect(s.wordProgress[id].review?.dueAt).toBe(later + DAY);
    }
  });

  it('a failed delayed check flags only the missed words for a refresher', () => {
    const s = freshState();
    practiceWeek(s, 'week-3');
    passQuiz(s, 'week-3', 'initial', T0);
    const dq = buildQuiz(s, findWeek(s, 'week-3')!, 'delayed', T0 + DAY, 2);
    const target = dq.questions[0].wordId;
    const answers = dq.questions.map((q) => (q.wordId === target ? (q.answerIndex + 1) % q.options.length : q.answerIndex));
    const att = applyQuizResult(s, dq, answers, T0 + DAY);
    expect(att.passed).toBe(false);
    expect(s.wordProgress[target].needsRefresher).toBe(true);
    expect(Object.values(s.wordProgress).filter((p) => p.needsRefresher)).toHaveLength(1);
    expect(s.weekProgress['week-3'].mastered).toBe(false);
    expect(s.stickers[`stk-${target}`]).toBeDefined(); // nothing taken away
    expect(nextStep(s, findWeek(s, 'week-3')!, T0 + DAY)).toEqual({ kind: 'refresher' });
    recordActivity(s, target, 'refresher', T0 + DAY);
    expect(nextStep(s, findWeek(s, 'week-3')!, T0 + DAY)).toEqual({ kind: 'quiz', quizType: 'delayed' });
  });
});
